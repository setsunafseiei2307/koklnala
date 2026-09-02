# IMAGE PRODUCTION — EMBER & MOSS

> サイト全体を「1 本のブランド撮影」として設計した画像アセット仕様書。ChatGPT の画像生成で制作し、`src/assets/images/<id>.webp` に配置します。
>
> このファイルは `node scripts/build-image-docs.mjs` で自動生成されます。編集する場合は `src/data/image-briefs.ts` を更新してください。

## 共通アートディレクション

```
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.
```

## 全カット共通の禁止事項

```
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion.
```

## 制作フェーズ

HERO を最初に確定させ、そのトーンに残りを合わせます。

- **PHASE 1** … hero, forest-villa-exterior, forest-villa-interior, stone-villa-exterior, mist-villa-exterior, sauna-interior
- **PHASE 2** … stone-villa-interior, mist-villa-interior, sauna-stove, cold-bath, outdoor-rest, dinner, breakfast, bonfire, bath, night-exterior
- **PHASE 3** … forest-morning, architecture-detail, tea-detail, og-image

---

## 01. hero.webp

| 項目 | 内容 |
| --- | --- |
| ID | `hero` |
| ファイル | `src/assets/images/hero.webp` |
| 使用ページ | TOP |
| 使用セクション | 01 HERO（全画面） |
| 役割 | サイト全体のトーンを決める最重要カット。この 1 枚で「高級・静けさ・森・建築・火」を伝える |
| アスペクト比 | 16:9 |
| 推奨生成サイズ | 2560 × 1440px |
| 重要度 | PHASE 1（priority 1） |
| PC トリミング | 16:9 全画面。建物は右 1/3、コピーは左に載る |
| スマホ トリミング | 9:16 に切っても建物と窓の灯りが残るよう、被写体を中央右寄り・上下中央に置く |
| alt（既定） | 夕暮れの森に建つヴィラ。室内の暖色の光が大きな窓から漏れている。 |

**被写体**：A single-storey contemporary Japanese villa standing on a slope in a dense forest, seen from slightly below and to the left, at dusk.

**環境**：Deep mixed forest of tall beech and fir. Thin fog drifting between the trunks. Wet ground, moss and fallen leaves. No other buildings, no roads, no cars.

**構図**：Place the villa in the RIGHT third of the frame, its glowing windows around 65% from the left edge and 55% from the top. Keep the LEFT 45% of the frame as dark, quiet negative space — layered tree trunks and fog — so large headline type can sit there. Horizon low. Generous empty sky-fog area in the upper left. Nothing important in the outer 8% of any edge.

**カメラ**：Full-frame, 35mm lens, eye level from about 12 metres away, camera slightly below the deck line looking gently up at the building.

**光**：Blue hour, 15 minutes after sunset. Exterior light is cold blue-green and very soft. Interior is lit only by warm 2400K lamps, spilling through the glass onto the deck. Strong but natural contrast between cold outside and warm inside. No artificial light on the trees.

**素材・色**：Charred cedar cladding, warm cedar soffit visible through the glass, andesite stone base, thin steel deck edge. Colours limited to deep green-black, cold slate blue, and a single warm amber accent from the windows.

**空気感**：Silent, cold air, one warm room in the middle of a dark forest. Expensive but understated.

**このカットで特に避けること**：no visible doors left open, no interior people silhouettes, no glowing outdoor spotlights, no snow, no bright sky

**生成後のチェック**：
- 左 40% にコピーを置ける暗部があるか
- 窓の光が白飛びしていないか（2400K の暖色が残っているか）
- 柱・窓枠・屋根のラインが歪んでいないか
- 9:16 にトリミングしても建物が切れないか

## 02. forest-villa-exterior.webp

| 項目 | 内容 |
| --- | --- |
| ID | `forest-villa-exterior` |
| ファイル | `src/assets/images/forest-villa-exterior.webp` |
| 使用ページ | TOP / STAY / STAY 詳細 |
| 使用セクション | 03 STAY・客室紹介 |
| 役割 | FOREST VILLA の外観。樹冠の高さに床がある構造を伝える |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 1（priority 1） |
| PC トリミング | 4:3 で使用（VillaRow） |
| スマホ トリミング | 4:3 のまま全幅。建物が中央に来る構図 |
| alt（既定） | 森の斜面から張り出したフォレストヴィラの外観。 |

