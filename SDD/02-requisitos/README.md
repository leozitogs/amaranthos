# Módulo 2: Requisitos

Este documento detalha os Requisitos Funcionais (RFs) e Requisitos Não Funcionais (RNFs) estabelecidos para o projeto **Amaranthos Ateliê (Web Project)**.

---

## 1. Requisitos Funcionais (RFs)

Os requisitos funcionais definem os recursos e comportamentos que o sistema deve oferecer aos usuários finais.

### RF01: Landing Page (Página Inicial)

- O sistema deve exibir uma página inicial composta por cinco seções ordenadas de forma fluida:
  - **Hero**: Seção de impacto visual com animação corporativa (GSAP) e frase de efeito.
  - **CatalogPreview**: Vitrine resumida das quatro principais categorias de produtos.
  - **Personalizar**: Chamada para ação interativa convidando o usuário a criar seu próprio buquê.
  - **Sobre**: Resumo da história do ateliê e da artesã fundadora.
  - **Contato**: Formulário para envio de mensagens e links de redes sociais.

### RF02: Navegação e Filtros do Catálogo

- O sistema deve oferecer rotas dedicadas e otimizadas para cada uma das seguintes categorias de produtos:
  - Buquês ([buques](<file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/(catalogo)/buques/page.tsx>))
  - Flores Avulsas ([flores-avulsas](<file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/(catalogo)/flores-avulsas/page.tsx>))
  - Centros de Mesa ([centros-de-mesa](<file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/(catalogo)/centros-de-mesa/page.tsx>))
  - Chaveiros ([chaveiros](<file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/(catalogo)/chaveiros/page.tsx>))
- Cada página de catálogo deve renderizar as peças disponíveis com imagens, nomes descritivos e preços calculados de forma dinâmica pelo motor de precificação.

### RF03: Configurador de Buquês Virtuais

- O sistema deve disponibilizar um configurador dinâmico na rota `/personalizar`.
- A interface do configurador deve permitir a montagem interativa de um buquê personalizado selecionando:
  - Flores (tipo, cor e quantidade de hastes).
  - Folhagens ou complementos (quantidade de hastes).
  - Embalagem externa (papel kraft, tecido, juta ou sem embalagem).
  - Fita decorativa (cetim, juta, algodão ou sem fita).
- O preço total do buquê deve ser atualizado dinamicamente em tela conforme o usuário adiciona ou remove componentes, respeitando as regras matemáticas definidas no motor de precificação.
- O configurador deve exibir um resumo textual detalhado contendo a lista exata dos itens selecionados antes do fechamento do pedido.

### RF04: Integração de Pedido com o WhatsApp

- Ao concluir a configuração de um buquê personalizado ou selecionar produtos do catálogo, o sistema deve gerar um link dinâmico para a API do WhatsApp.
- O clique no botão de fechamento de pedido deve abrir o WhatsApp apontando para o número comercial do ateliê com uma mensagem pré-formatada.
- A mensagem do WhatsApp deve descrever com precisão:
  - A lista detalhada de produtos e quantidades.
  - A lista de flores e complementos do buquê personalizado (se aplicável).
  - Os valores unitários e o preço total calculado do pedido.
  - Um identificador único de pedido para controle do ateliê.

### RF05: Formulário de Contato

- O sistema deve coletar o nome, e-mail e a mensagem do usuário na seção de contato.
- Todos os campos do formulário devem conter validação em tempo real no cliente antes do envio.

### RF06: Página de Erro 404 Personalizada

- Rotas não mapeadas no Next.js devem redirecionar automaticamente para a página de erro personalizada ([not-found.tsx](file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/not-found.tsx)).
- A página de erro deve exibir uma mensagem acolhedora que utilize metáforas florais (exemplo: "Esta flor ainda não brotou no nosso jardim") e botões explícitos para retornar à Home ou ao catálogo.

---

## 2. Requisitos Não Funcionais (RNFs)

Os requisitos não funcionais especificam critérios que podem ser usados para julgar a operação de um sistema, em vez de comportamentos específicos.

### RNF01: SEO e Metadados (Search Engine Optimization)

- O site deve atingir uma pontuação mínima de 95/100 na auditoria de SEO do Google Lighthouse.
- Cada rota deve conter metadados dinâmicos (títulos descritivos exclusivos e meta-descrições cativantes dentro do limite de 160 caracteres).
- Imagens devem conter o atributo `alt` detalhado para indexação e acessibilidade de leitores de tela.

### RNF02: Desempenho e Carregamento (Core Web Vitals)

- O Largest Contentful Paint (LCP) deve ocorrer em menos de 2.5 segundos em conexões móveis simuladas (Fast 3G).
- O Cumulative Layout Shift (CLS) deve ser menor que 0.1 para evitar saltos inesperados de layout durante o carregamento de imagens ou fontes.
- Todas as mídias de produto devem ser servidas em formatos modernos otimizados (como WebP ou SVG).

### RNF03: Fluidez e Taxa de Quadros nas Animações

- As animações de rolagem (GSAP ScrollTrigger) e transições de tela (Framer Motion) devem ser executadas a 60 FPS (quadros por segundo) em navegadores modernos.
- O smooth scroll (Lenis) deve suavizar a rolagem do usuário em computadores e dispositivos móveis, sem causar atrasos de entrada (input lag).

### RNF04: Responsividade e Visual Mobile-First

- A interface do usuário deve ser otimizada prioritariamente para smartphones (visual mobile-first) e adaptar-se perfeitamente para tablets e desktops.
- Grelhas de catálogo e componentes de formulário devem se autoajustar conforme a largura da tela do cliente.

### RNF05: Acessibilidade Semântica

- O código HTML deve utilizar tags semânticas (como `header`, `main`, `section`, `footer`, `nav`, `h1`-`h6`).
- Botões interativos e links dinâmicos devem possuir tags `id` exclusivas para facilitar a execução de testes automatizados e automação de leitores de tela.

### RNF06: Conformidade contra Travessões (Quality Gate)

- É requisito mandatório a ausência absoluta de travessões (em dash e en dash) no código e nos textos da aplicação. O pipeline do projeto deve travar a compilação automática caso esses caracteres sejam detectados.
