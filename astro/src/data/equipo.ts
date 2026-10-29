// Team members: numbers and photos. All text (names, bios, labels) lives in
// src/i18n/*.json under `team.people`, in the same order as this list.
// Add real photos in src/assets/equipo/ and set `foto`.
import type { ImageMetadata } from 'astro';

export interface Persona {
  numero: number;
  fotoSlot: string;
  foto: ImageMetadata | null;
}

export const equipo: Persona[] = [
  { numero: 1, fotoSlot: 'foto-esmerita', foto: null },
  { numero: 2, fotoSlot: 'foto-irma', foto: null },
  { numero: 3, fotoSlot: 'foto-kevyn', foto: null },
  { numero: 4, fotoSlot: 'foto-kerstin', foto: null },
  { numero: 5, fotoSlot: 'foto-ivan', foto: null },
];
