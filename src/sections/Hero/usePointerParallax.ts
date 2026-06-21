import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Fator de retorno do lerp (nitido, dentro da faixa 0.05 a 0.08 pedida). */
const LERP = 0.08;

/**
 * Parallax imersivo dirigido pelo cursor. Escreve as variaveis CSS --mx e --my
 * (normalizadas de -1 a 1, suavizadas por lerp) no elemento raiz; cada camada
 * aplica seu proprio fator via calc(). Desliga em touch e reduced-motion (o
 * chamador controla `enabled`), zerando o offset para a posicao neutra.
 */
export function usePointerParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  enabled: boolean
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!enabled) {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
      return;
    }

    let frame = 0;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      el.style.setProperty('--mx', current.x.toFixed(4));
      el.style.setProperty('--my', current.y.toFixed(4));
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [ref, enabled]);
}
