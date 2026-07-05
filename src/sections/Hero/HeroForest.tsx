'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { HERO_VIDEO_OFFICIAL, HERO_VIDEO_REVERSED, HERO_VIDEO_POSTER, PARALLAX } from './hero-data';

/**
 * Camada de fundo da cena da floresta (Fase 3).
 * Exibe tanto o vídeo de avanço quanto o vídeo reverso para transições bidirecionais suaves.
 */
const F4_VIDEO = { x: 12, y: 6 };

export type HeroForestHandle = {
  video: HTMLVideoElement | null;
  videoReversed: HTMLVideoElement | null;
};

export const HeroForest = forwardRef<HeroForestHandle>(function HeroForest(_props, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoReversedRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    get video() {
      return videoRef.current;
    },
    get videoReversed() {
      return videoReversedRef.current;
    },
  }));

  return (
    <div className="pointer-events-none absolute inset-0" data-hero-layer="forest" aria-hidden>
      {/* z-0 | videos oficial e reverso da floresta */}
      <div
        className="absolute inset-0 z-0"
        data-hero-layer="video"
        style={{
          transform: `translate3d(
            calc(var(--mx, 0) * ${PARALLAX.portalBg.x}px + var(--f4x, 0) * ${F4_VIDEO.x}px),
            calc(var(--my, 0) * ${PARALLAX.portalBg.y}px + var(--f4y, 0) * ${F4_VIDEO.y}px),
            0
          )`,
        }}
      >
        {/* Video Oficial (Avanço) - Sem Loop */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={HERO_VIDEO_POSTER}
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ opacity: 0 }}
          data-hero-video
        >
          <source src={HERO_VIDEO_OFFICIAL} type="video/mp4" />
        </video>

        {/* Video Reverso (Retorno) - Sem Loop */}
        <video
          ref={videoReversedRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ opacity: 0 }}
          data-hero-video-reversed
        >
          <source src={HERO_VIDEO_REVERSED} type="video/mp4" />
        </video>
      </div>
    </div>
  );
});
