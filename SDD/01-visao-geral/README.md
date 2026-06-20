# Módulo 1: Visão Geral

Este documento apresenta o contexto de negócios, os objetivos do sistema, as restrições de engenharia e os stakeholders do projeto **Amaranthos Ateliê (Web Project)**.

---

## 1. Contexto e Motivação

O **Amaranthos Ateliê** é uma marca de artesanato premium especializada em flores e buquês eternos, tecidos à mão em crochê estruturado de alta definição. Cada peça é tratada como uma obra de arte única que captura momentos especiais e dura para sempre.

A motivação para o desenvolvimento deste website é estabelecer um canal digital próprio, elegante e de alta conversão. O site deve proporcionar uma experiência visual premium (equivalente à qualidade física dos produtos) que conecte a audiência com o conceito de flores eternas, sirva como catálogo digital atualizado e permita a personalização interativa de buquês personalizados de forma virtual.

---

## 2. Objetivos do Sistema

- **Vitrine Premium**: Apresentar os produtos oficiais do ateliê (buquês, flores avulsas, centros de mesa e chaveiros) através de um design minimalista, elegante, fluido e com animações refinadas.
- **Configurador de Buquês**: Proporcionar um assistente virtual onde o cliente possa escolher flores avulsas, folhagens, embalagens e fitas, visualizando a composição e o preço final em tempo real antes de prosseguir.
- **Conversão via WhatsApp**: Encaminhar as intenções de compra e orçamentos configurados diretamente para o WhatsApp comercial do ateliê, com mensagens estruturadas para facilitar o atendimento físico.
- **Otimização de SEO**: Obter classificação orgânica excelente nos mecanismos de busca para consultas de presentes finos, flores eternas, crochê premium e decorações de alto padrão.
- **Desempenho Móvel**: Garantir carregamento ultrarrápido (Core Web Vitals na zona verde) mesmo em conexões móveis limitadas, considerando que a maior parte da audiência acessa o site via smartphones.

---

## 3. Escopo do Produto

O sistema é constituído por:

1. **Página Inicial (Landing Page)**: Composta pelas seções Hero (comunicação de marca), CatalogPreview (vitrine rápida), Personalizar (chamada para o configurador), Sobre (história do ateliê) e Contato (redes sociais e formulário rápido).
2. **Páginas de Catálogo Dedicadas**: Rotas individuais por categoria de produto:
   - Buquês ([buques](<file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/(catalogo)/buques/page.tsx>))
   - Flores Avulsas ([flores-avulsas](<file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/(catalogo)/flores-avulsas/page.tsx>))
   - Centros de Mesa ([centros-de-mesa](<file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/(catalogo)/centros-de-mesa/page.tsx>))
   - Chaveiros ([chaveiros](<file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/(catalogo)/chaveiros/page.tsx>))
3. **Configurador Virtual**: Interface interativa de personalização ([personalizar](file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/personalizar/page.tsx)).
4. **Página de Erro 404**: Página personalizada com tom de voz da marca para resgatar navegação errada ([not-found.tsx](file:///c:/Design/Projetos/Gisele/AmaranthosWeb/src/app/not-found.tsx)).

---

## 4. Stakeholders

- **Gisele Estefane**: Fundadora, Product Owner (PO), Designer das peças. Responsável pelas regras de precificação, curadoria visual, direção do produto e controle de qualidade de ponta a ponta.
- **Leonardo Gonçalves (Leovox Studios)**: Tech Lead e Quality Assurance (QA). Responsável pela governança do repositório, validação de pull requests e aprovação das versões em produção.
- **Antigravity IA**: Engenheira de software, designer de interação e orquestradora técnica encarregada do desenvolvimento do código e conformidade de qualidade.

---

## 5. Restrições Técnicas de Engenharia

- **Framework Base**: Next.js 15.5.19 (App Router) e React 19.0.0.
- **Arquitetura de Estilos**: Tailwind CSS v4.0.0 (sem arquivos de configuração legados, totalmente baseado em declarações CSS nativas e diretivas `@theme` inline).
- **Ausência de Componentes Prontos**: Construção de componentes 100% sob medida. É vedada a importação de bibliotecas de componentes comerciais ou templates pré-prontos (como Shadcn/ui).
- **Controle de Animações**: Uso estrito de GSAP para animações complexas baseadas em scroll e Framer Motion para transições de páginas e microinterações de interface.
- **Sem Travessões**: Restrição absoluta ao uso de travessões (caracteres especiais de em-dash ou en-dash) em todos os arquivos de código, comentários, documentação ou mensagens.
- **Sem Ponto Flutuante nos Preços**: Toda a lógica de precificação deve ser processada em centavos (valores inteiros) para evitar erros de ponto flutuante em JavaScript.
