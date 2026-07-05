'use client';

import { useEffect, useRef } from 'react';
import { HeroForest, type HeroForestHandle } from './HeroForest';
import { SCROLL_SCENE } from './hero-data';

/**
 * Wrapper pinavel da cena cinematografica (Fase 3).
 *
 * Refs encaminhados via HeroScrollSceneHandle:
 *   root            -> scroll-storyteller: querySelector do container pinavel.
 *   video           -> scroll-storyteller: controla play/pause do video de avanço.
 *   videoReversed   -> scroll-storyteller: controla play/pause do video reverso.
 */
export type HeroScrollSceneHandle = {
  root: HTMLDivElement | null;
  video: HTMLVideoElement | null;
  videoReversed?: HTMLVideoElement | null;
};

type HeroScrollSceneProps = {
  sceneRef: React.RefObject<HeroScrollSceneHandle>;
};

export function HeroScrollScene({ sceneRef }: HeroScrollSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const forestRef = useRef<HeroForestHandle>(null);

  // Sincroniza o handle apos o mount, quando os refs DOM ja estao preenchidos.
  useEffect(() => {
    const handle = sceneRef as React.MutableRefObject<HeroScrollSceneHandle>;
    handle.current = {
      root: rootRef.current,
      video: forestRef.current?.video || null,
      videoReversed: forestRef.current?.videoReversed || null,
    };
  }, [sceneRef]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-x-0 top-0"
      style={{ height: `${SCROLL_SCENE.PIN_HEIGHT_VH}vh` }}
      data-hero-scroll-scene
      aria-hidden
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* z-0: floresta (videos oficial e reverso) */}
        <HeroForest ref={forestRef} />
      </div>
    </div>
  );
}
