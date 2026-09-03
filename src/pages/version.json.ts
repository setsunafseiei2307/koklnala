/**
 * 配信中のビルドを確認するためのエンドポイント。
 *
 *   https://<公開URL>/version.json
 *
 * ページソースを開かなくても、スマートフォンのブラウザで URL を開くだけで
 * 「いまどのコミットが配信されているか」を確認できる。
 */
export const prerender = true;

export function GET() {
  const body = {
    name: 'EMBER & MOSS',
    ref: __BUILD_REF__,
    builtAt: __BUILD_TIME__,
  };

  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
