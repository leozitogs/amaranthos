'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useLenis } from '@/components/providers/LenisProvider';
import type { HeroScrollSceneHandle } from './HeroScrollScene';
import type { RefObject } from 'react';

// ---------------------------------------------------------------------------
// Tipos auxiliares
// ---------------------------------------------------------------------------

type HeroRefs = {
  /** <section data-hero-scroll-root> */
  section: RefObject<HTMLElement | null>;
  /** Handle com root/video preenchidos apos mount da cena. */
  scene: RefObject<HeroScrollSceneHandle>;
};

// ---------------------------------------------------------------------------
// Estado final da Fase 4 (reduced-motion): aplicado sem ScrollTrigger
// ---------------------------------------------------------------------------

function applyReducedMotionFinalState(section: HTMLElement, scene: HeroScrollSceneHandle): void {
  // UI sai de cena (opacity 0, traduzida para cima)
  const uiLeft = section.querySelector<HTMLElement>('[data-hero-layer="ui-left"]');
  const uiRight = section.querySelector<HTMLElement>('[data-hero-layer="ui-right"]');
  const scrollHint = section.querySelector<HTMLElement>('[data-hero-layer="scroll-hint"]');
  const portal = section.querySelector<HTMLElement>('[data-hero-layer="portal"]');

  for (const el of [uiLeft, uiRight, scrollHint]) {
    if (!el) continue;
    el.style.opacity = '0';
    el.style.transform = 'translateY(-24px)';
  }

  if (portal) {
    portal.style.opacity = '0';
  }

  const frames = section.querySelector<HTMLElement>('[data-hero-layer="frames"]');
  if (frames) {
    frames.style.display = 'none';
  }

  // Floresta visivel
  if (scene.video) {
    scene.video.style.opacity = '1';
  }

  const portalBackdrop = section.querySelector<HTMLElement>('[data-hero-layer="portal-backdrop"]');
  if (portalBackdrop) {
    portalBackdrop.style.opacity = '0';
  }

  const forestUi = section.querySelector<HTMLElement>('[data-hero-layer="forest-ui"]');
  if (forestUi) {
    forestUi.style.display = '';
    forestUi.style.opacity = '1';
    forestUi.style.transform = 'translateY(0px)';
    forestUi.style.pointerEvents = 'auto';
  }


}

// ---------------------------------------------------------------------------
// Hook principal
// ---------------------------------------------------------------------------

/**
 * useHeroScrollCamera
 *
 * Controla a transicao de zoom das Fases 2 para as Fases 3-4 do Hero.
 * Ao detectar o primeiro evento de rolagem, trava o scroll e dispara
 * a animacao de zoom em duas fases (lento no comeco, aceleracao drastica
 * quando se aproxima de 200% de escala) ate revelar a floresta e o buque.
 */
