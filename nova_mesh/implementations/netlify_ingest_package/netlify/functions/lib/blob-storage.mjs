import { getStore } from '@netlify/blobs';

const EVENTS_KEY = 'mesh_events';
const STATE_KEY = 'mesh_state';
const DEAD_LETTERS_KEY = 'mesh_dead_letters';

export async function persistEventToBlobs(normalizedEvent) {
  try {
    const storeName = process.env.NOVA_MESH_BLOB_STORE || 'nova-mesh-bridge-db';
    const store = getStore(storeName);

    const maxEvents = Number(process.env.NOVA_MESH_MAX_EVENTS || 500);
    const maxDeadLetters = Number(process.env.NOVA_MESH_MAX_DEAD_LETTERS || 200);

    const events = await getJsonArray(store, EVENTS_KEY);
    const nextEvents = [...events, normalizedEvent].slice(-maxEvents);
    await store.setJSON(EVENTS_KEY, nextEvents);

    const state = await getJsonObject(store, STATE_KEY);
    const nextState = {
      ...state,
      mesh_name: state.mesh_name || 'Nova Mesh Core',
      status: 'event_ingested',
      operating_mode: 'Netlify Blobs Bridge DB',
      last_heartbeat: new Date().toISOString(),
      last_event_id: normalizedEvent.event_id,
      last_event_source: normalizedEvent.source,
      last_event_type: normalizedEvent.event_type,
      last_route_hint: normalizedEvent.route_hint
    };
    await store.setJSON(STATE_KEY, nextState);

    let deadLetter = null;
    if (shouldDeadLetter(normalizedEvent)) {
      const deadLetters = await getJsonArray(store, DEAD_LETTERS_KEY);
      deadLetter = {
        dead_id: `dead_${Date.now()}`,
        timestamp: new Date().toISOString(),
        source: normalizedEvent.source,
        error: 'event_marked_for_dead_letter',
        payload: normalizedEvent,
        retry_count: 0,
        next_retry: null,
        status: 'queued'
      };
      await store.setJSON(DEAD_LETTERS_KEY, [...deadLetters, deadLetter].slice(-maxDeadLetters));
    }

    return {
      ok: true,
      provider: 'netlify_blobs',
      store: storeName,
      keys: {
        events: EVENTS_KEY,
        state: STATE_KEY,
        dead_letters: DEAD_LETTERS_KEY
      },
      dead_letter_created: Boolean(deadLetter)
    };
  } catch (error) {
    return {
      ok: false,
      provider: 'netlify_blobs',
      error: error.message
    };
  }
}

export async function getBridgeStateFromBlobs() {
  const storeName = process.env.NOVA_MESH_BLOB_STORE || 'nova-mesh-bridge-db';
  const store = getStore(storeName);
  const state = await getJsonObject(store, STATE_KEY);
  const events = await getJsonArray(store, EVENTS_KEY);
  const deadLetters = await getJsonArray(store, DEAD_LETTERS_KEY);
  return {
    ok: true,
    provider: 'netlify_blobs',
    store: storeName,
    state,
    counts: {
      events: events.length,
      dead_letters: deadLetters.length
    },
    recent_events: events.slice(-5),
    recent_dead_letters: deadLetters.slice(-5)
  };
}

async function getJsonArray(store, key) {
  const value = await store.get(key, { type: 'json' });
  return Array.isArray(value) ? value : [];
}

async function getJsonObject(store, key) {
  const value = await store.get(key, { type: 'json' });
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function shouldDeadLetter(event) {
  const type = String(event.event_type || '').toLowerCase();
  const status = String(event.status || '').toLowerCase();
  return type.includes('fail') || type.includes('error') || status === 'failed' || status === 'blocked';
}