**被写体**：A timber villa cantilevered out from a forest slope, its floor level about four metres above the ground, with a wide deck facing the treetops.

**環境**：Beech and fir canopy at the same height as the deck. Light fog below the building. Late afternoon.

**構図**：Three-quarter view from the side, building occupying the left two-thirds, canopy and fog on the right. Show the structure under the deck so the height reads clearly.

**カメラ**：Full-frame, 50mm, from a facing slope at deck height, about 20 metres away.

**光**：Overcast diffused daylight, very soft shadows. A faint warm glow inside the glass.

**素材・色**：Cedar boards, black steel columns, glass. Green, grey-brown, and desaturated amber.

**空気感**：Weightless, quiet, precise carpentry.

**このカットで特に避けること**：no railing clutter, no outdoor furniture sets, no umbrellas, no bright green over-saturated leaves

**生成後のチェック**：
- 床が地面から浮いていることが分かるか
- 柱の本数と間隔が構造的に自然か
- デッキの水平が出ているか

## 03. forest-villa-interior.webp

| 項目 | 内容 |
| --- | --- |
| ID | `forest-villa-interior` |
| ファイル | `src/assets/images/forest-villa-interior.webp` |
| 使用ページ | STAY 詳細 |
| 使用セクション | INTERIOR & PLAN |
| 役割 | FOREST VILLA の室内。無垢材と土壁、窓外の森 |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 1（priority 2） |
| PC トリミング | 4:3 |
| スマホ トリミング | 4:3 全幅 |
| alt（既定） | フォレストヴィラの室内。無垢材の床と土壁、窓の外の森。 |

**被写体**：The interior of a small timber villa: low bed on the left, a long window seat, a full-height window filling the right wall with forest beyond.

**環境**：Forest canopy fills the window. Slight fog outside.

**構図**：One-point perspective from the doorway, window on the right, ceiling line visible. Leave the lower-left area calm.

**カメラ**：Full-frame, 24mm, tripod at 1.2 metres, perfectly level to keep verticals straight.

**光**：Daylight from the window as the main source, warm 2700K lamp in the far corner. No ceiling downlights visible.

**素材・色**：Solid cedar floor, lime plaster walls, linen and wool bedding, a low walnut table.

**空気感**：Warm, sparse, lived-in but immaculate.

**このカットで特に避けること**：no TV, no artwork on walls, no patterned textiles, no clutter on surfaces, no visible power outlets

**生成後のチェック**：
- 垂直線が倒れていないか
- 家具が床に接地しているか
- 窓の外の森がボケすぎていないか

## 04. stone-villa-exterior.webp

| 項目 | 内容 |
| --- | --- |
| ID | `stone-villa-exterior` |
| ファイル | `src/assets/images/stone-villa-exterior.webp` |
| 使用ページ | TOP / STAY / STAY 詳細 |
| 使用セクション | 03 STAY・客室紹介 |
| 役割 | STONE VILLA の外観。重さと蓄熱を感じさせる |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 1（priority 1） |
| PC トリミング | 4:3 |
| スマホ トリミング | 4:3 全幅 |
| alt（既定） | ストーンヴィラの外観。安山岩の壁と深い軒。 |

**被写体**：A low, heavy villa built from rough andesite stone walls with a deep overhanging roof and a stone-paved terrace.

**環境**：A clearing at the edge of the forest, valley visible behind. Morning after rain, stone still wet.

**構図**：Frontal but slightly off-axis view. Building fills the lower two-thirds; roof line cuts the frame horizontally. Terrace leads the eye in from the bottom left.

**カメラ**：Full-frame, 35mm, standing height, 15 metres away.

**光**：Flat overcast light. No hard shadows. Subtle warm light under the eaves.

**素材・色**：Split andesite, dark timber beams, copper gutter, wet stone paving.

**空気感**：Solid, grounded, thermal mass you can feel.

