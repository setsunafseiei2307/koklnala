# CHATGPT IMAGE PROMPTS — EMBER & MOSS

> ChatGPT の画像生成へそのままコピーして使えるプロンプト集です。PHASE 1 → 2 → 3 の順に進め、HERO を基準にトーンを揃えてください。
>
> このファイルは `node scripts/build-image-docs.mjs` で自動生成されます。編集する場合は `src/data/image-briefs.ts` を更新してください。

## 使い方

1. PHASE 1 の `hero` から生成します。納得のいく 1 枚が出るまで、ここは繰り返してください。
2. 採用した HERO を次の生成に添付し、「この写真と同じ色・光・空気感で」と添えると全体が揃います。
3. 生成した画像は `images-src/<id>.png`（または .jpg）として保存し、`npm run images:import` を実行すると、比率調整と WebP 変換が行われ `src/assets/images/<id>.webp` に入ります。
4. 差し替え後に `npm run build` を実行すれば、AVIF / WebP と srcset が再生成されます。


---

# PHASE 1

## IMAGE — hero

**File**: `hero.webp`
**Usage**: TOP / 01 HERO（全画面）
**Aspect Ratio**: 16:9（2560 × 1440px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A single-storey contemporary Japanese villa standing on a slope in a dense forest, seen from slightly below and to the left, at dusk.

ENVIRONMENT
Deep mixed forest of tall beech and fir. Thin fog drifting between the trunks. Wet ground, moss and fallen leaves. No other buildings, no roads, no cars.

COMPOSITION
Place the villa in the RIGHT third of the frame, its glowing windows around 65% from the left edge and 55% from the top. Keep the LEFT 45% of the frame as dark, quiet negative space — layered tree trunks and fog — so large headline type can sit there. Horizon low. Generous empty sky-fog area in the upper left. Nothing important in the outer 8% of any edge.

CAMERA
Full-frame, 35mm lens, eye level from about 12 metres away, camera slightly below the deck line looking gently up at the building.

LIGHTING
Blue hour, 15 minutes after sunset. Exterior light is cold blue-green and very soft. Interior is lit only by warm 2400K lamps, spilling through the glass onto the deck. Strong but natural contrast between cold outside and warm inside. No artificial light on the trees.

MATERIAL & COLOR
Charred cedar cladding, warm cedar soffit visible through the glass, andesite stone base, thin steel deck edge. Colours limited to deep green-black, cold slate blue, and a single warm amber accent from the windows.

MOOD
Silent, cold air, one warm room in the middle of a dark forest. Expensive but understated.

OUTPUT
Aspect ratio 16:9. Long edge at least 2560px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no visible doors left open, no interior people silhouettes, no glowing outdoor spotlights, no snow, no bright sky.
```

**Quality Check Points**:

- 左 40% にコピーを置ける暗部があるか
- 窓の光が白飛びしていないか（2400K の暖色が残っているか）
- 柱・窓枠・屋根のラインが歪んでいないか
- 9:16 にトリミングしても建物が切れないか

## IMAGE — forest-villa-exterior

**File**: `forest-villa-exterior.webp`
**Usage**: TOP / STAY / STAY 詳細 / 03 STAY・客室紹介
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A timber villa cantilevered out from a forest slope, its floor level about four metres above the ground, with a wide deck facing the treetops.

ENVIRONMENT
Beech and fir canopy at the same height as the deck. Light fog below the building. Late afternoon.

COMPOSITION
Three-quarter view from the side, building occupying the left two-thirds, canopy and fog on the right. Show the structure under the deck so the height reads clearly.

CAMERA
Full-frame, 50mm, from a facing slope at deck height, about 20 metres away.

LIGHTING
Overcast diffused daylight, very soft shadows. A faint warm glow inside the glass.

MATERIAL & COLOR
Cedar boards, black steel columns, glass. Green, grey-brown, and desaturated amber.

MOOD
Weightless, quiet, precise carpentry.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no railing clutter, no outdoor furniture sets, no umbrellas, no bright green over-saturated leaves.
```

**Quality Check Points**:

