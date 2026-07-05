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
8. Nunca usar a fonte Mainstay fora do logotipo: ela e exclusiva da marca grafica; o display de hero e titulos de secao e ViaodaLibre.
9. Nunca usar branco puro `#FFFFFF` como background principal: use sempre Creme `#FDF7F1`.
10. Nunca usar animacoes agressivas: a transicao deve ser suave, com ease-out-expo e duracao de 200 a 400ms.

## Tipografia no CSS

Sistema oficial v2 (ViaodaLibre e Poppins oficializadas pela PO):

- **Mainstay**: logotipo e wordmark da marca apenas. Fonte local em `public/fonts/`.
- **ViaodaLibre**: display oficial (titulo do hero e titulos de secao). Local em `public/fonts/`.
- **Moontime**: script afetiva (taglines, "Atelie", detalhes). Local em `public/fonts/`.
- **Poppins**: UI e corpo (header e nav em Light 300, corpo em Regular 400, enfase em 500/600). Local em `public/fonts/`.
- **Inter**: numeros e precos com fonte tabular (Google Fonts).
- **DM Sans**: descontinuada, substituida por Poppins (remover no cleanup).

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

- `src/app/`: Layouts, páginas e CSS global do Next.js.
- `src/sections/`: Componentes grandes de seções da home (Hero, CatalogPreview, etc.).
- `src/components/`: Componentes reutilizáveis (`brand/`, `layout/`, `ui/`).
- `src/lib/`: Motores de precificação, utilidades, configurações de gsap, lenis e tipos.
- `src/data/`: Dados estáticos tipados de flores, buquês, etc.
- `public/assets/`: Ativos estáticos oficiais organizados por categoria (fontes de marca, cenas, modelos 3D, imagens de produtos).
- `public/fonts/`: Fontes locais servidas estaticamente pelo Next.js.

## Processamento de Mídia

- É permitida e autorizada a utilização da ferramenta `ffmpeg` para conversão, compressão e otimização de vídeos e imagens do projeto.

## Squad de subagentes (.claude/agents)

O projeto tem uma squad de 15 subagentes especialistas em `.claude/agents/`, todos
com prefixo `amaranthos-`. Quem opera o Claude Code despacha via `Task`. A regra de
ouro: o agente central tem contexto amplo mas raso; a qualidade vem da
especializacao. Para trabalho visual, de animacao, scroll, 3D ou auditoria,
despache o especialista em vez de codar direto.

| Subagente                         | Quando usar                                           |
| --------------------------------- | ----------------------------------------------------- |
| `amaranthos-conductor`            | Brief grande e multidisciplinar. Orquestra os outros. |
| `amaranthos-art-director`         | Antes de codar cena nova. Devolve Visual Spec.        |
| `amaranthos-asset-curator`        | Path exato de qualquer asset em `public/assets/`.     |
| `amaranthos-frontend-architect`   | Componente e secao Next.js, Tailwind, estrutura.      |
| `amaranthos-animation-engineer`   | Framer Motion e GSAP em tempo real, gesto, hover.     |
| `amaranthos-scroll-storyteller`   | GSAP ScrollTrigger pinado e scrubado (hero, nuvens).  |
| `amaranthos-transitions-engineer` | Lenis e transicao de rota, sem corte branco.          |
| `amaranthos-3d-engineer`          | Buque 3D em Three.js puro sobre o video do hero.      |
| `amaranthos-shader-artist`        | GLSL custom (uso raro, so quando a cena exigir).      |
| `amaranthos-video-pipeline`       | ffmpeg, compressao do video do hero e do mascote.     |
| `amaranthos-ux-microcopy`         | Texto curto na voz intima da marca, em portugues.     |
| `amaranthos-brand-guard`          | SEMPRE antes de aprovar entrega. Audita a marca.      |
| `amaranthos-a11y-auditor`         | SEMPRE antes de entregar. WCAG 2.1 AA.                |
| `amaranthos-performance-watchdog` | Bundle, FPS, peso de asset.                           |
| `amaranthos-catalog-builder`      | Paginas e cards de catalogo e base do configurador.   |

Fluxo padrao de uma secao: asset-curator (paths), art-director (Visual Spec),
frontend-architect (build estatico), depois animation/scroll/transitions/3D
conforme a camada, ux-microcopy ao final, e por fim brand-guard mais a11y-auditor
(obrigatorios) e performance-watchdog (quando houver peso novo).

Otimizacao de custo por modelo: Opus em conductor e art-director (decisao);
Sonnet nos engineers e no microcopy (build); Haiku em asset-curator, a11y-auditor
e performance-watchdog (auditoria barata e rapida). Ajuste o campo `model:` no
frontmatter se quiser mudar.

Detalhes de instalacao e uso em `.claude/agents/README.md`. Nenhum subagente
commita, pusha ou cria branch: apenas o PO executa Git.
