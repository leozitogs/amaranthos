/**
 * Configuracao da cena do hero (telas 1 a 4). Numeros isolados aqui para a PO
 * e o art-director afinarem sem mexer na logica dos componentes.
 */

/** Assets precarregados antes de abrir o portal (preloader da tela 1). */
export const SCENE_IMAGES = [
  '/assets/cenas/load/left-input.png',
  '/assets/cenas/load/right-input.png',
  '/assets/cenas/hero/portal-hero.png',
  '/assets/cenas/hero/motion-hero-poster.jpg',
] as const;

/** Portal de fundo (estatico para a tela 2). */
export const PORTAL_BG = '/assets/cenas/hero/portal-hero.png';

/**
 * Video oficial do hero (4K, mp4). Unica source do <video> na Fase 3.
 */
export const HERO_VIDEO_OFFICIAL = '/assets/cenas/hero/motion-hero-amaranthos-4k.mp4';
export const HERO_VIDEO_REVERSED = '/assets/cenas/hero/motion-hero-amaranthos-4k-reversed.mp4';

/**
 * Frame inicial do video oficial (extraido via ffmpeg, 3840x2160). Fica atras
 * do portal-hero.png na Fase 2 (profundidade vista pela abertura do portal) e
 * cruzafunde para o video quando o scroll dispara (Fase 3). Tambem serve de
 * poster do elemento <video> para evitar flash antes do primeiro frame decodar.
 */
export const HERO_VIDEO_POSTER = '/assets/cenas/hero/motion-hero-poster.jpg';

/**
 * Geometria do scroll cinematografico (Fases 3 e 4).
 *
 * PIN_HEIGHT_VH: altura total da zona pinada (viewport + scroll virtual).
 *   130vh da margem generosa para o zoom do portal completar antes de sair.
 *   Ajuste aqui se o art-director quiser mais ou menos tempo de scroll.
 *
 * PORTAL_SCALE_MAX: escala final do portal no pico do zoom (p=0.55).
 *   4.2 cobre o buraco do portal e preenche o viewport com a floresta.
 */
export const SCROLL_SCENE = {
  PIN_HEIGHT_VH: 130,
  PORTAL_SCALE_MAX: 4.2,
} as const;

/**
 * Faixas de progresso p (0 a 1) que o scroll-storyteller vai consumir.
 * Cada faixa define o intervalo [start, end] da animacao correspondente.
 * Centralizados aqui para a PO afinar sem tocar na logica de animacao.
 */
export const SCROLL_PHASES = {
  /** UI (texto, cards, dots, indicador) sai de cena: opacity 1->0, y 0->-24px */
  uiExit: { start: 0.0, end: 0.12 },
  /** Paineis de chenille comecam a sair de quadro junto com a UI */
  framesExit: { start: 0.0, end: 0.12 },
  /** Zoom do portal scale 1.0->4.2 e video cross-fade sob ele */
  portalZoom: { start: 0.12, end: 0.55 },
  /** Portal opacity 1->0 na cauda do zoom */
  portalFade: { start: 0.4, end: 0.55 },
  /** Video opacity 0->1 (cross-fade sob o portal) */
  videoFadeIn: { start: 0.12, end: 0.45 },
  /** Repouso: video em parallax */
  rest: { start: 0.55, end: 1.0 },
} as const;

/** Tipo das faixas de progresso para uso nos engines de animacao. */
export type ScrollPhaseKey = keyof typeof SCROLL_PHASES;
export type ScrollPhase = { start: number; end: number };

/**
 * Geometria dos paineis de chenille (frames). Referencia 1920x1080, x a partir
 * de 0. Cada frame e uma caixa de `coverVw` de largura ancorada na sua lateral.
 * Fechados, os dois cobrem o viewport com sobreposicao; abertos, a borda interna
 * do frame esquerdo para em 1000/1920 e a do direito em 900/1920 (sobreposicao
 * intencional de 100px que emoldura o portal).
 *
 * coverVw = 100 (w-screen = 100vw): o painel cobre exatamente o viewport.
 *   leftOpenVw  = 52.0833 - 100 = -47.9167vw
 *   rightOpenVw = 46.875  - (100 - 100) = +46.875vw
 */
const REF_WIDTH = 1920;
const coverVw = 100;
const leftOpenRightEdgeVw = (1000 / REF_WIDTH) * 100; // 52.0833vw
const rightOpenLeftEdgeVw = (1000 / REF_WIDTH) * 100; // 46.875vw

export const FRAME = {
  coverVw,
  /** translateX do frame esquerdo no estado aberto: -47.9167vw. */
  leftOpenVw: leftOpenRightEdgeVw - coverVw, // 52.0833 - 100 = -47.9167vw
  /** translateX do frame direito no estado aberto: +46.875vw. */
  rightOpenVw: rightOpenLeftEdgeVw - (100 - coverVw), // 46.875 - 0 = +46.875vw
} as const;

/**
 * Fator de parallax por camada, em px de deslocamento maximo. X domina; Y usa
 * metade (a cena e mais larga que alta). Quanto mais ao fundo, menor o fator.
 */
export type ParallaxFactor = { x: number; y: number };

export const PARALLAX: Record<
  | 'portalBg'
  | 'frames'
  | 'inputFrameLeft'
  | 'inputFrameRight'
  | 'contentLeft'
  | 'contentRight',
  ParallaxFactor
> = {
  portalBg: { x: 10, y: 5 }, // video de fundo (mais profundo)
  frames: { x: 10, y: 1.5 }, // portal-hero.png travado: sem zoom e sem drift (centro vazado fixo, sem spoiler)
  inputFrameLeft: { x: 65, y: 20 }, // painel esquerdo: recua levemente na mesma direção do mouse
  inputFrameRight: { x: 65, y: 20 }, // painel direito: acompanha fluidamente o movimento do mouse
  contentLeft: { x: 15, y: 8.5 }, // texto do hero (atras dos inputs, deriva menos que a folhagem)
  contentRight: { x: 15, y: 8.5 }, // vitrine de cards
};

/** Cards da vitrine com videos dos buques. */
export type ShowcaseItem = {
  id: string;
  label: string;
  video: string;
};

export const SHOWCASE_ITEMS: readonly ShowcaseItem[] = [
  { id: 'bouquet-rosa', label: 'assistir vídeo', video: '/assets/cenas/hero/video-card-bouquet-rosa.mp4' },
  { id: 'bouquet-roxo', label: 'assistir vídeo', video: '/assets/cenas/hero/video-card-bouquet-roxo.mp4' },
  { id: 'bouquet-lirio-grande', label: 'assistir vídeo', video: '/assets/cenas/hero/video-card-bouquet-llirio-grande.mp4' },
  { id: 'bouquet-princesa-sapo', label: 'assistir vídeo', video: '/assets/cenas/hero/video-card-bouquet-princesa-sapo.mp4' },
] as const;
