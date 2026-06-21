'use client';

import { motion, type Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type HeroCopyProps = {
  revealed: boolean;
  reduced: boolean;
};

/**
 * Coluna esquerda: voz da marca. Titulo em ViaodaLibre, filete menta, corpo em
 * Poppins. Copy PT-BR placeholder ate o amaranthos-ux-microcopy entregar a
 * versao final (estrutura: titulo curto + paragrafo de quatro linhas).
 *
 * Tipografia (tamanhos do mockup da PO, referencia 1920: as clamps batem o px
 * exato a 1920 via vw e escalam proporcionalmente abaixo disso):
 *   "FLORES": 60px (clamp(2.5rem, 3.125vw, 3.75rem)).
 *   "MURCHAM": 66px (clamp(2.75rem, 3.4375vw, 4.125rem)), maior que FLORES.
 *   "QUE NAO": 24px (clamp(0.95rem, 1.25vw, 1.5rem)), tracking 0.08em.
 *   "NAO" em menta (var(--color-menta)); "QUE" em creme/90.
 *   Paragrafo: Poppins, 18px (clamp(1rem, 0.9375vw, 1.125rem)), line-height 1.6.
 *   Todos peso 400, line-height 0.92 no titulo, creme, caixa alta no titulo.
 *   "MURCHAM" como palavra solida (sem split por caractere).
 */
export function HeroCopy({ revealed, reduced }: HeroCopyProps) {
  const container: Variants = {
    hide: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };

  const item: Variants = {
    hide: { opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <motion.div
      variants={container}
      initial="hide"
      animate={revealed ? 'show' : 'hide'}
      className="w-full"
    >
      <motion.h1
        variants={item}
        className="text-creme flex flex-col font-[family-name:var(--font-viaoda-libre)] uppercase select-none"
      >
        {/* Linha 1: "FLORES" seguido de "QUE NAO" alinhado ao topo de FLORES */}
        <div className="flex items-start gap-[18px]">
          <span
            className="leading-[0.92] font-normal"
            style={{ fontSize: 'clamp(2.5rem, 3.125vw, 3.75rem)', letterSpacing: '0.015em' }}
          >
            FLORES
          </span>
          <span
            className="text-creme/90 mt-[0.12em] font-normal uppercase"
            style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1.5rem)', letterSpacing: '0.08em' }}
          >
            QUE <span style={{ color: 'var(--color-menta)' }}>NÃO</span>
          </span>
        </div>

        {/* Linha 2: "MURCHAM" como palavra solida */}
        <span
          className="leading-[0.92] font-normal"
          style={{ fontSize: 'clamp(2.75rem, 3.4375vw, 4.125rem)', letterSpacing: '0.015em' }}
        >
          MURCHAM
        </span>
      </motion.h1>

      <motion.p
        variants={item}
        className="text-creme/90 mt-8 max-w-[290px] font-[family-name:var(--font-poppins)] leading-[1.6] font-normal"
        style={{ fontSize: 'clamp(1rem, 0.9375vw, 1.125rem)' }}
      >
        Feitas à mão em chenille, uma a uma, com calma, para ficar por perto e guardar o afeto que
        não tem pressa de partir.
      </motion.p>
    </motion.div>
  );
}
