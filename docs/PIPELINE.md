# Amaranthos Ateliê | Pipeline de Produção do Jardim Digital

Este é o roteiro definitivo de desenvolvimento do website da Amaranthos Ateliê. O projeto é concebido como um ateliê digital interativo de alta costura, focado no artesanato premium de peças em chenille. A navegação é estruturada como uma jornada narrativa (storytelling) e de rolagem reativa (scrolltelling), dividindo-se em canteiros de produção específicos.

---

## Mapeamento de Telas e Branches Git

| Tela ou Canteiro               | Rota ou Componente                                             | Branch Git                 | Status   |
| :----------------------------- | :------------------------------------------------------------- | :------------------------- | :------- |
| **Carregador e Hero**          | `/` (Seção Hero)                                               | `feat/hero-portal`         | Pendente |
| **Vitrine (CatalogPreview)**   | `/` (Seção CatalogPreview)                                     | `feat/catalog-preview`     | Pendente |
| **Páginas de Catálogo**        | `/buques`, `/flores-avulsas`, `/centros-de-mesa`, `/chaveiros` | `feat/paginas-catalogo`    | Pendente |
| **História do Ateliê**         | `/sobre` e `/` (Seção Sobre)                                   | `feat/sobre-historia`      | Pendente |
| **Teaser da Mesa de Trabalho** | `/` (Seção Personalizar)                                       | `feat/personalizar-teaser` | Pendente |
| **Contato (Envelope Afetivo)** | `/` (Seção Contato)                                            | `feat/contato-envelope`    | Pendente |
| **Configurador de Buquê**      | `/personalizar`                                                | `feat/configurador-buque`  | Pendente |
| **Fora do Jardim (Erro 404)**  | Rota inexistente (`not-found.tsx`)                             | `feat/pagina-404`          | Pendente |

---

## Estrutura de Storytelling da Página Inicial

A jornada do usuário ao rolar a página principal é dividida em 5 fases de transição contínuas:

1. **Abertura (Hero Cinematográfico)**: A entrada do usuário em um mundo mágico onde toda a natureza é feita de chenille, combinando preloader dinâmico, transição de portal e um modelo 3D imerso em vídeo sob controle de rolagem (trabalhado inicialmente para computadores).
2. **Ascensão (Vitrine nos Céus)**: O usuário sobe verticalmente cruzando uma camada de nuvens interativas (que respondem ao cursor do mouse) para alcançar a vitrine de produtos (CatalogPreview) flutuando no céu claro.
3. **Descida (A Mesa de Trabalho)**: A câmera desce de volta à terra cruzando as nuvens, aterrissando na mesa de trabalho real da Gisele em Recife (Sobre). O fundo assume cores terrosas com texturas táteis de juta e fios de chenille.
4. **Criação (A Oficina Interativa)**: Um convite para experimentar o trabalho manual (Personalizar) em uma mesa de trabalho virtual onde flores de chenille soltas flutuam e reagem ao cursor do mouse ao redor de um vaso vazio.
5. **Entrega (O Envelope de Mensagem)**: O fecho da jornada (Contato), onde o formulário é estilizado como um envelope de carta afetivo e ramos de chenille florescem nos cantos ao interagir com a interface.

---

## Detalhamento Técnico e Visual das Seções

### Seção 1: Hero | O Portal de Chenille

- **Fase 1: O Preloader (Load Stage)**
  - **Mecânica**: Carregamento da página exibe apenas os assets `left-input.png` e `right-input.png` (pasta `public/assets/cenas/load/`) centralizados e empilhados, servindo de portão visual.
  - **Ação**: Ao concluir o carregamento dos recursos, os dois assets se separam deslizando suavemente para as laterais esquerda e direita.
- **Fase 2: A Revelação do Portal (Intro)**
  - **Mecânica**: A separação das laterais revela o frame de fundo com o asset `portal-hero.png` (pasta `public/assets/cenas/hero/`) centralizado, criando a moldura e a expectativa visual.
- **Fase 3: O Mergulho da Câmera (Transition)**
  - **Mecânica**: Animação via GSAP. Ao iniciar a rolagem, as interfaces textuais e controles desaparecem e a câmera simula um zoom-in com efeito de rebote (bounce) diretamente para dentro do buraco do portal (representado pela transição `hero-transition-bouquet-3D.png`).
- **Fase 4: A Floresta e o Buquê 3D (Cinematic)**
  - **Mecânica**: O zoom nos leva para a cena da floresta de chenille. Um vídeo de fundo roda em paralaxe associado ao scroll e ao movimento do cursor do mouse.
  - **Tridimensionalidade**: O arquivo `bouquet-hero.glb` é renderizado sobre o vídeo usando Three.js, com iluminação e filtros de cor ajustados para total fusão visual com a cena.

