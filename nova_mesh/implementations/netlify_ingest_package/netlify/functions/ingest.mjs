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

    // MVP behavior: return normalized event.
    // Next versions should write to Bridge DB: GitHub JSON, Netlify Blobs, Supabase, Sheets, Notion or YepCode.
    return json(200, {
      ok: true,
      message: 'Nova Mesh event accepted',
      event: normalizedEvent,
      bridge_write: 'not_configured_yet',
      next_step: 'Connect storage adapter to persist normalizedEvent into mesh_events.'
    });
  } catch (error) {
    return json(500, { ok: false, error: 'ingest_failed', details: error.message });
  }
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