**このカットで特に避けること**：no dry-stone garden clichés, no lanterns, no bonsai, no decorative rocks arranged in a circle

**生成後のチェック**：
- 石積みの目地が不自然に繰り返していないか
- 軒の出が構造的に成立しているか
- 濡れた石の質感が出ているか

## 05. stone-villa-interior.webp

| 項目 | 内容 |
| --- | --- |
| ID | `stone-villa-interior` |
| ファイル | `src/assets/images/stone-villa-interior.webp` |
| 使用ページ | STAY 詳細 |
| 使用セクション | INTERIOR & PLAN |
| 役割 | STONE VILLA の室内。土間と薪ストーブ、4.2m の天井 |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 2（priority 2） |
| PC トリミング | 4:3 |
| スマホ トリミング | 4:3 全幅 |
| alt（既定） | ストーンヴィラの室内。石壁と土間、中央の薪ストーブ。 |

**被写体**：A tall interior with rough stone walls, a polished earthen floor (doma), and a black wood-burning stove standing in the centre with a straight flue rising to the ceiling.

**環境**：Winter afternoon, one high clerestory window letting in a shaft of pale light.

**構図**：Wide view from a corner, stove slightly left of centre, seating low around it. Ceiling height clearly visible.

**カメラ**：Full-frame, 24mm, tripod at 1.3 metres, level.

**光**：Cool daylight from above, warm firelight from the stove door. Two light temperatures in one frame.

**素材・色**：Stone, tataki earth floor, cast iron, linen, stacked firewood along one wall.

**空気感**：Heavy, warm, quiet. Like a small chapel with a fire in it.

**このカットで特に避けること**：no large flames outside the stove, no sparks, no smoke inside the room, no rugs with patterns

**生成後のチェック**：
- 煙突がまっすぐ天井へ抜けているか
- 火が不自然に明るすぎないか
- 天井の高さが伝わるか

## 06. mist-villa-exterior.webp

| 項目 | 内容 |
| --- | --- |
| ID | `mist-villa-exterior` |
| ファイル | `src/assets/images/mist-villa-exterior.webp` |
| 使用ページ | TOP / STAY / STAY 詳細 |
| 使用セクション | 03 STAY・客室紹介 |
| 役割 | MIST VILLA の外観。尾根の先端と朝霧 |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 1（priority 1） |
| PC トリミング | 4:3 |
| スマホ トリミング | 4:3 全幅 |
| alt（既定） | 朝霧のなかのミストヴィラ外観。尾根の先端に建つ低い建築。 |

**被写体**：A very low, wide villa at the tip of a ridge, almost dissolving into morning fog, with a cantilevered terrace over the valley.

**環境**：Thick morning fog, valley invisible below, a few dark treetops emerging.

**構図**：Building placed low in the frame and slightly right; upper half of the frame is fog and empty air. High-key overall, unlike the other exteriors.

**カメラ**：Full-frame, 85mm from a facing ridge, compressed perspective.

**光**：Flat white fog light, no direction, very low contrast. One faint warm window.

**素材・色**：Grey timber, glass, thin steel. Almost monochrome, silver-green.

**空気感**：Weightless, disappearing, silent.

**このカットで特に避けること**：no dramatic sun rays, no deep blacks, no birds, no visible ground beneath the terrace

**生成後のチェック**：
- 白飛びせず霧の階調が残っているか
- 建物の輪郭が霧に溶けつつ判別できるか
- 他 2 棟と作風が揃っているか

## 07. mist-villa-interior.webp

| 項目 | 内容 |
| --- | --- |
| ID | `mist-villa-interior` |
| ファイル | `src/assets/images/mist-villa-interior.webp` |
| 使用ページ | STAY 詳細 |
| 使用セクション | INTERIOR & PLAN |
| 役割 | MIST VILLA の室内。三方の窓と低いベッド |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 2（priority 2） |
| PC トリミング | 4:3 |
| スマホ トリミング | 4:3 全幅 |
| alt（既定） | ミストヴィラの室内。三方の窓と低いベッド、霧に沈む谷。 |