- 床が地面から浮いていることが分かるか
- 柱の本数と間隔が構造的に自然か
- デッキの水平が出ているか

## IMAGE — forest-villa-interior

**File**: `forest-villa-interior.webp`
**Usage**: STAY 詳細 / INTERIOR & PLAN
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
The interior of a small timber villa: low bed on the left, a long window seat, a full-height window filling the right wall with forest beyond.

ENVIRONMENT
Forest canopy fills the window. Slight fog outside.

COMPOSITION
One-point perspective from the doorway, window on the right, ceiling line visible. Leave the lower-left area calm.

CAMERA
Full-frame, 24mm, tripod at 1.2 metres, perfectly level to keep verticals straight.

LIGHTING
Daylight from the window as the main source, warm 2700K lamp in the far corner. No ceiling downlights visible.

MATERIAL & COLOR
Solid cedar floor, lime plaster walls, linen and wool bedding, a low walnut table.

MOOD
Warm, sparse, lived-in but immaculate.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no TV, no artwork on walls, no patterned textiles, no clutter on surfaces, no visible power outlets.
```

**Quality Check Points**:

- 垂直線が倒れていないか
- 家具が床に接地しているか
- 窓の外の森がボケすぎていないか

## IMAGE — stone-villa-exterior

**File**: `stone-villa-exterior.webp`
**Usage**: TOP / STAY / STAY 詳細 / 03 STAY・客室紹介
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A low, heavy villa built from rough andesite stone walls with a deep overhanging roof and a stone-paved terrace.

ENVIRONMENT
A clearing at the edge of the forest, valley visible behind. Morning after rain, stone still wet.

COMPOSITION
Frontal but slightly off-axis view. Building fills the lower two-thirds; roof line cuts the frame horizontally. Terrace leads the eye in from the bottom left.

CAMERA
Full-frame, 35mm, standing height, 15 metres away.

LIGHTING
Flat overcast light. No hard shadows. Subtle warm light under the eaves.

MATERIAL & COLOR
Split andesite, dark timber beams, copper gutter, wet stone paving.

MOOD
Solid, grounded, thermal mass you can feel.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no dry-stone garden clichés, no lanterns, no bonsai, no decorative rocks arranged in a circle.
```

**Quality Check Points**:

- 石積みの目地が不自然に繰り返していないか
- 軒の出が構造的に成立しているか
- 濡れた石の質感が出ているか

## IMAGE — mist-villa-exterior

**File**: `mist-villa-exterior.webp`
**Usage**: TOP / STAY / STAY 詳細 / 03 STAY・客室紹介
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A very low, wide villa at the tip of a ridge, almost dissolving into morning fog, with a cantilevered terrace over the valley.

ENVIRONMENT
Thick morning fog, valley invisible below, a few dark treetops emerging.

COMPOSITION
Building placed low in the frame and slightly right; upper half of the frame is fog and empty air. High-key overall, unlike the other exteriors.

CAMERA
Full-frame, 85mm from a facing ridge, compressed perspective.

LIGHTING
Flat white fog light, no direction, very low contrast. One faint warm window.

MATERIAL & COLOR
Grey timber, glass, thin steel. Almost monochrome, silver-green.

MOOD
Weightless, disappearing, silent.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no dramatic sun rays, no deep blacks, no birds, no visible ground beneath the terrace.
```

**Quality Check Points**:

- 白飛びせず霧の階調が残っているか
- 建物の輪郭が霧に溶けつつ判別できるか
- 他 2 棟と作風が揃っているか

## IMAGE — sauna-interior

**File**: `sauna-interior.webp`
**Usage**: TOP / SAUNA / 04 PRIVATE SAUNA
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
The inside of a small private sauna: two levels of solid aspen benches, a stove with stacked stones on the right, and a narrow window looking into dark forest.

ENVIRONMENT
Steam still in the air after a löyly. No people.

COMPOSITION
Diagonal view along the benches, stove in the right third, window in the upper left providing a cool counter-light. Leave the upper-left area open for type.

CAMERA
Full-frame, 24mm, camera low at bench height, level.

LIGHTING
One hidden warm LED strip under the upper bench, plus faint cool daylight from the window. Deep shadows are fine.

MATERIAL & COLOR
Aspen and thermo-treated pine, dark stones, a wooden ladle and bucket, one linen towel folded.

MOOD
Hot, dim, private. You can feel the air is heavy.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no people, no towels hanging randomly, no thermometer with readable numbers, no plastic buckets, no visible flames.
```

