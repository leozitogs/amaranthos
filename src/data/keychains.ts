import type { Chaveiro } from '@/lib/types';

export const keychains: Chaveiro[] = [
  // Basico (500 centavos)
  { id: 'chaveiro-margarida-p', flor_id: 'margarida-p', preco_centavos: 500 },
  { id: 'chaveiro-tulipa', flor_id: 'tulipa', preco_centavos: 500 },
  { id: 'chaveiro-lavanda', flor_id: 'lavanda', preco_centavos: 500 },

  // Padrao (650 centavos)
  { id: 'chaveiro-mosquitinho', flor_id: 'mosquitinho', preco_centavos: 650 },
  { id: 'chaveiro-papoula', flor_id: 'papoula', preco_centavos: 650 },
  { id: 'chaveiro-orquidea', flor_id: 'orquidea', preco_centavos: 650 },
  { id: 'chaveiro-margarida-m', flor_id: 'margarida-m', preco_centavos: 650 },
  { id: 'chaveiro-lirio', flor_id: 'lirio', preco_centavos: 650 },
  { id: 'chaveiro-lirio-tigre', flor_id: 'lirio-tigre', preco_centavos: 650 },
  { id: 'chaveiro-lirio-do-vale', flor_id: 'lirio-do-vale', preco_centavos: 650 },

  // Premium (750 centavos)
  { id: 'chaveiro-gerbera', flor_id: 'gerbera', preco_centavos: 750 },
  { id: 'chaveiro-girassol', flor_id: 'girassol', preco_centavos: 750 },
  { id: 'chaveiro-rosa-2', flor_id: 'rosa-2', preco_centavos: 750 },
  { id: 'chaveiro-cravo', flor_id: 'cravo', preco_centavos: 750 },

  // Exclusiva (900 centavos)
  { id: 'chaveiro-rosa-1', flor_id: 'rosa-1', preco_centavos: 900 },
];
