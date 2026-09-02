/**
 * Node から src/ の TypeScript を直接読むための解決フック。
 * ソース側は拡張子なしの import（Vite / Astro 準拠）のため、.ts を補って解決する。
 *   node --import ./scripts/ts-resolve.mjs <script>
 */
import { registerHooks } from 'node:module';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && path.extname(specifier) === '') {
      const base = context.parentURL ? path.dirname(fileURLToPath(context.parentURL)) : process.cwd();
      for (const candidate of [`${specifier}.ts`, `${specifier}/index.ts`]) {
        const resolved = path.resolve(base, candidate);
        if (existsSync(resolved)) return { url: pathToFileURL(resolved).href, shortCircuit: true };
      }
    }
    return nextResolve(specifier, context);
  },
});
