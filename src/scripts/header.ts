/**
 * ヘッダーの状態管理。
 * - スクロール量に応じた背景の切り替えと読み込み進捗バー
 * - モバイル用フルスクリーンメニュー（フォーカストラップ / Esc / スクロールロック）
 *
 * ページ遷移（View Transitions）のたびに呼ばれるため、
 * window / document へのリスナーは一度だけ登録し、要素参照のみ差し替える。
 */

const SCROLLED_THRESHOLD = 40;
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

let header: HTMLElement | null = null;
let menu: HTMLElement | null = null;
let toggle: HTMLButtonElement | null = null;
let toggleLabel: HTMLElement | null = null;
let progress: HTMLElement | null = null;
let isOpen = false;
let lastFocused: HTMLElement | null = null;
let globalsBound = false;
let ticking = false;

export function initHeader(): void {
  header = document.querySelector<HTMLElement>('[data-header]');
  menu = document.querySelector<HTMLElement>('[data-menu]');
  toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  toggleLabel = document.querySelector<HTMLElement>('[data-menu-label]');
  progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!header) return;

  isOpen = false;
  document.documentElement.classList.remove('is-locked');
  updateScrollState();

  toggle?.addEventListener('click', () => setOpen(!isOpen));
  menu?.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  if (globalsBound) return;
  globalsBound = true;

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  document.addEventListener('keydown', onKeydown);
  window.matchMedia('(min-width: 62em)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

function requestScrollUpdate(): void {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateScrollState);
}

function updateScrollState(): void {
  ticking = false;
  if (!header) return;
  const y = window.scrollY;
  header.dataset.state = y > SCROLLED_THRESHOLD ? 'scrolled' : '';
  if (progress) {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, y / scrollable) : 0;
    progress.style.setProperty('--progress', `${(ratio * 100).toFixed(2)}%`);
  }
}

function setOpen(open: boolean): void {
  if (!menu || !toggle || !header || open === isOpen) return;
  isOpen = open;
  toggle.setAttribute('aria-expanded', String(open));
  document.documentElement.classList.toggle('is-locked', open);
  header.toggleAttribute('data-menu-open', open);
  if (toggleLabel) toggleLabel.textContent = open ? 'CLOSE' : 'MENU';

  if (open) {
    lastFocused = document.activeElement as HTMLElement | null;
    menu.hidden = false;
    const element = menu;
    requestAnimationFrame(() => element.setAttribute('data-open', ''));
    menu.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return;
  }

  menu.removeAttribute('data-open');
  const element = menu;
  const finish = (): void => {
    if (!isOpen) element.hidden = true;
  };
  element.addEventListener('transitionend', finish, { once: true });
  window.setTimeout(finish, 500);
  lastFocused?.focus();
}

function onKeydown(event: KeyboardEvent): void {
  if (!isOpen || !menu) return;
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
}
