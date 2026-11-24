/* Mi Dulce Bendición – Pastelería Artesanal | script.js (se carga con defer, después de jQuery y DOMPurify) */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js').catch(function () {});
  });
}

$(function () {
  'use strict';

  var RECARGO = 5;
  var WHATSAPP_NUMERO = '59178805695'; // Cambia por tu número (código país + número, sin +)
  var STORAGE_KEY = 'mdb-estado-v1';
  var reducido = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (reducido) { $.fx.off = true; }

  /* ---------- DATOS ---------- */
  var productos = [
    { id: 1,  nombre: 'Cupcakes Vainilla & Fresa', cat: 'Cupcakes',   imgHtml: '', v: [{ t: '6 und', p: 36 }, { t: '12 und', p: 68, antes: 75 }] },
    { id: 2,  nombre: 'Torta Tres Leches Cacao',   cat: 'Tortas',     imgHtml: '', v: [{ t: 'Mediana', p: 95 }, { t: 'Grande', p: 165, antes: 185 }] },
    { id: 3,  nombre: 'Galletas Corazón Dulce',    cat: 'Galletas',   imgHtml: '', v: [{ t: '6 und', p: 24 }, { t: '12 und', p: 44, antes: 50 }] },
    { id: 4,  nombre: 'Alfajores con Manjar',      cat: 'Alfajores',  imgHtml: '', v: [{ t: '6 und', p: 25 }, { t: '12 und', p: 46 }] },
    { id: 5,  nombre: 'Cupcakes Red Velvet',       cat: 'Cupcakes',   imgHtml: '', v: [{ t: '6 und', p: 40, antes: 45 }, { t: '12 und', p: 74 }] },
    { id: 6,  nombre: 'Torta Frutos del Bosque',   cat: 'Tortas',     imgHtml: '', v: [{ t: 'Mediana', p: 110 }, { t: 'Grande', p: 180 }] },
    { id: 7,  nombre: 'Brownies Fudge & Nueces',   cat: 'Especiales', imgHtml: '', v: [{ t: '6 und', p: 32, antes: 38 }, { t: '12 und', p: 60 }] },
    { id: 8,  nombre: 'Cheesecake de Fresa',       cat: 'Especiales', imgHtml: '', v: [{ t: 'Porción x4', p: 58 }, { t: 'Entero', p: 135 }] },
    { id: 9,  nombre: 'Donas Glaseadas Rosadas',   cat: 'Especiales', imgHtml: '', v: [{ t: '6 und', p: 30 }, { t: '12 und', p: 55, antes: 62 }] },
    { id: 10, nombre: 'Torta Vainilla & Crema',    cat: 'Tortas',     imgHtml: '', v: [{ t: 'Mediana', p: 90 }, { t: 'Grande', p: 155 }] },
    { id: 11, nombre: 'Galletas Mantequilla',      cat: 'Galletas',   imgHtml: '', v: [{ t: '6 und', p: 22 }, { t: '12 und', p: 40 }] },
    { id: 12, nombre: 'Copas Dulces de Fruta',     cat: 'Especiales', imgHtml: '', v: [{ t: '4 copas', p: 48, antes: 54 }, { t: '8 copas', p: 90 }] },
    { id: 13, nombre: 'Cupcakes de Chocolate',     cat: 'Cupcakes',   imgHtml: '', v: [{ t: '6 und', p: 38 }, { t: '12 und', p: 70, antes: 78 }] },
    { id: 14, nombre: 'Mini Cupcakes Surtidos',    cat: 'Cupcakes',   imgHtml: '', v: [{ t: '12 und', p: 42 }, { t: '24 und', p: 78 }] },
    { id: 15, nombre: 'Torta de Chocolate Húmeda', cat: 'Tortas',     imgHtml: '', v: [{ t: 'Mediana', p: 100 }, { t: 'Grande', p: 170, antes: 190 }] },
    { id: 16, nombre: 'Torta Red Velvet',          cat: 'Tortas',     imgHtml: '', v: [{ t: 'Mediana', p: 105 }, { t: 'Grande', p: 175 }] },
    { id: 17, nombre: 'Galletas con Chispas',      cat: 'Galletas',   imgHtml: '', v: [{ t: '6 und', p: 20 }, { t: '12 und', p: 37, antes: 42 }] },
    { id: 18, nombre: 'Galletas Decoradas',        cat: 'Galletas',   imgHtml: '', v: [{ t: '6 und', p: 36 }, { t: '12 und', p: 66 }] },
    { id: 19, nombre: 'Alfajores de Maicena',      cat: 'Alfajores',  imgHtml: '', v: [{ t: '6 und', p: 27, antes: 30 }, { t: '12 und', p: 50 }] },
    { id: 20, nombre: 'Alfajores Mini Surtidos',   cat: 'Alfajores',  imgHtml: '', v: [{ t: '12 und', p: 30 }, { t: '24 und', p: 56 }] },
    { id: 21, nombre: 'Brownies con Chispas',      cat: 'Especiales', imgHtml: '', v: [{ t: '6 und', p: 30 }, { t: '12 und', p: 56 }] },
    { id: 22, nombre: 'Mini Cheesecakes',          cat: 'Especiales', imgHtml: '', v: [{ t: '6 und', p: 45, antes: 50 }, { t: '12 und', p: 85 }] },
    { id: 23, nombre: 'Donas Rellenas de Manjar',  cat: 'Especiales', imgHtml: '', v: [{ t: '6 und', p: 34 }, { t: '12 und', p: 62 }] },
    { id: 24, nombre: 'Box Dulce Bendición',       cat: 'Especiales', imgHtml: '', v: [{ t: 'Box x8', p: 70 }, { t: 'Box x16', p: 130, antes: 145 }] }
  ];

  function foto(id) { return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=900&q=80'; }
  var galeria = [
    { titulo: 'Cupcakes decorados a mano para cumpleaños',      src: foto('1576618148400-f54bed99fcfd'), alt: 'Cupcakes con crema y decoración artesanal' },
    { titulo: 'Tortas húmedas y cremosas listas para celebrar',  src: foto('1578985545062-69928b1d9587'), alt: 'Torta de chocolate decorada' },
    { titulo: 'Alfajores y galletas horneados cada mañana',     src: foto('1558961363-fa8fdf82db35'),   alt: 'Alfajores y galletas dulces en bandeja' },
    { titulo: 'Galletas con chispas recién salidas del horno',  src: foto('1499636136210-6f4ee915583e'), alt: 'Galletas artesanales con chispas de chocolate' },
    { titulo: 'Brownies fudge con trozos de nuez',              src: foto('1606313564200-e75d5e30476c'), alt: 'Brownies de chocolate con nueces' },
    { titulo: 'Donas y postres dulces para mesas especiales',   src: foto('1551024601-bec78aea704b'),   alt: 'Donas glaseadas en tonos dulces' },
    { titulo: 'Cupcakes Red Velvet con crema suave',            src: foto('1563729784474-d77dbb933a9e'), alt: 'Cupcakes red velvet con crema' },
    { titulo: 'Tortas de frutos del bosque para celebrar',      src: foto('1588195538326-c5b1e9f80a1b'), alt: 'Torta con frutos del bosque' },
    { titulo: 'Cheesecake de fresa cremoso',                    src: foto('1519869325930-281384150729'), alt: 'Cheesecake con fresas' },
    { titulo: 'Galletas de mantequilla decoradas a mano',       src: foto('1558326567-98ae2405596b'), alt: 'Galletas de mantequilla decoradas' },
    { titulo: 'Copas dulces de chantilly y fruta',              src: foto('1488477181946-6428a0291777'), alt: 'Copas de postre con chantilly y fruta' },
    { titulo: 'Mesa dulce para tus reuniones',                  src: foto('1486427944299-d1955d23e34d'), alt: 'Mesa con postres y dulces variados' },
    { titulo: 'Porción de pastel de chocolate con cobertura',   src: 'https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg', alt: 'Porción de pastel de chocolate en plato' },
    { titulo: 'Pastel Red Velvet con fresas',                   src: 'https://cdn.prod.website-files.com/614a379840dbad1848e598c2/679906d29abceb2bbceb06b3_6799062816366d61273c52b4_IMG_1560.jpeg', alt: 'Pastel red velvet decorado con fresas' },
    { titulo: 'Cupcake de chocolate con chispas',               src: 'https://sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg', alt: 'Cupcake de chocolate con cobertura cremosa' },
    { titulo: 'Bandeja de mini cupcakes variados',              src: 'https://i0.wp.com/whitehenry.com.au/wp-content/uploads/2018/07/Premium-assorted-mini-cupcakes.webp?fit=729%2C729&ssl=1', alt: 'Mini cupcakes surtidos en bandeja' },
    { titulo: 'Brownies densos de chocolate',                   src: 'https://bakewithshivesh.com/wp-content/uploads/2024/08/960E4D82-3A2F-436E-89AA-26F56A856DFE.jpg', alt: 'Brownies de chocolate apilados' },
    { titulo: 'Galletas caseras con chispas de chocolate',      src: 'https://mojo.generalmills.com/api/public/content/_pLFRXFETcuXWg_Z0MhZPw_gmi_hi_res_jpeg.jpeg?v=693b292b&t=466b54bb264e48b199fc8e83ef1136b4', alt: 'Galletas horneadas con chispas de chocolate' },
    { titulo: 'Galletas glaseadas decoradas a mano',          src: 'https://sallysbakingaddiction.com/wp-content/uploads/2017/12/how-to-decorate-sugar-cookies.jpg', alt: 'Galletas decoradas en bandeja' },
    { titulo: 'Alfajores rellenos con chispas',                 src: 'https://www.encasacookingspace.com/wp-content/uploads/2021/07/Chocolate-Chips-Alfajores-Alfacookies-5.jpg', alt: 'Alfajores de galleta rellenos' },
    { titulo: 'Pastel de capas con frutos rojos',               src: 'https://www.sainsburysmagazine.co.uk/media/4027/download/summer-berry-layer-cake-1120-2.jpg?v=1', alt: 'Pastel de capas decorado con frutos rojos' },
    { titulo: 'Copa dulce con crema y frutos del bosque',       src: 'http://www.planticize.com/wp-content/uploads/2016/06/WhiteChoc_n_Berry_06_WEB.jpg', alt: 'Copa de postre con crema y frutos rojos' },
    { titulo: 'Donas glaseadas recién horneadas',               src: 'https://www.sprinkleofthis.com/wp-content/uploads/2020/03/DSC_9390.jpg', alt: 'Donas glaseadas sobre rejilla' },
    { titulo: 'Cheesecake cremoso con fresas',                  src: 'https://www.elmundoeats.com/wp-content/uploads/2024/06/A-portion-of-no-bake-strawberry-cheesecake.jpg', alt: 'Porción de cheesecake con fresas' }
  ];

  /* ---------- ESTADO ---------- */
  var carrito = [], pedidos = [], filtro = 'Todos', soloOfertas = false;

  var $grid = $('#productGrid'), $lista = $('#cartList'), $toast = $('#toast');
  var $menu = $('#menuDropdown'), $modal = $('#checkoutModal'), $cartPanel = $('#cartPanel');
  var $heroScreen = $('#heroScreen'), $dashboardMain = $('#dashboardMain');
  var $catalogPanel = $('#catalogPanel'), $galleryPanel = $('#galleryPanel');
  var $lightbox = $('#lightboxModal'), $filters = $('#filters'), $btnToggleFilters = $('#btnToggleFilters');

  /* ---------- UTILIDADES ---------- */
  function bob(n) { return 'BOB ' + n.toFixed(2); }
  function esMovil() { return $(window).width() <= 1024; }
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }

  function renderHtmlSeguro($target, html) {
    $target.html(window.DOMPurify ? window.DOMPurify.sanitize(html, { ADD_ATTR: ['data-i', 'data-key', 'data-id', 'data-cat'] }) : html);
  }

  /* ---------- PERSISTENCIA (carrito y reservas sobreviven a recargas) ---------- */
  function guardar() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ carrito: carrito, pedidos: pedidos })); } catch (err) {}
  }
  function cargar() {
    var d;
    try { d = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (err) { d = {}; }
    (Array.isArray(d.carrito) ? d.carrito : []).forEach(function (i) {
      var partes = String(i && i.key).split('|');
      var p = productos.filter(function (x) { return String(x.id) === partes[0]; })[0];
      var v = p && p.v.filter(function (x) { return x.t === partes[1]; })[0];
      var qty = Math.floor(Number(i.qty));
      if (v && qty >= 1) { carrito.push({ key: p.id + '|' + v.t, nombre: p.nombre, size: v.t, precio: v.p, qty: Math.min(qty, 99) }); }
    });
    (Array.isArray(d.pedidos) ? d.pedidos : []).forEach(function (r) {
      if (!r || typeof r !== 'object') { return; }
      pedidos.push({
        id: String(r.id).slice(0, 20), fecha: String(r.fecha), cliente: String(r.cliente), celular: String(r.celular),
        resumen: String(r.resumen), sucursal: String(r.sucursal), recojo: String(r.recojo),
        total: Number(r.total) || 0, pago: String(r.pago), cancelada: r.cancelada === true
      });
    });
  }

  /* ---------- IMÁGENES ---------- */
  var IMG_RESPALDO = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 140"><rect width="240" height="140" fill="#ffeaf2"/><circle cx="120" cy="75" r="36" fill="#ff85b8"/><path d="M84 78h72l-9 34H93z" fill="#e83e8c"/><circle cx="120" cy="36" r="7" fill="#e83e8c"/></svg>');

  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && !t.getAttribute('data-fb')) { t.setAttribute('data-fb', '1'); t.src = IMG_RESPALDO; }
  }, true);

  function aplicarPlantillaHtmlProductos() {
    var tpl = document.getElementById('plantilla-imagenes-productos');
    if (!tpl || !tpl.content) { return; }
    productos.forEach(function (p) {
      var img = tpl.content.querySelector('img[data-prod-id="' + p.id + '"]');
      if (img && (img.getAttribute('src') || '').trim()) { p.imgHtml = img.outerHTML; }
    });
  }
  function renderImagenProducto(p, alt) {
    if (p.imgHtml) { return p.imgHtml.replace('<img ', '<img loading="lazy" '); }
    return '<img class="card-item__imagen tarjeta-ods__imagen" src="' + IMG_RESPALDO + '" alt="' + esc(alt) + '">';
  }

  /* ---------- NAVEGACIÓN ---------- */
  function marcarBottomNav(key) { $('.bottom-nav__btn').removeClass('active').filter('[data-bnav="' + key + '"]').addClass('active'); }
  function mostrarPantallaInicio() {
    cerrarCarrito();
    $dashboardMain.addClass('section-hidden');
    $heroScreen.removeClass('section-hidden');
    marcarBottomNav('inicio');
    window.scrollTo(0, 0);
  }
  function mostrarSeccionPrincipal(seccion) {
    $heroScreen.addClass('section-hidden');
    $dashboardMain.removeClass('section-hidden');
    var galeriaVisible = seccion === 'galeria';
    $catalogPanel.toggleClass('section-hidden', galeriaVisible);
    $galleryPanel.toggleClass('section-hidden', !galeriaVisible);
    marcarBottomNav(galeriaVisible ? 'galeria' : 'catalogo');
    setTimeout(actualizarFlechas, 30);
  }

  /* ---------- CARRUSEL: scroll nativo con límites exactos ---------- */
  var raf = 0;
  function actualizarFlechas() {
    var g = $grid[0]; if (!g) { return; }
    var max = g.scrollWidth - g.clientWidth;
    var sinRecorrido = max <= 2;
    $('#btnSlidePrev').toggleClass('is-disabled', sinRecorrido || g.scrollLeft <= 1).attr('aria-disabled', sinRecorrido || g.scrollLeft <= 1);
    $('#btnSlideNext').toggleClass('is-disabled', sinRecorrido || g.scrollLeft >= max - 1).attr('aria-disabled', sinRecorrido || g.scrollLeft >= max - 1);
  }
  function moverCarrusel(dir) {
    var g = $grid[0], c = g.querySelector('.card-item');
    g.scrollBy({ left: (c ? c.offsetWidth + 10 : 160) * dir, behavior: reducido ? 'auto' : 'smooth' });
  }
  $(document).on('click', '#btnSlideNext', function (e) { e.preventDefault(); moverCarrusel(1); });
  $(document).on('click', '#btnSlidePrev', function (e) { e.preventDefault(); moverCarrusel(-1); });
  $grid.on('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(actualizarFlechas); });
  $(window).on('resize', actualizarFlechas);

  /* ---------- CATÁLOGO ---------- */
  function renderProductos() {
    var lista = productos.filter(function (p) {
      var oferta = p.v.some(function (x) { return x.antes; });
      return soloOfertas ? oferta : (filtro === 'Todos' || p.cat === filtro);
    });
    if (!lista.length) {
      renderHtmlSeguro($grid, '<p class="empty">No hay dulces en esta categoría.</p>');
    } else {
      renderHtmlSeguro($grid, lista.map(function (p) {
        var oferta = p.v.some(function (x) { return x.antes; }), v0 = p.v[0];
        var tamanos = p.v.map(function (x, i) {
          return '<button class="size-btn' + (i === 0 ? ' active' : '') + '" data-i="' + i + '">' + x.t + '</button>';
        }).join('');
        return '<article class="card-item" data-id="' + p.id + '">' +
          '<div class="card-item__media">' + renderImagenProducto(p, p.nombre + ' (' + p.cat + ')') + (oferta ? '<span class="tag-offer">Oferta</span>' : '') + '</div>' +
          '<div class="card-item__body"><h3 class="card-item__titulo">' + p.nombre + '</h3>' +
          '<p class="card-item__estado">Recién horneado</p><div class="sizes">' + tamanos + '</div>' +
          '<div class="card-item__footer"><div class="card-item__price"><span class="price">' + bob(v0.p) + '</span><s class="price-old">' + (v0.antes ? bob(v0.antes) : '') + '</s></div>' +
          '<button class="btn btn--add btn-add">🛒 Reservar / Añadir</button></div></div></article>';
      }).join(''));
    }
    $grid[0].scrollLeft = 0; $grid[0].scrollTop = 0;
    setTimeout(actualizarFlechas, 40);
  }

  function renderGaleria() {
    renderHtmlSeguro($('#galleryGrid'), galeria.map(function (g) {
      return '<article class="gallery-card"><img class="gallery-card__img" loading="lazy" src="' + g.src + '" alt="' + esc(g.alt) + '" data-caption="' + esc(g.titulo) + '">' +
        '<p class="gallery-card__caption">' + esc(g.titulo) + '</p></article>';
    }).join(''));
  }

  $grid.on('click', '.size-btn', function () {
    var $card = $(this).closest('.card-item');
    var p = productos.filter(function (x) { return x.id === Number($card.data('id')); })[0];
    var v = p.v[$(this).data('i')];
    $card.find('.size-btn').removeClass('active');
    $(this).addClass('active');
    $card.find('.price').text(bob(v.p));
    $card.find('.price-old').text(v.antes ? bob(v.antes) : '');
  });

  function setFiltrosAbiertos(abierto) {
    $filters.toggleClass('open', abierto).css('display', abierto ? 'flex' : 'none');
    $btnToggleFilters.attr('aria-expanded', String(abierto));
    setTimeout(actualizarFlechas, 40);
  }
  $(document).on('click', '#btnToggleFilters', function (e) {
    e.preventDefault(); e.stopPropagation();
    setFiltrosAbiertos(!$filters.hasClass('open'));
  });

  function aplicarFiltro(cat, cerrarDespues) {
    soloOfertas = cat === 'Ofertas';
    filtro = cat || 'Todos';
    $('#activeFilterLabel').text('· ' + (soloOfertas ? '🔥 Ofertas' : filtro));
    $('#filters .chip').removeClass('active').filter('[data-cat="' + filtro + '"]').addClass('active');
    if (cerrarDespues) { setFiltrosAbiertos(false); }
    mostrarSeccionPrincipal('catalogo');
    renderProductos();
  }
  $(document).on('click', '#filters .chip', function (e) { e.preventDefault(); aplicarFiltro($(this).data('cat'), true); });
  $('#btnEnterCatalog').on('click', function () { aplicarFiltro('Todos', false); });
  $('#btnHeroOffers').on('click', function () { aplicarFiltro('Ofertas', false); });

  /* ---------- CARRITO ---------- */
  function totalActual() {
    return carrito.reduce(function (s, i) { return s + i.precio * i.qty; }, 0) + (carrito.length ? RECARGO : 0);
  }
  function agregar(p, v) {
    var key = p.id + '|' + v.t;
    var item = carrito.filter(function (i) { return i.key === key; })[0];
    if (item) { item.qty = Math.min(item.qty + 1, 99); }
    else { carrito.push({ key: key, nombre: p.nombre, size: v.t, precio: v.p, qty: 1 }); }
    renderCarrito();
  }
  function renderCarrito() {
    if (!carrito.length) {
      renderHtmlSeguro($lista, '<li class="cart__empty">Tu carrito dulce está vacío</li>');
    } else {
      renderHtmlSeguro($lista, carrito.map(function (i) {
        return '<li class="cart-item" data-key="' + esc(i.key) + '">' +
          '<div><p class="ci__name">' + i.nombre + '</p><p class="ci__size">' + i.size + ' · ' + bob(i.precio) + '</p></div>' +
          '<div class="ci__side"><strong class="ci__sub">' + bob(i.precio * i.qty) + '</strong>' +
          '<button class="ci__del" aria-label="Eliminar ' + i.nombre + '">❌</button></div>' +
          '<div class="ci__qty"><button class="qty-minus" aria-label="Quitar uno"' + (i.qty <= 1 ? ' disabled' : '') + '>−</button>' +
          '<span class="qty">' + i.qty + '</span><button class="qty-plus" aria-label="Agregar uno">+</button></div></li>';
      }).join(''));
    }
    var sub = carrito.reduce(function (s, i) { return s + i.precio * i.qty; }, 0);
    var cant = carrito.reduce(function (s, i) { return s + i.qty; }, 0);
    $('#subtotal').text(bob(sub));
    $('#recargo').text(bob(carrito.length ? RECARGO : 0));
    $('#total').text(bob(totalActual()));
    $('#cartBadge, #bottomCartBadge').text(cant);
    $('#btnCheckout, #btnClear').prop('disabled', !carrito.length);
    guardar();
  }
  function buscar($el) {
    var key = $el.closest('.cart-item').attr('data-key');
    return carrito.filter(function (i) { return i.key === key; })[0];
  }

  $grid.on('click', '.btn-add', function () {
    var $card = $(this).closest('.card-item'), $btn = $(this);
    var p = productos.filter(function (x) { return x.id === Number($card.data('id')); })[0];
    agregar(p, p.v[$card.find('.size-btn.active').data('i')]);
    $('#cartBadge').removeClass('badge--bump'); void $('#cartBadge')[0].offsetWidth; $('#cartBadge').addClass('badge--bump');
    $btn.addClass('btn--add--done').text('✔ Añadido');
    setTimeout(function () { $btn.removeClass('btn--add--done').text('🛒 Reservar / Añadir'); }, 850);
  });
  $lista.on('click', '.qty-plus', function () { var it = buscar($(this)); if (it && it.qty < 99) { it.qty++; renderCarrito(); } });
  $lista.on('click', '.qty-minus', function () { var it = buscar($(this)); if (it && it.qty > 1) { it.qty--; renderCarrito(); } });
  $lista.on('click', '.ci__del', function () {
    var it = buscar($(this));
    $(this).closest('.cart-item').fadeOut(180, function () { carrito.splice(carrito.indexOf(it), 1); renderCarrito(); });
  });
  $('#btnClear').on('click', function () {
    if (!carrito.length) { return; }
    $lista.fadeOut(140, function () { carrito = []; renderCarrito(); $lista.fadeIn(140); mostrarToast('🗑️ Pedido vaciado'); });
  });

  /* ---------- PANEL LATERAL, MENÚ Y BARRA INFERIOR ---------- */
  function abrirCarrito() { $heroScreen.addClass('section-hidden'); $dashboardMain.removeClass('section-hidden'); $cartPanel.addClass('open'); }
  function cerrarCarrito() { $cartPanel.removeClass('open'); }
  $('#btnCloseCart').on('click', cerrarCarrito);

  function cambiarTab(id) {
    var $btn = $('.tab[data-tab="' + id + '"]');
    if ($btn.hasClass('active')) { return; }
    $('.tab').removeClass('active').attr('aria-selected', 'false');
    $btn.addClass('active').attr('aria-selected', 'true');
    var $actual = $('.tab-pane.active'), $nuevo = $('#' + id);
    $actual.fadeOut(110, function () { $actual.removeClass('active').css('display', ''); $nuevo.addClass('active').hide().fadeIn(160); });
  }
  $('.tab').on('click', function () { cambiarTab($(this).data('tab')); });

  $('#btnCart').on('click', function () {
    cambiarTab('tabCart');
    if (esMovil()) {
      $cartPanel.toggleClass('open');
      marcarBottomNav($cartPanel.hasClass('open') ? 'carrito' : 'catalogo');
    } else {
      $heroScreen.addClass('section-hidden'); $dashboardMain.removeClass('section-hidden');
      $cartPanel.addClass('cart--pulse');
      setTimeout(function () { $cartPanel.removeClass('cart--pulse'); }, 750);
    }
  });

  $('.bottom-nav').on('click', '.bottom-nav__btn', function () {
    var a = $(this).data('bnav');
    if (a === 'inicio') { mostrarPantallaInicio(); }
    else if (a === 'catalogo') { cerrarCarrito(); aplicarFiltro('Todos', false); }
    else if (a === 'galeria') { cerrarCarrito(); mostrarSeccionPrincipal('galeria'); }
    else if (a === 'carrito') { cambiarTab('tabCart'); abrirCarrito(); marcarBottomNav('carrito'); }
    else if (a === 'reservas') { cambiarTab('tabLog'); abrirCarrito(); marcarBottomNav('reservas'); }
  });

  function cerrarMenu() { $menu.fadeOut(140); $('#btnMenu').attr('aria-expanded', 'false'); }
  $('#btnMenu').on('click', function (e) {
    e.stopPropagation();
    if ($menu.is(':visible')) { cerrarMenu(); } else { $menu.fadeIn(140); $(this).attr('aria-expanded', 'true'); }
  });
  $(document).on('click', function (e) { if (!$(e.target).closest('#menuDropdown, #btnMenu').length) { cerrarMenu(); } });
  $('[data-action]').on('click', function (e) {
    e.preventDefault();
    var a = $(this).data('action');
    if (a === 'inicio') { mostrarPantallaInicio(); }
    else if (a === 'catalogo') { aplicarFiltro('Todos', false); }
    else if (a === 'ofertas') { aplicarFiltro('Ofertas', false); }
    else if (a === 'galeria') { mostrarSeccionPrincipal('galeria'); }
    else if (a === 'reservas') { cambiarTab('tabLog'); abrirCarrito(); marcarBottomNav('reservas'); }
    else if (a === 'contacto') { mostrarToast('🍰 Mi Dulce Bendición · WhatsApp +' + WHATSAPP_NUMERO); }
    cerrarMenu();
  });

  function mostrarToast(msg, tipo) {
    $toast.stop(true, true).hide().removeClass('toast--error').addClass(tipo === 'error' ? 'toast--error' : '').text(msg)
      .slideDown(260).delay(3000).fadeOut(350);
  }

  /* ---------- MODALES: foco, Escape y Tab atrapado ---------- */
  var ultimoFoco = null;
  function abrirOverlay($m, foco) {
    ultimoFoco = document.activeElement;
    $m.fadeIn(180, function () { $(foco).trigger('focus'); });
  }
  function cerrarOverlay($m) {
    if (!$m.is(':visible')) { return; }
    $m.fadeOut(180);
    if (ultimoFoco && ultimoFoco.focus) { ultimoFoco.focus(); }
  }
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') { cerrarOverlay($modal); cerrarOverlay($lightbox); cerrarMenu(); cerrarCarrito(); return; }
    if (e.key !== 'Tab') { return; }
    var $o = $('.modal-overlay:visible'); if (!$o.length) { return; }
    var f = $o.find('button, input, select').filter(':visible:not(:disabled)'); if (!f.length) { return; }
    var primero = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  });

  $(document).on('click', '.card-item__imagen, .gallery-card__img', function () {
    var $i = $(this), src = $i.attr('src'); if (!src) { return; }
    var cap = $i.data('caption') || $i.closest('.card-item').find('.card-item__titulo').text() || $i.attr('alt');
    $('#lightboxImg').attr({ src: src, alt: $i.attr('alt') || cap });
    $('#lightboxCaption').text(cap);
    abrirOverlay($lightbox, '#btnCloseLightbox');
  });
  $('#btnCloseLightbox').on('click', function () { cerrarOverlay($lightbox); });
  $lightbox.on('click', function (e) { if (e.target === this) { cerrarOverlay($lightbox); } });
  $('#btnCloseModal').on('click', function () { cerrarOverlay($modal); });
  $modal.on('click', function (e) { if (e.target === this) { cerrarOverlay($modal); } });

  /* ---------- WHATSAPP ---------- */
  function abrirWhatsApp(texto) {
    window.open('https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(texto), '_blank', 'noopener,noreferrer');
  }
  function armarMensajeReserva(r, items) {
    var detalle = items.map(function (i) { return '• ' + i.nombre + ' (' + i.size + ') x ' + i.qty + ' = ' + bob(i.precio * i.qty); }).join('\n');
    return ['Hola, quiero hacer una reserva dulce en *Mi Dulce Bendición*:', '',
      '👤 *Cliente:* ' + r.cliente, '📱 *Celular:* ' + r.celular, '🏪 *Sucursal:* ' + r.sucursal,
      '📅 *Fecha de recojo:* ' + r.recojo, '💳 *Método de pago:* ' + r.pago, '',
      '🧁 *DETALLE DEL PEDIDO:*', detalle, '• Empaque / reserva = ' + bob(RECARGO), '',
      '💰 *TOTAL A PAGAR:* ' + bob(r.total), '', '🔖 *Código:* ' + r.id].join('\n');
  }
  function armarMensajeCancelacion(r) {
    return ['Hola, quiero *CANCELAR* mi reserva en *Mi Dulce Bendición*:', '',
      '🔖 *Código:* ' + r.id, '👤 *Cliente:* ' + r.cliente, '📱 *Celular:* ' + r.celular,
      '🏪 *Sucursal:* ' + r.sucursal, '🧁 *Detalle:* ' + r.resumen, '💰 *Total:* ' + bob(r.total)].join('\n');
  }

  /* ---------- FORMULARIO Y VALIDACIONES ---------- */
  function setError($inp, msg) { $inp.toggleClass('invalid', !!msg).nextAll('.error-msg').first().text(msg || ''); }
  var reNombre = /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g;
  function hoyISO() {
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function validarNombre() {
    var v = $('#fName').val().trim();
    if (!v) { setError($('#fName'), 'Escribe tu nombre completo.'); return false; }
    if (v.length < 3) { setError($('#fName'), 'El nombre es demasiado corto.'); return false; }
    setError($('#fName'), ''); return true;
  }
  function validarTelefono() {
    var v = $('#fPhone').val().replace(/\D/g, '').slice(0, 8);
    $('#fPhone').val(v);
    if (!v) { setError($('#fPhone'), 'Escribe tu número de celular.'); return false; }
    if (v.length < 7) { setError($('#fPhone'), 'Debe tener entre 7 y 8 dígitos.'); return false; }
    setError($('#fPhone'), ''); return true;
  }
  function validarSucursal() {
    if (!$('#fBranch').val()) { setError($('#fBranch'), 'Selecciona una sucursal.'); return false; }
    setError($('#fBranch'), ''); return true;
  }
  function validarFecha() {
    var v = $('#fDate').val();
    if (!v) { setError($('#fDate'), 'Elige la fecha de recojo.'); return false; }
    if (v < hoyISO()) { setError($('#fDate'), 'La fecha no puede ser anterior a hoy.'); return false; }
    setError($('#fDate'), ''); return true;
  }
  $('#fName').on('input', function () {
    var limpio = this.value.replace(reNombre, '');
    if (limpio !== this.value) { this.value = limpio; setError($(this), 'Solo letras y espacios.'); } else { setError($(this), ''); }
  }).on('blur', validarNombre);
  $('#fPhone').on('input', function () {
    var limpio = this.value.replace(/\D/g, '').slice(0, 8);
    if (this.value !== limpio) { this.value = limpio; }
    setError($(this), '');
  }).on('blur', validarTelefono);
  $('#fBranch').on('change blur', validarSucursal);
  $('#fDate').on('change blur', validarFecha);

  $('#btnCheckout').on('click', function () {
    if (!carrito.length) { return; }
    $('#modalTotal').text(bob(totalActual()));
    $('#fDate').attr('min', hoyISO());
    abrirOverlay($modal, '#fName');
  });

  /* ---------- RESERVAS ---------- */
  function nuevoId() {
    var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', d = new Date(), id;
    do {
      id = '#DUL-' + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2) + '-';
      for (var i = 0; i < 3; i++) { id += A.charAt(Math.floor(Math.random() * A.length)); }
    } while (pedidos.some(function (p) { return p.id === id; }));
    return id;
  }
  function registrarReserva(items, cliente, celular, total, pago, sucursal, recojo) {
    var f = recojo.split('-');
    var reserva = {
      id: nuevoId(),
      fecha: new Date().toLocaleString('es-BO', { dateStyle: 'short', timeStyle: 'short' }),
      cliente: cliente, celular: celular,
      resumen: items.map(function (i) { return i.qty + 'x ' + i.nombre + ' ' + i.size; }).join(', '),
      sucursal: sucursal, recojo: f[2] + '/' + f[1] + '/' + f[0], total: total, pago: pago, cancelada: false
    };
    pedidos.push(reserva);
    renderBitacora();
    return reserva;
  }
  function renderBitacora() {
    var $log = $('#logList');
    if (!pedidos.length) { renderHtmlSeguro($log, '<li class="cart__empty">Aún no tienes reservas</li>'); guardar(); return; }
    renderHtmlSeguro($log, pedidos.slice().reverse().map(function (p) {
      return '<li class="log-item' + (p.cancelada ? ' log-item--cancelled' : '') + '" data-id="' + esc(p.id) + '">' +
        '<div class="log__top"><span class="log__id">' + esc(p.id) + '</span><span class="log__date">' + esc(p.fecha) + '</span></div>' +
        '<p class="log__items">' + esc(p.resumen) + '</p>' +
        '<p class="log__branch">👤 ' + esc(p.cliente) + ' · 📱 ' + esc(p.celular) + '</p>' +
        '<p class="log__branch">📍 ' + esc(p.sucursal) + ' · Recojo: ' + esc(p.recojo) + '</p>' +
        '<div class="log__bottom"><span class="log__total">' + bob(p.total) + ' · ' + esc(p.pago) + '</span>' +
        '<span class="log__state">' + (p.cancelada ? '🔴 Cancelada' : '🟡 Pendiente: confirma por WhatsApp') + '</span></div>' +
        (p.cancelada ? '' : '<div class="log__actions"><button class="btn-cancel-res">Cancelar reserva</button></div>') + '</li>';
    }).join(''));
    guardar();
  }

  $('#checkoutForm').on('submit', function (e) {
    e.preventDefault();
    if (![validarNombre(), validarTelefono(), validarSucursal(), validarFecha()].every(Boolean)) { mostrarToast('⚠️ Revisa los campos marcados', 'error'); return; }
    var items = carrito.map(function (i) { return $.extend({}, i); });
    var reserva = registrarReserva(items, $('#fName').val().trim(), $('#fPhone').val().trim(), totalActual(),
      $('input[name=pago]:checked').val(), $('#fBranch').val(), $('#fDate').val());
    var mensaje = armarMensajeReserva(reserva, items);

    carrito = []; renderCarrito();
    this.reset();
    $(this).find('.invalid').removeClass('invalid');
    $(this).find('.error-msg').text('');
    cerrarOverlay($modal);
    cambiarTab('tabLog'); abrirCarrito(); marcarBottomNav('reservas');
    mostrarToast('✅ Reserva registrada. Abriendo WhatsApp...');
    abrirWhatsApp(mensaje);
  });

  var AVISO = '<span class="log__ask">¿Cancelar y avisar por WhatsApp?</span><button class="btn-cancel-yes">Sí, cancelar</button><button class="btn-cancel-no">No</button>';
  $('#logList').on('click', '.btn-cancel-res', function () {
    renderHtmlSeguro($(this).parent(), AVISO);
  }).on('click', '.btn-cancel-no', function () {
    renderHtmlSeguro($(this).parent(), '<button class="btn-cancel-res">Cancelar reserva</button>');
  }).on('click', '.btn-cancel-yes', function () {
    var id = $(this).closest('.log-item').attr('data-id');
    var r = pedidos.filter(function (p) { return p.id === id; })[0];
    if (r) {
      r.cancelada = true;
      renderBitacora();
      mostrarToast('🚫 Reserva ' + id + ' cancelada. Abriendo WhatsApp...', 'error');
      abrirWhatsApp(armarMensajeCancelacion(r));
    }
  });

  /* ---------- TEMA CLARO / OSCURO ---------- */
  var $body = $('body'), $btnTheme = $('#btnTheme');
  function actualizarIconoTema() {
    var oscuro = $body.hasClass('dark-mode');
    $btnTheme.text(oscuro ? '☀️' : '🌙').attr({ 'aria-label': oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro', 'aria-pressed': String(oscuro) });
  }
  $btnTheme.on('click', function () {
    $body.toggleClass('dark-mode');
    actualizarIconoTema();
    try { localStorage.setItem('mdb-theme', $body.hasClass('dark-mode') ? 'dark' : 'light'); } catch (err) {}
  });
  try { if (localStorage.getItem('mdb-theme') === 'dark') { $body.addClass('dark-mode'); } } catch (err) {}
  actualizarIconoTema();

  /* ---------- INICIO ---------- */
  cargar();
  setFiltrosAbiertos(false);
  aplicarPlantillaHtmlProductos();
  renderProductos();
  renderGaleria();
  renderCarrito();
  renderBitacora();
  mostrarPantallaInicio();
});