import { requireNovaMeshAuth } from './lib/auth.mjs';
import { getBridgeStateFromBlobs } from './lib/blob-storage.mjs';

export async function handler(event) {
  try {
    if (event.httpMethod !== 'GET') {
      return json(405, { ok: false, error: 'method_not_allowed' });
    }

    const auth = requireNovaMeshAuth(event);
    if (!auth.ok) {
      return json(auth.statusCode, {
        ok: false,
        error: auth.error,
        message: auth.message
      });
    }

    const bridgeState = await getBridgeStateFromBlobs();

    return json(200, {
      ok: true,
      message: 'Nova Mesh state loaded',
      state: bridgeState
    });
  } catch (error) {
    return json(500, {
      ok: false,
      error: 'state_failed',
      details: error.message
    });
  }
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
