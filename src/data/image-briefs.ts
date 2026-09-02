import type { ImageId } from './images';

/**
 * 画像アセットのアートディレクション定義。
 * docs/image-production.md / docs/chatgpt-image-prompts.md / docs/image-prompts.md は
 * このファイルから scripts/build-image-docs.mjs で生成する（内容を二重管理しない）。
 */

/** 全カットに共通する撮影方針。プロンプト冒頭に必ず入れる */
export const ART_DIRECTION = `Ultra-realistic editorial photograph for a luxury travel magazine feature about a small private villa retreat in the forests of Hakone, Japan. Contemporary Japanese architecture: natural cedar, charred timber (yakisugi), rough andesite stone, lime plaster, large frameless glass. Restrained, expensive, quiet. Soft natural fog in the air. Muted earth tones. Photographic realism with natural imperfection — dust, grain, uneven patina. Shot on a full-frame camera with a prime lens, natural depth of field.`;

/** 全カットで避けたい表現 */
export const GLOBAL_NEGATIVE = `no text, no letters, no logos, no signage, no watermark, no captions; no people unless explicitly requested, no hands, no faces; no CGI or 3D render look, no video-game lighting, no plastic surfaces; no HDR halos, no over-sharpening, no heavy vignette; no orange-and-teal grading, no oversaturated colors; no impossible architecture, no warped windows or bent columns, no floating furniture, no duplicated objects; no fantasy palace, no cheap tropical resort styling, no fake-looking fire or smoke; no tilted horizon, no fisheye distortion.`;

export interface ImageBrief {
  id: ImageId;
  phase: 1 | 2 | 3;
  page: string;
  section: string;
  role: string;
  subject: string;
  environment: string;
  composition: string;
  camera: string;
  lighting: string;
  material: string;
  mood: string;
  /** この画像固有の禁止事項 */
  avoid: string;
  cropPc: string;
  cropSp: string;
  checks: string[];
}