**Quality Check Points**:

- ベンチの段板が平行か
- 木目が繰り返しパターンになっていないか
- 湯気が不自然な白い塊になっていないか


---

# PHASE 2

## IMAGE — stone-villa-interior

**File**: `stone-villa-interior.webp`
**Usage**: STAY 詳細 / INTERIOR & PLAN
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A tall interior with rough stone walls, a polished earthen floor (doma), and a black wood-burning stove standing in the centre with a straight flue rising to the ceiling.

ENVIRONMENT
Winter afternoon, one high clerestory window letting in a shaft of pale light.

COMPOSITION
Wide view from a corner, stove slightly left of centre, seating low around it. Ceiling height clearly visible.

CAMERA
Full-frame, 24mm, tripod at 1.3 metres, level.

LIGHTING
Cool daylight from above, warm firelight from the stove door. Two light temperatures in one frame.

MATERIAL & COLOR
Stone, tataki earth floor, cast iron, linen, stacked firewood along one wall.

MOOD
Heavy, warm, quiet. Like a small chapel with a fire in it.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no large flames outside the stove, no sparks, no smoke inside the room, no rugs with patterns.
```

**Quality Check Points**:

- 煙突がまっすぐ天井へ抜けているか
- 火が不自然に明るすぎないか
- 天井の高さが伝わるか

## IMAGE — mist-villa-interior

**File**: `mist-villa-interior.webp`
**Usage**: STAY 詳細 / INTERIOR & PLAN
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A small bedroom-living space with windows on three sides, a low platform bed facing the view, and nothing else but a stool and a lamp.

ENVIRONMENT
Fog pressing against the glass on all sides. Early morning.

COMPOSITION
Symmetrical view from the entrance, bed centred, windows filling the frame edges.

CAMERA
Full-frame, 28mm, tripod at 1.1 metres, level.

LIGHTING
Soft white light from the fog outside; a single warm reading lamp at low intensity.

MATERIAL & COLOR
Pale oak floor, white plaster, grey linen bedding, wool throw.

MOOD
Empty in the best sense. Nothing to look at but weather.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no bright interior lights, no cushions in rows, no curtains, no mirror.
```

**Quality Check Points**:

- 左右の窓が対称に破綻していないか
- ベッドの寸法が現実的か
- 露出が明るすぎないか

## IMAGE — sauna-stove

**File**: `sauna-stove.webp`
**Usage**: SAUNA / GALLERY / THE RITUAL
**Aspect Ratio**: 2:3（1400 × 2100px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
Close view of a sauna stove: dark volcanic stones stacked high, a wooden ladle resting on the rim, water just poured, thin steam rising.

ENVIRONMENT
Dim sauna interior behind, out of focus.

COMPOSITION
Vertical framing, stove filling the lower two-thirds, steam rising into the empty upper third.

CAMERA
Full-frame, 85mm macro-ish, shallow depth of field, from slightly above.

LIGHTING
Single warm light from the left, deep falloff to the right.

MATERIAL & COLOR
Basalt stones, cast iron, cedar ladle, water droplets.

MOOD
Intense heat in a small area.

