// Single source of truth for contact data. Replace the placeholders before launch.
export const site = {
  name: 'Lobitos Ponchos',
  tagline: 'Hecho a mano en Lobitos, Piura, Perú',
  // Placeholder number carried over from the Claude Design mockup.
  whatsapp: '51900000000',
  whatsappLabel: '+51 900 000 000',
  instagram: 'lobitosponchos',
  instagramHandle: '@lobitosponchos',
  email: 'hola@lobitosponchos.pe',
  address: '[Dirección placeholder]',
} as const;

export const instagramUrl = `https://instagram.com/${site.instagram}`;

/** wa.me link; pass `message` to open the chat with the text already written. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
