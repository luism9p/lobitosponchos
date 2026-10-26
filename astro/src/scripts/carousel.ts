// Cross-fade carousel. Slides, dots and counter squares are plain elements that carry a
// `data-active` attribute; the styles live in the markup (see Hero.astro).

export function initCarousel(root: HTMLElement): void {
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  const dots = [...root.querySelectorAll<HTMLElement>('[data-dot]')];
  const squares = [...root.querySelectorAll<HTMLElement>('[data-square]')];
  const seconds = Number(root.dataset.autoplay) || 4;

  let index = 0;
  let paused = false;
  let timer: number | undefined;

  function show(next: number): void {
    index = (next + slides.length) % slides.length;
    slides.forEach((el, i) => {
      el.toggleAttribute('data-active', i === index);
      el.setAttribute('aria-hidden', String(i !== index));
    });
    dots.forEach((el, i) => el.toggleAttribute('data-active', i === index));
    squares.forEach((el, i) => el.toggleAttribute('data-active', i === index));
    restart();
  }

  function restart(): void {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      if (!paused && !document.hidden) show(index + 1);
    }, seconds * 1000);
  }

  root.querySelector('[data-prev]')?.addEventListener('click', () => show(index - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => show(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

  root.addEventListener('mouseenter', () => (paused = true));
  root.addEventListener('mouseleave', () => (paused = false));

  let startX = 0;
  root.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    paused = true;
  }, { passive: true });
  root.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
    window.setTimeout(() => (paused = false), 1200);
  }, { passive: true });

  restart();
}
