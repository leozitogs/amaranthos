'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

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

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
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
