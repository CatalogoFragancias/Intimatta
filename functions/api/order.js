// POST /api/order: cuando un cliente envía el pedido por WhatsApp, también se manda una copia por mail.
// El mail lo envía el Worker "intimatta-mail" (binding MAILER).
const fmt = (n) => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const s = (v, max) => String(v == null ? '' : v).replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const h = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Los nombres de producto vienen del navegador: se sacan links para que nadie use el formulario para mandar spam.
const cleanName = (v) => s(v, 120).replace(/(https?:\/\/|www\.)\S*/gi, '').replace(/\b\S+\.(com|net|org|ar|io|ru|xyz|info|biz|link|click|top)\b\S*/gi, '').trim() || 'Producto';

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
  const rows = items.map((x) => {
    const qty = Math.max(1, Math.min(999, parseInt(x.qty, 10) || 1));
    const price = typeof x.price === 'number' && isFinite(x.price) && x.price > 0 ? x.price : null;
    if (price) total += price * qty; else pending = true;
    return { qty, name: cleanName(x.name), sub: price ? fmt(price * qty) : 'precio a consultar' };
  });
  const lines = rows.map((r) => '• ' + r.qty + ' x ' + r.name + ' — ' + r.sub);

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
  // Confirmación al cliente (Resend). Si falla, el pedido igual queda registrado en tu Gmail.
  let confirm = 'sin configurar';
  if (env.RESEND_API_KEY && email) {
    try {
      const totalTxt = fmt(total) + (pending ? ' (+ productos a consultar)' : '');
      const htmlRows = rows.map((x) => '<tr><td style="padding:6px 0;border-bottom:1px solid #D9C3A5">' + x.qty + ' × ' + h(x.name) + '</td><td style="padding:6px 0;border-bottom:1px solid #D9C3A5;text-align:right;white-space:nowrap">' + h(x.sub) + '</td></tr>').join('');
      const html =
        '<div style="background:#F3E7D3;padding:24px;font-family:Georgia,serif;color:#161210">' +
        '<div style="max-width:520px;margin:0 auto;background:#F7EDDC;padding:28px;border:1px solid #D9C3A5">' +
        '<p style="margin:0;font-size:26px">Intimatta<span style="color:#A8324D">✦</span></p>' +
        '<p style="margin:4px 0 20px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#5C4B3B">PERFUMERÍA &amp; COSMÉTICA ÍNTIMA</p>' +
        '<p style="font-size:18px;margin:0 0 8px">¡Hola ' + h(nombre) + '!</p>' +
        '<p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;margin:0 0 18px">Recibimos tu pedido. Te escribimos por WhatsApp para coordinar el pago y el envío.</p>' +
        '<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">' + htmlRows + '</table>' +
        '<p style="font-family:Arial,sans-serif;font-size:16px;margin:16px 0 4px"><b>Total: ' + h(totalTxt) + '</b></p>' +
        '<p style="font-family:Arial,sans-serif;font-size:12px;color:#5C4B3B;margin:0 0 18px">3 cuotas sin interés o 10% off pagando con transferencia.</p>' +
        '<p style="font-family:Arial,sans-serif;font-size:13px;line-height:1.5;margin:0">Envío a: ' + h(direccion) + '</p>' +
        '<p style="font-family:Arial,sans-serif;font-size:12px;color:#5C4B3B;margin:22px 0 0">¿Dudas? Respondé este mail o escribinos a contacto@intimatta.com.ar.<br>Envío discreto a todo el país.</p>' +
        '</div></div>';
      const txt =
        '¡Hola ' + nombre + '!\n\nRecibimos tu pedido. Te escribimos por WhatsApp para coordinar el pago y el envío.\n\n' +
        lines.join('\n') + '\n\nTotal: ' + totalTxt + '\n3 cuotas sin interés o 10% off pagando con transferencia.\n\n' +
        'Envío a: ' + direccion + '\n\n¿Dudas? Respondé este mail o escribinos a contacto@intimatta.com.ar.\nIntimatta — intimatta.com.ar';
      const rr = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: 'Bearer ' + env.RESEND_API_KEY, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: 'Intimatta <pedidos@intimatta.com.ar>',
          to: [email],
          reply_to: 'contacto@intimatta.com.ar',
          subject: 'Recibimos tu pedido — Intimatta',
          html, text: txt
        })
      });
      confirm = rr.ok ? 'enviada' : 'error ' + rr.status + ': ' + (await rr.text()).slice(0, 200);
    } catch (e) { confirm = 'error: ' + String(e).slice(0, 200); }
  }

  if (!r.ok) {
    const detail = await r.text().catch(() => '');
    return Response.json({ ok: false, error: 'No se pudo enviar el mail', detail: detail.slice(0, 300) }, { status: 500 });
  }
  return Response.json({ ok: true, confirm });
}
