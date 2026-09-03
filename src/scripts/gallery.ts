/**
 * ギャラリーの横スクロールとライトボックス。
 * ライトボックスは <dialog> を使い、フォーカストラップと Esc をブラウザに任せる。
 */

export function initGallery(): void {
  const root = document.querySelector<HTMLElement>('[data-gallery]');
  if (!root) return;

  const track = root.querySelector<HTMLElement>('[data-gallery-track]');
  const items = [...root.querySelectorAll<HTMLButtonElement>('[data-gallery-item]')];
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const stage = dialog?.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const caption = dialog?.querySelector<HTMLElement>('[data-lightbox-caption]');
  const counter = dialog?.querySelector<HTMLElement>('[data-lightbox-counter]');

  // --- 横スクロールの矢印ボタン ---
  if (track) {
    for (const button of root.querySelectorAll<HTMLButtonElement>('[data-gallery-nav]')) {
      button.addEventListener('click', () => {
        const direction = button.dataset.galleryNav === 'prev' ? -1 : 1;
        const step = Math.max(240, track.clientWidth * 0.6);
        track.scrollBy({ left: step * direction, behavior: 'smooth' });
      });
    }

    const updateNav = (): void => {
      const max = track.scrollWidth - track.clientWidth - 2;
      root.querySelector<HTMLButtonElement>('[data-gallery-nav="prev"]')?.toggleAttribute(
        'disabled',
        track.scrollLeft <= 2,
      );
      root.querySelector<HTMLButtonElement>('[data-gallery-nav="next"]')?.toggleAttribute(
        'disabled',
        track.scrollLeft >= max,
      );
    };
    track.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav, { passive: true });
    updateNav();
  }

  if (!dialog || !stage || !caption || !counter) return;

  let current = 0;

  const show = (index: number): void => {
    current = (index + items.length) % items.length;
    const item = items[current];
    const source = item?.querySelector('img');
    if (!item || !source) return;
    stage.src = source.currentSrc || source.src;
    stage.srcset = source.srcset;
    stage.sizes = '92vw';
    stage.alt = source.alt;
    caption.textContent = item.dataset.caption ?? '';
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  };

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      show(index);
      dialog.showModal();
    });
  });

  dialog.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-lightbox-close]') || target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(current - 1);
    }
  });

  for (const button of dialog.querySelectorAll<HTMLButtonElement>('[data-lightbox-nav]')) {
    button.addEventListener('click', () => {
      show(current + (button.dataset.lightboxNav === 'prev' ? -1 : 1));
    });
  }

  dialog.addEventListener('close', () => items[current]?.focus());
}
