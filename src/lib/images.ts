import type { ImageMetadata } from 'astro';
import type { ImageId } from '../data/images';

/**
 * src/assets/images 配下の実ファイルを id で引く。
 * astro:assets に渡すことで AVIF / WebP と srcset が自動生成される。
 */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*.webp', {
  eager: true,
});

export function imageSource(id: ImageId): ImageMetadata {
  const entry = files[`/src/assets/images/${id}.webp`];
  if (!entry) {
    throw new Error(
      `画像が見つかりません: src/assets/images/${id}.webp — npm run images:placeholders で生成できます`,
    );
  }
  return entry.default;
}
