const DEFAULT_REPO = 'jaunski/APOLO_MEMORIA';
const DEFAULT_BRANCH = 'main';
const EVENTS_PATH = 'nova_mesh/data/mesh_events.json';
const STATE_PATH = 'nova_mesh/data/mesh_state.json';
const DEAD_LETTERS_PATH = 'nova_mesh/data/mesh_dead_letters.json';

export async function persistEventToGitHub(normalizedEvent) {
  const token = process.env.GITHUB_TOKEN || process.env.NOVA_MESH_GITHUB_TOKEN;
  if (!token) {
    return {
      ok: false,
      skipped: true,
      reason: 'missing_github_token',
      note: 'Set GITHUB_TOKEN or NOVA_MESH_GITHUB_TOKEN with repo contents write permission.'
    };
  }

  const repo = process.env.NOVA_MESH_GITHUB_REPO || DEFAULT_REPO;
  const branch = process.env.NOVA_MESH_GITHUB_BRANCH || DEFAULT_BRANCH;

  const eventsResult = await appendJsonArrayFile({
    token,
    repo,
    branch,
    path: EVENTS_PATH,
    item: normalizedEvent,
    maxItems: Number(process.env.NOVA_MESH_MAX_EVENTS || 500),
    message: `Nova Mesh ingest event ${normalizedEvent.event_id}`
  });

  const statePatch = {
    status: 'event_ingested',
    last_heartbeat: new Date().toISOString(),
    last_event_id: normalizedEvent.event_id,
    last_event_source: normalizedEvent.source,
    last_event_type: normalizedEvent.event_type,
    last_route_hint: normalizedEvent.route_hint
  };

  const stateResult = await patchJsonObjectFile({
    token,
    repo,
    branch,
    path: STATE_PATH,
    patch: statePatch,
    message: `Nova Mesh update state after ${normalizedEvent.event_id}`
  });

  let deadLetterResult = null;
  if (shouldDeadLetter(normalizedEvent)) {
    deadLetterResult = await appendJsonArrayFile({
      token,
      repo,
      branch,
      path: DEAD_LETTERS_PATH,
      item: {
        dead_id: `dead_${Date.now()}`,
        timestamp: new Date().toISOString(),
        source: normalizedEvent.source,
        error: 'event_marked_for_dead_letter',
        payload: normalizedEvent,
        retry_count: 0,
        next_retry: null,
        status: 'queued'
      },
      maxItems: Number(process.env.NOVA_MESH_MAX_DEAD_LETTERS || 200),
      message: `Nova Mesh dead letter ${normalizedEvent.event_id}`
    });
  }

  return {
    ok: eventsResult.ok && stateResult.ok && (!deadLetterResult || deadLetterResult.ok),
    repo,
    branch,
    events: eventsResult,
    state: stateResult,
    dead_letter: deadLetterResult
  };
}

async function appendJsonArrayFile({ token, repo, branch, path, item, maxItems, message }) {
  const current = await getContent({ token, repo, branch, path });
  const existing = current.ok ? safeParseArray(current.content) : [];
  const next = [...existing, item].slice(-maxItems);
  return putContent({ token, repo, branch, path, content: JSON.stringify(next, null, 2) + '\n', sha: current.sha, message });
}

async function patchJsonObjectFile({ token, repo, branch, path, patch, message }) {
  const current = await getContent({ token, repo, branch, path });
  const existing = current.ok ? safeParseObject(current.content) : {};
  const next = { ...existing, ...patch };
  return putContent({ token, repo, branch, path, content: JSON.stringify(next, null, 2) + '\n', sha: current.sha, message });
}

async function getContent({ token, repo, branch, path }) {
  const url = `https://api.github.com/repos/${repo}/contents/${encodeURIComponentPath(path)}?ref=${encodeURIComponent(branch)}`;
  const response = await fetch(url, {
    headers: githubHeaders(token)
  });

  if (response.status === 404) {
    return { ok: false, status: 404, content: null, sha: null };
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub getContent failed ${response.status}: ${text.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = Buffer.from(data.content || '', 'base64').toString('utf8');
  return { ok: true, content, sha: data.sha };
}

async function putContent({ token, repo, branch, path, content, sha, message }) {
  const url = `https://api.github.com/repos/${repo}/contents/${encodeURIComponentPath(path)}`;
  const body = {
    message,
    branch,
    content: Buffer.from(content, 'utf8').toString('base64')
  };
  if (sha) body.sha = sha;

  const response = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders(token),
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    return { ok: false, status: response.status, error: text.slice(0, 500) };
  }

  const data = await response.json();
  return { ok: true, status: response.status, commit_sha: data.commit?.sha, path };
}

function githubHeaders(token) {
  return {
    authorization: `Bearer ${token}`,
    accept: 'application/vnd.github+json',
    'content-type': 'application/json',
    'x-github-api-version': '2022-11-28',
    'user-agent': 'nova-mesh-netlify-ingest'
  };
}

function safeParseArray(content) {
  try {
    const parsed = JSON.parse(content || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function safeParseObject(content) {
  try {
    const parsed = JSON.parse(content || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch (_) {
    return {};
  }
}

function encodeURIComponentPath(path) {
  return path.split('/').map(encodeURIComponent).join('/');
}

function shouldDeadLetter(event) {
  const type = String(event.event_type || '').toLowerCase();
  const status = String(event.status || '').toLowerCase();
  return type.includes('fail') || type.includes('error') || status === 'failed' || status === 'blocked';
}
