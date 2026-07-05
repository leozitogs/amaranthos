'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { SHOWCASE_ITEMS, type ShowcaseItem } from './hero-data';
import { ShowcaseCard } from './ShowcaseCard';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ExpandedState = {
  item: ShowcaseItem;
  originRect: DOMRect;
};

type HeroShowcaseProps = {
  revealed: boolean;
  reduced: boolean;
};

/**
 * Coluna direita: vitrine de trabalhos em carrossel horizontal.
 *
 * Lightbox FLIP via Portal + GSAP: ao clicar no play, um overlay e criado via
 * createPortal no document.body. O card e posicionado exatamente sobre o card
 * original e GSAP anima suavemente ate o centro do viewport. O scrim e leve
 * (escurecido sem blur pesado) para os outros cards permanecerem visiveis.
 */
export function HeroShowcase({ revealed, reduced }: HeroShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<ExpandedState | null>(null);
  const [visible, setVisible] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  /** Guarda a timeline ativa para poder reverter. */
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const total = SHOWCASE_ITEMS.length;

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  // ----- Carrossel scroll -----

  const handleScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const children = Array.from(scroller.children) as HTMLElement[];
    let nearest = 0;
    let min = Infinity;
    children.forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - scroller.scrollLeft);
      if (distance < min) {
        min = distance;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const child = scroller.children[index] as HTMLElement | undefined;
      if (!child) return;
      scroller.scrollTo({ left: child.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
    },
    [reduced]
  );

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        e.stopPropagation();
        scroller.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // ----- Lightbox FLIP com GSAP -----

  const handlePlay = useCallback((item: ShowcaseItem, rect: DOMRect) => {
    setExpanded({ item, originRect: rect });
    setVisible(true);
  }, []);

  // ----- Animacao de abertura (timeline GSAP coreografada) -----
  useEffect(() => {
    if (!visible || !expanded) return;

    const raf = requestAnimationFrame(() => {
      const el = lightboxRef.current;
      const scrim = scrimRef.current;
      const closeBtn = closeRef.current;
      if (!el || !scrim) return;

      const { originRect } = expanded;

      // Tamanho alvo (9:16 vertical, limitado ao viewport)
      const targetW = Math.min(window.innerWidth * 0.75, 400);
      const targetH = targetW * (16 / 9);
      const clampedH = Math.min(targetH, window.innerHeight * 0.78);
      const clampedW = clampedH * (9 / 16);
      const centerX = window.innerWidth / 2 - clampedW / 2;
      const centerY = window.innerHeight / 2 - clampedH / 2;

      // Estado inicial: sobre o card original
      gsap.set(el, {
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: 24,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      });
      gsap.set(scrim, { opacity: 0 });
      if (closeBtn) gsap.set(closeBtn, { opacity: 0, scale: 0.5 });

      const tl = gsap.timeline();

      // Estagio 1: scrim escurece suavemente
      tl.to(scrim, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, 0);

      // Estagio 2: card expande ate o centro com curva suave
      tl.to(el, {
        top: centerY,
        left: centerX,
        width: clampedW,
        height: clampedH,
        borderRadius: 24,
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
        duration: 0.9,
        ease: 'power3.inOut',
      }, 0.05);

      // Estagio 3: botao de fechar entra com bounce
      if (closeBtn) {
        tl.to(closeBtn, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(2)',
        }, 0.7);
      }

      // Autoplay com audio no fim
      tl.call(() => {
        if (lightboxVideoRef.current) {
          const v = lightboxVideoRef.current;
          v.currentTime = 0;
          v.muted = false;
          v.play().catch(() => {});
        }
      }, [], 0.6);

      tlRef.current = tl;
    });

    return () => cancelAnimationFrame(raf);
  }, [visible, expanded]);

  // ----- Animacao de fechamento (timeline GSAP reversa) -----
  const closeLightbox = useCallback(() => {
    const el = lightboxRef.current;
    const scrim = scrimRef.current;
    const closeBtn = closeRef.current;
    if (!el || !scrim || !expanded) return;

    // Muta e pausa o video
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.muted = true;
      lightboxVideoRef.current.pause();
    }

    // Mata timeline pendente
    if (tlRef.current) tlRef.current.kill();

    const { originRect } = expanded;
    const tl = gsap.timeline({
      onComplete: () => {
        setExpanded(null);
        setVisible(false);
      },
    });

    // Botao some rapido
    if (closeBtn) {
      tl.to(closeBtn, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
        ease: 'power2.in',
      }, 0);
    }

    // Card retorna suavemente a posicao original
    tl.to(el, {
      top: originRect.top,
      left: originRect.left,
      width: originRect.width,
      height: originRect.height,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      duration: 0.7,
      ease: 'power3.inOut',
    }, 0.05);

    // Scrim desaparece junto
    tl.to(scrim, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    }, 0.15);
  }, [expanded]);

  // Escape fecha
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded, closeLightbox]);

  // ----- Variantes de entrada do carrossel -----

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  const dotsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // ----- Portal do lightbox -----

  const lightboxPortal =
    visible && expanded && portalTarget
      ? createPortal(
          <>
            {/* Scrim: escurecido mas sem blur pesado para os cards ficarem visiveis */}
            <div
              ref={scrimRef}
              onClick={closeLightbox}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                pointerEvents: 'auto',
                opacity: 0,
              }}
            />

            {/* Card expandido animado via GSAP */}
            <div
              ref={lightboxRef}
              style={{
                position: 'fixed',
                zIndex: 10001,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
                pointerEvents: 'auto',
              }}
            >
              <video
                ref={lightboxVideoRef}
                muted
                playsInline
                loop
                preload="auto"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              >
                <source src={expanded.item.video} type="video/mp4" />
              </video>

              {/* Botao fechar */}
              <button
                ref={closeRef}
                type="button"
                aria-label="Fechar vídeo"
                onClick={closeLightbox}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  color: '#fff',
                  cursor: 'pointer',
                  opacity: 0,
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)';
                }}
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>
          </>,
          portalTarget
        )
      : null;

  return (
    <>
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={revealed ? 'visible' : 'hidden'}
        className="w-full"
      >
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="relative flex h-[256px] snap-x snap-mandatory [scrollbar-width:none] items-end gap-5 overflow-x-auto pr-[2.6vw] pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {SHOWCASE_ITEMS.map((item, index) => (
            <motion.div key={item.id} variants={cardVariants} className="snap-start">
              <ShowcaseCard item={item} index={index} total={total} onPlay={handlePlay} />
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <motion.div
          variants={dotsVariants}
          className="mt-6 flex items-center gap-2"
          role="tablist"
          aria-label="Trabalhos do atelie"
        >
          {SHOWCASE_ITEMS.map((item, index) => {
            const current = index === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={current}
                aria-label={`Ir para o trabalho ${index + 1}`}
                onClick={() => goTo(index)}
                className="grid min-h-[24px] min-w-[24px] place-items-center focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-creme)] focus-visible:outline-none"
              >
                <span
                  aria-hidden
                  className="h-1 rounded-full transition-all duration-[var(--duration-normal)] [transition-timing-function:var(--ease-expo)]"
                  style={{
                    width: current ? 28 : 16,
                    backgroundColor: current ? 'var(--color-creme)' : 'rgba(253,247,241,0.30)',
                  }}
                />
              </button>
            );
          })}
        </motion.div>
      </motion.div>

      {lightboxPortal}
    </>
  );
}
