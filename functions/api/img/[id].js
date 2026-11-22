// GET /api/img/:id: devuelve una foto subida desde el panel.
export async function onRequestGet({ params, env }) {
  const id = String(params.id || '');
  if (!env.DB || !/^[A-Za-z0-9-]+$/.test(id)) return new Response('No encontrada', { status: 404 });
  const { value, metadata } = await env.DB.getWithMetadata('img:' + id, { type: 'arrayBuffer', cacheTtl: 86400 });
  if (!value) return new Response('No encontrada', { status: 404 });
  return new Response(value, {
    headers: {
      'content-type': (metadata && metadata.type) || 'image/jpeg',
      'cache-control': 'public, max-age=31536000, immutable'
    }
  });
}
