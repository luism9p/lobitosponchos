import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

/** Name, badge, summary, sizes and colours of a product in the requested language (Spanish fallback). */
export function localizeProduct(producto: CollectionEntry<'productos'>, lang: Lang) {
  const d = producto.data;
  const en = lang === 'en' ? d.en : undefined;
  return {
    nombre: en?.nombre || d.nombre,
    etiqueta: en?.etiqueta || d.etiqueta,
    resumen: en?.resumen || d.resumen,
    descripcion: en?.descripcion || undefined,
    tallas: en?.tallas?.length ? en.tallas : d.tallas,
    colores: en?.colores?.length ? en.colores : d.colores,
  };
}
