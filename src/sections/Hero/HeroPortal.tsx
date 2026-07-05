import Image from 'next/image';
import { HERO_VIDEO_POSTER, PARALLAX, PORTAL_BG } from './hero-data';
import { layerTransform } from './parallax-style';

/**
 * Moldura do portal e frame inicial do video (Fase 2).
 *
 * O video de fundo vive em HeroForest (Fases 3-4) com preload none, entao na
 * Fase 2 quem aparece atras do portal e o frame inicial extraido do video
 * (motion-hero-poster.jpg), leve e pronto de imediato. Camadas:
 *
 *   z-10 | poster do video (data-hero-layer="portal-backdrop"): fica atras do
 *          portal todo o tempo da Fase 2, visto pela abertura. Cruzafunde para
 *          o video quando o scroll dispara (storyteller, faixa videoFadeIn).
 *   z-20 | portal-hero.png: moldura estatica travada (sem zoom, sem parallax).
 *   z-20 | ancora data-hero-anchor="portal": ponto de origem do zoom da Fase 3.
 *
 * O poster usa a mesma escala e o mesmo parallax (portalBg) do <video> da
 * HeroForest, para que o cruzafundir poster -> video seja imperceptivel.
 *
 * HANDOFF -> scroll-storyteller: anima scale do data-hero-anchor="portal"
 *   (portalZoom), opacity do data-hero-layer="portal" (portalFade) e opacity do
 *   data-hero-layer="portal-backdrop" (sai junto com a entrada do video).
 */
export function HeroPortal() {
  return (
    <div className="absolute inset-0 overflow-hidden" data-hero-layer="portal">
      {/* z-10 | frame inicial do video atras do portal (profundidade pela abertura) */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ transform: layerTransform(PARALLAX.portalBg) }}
        data-hero-layer="portal-backdrop"
        aria-hidden
      >
        <Image
          src={HERO_VIDEO_POSTER}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </div>

      {/* z-20 | moldura do portal, travada (sem zoom e sem parallax na Fase 2) */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{ transform: layerTransform(PARALLAX.frames) }}
        aria-hidden
      >
        <div
          data-hero-layer="portal-frame"
          className="absolute inset-0 pointer-events-none w-full h-full"
          style={{ transformOrigin: 'center center' }}
        >
          <Image
            src={PORTAL_BG}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover"
          />
        </div>
      </div>

      {/* Ancora do zoom (Fase 3). Centro do buraco do portal. */}
      <div
        data-hero-anchor="portal"
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  );
}
