import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

let lenisInstance: Lenis | null = null;
let isTickerBound = false;

/**
 * Central animation controller for Lobitos Ponchos in Astro.
 * Handles Lenis smooth scroll inertia and GSAP ScrollTrigger reveals across all pages.
 */
export function initAnimations(): void {
  if (typeof window === 'undefined') return;

  // Clean up any existing triggers before re-initializing (for View Transitions / page loads)
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // ---------------------------------------------------------------------------
  // 1. Smooth Scroll (Lenis)
  // ---------------------------------------------------------------------------
  if (!lenisInstance) {
    lenisInstance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenisInstance;

    lenisInstance.on('scroll', ScrollTrigger.update);

    if (!isTickerBound) {
      gsap.ticker.add((time: number) => {
        lenisInstance?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
      isTickerBound = true;
    }
  }

  // Coordinated behavior with Header mega/about menus and mobile menu
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (header) {
    const observer = new MutationObserver(() => {
      if (header.dataset.menu === 'mobile') {
        lenisInstance?.stop();
      } else {
        lenisInstance?.start();
      }
    });
    observer.observe(header, { attributes: true, attributeFilter: ['data-menu'] });
  }

  // Close open desktop mega/about menus on significant scroll
  let lastY = 0;
  lenisInstance.on('scroll', (e: { scroll: number }) => {
    const delta = Math.abs(e.scroll - lastY);
    if (delta > 35) {
      const headerEl = document.querySelector<HTMLElement>('[data-header]');
      if (headerEl && (headerEl.dataset.menu === 'mega' || headerEl.dataset.menu === 'about')) {
        headerEl.dataset.menu = '';
        if (!headerEl.hasAttribute('data-scrolled')) headerEl.removeAttribute('data-dark');
        headerEl.querySelectorAll('[data-panel]').forEach((p) => p.removeAttribute('data-open'));
        headerEl.querySelectorAll('[data-trigger]').forEach((t) => t.setAttribute('aria-expanded', 'false'));
      }
    }
    lastY = e.scroll;
  });

  // Anchor hash link smooth scroll with header offset
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    const hash = href.slice(hashIndex);
    if (hash.length <= 1) return;

    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const linkPath = link.pathname.replace(/\/$/, '') || '/';
    if (currentPath === linkPath || href.startsWith('#')) {
      const target = document.querySelector<HTMLElement>(hash);
      if (target) {
        e.preventDefault();
        lenisInstance?.scrollTo(target, {
          offset: -76,
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  });

  // ---------------------------------------------------------------------------
  // 2. Scroll Reveal: Titles & Main Headings (h1, h2, display texts)
  // ---------------------------------------------------------------------------
  const titles = Array.from(
    document.querySelectorAll<HTMLElement>(`
      main h1,
      main h2,
      footer h2
    `)
  ).filter((el) => {
    // Exclude hero carousels and menus
    return (
      !el.closest('[data-hero]') &&
      !el.closest('[data-carousel]') &&
      !el.closest('[data-header]')
    );
  });

  titles.forEach((title) => {
    title.classList.add('reveal-ready');
    gsap.fromTo(
      title,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  // ---------------------------------------------------------------------------
  // 3. Scroll Reveal: Staggered Blocks & Components
  // ---------------------------------------------------------------------------
  // A) Categories grid on home page
  const categoryLinks = document.querySelectorAll<HTMLElement>('#categorias > a');
  if (categoryLinks.length > 0) {
    categoryLinks.forEach((el) => el.classList.add('reveal-ready'));
    gsap.fromTo(
      categoryLinks,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#categorias',
          start: 'top 85%',
          once: true,
        },
      }
    );
  }

  // B) Galería en portada "En la vida real"
  const galleryFigures = document.querySelectorAll<HTMLElement>('main section.bg-black figure');
  if (galleryFigures.length > 0) {
    galleryFigures.forEach((el) => el.classList.add('reveal-ready'));
    gsap.fromTo(
      galleryFigures,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: galleryFigures[0].parentElement || galleryFigures[0],
          start: 'top 85%',
          once: true,
        },
      }
    );
  }

  // C) Product Cards (Catalogue and related products)
  const productCards = document.querySelectorAll<HTMLElement>('[data-product]');
  if (productCards.length > 0) {
    productCards.forEach((el) => el.classList.add('reveal-ready'));
    const parentList = productCards[0].parentElement;
    gsap.fromTo(
      productCards,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: parentList || productCards[0],
          start: 'top 85%',
          once: true,
        },
      }
    );
  }

  // D) CausaBlocks en la-causa.astro
  const causaSections = document.querySelectorAll<HTMLElement>('section[id^="causa-"]');
  causaSections.forEach((section) => {
    const gridCols = Array.from(section.querySelectorAll<HTMLElement>(':scope > div > div'));
    gridCols.forEach((col) => col.classList.add('reveal-ready'));
    gsap.fromTo(
      gridCols,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      }
    );
  });

  // E) Índice de navegación de causas (nav de 4 columnas)
  const causaNavItems = document.querySelectorAll<HTMLElement>('nav[data-causa-index] > a');
  if (causaNavItems.length > 0) {
    causaNavItems.forEach((el) => el.classList.add('reveal-ready'));
    gsap.fromTo(
      causaNavItems,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: 'nav[data-causa-index]',
          start: 'top 88%',
          once: true,
        },
      }
    );
  }

  // F) Fichas de personas en equipo.astro
  const teamMemberSections = Array.from(document.querySelectorAll<HTMLElement>('main > section.border-b-2.border-black')).filter(
    (sec) => sec.querySelector('.font-display text-\\[32px\\], .aspect-\\[4\\/5\\], img')
  );
  teamMemberSections.forEach((sec) => {
    const cols = Array.from(sec.querySelectorAll<HTMLElement>(':scope > div > div'));
    cols.forEach((c) => c.classList.add('reveal-ready'));
    gsap.fromTo(
      cols,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 82%',
          once: true,
        },
      }
    );
  });

  // G) InstagramFeature card
  const instagramCard = document.querySelector<HTMLElement>('#instagram > a');
  if (instagramCard) {
    instagramCard.classList.add('reveal-ready');
    gsap.fromTo(
      instagramCard,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: instagramCard,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }

  // H) Sección Filosofía Material (#tejido)
  const tejidoCols = document.querySelectorAll<HTMLElement>('#tejido > div.grid > div');
  if (tejidoCols.length > 0) {
    tejidoCols.forEach((el) => el.classList.add('reveal-ready'));
    gsap.fromTo(
      tejidoCols,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#tejido',
          start: 'top 85%',
          once: true,
        },
      }
    );
  }

  // ---------------------------------------------------------------------------
  // 4. Scroll Reveal: Imágenes y Contenedores Multimedia
  // ---------------------------------------------------------------------------
  const contentImages = Array.from(
    document.querySelectorAll<HTMLElement>(`
      main picture:not([data-hero] *):not([data-carousel] *) img,
      [data-lazy-video],
      figure img
    `)
  );

  contentImages.forEach((img) => {
    img.classList.add('reveal-ready');
    const container = img.closest<HTMLElement>('picture, figure, .relative') || img;
    gsap.fromTo(
      img,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  // ---------------------------------------------------------------------------
  // 5. Scroll Reveal: Estadísticas / KPIs y Chips
  // ---------------------------------------------------------------------------
  // A) Cajas de resultados en equipo.astro
  const teamStatBoxes = document.querySelectorAll<HTMLElement>('main > section .border-\\[1\\.5px\\].border-black:has(.font-display)');
  teamStatBoxes.forEach((box) => {
    const section = box.closest('section') || box;
    box.classList.add('reveal-ready');
    gsap.fromTo(
      box,
      { y: 20, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });

  // B) Barra de estadísticas superior en equipo.astro (dl)
  const topStats = document.querySelectorAll<HTMLElement>('dl.grid > div');
  if (topStats.length > 0) {
    topStats.forEach((el) => el.classList.add('reveal-ready'));
    gsap.fromTo(
      topStats,
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: 'dl.grid',
          start: 'top 88%',
          once: true,
        },
      }
    );
  }

  // Refrescar ScrollTrigger para asegurar sincronización con dimensiones finales
  ScrollTrigger.refresh();
}
