# Lobitos Ponchos (Astro + Tailwind)

Sitio estático: portada, catálogo, la causa y equipo. Migrado desde los `.dc.html` de Claude Design.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/ (HTML + imágenes AVIF/WebP optimizadas)
npm run preview  # sirve dist/
```

## Dónde está cada cosa

| Qué | Dónde |
| --- | --- |
| Páginas | `src/pages/` (`index`, `la-causa`, `equipo`, `catalogo/`) |
| Header, footer, tarjetas, etc. | `src/components/` |
| Menús y carrusel (JS mínimo) | `src/scripts/` |
| WhatsApp, Instagram, correo | `src/data/site.ts` |
| Categorías (home, menú, footer) | `src/data/categorias.ts` |
| Equipo | `src/data/equipo.ts` |
| Colores, fuentes y breakpoints | `src/styles/global.css` |
| Fotos originales | `src/assets/` |
| Video del reel | `public/media/` |

## Agregar un poncho al catálogo

1. Pon las fotos en `src/assets/productos/` (cualquier tamaño, mejor 1600 px de ancho o más; el build genera las versiones livianas).
2. Crea `src/content/productos/nombre-del-poncho.md`:

```md
---
nombre: "Poncho Surf Azul"
categoria: ponchos        # ponchos | kids | fundas | accessories
precio: 120               # opcional; sin precio muestra "Consultar precio"
etiqueta: "Nuevo"         # opcional
resumen: "Una línea para la tarjeta."
tallas: ["S", "M", "L"]
colores: ["Azul"]
orden: 1                  # menor = aparece primero
fotos:
  - src: ../../assets/productos/poncho-azul-1.jpg
    alt: "Poncho azul visto de frente"
  - src: ../../assets/productos/poncho-azul-2.jpg
    alt: "Detalle del bolsillo"
---
Descripción larga (Markdown).
```

La primera foto es la portada. La página `/catalogo/nombre-del-poncho/` y el botón de WhatsApp (con el nombre ya escrito) se crean solos.

Los 7 productos actuales son **placeholders** (`borrador: true`, fotos de las categorías, sin precio). Reemplázalos.

## Imágenes rápidas

- Todas las fotos pasan por `src/components/Img.astro`: AVIF con respaldo WebP, varios anchos (`srcset`), ancho y alto definidos y carga diferida.
- Solo la primera foto del hero y la primera fila del catálogo cargan de inmediato.
- El reel de Instagram es un video (`reel.mp4`/`reel.webm`, ~0.7 MB) que empieza a bajar al acercarse a la pantalla. Reemplaza al gif de 13 MB.

## Pendiente antes de publicar

- Número real de WhatsApp, dirección y correo (`src/data/site.ts`).
- Fotos reales del equipo (`src/data/equipo.ts`, campo `foto`).
- Fotos y precios reales del catálogo.
- Dominio en `astro.config.mjs` (`site`) para sitemap y etiquetas canónicas.
