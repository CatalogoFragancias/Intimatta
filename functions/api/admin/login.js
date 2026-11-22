// POST /api/admin/login: verifica la clave del panel (header X-Admin-Password).
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
  if (!env.ADMIN_PASSWORD || !env.DB) {
    return Response.json({ ok: false, error: 'El panel todavía no está configurado en Cloudflare.' }, { status: 503 });
  }
  if (!(await authed(request, env))) return Response.json({ ok: false, error: 'Clave incorrecta.' }, { status: 401 });
  return Response.json({ ok: true });
}