### Seção 2: CatalogPreview | A Vitrine Acima das Nuvens

- **Transição**: Animação rápida que simula a subida da câmera cruzando nuvens decorativas (`cloud-left.png` e `cloud-right.png`).
- **Interação**: As nuvens flutuam nas bordas e reagem dinamicamente à posição do cursor do mouse (cursor-responsive parallax com GSAP).
- **Layout**: Os produtos são exibidos em uma grelha flutuante assimétrica e minimalista combinada com carrosséis horizontais para navegação rápida de galerias. No hover dos cards, a imagem faz um zoom suave (scale 1.05) e expõe a composição em chenille e o botão de compras.

### Seção 3: Sobre | Do Céu para a Terra

- **Transição**: A rolagem faz o usuário descer novamente pelas nuvens, transicionando o céu claro para um plano de fundo em tons terrosos, com fotos reais e texturas rústicas de juta.
- **Storytelling**: Foco no fazer manual da Gisele Estefane no Jordão Baixo em Recife, tecendo fios de chenille em peças eternas.
- **Interação**: Fios e ramos de chenille desenhados em vetor surgem sutilmente nas margens conforme o bloco de texto é revelado.

### Seção 4: Personalizar | A Mesa de Trabalho Teaser

- **Visual**: Simulação da mesa de trabalho do ateliê com um vaso vazio no centro e botões de flores de chenille soltos ao redor.
- **Interação**: Efeito magnético nos botões das flores (elas se inclinam e flutuam em direção ao cursor do mouse).
- **Fluxo**: O botão "Montar seu Buquê" aciona uma transição fluida de tela que carrega a rota do configurador dinâmico.

### Seção 5: Contato | O Envelope Afetivo

- **Layout**: O formulário de e-mail e dados de contato é disposto sobre um contêiner que simula um envelope clássico de papel kraft ou etiqueta de feltro de presente.
- **Interação**: Ao focar em um campo de texto ou passar o mouse sobre o botão de envio, ramos de folhas de chenille desabrocham suavemente em vetor nas bordas do envelope.

### Seção 6: O Configurador de Buquês (`/personalizar`)

- **Canvas Visual**: Renderização central baseada em composição estacada 2D (Stacked PNGs) usando recortes de alta definição com transparência. As hastes de flores, folhagens, embalagens e fitas selecionadas se sobrepõem reativamente com leves rotações naturais para dar volume.
- **Painel de Opções**: Abas divididas de forma limpa (1. Flores, 2. Complementos, 3. Embalagem, 4. Fita).
- **Fechamento**: Geração automática de link seguro contendo a lista e o preço em centavos calculado no motor de precificação, abrindo diretamente a API do WhatsApp comercial da marca.

---

## Roadmap de Desenvolvimento

### Fase 1: Padronização e Limpeza de Assets

- **Objetivo**: Garantir consistência nas referências físicas do projeto.
- **Ações**:
  - Verificar todos os arquivos de mídia em `public/assets/` e subpastas.
  - Renomear arquivos que contenham sublinhados (`_`) substituindo-os por hifens (`-`).
  - Atualizar os caminhos nos bancos de dados (`src/data/`) e testes correspondentes.

### Fase 2: Construção da Estrutura Estática do Catálogo e Páginas

- **Objetivo**: Codificar os layouts de todas as páginas e seções da Home com dados reais.
- **Ações**:
  - Construir as páginas de listagem (`/buques`, `/flores-avulsas`, `/centros-de-mesa`, `/chaveiros`) combinando grelha e carrosséis.
  - Estruturar a página base do configurador `/personalizar` e as seções da Home.

### Fase 3: Desenvolvimento do Motor de Movimento (GSAP, Three.js e Scroll)

- **Objetivo**: Materializar a experiência do Hero cinematográfico com portal e buquê 3D, transição de nuvens e efeitos sob rolagem.
- **Ações**:
  - Configurar Three.js na seção Hero para renderizar o modelo `.glb` sobre o vídeo de fundo.
  - Programar a timeline do GSAP para coordenar a separação do load, o zoom no portal e a ascensão e descida nas nuvens.
  - Habilitar o efeito cursor magnético e interativo nas nuvens e na seção de personalização.

### Fase 4: O Configurador Virtual e Sacola de Compras

- **Objetivo**: Habilitar a montagem reativa do buquê em 2D empilhado e a integração final com a API do WhatsApp.
- **Ações**:
  - Desenvolver o estado imutável da sacola de compras e da composição do buquê.
  - Implementar as sobreposições gráficas de hastes e acessórios no configurador.
  - Conectar o motor de precificação e gerar mensagens estruturadas para o WhatsApp.
