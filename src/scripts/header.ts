/**
 * ヘッダーの状態管理。
 * - スクロール量に応じた背景の切り替えと読み込み進捗バー
 * - モバイル用フルスクリーンメニュー（フォーカストラップ / Esc / スクロールロック）
 */

const SCROLLED_THRESHOLD = 40;
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const toggleLabel = document.querySelector<HTMLElement>('[data-menu-label]');
  const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!header) return;

  let ticking = false;

  const update = (): void => {
    const y = window.scrollY;
    header.dataset.state = y > SCROLLED_THRESHOLD ? 'scrolled' : '';
    if (progress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, y / scrollable) : 0;
      progress.style.setProperty('--progress', `${(ratio * 100).toFixed(2)}%`);
    }
    ticking = false;
  };

  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  if (!menu || !toggle) return;

  let isOpen = false;
  let lastFocused: HTMLElement | null = null;

  const setOpen = (open: boolean): void => {
    if (open === isOpen) return;
    isOpen = open;
    toggle.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('is-locked', open);
    header.toggleAttribute('data-menu-open', open);
    if (toggleLabel) toggleLabel.textContent = open ? 'CLOSE' : 'MENU';

    if (open) {
      lastFocused = document.activeElement as HTMLElement | null;
      menu.hidden = false;
      requestAnimationFrame(() => menu.setAttribute('data-open', ''));
      menu.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    } else {
      menu.removeAttribute('data-open');
      const finish = (): void => {
        if (!isOpen) menu.hidden = true;
      };
      menu.addEventListener('transitionend', finish, { once: true });
      window.setTimeout(finish, 500);
      lastFocused?.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(!isOpen));

  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen) return;
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (event.key !== 'Tab') return;

    // フォーカスをメニュー内に閉じ込める
    const focusables = [...menu.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (element) => element.offsetParent !== null,
    );
    if (focusables.length === 0) return;
    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const desktop = window.matchMedia('(min-width: 62em)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
