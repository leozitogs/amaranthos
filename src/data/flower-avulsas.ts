import type { FlorAvulsaVariant } from '@/lib/types';

const basePrices: Record<string, { P: number; M: number; G: number }> = {
  gerbera: { P: 2000, M: 2500, G: 3000 },
  tulipa: { P: 1000, M: 1500, G: 2000 },
  lirio: { P: 1500, M: 2000, G: 2500 },
  girassol: { P: 2000, M: 2500, G: 3000 },
  'rosa-1': { P: 2500, M: 3000, G: 3500 },
  'lirio-tigre': { P: 1500, M: 2000, G: 2500 },
  'rosa-2': { P: 2000, M: 2500, G: 3000 },
  papoula: { P: 1500, M: 2000, G: 2500 },
  cravo: { P: 2000, M: 2500, G: 3000 },
  hibisco: { P: 2000, M: 2500, G: 3000 },
  lotus: { P: 2500, M: 3000, G: 3500 },
  peonia: { P: 2500, M: 3000, G: 3500 },
  orquidea: { P: 1500, M: 2000, G: 2500 },
  'copo-de-leite': { P: 2000, M: 2500, G: 3000 },
  'margarida-g': { P: 2000, M: 2500, G: 3000 },
  'margarida-m': { P: 1000, M: 1500, G: 2000 },
  'margarida-p': { P: 1000, M: 1500, G: 2000 },
  mosquitinho: { P: 1500, M: 2000, G: 2500 },
  lavanda: { P: 1500, M: 2000, G: 2500 },
  'lirio-do-vale': { P: 1500, M: 2000, G: 2500 },
  'tulipa-2': { P: 1500, M: 2000, G: 2500 },
};

const variants: FlorAvulsaVariant[] = [];

const modelos = ['lembrei-de-ti', 'recadinho', 'solo-em-flor'] as const;
const tamanhos = ['P', 'M', 'G'] as const;

for (const florId of Object.keys(basePrices)) {
  for (const modelo of modelos) {
    for (const tamanho of tamanhos) {
      let extra = 0;
      if (modelo === 'recadinho') extra = 1000;
      if (modelo === 'solo-em-flor') extra = 1500;

      const base = basePrices[florId]![tamanho];
      variants.push({
        id: `avulsa-${florId}-${modelo}-${tamanho}`,
        flor_id: florId,
        modelo,
        tamanho,
        preco_centavos: base + extra,
      });
    }
  }
}

export const flowerAvulsas = variants;
