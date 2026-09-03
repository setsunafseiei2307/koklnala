/**
 * astro.config.mjs の vite.define で注入されるビルド情報。
 * 公開後に配信中のコミットを meta タグから確認するために使う。
 */
declare const __BUILD_REF__: string;
declare const __BUILD_TIME__: string;
