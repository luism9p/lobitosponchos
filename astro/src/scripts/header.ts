// Header behaviour: desktop mega/about menus on hover or click, mobile menu, category preview.
// All styling is driven by data attributes (see Header.astro); this file only flips them.

type Menu = '' | 'mega' | 'about' | 'mobile';

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  const desktop = window.matchMedia('(min-width: 820px)');
  const panels = new Map<string, HTMLElement>();
  header.querySelectorAll<HTMLElement>('[data-panel]').forEach((p) => panels.set(p.dataset.panel!, p));
  const triggers = header.querySelectorAll<HTMLElement>('[data-trigger]');
  const burger = header.querySelector<HTMLElement>('[data-burger]');
  const megaItems = header.querySelectorAll<HTMLElement>('[data-megaitem]');
  const megaImgs = header.querySelectorAll<HTMLElement>('[data-megaimg]');
  const megaTag = header.querySelector<HTMLElement>('[data-megatag]');

  let menu: Menu = '';

  function set(next: Menu): void {
    menu = next;
    header!.dataset.menu = next;
    header!.toggleAttribute('data-dark', next !== '');
    panels.forEach((panel, name) => panel.toggleAttribute('data-open', name === next));
    triggers.forEach((t) => t.setAttribute('aria-expanded', String(t.dataset.trigger === next)));
    burger?.setAttribute('aria-expanded', String(next === 'mobile'));
    document.documentElement.style.overflow = next === 'mobile' ? 'hidden' : '';
  }

  function setCategory(index: number): void {
    megaItems.forEach((el) => el.toggleAttribute('data-active', Number(el.dataset.megaitem) === index));
    megaImgs.forEach((el) => el.toggleAttribute('data-active', Number(el.dataset.megaimg) === index));
    const name = megaItems[index]?.dataset.name;
    if (megaTag && name) megaTag.textContent = name;
  }

  triggers.forEach((trigger) => {
    const name = trigger.dataset.trigger as Menu;
    trigger.addEventListener('mouseenter', () => desktop.matches && set(name));
    // On desktop, hovering already opened the menu, so a click must not toggle it shut again.
    trigger.addEventListener('click', () => set(desktop.matches || menu !== name ? name : ''));
  });

  burger?.addEventListener('click', () => set(menu === 'mobile' ? '' : 'mobile'));

  // Plain links in the bar close any open dropdown when hovered or clicked.
  header.querySelectorAll<HTMLElement>('[data-close-menus]').forEach((el) => {
    el.addEventListener('mouseenter', () => desktop.matches && set(''));
  });
  header.querySelectorAll<HTMLElement>('[data-panel] a, nav a').forEach((a) => a.addEventListener('click', () => set('')));

  megaItems.forEach((item) => {
    item.addEventListener('mouseenter', () => setCategory(Number(item.dataset.megaitem)));
    item.addEventListener('focus', () => setCategory(Number(item.dataset.megaitem)));
  });

  header.addEventListener('mouseleave', () => {
    if (desktop.matches && (menu === 'mega' || menu === 'about')) set('');
  });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && set(''));
  document.addEventListener('click', (e) => {
    if (menu !== '' && !header.contains(e.target as Node)) set('');
  });
  desktop.addEventListener('change', () => set(''));
}
