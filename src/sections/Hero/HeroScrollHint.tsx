'use client';

import { motion } from 'framer-motion';

/**
 * Indicador de scroll (Fase 2, base centro). z-[28] relativo ao Hero.
 *
 * Aparece apos o portal ser revelado. O div raiz (data-hero-layer="scroll-hint")
 * NAO e animado por este componente: o scroll-storyteller escreve opacity e
 * translateY nele durante uiExit (p 0.0->0.12). Qualquer animacao no raiz
 * colidiria com esse transform.
 *
 * Acessibilidade:
 *   Botão interativo com aria-label adequado para navegação.
 *
 * Tipografia: Poppins 11px peso 500, cor Creme #FDF7F1, tracking 0.16em,
 *   uppercase (brand-kit).
 *
 */

type HeroScrollHintProps = {
  pulsing: boolean;
};

/** Variantes de entrada do componente inteiro (fade inicial, delay apos conteudo assentar). */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.6,
    },
  },
};

export function HeroScrollHint({ pulsing: _pulsing }: HeroScrollHintProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('hero-trigger-forward'));
  };

  return (
    <motion.div
      className="pointer-events-none absolute bottom-12 left-1/2 z-[28] -translate-x-1/2"
      data-hero-layer="scroll-hint"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <button
        onClick={handleClick}
        aria-label="Entre por aqui"
        className="pointer-events-auto cursor-pointer group relative flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-2.5 transition-all duration-300 ease-out hover:scale-105 hover:bg-white hover:border-white hover:text-black hover:mix-blend-screen active:scale-95"
      >
        <span
          className="font-[family-name:var(--font-poppins)] font-medium text-[11px] uppercase tracking-[0.16em] text-[rgba(253,247,241,0.92)] transition-colors duration-300 ease-out group-hover:text-black"
        >
          entre por aqui
        </span>
      </button>
    </motion.div>
  );
}
