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
    { name: 'Aceite corporal Hot Inevitable 125 ml', line: 'cosmetica', group: 'Cuidado íntimo', label: 'ACEITE CORPORAL', img: 'img/cosmetica/aceite-hot-inevitable.jpg', icon: 'oil', price: 17000, old: 18000, stock: true, desc: 'Aceite corporal con efecto calor para masajes.' },
    { name: 'Aceite para masajes Natural 60 ml', line: 'cosmetica', group: 'Cuidado íntimo', label: 'ACEITE DE MASAJE', img: 'img/cosmetica/aceite-natural-60ml.jpg', icon: 'oil', price: 4500, old: 5000, stock: true, desc: 'Aceite neutro para masajes relajantes.' },
    { name: 'Aceite para masajes Uva 60 ml', line: 'cosmetica', group: 'Cuidado íntimo', label: 'ACEITE DE MASAJE', img: 'img/cosmetica/aceite-uva-60ml.jpg', icon: 'oil', price: 3500, old: 5000, stock: true, desc: 'Aceite de masaje con aroma a uva.' },
    { name: 'Gel íntimo Warming 120 cc', line: 'cosmetica', group: 'Cuidado íntimo', label: 'GEL ÍNTIMO', img: 'img/cosmetica/gel-warming-120cc.jpg', icon: 'gel', price: 5000, old: 6000, stock: false, desc: 'Gel íntimo a base de agua con efecto calor.' },
    { name: 'Magic Dual — aceite para masajes y gel íntimo', line: 'cosmetica', group: 'Cuidado íntimo', label: 'ACEITE 2 EN 1', img: 'img/cosmetica/magic-dual.jpg', icon: 'oil', price: 13000, old: 20000, stock: false, desc: 'Aceite para masajes que también funciona como gel íntimo.' },

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

  // Copia original de cada producto. Los cambios del panel (/api/products) se aplican encima,
  // usando como clave el nombre original que está acá arriba.
  PRODUCTS.forEach(function (p) { p.key = p.name; });
  var BASE = {};
  PRODUCTS.forEach(function (p) { BASE[p.key] = { name: p.name, cartName: p.cartName, desc: p.desc || '', price: p.price, old: p.old || null, stock: p.stock, img: p.img || '', imgs: p.img ? [p.img] : [], talles: p.talles || [] }; });
  var OVERRIDES = {};
  // Promociones generales (se cambian desde el panel)
  var SETTINGS = { cuotas: 3, transferencia: 10, envioGratis: 0, promoOn: true, promoText: '', descuentos: { perfumes: 0, cosmetica: 0, lenceria: 0, adulto: 0 } };
  function sectionOf(p) {
    if (p.line === 'perfume') return 'perfumes';
    if (p.line === 'adulto') return 'adulto';
    return p.group === 'Lencería' ? 'lenceria' : 'cosmetica';
  }
  function applyOverrides(ov, st) {
    OVERRIDES = ov && typeof ov === 'object' ? ov : {};
    if (st && typeof st === 'object') {
      SETTINGS = {
        cuotas: +st.cuotas >= 0 ? +st.cuotas : 3,
        transferencia: +st.transferencia >= 0 ? +st.transferencia : 10,
        envioGratis: +st.envioGratis > 0 ? +st.envioGratis : 0,
        promoOn: st.promoOn !== false,
        promoText: st.promoText || '',
        descuentos: Object.assign({ perfumes: 0, cosmetica: 0, lenceria: 0, adulto: 0 }, st.descuentos || {})
      };
    }
    PRODUCTS.forEach(function (p) {
      var b = BASE[p.key], o = OVERRIDES[p.key] || {};
      p.name = o.name || b.name;
      p.desc = o.desc !== undefined ? o.desc : b.desc;
      // listPrice / rawOld: lo que se edita en el panel. price / old: lo que se muestra, con el descuento de la sección.
      p.listPrice = o.price !== undefined ? o.price : b.price;
      p.rawOld = o.old !== undefined ? o.old : b.old;
      var pct = +SETTINGS.descuentos[sectionOf(p)] || 0;
      if (pct > 0 && p.listPrice) {
        p.price = Math.round(p.listPrice * (1 - pct / 100));
        p.old = Math.max(p.rawOld || 0, p.listPrice);
      } else {
        p.price = p.listPrice;
        p.old = p.rawOld;
      }
      p.stock = o.stock !== undefined ? o.stock : b.stock;
      p.imgs = Array.isArray(o.imgs) ? o.imgs.slice(0, 4) : (o.img ? [o.img] : b.imgs.slice());
      p.img = p.imgs[0] || undefined;
      p.talles = Array.isArray(o.talles) ? o.talles.slice(0, 12) : b.talles.slice();
      if (b.cartName) p.cartName = o.name ? b.cartName.replace(b.name, o.name) : b.cartName;
    });
  }

  applyOverrides({}, null);

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
    var pics = p.imgs || [];
    var img = pics.length > 1
      ? '<div class="product-img photo gallery">' +
          '<div class="gal-track">' + pics.map(function (u, k) {
            return '<img src="' + esc(u) + '" width="700" height="875" alt="' + esc(p.name) + (k ? ' (foto ' + (k + 1) + ')' : '') + '" loading="lazy">';
          }).join('') + '</div>' +
          '<button type="button" class="gal-btn gal-prev" data-gal-step="-1" aria-label="Foto anterior">‹</button>' +
          '<button type="button" class="gal-btn gal-next" data-gal-step="1" aria-label="Foto siguiente">›</button>' +
          '<div class="gal-dots">' + pics.map(function (u, k) { return '<span' + (k ? '' : ' class="on"') + '></span>'; }).join('') + '</div>' +
        '</div>'
      : p.img
      ? '<div class="product-img photo"><img src="' + esc(p.img) + '" width="700" height="875" alt="' + esc(p.name) + '" loading="lazy"></div>'
      : p.icon
        ? '<div class="product-img">' + ICONS[p.icon] + '</div>'
        : '<div class="product-img"><span>' + esc(p.name.charAt(0)) + '</span></div>';
    var hasOff = p.price && p.old && p.old > p.price;
    var prices = p.price
      ? (hasOff ? '<span class="old">' + fmt(p.old) + '</span>' : '') + '<span class="price-row"><span class="price">' + fmt(p.price) + '</span>' + (hasOff ? '<span class="off">' + Math.round((1 - p.price / p.old) * 100) + '% OFF</span>' : '') + '</span>' + (SETTINGS.cuotas > 0 ? '<span class="small">' + SETTINGS.cuotas + ' cuotas sin interés de ' + fmt(p.price / SETTINGS.cuotas) + '</span>' : '')
      : '<span class="price-row"><span class="price">Precio a consultar</span></span><span class="small">Consultanos por WhatsApp</span>';
    var btn = p.stock
      ? '<button type="button" class="add" data-add="' + i + '">AGREGAR</button>'
      : '<button type="button" class="add" disabled>SIN STOCK</button>';
    var sizes = p.talles && p.talles.length
      ? '<div class="sizes" role="group" aria-label="Elegí tu talle"><span class="sizes-label">TALLE</span>' +
          p.talles.map(function (t) { return '<button type="button" class="size" data-size="' + esc(t) + '" aria-pressed="false">' + esc(t) + '</button>'; }).join('') +
        '</div><p class="size-hint" hidden>Elegí un talle para agregarlo.</p>'
      : '';
    return '<article class="product' + (dark ? ' product-dark' : '') + '">' + img +
      '<p class="product-cat">' + esc(label) + '</p>' +
      '<h3>' + esc(p.name) + '</h3>' +
      (p.desc ? '<p class="product-desc">' + esc(p.desc) + '</p>' : '') +
      '<div class="prices">' + prices + '</div>' + (p.stock ? sizes : '') + btn + '</article>';
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
    { id: 'placer', numeral: 'II', name: 'El Placer', title: 'Cosmética íntima', label: 'COSMÉTICA ÍNTIMA', filter: function (p) { return p.line === 'cosmetica' && p.group !== 'Lencería'; }, meaning: 'Aceites, geles y cremas para tus rituales de cuidado.', dark: false },
    { id: 'lujuria', numeral: 'XI', name: 'Lujuria', title: 'Lencería', label: 'LENCERÍA', filter: function (p) { return p.line === 'cosmetica' && p.group === 'Lencería'; }, meaning: 'Vestirte para vos: encaje, transparencias y actitud.', dark: false }
  ];
  var cardById = function (id) { return CARDS.filter(function (c) { return c.id === id; })[0]; };

  var currentGroup = null;
  function renderCatalog(c, group) {
    currentGroup = group;
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
    $('#catalog-img').src = 'img/cartas/' + c.id + '.jpg?v=7';
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
        '<span class="tarot-img"><img src="img/cartas/' + c.id + '.jpg?v=7" alt="Carta del tarot: ' + esc(c.name) + '"></span>' +
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
  var renderAdult = null;
  if (page === 'adult' && $('#adult-grid')) {
    var adult = PRODUCTS.filter(function (p) { return p.line === 'adulto'; });
    var cats = [];
    adult.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
    $('#adult-chips').innerHTML = '<button type="button" class="chip active" data-filter="todos" aria-pressed="true">Todo</button>' +
      cats.map(function (c) { return '<button type="button" class="chip" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c) + '</button>'; }).join('');
    var adultFilter = 'todos';
    renderAdult = function (f) {
      adultFilter = f || adultFilter;
      $('#adult-grid').innerHTML = adult.filter(function (p) { return adultFilter === 'todos' || p.cat === adultFilter; })
        .map(function (p) { return productCard(p, p.cat.toUpperCase(), false); }).join('');
    };
    renderAdult('todos');
    setupChips($('#adult-chips'), renderAdult);

    var showAdult = function () { $('#age-gate').hidden = true; $('#adult-content').hidden = false; document.body.classList.remove('locked'); };
    // Se pregunta siempre, cada vez que se entra a la Línea +18 (no se recuerda la respuesta)
    try { localStorage.removeItem('intimatta-18'); } catch (e) {}
    document.body.classList.add('locked');
    $('#age-yes').addEventListener('click', showAdult);
    // Si vuelven con el botón atrás, volver a preguntar
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) { $('#age-gate').hidden = false; $('#adult-content').hidden = true; document.body.classList.add('locked'); }
    });
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
        '<div id="cart-done" class="cart-empty" hidden><span class="rose">✦</span><p class="cart-empty-title">¡Tu pedido fue procesado!</p>' +
          '<p class="muted">Te respondemos por WhatsApp para coordinar el pago y el envío. Gracias por elegir Intimatta.</p>' +
          '<button type="button" class="btn btn-dark" data-order-home>VOLVER A LA TIENDA</button></div>' +
        '<div id="cart-full" hidden>' +
          '<div class="cart-lines" id="cart-lines"></div>' +
          '<div class="cart-total"><span>TOTAL</span><strong id="cart-total">$0</strong></div>' +
          '<p class="small rose" id="cart-transfer" hidden></p>' +
          '<p class="small" id="cart-ship"></p>' +
          '<p class="small" id="cart-paytext"></p>' +
          '<p class="small rose" id="cart-pending" hidden>Los perfumes tienen precio a consultar: te lo confirmamos por WhatsApp.</p>' +
          '<form id="order-form" class="order-form" novalidate>' +
            '<p class="eyebrow">TUS DATOS</p>' +
            '<label>NOMBRE Y APELLIDO<input type="text" name="nombre" autocomplete="name" required></label>' +
            '<label>DNI<input type="text" name="dni" inputmode="numeric" required></label>' +
            '<label>TELÉFONO<input type="tel" name="telefono" autocomplete="tel" required></label>' +
            '<label>EMAIL<input type="email" name="email" autocomplete="email" inputmode="email" required></label>' +
            '<label>DIRECCIÓN DE ENVÍO<input type="text" name="direccion" autocomplete="street-address" placeholder="Calle, número, piso, ciudad y código postal" required></label>' +
            '<p class="error" id="form-error" role="alert" hidden>Completá todos los datos para enviar el pedido.</p>' +
            '<button type="submit" class="btn btn-wa"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>ENVIAR PEDIDO POR WHATSAPP</button>' +
            '<p class="small">Se abre WhatsApp con tu pedido listo. Te respondemos para coordinar el pago y el envío.</p>' +
          '</form>' +
        '</div>' +
      '</aside>' +
    '</div>';

  var cart = store.get('intimatta-cart', []) || [];
  var orderDone = false;
  var saveCart = function () { store.set('intimatta-cart', cart); };

  function addToCart(p, size) {
    var name = (p.cartName || p.name) + (size ? ' — Talle ' + size : '');
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
    $('#cart-done').hidden = !orderDone;
    $('#cart-empty').hidden = orderDone || cart.length > 0;
    $('#cart-full').hidden = orderDone || cart.length === 0;
    $('#cart-total').textContent = fmt(total);
    var tr = +SETTINGS.transferencia || 0;
    $('#cart-transfer').hidden = !(tr > 0 && total > 0);
    $('#cart-transfer').textContent = 'Total pagando con transferencia (' + tr + '% off): ' + fmt(total * (1 - tr / 100));
    var eg = +SETTINGS.envioGratis || 0;
    $('#cart-ship').textContent = eg > 0
      ? (total >= eg ? '¡Tenés envío gratis!' : 'Envío a cargo del comprador. Te faltan ' + fmt(eg - total) + ' para el envío gratis.')
      : 'Envío a cargo del comprador.';
    $('#cart-paytext').textContent = payText();
    $('#cart-paytext').hidden = !payText();
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
  function lock() { document.body.classList.toggle('locked', !$('#cart').hidden || ($('#catalog') && !$('#catalog').hidden) || (page === 'adult' && !$('#age-gate').hidden) || ($('#menu') && !$('#menu').hidden) || ($('#admin') && !$('#admin').hidden)); }
  function openCart() { $('#cart').hidden = false; renderCart(); lock(); }
  function closeCart() { $('#cart').hidden = true; renderCart(); lock(); }

  document.addEventListener('click', function (e) {
    var t = e.target;
    while (t && t !== document && !(t.tagName === 'BUTTON' || t.tagName === 'A')) t = t.parentNode;
    if (!t || t === document) return;
    if (t.hasAttribute('data-open-card')) { openCard(t.getAttribute('data-open-card')); return; }
    if (t.hasAttribute('data-close-catalog')) { closeCatalog(); return; }
    if (t.hasAttribute('data-open-cart')) { openCart(); return; }
    if (t.hasAttribute('data-close-cart')) { if (orderDone) goHome(); else closeCart(); return; }
    if (t.hasAttribute('data-order-home')) { goHome(); return; }
    if (t.hasAttribute('data-gal-step')) {
      var tr = t.parentNode.querySelector('.gal-track');
      var n = tr.children.length, cur = Math.round(tr.scrollLeft / tr.clientWidth);
      var next = (cur + (+t.getAttribute('data-gal-step')) + n) % n;
      tr.scrollTo({ left: next * tr.clientWidth, behavior: 'smooth' });
      return;
    }
    if (t.hasAttribute('data-size')) {
      var grp = t.parentNode;
      $$('.size', grp).forEach(function (b) { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); });
      t.classList.add('on'); t.setAttribute('aria-pressed', 'true');
      var hint = grp.parentNode.querySelector('.size-hint'); if (hint) hint.hidden = true;
      return;
    }
    if (t.hasAttribute('data-add')) {
      var prod = PRODUCTS[+t.getAttribute('data-add')], card = t.closest('.product'), size = null;
      if (prod.talles && prod.talles.length) {
        var sel = card && card.querySelector('.size.on');
        if (!sel) { var h2 = card && card.querySelector('.size-hint'); if (h2) h2.hidden = false; return; }
        size = sel.getAttribute('data-size');
      }
      addToCart(prod, size);
      t.textContent = 'AGREGADO ✓'; t.classList.add('added');
      setTimeout(function () { t.textContent = 'AGREGAR'; t.classList.remove('added'); }, 1200);
      return;
    }
    if (t.hasAttribute('data-qty')) { changeQty(t.getAttribute('data-name'), +t.getAttribute('data-qty')); return; }
    if (t.hasAttribute('data-remove')) { changeQty(t.getAttribute('data-name'), -Infinity); return; }
  });
  // Galería de fotos de cada producto: actualizar los puntitos al deslizar
  document.addEventListener('scroll', function (e) {
    var tr = e.target;
    if (!tr || !tr.classList || !tr.classList.contains('gal-track')) return;
    var k = Math.round(tr.scrollLeft / tr.clientWidth);
    var dots = tr.parentNode.querySelectorAll('.gal-dots span');
    for (var i = 0; i < dots.length; i++) dots[i].className = i === k ? 'on' : '';
  }, true);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if ($('#admin') && !$('#admin').hidden) { closeAdmin(); return; }
    if ($('#menu') && !$('#menu').hidden) { closeMenu(); return; }
    if (!$('#cart').hidden) { if (orderDone) goHome(); else closeCart(); } else if ($('#catalog') && !$('#catalog').hidden) closeCatalog();
  });

  $('#order-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var d = { nombre: f.nombre.value.trim(), dni: f.dni.value.trim(), telefono: f.telefono.value.trim(), email: f.email.value.trim(), direccion: f.direccion.value.trim() };
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email);
    var ok = cart.length > 0 && d.nombre && d.dni && d.telefono && emailOk && d.direccion;
    $('#form-error').textContent = d.email && !emailOk ? 'Revisá el email: parece que no está bien escrito.' : 'Completá todos los datos para enviar el pedido.';
    $('#form-error').hidden = !!ok;
    if (!ok) return;
    var total = cart.reduce(function (a, x) { return a + (x.price ? x.price * x.qty : 0); }, 0);
    var pending = cart.some(function (x) { return !x.price; });
    var msg = 'Hola Intimatta! Quiero hacer este pedido:\n\n' +
      cart.map(function (x) { return '• ' + x.qty + ' x ' + x.name + ' — ' + (x.price ? fmt(x.price * x.qty) : 'precio a consultar'); }).join('\n') +
      '\n\nTotal: ' + fmt(total) + (pending ? ' (+ productos a consultar)' : '') +
      (SETTINGS.transferencia > 0 && total > 0 ? '\nTotal con transferencia (' + SETTINGS.transferencia + '% off): ' + fmt(total * (1 - SETTINGS.transferencia / 100)) : '') +
      '\n\nNombre: ' + d.nombre + '\nDNI: ' + d.dni + '\nTeléfono: ' + d.telefono + '\nEmail: ' + d.email +
      '\nEntrega: Envío a domicilio\nDirección: ' + d.direccion +
      '\nEnvío: ' + (SETTINGS.envioGratis > 0 && total >= SETTINGS.envioGratis ? 'GRATIS' : 'a cargo del comprador');
    // Copia del pedido por mail (no frena la apertura de WhatsApp si falla)
    try {
      fetch('/api/order', {
        method: 'POST', keepalive: true,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ items: cart, nombre: d.nombre, dni: d.dni, telefono: d.telefono, email: d.email, direccion: d.direccion })
      }).catch(function () {});
    } catch (err) {}
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
    var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isMobile) {
      finishOrder(f);
      setTimeout(function () { window.location.href = url; }, 1200);
      return;
    }
    var w = null;
    try { w = window.open(url, '_blank'); } catch (err) { w = null; }
    if (w) { try { w.opener = null; } catch (err) {} } else { finishOrder(f); window.location.href = url; return; }
    finishOrder(f);
    setTimeout(function () { if (orderDone) goHome(); }, 4000);
  });

  // Pedido enviado: se vacía el carrito y se muestra el aviso; después vuelve a la portada.
  function finishOrder(f) {
    cart = []; saveCart();
    try { f.reset(); } catch (err) {}
    orderDone = true;
    renderCart();
    $('.cart-panel').scrollTop = 0;
  }
  function goHome() {
    orderDone = false;
    $('#cart').hidden = true;
    if ($('#catalog') && !$('#catalog').hidden) $('#catalog').hidden = true;
    renderCart(); lock();
    if (page !== 'home') { window.location.href = 'index.html'; return; }
    try { history.replaceState(null, '', location.pathname); } catch (err) {}
    window.scrollTo(0, 0);
  }
  // Al volver desde WhatsApp (botón atrás en el celular), cerrar el aviso y quedar en la portada
  window.addEventListener('pageshow', function () { if (orderDone) goHome(); });

  // ---------- Textos de cuotas, transferencia y barra de promo ----------
  function payText() {
    var parts = [];
    if (SETTINGS.cuotas > 0) parts.push(SETTINGS.cuotas + ' cuotas sin interés');
    if (SETTINGS.transferencia > 0) parts.push(SETTINGS.transferencia + '% off pagando con transferencia');
    var t = parts.join(' o ');
    return t ? t.charAt(0).toUpperCase() + t.slice(1) + '.' : '';
  }
  function autoPromoText() {
    var parts = [];
    if (SETTINGS.cuotas > 0) parts.push(SETTINGS.cuotas + ' CUOTAS SIN INTERÉS');
    if (SETTINGS.transferencia > 0) parts.push(SETTINGS.transferencia + '% OFF CON TRANSFERENCIA');
    var d = SETTINGS.descuentos, names = { perfumes: 'PERFUMES', cosmetica: 'COSMÉTICA', lenceria: 'LENCERÍA', adulto: 'LÍNEA +18' };
    Object.keys(names).forEach(function (k) { if (d[k] > 0) parts.push(d[k] + '% OFF EN ' + names[k]); });
    parts.push(SETTINGS.envioGratis > 0 ? 'ENVÍO GRATIS DESDE ' + fmt(SETTINGS.envioGratis) : 'ENVÍO DISCRETO');
    return parts;
  }
  function applySettingsUI() {
    var bar = $('.promo');
    if (bar) {
      bar.hidden = !SETTINGS.promoOn;
      bar.innerHTML = SETTINGS.promoText ? esc(SETTINGS.promoText)
        : autoPromoText().map(esc).join(' <span class="pink">✦</span> ');
    }
    // Bloque "Promociones vigentes" de Cómo comprar: muestra lo que se configura en el panel
    var list = $('#how-promos-list');
    if (list) {
      var items = [];
      if (SETTINGS.promoText) items.push('<strong>' + esc(SETTINGS.promoText) + '</strong>');
      if (SETTINGS.cuotas > 0) items.push('<strong>' + SETTINGS.cuotas + ' cuotas sin interés</strong>');
      if (SETTINGS.transferencia > 0) items.push('<strong>' + SETTINGS.transferencia + '% off</strong> pagando con transferencia');
      var d = SETTINGS.descuentos, names = { perfumes: 'perfumes', cosmetica: 'cosmética íntima', lenceria: 'lencería', adulto: 'la Línea +18' };
      Object.keys(names).forEach(function (k) { if (d[k] > 0) items.push('<strong>' + d[k] + '% off</strong> en ' + names[k]); });
      items.push(SETTINGS.envioGratis > 0
        ? '<strong>Envío gratis</strong> en compras desde ' + fmt(SETTINGS.envioGratis)
        : 'El envío corre <strong>por cuenta del comprador</strong>');
      items.push('<strong>Envío discreto</strong> a todo el país');
      list.innerHTML = items.map(function (x) { return '<li>' + x + '</li>'; }).join('');
    }
    var step = $('#how-ship-text');
    if (step) {
      step.textContent = 'Nos contactamos por WhatsApp para coordinar el pago y el envío. ' +
        (SETTINGS.envioGratis > 0 ? 'El envío es a cargo del comprador, salvo en compras desde ' + fmt(SETTINGS.envioGratis) + ', que es gratis.' : 'El costo de envío es a cargo del comprador.') +
        ' Paquete neutro, sin logos ni descripción del contenido.';
    }
  }

  // ---------- Cambios del panel: se cargan al abrir la página ----------
  function refreshPage() {
    if (currentCard && $('#catalog') && !$('#catalog').hidden) renderCatalog(currentCard, currentGroup);
    if (renderAdult) renderAdult();
    var changed = false;
    cart.forEach(function (x) {
      var base = x.name.replace(/ — Talle .+$/, '');
      var p = PRODUCTS.filter(function (q) { return (q.cartName || q.name) === base; })[0];
      if (p && p.price !== x.price) { x.price = p.price; changed = true; }
    });
    if (changed) saveCart();
    renderCart();
  }
  function loadOverrides() {
    if (!window.fetch) return;
    fetch('/api/products', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) return;
        if (j.products !== undefined) applyOverrides(j.products, j.settings); else applyOverrides(j, null);
        applySettingsUI(); refreshPage();
      })
      .catch(function () {});
  }

  // ---------- Menú ☰ ----------
  var ICON_X = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var headerRow = $('.header-row');
  if (headerRow) {
    var burger = document.createElement('button');
    burger.type = 'button'; burger.className = 'burger'; burger.id = 'burger';
    burger.setAttribute('aria-label', 'Abrir menú'); burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    headerRow.insertBefore(burger, headerRow.firstChild);
  }
  var menuLinks = page === 'home'
    ? '<a href="#cartas">PERFUMES</a>' +
      '<button type="button" data-open-card="placer">COSMÉTICA</button>' +
      '<button type="button" data-open-card="lujuria">LENCERÍA</button>' +
      '<a href="mas18.html" rel="nofollow">LÍNEA +18</a>' +
      '<a href="#como-comprar">CÓMO COMPRAR</a>' +
      '<a href="#contacto">CONTACTO</a>'
    : '<a href="index.html">← VOLVER A LA TIENDA</a>';
  var menuEl = document.createElement('div');
  menuEl.className = 'overlay menu-overlay'; menuEl.id = 'menu'; menuEl.hidden = true;
  menuEl.innerHTML =
    '<aside class="menu-panel" aria-label="Menú">' +
      '<div class="cart-head"><span class="wordmark">Intimatta<sup>✦</sup></span>' +
        '<button type="button" class="icon-btn" data-close-menu aria-label="Cerrar menú">' + ICON_X + '</button></div>' +
      '<nav class="menu-links">' + menuLinks + '</nav>' +
      '<button type="button" class="menu-admin" data-open-admin>' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>' +
        'ADMINISTRAR PRODUCTOS</button>' +
    '</aside>' +
    '<button type="button" class="cart-backdrop" data-close-menu aria-label="Cerrar menú"></button>';
  document.body.appendChild(menuEl);
  function openMenu() { menuEl.hidden = false; if ($('#burger')) $('#burger').setAttribute('aria-expanded', 'true'); lock(); }
  function closeMenu() { menuEl.hidden = true; if ($('#burger')) $('#burger').setAttribute('aria-expanded', 'false'); lock(); }
  if ($('#burger')) $('#burger').addEventListener('click', openMenu);
  menuEl.addEventListener('click', function (e) {
    var t = e.target;
    while (t && t !== menuEl && !(t.tagName === 'BUTTON' || t.tagName === 'A')) t = t.parentNode;
    if (!t || t === menuEl) return;
    if (t.hasAttribute('data-open-admin')) { closeMenu(); openAdmin(); return; }
    closeMenu(); // los links y botones del menú cierran el menú; el resto lo resuelve el manejador general
  });

  // ---------- Panel de administración (con clave) ----------
  var ADMIN_KEY = 'intimatta-admin';
  var adminPw = '';
  try { adminPw = sessionStorage.getItem(ADMIN_KEY) || ''; } catch (e) {}
  var draft = {};
  var sdraft = null;
  var adminCat = 'todos';
  var dirty = false;
  var adminEl = document.createElement('div');
  adminEl.className = 'overlay admin-overlay'; adminEl.id = 'admin'; adminEl.hidden = true;
  adminEl.innerHTML =
    '<div class="admin-panel" role="dialog" aria-label="Administrar productos">' +
      '<div class="cart-head"><h2>Productos<sup>✦</sup></h2>' +
        '<button type="button" class="icon-btn" data-close-admin aria-label="Cerrar">' + ICON_X + '</button></div>' +
      '<form id="admin-login" class="order-form admin-login" novalidate>' +
        '<p class="muted">Ingresá la clave para editar nombres, descripciones, precios, stock y fotos.</p>' +
        '<label>CLAVE<input type="password" name="pw" autocomplete="current-password" required></label>' +
        '<p class="error" id="admin-login-error" role="alert" hidden></p>' +
        '<button type="submit" class="btn btn-dark">ENTRAR</button>' +
      '</form>' +
      '<div id="admin-editor" hidden>' +
        '<section class="admin-promos" id="admin-promos">' +
          '<p class="eyebrow">PROMOCIONES, CUOTAS Y DESCUENTOS</p>' +
          '<label class="admin-check"><input type="checkbox" data-s="promoOn"> MOSTRAR BARRA DE PROMOCIÓN ARRIBA DE LA PÁGINA</label>' +
          '<label>TEXTO DE LA BARRA<input type="text" data-s="promoText" maxlength="160" placeholder=""></label>' +
          '<p class="small">Si lo dejás vacío, se arma solo con las cuotas y descuentos de abajo.</p>' +
          '<div class="admin-inline">' +
            '<label>CUOTAS SIN INTERÉS<input type="text" inputmode="numeric" data-s="cuotas" placeholder="0 = no mostrar"></label>' +
            '<label>DESCUENTO POR TRANSFERENCIA (%)<input type="text" inputmode="numeric" data-s="transferencia" placeholder="0 = no mostrar"></label>' +
          '</div>' +
          '<label>ENVÍO GRATIS EN COMPRAS DESDE ($)<input type="text" inputmode="numeric" data-s="envioGratis" placeholder="0 = el envío siempre lo paga el comprador"></label>' +
          '<p class="small">Si lo dejás en 0, el envío corre por cuenta del comprador. Si ponés un monto, las compras desde ese total tienen envío gratis.</p>' +
          '<p class="product-cat">DESCUENTO POR SECCIÓN (%)</p>' +
          '<div class="admin-inline admin-grid4">' +
            '<label>PERFUMES<input type="text" inputmode="numeric" data-s="d.perfumes" placeholder="0"></label>' +
            '<label>COSMÉTICA<input type="text" inputmode="numeric" data-s="d.cosmetica" placeholder="0"></label>' +
            '<label>LENCERÍA<input type="text" inputmode="numeric" data-s="d.lenceria" placeholder="0"></label>' +
            '<label>LÍNEA +18<input type="text" inputmode="numeric" data-s="d.adulto" placeholder="0"></label>' +
          '</div>' +
          '<p class="small">Se descuenta del precio de cada producto de esa sección y se muestra el precio original tachado.</p>' +
        '</section>' +
        '<p class="eyebrow admin-products-title">PRODUCTOS</p>' +
        '<div class="chips admin-cats" id="admin-cats">' +
          '<button type="button" class="chip active" data-cat="todos" aria-pressed="true">Todos</button>' +
          '<button type="button" class="chip" data-cat="perfumes" aria-pressed="false">Perfumes</button>' +
          '<button type="button" class="chip" data-cat="cosmetica" aria-pressed="false">Cosmética</button>' +
          '<button type="button" class="chip" data-cat="lenceria" aria-pressed="false">Lencería</button>' +
          '<button type="button" class="chip" data-cat="adulto" aria-pressed="false">Línea +18</button>' +
        '</div>' +
        '<input type="search" id="admin-search" class="admin-search" placeholder="Buscar producto…" aria-label="Buscar producto">' +
        '<div id="admin-list" class="admin-list"></div>' +
        '<div class="admin-bar">' +
          '<p class="small" id="admin-status" role="status"></p>' +
          '<div class="admin-actions">' +
            '<button type="button" class="btn btn-outline" id="admin-logout">SALIR</button>' +
            '<button type="button" class="btn btn-dark" id="admin-save">GUARDAR CAMBIOS</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(adminEl);

  function adminLabel(p) {
    if (p.line === 'perfume') return 'PERFUME ' + String(p.gen).toUpperCase();
    if (p.line === 'adulto') return '+18 · ' + String(p.cat).toUpperCase();
    return String(p.group || 'COSMÉTICA').toUpperCase();
  }
  function setStatus(msg, isError) {
    var el = $('#admin-status'); el.textContent = msg || ''; el.classList.toggle('error', !!isError);
  }
  function api(method, url, body, type) {
    return fetch(url, {
      method: method,
      headers: { 'x-admin-password': adminPw, 'content-type': type || 'application/json' },
      body: body
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok || !j.ok) { var err = new Error(j.error || 'No se pudo conectar. Probá de nuevo.'); err.status = r.status; throw err; }
        return j;
      });
    });
  }
  function photosHtml(d) {
    return '<div class="admin-photos">' + d.imgs.map(function (u, j) {
      return '<div class="admin-ph"><img src="' + esc(u) + '" alt="">' +
        (j === 0 ? '<span class="admin-ph-main">PRINCIPAL</span>' : '<button type="button" class="admin-ph-btn admin-ph-left" data-ph-left="' + j + '" aria-label="Mover a la izquierda" title="Mover a la izquierda">◀</button>') +
        '<button type="button" class="admin-ph-btn admin-ph-del" data-ph-del="' + j + '" aria-label="Borrar foto" title="Borrar foto">✕</button></div>';
    }).join('') +
    (d.imgs.length < 4 ? '<label class="admin-ph admin-ph-add" title="Agregar fotos"><span>+</span><small>FOTO ' + (d.imgs.length + 1) + ' DE 4</small>' +
      '<input type="file" accept="image/*" multiple data-img hidden></label>' : '') +
    '</div>';
  }
  function renderAdminList() {
    var q = ($('#admin-search').value || '').toLowerCase();
    $('#admin-list').innerHTML = PRODUCTS.map(function (p, i) {
      var d = draft[p.key];
      if (adminCat !== 'todos' && sectionOf(p) !== adminCat) return '';
      if (q && (d.name + ' ' + adminLabel(p)).toLowerCase().indexOf(q) < 0) return '';
      return '<div class="admin-row" data-i="' + i + '">' +
        '<div class="admin-fields">' +
          '<p class="product-cat">' + esc(adminLabel(p)) + '</p>' +
          photosHtml(d) +
          '<label>NOMBRE<input type="text" data-f="name" value="' + esc(d.name) + '" maxlength="200"></label>' +
          '<label>DESCRIPCIÓN<textarea data-f="desc" rows="2" maxlength="600">' + esc(d.desc) + '</textarea></label>' +
          '<div class="admin-inline">' +
            '<label>PRECIO ($)<input type="text" inputmode="numeric" data-f="price" value="' + (d.price ? d.price : '') + '" placeholder="A consultar"></label>' +
            '<label>PRECIO ANTERIOR ($)<input type="text" inputmode="numeric" data-f="old" value="' + (d.old ? d.old : '') + '" placeholder="Sin tachado"></label>' +
            '<label class="admin-check"><input type="checkbox" data-f="stock"' + (d.stock ? ' checked' : '') + '> HAY STOCK</label>' +
          '</div>' +
          (sectionOf(p) === 'lenceria' ? '<label>TALLES (SEPARADOS POR COMA)<input type="text" data-f="talles" value="' + esc(d.talles.join(', ')) + '" maxlength="120" placeholder="Ej: S, M, L, XL — vacío = sin talles"></label>' : '') +
        '</div></div>';
    }).join('');
  }
  function startEditor() {
    draft = {};
    PRODUCTS.forEach(function (p) { draft[p.key] = { name: p.name, desc: p.desc || '', price: p.listPrice, old: p.rawOld || null, stock: !!p.stock, imgs: (p.imgs || []).slice(), talles: (p.talles || []).slice() }; });
    sdraft = JSON.parse(JSON.stringify(SETTINGS));
    var box = $('#admin-promos');
    $$('[data-s]', box).forEach(function (el) {
      var k = el.getAttribute('data-s');
      if (k === 'promoOn') el.checked = !!sdraft.promoOn;
      else if (k === 'promoText') { el.value = sdraft.promoText || ''; el.placeholder = autoPromoText().join(' ✦ '); }
      else if (k.indexOf('d.') === 0) el.value = sdraft.descuentos[k.slice(2)] || '';
      else el.value = sdraft[k] || '';
    });
    dirty = false;
    $('#admin-login').hidden = true; $('#admin-editor').hidden = false;
    $('#admin-search').value = '';
    renderAdminList(); setStatus('');
  }
  function showLogin(msg) {
    $('#admin-editor').hidden = true; $('#admin-login').hidden = false;
    $('#admin-login-error').hidden = !msg; $('#admin-login-error').textContent = msg || '';
    setTimeout(function () { try { $('#admin-login').pw.focus(); } catch (e) {} }, 50);
  }
  function openAdmin() {
    adminEl.hidden = false; adminEl.scrollTop = 0; lock();
    if (adminPw) {
      api('POST', '/api/admin/login').then(startEditor).catch(function (err) {
        if (err.status === 401) { adminPw = ''; try { sessionStorage.removeItem(ADMIN_KEY); } catch (e) {} }
        showLogin(err.status === 401 ? '' : err.message);
      });
    } else showLogin('');
  }
  function closeAdmin() {
    if (dirty && !window.confirm('Tenés cambios sin guardar. ¿Cerrar igual?')) return;
    adminEl.hidden = true; dirty = false; lock();
  }

  $('#admin-login').addEventListener('submit', function (e) {
    e.preventDefault();
    var pw = e.target.pw.value;
    if (!pw) return;
    adminPw = pw;
    var btn = e.target.querySelector('button'); btn.disabled = true; btn.textContent = 'VERIFICANDO…';
    api('POST', '/api/admin/login').then(function () {
      try { sessionStorage.setItem(ADMIN_KEY, pw); } catch (err) {}
      e.target.pw.value = '';
      startEditor();
    }).catch(function (err) {
      adminPw = '';
      showLogin(err.message);
    }).then(function () { btn.disabled = false; btn.textContent = 'ENTRAR'; });
  });

  adminEl.addEventListener('click', function (e) {
    var t = e.target;
    while (t && t !== adminEl && t.tagName !== 'BUTTON') t = t.parentNode;
    if (!t || t === adminEl) return;
    if (t.hasAttribute('data-close-admin')) closeAdmin();
  });
  $('#admin-search').addEventListener('input', renderAdminList);
  $('#admin-cats').addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]'); if (!b) return;
    adminCat = b.getAttribute('data-cat');
    $$('[data-cat]', $('#admin-cats')).forEach(function (x) { var on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    renderAdminList();
  });
  $('#admin-promos').addEventListener('input', function (e) {
    var k = e.target.getAttribute('data-s'); if (!k || !sdraft) return;
    if (k === 'promoOn') sdraft.promoOn = e.target.checked;
    else if (k === 'promoText') sdraft.promoText = e.target.value;
    else {
      var n = e.target.value.replace(/\D/g, ''); n = n ? Math.min(+n, k === 'cuotas' ? 24 : (k === 'envioGratis' ? 100000000 : 90)) : 0;
      if (k.indexOf('d.') === 0) sdraft.descuentos[k.slice(2)] = n; else sdraft[k] = n;
    }
    dirty = true; setStatus('Hay cambios sin guardar.');
  });
  $('#admin-list').addEventListener('input', function (e) {
    var f = e.target.getAttribute('data-f'); if (!f) return;
    var row = e.target.closest('.admin-row'); var p = PRODUCTS[+row.getAttribute('data-i')]; var d = draft[p.key];
    if (f === 'stock') d.stock = e.target.checked;
    else if (f === 'price') { var n = e.target.value.replace(/\D/g, ''); d.price = n ? +n : null; }
    else if (f === 'talles') { d.talles = e.target.value.split(/[,;\/]+/).map(function (x) { return x.trim().slice(0, 12); }).filter(Boolean).slice(0, 12); }
    else if (f === 'old') { var m = e.target.value.replace(/\D/g, ''); d.old = m ? +m : null; }
    else d[f] = e.target.value;
    dirty = true; setStatus('Hay cambios sin guardar.');
  });
  $('#admin-list').addEventListener('change', function (e) {
    if (!e.target.hasAttribute('data-img') || !e.target.files || !e.target.files[0]) return;
    var row = e.target.closest('.admin-row'); var p = PRODUCTS[+row.getAttribute('data-i')];
    var d = draft[p.key];
    var files = Array.prototype.slice.call(e.target.files, 0, 4 - d.imgs.length);
    var done = 0;
    setStatus('Subiendo ' + (files.length > 1 ? files.length + ' fotos…' : 'foto…'));
    files.reduce(function (chain, file) {
      return chain.then(function () {
        return resizeImage(file).then(function (blob) { return api('POST', '/api/admin/image', blob, 'image/jpeg'); })
          .then(function (j) { if (d.imgs.length < 4) d.imgs.push(j.url); done++; dirty = true; });
      });
    }, Promise.resolve()).then(function () {
      refreshPhotos(row, d);
      setStatus((done > 1 ? done + ' fotos subidas' : 'Foto subida') + '. Tocá "Guardar cambios" para publicar.');
    }).catch(function (err) { refreshPhotos(row, d); setStatus(err.message || 'No se pudo subir la foto.', true); });
  });
  function refreshPhotos(row, d) {
    var box = row.querySelector('.admin-photos');
    if (box) box.outerHTML = photosHtml(d);
  }
  $('#admin-list').addEventListener('click', function (e) {
    var b = e.target.closest('[data-ph-left],[data-ph-del]'); if (!b) return;
    var row = b.closest('.admin-row'); var d = draft[PRODUCTS[+row.getAttribute('data-i')].key];
    if (b.hasAttribute('data-ph-del')) d.imgs.splice(+b.getAttribute('data-ph-del'), 1);
    else { var j = +b.getAttribute('data-ph-left'); var tmp = d.imgs[j - 1]; d.imgs[j - 1] = d.imgs[j]; d.imgs[j] = tmp; }
    refreshPhotos(row, d);
    dirty = true; setStatus('Hay cambios sin guardar.');
  });

  // Achica la foto a 700×875 (como las demás), con fondo blanco, en JPG.
  function resizeImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var W = 700, H = 875, c = document.createElement('canvas');
        c.width = W; c.height = H;
        var g = c.getContext('2d');
        g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
        var s = Math.min(W / img.width, H / img.height);
        var w = img.width * s, h = img.height * s;
        g.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) { b ? resolve(b) : reject(new Error('No se pudo procesar la foto.')); }, 'image/jpeg', 0.85);
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('Ese archivo no es una imagen válida.')); };
      img.src = url;
    });
  }

  $('#admin-save').addEventListener('click', function () {
    var ov = {}, bad = false;
    PRODUCTS.forEach(function (p) {
      var b = BASE[p.key], d = draft[p.key], o = {};
      if (!d.name.trim()) bad = true;
      if (d.name.trim() !== b.name) o.name = d.name.trim();
      if (d.desc.trim() !== (b.desc || '')) o.desc = d.desc.trim();
      if (d.price !== b.price) o.price = d.price;
      if ((d.old || null) !== (b.old || null)) o.old = d.old || null;
      if (d.stock !== !!b.stock) o.stock = d.stock;
      if (JSON.stringify(d.imgs) !== JSON.stringify(b.imgs)) o.imgs = d.imgs.slice(0, 4);
      if (JSON.stringify(d.talles) !== JSON.stringify(b.talles)) o.talles = d.talles.slice(0, 12);
      if (Object.keys(o).length) ov[p.key] = o;
    });
    if (bad) { setStatus('Hay un producto sin nombre.', true); return; }
    var btn = $('#admin-save'); btn.disabled = true; btn.textContent = 'GUARDANDO…';
    api('PUT', '/api/admin/products', JSON.stringify({ products: ov, settings: sdraft })).then(function (j) {
      applyOverrides(ov, j.settings || sdraft); applySettingsUI(); refreshPage(); dirty = false;
      setStatus('Guardado ✓ Ya se ve en la página (en otros celulares puede tardar hasta un minuto).');
    }).catch(function (err) {
      if (err.status === 401) { adminPw = ''; try { sessionStorage.removeItem(ADMIN_KEY); } catch (e) {} showLogin('La clave cambió. Ingresala de nuevo.'); }
      else setStatus(err.message, true);
    }).then(function () { btn.disabled = false; btn.textContent = 'GUARDAR CAMBIOS'; });
  });
  $('#admin-logout').addEventListener('click', function () {
    if (dirty && !window.confirm('Tenés cambios sin guardar. ¿Salir igual?')) return;
    adminPw = ''; dirty = false; try { sessionStorage.removeItem(ADMIN_KEY); } catch (e) {}
    adminEl.hidden = true; lock();
  });

  renderCart();
  loadOverrides();
  // Abrir una carta desde el link (ej: .../#emperatriz)
  var h = (location.hash || '').slice(1);
  if (page === 'home' && cardById(h)) openCard(h);
  window.addEventListener('hashchange', function () {
    var k = (location.hash || '').slice(1);
    if (page === 'home' && cardById(k) && (!currentCard || currentCard.id !== k || $('#catalog').hidden)) openCard(k);
  });
})();
