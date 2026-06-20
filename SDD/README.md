# SDD | Amaranthos Atelie (Web Project)

> Software Design Document do website da Amaranthos Atelie.
> Documento vivo: acompanha o codigo, nao o substitui. Onde divergir do codigo, o codigo vence e o SDD e atualizado.

## Objetivo

Registrar como o site da Amaranthos e desenhado e construido: visao, requisitos, arquitetura, design detalhado, seguranca, testes e operacao. Serve para manter o registro das escolhas arquiteturais do projeto (aplicando a metodologia PatternForge Architect) e servir como guia de referencia tecnica.

## Escopo

O site da Amaranthos Atelie e composto por uma Landing Page institucional com cinco secoes principais (Hero, CatalogPreview, Personalizar, Sobre e Contato), alem de paginas de catalogo especificas por categoria (Buques, Flores Avulsas, Centros de Mesa e Chaveiros), uma pagina de erro 404 e o Configurador de Buques virtual.

## Stakeholders

- Gisele Estefane: fundadora, Product Owner, designer das pecas. Dirige o produto e faz QA.
- Leonardo Goncalves (Leovox Studios): Tech Lead e QA.
- Antigravity IA: execucao tecnica, engenharia de software e frontend.

## Documentos de referencia

- `docs/brand-kit.md`: Guia oficial de marca, cores e fontes.
- `docs/precificacao.md`: Metodo de calculo de custos e precos.
- `docs/PIPELINE.md`: Roteiro das secoes e estado de desenvolvimento.
- `CONTRIBUTING.md`: Fluxo de trabalho, git e portoes de qualidade.
- `CLAUDE.md`: Memoria e regras de programacao para agentes IA.

## Como navegar

| Pasta                  | O que tem                                     |
| ---------------------- | --------------------------------------------- |
| `01-visao-geral/`      | Contexto, motivacao, objetivos e restricoes   |
| `02-requisitos/`       | Requisitos funcionais e nao funcionais        |
| `03-arquitetura/`      | Visao arquitetural, diagramas e tecnologias   |
| `04-design-detalhado/` | Modelo de dados, modulos, interfaces e fluxos |
| `05-seguranca/`        | Controles de seguranca e privacidade          |
| `06-testes/`           | Estrategia e casos de teste                   |
| `07-operacional/`      | Deploy, hospedagem e monitoramento            |
| `08-anexos/`           | Exemplos, referências e glossario             |

Principio editorial deste SDD: arquivos curtos, objetivos e referenciados entre si.
