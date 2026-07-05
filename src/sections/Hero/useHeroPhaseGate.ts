'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { SCROLL_PHASES, SCROLL_SCENE } from './hero-data';

/**
 * Gate de fase: ScrollTrigger LEVE de toggle (sem scrub) que seta
 * data-hero-phase="forest" na section raiz quando o progresso cruza
 * SCROLL_PHASES.rest.start (p=0.55).
 *
 * NAO duplica o scrub do useHeroScrollCamera. Apenas dispara onEnter/onLeave
 * para sinalizar a fase ativa. O useForestPointerParallax observa esse
 * atributo via MutationObserver e liga/desliga o parallax de cursor.
 *
 * Calculo do trigger point:
 *   O pin consome PIN_HEIGHT_VH (130vh) a partir de top:top.
 *   p=0.55 corresponde a 55% de 130vh = 71.5vh do top da section.
 *   start: "top top" + 71.5vh = offset de 71.5% da altura da section.
 *
 * Monta apos hero-revealed (mesmo contrato do useHeroScrollCamera).
 */
export function useHeroPhaseGate(
  sectionRef: RefObject<HTMLElement | null>,
  reduced: boolean
): void {
  useEffect(() => {
    if (reduced) return;

    let cleanup: (() => void) | null = null;

    const init = () => {
      const section = sectionRef.current;
      if (!section) return;

      // Offset em px correspondente a p=0.55 dentro da zona pinada.
      // A section tem PIN_HEIGHT_VH de altura; usamos percentual direto.
      const phaseStart = SCROLL_PHASES.rest.start; // 0.55
      const pinHeightVh = SCROLL_SCENE.PIN_HEIGHT_VH; // 130

      // Ponto de entrada: top da section + (phaseStart * pinHeightVh)% da altura
      // Convertido para notacao GSAP: "top Xvh" onde X e o offset absoluto.
      const offsetVh = phaseStart * pinHeightVh; // 71.5vh

      const st = ScrollTrigger.create({
        trigger: section,
        // Unidade "%" (NAO "vh", que o ScrollTrigger trata como px no offset).
        // A section tem 100svh, entao X% da section == Xvh de scroll.
        // Inicia quando o top da section sobe offsetVh% (p=0.55 da zona pinada).
        start: `top+=${offsetVh}% top`,
        // Termina no fim da zona pinada (PIN_HEIGHT_VH% de scroll).
        end: `top+=${pinHeightVh}% top`,
        // Sem scrub: apenas toggle de estado
        onEnter: () => {
          section.setAttribute('data-hero-phase', 'forest');
        },
        onLeaveBack: () => {
          section.removeAttribute('data-hero-phase');
        },
        onLeave: () => {
          // Ao sair pelo fundo (scroll alem do hero): mantem forest ou remove
          // conforme a narrativa. O parallax cessa quando o hero sai de cena.
          section.removeAttribute('data-hero-phase');
        },
        onEnterBack: () => {
          section.setAttribute('data-hero-phase', 'forest');
        },
      });

      cleanup = () => {
        st.kill();
        // Limpa o atributo ao desmontar para nao deixar estado orfao
        section.removeAttribute('data-hero-phase');
      };
    };

    const win = window as unknown as { __heroRevealed?: boolean };
    if (win.__heroRevealed) {
      init();
    } else {
      window.addEventListener('hero-revealed', init, { once: true });
    }

    return () => {
      window.removeEventListener('hero-revealed', init);
      if (cleanup) cleanup();
    };
  }, [sectionRef, reduced]);
}