OUTPUT
Aspect ratio 2:3. Long edge at least 1400px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no visible fire, no thick fog covering everything, no hands, no steam that looks like smoke.
```

**Quality Check Points**:

- 石の積み方が自然か
- 湯気が細く立ち上がっているか
- 柄杓の柄が折れて見えないか

## IMAGE — cold-bath

**File**: `cold-bath.webp`
**Usage**: SAUNA / GALLERY / WATER & AIR
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A rectangular cold plunge bath cut from stone, filled to the brim with clear water, overflowing gently at one edge, set on an outdoor terrace.

ENVIRONMENT
Forest floor and moss around it, morning fog, wet stone.

COMPOSITION
Slightly overhead three-quarter view. Water surface occupies the centre; reflections of trees visible.

CAMERA
Full-frame, 35mm, from standing height looking down at about 40 degrees.

LIGHTING
Cool overcast morning light. No sun. Reflections are soft.

MATERIAL & COLOR
Grey stone, clear water, moss, a copper spout.

MOOD
Cold, clean, still.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no bubbles or jets, no pool tiles, no chlorine-blue water, no towels or slippers left around.
```

**Quality Check Points**:

- 水面が水平か
- 水の透明度が出ているか
- 縁のオーバーフローが自然か

## IMAGE — outdoor-rest

**File**: `outdoor-rest.webp`
**Usage**: SAUNA / GALLERY / WATER & AIR
**Aspect Ratio**: 2:3（1400 × 2100px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
Two simple wooden reclining chairs on a timber deck at the edge of the forest, a folded wool blanket on one of them.

ENVIRONMENT
Fog between the trees, wet deck boards, late afternoon.

COMPOSITION
Vertical framing, chairs in the lower half seen from the side, forest filling the upper half.

CAMERA
Full-frame, 50mm, standing height, 4 metres away.

LIGHTING
Soft overcast light, slightly cool.

MATERIAL & COLOR
Oiled cedar, wool, steel screws visible.

MOOD
Empty chairs waiting. Cool air on skin.

OUTPUT
Aspect ratio 2:3. Long edge at least 1400px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no cushions with logos, no side tables with drinks, no people, no sun loungers with resort styling.
```

**Quality Check Points**:

- チェアの脚が床に接地しているか
- 2 脚の形が同一に破綻していないか
- 奥行きが出ているか

## IMAGE — dinner

**File**: `dinner.webp`
**Usage**: TOP / EXPERIENCE / 05 EXPERIENCE / DINNER
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
One main course on a matte ceramic plate: a piece of fish or game finished over charcoal, a dark reduction, one seasonal vegetable. Restrained plating with generous empty space on the plate.

ENVIRONMENT
A dark walnut dining table, one linen napkin, a single glass of water. Background falls into darkness.

COMPOSITION
Three-quarter view from about 35 degrees, plate slightly right of centre, plenty of dark table in the foreground.

CAMERA
Full-frame, 50mm, shallow but controlled depth of field (f/2.8).

LIGHTING
One soft window light from the left rear, deep shadows on the right. No fill.

MATERIAL & COLOR
Matte grey-green glaze, charcoal marks, dark sauce, natural food texture.

MOOD
Quiet, precise, seasonal. Not showy.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no caviar or gold leaf, no tweezers-perfect microgreens scattered, no multiple dishes crowding the frame, no steam added artificially, no melting or deformed food shapes, no extra cutlery.
```

**Quality Check Points**:

- 料理の形が破綻していないか
- 器の縁が歪んでいないか
- 皿の余白が残っているか

## IMAGE — breakfast

**File**: `breakfast.webp`
**Usage**: EXPERIENCE / BREAKFAST
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A Japanese breakfast tray: a small donabe clay pot of rice with the lid slightly open and steam rising, a bowl of miso soup, a grilled fish, three small side dishes, pickles.

ENVIRONMENT
A cedar table by a window with morning forest light. Simple ceramic and lacquer.

COMPOSITION
Slightly overhead (about 55 degrees), tray filling most of the frame, window light from the left.

CAMERA
Full-frame, 50mm, f/4 so all dishes stay readable.

LIGHTING
Soft morning daylight, cool white, no artificial light.

MATERIAL & COLOR
Clay, lacquer, unglazed ceramic, linen cloth.

