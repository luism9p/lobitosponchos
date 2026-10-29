// Tiny i18n helper: two JSON dictionaries (es.json / en.json) and a route table.
// Missing or empty English keys fall back to Spanish, so the site never shows a blank.
import es from './es.json';
import en from './en.json';

export const languages = ['es', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'es';

const dictionaries: Record<Lang, unknown> = { es, en };

/**
 * Show the ES | EN switcher and let search engines index /en/.
 * On by default. Hide English again with PUBLIC_EN_LIVE=false in Vercel
 * (always visible in `npm run dev`).
 */
export const englishLive = import.meta.env.DEV || import.meta.env.PUBLIC_EN_LIVE !== 'false';

/** URL segment of every page, per language. Add new pages here. */
export const routes = {
  home: { es: '', en: '' },
  causa: { es: 'la-causa', en: 'our-cause' },
  equipo: { es: 'equipo', en: 'team' },
  catalogo: { es: 'catalogo', en: 'catalog' },
  disena: { es: 'disena', en: 'design-your-own' },
  historia: { es: 'historia', en: 'our-story' },
  b2b: { es: 'b2b', en: 'wholesale' },
} as const;
export type RouteKey = keyof typeof routes;

/** Build a page URL. `url('en', 'catalogo', 'poncho-x')` -> `/en/catalog/poncho-x/` */
export function url(lang: Lang, route: RouteKey, slug?: string, hash?: string): string {
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  const segment = routes[route][lang];
  let path = segment ? `${prefix}/${segment}/` : `${prefix}/`;
  if (slug) path += `${slug}/`;
  return hash ? `${path}#${hash}` : path;
}

export function langFromUrl(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

function lookup(dict: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((node, part) => (node == null ? undefined : (node as Record<string, unknown>)[part]), dict);
}

/** Spanish value, overridden by the English one wherever the English text is not empty. */
function merge(base: unknown, override: unknown): unknown {
  if (Array.isArray(base)) {
    return base.map((item, i) => merge(item, Array.isArray(override) ? override[i] : undefined));
  }
  if (base && typeof base === 'object') {
    const over = (override && typeof override === 'object' ? override : {}) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(base).map(([k, v]) => [k, merge(v, over[k])]));
  }
  return override === undefined || override === null || override === '' ? base : override;
}

export function useTranslations(lang: Lang) {
  const get = (key: string): unknown =>
    lang === defaultLang
      ? lookup(dictionaries[defaultLang], key)
      : merge(lookup(dictionaries[defaultLang], key), lookup(dictionaries[lang], key));

  /** Text for `key`. `{name}` style placeholders are replaced from `vars`. */
  function t(key: string, vars: Record<string, string | number> = {}): string {
    const value = get(key);
    if (typeof value !== 'string') throw new Error(`i18n: missing string key "${key}"`);
    return value.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
  }

  /** Array of strings or objects for `key` (lists such as gallery captions or team members). */
  function list<T = string>(key: string): T[] {
    const value = get(key);
    if (!Array.isArray(value)) throw new Error(`i18n: missing list key "${key}"`);
    return value as T[];
  }

  return { t, list, lang };
}

export type Translator = ReturnType<typeof useTranslations>;
