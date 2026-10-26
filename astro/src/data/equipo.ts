// Team members. `foto` stays null until real photos are added (drop them in src/assets/equipo/).
import type { ImageMetadata } from 'astro';

export interface Persona {
  numero: number;
  etiqueta: string;
  tecnica: string;
  nombre: string;
  bio: string;
  stats: [{ valor: string; texto: string }, { valor: string; texto: string }];
  fotoSlot: string;
  foto: ImageMetadata | null;
  pieIzquierda: string;
  pieDerecha: string;
}

export const equipo: Persona[] = [
  {
    numero: 1,
    etiqueta: '01 — Fundadora',
    tecnica: 'Matriarca & costurera',
    nombre: 'Esmérita "Mery" Eche Periche',
    bio: 'Con 70 años y una vida entera en Lobitos, Esmérita aprendió costura a máquina de su madre y se dedicó a ella desde muy joven. Hoy retoma esa pasión aportando al taller la experiencia de toda una vida cosiendo, dando forma a cada pieza con manos que no han dejado de tejer tradición.',
    stats: [{ valor: '+40', texto: 'Años tejiendo tradición' }, { valor: '500+', texto: 'Piezas únicas creadas' }],
    fotoSlot: 'foto-esmerita',
    foto: null,
    pieIzquierda: 'Costura tradicional',
    pieDerecha: 'Piura · Perú',
  },
  {
    numero: 2,
    etiqueta: '02 — Maestra artesana',
    tecnica: 'Técnica de remalle manual',
    nombre: 'Irma Bancayan Eche',
    bio: 'Abuela de Kevyn, nacida, criada y residente en Lobitos. Con experiencia en manualidades y costura desde los 10 años, Irma se encarga del remallado y unión de piezas — el paso que le da forma final al poncho antes de la supervisión de calidad.',
    stats: [{ valor: '100%', texto: 'Fibras y tintes naturales' }, { valor: '+80', texto: 'Patrones ancestrales rescatados' }],
    fotoSlot: 'foto-irma',
    foto: null,
    pieIzquierda: 'Residencia: Lobitos',
    pieDerecha: 'Unión · Precisión',
  },
  {
    numero: 3,
    etiqueta: '03 — Producción',
    tecnica: 'Enlace generacional',
    nombre: 'Kevyn Abad (19 años)',
    bio: 'Nacido y criado en Lobitos, estudiante de Administración de Hostelería y Restaurante. Kevyn recibe los pedidos, toma medidas, define combinaciones y se encarga de recoger, cortar y distribuir la tela a las abuelas. Supervisa la calidad y realiza la entrega final — el motor que conecta el taller con cada cliente. Su meta: apoyar a sus abuelas y financiar sus estudios.',
    stats: [{ valor: '12', texto: 'Comunidades aliadas' }, { valor: '98%', texto: 'Tasa de satisfacción' }],
    fotoSlot: 'foto-kevyn',
    foto: null,
    pieIzquierda: 'Coordinación de taller',
    pieDerecha: 'Logística · Corte',
  },
  {
    numero: 4,
    etiqueta: '04 — Marketing & estrategia',
    tecnica: 'Fotografía documental · Suiza-Perú',
    nombre: 'Kerstin Ulrich "Tiíta" (32 años)',
    bio: 'Nacida y criada en Suiza, de madre peruana. Llegó a Lobitos en 2018 como voluntaria de Waves Lobitos y nunca se fue del todo. Aporta su pasión por la fotografía al proyecto, contando la historia de Lobitos al mundo sin perder la autenticidad del origen — orgullosa de trabajar en un equipo que es, ante todo, familia.',
    stats: [{ valor: '+10K', texto: 'Audiencia alcanzada' }, { valor: '3×', texto: 'Crecimiento en 2 años' }],
    fotoSlot: 'foto-kerstin',
    foto: null,
    pieIzquierda: 'Comunicación global',
    pieDerecha: 'Pacífico sur',
  },
  {
    numero: 5,
    etiqueta: '05 — Administración y comunidad',
    tecnica: 'Gestión y sostenibilidad',
    nombre: 'Ivan Vite (20 años)',
    bio: 'Nacido y criado en Lobitos, actualmente estudia Ingeniería Ambiental fuera de su hogar. Ivan sostiene el área administrativa del proyecto, asegurando que detrás de cada pieza artesanal haya también orden, cuidado y comunidad.',
    stats: [{ valor: '+200', texto: 'Historias publicadas' }, { valor: '5★', texto: 'Valoración de clientes' }],
    fotoSlot: 'foto-ivan',
    foto: null,
    pieIzquierda: 'Ingeniería ambiental · Comunidad',
    pieDerecha: 'Gestión rural',
  },
];
