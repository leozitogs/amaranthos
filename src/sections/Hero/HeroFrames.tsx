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
 * Abertura ease-out-expo (parte rapido e desacelera ate acomodar): 800ms.
 * O ease-out da a sensacao dos paineis se acomodando suave no lugar final,
 * em vez de cair com peso. 800ms e a excecao cinematografica do hero (brand-kit
 * permite ate 800ms para o momento do hero). Os paineis permanecem abertos e
 * recebem o parallax de cursor pelo wrapper externo.
 */
const OPEN_TRANSITION = 'transform 800ms var(--ease-expo)';

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
 * As imagens usam h-full w-auto para manter o aspect ratio original sem
 * esticar. O container extrapola ±40px acima/abaixo do viewport (margem
 * suficiente para o parallax Y de ate 30px).
 */
export function HeroFrames({ opened, animate, onOpened }: HeroFramesProps) {
  return (
    <div data-hero-layer="frames" className="pointer-events-none absolute inset-0 z-30">
      {/* Painel Esquerdo */}
      <div
        className="pointer-events-none absolute inset-0 z-30 will-change-transform"
        style={{
          transform: layerTransform(PARALLAX.inputFrameLeft),
          transition: 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1.15)',
        }}
      >
        <div
          className="pointer-events-none absolute top-[-40px] bottom-[-40px] left-0 w-screen will-change-transform"
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
            width={2986}
            height={1980}
            priority
            sizes="100vw"
            className={`pointer-events-none absolute left-0 h-full w-auto max-w-none origin-left transition-transform duration-800 [transition-timing-function:var(--ease-expo)] -translate-y-[20px] ${
              opened ? 'translate-x-[9vw]' : 'translate-x-0'
            }`}
          />
        </div>
      </div>

      {/* Painel Direito */}
      <div
        className="pointer-events-none absolute inset-0 z-30 will-change-transform"
        style={{
          transform: layerTransform(PARALLAX.inputFrameRight),
          transition: 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1.15)',
        }}
      >
        <div
          className="pointer-events-none absolute top-[-40px] bottom-[-40px] left-0 w-screen overflow-hidden will-change-transform"
          style={{
            transform: `translate3d(${opened ? RIGHT_OPEN : '0vw'}, 0, 0)`,
            transition: animate ? OPEN_TRANSITION : undefined,
          }}
        >
          <Image
            src="/assets/cenas/load/right-input.png"
            alt=""
            aria-hidden
            width={2986}
            height={1980}
            priority
            sizes="100vw"
            className={`pointer-events-none absolute left-0 h-full w-auto max-w-none origin-left transition-transform duration-800 [transition-timing-function:var(--ease-expo)] -translate-y-0 ${
              opened ? 'translate-x-[5vw]' : 'translate-x-[calc(100vw-(100vh+80px)*1.508)]'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
