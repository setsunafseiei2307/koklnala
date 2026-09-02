/**
 * スクロール出現アニメーション（ライブラリ非依存）。
 *
 * IntersectionObserver は clip-path で潰れている要素を「交差していない」と
 * 判定するため（マスク演出と相性が悪い）、rAF で間引いた位置判定で処理する。
 * 監視対象は表示済みのものから順に外れていくので、走査コストは下がっていく。
 */

const SELECTOR = '[data-reveal], [data-reveal-mask]';
/** ビューポート下端から何割の位置で出現させるか */
const TRIGGER_RATIO = 0.92;

export function initReveal(): void {
  let pending = [...document.querySelectorAll<HTMLElement>(SELECTOR)];
  if (pending.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (const element of pending) markVisible(element);
    return;
  }

  let ticking = false;

  const sweep = (): void => {
    const line = window.innerHeight * TRIGGER_RATIO;
    const remaining: HTMLElement[] = [];
    for (const element of pending) {
      if (element.getBoundingClientRect().top < line) markVisible(element);
      else remaining.push(element);
    }
    pending = remaining;
    ticking = false;
    if (pending.length === 0) {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    }
  };

  function request(): void {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(sweep);
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  sweep();
}

function markVisible(element: HTMLElement): void {
  if (element.hasAttribute('data-reveal')) element.setAttribute('data-reveal', 'is-in');
  if (element.hasAttribute('data-reveal-mask')) element.setAttribute('data-reveal-mask', 'is-in');
}
