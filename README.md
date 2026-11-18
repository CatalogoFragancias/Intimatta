# Intimatta — Perfumería y cosmética íntima

Sitio de Intimatta: perfumes de autor, fragancias con feromonas y cosmética íntima, con pedidos por WhatsApp.

- `index.html` — portada con las cartas: La Emperatriz (perfumes de mujer), El Emperador (de hombre), Los Enamorados (unisex) y El Placer (lencería y cosmética íntima). El Loco, al final y muy discreto, lleva a la Línea +18
- `mas18.html` — Línea +18, con confirmación de edad (solo se enlaza desde el pie de página y no aparece en buscadores)
- `styles.css` — estilos
- `app.js` — productos, filtros, carrito y armado del mensaje de WhatsApp
- `img/` — logo, ilustración de La Estrella y frascos de perfume

## Cambiar productos o precios
Todo está en `app.js`, en la lista `PRODUCTS`:
- `line: 'perfume'` aparece en Perfumes (con `gen`: Donna, Homme o Unisex)
- `line: 'cosmetica'` aparece en Cosmética íntima
- `line: 'adulto'` aparece solo en la Línea +18 (con `cat` como categoría)

`price: null` muestra "Precio a consultar".

## Links directos a cada carta
`#emperatriz`, `#emperador`, `#enamorados` y `#placer` abren el catálogo de esa carta (por ejemplo, para la bio o las historias).

## Anuncios en Instagram / Facebook
Usá como destino `index.html` o el link de una carta de perfumes (`index.html#emperatriz`). No uses `mas18.html` en anuncios.

## Publicar con GitHub Pages
Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / carpeta `/ (root)`.
