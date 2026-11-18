// Intimatta — perfumería y cosmética íntima, pedidos por WhatsApp
(function () {
  'use strict';

  var WHATSAPP = '542212014530';

  // price/old en pesos. price: null = precio a consultar.
  // line: 'perfume' | 'cosmetica' (se ven en la portada) | 'adulto' (solo en mas18.html)
  var PRODUCTS = [
    // Perfumes
    { name: 'Sovrana', cartName: 'Perfume Sovrana', line: 'perfume', gen: 'Donna', price: null, stock: true, img: 'img/perfumes/sovrana.jpg', desc: 'Eau de Parfum · Donna · 60 ml' },
    { name: 'Ammelí', cartName: 'Perfume Ammelí', line: 'perfume', gen: 'Donna', price: null, stock: true, img: 'img/perfumes/ammeli.jpg', desc: 'Eau de Parfum · Donna · 60 ml' },
    { name: 'Alchimia n°9', cartName: 'Perfume Alchimia n°9', line: 'perfume', gen: 'Donna', price: null, stock: true, img: 'img/perfumes/alchimia.jpg', desc: 'Eau de Parfum · Donna · 60 ml' },
    { name: 'Aura', cartName: 'Perfume Aura', line: 'perfume', gen: 'Unisex', price: null, stock: true, img: 'img/perfumes/aura.jpg', desc: 'Eau de Parfum · Unisex · 60 ml' },
    { name: 'Ambush', cartName: 'Perfume Ambush', line: 'perfume', gen: 'Homme', price: null, stock: true, img: 'img/perfumes/ambush.jpg', desc: 'Eau de Parfum · Homme · 60 ml' },

    // Cosmética íntima (portada)
    { name: 'Aceite corporal Hot Inevitable 125 ml', line: 'cosmetica', group: 'Cuidado íntimo', label: 'ACEITE CORPORAL', icon: 'oil', price: 17000, old: 18000, stock: true, desc: 'Aceite corporal con efecto calor para masajes.' },
    { name: 'Aceite para masajes Natural 60 ml', line: 'cosmetica', group: 'Cuidado íntimo', label: 'ACEITE DE MASAJE', icon: 'oil', price: 4500, old: 5000, stock: true, desc: 'Aceite neutro para masajes relajantes.' },
    { name: 'Aceite para masajes Uva 60 ml', line: 'cosmetica', group: 'Cuidado íntimo', label: 'ACEITE DE MASAJE', icon: 'oil', price: 3500, old: 5000, stock: true, desc: 'Aceite de masaje con aroma a uva.' },
    { name: 'Gel íntimo Warming 120 cc', line: 'cosmetica', group: 'Cuidado íntimo', label: 'GEL ÍNTIMO', icon: 'gel', price: 5000, old: 6000, stock: false, desc: 'Gel íntimo a base de agua con efecto calor.' },
    { name: 'Magic Dual — aceite para masajes y gel íntimo', line: 'cosmetica', group: 'Cuidado íntimo', label: 'ACEITE 2 EN 1', icon: 'oil', price: 13000, old: 20000, stock: false, desc: 'Aceite para masajes que también funciona como gel íntimo.' },

    // Línea +18 (solo en mas18.html)
    { name: 'Vibrador Punto G - Gluxe - Control Por Aplicación', line: 'adulto', cat: 'Vibradores', price: 85000, old: 118000, stock: true },
    { name: 'Kit Estimulador Luxury X 5 Recargable', line: 'adulto', cat: 'Vibradores', price: 45000, old: 76000, stock: true },
    { name: 'Estimulador Clitorial Nasty 3 Sex Therapy', line: 'adulto', cat: 'Vibradores', price: 40000, old: 45000, stock: true },
    { name: 'Kit Vibrador + Dilatador Sex Therapy', line: 'adulto', cat: 'Vibradores', price: 40000, old: 45000, stock: true },
    { name: 'LUXURY PURPLE LINE THREE', line: 'adulto', cat: 'Vibradores', price: 39000, old: 53000, stock: false },
    { name: 'Succionador LUXURY MINI FANTASY', line: 'adulto', cat: 'Succionadores', price: 80000, old: 90000, stock: true },
    { name: 'Suction Toy Succionador Vibrador Clitoris', line: 'adulto', cat: 'Succionadores', price: 41000, old: 55000, stock: true },
    { name: 'SUCTION VIBRATION AIREXA', line: 'adulto', cat: 'Succionadores', price: 25000, old: 45000, stock: true },
    { name: 'PURPLE LUMO', line: 'adulto', cat: 'Succionadores', price: 22000, old: 26000, stock: false },
    { name: 'Consolador Real Cock 2 - Dildo Realista - Ventosa', line: 'adulto', cat: 'Dildos', price: 30000, old: 35000, stock: true },
    { name: 'REAL COCK 3', line: 'adulto', cat: 'Dildos', price: 28000, old: 34000, stock: true },
    { name: 'REAL COCK 2', line: 'adulto', cat: 'Dildos', price: 18000, old: 21000, stock: false },
    { name: 'Masturbador Succionador Masculino Sex Therapy Xp3', line: 'adulto', cat: 'Masculinos', price: 135000, old: 190000, stock: true },
    { name: 'Bomba Peneana Penis Pump 13 22cm X 6,9 Cm', line: 'adulto', cat: 'Masculinos', price: 25000, old: 45900, stock: true },
    { name: 'Masturbador Masculino York 10 + 5 Vibraciones Recargable', line: 'adulto', cat: 'Masculinos', price: 50000, old: 67000, stock: false },
    { name: 'Kit Pleasure - Plug Anal, Bala Vibradora - Sex Therapy', line: 'adulto', cat: 'Anales', price: 70000, old: 97000, stock: true },
    { name: 'Vibrador Anal Cesar 10 Modos 15 Cm Recargable', line: 'adulto', cat: 'Anales', price: 50500, old: 89000, stock: true },
    { name: 'Jimy 2 Vibrador Anal Texturado', line: 'adulto', cat: 'Anales', price: 41000, old: 60000, stock: true },
    { name: 'Plug Anal Steel Pequeño', line: 'adulto', cat: 'Anales', price: 20000, old: 24000, stock: true },
    { name: 'Kit Bondage: Esposas, Correa, Latigo, Mordaza, Antifaz Negro', line: 'adulto', cat: 'BDSM', price: 53000, old: 75000, stock: true },
    { name: 'Pezoneras Champs 8 Metal Y Goma Suave Ajustable', line: 'adulto', cat: 'BDSM', price: 15000, old: 20500, stock: true },
    { name: 'Antifaz Cuero Resistente Adaptable', line: 'adulto', cat: 'BDSM', price: 11000, old: 15000, stock: true },
    { name: 'Esposas De Cuero Rosa Ajustables', line: 'adulto', cat: 'BDSM', price: 10000, old: 11000, stock: true },
    { name: 'Body Berlin - Negro', line: 'cosmetica', group: 'Lencería', label: 'LENCERÍA', icon: 'lace', price: 25000, old: 27000, stock: true },
    { name: 'Body Ramos Encaje', line: 'cosmetica', group: 'Lencería', label: 'LENCERÍA', icon: 'lace', price: 31000, old: 35000, stock: true },
    { name: 'Conjunto Kiss Lenceria Cola Less - Negro', line: 'cosmetica', group: 'Lencería', label: 'LENCERÍA', icon: 'lace', price: 28000, old: 30000, stock: true },
    { name: 'BUSTIER LADY NEGRO - BORDO', line: 'cosmetica', group: 'Lencería', label: 'LENCERÍA', icon: 'lace', price: 36000, old: 40000, stock: true },
    { name: 'Body Cosmos De Encaje', line: 'cosmetica', group: 'Lencería', label: 'LENCERÍA', icon: 'lace', price: 24000, old: 26000, stock: true },
    { name: 'OLEO ORGASMICO ESTIMULANTE XXX FOR HER', line: 'adulto', cat: 'Geles y estimulantes', price: 14000, old: 16000, stock: true },
    { name: 'GEL INTIMO SENS BOMB - MACA 70 GRS', line: 'adulto', cat: 'Geles y estimulantes', price: 11000, old: 12000, stock: false },
    { name: 'GEL INTIMO LUBRICANTE ANAL DESIRE COCONUT', line: 'adulto', cat: 'Geles y estimulantes', price: 8000, old: 10000, stock: false },
    { name: 'GEL INTIMO BUTT 120 CC', line: 'adulto', cat: 'Geles y estimulantes', price: 5000, old: 6000, stock: false }
  ];

  var ICONS = {
    oil: '<svg class="ph-icon" width="96" height="140" viewBox="0 0 64 96" fill="none" stroke="#161210" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M27 4h10v8H27z" fill="#A8324D"/><path d="M25 12h14v8H25z"/><path d="M22 20h20c4 0 8 4 8 9v55c0 4-3 8-8 8H22c-5 0-8-4-8-8V29c0-5 4-9 8-9z" fill="#F7EDDC"/><path d="M14 52h36v32c0 4-3 8-8 8H22c-5 0-8-4-8-8z" fill="#E7C27A" opacity=".55"/><path d="M22 40h20M22 46h14"/></svg>',
    lace: '<svg class="ph-icon" width="96" height="140" viewBox="0 0 64 96" fill="none" stroke="#161210" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 22c0-5 6-5 6-9s-3-6-6-6-6 2-6 5"/><path d="M32 22L6 44h52z"/><path d="M14 44c0 10 4 18 18 30 14-12 18-20 18-30" fill="#E58AA0" opacity=".45"/><path d="M20 54c4 2 8 2 12 0s8-2 12 0"/></svg>',
    gel: '<svg class="ph-icon" width="96" height="140" viewBox="0 0 64 96" fill="none" stroke="#161210" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M24 4h16v12H24z" fill="#A8324D"/><path d="M20 16h24l6 70H14z" fill="#F7EDDC"/><path d="M14 86h36" stroke-width="3"/><path d="M22 40h20M23 48h14"/><path d="M32 60c-4 5-6 8-6 11a6 6 0 0 0 12 0c0-3-2-6-6-11z" fill="#E58AA0" opacity=".7"/></svg>'
  };

  var page = document.body.getAttribute('data-page');
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  // $85.000 igual en todos los navegadores
  var fmt = function (n) { return '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  // ---------- Tarjeta de producto ----------
  function productCard(p, label, dark) {
    var i = PRODUCTS.indexOf(p);
    var img = p.img
      ? '<div class="product-img photo"><img src="' + esc(p.img) + '" width="700" height="875" alt="' + esc(p.name) + '" loading="lazy"></div>'
      : p.icon
        ? '<div class="product-img">' + ICONS[p.icon] + '</div>'
        : '<div class="product-img"><span>' + esc(p.name.charAt(0)) + '</span></div>';
    var prices = p.price
      ? '<span class="old">' + fmt(p.old) + '</span><span class="price-row"><span class="price">' + fmt(p.price) + '</span><span class="off">' + Math.round((1 - p.price / p.old) * 100) + '% OFF</span></span><span class="small">3 cuotas sin interés</span>'
      : '<span class="price-row"><span class="price">Precio a consultar</span></span><span class="small">Consultanos por WhatsApp</span>';
    var btn = p.stock
      ? '<button type="button" class="add" data-add="' + i + '">AGREGAR</button>'
      : '<button type="button" class="add" disabled>SIN STOCK</button>';
    return '<article class="product' + (dark ? ' product-dark' : '') + '">' + img +
      '<p class="product-cat">' + esc(label) + '</p>' +
      '<h3>' + esc(p.name) + '</h3>' +
      (p.desc ? '<p class="product-desc">' + esc(p.desc) + '</p>' : '') +
      '<div class="prices">' + prices + '</div>' + btn + '</article>';
  }

  function setupChips(container, onPick) {
    container.addEventListener('click', function (e) {
      var b = e.target; while (b && b !== container && b.tagName !== 'BUTTON') b = b.parentNode;
      if (!b || b === container) return;
      $$('.chip', container).forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
      b.classList.add('active'); b.setAttribute('aria-pressed', 'true');
      onPick(b.getAttribute('data-filter'));
    });
  }

  // ---------- Portada: cartas ----------
  var CARDS = [
    { id: 'emperatriz', numeral: 'III', name: 'La Emperatriz', title: 'Perfumes Donna', label: 'PERFUMES DE MUJER', filter: function (p) { return p.line === 'perfume' && p.gen === 'Donna'; }, meaning: 'Abundancia, belleza y una presencia que se siente.', dark: true },
    { id: 'emperador', numeral: 'IV', name: 'El Emperador', title: 'Perfumes Homme', label: 'PERFUMES DE HOMBRE', filter: function (p) { return p.line === 'perfume' && p.gen === 'Homme'; }, meaning: 'Firmeza, seguridad y una estela que no pide permiso.', dark: true },
    { id: 'enamorados', numeral: 'VI', name: 'Los Enamorados', title: 'Perfumes Unisex', label: 'PERFUMES UNISEX', filter: function (p) { return p.line === 'perfume' && p.gen === 'Unisex'; }, meaning: 'Elegirse y compartir: fragancias para cualquier piel.', dark: true },
    { id: 'placer', numeral: 'II', name: 'El Placer', title: 'Lencería y cosmética íntima', label: 'LENCERÍA Y COSMÉTICA', filter: function (p) { return p.line === 'cosmetica'; }, meaning: 'Aceites, geles, cremas y lencería para tus rituales de cuidado.', dark: false }
  ];
  var cardById = function (id) { return CARDS.filter(function (c) { return c.id === id; })[0]; };

  function renderCatalog(c, group) {
    var list = PRODUCTS.filter(c.filter);
    var groups = [];
    list.forEach(function (p) { if (p.group && groups.indexOf(p.group) < 0) groups.push(p.group); });
    var chips = $('#catalog-chips');
    if (groups.length > 1) {
      chips.hidden = false;
      chips.innerHTML = ['Todo'].concat(groups).map(function (g, i) {
        var on = (group || 'Todo') === g;
        return '<button type="button" class="chip' + (on ? ' active' : '') + '" data-group="' + esc(g) + '" aria-pressed="' + on + '">' + esc(g) + '</button>';
      }).join('');
    } else { chips.hidden = true; chips.innerHTML = ''; }
    var shown = list.filter(function (p) { return !group || group === 'Todo' || p.group === group; });
    $('#catalog-count').textContent = shown.length + (shown.length === 1 ? ' PRODUCTO' : ' PRODUCTOS');
    $('#catalog-grid').innerHTML = shown.map(function (p) {
      return productCard(p, p.label || ('PERFUME ' + String(p.gen).toUpperCase()), c.dark);
    }).join('');
  }
  var currentCard = null;
  function openCard(id) {
    var c = cardById(id); if (!c || !$('#catalog')) return;
    currentCard = c;
    $('#catalog').className = 'overlay catalog' + (c.dark ? ' catalog-dark' : '');
    $('#catalog-img').src = 'img/cartas/' + c.id + '.jpg?v=5';
    $('#catalog-img').alt = 'Carta del tarot: ' + c.name;
    $('#catalog-arcano').textContent = c.numeral + ' · ' + c.name.toUpperCase();
    $('#catalog-name').textContent = c.title;
    $('#catalog-meaning').textContent = c.meaning;
    renderCatalog(c, null);
    var ov = $('#catalog'); ov.hidden = false; ov.scrollTop = 0; lock();
    try { history.replaceState(null, '', '#' + c.id); } catch (e) {}
  }
  function closeCatalog() {
    if (!$('#catalog')) return;
    $('#catalog').hidden = true; lock();
    try { history.replaceState(null, '', '#cartas'); } catch (e) {}
  }

  if (page === 'home' && $('#cards-grid')) {
    $('#cards-grid').innerHTML = CARDS.map(function (c) {
      return '<button type="button" class="tarot" data-open-card="' + c.id + '" aria-label="' + esc(c.name) + ': ver ' + esc(c.title.toLowerCase()) + '">' +
        '<span class="tarot-outer"><span class="tarot-inner">' +
        '<span class="tarot-img"><img src="img/cartas/' + c.id + '.jpg?v=5" alt="Carta del tarot: ' + esc(c.name) + '"></span>' +
        '<span class="rule"><span>✦</span></span>' +
        '<span class="tarot-cat">' + esc(c.label) + '</span>' +
        '<span class="tarot-sign">INTIMATTA</span>' +
        '</span></span></button>';
    }).join('');
    $('#catalog-chips').addEventListener('click', function (e) {
      var t = e.target; while (t && t.tagName !== 'BUTTON') t = t.parentNode;
      if (t && currentCard) renderCatalog(currentCard, t.getAttribute('data-group'));
    });
  }

  // ---------- Línea +18 ----------
  if (page === 'adult' && $('#adult-grid')) {
    var adult = PRODUCTS.filter(function (p) { return p.line === 'adulto'; });
    var cats = [];
    adult.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
    $('#adult-chips').innerHTML = '<button type="button" class="chip active" data-filter="todos" aria-pressed="true">Todo</button>' +
      cats.map(function (c) { return '<button type="button" class="chip" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c) + '</button>'; }).join('');
    var renderAdult = function (f) {
      $('#adult-grid').innerHTML = adult.filter(function (p) { return f === 'todos' || p.cat === f; })
        .map(function (p) { return productCard(p, p.cat.toUpperCase(), false); }).join('');
    };
    renderAdult('todos');
    setupChips($('#adult-chips'), renderAdult);

    var showAdult = function () { $('#age-gate').hidden = true; $('#adult-content').hidden = false; document.body.classList.remove('locked'); };
    if (store.get('intimatta-18', false)) showAdult(); else document.body.classList.add('locked');
    $('#age-yes').addEventListener('click', function () { store.set('intimatta-18', true); showAdult(); });
  }

  // ---------- Carrito (se arma igual en las dos páginas) ----------
  var root = $('#cart-root');
  if (!root) { root = document.createElement('div'); root.id = 'cart-root'; document.body.appendChild(root); }
  root.innerHTML =
    '<button type="button" class="fab" id="fab" data-open-cart hidden>' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>' +
      'VER CARRITO (<span data-cart-count>0</span>)</button>' +
    '<div class="overlay cart-overlay" id="cart" hidden>' +
      '<button type="button" class="cart-backdrop" data-close-cart aria-label="Cerrar carrito"></button>' +
      '<aside class="cart-panel" aria-label="Carrito">' +
        '<div class="cart-head"><h2>Tu pedido<sup>✦</sup></h2>' +
          '<button type="button" class="icon-btn" data-close-cart aria-label="Cerrar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
        '<div id="cart-empty" class="cart-empty"><span class="rose">✦</span><p class="cart-empty-title">Tu carrito está vacío</p>' +
          '<p class="muted">Elegí tu fragancia o un producto de cuidado.</p>' +
          '<button type="button" class="btn btn-dark" data-close-cart>SEGUIR MIRANDO</button></div>' +
        '<div id="cart-full" hidden>' +
          '<div class="cart-lines" id="cart-lines"></div>' +
          '<div class="cart-total"><span>TOTAL</span><strong id="cart-total">$0</strong></div>' +
          '<p class="small">3 cuotas sin interés o 10% off pagando con transferencia.</p>' +
          '<p class="small rose" id="cart-pending" hidden>Los perfumes tienen precio a consultar: te lo confirmamos por WhatsApp.</p>' +
          '<form id="order-form" class="order-form" novalidate>' +
            '<p class="eyebrow">TUS DATOS</p>' +
            '<label>NOMBRE Y APELLIDO<input type="text" name="nombre" autocomplete="name" required></label>' +
            '<label>DNI<input type="text" name="dni" inputmode="numeric" required></label>' +
            '<label>TELÉFONO<input type="tel" name="telefono" autocomplete="tel" required></label>' +
            '<label>DIRECCIÓN DE ENVÍO<input type="text" name="direccion" autocomplete="street-address" placeholder="Calle, número, piso, ciudad y código postal" required></label>' +
            '<p class="error" id="form-error" role="alert" hidden>Completá todos los datos para enviar el pedido.</p>' +
            '<button type="submit" class="btn btn-wa"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>ENVIAR PEDIDO POR WHATSAPP</button>' +
            '<p class="small">Se abre WhatsApp con tu pedido listo. Te respondemos para coordinar el pago y el envío.</p>' +
          '</form>' +
        '</div>' +
      '</aside>' +
    '</div>';

  var cart = store.get('intimatta-cart', []) || [];
  var saveCart = function () { store.set('intimatta-cart', cart); };

  function addToCart(p) {
    var name = p.cartName || p.name;
    var line = cart.filter(function (x) { return x.name === name; })[0];
    if (line) line.qty += 1; else cart.push({ name: name, price: p.price, qty: 1 });
    saveCart(); renderCart();
  }
  function changeQty(name, d) {
    cart.forEach(function (x) { if (x.name === name) x.qty += d; });
    cart = cart.filter(function (x) { return x.qty > 0; });
    saveCart(); renderCart();
  }
  function renderCart() {
    var count = cart.reduce(function (a, x) { return a + x.qty; }, 0);
    var total = cart.reduce(function (a, x) { return a + (x.price ? x.price * x.qty : 0); }, 0);
    $$('[data-cart-count]').forEach(function (el) { el.textContent = count; });
    $('#fab').hidden = count === 0 || !$('#cart').hidden;
    $('#cart-empty').hidden = cart.length > 0;
    $('#cart-full').hidden = cart.length === 0;
    $('#cart-total').textContent = fmt(total);
    $('#cart-pending').hidden = !cart.some(function (x) { return !x.price; });
    $('#cart-lines').innerHTML = cart.map(function (x) {
      return '<div class="line"><div class="line-top"><span class="line-name">' + esc(x.name) + '</span>' +
        '<span class="line-sub">' + (x.price ? fmt(x.price * x.qty) : 'A consultar') + '</span></div>' +
        '<div class="line-bottom"><div class="qty">' +
        '<button type="button" aria-label="Restar uno" data-qty="-1" data-name="' + esc(x.name) + '">−</button>' +
        '<span>' + x.qty + '</span>' +
        '<button type="button" aria-label="Sumar uno" data-qty="1" data-name="' + esc(x.name) + '">+</button></div>' +
        '<button type="button" class="remove" data-remove data-name="' + esc(x.name) + '">Quitar</button></div></div>';
    }).join('');
  }
  function lock() { document.body.classList.toggle('locked', !$('#cart').hidden || ($('#catalog') && !$('#catalog').hidden) || (page === 'adult' && !$('#age-gate').hidden)); }
  function openCart() { $('#cart').hidden = false; renderCart(); lock(); }
  function closeCart() { $('#cart').hidden = true; renderCart(); lock(); }

  document.addEventListener('click', function (e) {
    var t = e.target;
    while (t && t !== document && !(t.tagName === 'BUTTON' || t.tagName === 'A')) t = t.parentNode;
    if (!t || t === document) return;
    if (t.hasAttribute('data-open-card')) { openCard(t.getAttribute('data-open-card')); return; }
    if (t.hasAttribute('data-close-catalog')) { closeCatalog(); return; }
    if (t.hasAttribute('data-open-cart')) { openCart(); return; }
    if (t.hasAttribute('data-close-cart')) { closeCart(); return; }
    if (t.hasAttribute('data-add')) {
      addToCart(PRODUCTS[+t.getAttribute('data-add')]);
      t.textContent = 'AGREGADO ✓'; t.classList.add('added');
      setTimeout(function () { t.textContent = 'AGREGAR'; t.classList.remove('added'); }, 1200);
      return;
    }
    if (t.hasAttribute('data-qty')) { changeQty(t.getAttribute('data-name'), +t.getAttribute('data-qty')); return; }
    if (t.hasAttribute('data-remove')) { changeQty(t.getAttribute('data-name'), -Infinity); return; }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!$('#cart').hidden) closeCart(); else if ($('#catalog') && !$('#catalog').hidden) closeCatalog();
  });

  $('#order-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var d = { nombre: f.nombre.value.trim(), dni: f.dni.value.trim(), telefono: f.telefono.value.trim(), direccion: f.direccion.value.trim() };
    var ok = cart.length > 0 && d.nombre && d.dni && d.telefono && d.direccion;
    $('#form-error').hidden = !!ok;
    if (!ok) return;
    var total = cart.reduce(function (a, x) { return a + (x.price ? x.price * x.qty : 0); }, 0);
    var pending = cart.some(function (x) { return !x.price; });
    var msg = 'Hola Intimatta! Quiero hacer este pedido:\n\n' +
      cart.map(function (x) { return '• ' + x.qty + ' x ' + x.name + ' — ' + (x.price ? fmt(x.price * x.qty) : 'precio a consultar'); }).join('\n') +
      '\n\nTotal: ' + fmt(total) + (pending ? ' (+ productos a consultar)' : '') +
      '\n\nNombre: ' + d.nombre + '\nDNI: ' + d.dni + '\nTeléfono: ' + d.telefono +
      '\nEntrega: Envío a domicilio\nDirección: ' + d.direccion;
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
    var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isMobile) { window.location.href = url; return; }
    var w = null;
    try { w = window.open(url, '_blank'); } catch (err) { w = null; }
    if (w) { try { w.opener = null; } catch (err) {} } else { window.location.href = url; }
  });

  renderCart();
  // Abrir una carta desde el link (ej: .../#emperatriz)
  var h = (location.hash || '').slice(1);
  if (page === 'home' && cardById(h)) openCard(h);
  window.addEventListener('hashchange', function () {
    var k = (location.hash || '').slice(1);
    if (page === 'home' && cardById(k) && (!currentCard || currentCard.id !== k || $('#catalog').hidden)) openCard(k);
  });
})();
