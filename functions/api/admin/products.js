// PUT /api/admin/products: guarda los cambios del panel. Requiere la clave.
async function authed(request, env) {
  const real = env.ADMIN_PASSWORD;
  const pw = request.headers.get('x-admin-password') || '';
  if (!real) return false;
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(pw)),
    crypto.subtle.digest('SHA-256', enc.encode(real))
  ]);
  const x = new Uint8Array(a), y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  if (diff !== 0) await new Promise((r) => setTimeout(r, 1200));
  return diff === 0;
}

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : undefined);

function clean(input) {
  const out = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const keys = Object.keys(input);
  if (keys.length > 500) return null;
  for (const key of keys) {
    const v = input[key];
    if (!v || typeof v !== 'object' || key.length > 300) continue;
    const o = {};
    const name = str(v.name, 200); if (name) o.name = name;
    const desc = str(v.desc, 600); if (desc !== undefined) o.desc = desc;
    if (v.price === null) o.price = null;
    else if (typeof v.price === 'number' && isFinite(v.price) && v.price >= 0 && v.price < 1e9) o.price = Math.round(v.price);
    if (typeof v.stock === 'boolean') o.stock = v.stock;
    const img = str(v.img, 300);
    if (img && (/^\/api\/img\/[A-Za-z0-9-]+$/.test(img) || /^img\/[A-Za-z0-9/_.-]+$/.test(img))) o.img = img;
    if (Object.keys(o).length) out[key] = o;
  }
  return out;
}

export async function onRequestPut({ request, env }) {
  if (!env.DB) return Response.json({ ok: false, error: 'Falta configurar la base en Cloudflare.' }, { status: 503 });
  if (!(await authed(request, env))) return Response.json({ ok: false, error: 'Clave incorrecta.' }, { status: 401 });
  let body;
  try { body = await request.json(); } catch (e) { return Response.json({ ok: false, error: 'Datos inválidos.' }, { status: 400 }); }
  const data = clean(body);
  if (!data) return Response.json({ ok: false, error: 'Datos inválidos.' }, { status: 400 });
  await env.DB.put('overrides', JSON.stringify(data));
  return Response.json({ ok: true, count: Object.keys(data).length });
}
