# Decisions

- **2026-10-30: Domain lobitosponchos.com, bought on Porkbun.** DNS stays at Porkbun (we didn't switch nameservers). A record → Vercel `216.198.79.1`, `www` CNAME → Vercel. Porkbun's email-forwarding MX and TXT records were kept.
- **2026-10-30: Official site address set in code** (`site` in `astro/astro.config.mjs`). Language links (hreflang) and canonical tags now use full addresses so Google reads them. Link previews on WhatsApp/Instagram show a photo: the beach collage by default, and each product's cover photo on product pages.
- **2026-11-02: Poncho prices set.** Classics S/ 150, Light S/ 160, one-of-a-kind ("designer") S/ 170. Set per product in `astro/src/content/productos/`.
- **2026-11-03: Three one-of-a-kind ponchos get their own price (Tita).** Fish Poncho S/ 180, Me quiere no me quiere S/ 200, Cola de sirena S/ 230. Other one-of-a-kind ponchos stay at S/ 170.
- **2026-11-03: Original colours restored on all 64 poncho photos.** The automatic "more even colour" edit from Oct 29 distorted fabric colours and made the first Fish Poncho photo look harsh. True product colour matters more than a uniform look, so we went back to the originals from the first version of the site. This also removes the extra sharpening.
- **2026-11-02: Product descriptions removed from shop cards and product pages.** They were all placeholders. A short summary stays hidden in each product file for Google and link previews.
- **2026-11-02: Marketing print design chosen.** Big sign and a two-sided horizontal A6 postcard, using the home page sewing photo with the Fish Poncho skater as a collage. Print files are in `documents/print-materials/` (git-ignored, so not shared through the repo).
