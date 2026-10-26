import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per product in src/content/productos/.
// The frontmatter describes the product; the body is the long description.
const productos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/productos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      categoria: z.enum(['ponchos', 'kids', 'fundas', 'accessories']),
      /** Price in soles. Leave out to show "Consultar precio". */
      precio: z.number().positive().optional(),
      /** Short badge shown on the card, e.g. "Nuevo", "A pedido". */
      etiqueta: z.string().optional(),
      resumen: z.string(),
      tallas: z.array(z.string()).default([]),
      colores: z.array(z.string()).default([]),
      /** First image is the cover. Every image gets responsive AVIF/WebP at build time. */
      fotos: z.array(z.object({ src: image(), alt: z.string() })).min(1),
      orden: z.number().default(100),
      /** Marks the card as a placeholder until real photos and prices are loaded. */
      borrador: z.boolean().default(false),
    }),
});

export const collections = { productos };