MOOD
Clean, calm, everyday but well made.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no plastic wrap, no chopstick rests shaped like animals, no crowded table, no duplicated bowls, no unreadable mush.
```

**Quality Check Points**:

- 器の数と配置が自然か
- 土鍋の湯気が過剰でないか
- 魚の形が自然か

## IMAGE — bonfire

**File**: `bonfire.webp`
**Usage**: TOP / EXPERIENCE / BONFIRE
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A small controlled fire in a low steel fire pit on a stone terrace, logs arranged carefully, one wool blanket over a nearby chair.

ENVIRONMENT
Night. The villa behind, its windows dimly lit. Dark forest beyond.

COMPOSITION
Fire in the lower right third, villa windows small in the upper left, most of the frame is darkness.

CAMERA
Full-frame, 35mm, low angle at 0.8 metres, 5 metres away, long exposure feel.

LIGHTING
Only the fire and two warm interior windows. Everything else falls to near black.

MATERIAL & COLOR
Steel, split hardwood, embers, stone paving.

MOOD
Late, warm, nearly silent.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no huge bonfire, no sparks flying everywhere, no people, no marshmallows, no fake orange glow on the whole scene.
```

**Quality Check Points**:

- 炎の形が自然か（CG 的でないか）
- 暗部が潰れきっていないか
- 薪の積み方が現実的か

## IMAGE — bath

**File**: `bath.webp`
**Usage**: STAY / GALLERY / GALLERY
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
An outdoor bath made of hinoki wood or stone, filled to the edge, steam rising, opening directly onto the forest with no fence.

ENVIRONMENT
Dusk, cold air, fog between the trees.

COMPOSITION
Horizontal, bath in the lower half seen from the side, forest filling the upper half. Water edge parallel to the frame.

CAMERA
Full-frame, 35mm, from 1.4 metres, 3 metres away.

LIGHTING
Fading daylight plus one warm lamp low on the wall behind. Steam catches the warm light.

MATERIAL & COLOR
Hinoki or stone, copper spout, wet decking.

MOOD
Hot water in cold air.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no people, no bath toys, no towels draped over the edge, no jacuzzi jets, no blue pool lighting.
```

**Quality Check Points**:

- 湯気が過剰でないか
- 水面の水平が出ているか
- 木や石の濡れ方が自然か

## IMAGE — night-exterior

**File**: `night-exterior.webp`
**Usage**: FINAL CTA / GALLERY / FINAL CTA 背景
**Aspect Ratio**: 3:2（1920 × 1280px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
The villa seen from the forest at night, warm windows glowing, the deck faintly lit.

ENVIRONMENT
Full darkness, fog, wet ground reflecting a little light.

COMPOSITION
Building in the RIGHT half, small in the frame. LEFT half is dark forest — reserved for headline and buttons. Wide horizontal.

CAMERA
Full-frame, 35mm, tripod, long exposure, eye level, 25 metres away.

LIGHTING
Only interior lamps and one low deck light. Deep shadows, no moonlight beams.

MATERIAL & COLOR
Charred timber, glass, wet stone.

MOOD
Someone is inside. Everything else is asleep.

OUTPUT
Aspect ratio 3:2. Long edge at least 1920px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no star trails, no light painting, no visible interior details, no cars.
```

**Quality Check Points**:

- 左半分が十分暗いか
- 窓の光が滲みすぎていないか
- 手前の地面が真っ黒に潰れていないか


---

# PHASE 3

## IMAGE — forest-morning

**File**: `forest-morning.webp`
**Usage**: EXPERIENCE / ACCESS / GALLERY / FOREST WALK / LOCATION
**Aspect Ratio**: 2:3（1400 × 2100px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A narrow path through a foggy forest of tall straight trunks, moss covering the ground.

ENVIRONMENT
Early morning, heavy fog, no wind, wet leaves.

COMPOSITION
Vertical framing, path entering from the bottom centre and disappearing into fog at the upper third.

CAMERA
Full-frame, 50mm, eye level, standing on the path.

LIGHTING
Flat white fog light. Very low contrast, almost monochrome green-grey.

MATERIAL & COLOR
Bark, moss, wet earth.

MOOD
Cold air, no sound.

