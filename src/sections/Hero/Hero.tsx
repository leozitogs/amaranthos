'use client';

import { useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/providers/LenisProvider';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { PARALLAX, SCENE_IMAGES } from './hero-data';
import { layerTransform } from './parallax-style';
import { usePointerParallax } from './usePointerParallax';
import { usePreloadImages } from './usePreloadImages';
import { HeroPortal } from './HeroPortal';
import { HeroFrames } from './HeroFrames';
import { HeroCopy } from './HeroCopy';
import { HeroShowcase } from './HeroShowcase';

/**
 * Hero | O Portal de Chenille (telas 1 e 2).
 *
 * Tela 1 (preloader): os frames cobrem o viewport ate os assets carregarem.
 * Tela 2 (pos-load): os frames recuam, revelam o portal e o conteudo assenta
 * com parallax de cursor. As telas 3 (zoom) e 4 (video + buque 3D) reaproveitam
 * a ancora `portal-anchor` e a saida coreografavel do conteudo, sem implementar
 * aqui.
 */
export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const ready = usePreloadImages(SCENE_IMAGES);
  const rootRef = useRef<HTMLDivElement>(null);
  const { stop, start } = useLenis();

  const [revealed, setRevealed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // reduced-motion entra direto no estado aberto; senao espera o preload.
  const opened = reduced || ready;

  // Sem cursor (touch): parallax desligado.
  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);

  // Trava o scroll durante o load. Reduced-motion nao trava e ja assenta.
  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      start();
      return;
    }
    stop();
  }, [reduced, stop, start]);

  // Libera o scroll quando o hero assenta e sinaliza a revelacao.
  useEffect(() => {
    if (revealed) {
      start();
      if (typeof window !== 'undefined') {
        (window as unknown as { __heroRevealed?: boolean }).__heroRevealed = true;
        window.dispatchEvent(new CustomEvent('hero-revealed'));
      }
    }
  }, [revealed, start]);

  const parallaxOn = revealed && !reduced && !isTouch;
  usePointerParallax(rootRef, parallaxOn);

  return (
    <section
      id="inicio"
      ref={rootRef}
      className="bg-creme relative h-[100svh] w-full overflow-hidden"
    >
      <HeroPortal />

      {/*
        Texto da esquerda: ATRAS dos inputs (z-25, abaixo do z-30 dos paineis).
        A folhagem dos inputs varre o texto com o parallax intenso, gerando
        leitura completa ou parcial conforme o cursor. Zona segura: a coluna do
        texto ocupa 618/1920 (32.1875%); o texto nunca invade o centro vazado do
        portal-hero (sem spoiler da proxima cena).
      */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[25] flex w-[32.1875vw] items-center pl-[12.5vw]">
        <div
          className="-mt-28.5 w-full"
          style={{ transform: layerTransform(PARALLAX.contentLeft) }}
        >
          <HeroCopy revealed={revealed} reduced={reduced} />
        </div>
      </div>

      <HeroFrames opened={opened} animate={!reduced} onOpened={() => setRevealed(true)} />

      {/*
        Cards da direita: ATRAS dos inputs (z-30), como solicitado.
        Zona segura: a extremidade esquerda dos cards comeca em 1404/1920
        (73.125%), nunca alcancando o centro do portal.
      */}
      <div className="pointer-events-none absolute inset-y-0 right-0 left-[71.125vw] z-[25] flex items-center">
        <div
          className="pointer-events-auto w-full -mt-45"
          style={{ transform: layerTransform(PARALLAX.contentRight) }}
        >
          <HeroShowcase revealed={revealed} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
