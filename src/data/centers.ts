import type { CentroMesa } from '@/lib/types';

export const centers: CentroMesa[] = [
  {
    id: 'jardim-de-bolso',
    slug: 'jardim-de-bolso',
    nome: 'Jardim de bolso',
    tamanho: 'P',
    descricao_curta: 'Um jardim inteiro que cabe na palma da mao.',
    descricao_longa:
      'O menor dos centros de mesa. Uma flor unica plantada num vaso pequeno feito totalmente a mao em hastes de chenille, com faixa decorativa e terra verde no topo simulando o canteiro. Cabe em qualquer cantinho: cabeceira, mesa lateral, prateleira: e traz a sensacao de ter uma flor em casa sem o ritual de cuidar dela. Esforco 5: a peca mais complexa do tamanho pequeno.',
    num_flores_grandes: 1,
    num_folhas: 0,
    preco_centavos: 6500,
  },
  {
    id: 'abraco-de-mesa',
    slug: 'abraco-de-mesa',
    nome: 'Abraco de mesa',
    tamanho: 'M',
    descricao_curta: 'Um centro de mesa feito para ser o centro mesmo.',
    descricao_longa:
      'Tamanho medio. Uma flor grande acompanhada de tres folhas, plantada num vaso de chenille com camadas decorativas e acabamento em fita de adorno. E o centro de mesa pensado para ocupar o meio da mesa de jantar sem roubar espaco demais: decoracao de presenca constante, que fica bonita de todos os angulos. Cada peca leva cerca de tres horas para ficar pronta.',
    num_flores_grandes: 1,
    num_folhas: 3,
    preco_centavos: 12000,
  },
  {
    id: 'grande-jardim',
    slug: 'grande-jardim',
    nome: 'Grande jardim',
    tamanho: 'G',
    descricao_curta: 'O centro de mesa em escala de evento.',
    descricao_longa:
      'O maior dos centros. Duas flores grandes, seis folhas finas e um vaso completo com pratinho, tudo feito a mao em hastes de chenille. E a peca pensada para ocasioes que merecem um destaque visual maior: mesa de casamento, mesa de jantar especial, vitrine de loja, decoracao de ambiente. Leva cerca de quatro horas de producao e e a peca mais trabalhosa da linha.',
    num_flores_grandes: 2,
    num_folhas: 6,
    preco_centavos: 19000,
  },
];
