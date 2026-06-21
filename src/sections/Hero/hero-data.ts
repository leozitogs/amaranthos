/**
 * Configuracao da cena do hero (telas 1 e 2). Numeros isolados aqui para a PO
 * e o art-director afinarem sem mexer na logica dos componentes.
 */

/** Assets precarregados antes de abrir o portal (preloader da tela 1). */
export const SCENE_IMAGES = [
  '/assets/cenas/load/left-input.png',
  '/assets/cenas/load/right-input.png',
  '/assets/cenas/hero/portal-hero.png',
  '/assets/cenas/hero/flores-desfocadas.png',
] as const;

/** Portal de fundo (estatico para a tela 2). */
export const PORTAL_BG = '/assets/cenas/hero/portal-hero.png';

/** Flores desfocadas em primeiro plano para efeito extra de profundidade. */
export const FOREGROUND_FLOWERS = '/assets/cenas/hero/flores-desfocadas.png';

/** Video de fundo (mantido para referencia, nao usado na Tela 2). */
export const HERO_VIDEO = '/assets/cenas/hero/motion-hero-4k.mp4';

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
const rightOpenLeftEdgeVw = (900 / REF_WIDTH) * 100; // 46.875vw

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
  'portalBg' | 'portalDepth' | 'frames' | 'inputFrames' | 'contentLeft' | 'contentRight' | 'bokeh',
  ParallaxFactor
> = {
  portalBg: { x: 10, y: 5 }, // video de fundo (mais profundo)
  portalDepth: { x: 20, y: 10 }, // flores-desfocadas (atras do portal, da profundidade no buraco)
  frames: { x: 10, y: 1.5 }, // portal-hero.png travado: sem zoom e sem drift (centro vazado fixo, sem spoiler)
  inputFrames: { x: 80, y: 40 }, // left-input.png e right-input.png: parallax intenso, a folhagem varre o texto
  contentLeft: { x: 15, y: 8.5 }, // texto do hero (atras dos inputs, deriva menos que a folhagem)
  contentRight: { x: 30, y: 16.5 }, // vitrine de cards
  bokeh: { x: 56, y: 28 }, // bokeh extra (se usado)
};

/** Cards placeholder da vitrine (substituidos pelos trabalhos reais depois). */
export type ShowcaseItem = {
  id: string;
  label: string;
  image: string;
};

export const SHOWCASE_ITEMS: readonly ShowcaseItem[] = [
  { id: 'trabalho-01', label: 'assistir vídeo', image: '/assets/bouquets/pequeno-afeto.png' },
  { id: 'trabalho-02', label: 'assistir vídeo', image: '/assets/bouquets/primeiro-sorriso.png' },
  { id: 'trabalho-03', label: 'assistir vídeo', image: '/assets/bouquets/doce-primavera.png' },
  { id: 'trabalho-04', label: 'assistir vídeo', image: '/assets/bouquets/modelo-amaranthos.png' },
] as const;
