// Team members: numbers, short names and photos. All other text (full names, bios,
// labels) lives in src/i18n/*.json under `team.people`, in the same order as this list.
// Photos live in src/assets/equipo/. Some people are photographed together,
// so the team page shows one photo per group (see `grupos`).
import type { ImageMetadata } from 'astro';
import abuelas from '../assets/equipo/abuelas.jpg';
import kevynIvan from '../assets/equipo/kevyn-ivan.jpg';
import kerstin from '../assets/equipo/kerstin.jpg';

export interface Persona {
  numero: number;
  /** Short name shown as a label on the photo. */
  apodo: string;
}

export const equipo: Persona[] = [
  { numero: 1, apodo: 'Mery' },
  { numero: 2, apodo: 'Irma' },
  { numero: 3, apodo: 'Kevyn' },
  { numero: 4, apodo: 'Tiíta' },
  { numero: 5, apodo: 'Ivan' },
];

export interface Grupo {
  /** `numero` of each person in the photo, from left to right. */
  miembros: number[];
  foto: ImageMetadata;
  /** CSS object-position, to keep faces in frame when the photo is cropped to 4:3. */
  posicion?: string;
}

export const grupos: Grupo[] = [
  { miembros: [1, 2], foto: abuelas },
  { miembros: [3, 5], foto: kevynIvan, posicion: '50% 30%' },
  { miembros: [4], foto: kerstin, posicion: '50% 35%' },
];
