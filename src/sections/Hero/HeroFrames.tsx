import Image from 'next/image';
import { FRAME, PARALLAX } from './hero-data';
import { layerTransform } from './parallax-style';

type HeroFramesProps = {
  /** true = paineis recuados (portal revelado). */
  opened: boolean;
  /** false em reduced-motion: entra direto no estado aberto, sem transicao. */
  animate: boolean;
  /** disparado quando o painel termina de recuar. */
  onOpened: () => void;
};

/**
 * Abertura ease-in-strong (comeca lento, acelera): 800ms.
 * O ease-in acentuado da sensacao de peso dos paineis ao se abrirem.
 */
const OPEN_TRANSITION = 'transform 800ms var(--ease-in-strong)';

/**
 * Translates abertos calculados por FRAME (coverVw = 100 = w-screen):
 *   leftOpenVw  = 52.0833 - 100 = -47.9167vw
 *   rightOpenVw = 46.875  - 0   = +46.875vw
 */
const LEFT_OPEN = `${FRAME.leftOpenVw.toFixed(4)}vw`;
const RIGHT_OPEN = `${FRAME.rightOpenVw.toFixed(4)}vw`;

/**
 * Os dois paineis de chenille. Fechados cobrem o viewport (preloader, tela 1);
 * ao abrir recuam para as laterais emoldurando o portal. O parallax atua no
 * wrapper externo; o recuo (open) e transform proprio de cada painel.
 *
 * scale-110 nas imagens: os paineis sofrem parallax enquanto abrem. O scale
 * evita corte de borda seca nas extremidades (overflow-hidden no wrapper).
 */
export function HeroFrames({ opened, animate, onOpened }: HeroFramesProps) {
  return (
    <>
      {/* Painel Esquerdo */}
      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{ transform: layerTransform(PARALLAX.inputFrameLeft) }}
      >
        <div
          className="pointer-events-none absolute top-[-270px] bottom-[-270px] left-0 w-screen will-change-transform"
          style={{
            transform: `translate3d(${opened ? LEFT_OPEN : '0vw'}, 0, 0)`,
            transition: animate ? OPEN_TRANSITION : undefined,
          }}
          onTransitionEnd={(event) => {
            if (event.propertyName === 'transform' && opened) onOpened();
          }}
        >
          <Image
            src="/assets/cenas/load/left-input.png"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-fit: cover object-left origin-left"
          />
        </div>
      </div>

      {/* Painel Direito */}
      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{ transform: layerTransform(PARALLAX.inputFrameRight) }}
      >
        <div
          className="pointer-events-none absolute top-[-270px] bottom-[-270px] left-0 w-screen will-change-transform overflow-hidden"
          style={{
            transform: `translate3d(${opened ? RIGHT_OPEN : '0vw'}, 0, 0)`,
            transition: animate ? OPEN_TRANSITION : undefined,
          }}
        >
          <Image
            src="/assets/cenas/load/right-input.png"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-fit: cover object-right origin-right"
          />
        </div>
      </div>
    </>
  );
}