OUTPUT
Aspect ratio 2:3. Long edge at least 1400px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no sun rays through trees, no animals, no flowers, no fallen logs arranged decoratively.
```

**Quality Check Points**:

- 幹の間隔が自然か
- 霧の奥行きが段階的に出ているか
- 緑が過飽和でないか

## IMAGE — architecture-detail

**File**: `architecture-detail.webp`
**Usage**: TOP / GALLERY / INTRODUCTION
**Aspect Ratio**: 1:1（1400 × 1400px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A close detail where charred cedar cladding meets rough stone, with a thin shadow gap between the two materials.

ENVIRONMENT
Exterior wall, side light, no context needed.

COMPOSITION
Square framing, the joint running diagonally from lower left to upper right.

CAMERA
Full-frame, 85mm, perpendicular to the wall, shallow depth of field.

LIGHTING
Low raking light from the left revealing texture.

MATERIAL & COLOR
Yakisugi charcoal texture, andesite grain, a thin bronze flashing.

MOOD
Craft, precision, weathering.

OUTPUT
Aspect ratio 1:1. Long edge at least 1400px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no visible screws in rows, no repeating tile pattern, no moss added artificially.
```

**Quality Check Points**:

- 質感が二種類はっきり分かれているか
- 目地が一直線に整いすぎていないか

## IMAGE — tea-detail

**File**: `tea-detail.webp`
**Usage**: GALLERY / STAY / GALLERY
**Aspect Ratio**: 1:1（1400 × 1400px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
A cast-iron kettle and two small unglazed cups on a wooden tray, placed on a low table by a window.

ENVIRONMENT
Interior, afternoon, forest visible but out of focus behind.

COMPOSITION
Square framing, tray slightly off-centre to the left, empty table space on the right.

CAMERA
Full-frame, 85mm, from 45 degrees above, f/2.8.

LIGHTING
Soft window light from the right, gentle shadow to the left.

MATERIAL & COLOR
Cast iron, unglazed clay, oak tray, linen cloth.

MOOD
Still life, warm, used.

OUTPUT
Aspect ratio 1:1. Long edge at least 1400px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no steam, no tea bags, no branded packaging, no perfectly symmetrical arrangement.
```

**Quality Check Points**:

- 器の口が真円に破綻していないか
- 影の向きが一致しているか

## IMAGE — og-image

**File**: `og-image.webp`
**Usage**: OGP / SNS シェア
**Aspect Ratio**: 1200:630（1200 × 630px）

**Prompt**:

```text
Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.

SUBJECT
The villa at blue hour from a middle distance, similar to the hero but wider and calmer.

ENVIRONMENT
Forest, fog, dusk.

COMPOSITION
Building in the right third, large dark area on the left and bottom for the logo, tagline and caption to be composited later.

CAMERA
Full-frame, 35mm, eye level.

LIGHTING
Blue hour, warm windows.

MATERIAL & COLOR
Same palette as the hero image.

MOOD
A quieter version of the hero.

OUTPUT
Aspect ratio 1200:630. Long edge at least 1200px. Photograph, not illustration.

NEGATIVE REQUIREMENTS
no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion. no text (it is added programmatically), no busy foreground.
```

**Quality Check Points**:

- 左と下にロゴ・コピーを置ける暗部があるか
- hero と色調が揃っているか


---

## 再生成のコツ

同じプロンプトをもう一度投げても結果は良くなりません。**何が悪かったか**を先に言語化し、その一点だけを強く指定し直してください。

| 失敗 | 修正の指示例 |
| --- | --- |
| 建物が中央すぎてコピーが置けない | Move the building to the right third. Keep the left 40% as dark forest and fog with nothing in it. |
| CG っぽい | Add natural imperfection: dust on the glass, uneven wood grain, slight lens vignetting. Photograph, not render. |
| 色が派手 | Desaturate. Limit the palette to green-black, slate blue and one warm amber accent. No orange-and-teal grading. |
| 窓や柱が歪む | Keep all verticals perfectly straight. Architectural photography with a tilt-shift lens, no perspective distortion. |
| 料理が崩れる | Simplify the plate: one protein, one vegetable, one sauce. Leave 40% of the plate empty. |
| 湯気・炎が不自然 | Make the steam thin and translucent. Small controlled fire, no sparks, no glow spilling over the whole scene. |
