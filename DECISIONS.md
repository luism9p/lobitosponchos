# Decisions

- **2026-10-30: Domain lobitosponchos.com, bought on Porkbun.** DNS stays at Porkbun (we didn't switch nameservers). A record → Vercel `216.198.79.1`, `www` CNAME → Vercel. Porkbun's email-forwarding MX and TXT records were kept.
- **2026-10-30: Official site address set in code** (`site` in `astro/astro.config.mjs`). Language links (hreflang) and canonical tags now use full addresses so Google reads them. Link previews on WhatsApp/Instagram show a photo: the beach collage by default, and each product's cover photo on product pages.
