import Image from 'next/image';
import { FOREGROUND_FLOWERS, PARALLAX, PORTAL_BG } from './hero-data';
import { layerTransform } from './parallax-style';

/**
 * Fundo do hero: o portal estatico e revelado apos o load.
 * As flores desfocadas em primeiro plano criam efeito extra de profundidade (parallax).
 * A ancora `portal-anchor` marca o centro do buraco, ancora do zoom da tela 3.
 */
export function HeroPortal() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* z0 | Video de fundo congelado no frame 0 */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: layerTransform(PARALLAX.portalBg) }}
      >
        <video
          src="/assets/cenas/hero/motion-hero-4k.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />
      </div>

      {/* z10 | flores desfocadas atrás do portal (camada intermediária inferior) */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ transform: layerTransform(PARALLAX.portalDepth) }}
      >
        <Image
          src={FOREGROUND_FLOWERS}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="scale-115 object-cover"
        />
      </div>

      {/* z20 | moldura do portal de fundo, travada (sem zoom e sem parallax: PARALLAX.frames = 0). */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{ transform: layerTransform(PARALLAX.frames) }}
      >
        <Image
          src={PORTAL_BG}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
      </div>

      {/* Ancora do zoom (tela 3). Centro do buraco do portal. */}
      <div
        data-hero-anchor="portal"
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  );
}