**被写体**：A small bedroom-living space with windows on three sides, a low platform bed facing the view, and nothing else but a stool and a lamp.

**環境**：Fog pressing against the glass on all sides. Early morning.

**構図**：Symmetrical view from the entrance, bed centred, windows filling the frame edges.

**カメラ**：Full-frame, 28mm, tripod at 1.1 metres, level.

**光**：Soft white light from the fog outside; a single warm reading lamp at low intensity.

**素材・色**：Pale oak floor, white plaster, grey linen bedding, wool throw.

**空気感**：Empty in the best sense. Nothing to look at but weather.

**このカットで特に避けること**：no bright interior lights, no cushions in rows, no curtains, no mirror

**生成後のチェック**：
- 左右の窓が対称に破綻していないか
- ベッドの寸法が現実的か
- 露出が明るすぎないか

## 08. sauna-interior.webp

| 項目 | 内容 |
| --- | --- |
| ID | `sauna-interior` |
| ファイル | `src/assets/images/sauna-interior.webp` |
| 使用ページ | TOP / SAUNA |
| 使用セクション | 04 PRIVATE SAUNA |
| 役割 | サウナ体験の中心カット。木の質感と間接照明 |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 1（priority 1） |
| PC トリミング | 4:5 / 3:2 の両方で使うため上下に余裕を持たせる |
| スマホ トリミング | 4:5 全幅 |
| alt（既定） | 天然木のプライベートサウナ。間接照明のみの静かな室内。 |

**被写体**：The inside of a small private sauna: two levels of solid aspen benches, a stove with stacked stones on the right, and a narrow window looking into dark forest.

**環境**：Steam still in the air after a löyly. No people.

**構図**：Diagonal view along the benches, stove in the right third, window in the upper left providing a cool counter-light. Leave the upper-left area open for type.

**カメラ**：Full-frame, 24mm, camera low at bench height, level.

**光**：One hidden warm LED strip under the upper bench, plus faint cool daylight from the window. Deep shadows are fine.

**素材・色**：Aspen and thermo-treated pine, dark stones, a wooden ladle and bucket, one linen towel folded.

**空気感**：Hot, dim, private. You can feel the air is heavy.

**このカットで特に避けること**：no people, no towels hanging randomly, no thermometer with readable numbers, no plastic buckets, no visible flames

**生成後のチェック**：
- ベンチの段板が平行か
- 木目が繰り返しパターンになっていないか
- 湯気が不自然な白い塊になっていないか

## 09. sauna-stove.webp

| 項目 | 内容 |
| --- | --- |
| ID | `sauna-stove` |
| ファイル | `src/assets/images/sauna-stove.webp` |
| 使用ページ | SAUNA / GALLERY |
| 使用セクション | THE RITUAL |
| 役割 | ロウリュの瞬間を示すディテール |
| アスペクト比 | 2:3 |
| 推奨生成サイズ | 1400 × 2100px |
| 重要度 | PHASE 2（priority 2） |
| PC トリミング | 3:4 縦 |
| スマホ トリミング | 3:4 縦・全幅 |
| alt（既定） | サウナストーブに積まれた石と、木の柄杓。 |

**被写体**：Close view of a sauna stove: dark volcanic stones stacked high, a wooden ladle resting on the rim, water just poured, thin steam rising.

**環境**：Dim sauna interior behind, out of focus.

**構図**：Vertical framing, stove filling the lower two-thirds, steam rising into the empty upper third.

**カメラ**：Full-frame, 85mm macro-ish, shallow depth of field, from slightly above.

**光**：Single warm light from the left, deep falloff to the right.

**素材・色**：Basalt stones, cast iron, cedar ladle, water droplets.

**空気感**：Intense heat in a small area.

**このカットで特に避けること**：no visible fire, no thick fog covering everything, no hands, no steam that looks like smoke

**生成後のチェック**：
- 石の積み方が自然か
- 湯気が細く立ち上がっているか
- 柄杓の柄が折れて見えないか

## 10. cold-bath.webp

