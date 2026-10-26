# Tasks for Derin — English version + B2B page

Hi Derin! Thank you for helping. This file explains everything you need.
You do **not** need to know how to code for task 1. Task 2 needs a little HTML/Tailwind, and the example below shows the pattern.

The website is in the `astro/` folder (Astro + Tailwind). It is published on Vercel.

---

## 0. Run the site on your computer

You need [Node.js](https://nodejs.org) 22.12 or newer and [Git](https://git-scm.com).

```bash
git clone https://github.com/luism9p/lobitosponchos.git
cd lobitosponchos/astro
npm install
npm run dev
```

Open http://localhost:4321 (Spanish) and http://localhost:4321/en/ (English).
In `npm run dev` you will see a small **ES | EN** switcher in the top bar. On the live site it stays hidden until the English version is ready (see "Going live" at the end).

---

## 1. Translate the site to English

### 1a. Site texts → `astro/src/i18n/en.json`

- `astro/src/i18n/es.json` has every text of the site in Spanish.
- `astro/src/i18n/en.json` has **exactly the same structure, but every value is empty** (`""`).
- Write the English text in the same place in `en.json`. **Do not change the keys** (the words on the left), only the text on the right.
- If a value is left empty, the English page shows the Spanish text, so nothing breaks while you work.

Example:

```json
"nav": {
  "home": "Home",
  "shop": "Shop",
  "about": "About us"
}
```

Rules:
- `\n` means a line break (it is used in big headings). Keep it where it makes sense, e.g. `"The mountain meets\nthe ocean"`.
- `{n}`, `{name}`, `{site}`, `{category}` are placeholders. Keep them exactly as they are. Example: `"Go to image {n}"`.
- Lists (`[ ... ]`) must keep the **same number of items and the same order**. The team members in `team.people` are in the same order as in Spanish.
- Keep the quotes and commas valid. If the site shows an error after you save, a quote or comma is probably missing. `npm run i18n:check` will also tell you.
- Words in CAPITALS on the site are only styling. Write normal text (`"Shop"`, not `"SHOP"`).
- Tone: warm and personal. The texts about the grandmothers, the community and the cause should feel human, not word-for-word. Names of people and places (Lobitos, Piura, Kevyn, Irma…) stay the same.
- The currency stays in soles (`S/`) for now.

Main sections inside `en.json`:

| Key | What it is |
| --- | --- |
| `nav`, `footer`, `hero`, `instagram` | Menus, footer, home carousel, Instagram card |
| `wa` | Messages that are pre-written when someone taps a WhatsApp button |
| `categories` | The 4 category names |
| `home` | Home page |
| `cause` | "La causa" page (`/en/our-cause/`) |
| `team` | Team page (`/en/team/`), including each person's bio |
| `catalog`, `product` | Catalogue and product pages |

### 1b. The 16 products → `astro/src/content/productos/*.md`

Each poncho is one file. Add an `en:` block in the top part (between the `---` lines). Anything you leave out falls back to Spanish.

```md
---
nombre: "Blueberry Chilcano"
categoria: ponchos
...
en:
  nombre: "Blueberry Chilcano"
  resumen: "Handmade surf poncho from Lobitos, Piura."
  descripcion: "Soft, absorbent and quick to dry. Made by hand in Lobitos."
  tallas: ["S", "M", "L"]
  colores: ["Blue", "Turquoise"]
---
```

- `nombre` = name, `resumen` = one-line summary, `descripcion` = longer description, `tallas` = sizes, `colores` = colours, `etiqueta` = small badge (e.g. "New").
- Do not touch the Spanish lines or the `fotos:` list.

### 1c. See what is still missing

```bash
npm run i18n:check
```

It prints the exact keys and product files that still have no English. When it says everything is translated, you are done.

### 1d. Check it in the browser

Go through `/en/`, `/en/our-cause/`, `/en/team/`, `/en/catalog/` and a few product pages. Look for:
- text that is still Spanish,
- text that is too long and breaks the layout (on desktop and on a phone-sized window),
- broken links.

---

## 2. Build the B2B (wholesale) page

Goal: a page for hotels, surf schools, shops and corporate gifts, in **Spanish and English**.

Content to include (ask Luis for the real numbers; use placeholders until then):
- What we offer and who it is for.
- Minimum order, volume pricing, lead times.
- Customisation (logo, colours).
- An inquiry form: name, company, country, quantity, email, message.
- A button to WhatsApp with a pre-written B2B message (`wa.b2b` already exists).

### How to add a page (the pattern the whole site uses)

1. **Add the route** in `astro/src/i18n/index.ts`, inside `routes`:
   ```ts
   b2b: { es: 'b2b', en: 'wholesale' },
   ```
2. **Add the texts** to `es.json` and `en.json` under a new key, e.g. `"b2b": { "title": "…", … }`. Copy an existing section as a model.
3. **Create the page content** in `astro/src/views/B2B.astro`. Copy `src/views/Team.astro` as a starting point: it already has the layout, the `lang` setting and the `t('…')` text calls. Use `route="b2b"` in `<BaseLayout …>`.
4. **Create the two thin pages** that use it (copy `src/pages/equipo.astro` and `src/pages/en/team.astro`):
   - `astro/src/pages/b2b.astro` → `<B2B lang="es" />`
   - `astro/src/pages/en/wholesale.astro` → `<B2B lang="en" />`
5. **Link it** from the menu: in `astro/src/components/Header.astro` the "B2B" links currently open WhatsApp (`b2bUrl`). Change them to `url(lang, 'b2b')`.

Reusable pieces in `astro/src/components/`: `Chip`, `SectionBar`, `WhatsAppButton`, `Img` (always use it for photos: it makes them small and fast), `Lines` (line breaks).

The form needs somewhere to send the messages. Ask Luis before choosing (Formspree, Resend, or a Vercel function). Until then, a "Send by WhatsApp" button is enough.

---

## Working with Git (so nothing gets lost)

```bash
git checkout -b english-translation      # once, to start your own branch
# ...edit files...
git add -A
git commit -m "Translate team page"
git push -u origin english-translation
```

Then open a Pull Request on GitHub and Luis will review and merge it. Please commit small and often. Use another branch (`b2b-page`) for task 2.

If you are not comfortable with Git, send the edited `en.json` and `.md` files to Luis and he will add them.

---

## Going live (Luis does this)

The English pages are hidden from Google and the ES | EN switcher is hidden on the real site until this variable is set in Vercel (Settings → Environment Variables):

```
PUBLIC_EN_LIVE=true
```

Set it only after `npm run i18n:check` says everything is translated and the pages have been reviewed.

## Quick map of the code

```
astro/src/
├── i18n/            es.json, en.json (all texts) + index.ts (routes and helpers)
├── content/productos/   one .md per poncho (Spanish + `en:` block)
├── views/           the page contents (one file for both languages)
├── pages/           thin pages: Spanish at /, English under /en/
├── components/      header, footer, hero, cards…
└── data/            WhatsApp number, categories, team numbers
```
