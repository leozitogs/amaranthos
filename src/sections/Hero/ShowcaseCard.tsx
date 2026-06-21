'use client';

import { Play } from 'lucide-react';
import type { ShowcaseItem } from './hero-data';

type ShowcaseCardProps = {
  item: ShowcaseItem;
  index: number;
  total: number;
};

const tnum = { fontFeatureSettings: '"tnum"' } as const;

/**
 * Card da vitrine: apresenta um buque do catalogo com player e rotulo sob
 * uma camada de vidro fosco (backdrop-blur).
 *
 * Dimensoes: 190x250px, raio 24px.
 * Overlay: grafite a 18% (chapado, sem gradiente).
 * Pilula de play: ancorada no canto inferior esquerdo (left-2.5 bottom-2.5),
 * largura pelo conteudo (w-fit), forma rounded-full, vidro fosco.
 * Hover de escala: somente quando o usuario permite movimento (motion-safe).
 */
export function ShowcaseCard({ item, index, total }: ShowcaseCardProps) {
  const counter = `${String(index + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`;

  return (
    <article className="group relative h-[190px] w-[190px] shrink-0 overflow-hidden rounded-[24px] shadow-[var(--shadow-sm)] transition-[height,transform,box-shadow] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-expo)] hover:h-[240px] hover:shadow-[var(--shadow-md)] motion-safe:hover:scale-[1.02]">
      {/* Fundo generico com gradiente da paleta Amaranthos */}
      <div className="from-vinho/45 via-rosa/30 to-menta/40 absolute inset-0 bg-gradient-to-br" />

      {/* Overlay de leitura sutil */}
      <div className="bg-grafite/10 absolute inset-0" />

      {/* Contador superior direito */}
      <span
        className="text-creme absolute top-3 right-3 font-[family-name:var(--font-inter)] text-xs font-medium opacity-85"
        style={{ ...tnum, textShadow: '0 1px 2px rgba(42,31,36,0.25)' }}
      >
        {counter}
      </span>

      {/* Pilula de play: canto inferior esquerdo, largura pelo conteudo */}
      <div className="absolute bottom-2.5 left-2.5 flex w-fit items-center gap-2 rounded-full border border-white/[0.18] bg-white/20 px-2 py-1.5 backdrop-blur-md">
        <button
          type="button"
          aria-label={`${item.label}, ${counter}`}
          className="text-vinho flex size-7 shrink-0 items-center justify-center rounded-full bg-white/90 transition-colors duration-[var(--duration-fast)] hover:bg-white focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:outline-none"
        >
          <Play className="fill-vinho size-3 translate-x-px" strokeWidth={1.5} />
        </button>
        <span className="text-creme font-[family-name:var(--font-poppins)] text-[10px] font-medium whitespace-nowrap">
          assistir vídeo
        </span>
      </div>
    </article>
  );
}
