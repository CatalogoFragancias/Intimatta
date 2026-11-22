// GET /api/products: cambios hechos desde el panel.
// { products: { [nombre original]: { name, desc, price, old, stock, img } }, settings: { cuotas, transferencia, ... } }
export async function onRequestGet({ env }) {
  let products = {}, settings = null;
  if (env.DB) {
    const [p, s] = await Promise.all([env.DB.get('overrides'), env.DB.get('settings')]);
    try { products = JSON.parse(p || '{}'); } catch (e) {}
    try { settings = s ? JSON.parse(s) : null; } catch (e) {}
  }
  return new Response(JSON.stringify({ products, settings }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });
}
