// Worker "intimatta-mail": manda un mail a contacto.intimatta@gmail.com.
// Lo llama solo la página (functions/api/order.js) mediante un "service binding" llamado MAILER.
// Usa el binding SEND_EMAIL (ver wrangler.jsonc) y Email Routing activo en intimatta.com.ar,
// con contacto.intimatta@gmail.com verificado como destino.
import { EmailMessage } from 'cloudflare:email';

const FROM = 'pedidos@intimatta.com.ar';
const TO = 'contacto.intimatta@gmail.com';

function b64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Método no permitido', { status: 405 });
    let data;
    try { data = await request.json(); } catch (e) { return new Response('JSON inválido', { status: 400 }); }
    const subject = String(data.subject || 'Nuevo pedido').slice(0, 200);
    const text = String(data.text || '').slice(0, 20000);
    const rt = String(data.replyTo || '').trim();
    const replyTo = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(rt) && rt.length <= 120 ? rt : '';
    const raw = [
      'From: Intimatta Pedidos <' + FROM + '>',
      'To: ' + TO,
      ...(replyTo ? ['Reply-To: ' + replyTo] : []),
      'Subject: =?UTF-8?B?' + b64(subject) + '?=',
      'Message-ID: <' + crypto.randomUUID() + '@intimatta.com.ar>',
      'Date: ' + new Date().toUTCString(),
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      b64(text).replace(/.{76}/g, '$&\r\n')
    ].join('\r\n');
    try {
      await env.SEND_EMAIL.send(new EmailMessage(FROM, TO, raw));
      return Response.json({ ok: true });
    } catch (e) {
      return Response.json({ ok: false, error: String((e && e.message) || e) }, { status: 500 });
    }
  }
};
