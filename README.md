# Amaranthos Atelie | Web Project

> Flores feitas a mao em hastes de chenille que nao murcham. Afeto permanente.

Este e o repositorio oficial do website da Amaranthos Atelie. O projeto foi estruturado seguindo os padroes organizacionais do portfolio Leovox Studios, aplicando a metodologia PatternForge Architect.

O site e uma vitrine digital premium que permite conhecer o catalogo, ler a historia do atelie e personalizar buques e arranjos artesanais.

## Stack de Desenvolvimento

- **Core**: Next.js 15 (App Router) com React 19 e TypeScript
- **Estilizacao**: TailwindCSS v4 (sem tailwind.config, configurado via CSS inline no globals.css)
- **Animacao**: Framer Motion (para microinteracoes e rotas) e GSAP + ScrollTrigger (para a secao hero)
- **Rolagem**: Lenis para smooth scroll global
- **Testes**: Vitest para testes unitarios e Playwright para testes de fumaça (smoke tests)
- **Gerenciador**: pnpm

## Como Rodar Localmente

Instale as dependencias e inicie o servidor de desenvolvimento:

```bash
pnpm install
pnpm run dev
```

O servidor estara acessivel em `http://localhost:3000`.

## Garantia de Qualidade

Antes de qualquer commit, rode o portao de qualidade para validar o codigo:

```bash
pnpm run validate
```

Este comando executa em sequencia:

1. `check:travessao`: Varredura para garantir que nenhum caractere de travessao foi utilizado.
2. `format:check`: Valida a formatacao dos arquivos com o Prettier.
3. `typecheck`: Compilacao estrita do TypeScript.
4. `lint`: Verifica as regras de linter do ESLint.
5. `test`: Executa os testes unitarios (regras de marca e existencia de assets).
6. `build`: Garante a geracao de build estatica do Next.js sem erros.

## Documentacao do Projeto

| Onde                   | O que                                                                    |
| ---------------------- | ------------------------------------------------------------------------ |
| `docs/brand-kit.md`    | Guia oficial da marca: paleta de cores, tipografia e diretrizes visuais. |
| `docs/precificacao.md` | Formulas de calculo de custos e precos dos produtos.                     |
| `docs/PIPELINE.md`     | O roteiro das secoes do site e o estado de desenvolvimento de cada uma.  |
| `CONTRIBUTING.md`      | Diretrizes de fluxo de trabalho, git e portoes de qualidade.             |
| `CLAUDE.md`            | Contexto do projeto e regras de programacao para agentes IA.             |

## Licenca

Copyright © 2026 Amaranthos Atelie. Todos os direitos reservados.
