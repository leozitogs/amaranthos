'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SHOWCASE_ITEMS } from './hero-data';
import { ShowcaseCard } from './ShowcaseCard';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type HeroShowcaseProps = {
  revealed: boolean;
  reduced: boolean;
};

/**
 * Coluna direita: vitrine de trabalhos em carrossel horizontal. Usa scroll com
 * snap (swipe nativo no touch) e dots para navegar. Cards placeholder ate a
 * curadoria entregar os videos reais.
 *
 * Dots: pilulas finas (h-1 / 4px), rounded-full.
 *   Inativo: 16px de largura, creme a 30%.
 *   Ativo: 28px de largura, creme opaco.
 *   Botao clicavel com area de toque minima de 24px (grid place-items-center).
 *   Pilula visual em <span aria-hidden>.
 *
 * max-w-[390px]: com cards de 190px e gap 20px o terceiro card sangra (~400px),
 * mantendo a sensacao de carrossel.
 */
export function HeroShowcase({ revealed, reduced }: HeroShowcaseProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = SHOWCASE_ITEMS.length;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : -24, scale: reduced ? 1 : 0.98 }}
      animate={
        revealed
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: reduced ? 0 : -24, scale: reduced ? 1 : 0.98 }
      }
      transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
      className="w-full"
    >
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="relative flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {SHOWCASE_ITEMS.map((item, index) => (
          <div key={item.id} className="snap-start">
            <ShowcaseCard item={item} index={index} total={total} />
          </div>
        ))}
      </div>

      {/* Dots: pilulas finas com area de toque acessivel */}
      <div className="mt-6 flex items-center gap-2" role="tablist" aria-label="Trabalhos do atelie">
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
              {/* Pilula visual: 4px de altura, rounded-full */}
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
      </div>
    </motion.div>
  );
}
