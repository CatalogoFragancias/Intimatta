// POST /api/order: cuando un cliente envía el pedido por WhatsApp, también se manda una copia por mail.
// El mail lo envía el Worker "intimatta-mail" (binding MAILER).
const fmt = (n) => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const s = (v, max) => String(v == null ? '' : v).replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  if (!env.MAILER) return Response.json({ ok: false, error: 'Mail no configurado' }, { status: 503 });

  // Límite simple: hasta 6 pedidos cada 10 minutos por conexión, para evitar spam.
  const ip = request.headers.get('cf-connecting-ip') || 'x';
  if (env.DB) {
    const k = 'rl:' + ip;
    const n = +((await env.DB.get(k)) || 0);
    if (n >= 6) return Response.json({ ok: false, error: 'Demasiados pedidos seguidos' }, { status: 429 });
    await env.DB.put(k, String(n + 1), { expirationTtl: 600 });
  }

  let d;
  try { d = await request.json(); } catch (e) { return Response.json({ ok: false }, { status: 400 }); }
  const items = Array.isArray(d.items) ? d.items.slice(0, 60) : [];
  const nombre = s(d.nombre, 120), dni = s(d.dni, 30), telefono = s(d.telefono, 40), direccion = s(d.direccion, 300);
  const emailRaw = s(d.email, 120);
  const email = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(emailRaw) ? emailRaw : '';
  if (!items.length || !nombre || !telefono) return Response.json({ ok: false }, { status: 400 });

  let total = 0, pending = false;
  const lines = items.map((x) => {
    const qty = Math.max(1, Math.min(999, parseInt(x.qty, 10) || 1));
    const price = typeof x.price === 'number' && isFinite(x.price) && x.price > 0 ? x.price : null;
    if (price) total += price * qty; else pending = true;
    return '• ' + qty + ' x ' + s(x.name, 200) + ' — ' + (price ? fmt(price * qty) : 'precio a consultar');
  });

  const fecha = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
  const text =
    'Nuevo pedido desde intimatta.com.ar\n' +
    'Fecha: ' + fecha + '\n\n' +
    lines.join('\n') + '\n\n' +
    'Total: ' + fmt(total) + (pending ? ' (+ productos a consultar)' : '') + '\n\n' +
    'Nombre: ' + nombre + '\n' +
    'DNI: ' + dni + '\n' +
    'Teléfono: ' + telefono + '\n' +
    'Email: ' + (email || emailRaw || '-') + '\n' +
    'Entrega: Envío a domicilio\n' +
    'Dirección: ' + direccion + '\n\n' +
    'El cliente fue enviado a WhatsApp con este mismo pedido. Los precios son los que mostraba la página.';

  const r = await env.MAILER.fetch('https://intimatta-mail/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ subject: 'Nuevo pedido de ' + nombre + ' — ' + fmt(total), text, replyTo: email })
  });
  if (!r.ok) {
    const detail = await r.text().catch(() => '');
    return Response.json({ ok: false, error: 'No se pudo enviar el mail', detail: detail.slice(0, 300) }, { status: 500 });
  }
  return Response.json({ ok: true });
}
