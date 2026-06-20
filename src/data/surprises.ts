import type { Surpresa } from '@/lib/types';

export const surprises: Surpresa[] = [
  {
    id: 'surpresa-p',
    tamanho: 'P',
    nome: 'Surpresa P',
    descricao_curta: 'Voce escolhe o tamanho. Eu escolho as flores.',
    descricao_longa:
      'Um buque pequeno onde a Gisele faz toda a escolha: flores, cores, combinacoes. A ideia nasceu para quem nao quer ou nao consegue decidir cada detalhe e prefere confiar no olhar de quem faz. Voce garante o tamanho e o preco, a gente entrega um buque pensado com calma, feito com o que cada dia traz de melhor no atelie.',
    buque_equivalente_id: 'pequeno-afeto',
    preco_centavos: 8000,
  },
  {
    id: 'surpresa-m',
    tamanho: 'M',
    nome: 'Surpresa M',
    descricao_curta: 'Um buque de tamanho medio, feito com o olhar do atelie.',
    descricao_longa:
      'Versao intermediaria da Surpresa. Seis flores, tres pequenas e uma folha escolhidas pela Gisele de acordo com o material e inspiracao do momento. Cada Surpresa e unica: o que garante que o seu buque, na pratica, seja diferente de qualquer outro que ja tenha saído do atelie.',
    buque_equivalente_id: 'doce-primavera',
    preco_centavos: 14000,
  },
  {
    id: 'surpresa-g',
    tamanho: 'G',
    nome: 'Surpresa G',
    descricao_curta: 'A Surpresa em versao grande. Toda a confianca, toda a generosidade.',
    descricao_longa:
      'O maior tamanho da linha Surpresa. Dez flores, quatro pequenas e duas folhas compondo um buque amplo, com densidade e volume, inteiramente escolhido pela Gisele. Esse e o produto para quem confia totalmente no trabalho do atelie e quer receber algo que foi pensado do comeco ao fim sem interferencia.',
    buque_equivalente_id: 'memoria-em-flor',
    preco_centavos: 21500,
  },
];
