export function requireNovaMeshAuth(event) {
  const expectedToken = process.env.NOVA_MESH_TOKEN;
  const allowUnprotected = process.env.NOVA_MESH_ALLOW_UNPROTECTED === 'true';
  const receivedToken = event.headers['x-nova-mesh-token'] || event.headers['X-Nova-Mesh-Token'];

  if (!expectedToken && !allowUnprotected) {
    return {
      ok: false,
      statusCode: 503,
      error: 'server_missing_nova_mesh_token',
      message: 'Set NOVA_MESH_TOKEN in Netlify environment variables before using this endpoint.'
    };
  }

  if (expectedToken && receivedToken !== expectedToken) {
    return {
      ok: false,
      statusCode: 401,
      error: 'unauthorized',
      message: 'Missing or invalid x-nova-mesh-token header.'
    };
  }

  return { ok: true };
}