| 項目 | 内容 |
| --- | --- |
| ID | `cold-bath` |
| ファイル | `src/assets/images/cold-bath.webp` |
| 使用ページ | SAUNA / GALLERY |
| 使用セクション | WATER & AIR |
| 役割 | 水風呂。冷たさと透明度を伝える |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 2（priority 2） |
| PC トリミング | 3:2 |
| スマホ トリミング | 3:2 全幅 |
| alt（既定） | 石造りの水風呂。朝の光が水面に落ちている。 |

**被写体**：A rectangular cold plunge bath cut from stone, filled to the brim with clear water, overflowing gently at one edge, set on an outdoor terrace.

**環境**：Forest floor and moss around it, morning fog, wet stone.

**構図**：Slightly overhead three-quarter view. Water surface occupies the centre; reflections of trees visible.

**カメラ**：Full-frame, 35mm, from standing height looking down at about 40 degrees.

**光**：Cool overcast morning light. No sun. Reflections are soft.

**素材・色**：Grey stone, clear water, moss, a copper spout.

**空気感**：Cold, clean, still.

**このカットで特に避けること**：no bubbles or jets, no pool tiles, no chlorine-blue water, no towels or slippers left around

**生成後のチェック**：
- 水面が水平か
- 水の透明度が出ているか
- 縁のオーバーフローが自然か

## 11. outdoor-rest.webp

| 項目 | 内容 |
| --- | --- |
| ID | `outdoor-rest` |
| ファイル | `src/assets/images/outdoor-rest.webp` |
| 使用ページ | SAUNA / GALLERY |
| 使用セクション | WATER & AIR |
| 役割 | 外気浴。休むための場所 |
| アスペクト比 | 2:3 |
| 推奨生成サイズ | 1400 × 2100px |
| 重要度 | PHASE 2（priority 2） |
| PC トリミング | 3:4 縦 |
| スマホ トリミング | 3:4 縦 |
| alt（既定） | 森のなかの外気浴スペース。木のチェアとブランケット。 |

**被写体**：Two simple wooden reclining chairs on a timber deck at the edge of the forest, a folded wool blanket on one of them.

**環境**：Fog between the trees, wet deck boards, late afternoon.

**構図**：Vertical framing, chairs in the lower half seen from the side, forest filling the upper half.

**カメラ**：Full-frame, 50mm, standing height, 4 metres away.

**光**：Soft overcast light, slightly cool.

**素材・色**：Oiled cedar, wool, steel screws visible.

**空気感**：Empty chairs waiting. Cool air on skin.

**このカットで特に避けること**：no cushions with logos, no side tables with drinks, no people, no sun loungers with resort styling

**生成後のチェック**：
- チェアの脚が床に接地しているか
- 2 脚の形が同一に破綻していないか
- 奥行きが出ているか

## 12. dinner.webp

| 項目 | 内容 |
| --- | --- |
| ID | `dinner` |
| ファイル | `src/assets/images/dinner.webp` |
| 使用ページ | TOP / EXPERIENCE |
| 使用セクション | 05 EXPERIENCE / DINNER |
| 役割 | 夕食。派手さより火の入り方で見せる |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 2（priority 1） |
| PC トリミング | 4:3 |
| スマホ トリミング | 4:3 全幅 |
| alt（既定） | 炭火で仕上げた夕食の一皿。落ち着いた器と余白のある盛り付け。 |

**被写体**：One main course on a matte ceramic plate: a piece of fish or game finished over charcoal, a dark reduction, one seasonal vegetable. Restrained plating with generous empty space on the plate.

**環境**：A dark walnut dining table, one linen napkin, a single glass of water. Background falls into darkness.

**構図**：Three-quarter view from about 35 degrees, plate slightly right of centre, plenty of dark table in the foreground.

**カメラ**：Full-frame, 50mm, shallow but controlled depth of field (f/2.8).

**光**：One soft window light from the left rear, deep shadows on the right. No fill.

**素材・色**：Matte grey-green glaze, charcoal marks, dark sauce, natural food texture.

**空気感**：Quiet, precise, seasonal. Not showy.

**このカットで特に避けること**：no caviar or gold leaf, no tweezers-perfect microgreens scattered, no multiple dishes crowding the frame, no steam added artificially, no melting or deformed food shapes, no extra cutlery

