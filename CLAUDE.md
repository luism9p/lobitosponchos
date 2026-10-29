# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About the project

This is the website of Lobitos Ponchos, a small local business in Lobitos, Piura (Peru), a small surf and fishing town of about 1,000 people. The business makes handmade surf ponchos, kids' ponchos, board bags and accessories. The site shows the catalogue, the story behind the business ("la causa": creating local work, valuing the town's elders, connecting visitors with the community) and the team. There is no online checkout. Customers order through pre-written WhatsApp messages.

The team (bios are in `team.people` in `src/i18n/*.json`):
- **Kerstin Ulrich "Tiíta"**: the brain behind the project. She also does the marketing and photos. She is Swiss-Peruvian and first came to Lobitos in 2018 to volunteer with Waves Lobitos.
- **Esmérita "Mery" Eche Periche**: matriarch and head seamstress, 70, has sewn in Lobitos all her life.
- **Irma Bancayan Eche**: master artisan. She finishes and joins every piece. She is Kevyn's grandmother.
- **Kevyn Abad**: production. He takes orders, measures customers, picks colours, cuts the fabric and checks each poncho.
- **Ivan Vite**: admin and community. He studies Environmental Engineering.

Volunteers from overseas also help out. They come to Lobitos for a few weeks at a time and work on the business.

In this repo, Luis Portocarrero, a young man from Lobitos who is technical enough to get things going, maintains the site, reviews and merges pull requests, and manages Vercel. Other contributors, such as Derin (English translation and B2B page, see `TAREAS.md`), work on their own branches.

## Who you're working with

The people using this repo are not developers. They do the development work by asking an AI. So:
- Explain what you're about to do and what you changed in plain language, without jargon. Say which page or part of the site changed, not only which file.
- Do the technical steps yourself (running commands, checking the build, fixing errors) instead of asking them to. When they need to act, give exact, step-by-step instructions.
- After a visible change, check it in the dev server (`npm run dev`) and tell them which URL to open to see it.
- Keep changes small and focused, and confirm before anything hard to undo: pushing, merging, deleting files, or changing `site.ts` contact details or Vercel settings.
- Keep the warm, personal tone of the existing texts when writing content. Names of people and places stay as they are.

## Layout

- `astro/` is the live site (Astro 7 + Tailwind 4, fully static, deployed on Vercel with `astro` as the Root Directory). All work happens here.
- The `.dc.html` files, `support.js` and `uploads/` in the repo root are the original Claude Design export, kept only as a visual reference. Don't edit them.
- `TAREAS.md` is the task brief for the English translation and the B2B page. It describes the conventions below in more detail.
- User-facing docs (READMEs, TAREAS) and the content schema field names are in Spanish.

## Commands

Run from `astro/` (Node 22.12+):

```bash
npm run dev          # http://localhost:4321 (ES) and /en/ (EN)
npm run build        # static output in dist/, includes image optimisation
npm run preview
npm run i18n:check   # lists missing English strings and products without an `en:` block; exits 1 if anything is missing
```

There are no tests or linter. Use `npm run build` to check types and the content schema.

## Architecture

**Bilingual routing (Spanish default at `/`, English under `/en/`).** Every page is a *view* in `src/views/*.astro` that takes a `lang` prop. The files in `src/pages/` are thin wrappers (`<Causa lang="es" />` in `la-causa.astro`, `<Causa lang="en" />` in `en/our-cause.astro`). URL segments for each language live in the `routes` table in `src/i18n/index.ts`. Always build links with `url(lang, routeKey, slug?, hash?)`, never hard-coded paths. `BaseLayout` takes `route` (and `slug`) so it can generate hreflang alternates and the ES|EN switcher target.

To add a page: add a key to `routes`, add a text section to both `es.json` and `en.json`, create `src/views/X.astro`, then add the two thin pages (one under `src/pages/`, one under `src/pages/en/`).

**Translations.** `src/i18n/es.json` holds every string. `en.json` has exactly the same shape. `useTranslations(lang)` returns `t(key, vars)` for strings (with `{name}` placeholders) and `list(key)` for arrays. Empty or missing English values fall back to Spanish (deep merge, arrays merged index by index), so list lengths and order must match across the two files. `\n` in strings marks line breaks and is rendered by the `Lines` component.

**English gating.** `englishLive` is on by default (and always in dev). Setting `PUBLIC_EN_LIVE=false` in Vercel hides English in production. When it's off, `/en/` pages get `noindex`, and the hreflang links and the language switcher are hidden.

**Products** are a content collection (`src/content.config.ts`, one Markdown file per product in `src/content/productos/`). The frontmatter is Spanish, with an optional `en:` block (nombre, etiqueta, resumen, descripcion, tallas, colores). Always read product fields through `localizeProduct()` in `src/data/products.ts`, which handles the Spanish fallback. Photos are `image()` references into `src/assets/productos/`, and the first photo is the cover. `borrador: true` marks a placeholder product. Detail pages come from `getStaticPaths` in `pages/catalogo/[slug].astro` and `pages/en/catalog/[slug].astro`.

**Images.** Render every photo through `src/components/Img.astro` (AVIF with WebP fallback, responsive `srcset`, lazy loading by default). Put source images in `src/assets/`, not `public/`. Only the reel video lives in `public/media/`.

**Contact / config data.** The WhatsApp number, Instagram and email are in `src/data/site.ts`. Categories (used by the home page, menu and footer) are in `src/data/categorias.ts`, and team data is in `src/data/equipo.ts`. Pre-written WhatsApp messages are i18n strings under `wa.*`.

**Client JS** is kept small, in `src/scripts/`: header menus, the carousel, and GSAP + Lenis animations. `initAnimations` is run from `BaseLayout`. Design tokens (colours, fonts, breakpoints) are defined in `src/styles/global.css` using Tailwind 4's CSS-based config. There is no `tailwind.config`.
