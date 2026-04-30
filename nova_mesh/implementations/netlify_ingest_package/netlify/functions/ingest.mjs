import { persistEventToBlobs } from './lib/blob-storage.mjs';
import { persistEventToGitHub } from './lib/github-storage.mjs';

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return json(405, { ok: false, error: 'method_not_allowed' });
    }

    const expectedToken = process.env.NOVA_MESH_TOKEN;
    const receivedToken = event.headers['x-nova-mesh-token'] || event.headers['X-Nova-Mesh-Token'];

    if (expectedToken && receivedToken !== expectedToken) {
      return json(401, { ok: false, error: 'unauthorized' });
    }

    const body = parseJson(event.body);
    if (!body.ok) {
      return json(400, { ok: false, error: 'invalid_json', details: body.error });
    }

    const input = body.value;
    const required = ['source', 'event_type', 'payload'];
    const missing = required.filter((field) => input[field] === undefined || input[field] === null);

    if (missing.length > 0) {
      return json(400, { ok: false, error: 'missing_required_fields', missing });
    }

    const now = new Date().toISOString();
    const normalizedEvent = {
      event_id: input.event_id || `evt_${Date.now()}`,
      timestamp: input.timestamp || now,
      source: String(input.source),
      event_type: String(input.event_type),
      payload: input.payload || {},
      status: input.status || 'new',
      priority: Number(input.priority || 3),
      summary_for_ai: input.summary_for_ai || summarize(input),
      next_action: input.next_action || nextAction(input),
      route_hint: input.route_hint || 'router.pending',
      correlation_id: input.correlation_id || null
    };

    const storageResult = await persistWithFallback(normalizedEvent);

    return json(200, {
      ok: true,
      message: 'Nova Mesh event accepted',
      event: normalizedEvent,
      bridge_write: storageResult.ok ? storageResult.bridge_write : 'bridge_write_failed',
      storage: storageResult,
      next_step: storageResult.ok
        ? 'Connect Make/Zapier to this endpoint and monitor Bridge DB state.'
        : 'Check Netlify Blobs availability and GitHub token fallback.'
    });
  } catch (error) {
    return json(500, { ok: false, error: 'ingest_failed', details: error.message });
  }
}

async function persistWithFallback(normalizedEvent) {
  const results = [];

  if (process.env.NOVA_MESH_STORAGE_MODE !== 'github_only') {
    const blobResult = await persistEventToBlobs(normalizedEvent);
    results.push(blobResult);
    if (blobResult.ok) {
      return {
        ok: true,
        bridge_write: 'netlify_blobs_written',
        primary: blobResult,
        attempts: results
      };
    }
  }

  if (process.env.NOVA_MESH_STORAGE_MODE !== 'blobs_only') {
    const githubResult = await persistEventToGitHub(normalizedEvent);
    results.push(githubResult);
    if (githubResult.ok) {
      return {
        ok: true,
        bridge_write: 'github_json_bridge_written',
        primary: githubResult,
        attempts: results
      };
    }
  }

  return {
    ok: false,
    bridge_write: 'all_storage_attempts_failed',
    attempts: results
  };
}

function parseJson(raw) {
  try {
    return { ok: true, value: JSON.parse(raw || '{}') };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

function summarize(input) {
  const keys = input.payload && typeof input.payload === 'object'
    ? Object.keys(input.payload).slice(0, 8).join(', ')
    : 'raw';
  return `Event from ${input.source} of type ${input.event_type}. Payload keys: ${keys}.`;
}

function nextAction(input) {
  if (String(input.event_type).includes('fail') || String(input.event_type).includes('error')) {
    return 'Store in dead letters and route fallback.';
  }
  return 'Store event and route by capability registry.';
}

function json(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload, null, 2)
  };
}