**生成後のチェック**：
- 料理の形が破綻していないか
- 器の縁が歪んでいないか
- 皿の余白が残っているか

## 13. breakfast.webp

| 項目 | 内容 |
| --- | --- |
| ID | `breakfast` |
| ファイル | `src/assets/images/breakfast.webp` |
| 使用ページ | EXPERIENCE |
| 使用セクション | BREAKFAST |
| 役割 | 和朝食。土鍋の存在感 |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 2（priority 2） |
| PC トリミング | 16:10 |
| スマホ トリミング | 16:10 全幅 |
| alt（既定） | 和朝食の膳。土鍋のごはんと汁物、焼き魚。 |

**被写体**：A Japanese breakfast tray: a small donabe clay pot of rice with the lid slightly open and steam rising, a bowl of miso soup, a grilled fish, three small side dishes, pickles.

**環境**：A cedar table by a window with morning forest light. Simple ceramic and lacquer.

**構図**：Slightly overhead (about 55 degrees), tray filling most of the frame, window light from the left.

**カメラ**：Full-frame, 50mm, f/4 so all dishes stay readable.

**光**：Soft morning daylight, cool white, no artificial light.

**素材・色**：Clay, lacquer, unglazed ceramic, linen cloth.

**空気感**：Clean, calm, everyday but well made.

**このカットで特に避けること**：no plastic wrap, no chopstick rests shaped like animals, no crowded table, no duplicated bowls, no unreadable mush

**生成後のチェック**：
- 器の数と配置が自然か
- 土鍋の湯気が過剰でないか
- 魚の形が自然か

## 14. bonfire.webp

| 項目 | 内容 |
| --- | --- |
| ID | `bonfire` |
| ファイル | `src/assets/images/bonfire.webp` |
| 使用ページ | TOP / EXPERIENCE |
| 使用セクション | BONFIRE |
| 役割 | 夜の焚き火。暖色の主役カット |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 2（priority 1） |
| PC トリミング | 3:4 / 4:3 両方で使用 |
| スマホ トリミング | 3:4 縦 |
| alt（既定） | 夜のテラスの焚き火。背後にヴィラの灯りと森。 |

**被写体**：A small controlled fire in a low steel fire pit on a stone terrace, logs arranged carefully, one wool blanket over a nearby chair.

**環境**：Night. The villa behind, its windows dimly lit. Dark forest beyond.

**構図**：Fire in the lower right third, villa windows small in the upper left, most of the frame is darkness.

**カメラ**：Full-frame, 35mm, low angle at 0.8 metres, 5 metres away, long exposure feel.

**光**：Only the fire and two warm interior windows. Everything else falls to near black.

**素材・色**：Steel, split hardwood, embers, stone paving.

**空気感**：Late, warm, nearly silent.

**このカットで特に避けること**：no huge bonfire, no sparks flying everywhere, no people, no marshmallows, no fake orange glow on the whole scene

**生成後のチェック**：
- 炎の形が自然か（CG 的でないか）
- 暗部が潰れきっていないか
- 薪の積み方が現実的か

## 15. forest-morning.webp

| 項目 | 内容 |
| --- | --- |
| ID | `forest-morning` |
| ファイル | `src/assets/images/forest-morning.webp` |
| 使用ページ | EXPERIENCE / ACCESS / GALLERY |
| 使用セクション | FOREST WALK / LOCATION |
| 役割 | 森そのもの。ブランドの背景 |
| アスペクト比 | 2:3 |
| 推奨生成サイズ | 1400 × 2100px |
| 重要度 | PHASE 3（priority 2） |
| PC トリミング | 3:4 縦 |
| スマホ トリミング | 3:4 縦 |
| alt（既定） | 朝霧のなかの静かな森。 |

**被写体**：A narrow path through a foggy forest of tall straight trunks, moss covering the ground.

**環境**：Early morning, heavy fog, no wind, wet leaves.

**構図**：Vertical framing, path entering from the bottom centre and disappearing into fog at the upper third.

**カメラ**：Full-frame, 50mm, eye level, standing on the path.

