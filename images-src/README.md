# images-src

ChatGPT で生成した写真を、ここに **画像 ID と同じファイル名**で置いてください。

```
images-src/hero.png
images-src/sauna-interior.jpg
```

そのあと以下を実行すると、比率調整と WebP 変換を行って `src/assets/images/` に取り込みます。

```bash
npm run images:import          # すべて取り込む
npm run images:import hero     # ID を指定して取り込む
```

- 使用できる ID とプロンプトは `docs/chatgpt-image-prompts.md` を参照してください。
- このディレクトリの画像はビルドに含まれません（元データの置き場です）。
