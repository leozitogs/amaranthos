'use client';

import { useRef } from 'react';
import { Play } from 'lucide-react';
import type { ShowcaseItem } from './hero-data';

type ShowcaseCardProps = {
  item: ShowcaseItem;
  index: number;
  total: number;
  onPlay: (item: ShowcaseItem, rect: DOMRect) => void;
};

const tnum = { fontFeatureSettings: '"tnum"' } as const;

/**
 * Card da vitrine: apresenta um buque do catalogo com video inline e rotulo
 * sob uma camada de vidro fosco (backdrop-blur).
 *
 * Dimensoes: 190x240px (hover), raio 24px.
 * Video: muted, loop, autoplay no hover. object-cover preenche o card.
 *
 * onPlay: ao clicar na pilula de play, dispara callback com o item e o
 * DOMRect do card (para o HeroShowcase animar o lightbox a partir da
 * posicao exata do card).
 */
export function ShowcaseCard({ item, index, total, onPlay }: ShowcaseCardProps) {
  const counter = `${String(index + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <article
      ref={cardRef}
      className="group relative h-[190px] w-[190px] shrink-0 origin-bottom overflow-hidden rounded-[24px] shadow-[var(--shadow-sm)] transition-[height,transform,box-shadow] duration-[var(--duration-normal)] [transition-timing-function:var(--ease-expo)] hover:h-[240px] hover:shadow-[var(--shadow-md)] motion-safe:hover:scale-[1.02]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video de fundo do card */}
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={item.video} type="video/mp4" />
      </video>

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
          onClick={(e) => {
            e.stopPropagation();
            if (cardRef.current) {
              onPlay(item, cardRef.current.getBoundingClientRect());
            }
          }}
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
