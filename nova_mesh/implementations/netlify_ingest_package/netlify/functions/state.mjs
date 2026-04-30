import { getBridgeStateFromBlobs } from './lib/blob-storage.mjs';

export async function handler(event) {
  try {
    if (event.httpMethod !== 'GET') {
      return json(405, { ok: false, error: 'method_not_allowed' });
    }

    const expectedToken = process.env.NOVA_MESH_TOKEN;
    const receivedToken = event.headers['x-nova-mesh-token'] || event.headers['X-Nova-Mesh-Token'];

    if (expectedToken && receivedToken !== expectedToken) {
      return json(401, { ok: false, error: 'unauthorized' });
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
