# CLAUDE.md | Amaranthos Web Project

> Memoria do projeto, lida pela IA em toda sessao. Codinome AMARANTHOS.
> Flores artesanais em chenille que nao murcham, afeto permanente.

## Contexto

A Amaranthos e um atelie artesanal premium fundado por Gisele Estefane (a PO). O site e uma vitrine digital delicada que apresenta suas pecas exclusivas feitas a mao no Jordao Baixo (Recife, PE). O site deve transmitir a calma, o cuidado e o afeto de cada peca, combinando uma identidade visual retro-nostalgica (anos 70 + Y2K tardio) com animacoes fluidas e elegantes. A PO dirige e faz QA. Voce (a IA) executa e propoem os codigos e comandos.

## Stack real (nao-negociavel)

- Next.js 15 (App Router) + React 19 + TypeScript estrito (`strict: true`)
- TailwindCSS v4 (@theme inline no globals.css)
- Framer Motion para microinteracoes e transicoes de pagina
- GSAP 3 + ScrollTrigger para animacoes cinematograficas no hero
- Lenis para smooth scroll global
- Vitest para testes unitarios
- SEM shadcn/ui: todos os componentes sao 100% customizados

## Documentos canonicos

- `docs/brand-kit.md`: Identidade visual completa, paleta de cores e tipografia.
- `docs/precificacao.md`: A fonte da verdade para formulas e precos de produtos.
- `docs/PIPELINE.md`: Roteiro de producao secao por secao, com estados de desenvolvimento.
- `CONTRIBUTING.md`: Guia de contribuicao, fluxo de trabalho e portoes de qualidade.

## Regras de marca no codigo (Do-Not-Break)

1. Travessao banido em qualquer arquivo (strings, comentarios, commits, PRs). Use virgula, ponto, pipe ou parenteses.
2. Nunca usar preto puro `#000000` em textos: use sempre Grafite `#2A1F24`.
3. Nunca usar gradientes: a identidade visual da marca e flat.
4. Nunca usar drop shadows pesadas: as sombras sao suaves (respiracao, nao peso).
5. Nunca usar emojis na copy do site: o texto afetivo sustenta a mensagem sozinho.
6. Nunca usar Title Case ou ALL CAPS nos titulos e labels: use sempre sentence case.
7. Nunca rotacionar, espelhar ou recolorir o mascote (`isologo.svg`).
8. Nunca usar a fonte Mainstay em corpo de texto: ela e de uso exclusivo para display/títulos.
9. Nunca usar branco puro `#FFFFFF` como background principal: use sempre Creme `#FDF7F1`.
10. Nunca usar animacoes agressivas: a transicao deve ser suave, com ease-out-expo e duracao de 200 a 400ms.

## Tipografia no CSS

- **Mainstay**: Display principal (Hero, titulos de secao). Fontes locais em `public/fonts/`.
- **Moontime**: Script secundario (Taglines afetivas, detalhes). Fonte local em `public/fonts/`.
- **DM Sans**: Fontes de interface e corpo de texto (Google Fonts).
- **Inter**: Numeros e precos com fonte tabular (Google Fonts).

## Portao de qualidade

O script `pnpm run validate` executa os seguintes passos em sequencia:

1. `check:travessao`: Verifica que nao ha travessao no repositorio.
2. `format:check`: Valida a formatacao com Prettier.
3. `typecheck`: Valida os tipos do TypeScript.
4. `lint`: Executa o ESLint.
5. `test`: Executa os testes unitarios (regras de marca e integridade de assets).
6. `build`: Garante que o build do Next.js compila sem avisos ou erros.

O script `pnpm run smoke` sobe o build de producao localmente e executa testes de fumaça (smoke tests) para garantir navegacao sem erros 404 ou excecoes no console.

## Git e Fluxo de Trabalho (PO executa)

Voce sugere os comandos e mensagens de commit, a Gisele executa:

- Branches por secao: `secao/hero`, `secao/personalizar`, etc.
- Commits em portugues, modo imperativo (ex: "Cria scaffold do projeto", nao "Criei scaffold...").
- Nunca commite ou crie branches diretamente. Devolva a proposta no final da resposta.

## Estrutura do projeto

- `src/app/`: Layouts, paginas e CSS global do Next.js.
- `src/sections/`: Componentes grandes de secoes da home (Hero, CatalogPreview, etc.).
- `src/components/`: Componentes reutilizaveis (`brand/`, `layout/`, `ui/`).
- `src/lib/`: Motores de precificacao, utilidades, configuracoes de gsap, lenis e tipos.
- `src/data/`: Dados estaticos tipados de flores, buques, etc.
- `assets/`: Diretorio de assets estaticos fonte (preservados).
- `public/`: Assets servidos de forma estatica pelo Next.js (fontes de marca, favicon).
