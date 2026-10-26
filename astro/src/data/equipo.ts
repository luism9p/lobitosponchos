// Team members: numbers, photos and figures. All text (names, bios, labels) lives in
// src/i18n/*.json under `team.people`, in the same order as this list.
// Add real photos in src/assets/equipo/ and set `foto`.
import type { ImageMetadata } from 'astro';

export interface Persona {
  numero: number;
  stats: [string, string];
  fotoSlot: string;
  foto: ImageMetadata | null;
}

export const equipo: Persona[] = [
  { numero: 1, stats: ['+40', '500+'], fotoSlot: 'foto-esmerita', foto: null },
  { numero: 2, stats: ['100%', '+80'], fotoSlot: 'foto-irma', foto: null },
  { numero: 3, stats: ['12', '98%'], fotoSlot: 'foto-kevyn', foto: null },
  { numero: 4, stats: ['+10K', '3×'], fotoSlot: 'foto-kerstin', foto: null },
  { numero: 5, stats: ['+200', '5★'], fotoSlot: 'foto-ivan', foto: null },
];
