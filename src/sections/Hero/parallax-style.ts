import type { CSSProperties } from 'react';
import type { ParallaxFactor } from './hero-data';

/**
 * Transform de uma camada de parallax. Le as variaveis --mx/--my (escritas pelo
 * usePointerParallax no no raiz) e aplica o fator da camada em px. Quando o
 * parallax esta desligado as variaveis valem 0, entao o transform e neutro.
 */
export function layerTransform(factor: ParallaxFactor): CSSProperties['transform'] {
  return `translate3d(calc(var(--mx, 0) * ${factor.x}px), calc(var(--my, 0) * ${factor.y}px), 0)`;
}
