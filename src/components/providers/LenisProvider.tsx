'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from '@/lib/gsap';

type LenisContextValue = {
  /** Trava o scroll (usado pelo hero durante o load). */
  stop: () => void;
  /** Libera o scroll (usado quando o hero assenta). */
  start: () => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

/**
 * Smooth scroll global da Amaranthos. Mantem uma unica instancia de Lenis com
 * o loop de rAF e expoe stop/start para as secoes que precisam travar o scroll
 * (o hero trava durante o preloader e libera na revelacao).
 *
 * Integracao com GSAP ScrollTrigger:
 *   O Lenis rola o window nativo (sem wrapper/content customizados), portanto o
 *   ScrollTrigger usa o scroller nativo sem necessidade de scrollerProxy.
 *   A ordem de update por frame e: lenis.raf() -> evento 'scroll' emitido pelo
 *   Lenis -> ScrollTrigger.update() le a posicao real do window.
 *   Um unico loop RAF (requestAnimationFrame) dirige tudo; nao ha segundo loop.
 *
 *   Quando o Lenis esta stopped (hero em preload), o window nao avanca, entao
 *   ScrollTrigger.update() reflete a posicao real (0) sem avancar o progresso do
 *   pin. O comportamento de lock/unlock e transparente para o ScrollTrigger.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [value] = useState<LenisContextValue>(() => ({
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  }));

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    /*
      O evento 'scroll' do Lenis dispara apos cada lenis.raf(), garantindo que o
      ScrollTrigger.update() sempre le a posicao ja processada pelo smooth scroll.
      Nao usamos gsap.ticker nem um RAF separado: o loop abaixo e o unico relogio.
      Tipagem () => void: compativel com o on(event, callback: Function) do pacote
      sem acionar a regra ban-types do ESLint.
    */
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      lenis.off('scroll', onScroll);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

/** Acesso ao controle do smooth scroll. Seguro fora do provider (no-op). */
export function useLenis(): LenisContextValue {
  return (
    useContext(LenisContext) ?? {
      stop: () => {},
      start: () => {},
    }
  );
}
