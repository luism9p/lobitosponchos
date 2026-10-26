import type { ImageMetadata } from 'astro';
import ponchos from '../assets/categorias/ponchos.webp';
import ponchokids from '../assets/categorias/ponchokids.webp';
import fundas from '../assets/categorias/fundas.webp';
import accessories from '../assets/categorias/accessories.jpeg';
import { url, type Lang } from '../i18n';

export type CategoriaId = 'ponchos' | 'kids' | 'fundas' | 'accessories';

export interface Categoria {
  id: CategoriaId;
  imagen: ImageMetadata;
}

// Category names live in src/i18n/*.json under `categories.<id>`.
export const categorias: Categoria[] = [
  { id: 'ponchos', imagen: ponchos },
  { id: 'kids', imagen: ponchokids },
  { id: 'fundas', imagen: fundas },
  { id: 'accessories', imagen: accessories },
];

export const catalogoUrl = (lang: Lang, cat?: CategoriaId) =>
  cat ? `${url(lang, 'catalogo')}?cat=${cat}` : url(lang, 'catalogo');
