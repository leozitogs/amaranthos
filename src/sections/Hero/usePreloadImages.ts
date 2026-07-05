import { useEffect, useState } from 'react';

type Options = {
  /** Tempo minimo de exibicao do preloader (evita flash). */
  minMs?: number;
  /** Rede travada nao deve prender o usuario: solta o portal mesmo assim. */
  timeoutMs?: number;
};

/**
 * Precarrega os assets da cena e retorna `ready` quando todos resolvem (ou no
 * timeout de seguranca). Garante um tempo minimo para o momento do preloader.
 */
export function usePreloadImages(
  sources: readonly string[],
  { minMs = 700, timeoutMs = 4000 }: Options = {}
): boolean {
  const [ready, setReady] = useState(false);
  const key = sources.join('|');

  useEffect(() => {
    let settled = false;
    const startedAt = Date.now();

    const finish = () => {
      if (settled) return;
      settled = true;
      const wait = Math.max(0, minMs - (Date.now() - startedAt));
      window.setTimeout(() => setReady(true), wait);
    };

    let loaded = 0;
    const images = sources.map((src) => {
      const img = new Image();
      const onSettle = () => {
        loaded += 1;
        if (loaded >= sources.length) finish();
      };
      img.onload = onSettle;
      img.onerror = onSettle;
      img.src = src;
      return img;
    });

    const safety = window.setTimeout(finish, timeoutMs);

    return () => {
      window.clearTimeout(safety);
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
    // key representa o conteudo estavel de `sources`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, minMs, timeoutMs]);

  return ready;
}
