// Intimatta — catálogo con Sextarot y pedidos por WhatsApp
(function () {
  'use strict';

  var WHATSAPP = '542212014530';

  var CARDS = [
    { id: 'loco', numeral: '0', name: 'El Loco', title: 'Vibradores', cat: 'vibradores', meaning: 'Todo viaje empieza con un salto. Dejate vibrar.' },
    { id: 'mago', numeral: 'I', name: 'El Mago', title: 'Dildos', cat: 'dildos', meaning: 'La magia está en tus manos.' },
    { id: 'placer', numeral: 'II', name: 'El Placer', title: 'Lencería', cat: 'lenceria', meaning: 'Vestirte para vos, para el deseo y para el juego.' },
    { id: 'emperador', numeral: 'IV', name: 'El Emperador', title: 'Masturbadores y bombas', cat: 'masturbadores', meaning: 'Tomá el control de tu placer.' },
    { id: 'enamorados', numeral: 'VI', name: 'Los Enamorados', title: 'Succionadores', cat: 'succionadores', meaning: 'Elegirse, y elegir sentir más.' },
    { id: 'lujuria', numeral: 'XI', name: 'Lujuria', title: 'BDSM', cat: 'bdsm', meaning: 'Entregarse y dominar, siempre con consentimiento.' },
    { id: 'estrella', numeral: 'XVII', name: 'La Estrella', title: 'Perfumes Intimatta', cat: 'perfumes', meaning: 'Deseo y esperanza: una estela que queda en la piel.' }
  ];

  // price/old en pesos; price: null = precio a confirmar
  var PRODUCTS = [
    { name: 'Vibrador Punto G - Gluxe - Control Por Aplicación', cat: 'vibradores', price: 85000, old: 118000, stock: true },
    { name: 'Kit Estimulador Luxury X 5 Recargable', cat: 'vibradores', price: 45000, old: 76000, stock: true },
    { name: 'Estimulador Clitorial Nasty 3 Sex Therapy para mujer', cat: 'vibradores', price: 40000, old: 45000, stock: true },
    { name: 'Kit Vibrador + Dilatador Sex Therapy', cat: 'vibradores', price: 40000, old: 45000, stock: true },
    { name: 'LUXURY PURPLE LINE THREE', cat: 'vibradores', price: 39000, old: 53000, stock: false },

    { name: 'Consolador Real Cock 2 - Dildo Realista - Ventosa', cat: 'dildos', price: 30000, old: 35000, stock: true },
    { name: 'REAL COCK 3', cat: 'dildos', price: 28000, old: 34000, stock: true },
    { name: 'REAL COCK 2', cat: 'dildos', price: 18000, old: 21000, stock: false },

    { name: 'Body Berlin - Negro', cat: 'lenceria', price: 25000, old: 27000, stock: true },
    { name: 'Body Ramos Encaje', cat: 'lenceria', price: 31000, old: 35000, stock: true },
    { name: 'Conjunto Kiss Lenceria Cola Less - Negro', cat: 'lenceria', price: 28000, old: 30000, stock: true },
    { name: 'BUSTIER LADY NEGRO - BORDO', cat: 'lenceria', price: 36000, old: 40000, stock: true },
    { name: 'Body Cosmos De Encaje', cat: 'lenceria', price: 24000, old: 26000, stock: true },

    { name: 'Masturbador Succionador Masculino Sex Therapy Xp3', cat: 'masturbadores', price: 135000, old: 190000, stock: true },
    { name: 'Bomba Peneana Penis Pump 13 22cm X 6,9 Cm', cat: 'masturbadores', price: 25000, old: 45900, stock: true },
    { name: 'Masturbador Masculino York 10 + 5 Vibraciones Recargable', cat: 'masturbadores', price: 50000, old: 67000, stock: false },
    { name: 'MASTURBADOR CON VENTOSA - BOCA', cat: 'masturbadores', price: 20000, old: 22000, stock: false },
    { name: 'MASTURBADOR CON VENTOSA - ANAL', cat: 'masturbadores', price: 23000, old: 26000, stock: false },

    { name: 'Succionador LUXURY MINI FANTASY', cat: 'succionadores', price: 80000, old: 90000, stock: true },
    { name: 'Suction Toy Succionador Vibrador Clitoris', cat: 'succionadores', price: 41000, old: 55000, stock: true },
    { name: 'SUCTION VIBRATION AIREXA', cat: 'succionadores', price: 25000, old: 45000, stock: true },
    { name: 'PURPLE LUMO', cat: 'succionadores', price: 22000, old: 26000, stock: false },

    { name: 'Kit Bondage: Esposas, Correa, Latigo, Mordaza, Antifaz Negro', cat: 'bdsm', price: 53000, old: 75000, stock: true },
    { name: 'Pezoneras Champs 8 Metal Y Goma Suave Ajustable', cat: 'bdsm', price: 15000, old: 20500, stock: true },
    { name: 'Antifaz Cuero Resistente Adaptable', cat: 'bdsm', price: 11000, old: 15000, stock: true },
    { name: 'Esposas Fetiche Eróticas De Cuero Rosa Ajustables Sex Shop', cat: 'bdsm', price: 10000, old: 11000, stock: true },
    { name: 'Kit Bondage BDSM Sex Therapy 4 Piezas Playsensual Set Látigo Mordaza Antifaz Pezoneras', cat: 'bdsm', price: 20000, old: 26000, stock: false },

    { name: 'Sovrana', cartName: 'Perfume Sovrana', cat: 'perfumes', price: null, old: null, stock: true, img: 'img/perfumes/sovrana.jpg', desc: 'Eau de Parfum · Donna · 60 ml' },
    { name: 'Ammelí', cartName: 'Perfume Ammelí', cat: 'perfumes', price: null, old: null, stock: true, img: 'img/perfumes/ammeli.jpg', desc: 'Eau de Parfum · Donna · 60 ml' },
    { name: 'Alchimia n°9', cartName: 'Perfume Alchimia n°9', cat: 'perfumes', price: null, old: null, stock: true, img: 'img/perfumes/alchimia.jpg', desc: 'Eau de Parfum · Donna · 60 ml' },
    { name: 'Aura', cartName: 'Perfume Aura', cat: 'perfumes', price: null, old: null, stock: true, img: 'img/perfumes/aura.jpg', desc: 'Eau de Parfum · Unisex · 60 ml' },
    { name: 'Ambush', cartName: 'Perfume Ambush', cat: 'perfumes', price: null, old: null, stock: true, img: 'img/perfumes/ambush.jpg', desc: 'Eau de Parfum · Homme · 60 ml' }
  ];

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var fmt = function (n) { return '$' + n.toLocaleString('es-AR'); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var cardById = function (id) { return CARDS.filter(function (c) { return c.id === id; })[0]; };

  // ---------- Carrito ----------
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('intimatta-cart') || '[]') || []; } catch (e) { cart = []; }
  var saveCart = function () { try { localStorage.setItem('intimatta-cart', JSON.stringify(cart)); } catch (e) {} };

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
        '<span class="line-sub">' + (x.price ? fmt(x.price * x.qty) : 'A confirmar') + '</span></div>' +
        '<div class="line-bottom"><div class="qty">' +
        '<button type="button" aria-label="Restar uno" data-qty="-1" data-name="' + esc(x.name) + '">−</button>' +
        '<span>' + x.qty + '</span>' +
        '<button type="button" aria-label="Sumar uno" data-qty="1" data-name="' + esc(x.name) + '">+</button></div>' +
        '<button type="button" class="remove" data-remove data-name="' + esc(x.name) + '">Quitar</button></div></div>';
    }).join('');
  }

  // ---------- Overlays ----------
  function lockScroll() { document.body.classList.toggle('locked', !$('#cart').hidden || !$('#catalog').hidden); }

  function openCart() { $('#cart').hidden = false; renderCart(); lockScroll(); }
  function closeCart() { $('#cart').hidden = true; renderCart(); lockScroll(); }

  function openCard(id) {
    var c = cardById(id); if (!c) return;
    var list = PRODUCTS.filter(function (p) { return p.cat === c.cat; });
    $('#catalog-img').src = 'img/cartas/' + c.id + '.jpg';
    $('#catalog-img').alt = 'Carta del tarot: ' + c.name;
    $('#catalog-arcano').textContent = c.numeral + ' · ' + c.name.toUpperCase();
    $('#catalog-name').textContent = c.title;
    $('#catalog-meaning').textContent = c.meaning;
    $('#catalog-count').textContent = list.length + (list.length === 1 ? ' PRODUCTO' : ' PRODUCTOS');
    var label = c.name.toUpperCase() + ' · ' + c.title.toUpperCase();
    $('#products-grid').innerHTML = list.map(function (p) {
      var i = PRODUCTS.indexOf(p);
      var img = p.img
        ? '<div class="product-img photo"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy"></div>'
        : '<div class="product-img"><span>' + esc(p.name.charAt(0)) + '</span></div>';
      var prices = p.price
        ? '<span class="old">' + fmt(p.old) + '</span><span class="price-row"><span class="price">' + fmt(p.price) + '</span><span class="off">' + Math.round((1 - p.price / p.old) * 100) + '% OFF</span></span>'
        : '<span class="price-row"><span class="price">Precio a confirmar</span></span>';
      var btn = p.stock
        ? '<button type="button" class="add" data-add="' + i + '">AGREGAR</button>'
        : '<button type="button" class="add" disabled>SIN STOCK</button>';
      return '<article class="product">' + img +
        '<p class="product-cat">' + esc(label) + '</p>' +
        '<h3>' + esc(p.name) + '</h3>' +
        (p.desc ? '<p class="product-desc">' + esc(p.desc) + '</p>' : '') +
        '<div class="prices">' + prices + '<span class="small muted">3 cuotas sin interés</span></div>' + btn + '</article>';
    }).join('');
    var ov = $('#catalog'); ov.hidden = false; ov.scrollTop = 0; lockScroll();
    try { history.replaceState(null, '', '#' + c.id); } catch (e) {}
  }
  function closeCatalog() {
    $('#catalog').hidden = true; lockScroll();
    try { history.replaceState(null, '', '#juguetes'); } catch (e) {}
  }

  // ---------- Cartas ----------
  $('#cards-grid').innerHTML = CARDS.map(function (c) {
    return '<button type="button" class="tarot" data-open-card="' + c.id + '" aria-label="' + esc(c.name) + ': ver ' + esc(c.title.toLowerCase()) + '">' +
      '<span class="tarot-outer"><span class="tarot-inner">' +
      '<img src="img/cartas/' + c.id + '.jpg" alt="Carta del tarot: ' + esc(c.name) + '" loading="lazy">' +
      '<span class="rule"><span>✦</span></span>' +
      '<span class="tarot-cat">' + esc(c.title.toUpperCase()) + '</span>' +
      '<span class="tarot-sign">INTIMATTA</span>' +
      '</span></span></button>';
  }).join('');

  // ---------- Eventos ----------
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button, a'); if (!t) return;
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
    if (!$('#cart').hidden) closeCart(); else if (!$('#catalog').hidden) closeCatalog();
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
      cart.map(function (x) { return '• ' + x.qty + ' x ' + x.name + ' — ' + (x.price ? fmt(x.price * x.qty) : 'precio a confirmar'); }).join('\n') +
      '\n\nTotal: ' + fmt(total) + (pending ? ' (+ productos a confirmar)' : '') +
      '\n\nNombre: ' + d.nombre + '\nDNI: ' + d.dni + '\nTeléfono: ' + d.telefono +
      '\nEntrega: Envío a domicilio\nDirección: ' + d.direccion;
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });

  // Abrir una carta desde el link (ej: intimatta.github.io/#lujuria)
  var h = (location.hash || '').slice(1);
  if (cardById(h)) openCard(h);
  renderCart();
})();