export const IMAGE_BRIEFS: readonly ImageBrief[] = [
  {
    id: 'hero',
    phase: 1,
    page: 'TOP',
    section: '01 HERO（全画面）',
    role: 'サイト全体のトーンを決める最重要カット。この 1 枚で「高級・静けさ・森・建築・火」を伝える',
    subject:
      'A single-storey contemporary Japanese villa standing on a slope in a dense forest, seen from slightly below and to the left, at dusk.',
    environment:
      'Deep mixed forest of tall beech and fir. Thin fog drifting between the trunks. Wet ground, moss and fallen leaves. No other buildings, no roads, no cars.',
    composition:
      'Place the villa in the RIGHT third of the frame, its glowing windows around 65% from the left edge and 55% from the top. Keep the LEFT 45% of the frame as dark, quiet negative space — layered tree trunks and fog — so large headline type can sit there. Horizon low. Generous empty sky-fog area in the upper left. Nothing important in the outer 8% of any edge.',
    camera:
      'Full-frame, 35mm lens, eye level from about 12 metres away, camera slightly below the deck line looking gently up at the building.',
    lighting:
      'Blue hour, 15 minutes after sunset. Exterior light is cold blue-green and very soft. Interior is lit only by warm 2400K lamps, spilling through the glass onto the deck. Strong but natural contrast between cold outside and warm inside. No artificial light on the trees.',
    material:
      'Charred cedar cladding, warm cedar soffit visible through the glass, andesite stone base, thin steel deck edge. Colours limited to deep green-black, cold slate blue, and a single warm amber accent from the windows.',
    mood: 'Silent, cold air, one warm room in the middle of a dark forest. Expensive but understated.',
    avoid:
      'no visible doors left open, no interior people silhouettes, no glowing outdoor spotlights, no snow, no bright sky',
    cropPc: '16:9 全画面。建物は右 1/3、コピーは左に載る',
    cropSp: '9:16 に切っても建物と窓の灯りが残るよう、被写体を中央右寄り・上下中央に置く',
    checks: [
      '左 40% にコピーを置ける暗部があるか',
      '窓の光が白飛びしていないか（2400K の暖色が残っているか）',
      '柱・窓枠・屋根のラインが歪んでいないか',
      '9:16 にトリミングしても建物が切れないか',
    ],
  },
  {
    id: 'forest-villa-exterior',
    phase: 1,
    page: 'TOP / STAY / STAY 詳細',
    section: '03 STAY・客室紹介',
    role: 'FOREST VILLA の外観。樹冠の高さに床がある構造を伝える',
    subject:
      'A timber villa cantilevered out from a forest slope, its floor level about four metres above the ground, with a wide deck facing the treetops.',
    environment: 'Beech and fir canopy at the same height as the deck. Light fog below the building. Late afternoon.',
    composition:
      'Three-quarter view from the side, building occupying the left two-thirds, canopy and fog on the right. Show the structure under the deck so the height reads clearly.',
    camera: 'Full-frame, 50mm, from a facing slope at deck height, about 20 metres away.',
    lighting: 'Overcast diffused daylight, very soft shadows. A faint warm glow inside the glass.',
    material: 'Cedar boards, black steel columns, glass. Green, grey-brown, and desaturated amber.',
    mood: 'Weightless, quiet, precise carpentry.',
    avoid: 'no railing clutter, no outdoor furniture sets, no umbrellas, no bright green over-saturated leaves',
    cropPc: '4:3 で使用（VillaRow）',
    cropSp: '4:3 のまま全幅。建物が中央に来る構図',
    checks: ['床が地面から浮いていることが分かるか', '柱の本数と間隔が構造的に自然か', 'デッキの水平が出ているか'],
  },
  {
    id: 'forest-villa-interior',
    phase: 1,
    page: 'STAY 詳細',
    section: 'INTERIOR & PLAN',
    role: 'FOREST VILLA の室内。無垢材と土壁、窓外の森',
    subject:
      'The interior of a small timber villa: low bed on the left, a long window seat, a full-height window filling the right wall with forest beyond.',
    environment: 'Forest canopy fills the window. Slight fog outside.',
    composition:
      'One-point perspective from the doorway, window on the right, ceiling line visible. Leave the lower-left area calm.',
    camera: 'Full-frame, 24mm, tripod at 1.2 metres, perfectly level to keep verticals straight.',
    lighting:
      'Daylight from the window as the main source, warm 2700K lamp in the far corner. No ceiling downlights visible.',
    material: 'Solid cedar floor, lime plaster walls, linen and wool bedding, a low walnut table.',
    mood: 'Warm, sparse, lived-in but immaculate.',
    avoid: 'no TV, no artwork on walls, no patterned textiles, no clutter on surfaces, no visible power outlets',
    cropPc: '4:3',
    cropSp: '4:3 全幅',
    checks: ['垂直線が倒れていないか', '家具が床に接地しているか', '窓の外の森がボケすぎていないか'],
  },
  {
    id: 'stone-villa-exterior',
    phase: 1,
    page: 'TOP / STAY / STAY 詳細',
    section: '03 STAY・客室紹介',
    role: 'STONE VILLA の外観。重さと蓄熱を感じさせる',
    subject:
      'A low, heavy villa built from rough andesite stone walls with a deep overhanging roof and a stone-paved terrace.',
    environment: 'A clearing at the edge of the forest, valley visible behind. Morning after rain, stone still wet.',
    composition:
      'Frontal but slightly off-axis view. Building fills the lower two-thirds; roof line cuts the frame horizontally. Terrace leads the eye in from the bottom left.',
    camera: 'Full-frame, 35mm, standing height, 15 metres away.',
    lighting: 'Flat overcast light. No hard shadows. Subtle warm light under the eaves.',
    material: 'Split andesite, dark timber beams, copper gutter, wet stone paving.',
    mood: 'Solid, grounded, thermal mass you can feel.',
    avoid: 'no dry-stone garden clichés, no lanterns, no bonsai, no decorative rocks arranged in a circle',
    cropPc: '4:3',
    cropSp: '4:3 全幅',
    checks: ['石積みの目地が不自然に繰り返していないか', '軒の出が構造的に成立しているか', '濡れた石の質感が出ているか'],
  },
  {
    id: 'stone-villa-interior',
    phase: 2,
    page: 'STAY 詳細',
    section: 'INTERIOR & PLAN',
    role: 'STONE VILLA の室内。土間と薪ストーブ、4.2m の天井',
    subject:
      'A tall interior with rough stone walls, a polished earthen floor (doma), and a black wood-burning stove standing in the centre with a straight flue rising to the ceiling.',
    environment: 'Winter afternoon, one high clerestory window letting in a shaft of pale light.',
    composition:
      'Wide view from a corner, stove slightly left of centre, seating low around it. Ceiling height clearly visible.',
    camera: 'Full-frame, 24mm, tripod at 1.3 metres, level.',
    lighting: 'Cool daylight from above, warm firelight from the stove door. Two light temperatures in one frame.',
    material: 'Stone, tataki earth floor, cast iron, linen, stacked firewood along one wall.',
    mood: 'Heavy, warm, quiet. Like a small chapel with a fire in it.',
    avoid: 'no large flames outside the stove, no sparks, no smoke inside the room, no rugs with patterns',
    cropPc: '4:3',
    cropSp: '4:3 全幅',
    checks: ['煙突がまっすぐ天井へ抜けているか', '火が不自然に明るすぎないか', '天井の高さが伝わるか'],
  },
  {
    id: 'mist-villa-exterior',
    phase: 1,
    page: 'TOP / STAY / STAY 詳細',
    section: '03 STAY・客室紹介',
    role: 'MIST VILLA の外観。尾根の先端と朝霧',
    subject:
      'A very low, wide villa at the tip of a ridge, almost dissolving into morning fog, with a cantilevered terrace over the valley.',
    environment: 'Thick morning fog, valley invisible below, a few dark treetops emerging.',
    composition:
      'Building placed low in the frame and slightly right; upper half of the frame is fog and empty air. High-key overall, unlike the other exteriors.',
    camera: 'Full-frame, 85mm from a facing ridge, compressed perspective.',
    lighting: 'Flat white fog light, no direction, very low contrast. One faint warm window.',
    material: 'Grey timber, glass, thin steel. Almost monochrome, silver-green.',
    mood: 'Weightless, disappearing, silent.',
    avoid: 'no dramatic sun rays, no deep blacks, no birds, no visible ground beneath the terrace',
    cropPc: '4:3',
    cropSp: '4:3 全幅',
    checks: ['白飛びせず霧の階調が残っているか', '建物の輪郭が霧に溶けつつ判別できるか', '他 2 棟と作風が揃っているか'],
  },
  {
    id: 'mist-villa-interior',
    phase: 2,
    page: 'STAY 詳細',
    section: 'INTERIOR & PLAN',
    role: 'MIST VILLA の室内。三方の窓と低いベッド',
    subject:
      'A small bedroom-living space with windows on three sides, a low platform bed facing the view, and nothing else but a stool and a lamp.',
    environment: 'Fog pressing against the glass on all sides. Early morning.',
    composition: 'Symmetrical view from the entrance, bed centred, windows filling the frame edges.',
    camera: 'Full-frame, 28mm, tripod at 1.1 metres, level.',
    lighting: 'Soft white light from the fog outside; a single warm reading lamp at low intensity.',
    material: 'Pale oak floor, white plaster, grey linen bedding, wool throw.',
    mood: 'Empty in the best sense. Nothing to look at but weather.',
    avoid: 'no bright interior lights, no cushions in rows, no curtains, no mirror',
    cropPc: '4:3',
    cropSp: '4:3 全幅',
    checks: ['左右の窓が対称に破綻していないか', 'ベッドの寸法が現実的か', '露出が明るすぎないか'],
  },
  {
    id: 'sauna-interior',
    phase: 1,
    page: 'TOP / SAUNA',
    section: '04 PRIVATE SAUNA',
    role: 'サウナ体験の中心カット。木の質感と間接照明',
    subject:
      'The inside of a small private sauna: two levels of solid aspen benches, a stove with stacked stones on the right, and a narrow window looking into dark forest.',
    environment: 'Steam still in the air after a löyly. No people.',
    composition:
      'Diagonal view along the benches, stove in the right third, window in the upper left providing a cool counter-light. Leave the upper-left area open for type.',
    camera: 'Full-frame, 24mm, camera low at bench height, level.',
    lighting: 'One hidden warm LED strip under the upper bench, plus faint cool daylight from the window. Deep shadows are fine.',
    material: 'Aspen and thermo-treated pine, dark stones, a wooden ladle and bucket, one linen towel folded.',
    mood: 'Hot, dim, private. You can feel the air is heavy.',
    avoid: 'no people, no towels hanging randomly, no thermometer with readable numbers, no plastic buckets, no visible flames',
    cropPc: '4:5 / 3:2 の両方で使うため上下に余裕を持たせる',
    cropSp: '4:5 全幅',
    checks: ['ベンチの段板が平行か', '木目が繰り返しパターンになっていないか', '湯気が不自然な白い塊になっていないか'],
  },
  {
    id: 'sauna-stove',
    phase: 2,
    page: 'SAUNA / GALLERY',
    section: 'THE RITUAL',
    role: 'ロウリュの瞬間を示すディテール',
    subject:
      'Close view of a sauna stove: dark volcanic stones stacked high, a wooden ladle resting on the rim, water just poured, thin steam rising.',
    environment: 'Dim sauna interior behind, out of focus.',
    composition: 'Vertical framing, stove filling the lower two-thirds, steam rising into the empty upper third.',
    camera: 'Full-frame, 85mm macro-ish, shallow depth of field, from slightly above.',
    lighting: 'Single warm light from the left, deep falloff to the right.',
    material: 'Basalt stones, cast iron, cedar ladle, water droplets.',
    mood: 'Intense heat in a small area.',
    avoid: 'no visible fire, no thick fog covering everything, no hands, no steam that looks like smoke',
    cropPc: '3:4 縦',
    cropSp: '3:4 縦・全幅',
    checks: ['石の積み方が自然か', '湯気が細く立ち上がっているか', '柄杓の柄が折れて見えないか'],
  },
  {
    id: 'cold-bath',
    phase: 2,
    page: 'SAUNA / GALLERY',
    section: 'WATER & AIR',
    role: '水風呂。冷たさと透明度を伝える',
    subject:
      'A rectangular cold plunge bath cut from stone, filled to the brim with clear water, overflowing gently at one edge, set on an outdoor terrace.',
    environment: 'Forest floor and moss around it, morning fog, wet stone.',
    composition: 'Slightly overhead three-quarter view. Water surface occupies the centre; reflections of trees visible.',
    camera: 'Full-frame, 35mm, from standing height looking down at about 40 degrees.',
    lighting: 'Cool overcast morning light. No sun. Reflections are soft.',
    material: 'Grey stone, clear water, moss, a copper spout.',
    mood: 'Cold, clean, still.',
    avoid: 'no bubbles or jets, no pool tiles, no chlorine-blue water, no towels or slippers left around',
    cropPc: '3:2',
    cropSp: '3:2 全幅',
    checks: ['水面が水平か', '水の透明度が出ているか', '縁のオーバーフローが自然か'],
  },
  {
    id: 'outdoor-rest',
    phase: 2,
    page: 'SAUNA / GALLERY',
    section: 'WATER & AIR',
    role: '外気浴。休むための場所',
    subject:
      'Two simple wooden reclining chairs on a timber deck at the edge of the forest, a folded wool blanket on one of them.',
    environment: 'Fog between the trees, wet deck boards, late afternoon.',
    composition: 'Vertical framing, chairs in the lower half seen from the side, forest filling the upper half.',
    camera: 'Full-frame, 50mm, standing height, 4 metres away.',
    lighting: 'Soft overcast light, slightly cool.',
    material: 'Oiled cedar, wool, steel screws visible.',
    mood: 'Empty chairs waiting. Cool air on skin.',
    avoid: 'no cushions with logos, no side tables with drinks, no people, no sun loungers with resort styling',
    cropPc: '3:4 縦',
    cropSp: '3:4 縦',
    checks: ['チェアの脚が床に接地しているか', '2 脚の形が同一に破綻していないか', '奥行きが出ているか'],
  },
  {
    id: 'dinner',
    phase: 2,
    page: 'TOP / EXPERIENCE',
    section: '05 EXPERIENCE / DINNER',
    role: '夕食。派手さより火の入り方で見せる',
    subject:
      'One main course on a matte ceramic plate: a piece of fish or game finished over charcoal, a dark reduction, one seasonal vegetable. Restrained plating with generous empty space on the plate.',
    environment: 'A dark walnut dining table, one linen napkin, a single glass of water. Background falls into darkness.',
    composition: 'Three-quarter view from about 35 degrees, plate slightly right of centre, plenty of dark table in the foreground.',
    camera: 'Full-frame, 50mm, shallow but controlled depth of field (f/2.8).',
    lighting: 'One soft window light from the left rear, deep shadows on the right. No fill.',
    material: 'Matte grey-green glaze, charcoal marks, dark sauce, natural food texture.',
    mood: 'Quiet, precise, seasonal. Not showy.',
    avoid:
      'no caviar or gold leaf, no tweezers-perfect microgreens scattered, no multiple dishes crowding the frame, no steam added artificially, no melting or deformed food shapes, no extra cutlery',
    cropPc: '4:3',
    cropSp: '4:3 全幅',
    checks: ['料理の形が破綻していないか', '器の縁が歪んでいないか', '皿の余白が残っているか'],
  },
  {
    id: 'breakfast',
    phase: 2,
    page: 'EXPERIENCE',
    section: 'BREAKFAST',
    role: '和朝食。土鍋の存在感',
    subject:
      'A Japanese breakfast tray: a small donabe clay pot of rice with the lid slightly open and steam rising, a bowl of miso soup, a grilled fish, three small side dishes, pickles.',
    environment: 'A cedar table by a window with morning forest light. Simple ceramic and lacquer.',
    composition: 'Slightly overhead (about 55 degrees), tray filling most of the frame, window light from the left.',
    camera: 'Full-frame, 50mm, f/4 so all dishes stay readable.',
    lighting: 'Soft morning daylight, cool white, no artificial light.',
    material: 'Clay, lacquer, unglazed ceramic, linen cloth.',
    mood: 'Clean, calm, everyday but well made.',
    avoid: 'no plastic wrap, no chopstick rests shaped like animals, no crowded table, no duplicated bowls, no unreadable mush',
    cropPc: '16:10',
    cropSp: '16:10 全幅',
    checks: ['器の数と配置が自然か', '土鍋の湯気が過剰でないか', '魚の形が自然か'],
  },
  {
    id: 'bonfire',
    phase: 2,
    page: 'TOP / EXPERIENCE',
    section: 'BONFIRE',
    role: '夜の焚き火。暖色の主役カット',
    subject:
      'A small controlled fire in a low steel fire pit on a stone terrace, logs arranged carefully, one wool blanket over a nearby chair.',
    environment: 'Night. The villa behind, its windows dimly lit. Dark forest beyond.',
    composition: 'Fire in the lower right third, villa windows small in the upper left, most of the frame is darkness.',
    camera: 'Full-frame, 35mm, low angle at 0.8 metres, 5 metres away, long exposure feel.',
    lighting: 'Only the fire and two warm interior windows. Everything else falls to near black.',
    material: 'Steel, split hardwood, embers, stone paving.',
    mood: 'Late, warm, nearly silent.',
    avoid: 'no huge bonfire, no sparks flying everywhere, no people, no marshmallows, no fake orange glow on the whole scene',
    cropPc: '3:4 / 4:3 両方で使用',
    cropSp: '3:4 縦',
    checks: ['炎の形が自然か（CG 的でないか）', '暗部が潰れきっていないか', '薪の積み方が現実的か'],
  },
  {
    id: 'forest-morning',
    phase: 3,
    page: 'EXPERIENCE / ACCESS / GALLERY',
    section: 'FOREST WALK / LOCATION',
    role: '森そのもの。ブランドの背景',
    subject: 'A narrow path through a foggy forest of tall straight trunks, moss covering the ground.',
    environment: 'Early morning, heavy fog, no wind, wet leaves.',
    composition: 'Vertical framing, path entering from the bottom centre and disappearing into fog at the upper third.',
    camera: 'Full-frame, 50mm, eye level, standing on the path.',
    lighting: 'Flat white fog light. Very low contrast, almost monochrome green-grey.',
    material: 'Bark, moss, wet earth.',
    mood: 'Cold air, no sound.',
    avoid: 'no sun rays through trees, no animals, no flowers, no fallen logs arranged decoratively',
    cropPc: '3:4 縦',
    cropSp: '3:4 縦',
    checks: ['幹の間隔が自然か', '霧の奥行きが段階的に出ているか', '緑が過飽和でないか'],
  },
  {
    id: 'architecture-detail',
    phase: 3,
    page: 'TOP / GALLERY',
    section: 'INTRODUCTION',
    role: '素材のディテール。ブランドの手触り',
    subject:
      'A close detail where charred cedar cladding meets rough stone, with a thin shadow gap between the two materials.',
    environment: 'Exterior wall, side light, no context needed.',
    composition: 'Square framing, the joint running diagonally from lower left to upper right.',
    camera: 'Full-frame, 85mm, perpendicular to the wall, shallow depth of field.',
    lighting: 'Low raking light from the left revealing texture.',
    material: 'Yakisugi charcoal texture, andesite grain, a thin bronze flashing.',
    mood: 'Craft, precision, weathering.',
    avoid: 'no visible screws in rows, no repeating tile pattern, no moss added artificially',
    cropPc: '1:1 / 4:5',
    cropSp: '1:1',
    checks: ['質感が二種類はっきり分かれているか', '目地が一直線に整いすぎていないか'],
  },
  {
    id: 'tea-detail',
    phase: 3,
    page: 'GALLERY / STAY',
    section: 'GALLERY',
    role: '客室の小物。生活の温度',
    subject:
      'A cast-iron kettle and two small unglazed cups on a wooden tray, placed on a low table by a window.',
    environment: 'Interior, afternoon, forest visible but out of focus behind.',
    composition: 'Square framing, tray slightly off-centre to the left, empty table space on the right.',
    camera: 'Full-frame, 85mm, from 45 degrees above, f/2.8.',
    lighting: 'Soft window light from the right, gentle shadow to the left.',
    material: 'Cast iron, unglazed clay, oak tray, linen cloth.',
    mood: 'Still life, warm, used.',
    avoid: 'no steam, no tea bags, no branded packaging, no perfectly symmetrical arrangement',
    cropPc: '1:1',
    cropSp: '1:1',
    checks: ['器の口が真円に破綻していないか', '影の向きが一致しているか'],
  },
  {
    id: 'bath',
    phase: 2,
    page: 'STAY / GALLERY',
    section: 'GALLERY',
    role: '露天風呂。湯気と森',
    subject:
      'An outdoor bath made of hinoki wood or stone, filled to the edge, steam rising, opening directly onto the forest with no fence.',
    environment: 'Dusk, cold air, fog between the trees.',
    composition: 'Horizontal, bath in the lower half seen from the side, forest filling the upper half. Water edge parallel to the frame.',
    camera: 'Full-frame, 35mm, from 1.4 metres, 3 metres away.',
    lighting: 'Fading daylight plus one warm lamp low on the wall behind. Steam catches the warm light.',
    material: 'Hinoki or stone, copper spout, wet decking.',
    mood: 'Hot water in cold air.',
    avoid: 'no people, no bath toys, no towels draped over the edge, no jacuzzi jets, no blue pool lighting',
    cropPc: '3:2',
    cropSp: '3:2 全幅',
    checks: ['湯気が過剰でないか', '水面の水平が出ているか', '木や石の濡れ方が自然か'],
  },
  {
    id: 'night-exterior',
    phase: 2,
    page: 'FINAL CTA / GALLERY',
    section: 'FINAL CTA 背景',
    role: '締めの CTA 背景。暗部にテキストを載せる',
    subject: 'The villa seen from the forest at night, warm windows glowing, the deck faintly lit.',
    environment: 'Full darkness, fog, wet ground reflecting a little light.',
    composition:
      'Building in the RIGHT half, small in the frame. LEFT half is dark forest — reserved for headline and buttons. Wide horizontal.',
    camera: 'Full-frame, 35mm, tripod, long exposure, eye level, 25 metres away.',
    lighting: 'Only interior lamps and one low deck light. Deep shadows, no moonlight beams.',
    material: 'Charred timber, glass, wet stone.',
    mood: 'Someone is inside. Everything else is asleep.',
    avoid: 'no star trails, no light painting, no visible interior details, no cars',
    cropPc: '16:9 / 3:2、左側に文字が載る',
    cropSp: '3:2 全幅（左に文字）',
    checks: ['左半分が十分暗いか', '窓の光が滲みすぎていないか', '手前の地面が真っ黒に潰れていないか'],
  },
  {
    id: 'og-image',
    phase: 3,
    page: 'OGP',
    section: 'SNS シェア',
    role: 'SNS シェア時のサムネイル下地（この上にブランド名を合成する）',
    subject: 'The villa at blue hour from a middle distance, similar to the hero but wider and calmer.',
    environment: 'Forest, fog, dusk.',
    composition:
      'Building in the right third, large dark area on the left and bottom for the logo, tagline and caption to be composited later.',
    camera: 'Full-frame, 35mm, eye level.',
    lighting: 'Blue hour, warm windows.',
    material: 'Same palette as the hero image.',
    mood: 'A quieter version of the hero.',
    avoid: 'no text (it is added programmatically), no busy foreground',
    cropPc: '1.91:1（1200 × 630）',
    cropSp: '同上',
    checks: ['左と下にロゴ・コピーを置ける暗部があるか', 'hero と色調が揃っているか'],
  },
] as const;

export function getBrief(id: ImageId): ImageBrief {
  const brief = IMAGE_BRIEFS.find((item) => item.id === id);
  if (!brief) throw new Error(`No brief for image: ${id}`);
  return brief;
}
