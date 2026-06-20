export type FlorModelo = 'lembrei-de-ti' | 'recadinho' | 'solo-em-flor';
export type Tamanho = 'P' | 'M' | 'G';
export type CategoriaAdicional =
  | 'inclusa'
  | 'base'
  | 'esforco-4'
  | 'tier-4-4'
  | 'margarida-g'
  | 'rosa-1'
  | 'luxo';

export interface Flor {
  id: string;
  nome: string;
  slug: string;
  descricao_curta: string;
  tier_tamanho: 1 | 2 | 3 | 4 | 5;
  tier_esforco: 1 | 2 | 3 | 4 | 5;
  categoria_adicional: CategoriaAdicional;
  adicional_centavos: number;
  disponivel_chaveiro: boolean;
}

export interface FlorAvulsaVariant {
  id: string;
  flor_id: string;
  modelo: FlorModelo;
  tamanho: Tamanho;
  preco_centavos: number;
}

export interface ModeloEmbalagem {
  id: FlorModelo;
  nome: string;
  descricao_curta: string;
  descricao_longa: string;
  acrescimo_sobre_base_centavos: number;
}

export interface Buque {
  id: string;
  slug: string;
  nome: string;
  composicao: string;
  descricao_curta: string;
  descricao_longa: string;
  flores_grandes: number;
  flores_pequenas: number;
  folhas: number;
  preco_cheio_centavos: number;
  desconto_mix_centavos: number;
  tem_promo_recorrente: boolean;
  preco_promo_centavos: number | null;
  flag_promo_ativa: boolean;
}

export interface Surpresa {
  id: string;
  tamanho: Tamanho;
  nome: string;
  descricao_curta: string;
  descricao_longa: string;
  buque_equivalente_id: string;
  preco_centavos: number;
}

export interface CentroMesa {
  id: string;
  slug: string;
  nome: string;
  tamanho: Tamanho;
  descricao_curta: string;
  descricao_longa: string;
  num_flores_grandes: number;
  num_folhas: number;
  preco_centavos: number;
}

export interface Chaveiro {
  id: string;
  flor_id: string;
  preco_centavos: number;
}

export interface Adicional {
  id: string;
  nome: string;
  descricao_curta: string;
  descricao_longa: string;
  preco_unitario_centavos: number;
  max_por_pedido: number;
}

export interface ItemConfigurado {
  tipo: 'flor-avulsa' | 'buque' | 'surpresa' | 'centro-de-mesa' | 'chaveiro';
  produto_id: string;
  mix_do_atelie?: boolean;
  flores_personalizadas?: {
    flor_id: string;
    quantidade: number;
  }[];
  adicionais?: {
    adicional_id: string;
    quantidade: number;
  }[];
  preco_total_centavos: number;
}
