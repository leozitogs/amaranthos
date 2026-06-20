# Como este projeto e tocado

Este repositorio e o site oficial da Amaranthos Atelie em producao. Ele e publico por design: o processo aqui dentro e tao deliberado quanto o resultado. Eu (Gisele, fundadora) dirijo o projeto como Product Owner, e o Leo (Leovox Studios) atua como Tech Lead e QA. O desenvolvimento e realizado de forma assistida, e nada entra sem a minha aprovacao e execucao por escrito.

## O fluxo, secao a secao

O site e composto por secoes e o roteiro de producao vive em `docs/PIPELINE.md`. Cada secao segue o mesmo ciclo, sem atalhos:

1. Briefing com definicao visual aprovada antes de qualquer codigo.
2. Plano de execucao (arquivos, abordagem, libs) aprovado por escrito.
3. Build estatico primeiro, movimento depois.
4. QA de secao: scroll em todas as direcoes e velocidades, interacoes em dispositivos moveis, reduced-motion respeitado, e qualquer bug de animacao deve ser reproduzido em browser antes de corrigido.
5. Um Pull Request por secao, com o template de PR e checklist de marca preenchidos.

## Git

- Branches por secao: `secao/hero`, `secao/sobre`, e assim por diante.
- Commits em portugues, modo imperativo (ex: "Adiciona secao hero", nao "Adicionei...").
- `pnpm run validate` precisa passar antes de qualquer commit ou pull request. Sem excecao, sem `--no-verify`.
- Apenas a Product Owner realiza as acoes de Git (commit, push, criacao de branches, merge). A IA propoe os comandos e textos correspondentes.
- Fluxo trunk-based: secao para a main via PR com CI verde.

## Portao de qualidade

```bash
pnpm run validate
```

Roda em sequencia: checagem de travessao, typecheck, lint, formacao com Prettier, testes unitarios (regras de marca e assets) e build do Next.js.

O CI repete tudo em cada push e PR, e roda o smoke test de browser:

```bash
pnpm run build && pnpm run smoke
```

O smoke test sobe o build de producao local e abre um Chromium real, navegando pelas rotas e verificando se ocorrem erros 404, excecoes nao tratadas ou falhas no console.

## Regras de marca no codigo

1. Travessao banido em qualquer conteudo (string, comentario, copy, commit, PR). Use virgula, ponto, pipe ou parenteses.
2. Nunca usar preto puro `#000000` em textos: use sempre Grafite `#2A1F24`.
3. Nunca usar gradientes: a identidade visual da marca e flat.
4. Nunca usar drop shadows pesadas: as sombras sao suaves (respiracao, nao peso).
5. Nunca usar emojis na copy do site: o texto afetivo sustenta a mensagem sozinho.
6. Nunca usar Title Case ou ALL CAPS nos titulos e labels: use sempre sentence case.
7. Nunca rotacionar, espelhar ou recolorir o mascote (`isologo.svg`).
8. Nunca usar a fonte Mainstay em corpo de texto: ela e de uso exclusivo para display/títulos.
9. Nunca usar branco puro `#FFFFFF` como background principal: use sempre Creme `#FDF7F1`.
10. Nunca usar animacoes agressivas: a transicao deve ser suave, com ease-out-expo e duracao de 200 a 400ms.

## Documentos

| Arquivo                | Descricao                                                       |
| ---------------------- | --------------------------------------------------------------- |
| `docs/PIPELINE.md`     | O roteiro das secoes, estado de cada uma e como sao produzidas. |
| `docs/brand-kit.md`    | Identidade visual, paleta de cores e tipografia da Amaranthos.  |
| `docs/precificacao.md` | Formulas de calculos de precos e valores de referencia.         |
| `CONTRIBUTING.md`      | Este documento: regras de fluxo e contribuicao.                 |
| `CLAUDE.md`            | Memoria e instrucoes de projeto para a IA.                      |
