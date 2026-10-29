// Single source of truth for contact data. Replace the placeholders before launch.
export const site = {
  name: 'Lobitos Ponchos',
  tagline: 'Hecho a mano en Lobitos, Piura, Perú',
  // Tita's WhatsApp (Switzerland).
  whatsapp: '41789140609',
  whatsappLabel: '+41 78 914 06 09',
  instagram: 'lobitos_ponchos',
  instagramHandle: '@lobitos_ponchos',
  email: 'admi.lobitosponchos@gmail.com',
} as const;

export const instagramUrl = `https://instagram.com/${site.instagram}`;

/** Our host profile on Workaway, where volunteers apply. */
export const workawayUrl = 'https://www.workaway.info/en/host/762728382674';

/** wa.me link; pass `message` to open the chat with the text already written. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