**光**：Flat white fog light. Very low contrast, almost monochrome green-grey.

**素材・色**：Bark, moss, wet earth.

**空気感**：Cold air, no sound.

**このカットで特に避けること**：no sun rays through trees, no animals, no flowers, no fallen logs arranged decoratively

**生成後のチェック**：
- 幹の間隔が自然か
- 霧の奥行きが段階的に出ているか
- 緑が過飽和でないか

## 16. architecture-detail.webp

| 項目 | 内容 |
| --- | --- |
| ID | `architecture-detail` |
| ファイル | `src/assets/images/architecture-detail.webp` |
| 使用ページ | TOP / GALLERY |
| 使用セクション | INTRODUCTION |
| 役割 | 素材のディテール。ブランドの手触り |
| アスペクト比 | 1:1 |
| 推奨生成サイズ | 1400 × 1400px |
| 重要度 | PHASE 3（priority 3） |
| PC トリミング | 1:1 / 4:5 |
| スマホ トリミング | 1:1 |
| alt（既定） | 焼き杉と石の取り合いに落ちる光。 |

**被写体**：A close detail where charred cedar cladding meets rough stone, with a thin shadow gap between the two materials.

**環境**：Exterior wall, side light, no context needed.

**構図**：Square framing, the joint running diagonally from lower left to upper right.

**カメラ**：Full-frame, 85mm, perpendicular to the wall, shallow depth of field.

**光**：Low raking light from the left revealing texture.

**素材・色**：Yakisugi charcoal texture, andesite grain, a thin bronze flashing.

**空気感**：Craft, precision, weathering.

**このカットで特に避けること**：no visible screws in rows, no repeating tile pattern, no moss added artificially

**生成後のチェック**：
- 質感が二種類はっきり分かれているか
- 目地が一直線に整いすぎていないか

## 17. tea-detail.webp

| 項目 | 内容 |
| --- | --- |
| ID | `tea-detail` |
| ファイル | `src/assets/images/tea-detail.webp` |
| 使用ページ | GALLERY / STAY |
| 使用セクション | GALLERY |
| 役割 | 客室の小物。生活の温度 |
| アスペクト比 | 1:1 |
| 推奨生成サイズ | 1400 × 1400px |
| 重要度 | PHASE 3（priority 3） |
| PC トリミング | 1:1 |
| スマホ トリミング | 1:1 |
| alt（既定） | 客室の茶器。鉄瓶と湯呑み、木のトレー。 |

**被写体**：A cast-iron kettle and two small unglazed cups on a wooden tray, placed on a low table by a window.

**環境**：Interior, afternoon, forest visible but out of focus behind.

**構図**：Square framing, tray slightly off-centre to the left, empty table space on the right.

**カメラ**：Full-frame, 85mm, from 45 degrees above, f/2.8.

**光**：Soft window light from the right, gentle shadow to the left.

**素材・色**：Cast iron, unglazed clay, oak tray, linen cloth.

**空気感**：Still life, warm, used.

**このカットで特に避けること**：no steam, no tea bags, no branded packaging, no perfectly symmetrical arrangement

**生成後のチェック**：
- 器の口が真円に破綻していないか
- 影の向きが一致しているか

## 18. bath.webp

| 項目 | 内容 |
| --- | --- |
| ID | `bath` |
| ファイル | `src/assets/images/bath.webp` |
| 使用ページ | STAY / GALLERY |
| 使用セクション | GALLERY |
| 役割 | 露天風呂。湯気と森 |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 2（priority 2） |
| PC トリミング | 3:2 |
| スマホ トリミング | 3:2 全幅 |
| alt（既定） | 森に面した露天風呂。湯気と樹木のシルエット。 |

**被写体**：An outdoor bath made of hinoki wood or stone, filled to the edge, steam rising, opening directly onto the forest with no fence.

**環境**：Dusk, cold air, fog between the trees.

**構図**：Horizontal, bath in the lower half seen from the side, forest filling the upper half. Water edge parallel to the frame.

**カメラ**：Full-frame, 35mm, from 1.4 metres, 3 metres away.

**光**：Fading daylight plus one warm lamp low on the wall behind. Steam catches the warm light.

