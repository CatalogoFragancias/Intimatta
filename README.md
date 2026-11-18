# Intimatta — Perfumería y cosmética íntima

Sitio de Intimatta: perfumes de autor, fragancias con feromonas y cosmética íntima, con pedidos por WhatsApp.

- `index.html` — portada: perfumes, historia de marca y cosmética íntima
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

## Anuncios en Instagram / Facebook
Usá como destino `index.html` (o `index.html#perfumes`). No uses `mas18.html` en anuncios.

## Publicar con GitHub Pages
Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / carpeta `/ (root)`.