export function useHeroScrollCamera(refs: HeroRefs, reduced: boolean): void {
  const { stop, start } = useLenis();

  useEffect(() => {
    if (reduced) {
      const section = refs.section.current;
      const scene = refs.scene.current;
      if (section && scene.video !== null) {
        applyReducedMotionFinalState(section, scene);
      }
      return;
    }

    let cleanupDownward: (() => void) | null = null;
    let cleanupUpward: (() => void) | null = null;
    let timerId: number | null = null;
    let tl: gsap.core.Timeline | null = null;

    const init = () => {
      const section = refs.section.current;
      if (!section) return;

      const uiLeft = section.querySelector<HTMLElement>('[data-hero-layer="ui-left"]');
      const uiRight = section.querySelector<HTMLElement>('[data-hero-layer="ui-right"]');
      const scrollHint = section.querySelector<HTMLElement>('[data-hero-layer="scroll-hint"]');
      const portal = section.querySelector<HTMLElement>('[data-hero-layer="portal"]');
      const portalFrame = section.querySelector<HTMLElement>('[data-hero-layer="portal-frame"]');
      const portalBackdrop = section.querySelector<HTMLElement>('[data-hero-layer="portal-backdrop"]');
      const frames = section.querySelector<HTMLElement>('[data-hero-layer="frames"]');
      const videoEl = refs.scene.current.video;
      const videoReversedEl = refs.scene.current.videoReversed;
      const forestUi = section.querySelector<HTMLElement>('[data-hero-layer="forest-ui"]');

      if (portalFrame) portalFrame.style.transformOrigin = 'center center';
      if (frames) frames.style.transformOrigin = 'center center';

      let animating = false;
      let inForest = false;

      const buildTimeline = () => {
        tl = gsap.timeline({
          paused: true,
          onComplete: () => {
            // Define o estado ativo para o parallax de cursor
            section.setAttribute('data-hero-phase', 'forest');

            // Oculta os elementos que ja deram zoom para liberar eventos do mouse
            if (portal) portal.style.display = 'none';
            if (uiLeft) uiLeft.style.display = 'none';
            if (uiRight) uiRight.style.display = 'none';
            if (scrollHint) scrollHint.style.display = 'none';
            if (frames) frames.style.display = 'none';

            // Stacking: a floresta de chenille assume a frente dos inputs
            if (frames) frames.style.zIndex = '10';
            const sceneRoot = refs.scene.current.root;
            if (sceneRoot) sceneRoot.style.zIndex = '20';

            // Garante o estado final estavel do video
            if (videoEl) {
              videoEl.style.opacity = '1';
            }
            if (videoReversedEl) {
              videoReversedEl.style.opacity = '0';
              videoReversedEl.pause();
            }

            // Garante o estado final do forestUi
            if (forestUi) {
              forestUi.style.opacity = '1';
              forestUi.style.transform = 'translateY(0px)';
              forestUi.style.pointerEvents = 'auto';
            }

            animating = false;
            inForest = true;

            // Libera o scroll para futuras secoes da pagina
            start();

            // Ativa os listeners para o scroll reverso
            setupUpwardListeners();
          },
        });

        // ----------------------------------------------------
        // FASE 1: Zoom imersivo inicialmente lento (0.0s -> 1.5s)
        // ----------------------------------------------------
        tl.to(
          portalFrame,
          {
            scale: 1.95,
            duration: 1.5,
            ease: 'power1.in',
          },
          0
        );

        tl.to(
          frames,
          {
            scale: 1.95,
            duration: 1.5,
            ease: 'power1.in',
          },
          0
        );

        if (uiLeft) {
          tl.to(
            uiLeft,
            {
              x: '-5vw',
              scale: 1.3,
              opacity: 0.5,
              duration: 1.5,
              ease: 'power1.in',
            },
            0
          );
        }

        if (uiRight) {
          tl.to(
            uiRight,
            {
              x: '5vw',
              scale: 1.3,
              opacity: 0.5,
              duration: 1.5,
              ease: 'power1.in',
            },
            0
          );
        }

        if (scrollHint) {
          tl.to(
            scrollHint,
            {
              y: '30px',
              scale: 1.2,
              opacity: 0.3,
              duration: 1.5,
              ease: 'power1.in',
            },
            0
          );
        }

        // ----------------------------------------------------
        // FASE 2: Aceleracao drastica do zoom (1.5s -> 2.4s)
        // ----------------------------------------------------
        tl.to(
          portalFrame,
          {
            scale: 12.0,
            opacity: 0,
            duration: 0.9,
            ease: 'power4.in',
          },
          1.5
        );

        tl.to(
          frames,
          {
            scale: 12.0,
            opacity: 0,
            duration: 0.9,
            ease: 'power4.in',
          },
          1.5
        );

        if (uiLeft) {
          tl.to(
            uiLeft,
            {
              x: '-45vw',
              scale: 3.5,
              opacity: 0,
              duration: 0.9,
              ease: 'power4.in',
            },
            1.5
          );
        }

        if (uiRight) {
          tl.to(
            uiRight,
            {
              x: '45vw',
              scale: 3.5,
              opacity: 0,
              duration: 0.9,
              ease: 'power4.in',
            },
            1.5
          );
        }

        if (scrollHint) {
          tl.to(
            scrollHint,
            {
              y: '120px',
              scale: 2.0,
              opacity: 0,
              duration: 0.9,
              ease: 'power4.in',
            },
            1.5
          );
        }

        // Desbota o frame de fallback estacionario atras do portal
        if (portalBackdrop) {
          tl.to(
            portalBackdrop,
            {
              opacity: 0,
              duration: 0.9,
              ease: 'power2.out',
            },
            1.5
          );
        }

        // Cross-fade do video e play (inicia com a aceleracao do zoom)
        if (videoEl) {
          const videoState = { opacity: 0 };
          tl.to(
            videoState,
            {
              opacity: 1,
              duration: 0.9,
              ease: 'power2.out',
              onUpdate: () => {
                const currentOpacity = videoState.opacity;
                if (tl?.reversed()) {
                  if (videoReversedEl) videoReversedEl.style.opacity = String(currentOpacity);
                  if (videoEl) videoEl.style.opacity = '0';
                } else {
                  if (videoEl) videoEl.style.opacity = String(currentOpacity);
                  if (videoReversedEl) videoReversedEl.style.opacity = '0';
                }
              },
              onStart: () => {
                if (!tl?.reversed()) {
                  if (videoReversedEl) videoReversedEl.pause();
                  videoEl.currentTime = 0;
                  videoEl.play().catch(() => { });
                }
              },
            },
            1.5
          );
        }

        // Entrada da UI pos-scroll na floresta (copy + CTAs)
        if (forestUi) {
          tl.to(
            forestUi,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              onStart: () => {
                forestUi.style.pointerEvents = 'auto';
              },
            },
            2.3
          );
        }
      };

      const triggerForward = () => {
        if (animating || inForest) return;
        animating = true;

        if (cleanupDownward) {
          cleanupDownward();
        }

        // Trava o scroll durante a transicao
        stop();

        if (!tl) {
          buildTimeline();
        }

        // Torna o forestUi visivel (caso tenha sido ocultado pelo display = none)
        if (forestUi) {
          forestUi.style.display = '';
        }

        tl?.play();
      };

      const triggerBackward = () => {
        console.log('[triggerBackward] Started, animating:', animating, 'inForest:', inForest);
        if (animating || !inForest) return;
        animating = true;

        if (cleanupUpward) {
          cleanupUpward();
        }

        // Trava o scroll durante a transicao
        stop();

        // Remove o estado do parallax de cursor
        section.removeAttribute('data-hero-phase');

        // Mata a timeline forward (nao reusar via reverse)
        if (tl) {
          tl.kill();
          tl = null;
        }

        // Desativa clique no forestUi
        if (forestUi) {
          forestUi.style.pointerEvents = 'none';
        }

        console.log('[triggerBackward] videoEl:', videoEl, 'videoReversedEl:', videoReversedEl);

        // ==================================================================
        // FASE 1: Cross-fade para video reverso + copy some
        // O video reverso toca ATE O FIM antes de disparar a Fase 2
        // ==================================================================

        // Imperativo: garante estado correto antes de qualquer tween
        if (videoEl) {
          gsap.set(videoEl, { opacity: 1 });
          videoEl.pause();
        }
        if (videoReversedEl) {
          gsap.set(videoReversedEl, { opacity: 0 });
          try {
            videoReversedEl.currentTime = 0;
            console.log('[triggerBackward] Set currentTime = 0 successfully');
          } catch (e) {
            console.error('[triggerBackward] Failed to set currentTime = 0:', e);
          }
          console.log('[triggerBackward] Playing videoReversedEl...');
          videoReversedEl.play()
            .then(() => {
              console.log('[triggerBackward] videoReversedEl playing started successfully');
            })
            .catch((err) => {
              console.error('[triggerBackward] videoReversedEl play failed:', err);
            });
        }

        const tlPhase1 = gsap.timeline();

        // Cross-fade: video normal sai, video reverso entra
        if (videoEl) {
          tlPhase1.to(
            videoEl,
            { opacity: 0, duration: 0.8, ease: 'power2.inOut' },
            0
          );
        }
        if (videoReversedEl) {
          tlPhase1.to(
            videoReversedEl,
            { opacity: 1, duration: 0.8, ease: 'power2.inOut' },
            0
          );
        }

        // Copy/CTAs do forest-ui descem e somem junto com o cross-fade
        if (forestUi) {
          tlPhase1.to(
            forestUi,
            { opacity: 0, y: 40, duration: 0.7, ease: 'power3.inOut' },
            0.3
          );
        }

        // ==================================================================
        // FASE 2: Disparada quando o video reverso TERMINA
        // Fade out do video reverso + portal zoom back + UI retorna
        // ==================================================================
        const startPhase2 = () => {
          console.log('[triggerBackward] startPhase2 invoked!');
          // Restaura elementos ocultos antes do zoom reverso
          if (portal) portal.style.display = '';
          if (uiLeft) uiLeft.style.display = '';
          if (uiRight) uiRight.style.display = '';
          if (scrollHint) scrollHint.style.display = '';
          if (frames) frames.style.display = '';

          // Restaura o empilhamento original
          if (frames) frames.style.zIndex = '';
          const sceneRoot = refs.scene.current.root;
          if (sceneRoot) sceneRoot.style.zIndex = '';

          const tlPhase2 = gsap.timeline({
            onComplete: () => {
              console.log('[triggerBackward] tlPhase2 onComplete');
              // Pausa ambos os videos
              if (videoEl) {
                videoEl.pause();
                videoEl.style.opacity = '0';
              }
              if (videoReversedEl) {
                videoReversedEl.pause();
                videoReversedEl.style.opacity = '0';
              }

              // Reseta o forestUi
              if (forestUi) {
                forestUi.style.display = 'none';
                forestUi.style.opacity = '0';
                forestUi.style.transform = 'translateY(40px)';
                forestUi.style.pointerEvents = 'none';
              }

              animating = false;
              inForest = false;

              // Libera o scroll
              start();

              // Re-ativa os listeners de descida
              setupDownwardListeners();
            },
          });

          // Fade out do video reverso (0s)
          if (videoReversedEl) {
            tlPhase2.to(
              videoReversedEl,
              { opacity: 0, duration: 0.8, ease: 'power2.in' },
              0
            );
          }

          // Portal backdrop volta (0s)
          if (portalBackdrop) {
            tlPhase2.to(
              portalBackdrop,
              { opacity: 1, duration: 0.8, ease: 'power2.out' },
              0
            );
          }

          // Portal frame e frames voltam do zoom (0s)
          tlPhase2.to(
            portalFrame,
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
            0
          );
          tlPhase2.to(
            frames,
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
            0
          );

          // UI esquerda retorna (0.3s)
          if (uiLeft) {
            tlPhase2.to(
              uiLeft,
              { x: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
              0.3
            );
          }

          // UI direita retorna (0.3s)
          if (uiRight) {
            tlPhase2.to(
              uiRight,
              { x: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
              0.3
            );
          }

          // Scroll hint retorna (0.5s)
          if (scrollHint) {
            tlPhase2.to(
              scrollHint,
              { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
              0.5
            );
          }
        };

        // Escuta o evento ended do video reverso para disparar a Fase 2
        if (videoReversedEl) {
          console.log('[triggerBackward] Adding ended listener to videoReversedEl');
          const endedHandler = () => {
            console.log(
              '[triggerBackward] ended event received. currentTime:',
              videoReversedEl.currentTime,
              'duration:',
              videoReversedEl.duration
            );
            if (videoReversedEl.currentTime < 0.5) {
              console.log('[triggerBackward] Ignored ended event due to race condition.');
              return;
            }
            videoReversedEl.removeEventListener('ended', endedHandler);
            startPhase2();
          };
          videoReversedEl.addEventListener('ended', endedHandler);
        } else {
          console.log('[triggerBackward] videoReversedEl is null, calling startPhase2 immediately');
          // Fallback: sem video reverso, dispara imediatamente
          startPhase2();
        }
      };

      const setupDownwardListeners = () => {
        if (cleanupDownward) cleanupDownward();
        if (cleanupUpward) cleanupUpward();

        const handleWheel = (e: WheelEvent) => {
          if (e.deltaY > 0) {
            e.preventDefault();
            triggerForward();
          }
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
          const touch = e.touches[0];
          if (touch) {
            touchStartY = touch.clientY;
          }
        };

        const handleTouchMove = (e: TouchEvent) => {
          const touch = e.touches[0];
          if (touch) {
            const touchEndY = touch.clientY;
            if (touchStartY - touchEndY > 10) {
              e.preventDefault();
              triggerForward();
            }
          }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
            triggerForward();
          }
        };

        const handleScroll = () => {
          if (window.scrollY > 2) {
            triggerForward();
          }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('keydown', handleKeyDown, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('hero-trigger-forward', triggerForward);

        cleanupDownward = () => {
          window.removeEventListener('wheel', handleWheel);
          window.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('hero-trigger-forward', triggerForward);
          cleanupDownward = null;
        };
      };

      const setupUpwardListeners = () => {
        if (cleanupDownward) cleanupDownward();
        if (cleanupUpward) cleanupUpward();

        const handleWheel = (e: WheelEvent) => {
          if (e.deltaY < 0) {
            e.preventDefault();
            triggerBackward();
          }
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
          const touch = e.touches[0];
          if (touch) {
            touchStartY = touch.clientY;
          }
        };

        const handleTouchMove = (e: TouchEvent) => {
          const touch = e.touches[0];
          if (touch) {
            const touchEndY = touch.clientY;
            if (touchEndY - touchStartY > 10) {
              e.preventDefault();
              triggerBackward();
            }
          }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            triggerBackward();
          }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('keydown', handleKeyDown, { passive: true });

        cleanupUpward = () => {
          window.removeEventListener('wheel', handleWheel);
          window.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('keydown', handleKeyDown);
          cleanupUpward = null;
        };
      };

      // Aguarda a entrada pos-load assentar antes de liberar a transicao
      const INTRO_RELEASE_MS = 1200;
      timerId = window.setTimeout(() => {
        setupDownwardListeners();
      }, INTRO_RELEASE_MS);
    };

    const win = window as unknown as { __heroRevealed?: boolean };
    if (win.__heroRevealed) {
      init();
    } else {
      window.addEventListener('hero-revealed', init, { once: true });
    }

    return () => {
      window.removeEventListener('hero-revealed', init);
      if (timerId) window.clearTimeout(timerId);
      if (cleanupDownward) cleanupDownward();
      if (cleanupUpward) cleanupUpward();
      if (tl) tl.kill();
    };
  }, [refs, reduced, stop, start]);
}
