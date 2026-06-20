# Amaranthos Atelie | Pipeline de Producao

> Flores feitas a mao em limpador de canudo (chenille) que nao murcham.

Este e o roteiro de producao do site. O site e tratado como um atelie digital: cada secao e um canteiro com sua propria mecanica, e a navegacao deve fluir de maneira organica, respiravel e elegante. Este e um documento vivo: cada briefing fechado atualiza a secao correspondente.

## Estado da producao

| #   | Secao          | Papel do canteiro                                                   | Status                 |
| --- | -------------- | ------------------------------------------------------------------- | ---------------------- |
| 1   | Hero           | Abertura visual impactante, boas-vindas com isologo animado         | Scaffold (Stub)        |
| 2   | CatalogPreview | Vitrine estatica e interativa das categorias (Buques, Flores, etc.) | Scaffold (Stub)        |
| 3   | Personalizar   | O Configurador virtual de buques personalizados (Interativo)        | Scaffold (Placeholder) |
| 4   | Sobre          | A historia do atelie, o fazer manual da Gisele no Jordao Baixo      | Scaffold (Stub)        |
| 5   | Contato        | Fechamento do circulo, chamada para encomendar via WhatsApp         | Scaffold (Stub)        |
| 6   | 404            | Tratamento de erro na voz e tom da marca                            | Scaffold (Stub)        |

---

## Secao 1 | Hero | Abertura e Florescimento

A abertura do site deve encantar de imediato. Apresenta o logotipo completo da Amaranthos Atelie de forma destacada, usando a tipografia Mainstay em fonte grande e display.

- **Visual**: Fundo em tom Creme (`#FDF7F1`), com o mascote colorido (`isologo.svg`) no centro. Uma sutil composicao decorativa com ilustracoes de flores do catalogo.
- **Movimento**: Animacao via GSAP e ScrollTrigger. Ao rolar a pagina, o isologo no header e ativado e assume sua posicao compacta na barra de navegacao sticky.
- **Objetivo**: Fixar a paleta primaria (Vinho, Rosa Poeira e Verde Menta) e a identidade aconchegante da marca logo no primeiro impacto.

## Secao 2 | CatalogPreview | A Vitrine do Atelie

Exibe uma previa curada dos produtos disponiveis no catalogo de forma elegante, permitindo que a cliente navegue pelas principais categorias:

- **Categorias**: Buques, Flores Avulsas, Centros de Mesa e Chaveiros.
- **Visual**: Cards com cantos arredondados (`rounded-lg`) e backgrounds suaves. As imagens dos produtos usam `object-contain` para preservar as fotos reais das pecas.
- **Movimento**: Efeito de revelacao suave (scroll reveal) com fade e transicao de translate-y suave. Efeito hover sutil nos cards (scale 1.02 com transition de 300ms).

## Secao 3 | Personalizar | O Configurador de Buques

Esta e a funcionalidade central e mais complexa do site. Permite que a cliente monte seu proprio buque de chenille virtualmente em tempo real:

- **Mecanica**: Selecao de slots, contagem de hastes, adicao de complementos (como fio de fada e borboletas 3D) e calculo de preco dinamico conforme a formula oficial.
- **Fase Atual**: Sera criada uma pagina com placeholder conceitual e demonstracao visual da mecanica antes do build funcional completo.

## Secao 4 | Sobre | O Making-of e a Historia

O canteiro humano. Apresenta a historia da Gisele Estefane e seu atelie no Jordao Baixo, Recife, PE:

- **Visual**: Design focado em tipografia acolhedora. Assinatura oficial da Gisele (`gisele_estefane.svg`) no final do texto como toque de autenticidade.
- **Copy**: Tom de voz intimo e afetivo em primeira pessoa, sem termos comerciais vazios.
- **Animacao**: Fade suave na entrada do texto e da imagem.

## Secao 5 | Contato | Do Atelie para Voce

O fechamento de fluxo comercial do site, convertendo a navegacao em pedido de WhatsApp:

- **Mecanica**: Resumo do carrinho/buque configurado convertido em um link personalizado de WhatsApp.
- **Visual**: Uso do mascote circular (`circle_isotipo.svg`) e do logotipo reduzido. Botoes com transicao de 200ms de shift de background.

## Secao 6 | 404 | Fora do Jardim

Tratamento de rota nao encontrada de forma leve e acolhedora:

- **Visual**: O isologo vazado (`isologo_vazado.svg`) ou o mascote em preto representam uma flor que se perdeu do jardim, acompanhada de mensagem direta sem emoji.
- **Fluxo**: Um botao proeminente redireciona o usuario de volta para a Home.

---

## Como cada secao e produzida

1. **Briefing**: Definicao visual e roteiro de animacao aprovados antes do codigo.
2. **Build Estatico**: Layout com dados reais e stubs estaticos prontos para revisao.
3. **Movimento**: Implementacao de timelines do GSAP e transicoes do Framer Motion.
4. **QA e Aprovacao**: Validacoes de responsividade, testes manuais e portao de qualidade.
5. **PR**: Criacao de branch especifica e submissao para merge na main pela PO.
