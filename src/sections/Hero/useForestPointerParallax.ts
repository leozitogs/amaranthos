'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Parallax de cursor da Fase 4 (cena floresta em repouso).
 *
 * Ativado por gatilho quando data-hero-phase="forest" aparece na section
 * raiz (setado pelo useHeroPhaseGate, sem scrub). Suspende automaticamente
 * ao sair da Fase 4 (atributo removido).
 *
 * Separacao de camadas (sem colisao com o scroll-storyteller):
 *   - video: o storyteller ja escreve apenas opacity nele. O parallax
 *     de cursor escreve transform via variaveis CSS --f4x/--f4y
 *     no elemento raiz da section, e cada camada de floresta aplica seu
 *     proprio fator via calc() no inline style. NAO toca nos wrappers que
 *     o storyteller controla.
 *
 * Fatores (px de deslocamento maximo, art-director):
 *   video  {x:12, y:6}   | fundo mais profundo, deriva mais
 *
 * O movimento e amortecido por LERP (mesmo mecanismo do usePointerParallax).
 * GSAP executa o tween com expo.out para microinteracao suave conforme marca.
 *
 * Desligado em:
 *   - reduced-motion (param `enabled`)
 *   - touch / sem cursor (param `enabled`)
 *   - fora da Fase 4 (observa atributo data-hero-phase via MutationObserver)
 */

const LERP_FACTOR = 0.08;

type ForestParallaxRefs = {
  /** Section raiz (data-hero-scroll-root): onde o phase gate seta o atributo. */
  section: RefObject<HTMLElement | null>;
};

export function useForestPointerParallax(refs: ForestParallaxRefs, enabled: boolean): void {
  useEffect(() => {
    const section = refs.section.current;

    if (!section) return;

    // Captura local apos o guard: TypeScript nao pode estreitar o tipo dentro
    // de closures aninhadas, mas apos a atribuicao para uma const ele garante
    // que nao e null dentro deste escopo do effect.
    const sectionEl: HTMLElement = section;

    // Estado de lerp (posicao atual suavizada)
    const current = { x: 0, y: 0 };
    const targetPos = { x: 0, y: 0 };
    let frameId = 0;
    let active = false;

    /** Reseta as camadas para posicao neutra via GSAP (expo.out, 400ms). */
    function resetAll() {
      // Variaveis CSS para video
      gsap.to(sectionEl, {
        '--f4x': 0,
        '--f4y': 0,
        duration: 0.4,
        ease: 'expo.out',
        overwrite: 'auto',
      });
      current.x = 0;
      current.y = 0;
      targetPos.x = 0;
      targetPos.y = 0;
    }

    function onPointerMove(e: PointerEvent) {
      // Normaliza -1..1 a partir do centro do viewport
      targetPos.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetPos.y = (e.clientY / window.innerHeight) * 2 - 1;
    }

    function tick() {
      if (!active) return;

      current.x += (targetPos.x - current.x) * LERP_FACTOR;
      current.y += (targetPos.y - current.y) * LERP_FACTOR;

      // Video: variaveis CSS normalizadas consumidas pelos inline styles
      sectionEl.style.setProperty('--f4x', current.x.toFixed(4));
      sectionEl.style.setProperty('--f4y', current.y.toFixed(4));

      frameId = requestAnimationFrame(tick);
    }

    function startParallax() {
      if (active) return;
      active = true;
      frameId = requestAnimationFrame(tick);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    function stopParallax() {
      if (!active) return;
      active = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      resetAll();
    }

    // Se desabilitado (touch ou reduced-motion), garante reset e encerra.
    if (!enabled) {
      resetAll();
      return;
    }

    // Verifica o estado inicial do atributo de fase
    const isForestPhase = () => sectionEl.getAttribute('data-hero-phase') === 'forest';

    if (isForestPhase()) {
      startParallax();
    }

    // Observa mudancas no atributo data-hero-phase
    const observer = new MutationObserver(() => {
      if (isForestPhase()) {
        startParallax();
      } else {
        stopParallax();
      }
    });

    observer.observe(sectionEl, {
      attributes: true,
      attributeFilter: ['data-hero-phase'],
    });

    return () => {
      observer.disconnect();
      stopParallax();
      // Mata tweens GSAP pendentes nas camadas controladas por este hook
      gsap.killTweensOf(sectionEl, '--f4x');
      gsap.killTweensOf(sectionEl, '--f4y');
    };
  }, [refs, enabled]);
}
