'use client';

import { motion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type HeroCopyForestProps = {
  revealed: boolean;
  reduced: boolean;
};

/**
 * Bloco de Copy e CTAs pós-scroll (Fase 4 - Floresta).
 * Apresenta o headline "SEU BUQUÊ, DO SEU JEITO" e as opções de CTA.
 * Ajustado para remover a isologo, alinhar os botões em linha única com mesma proporção,
 * trocar os elementos verdes para branco, e adicionar sombra flutuante nas letras.
 */
export function HeroCopyForest({ revealed, reduced }: HeroCopyForestProps) {
  const container: Variants = {
    hide: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const item: Variants = {
    hide: { opacity: 0, y: reduced ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const handleCatalogClick = () => {
    window.dispatchEvent(new CustomEvent('hero-trigger-forward'));
  };

  // Sombra desfocada escura para criar o efeito de letras flutuantes e otimizar legibilidade sobre o video
  const floatingShadow = {
    textShadow: '0 4px 12px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.45)',
  } as const;

  return (
    <motion.div
      variants={container}
      initial="hide"
      animate={revealed ? 'show' : 'hide'}
      className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 w-full text-creme"
    >
      {/* Bloco ESQUERDO (max-width ~640px) */}
      <motion.div variants={item} className="max-w-[640px] flex flex-col items-start">
        {/* Sobrancelha */}
        <p
          style={floatingShadow}
          className="font-poppins text-[15px] font-normal tracking-wide text-creme/90 leading-normal"
        >
          Ateliê de flores em <span className="italic font-semibold text-white">chenille</span>, feitas à mão
        </p>

        {/* Headline (trocado verde para branco) */}
        <h1
          style={floatingShadow}
          className="mt-3 font-sugo-pro-display text-[clamp(2rem,3.2vw,3.25rem)] font-normal leading-[1.05] tracking-normal uppercase select-none text-left text-white"
        >
          SEU BUQUÊ, DO SEU JEITO.
          <br />
          MONTADO À MÃO, <span className="text-white">FLOR POR FLOR.</span>
        </h1>

        {/* Bullets (trocado verde para branco) */}
        <div className="mt-6 flex flex-row items-center gap-6 flex-wrap">
          {/* Bullet 1 */}
          <div className="flex items-center gap-2">
            <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-white bg-white/10 text-white">
              <Check className="h-2.5 w-2.5" strokeWidth={4} />
            </div>
            <span
              style={floatingShadow}
              className="font-poppins text-[14px] font-normal leading-none text-creme/90"
            >
              Você escolhe cada flor
            </span>
          </div>

          {/* Bullet 2 */}
          <div className="flex items-center gap-2">
            <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-white bg-white/10 text-white">
              <Check className="h-2.5 w-2.5" strokeWidth={4} />
            </div>
            <span
              style={floatingShadow}
              className="font-poppins text-[14px] font-normal leading-none text-creme/90"
            >
              Feito à mão, sob encomenda
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bloco DIREITO (max-width ~360px) */}
      <motion.div variants={item} className="max-w-[360px] flex flex-col items-start text-left">
        {/* Paragrafo */}
        <p
          style={floatingShadow}
          className="font-poppins text-[14px] font-light leading-[1.6] text-creme/90"
        >
          Você escolhe as flores, o tamanho e a embalagem. Eu faço tudo à mão, aqui no ateliê em Recife, e entrego do jeito que você pediu. Cada buquê sai único.
        </p>

        {/* Linha de CTAs (sem isologo, proporções idênticas, sem quebras) */}
        <div className="mt-5 flex flex-row items-center gap-3 w-full sm:w-auto">
          {/* Botao Primario: Montar meu buquê */}
          <Link
            href="/personalizar"
            className="flex-1 sm:flex-initial rounded-full bg-creme px-6 py-2.5 font-poppins text-[13px] font-semibold text-vinho text-center whitespace-nowrap hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Montar meu buquê
          </Link>

          {/* Botao Secundario: Ver catálogo */}
          <button
            type="button"
            onClick={handleCatalogClick}
            className="flex-1 sm:flex-initial rounded-full border border-white/20 bg-white/10 px-6 py-2.5 font-poppins text-[13px] font-semibold text-white text-center backdrop-blur-md whitespace-nowrap hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Ver catálogo
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
