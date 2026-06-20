# Módulo 6: Testes

Este documento descreve a estratégia de testes, os portões de qualidade automatizados e os critérios de validação técnica do projeto **AmaranthosWeb**.

---

## 1. Estratégia de Qualidade de Software

A garantia de qualidade do projeto AmaranthosWeb baseia-se em um pipeline de testes em duas frentes complementares: testes unitários de lógica/integridade e testes de integração de navegação real em browser (smoke tests).

A conformidade do código com as regras de design e de negócios é validada de forma automatizada localmente antes de cada ciclo de integração.

---

## 2. Testes Unitários (Vitest)

Os testes unitários executados com o framework Vitest garantem que regras essenciais do domínio não sofram regressão durante o desenvolvimento:

- **Validação de Regras de Marca ([tests/brand.test.ts](file:///c:/Design/Projetos/Gisele/AmaranthosWeb/tests/brand.test.ts))**:
  - Garante que a paleta de cores não contenha tons de preto puro (`#000` ou `#000000`) nem branco puro (`#fff` ou `#ffffff`) nos fundos principais das telas, preservando a identidade sofisticada definida pela designer de produto.
  - Verifica a declaração correta das fontes institucionais no código (`Mainstay` e `Moontime`).
- **Validação de Caminhos de Assets ([tests/asset-paths.test.ts](file:///c:/Design/Projetos/Gisele/AmaranthosWeb/tests/asset-paths.test.ts))**:
  - Varre todas as listas e tabelas de dados de produtos da pasta `src/data/` para certificar-se de que os caminhos das imagens neles declarados apontam para arquivos que de fato existem no disco rígido físico do repositório. Previne erros de imagens quebradas em produção.

---

## 3. Smoke Tests de Navegação de Browser (Playwright)

O smoke test automatizado ([scripts/smoke.mjs](file:///c:/Design/Projetos/Gisele/AmaranthosWeb/scripts/smoke.mjs)) executa as seguintes etapas no ambiente de homologação local:

1. Inicia o servidor local Next.js em modo de pré-visualização de produção (`next start`) na porta 3000.
2. Inicializa uma instância real de navegador Chromium sem interface gráfica (headless) utilizando o Playwright.
3. Navega de forma sequencial por todas as rotas-chave da aplicação:
   - Home (`/`)
   - Buquês (`/buques`)
   - Flores Avulsas (`/flores-avulsas`)
   - Centros de Mesa (`/centros-de-mesa`)
   - Chaveiros (`/chaveiros`)
   - Personalizar (`/personalizar`)
   - Sobre (`/sobre`)
   - Rota de teste de erro (`/rota-inexistente-para-404`)
4. Monitora a navegação e falha imediatamente caso:
   - Ocorra alguma exceção JavaScript ou rejeição de promessa não tratada na página.
   - Qualquer arquivo de imagem ou script resulte em erro HTTP 404 (Not Found).
   - O console do navegador registre algum `console.error` de script de página.
5. Finaliza e encerra o processo do servidor local Next.js com segurança.

---

## 4. Pipeline de Qualidade Unificado (`pnpm run validate`)

O comando unificado `validate` no arquivo de manifesto `package.json` encadeia as checagens obrigatórias do projeto:

```bash
pnpm run check:travessao && pnpm run format:check && pnpm run typecheck && pnpm run lint && pnpm run test && pnpm run build
```

As etapas do pipeline garantem:

1. **`check:travessao`**: Bloqueia o uso de caracteres de travessão em qualquer arquivo.
2. **`format:check`**: Valida a formatação correta de estilos e arquivos com Prettier.
3. **`typecheck`**: Compilação TypeScript estrita sem qualquer aviso de tipo de dados inválido.
4. **`lint`**: Ausência de más práticas de escrita de código detectadas pelo ESLint.
5. **`test`**: Execução bem-sucedida de todos os testes unitários do Vitest.
6. **`build`**: Geração bem-sucedida do pacote otimizado de produção do Next.js.
