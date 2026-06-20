import type { Adicional } from '@/lib/types';

export const addons: Adicional[] = [
  {
    id: 'foto-impressa',
    nome: 'Foto impressa',
    descricao_curta: 'Uma foto impressa escondida entre as flores.',
    descricao_longa:
      'Uma foto impressa em papel fotografico 10x15cm, aplicada discretamente entre as flores do buque ou centro de mesa. A foto vira parte da peca: aparece entre as petalas como se estivesse florindo ali. Envie a imagem no momento do pedido pelo WhatsApp.',
    preco_unitario_centavos: 400,
    max_por_pedido: 3,
  },
  {
    id: 'borboleta-3d',
    nome: 'Borboleta 3D',
    descricao_curta: 'Borboletas de papel em 3D pousadas entre as flores.',
    descricao_longa:
      'Borboletas 3D de papel aplicadas entre as flores do arranjo, criando a sensacao de movimento e descoberta. Disponiveis em cores variadas: escolha no momento do pedido. Preco por unidade: da para pedir de 1 a 10 no mesmo arranjo.',
    preco_unitario_centavos: 350,
    max_por_pedido: 10,
  },
  {
    id: 'carta-personalizada',
    nome: 'Carta personalizada',
    descricao_curta: 'Uma carta escrita a mao para acompanhar o presente.',
    descricao_longa:
      'Papel decorativo com mensagem manuscrita pela Gisele, no tom e com o conteudo que voce escolher. Ate 20 linhas. A carta vai dentro ou junto do arranjo, em envelope discreto. E o detalhe que transforma o presente num gesto completo: a flor que nao murcham e a palavra que fica.',
    preco_unitario_centavos: 900,
    max_por_pedido: 1,
  },
  {
    id: 'fio-de-fada',
    nome: 'Fio de fada (LED)',
    descricao_curta: 'Luzinhas de LED entrelaçadas no buque.',
    descricao_longa:
      'Fio de LED com 1 metro de comprimento, 10 luzes, alimentado por bateria inclusa, entrelaçado entre as flores. Funciona tanto para fotos quanto para decoracao permanente: ligue quando quiser, deixe desligado quando nao. Discreto, delicado, transforma o arranjo quando a luz apaga.',
    preco_unitario_centavos: 750,
    max_por_pedido: 2,
  },
];
