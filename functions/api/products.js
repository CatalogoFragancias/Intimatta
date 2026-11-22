// GET /api/products: cambios hechos desde el panel (nombre, descripción, precio, stock, imagen).
// La página los aplica sobre la lista de productos de app.js.
export async function onRequestGet({ env }) {
  let data = '{}';
  if (env.DB) data = (await env.DB.get('overrides')) || '{}';
  return new Response(data, {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });
}