**素材・色**：Hinoki or stone, copper spout, wet decking.

**空気感**：Hot water in cold air.

**このカットで特に避けること**：no people, no bath toys, no towels draped over the edge, no jacuzzi jets, no blue pool lighting

**生成後のチェック**：
- 湯気が過剰でないか
- 水面の水平が出ているか
- 木や石の濡れ方が自然か

## 19. night-exterior.webp

| 項目 | 内容 |
| --- | --- |
| ID | `night-exterior` |
| ファイル | `src/assets/images/night-exterior.webp` |
| 使用ページ | FINAL CTA / GALLERY |
| 使用セクション | FINAL CTA 背景 |
| 役割 | 締めの CTA 背景。暗部にテキストを載せる |
| アスペクト比 | 3:2 |
| 推奨生成サイズ | 1920 × 1280px |
| 重要度 | PHASE 2（priority 2） |
| PC トリミング | 16:9 / 3:2、左側に文字が載る |
| スマホ トリミング | 3:2 全幅（左に文字） |
| alt（既定） | 夜のヴィラ外観。窓から漏れる暖色の光と暗い森。 |

**被写体**：The villa seen from the forest at night, warm windows glowing, the deck faintly lit.

**環境**：Full darkness, fog, wet ground reflecting a little light.

**構図**：Building in the RIGHT half, small in the frame. LEFT half is dark forest — reserved for headline and buttons. Wide horizontal.

**カメラ**：Full-frame, 35mm, tripod, long exposure, eye level, 25 metres away.

**光**：Only interior lamps and one low deck light. Deep shadows, no moonlight beams.

**素材・色**：Charred timber, glass, wet stone.

**空気感**：Someone is inside. Everything else is asleep.

**このカットで特に避けること**：no star trails, no light painting, no visible interior details, no cars

**生成後のチェック**：
- 左半分が十分暗いか
- 窓の光が滲みすぎていないか
- 手前の地面が真っ黒に潰れていないか

## 20. og-image.webp

| 項目 | 内容 |
| --- | --- |
| ID | `og-image` |
| ファイル | `src/assets/images/og-image.webp` |
| 使用ページ | OGP |
| 使用セクション | SNS シェア |
| 役割 | SNS シェア時のサムネイル下地（この上にブランド名を合成する） |
| アスペクト比 | 1200:630 |
| 推奨生成サイズ | 1200 × 630px |
| 重要度 | PHASE 3（priority 3） |
| PC トリミング | 1.91:1（1200 × 630） |
| スマホ トリミング | 同上 |
| alt（既定） | EMBER & MOSS のシェア用画像。 |

**被写体**：The villa at blue hour from a middle distance, similar to the hero but wider and calmer.

**環境**：Forest, fog, dusk.

**構図**：Building in the right third, large dark area on the left and bottom for the logo, tagline and caption to be composited later.

**カメラ**：Full-frame, 35mm, eye level.

**光**：Blue hour, warm windows.

**素材・色**：Same palette as the hero image.

**空気感**：A quieter version of the hero.

**このカットで特に避けること**：no text (it is added programmatically), no busy foreground

**生成後のチェック**：
- 左と下にロゴ・コピーを置ける暗部があるか
- hero と色調が揃っているか

---

## 採点基準（1 枚 100 点）

| 観点 | 配点 | 見るところ |
| --- | ---: | --- |
| Photorealism | 25 | 実写に見えるか。CG / 3D 感がないか |
| Composition | 20 | Web で使える構図か。文字を置く余白があるか |
| Brand Fit | 20 | 他カットと色・素材・照明が揃っているか |
| Web Usability | 15 | PC / スマホ両方でトリミングできるか |
| Technical Integrity | 10 | 建築・家具・器の破綻がないか |
| Luxury Impression | 10 | 20〜30 万円規模の案件で使える品位か |

- **85 点以上** … PASS（そのまま採用）
- **70 – 84 点** … FIX（用途変更、またはトリミングで対応）
- **69 点以下** … REGENERATE（原因を特定してプロンプトを修正）

HERO は 90 点未満なら原則として再生成します。
