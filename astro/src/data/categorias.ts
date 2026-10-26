import type { ImageMetadata } from 'astro';
import ponchos from '../assets/categorias/ponchos.webp';
import ponchokids from '../assets/categorias/ponchokids.webp';
import fundas from '../assets/categorias/fundas.webp';
import accessories from '../assets/categorias/accessories.jpeg';

export type CategoriaId = 'ponchos' | 'kids' | 'fundas' | 'accessories';

export interface Categoria {
  id: CategoriaId;
  nombre: string;
  /** Two-line label used on the home grid cards. */
  lineas: [string, string?];
  imagen: ImageMetadata;
}

export const categorias: Categoria[] = [
  { id: 'ponchos', nombre: 'Lobitos Ponchos', lineas: ['Lobitos', 'Ponchos'], imagen: ponchos },
  { id: 'kids', nombre: 'Lobitos Ponchos Kids', lineas: ['Lobitos', 'Ponchos Kids'], imagen: ponchokids },
  { id: 'fundas', nombre: 'Fundas', lineas: ['Fundas'], imagen: fundas },
  { id: 'accessories', nombre: 'Accessories', lineas: ['Accessories'], imagen: accessories },
];

export const catalogoUrl = (cat?: CategoriaId) => (cat ? `/catalogo/?cat=${cat}` : '/catalogo/');
