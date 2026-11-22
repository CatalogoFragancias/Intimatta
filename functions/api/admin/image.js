// POST /api/admin/image: sube una foto de producto (JPEG, ya achicada en el navegador). Requiere la clave.
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

export async function onRequestPost({ request, env }) {
  if (!env.DB) return Response.json({ ok: false, error: 'Falta configurar la base en Cloudflare.' }, { status: 503 });
  if (!(await authed(request, env))) return Response.json({ ok: false, error: 'Clave incorrecta.' }, { status: 401 });
  const type = (request.headers.get('content-type') || '').split(';')[0].trim();
  if (type !== 'image/jpeg') return Response.json({ ok: false, error: 'La imagen tiene que ser JPG.' }, { status: 415 });
  const buf = await request.arrayBuffer();
  if (buf.byteLength === 0 || buf.byteLength > 3 * 1024 * 1024) {
    return Response.json({ ok: false, error: 'La imagen es demasiado grande.' }, { status: 413 });
  }
  const id = crypto.randomUUID();
  await env.DB.put('img:' + id, buf, { metadata: { type: 'image/jpeg' } });
  return Response.json({ ok: true, url: '/api/img/' + id });
}
