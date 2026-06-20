# Amaranthos Atélie — brand-kit.md

> **Status:** 🔒 Brand kit oficial da Amaranthos Atélie
> **Fundadora:** Gisele Estéfane
> **Localização:** Recife, PE — Jordão Baixo
> **Instagram:** [@amaranthos](https://instagram.com/amaranthos)
> **Última atualização:** 20 de abril de 2026

---

## 1. Essência da marca

A Amaranthos é um **atélie artesanal premium** com uma proposta única: flores feitas à mão em hastes de chenille (limpador de canudo) que **não murcham**. Cada peça é única, produzida com calma por uma única artesã no Jordão Baixo.

### 1.1. Pilares narrativos

1. **Feito à mão** — cada peça é produzida manualmente, uma a uma, com tempo e atenção
2. **Duradoura** — a flor que não murcha, simbolizando afeto permanente
3. **Local** — ateliê hiperlocal em Recife, entrega em mãos ou bike/moto

### 1.2. Arquétipo de marca

**Criadora com forte carga afetiva.** Artesã que dá vida a objetos únicos, com um toque retrô-nostálgico (anos 70 + Y2K tardio) que diferencia a Amaranthos do padrão saturado-pastel comum no nicho de artesanato.

### 1.3. Tom de voz

- **Íntimo, afetivo e direto** — conversa como vizinha, não como corporação
- **Primeira pessoa do singular** quando a Gisele fala diretamente ("feito à mão", "pensei em você")
- **Sem exageros** — nada de "o presente perfeito", "transforme o dia dela". A Amaranthos confia na sutileza
- **Sem emoji, sem exclamação excessiva** — a voz sustenta o afeto sem precisar de muletas visuais
- **Sem apelo temporal genérico** — "Dia das Mães" e "Dia dos Namorados" ficam por conta de Instagram e páginas de campanha, não do site permanente

---

## 2. Paleta de cores

Cores extraídas diretamente dos SVGs oficiais produzidos pela Gisele. Nenhuma adaptação, nenhuma aproximação.

### 2.1. Paleta primária

| Nome                 | HEX       | RGB                | Uso principal                                                           |
| -------------------- | --------- | ------------------ | ----------------------------------------------------------------------- |
| **Vinho Amaranthos** | `#874B69` | rgb(135, 75, 105)  | Tipografia principal, stroke do logo, títulos, textos de alto contraste |
| **Rosa poeira**      | `#F0D2D2` | rgb(240, 210, 210) | Preenchimento do mascote, backgrounds suaves, destaques pastel          |
| **Verde menta**      | `#B4D2C3` | rgb(180, 210, 195) | Contorno do logo, acentos gráficos, detalhes decorativos                |

### 2.2. Paleta de apoio

| Nome             | HEX       | RGB                | Uso                                                                 |
| ---------------- | --------- | ------------------ | ------------------------------------------------------------------- |
| **Creme**        | `#FDF7F1` | rgb(253, 247, 241) | Background principal do site, substituindo o branco puro            |
| **Branco**       | `#FFFFFF` | rgb(255, 255, 255) | Cards, espaços respiráveis, áreas de foco                           |
| **Grafite**      | `#2A1F24` | rgb(42, 31, 36)    | Texto secundário, ícones, detalhes discretos (substitui preto puro) |
| **Rosa escuro**  | `#6B3A52` | rgb(107, 58, 82)   | Hover states do Vinho, contraste aumentado                          |
| **Menta escuro** | `#8AB5A3` | rgb(138, 181, 163) | Hover states do Menta, acentos marcantes                            |

### 2.3. Escala neutra (derivada do Creme)

Para hierarquia de texto, bordas, divisores e estados disabled. Escala em **OKLCH** (compatível com Tailwind v4).

| Token         | HEX aproximado | Uso                            |
| ------------- | -------------- | ------------------------------ |
| `neutral-50`  | `#FDF7F1`      | Background principal           |
| `neutral-100` | `#F5EDE5`      | Surface secundária             |
| `neutral-200` | `#E8DDD2`      | Divisores sutis, borders cards |
| `neutral-400` | `#B0A196`      | Text tertiary, placeholders    |
| `neutral-600` | `#6B5D54`      | Text secondary                 |
| `neutral-800` | `#2A1F24`      | Text primary                   |

### 2.4. Tokens semânticos (referência rápida)

```css
/* globals.css — Tailwind v4 @theme inline */
@theme inline {
  /* Primárias */
  --color-vinho: #874b69;
  --color-rosa: #f0d2d2;
  --color-menta: #b4d2c3;

  /* Apoio */
  --color-creme: #fdf7f1;
  --color-grafite: #2a1f24;
  --color-vinho-escuro: #6b3a52;
  --color-menta-escuro: #8ab5a3;

  /* Semânticos */
  --color-background: var(--color-creme);
  --color-foreground: var(--color-grafite);
  --color-primary: var(--color-vinho);
  --color-primary-foreground: var(--color-creme);
  --color-secondary: var(--color-menta);
  --color-secondary-foreground: var(--color-vinho);
  --color-accent: var(--color-rosa);
  --color-accent-foreground: var(--color-vinho);
  --color-muted: #f5ede5;
  --color-muted-foreground: #6b5d54;
  --color-border: #e8ddd2;
  --color-ring: var(--color-vinho);
}
```

### 2.5. Regras de uso

- **Vinho + Menta juntos** é a assinatura visual da Amaranthos — essa combinação deve aparecer em todo o onboarding (hero, header, CTAs)
- **Rosa poeira** é o coringa — nunca como texto principal (baixo contraste), sempre como background de cards ou preenchimento de mascote
- **Creme como background default** — branco puro deve ser usado apenas em cards que precisam de foco extra
- **Nunca usar preto puro `#000000`** no site — sempre Grafite `#2A1F24`
- **Nunca gradientes** — a marca é flat por natureza, cada cor é lisa e confiável
- **Ratio dark mode:** O projeto é light-mode-first. Dark mode é opcional, com Vinho → Rosa invertido e Creme → Grafite

---

## 3. Tipografia

### 3.1. Fontes da marca (no pacote `assets/brand/fontsBranding/`)

| Fonte        | Arquivo                         | Uso                                                      |
| ------------ | ------------------------------- | -------------------------------------------------------- |
| **Mainstay** | `Mainstay.otf` / `Mainstay.ttf` | Display principal — logo, H1 hero, títulos grandes       |
| **Moontime** | `moontime-regular.ttf`          | Script secundária — "Atélie", tagline, detalhes afetivos |

**Mainstay** é a serif script retrô com contorno duplo que define a marca (vista no logotipo). Uso reservado para momentos display.

**Moontime** é o script cursivo fluido, usado principalmente para a palavra "Atélie" que acompanha o logotipo.

### 3.2. Fontes de UI (Google Fonts)

Pra textos de interface, botões, corpo de texto, labels.

| Fonte       | Uso                                         | Peso usados   |
| ----------- | ------------------------------------------- | ------------- |
| **DM Sans** | Primary UI — body, CTAs, forms, navigation  | 400, 500, 700 |
| **Inter**   | Fallback / números — preços, códigos, dados | 400, 500, 600 |

### 3.3. Hierarquia tipográfica

| Nível      | Fonte    | Tamanho                    | Peso | Uso                                         |
| ---------- | -------- | -------------------------- | ---- | ------------------------------------------- |
| Display XL | Mainstay | `clamp(3rem, 8vw, 6rem)`   | 400  | Hero "Amaranthos"                           |
| Display L  | Mainstay | `clamp(2rem, 5vw, 3.5rem)` | 400  | Section heros ("Buquês", "Centros de mesa") |
| H1         | DM Sans  | `2.25rem` (36px)           | 500  | Título de página                            |
| H2         | DM Sans  | `1.75rem` (28px)           | 500  | Título de seção                             |
| H3         | DM Sans  | `1.25rem` (20px)           | 500  | Nome de produto (card)                      |
| Script     | Moontime | `1.5rem` (24px)            | 400  | "Atélie", taglines afetivas                 |
| Body       | DM Sans  | `1rem` (16px)              | 400  | Texto corrido                               |
| Small      | DM Sans  | `0.875rem` (14px)          | 400  | Descrição curta, metadados                  |
| Caption    | DM Sans  | `0.75rem` (12px)           | 500  | Labels, tags, badges                        |

### 3.4. Regras de uso tipográfico

- **Mainstay nunca em corpo de texto** — ilegível em tamanhos pequenos, reservado pra display
- **Moontime sempre isolada** — uma palavra ou frase curta, nunca parágrafo
- **DM Sans como default** — 95% do site usa DM Sans, mantém legibilidade mobile
- **Números de preço em Inter tabular** — usar `font-feature-settings: "tnum"` pra alinhamento vertical de R$ em listas
- **Line-height generoso** — 1.6 pra body, 1.4 pra títulos (respeito à respiração da marca)
- **Sentence case, nunca ALL CAPS** — a voz Amaranthos não grita

---

## 4. Logo, mascote e aplicações

### 4.1. Arquivos disponíveis em `assets/brand/`

| Arquivo                     | O que é                                               | Quando usar                                            |
| --------------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| `logotipo_completo.svg`     | Logo completo — mascote + "Amaranthos" + "Atélie"     | Home hero, footer, apresentações formais               |
| `isologo.svg`               | Mascote flor colorido (rosa + vinho + contorno menta) | Header compacto, favicon grande, app icons             |
| `isologo_vazado.svg`        | Mascote flor apenas em menta (outline)                | Watermarks, backgrounds decorativos, pattern overlays  |
| `isologo_ico.svg`           | Mascote flor em preto (silhueta)                      | Ícones monocromáticos, aplicações técnicas             |
| `tipografia_amaranthos.svg` | Só a palavra "Amaranthos" + "Atélie"                  | Quando o mascote já aparece em outro lugar             |
| `circle_isotipo.svg`        | Mascote + texto circular "amaranthos • amaranthos"    | Sticker, selo de produto, avatar redondo               |
| `amaranthos_pattern.svg`    | Pattern de flores repetido                            | Background decorativo, embalagens, seções de transição |
| `gisele_estefane.svg`       | Assinatura manuscrita da Gisele                       | Seção "sobre", finalização de cartas, toque pessoal    |

### 4.2. Mascote

O símbolo central da marca é uma **flor estilizada de 6 pétalas** com um ícone geométrico no centro (triângulo/seta que remete ao símbolo "play" ou a uma folha abstrata). Esse símbolo deve ser tratado com o mesmo cuidado que o nome — é a Amaranthos visual.

**Regras do mascote:**

- Sempre preservar as proporções originais (não esticar, não espremer)
- Tamanho mínimo: 32px (abaixo disso perde legibilidade)
- Sempre sobre fundo claro ou neutro — nunca sobre vinho puro
- Nunca redesenhar, recolorir livremente, ou aplicar efeitos (shadow, glow)

### 4.3. Logo em aplicações diversas

- **Header do site:** `isologo.svg` à esquerda, linkando pra home. Altura 40px mobile, 56px desktop.
- **Footer:** `logotipo_completo.svg` centralizado, versão reduzida.
- **Favicon:** `favicon.svg` já está em `public/` — usa o isologo ícone circular.
- **Open Graph (compartilhamento):** criar `og-image.png` 1200x630px com logo completo + tagline sobre fundo creme (próximo ciclo).
- **Stories/Reels:** `circle_isotipo.svg` como sticker permanente nas publicações.

### 4.4. Espaço de respiro

Em qualquer aplicação, reservar **no mínimo a largura de uma pétala** como área de respiro ao redor do logo. Nada de texto, ícones ou bordas invadindo esse espaço.

---

## 5. Sistema de ilustrações

A Amaranthos tem um acervo de **42 ilustrações de produtos** (fotos editadas com fundo transparente) prontas pra uso. Todas em `/assets/`.

### 5.1. Estrutura dos assets

```
assets/
├── bouquets/     # 9 imagens — 1 por buquê (6 principais + Surpresa + Lembrei de ti + Solo em flor)
│   ├── pequeno_afeto.png
│   ├── primeiro_sorriso.png
│   ├── doce_primavera.png
│   ├── modelo_amaranthos.png
│   ├── memoria_em_flor.png
│   ├── tudo_em_flor.png
│   ├── buque_surpresa.png
│   ├── lembrei_de_ti.png
│   └── solo_em_flor.png
├── flowers/      # 22 imagens — 1 por flor do catálogo
├── centers/      # 3 imagens — Jardim de bolso, Abraço de mesa, Grande jardim
├── plants/       # 6 imagens — folhas (eucalipto, espiral, linear, arrozal, costela de adão, ramo)
├── adicionais/   # 5 imagens — fio de fada, borboleta 3D, polaroid, carta, chaveiro
├── brand/        # SVGs de identidade + pasta fontsBranding/
└── common/       # Elementos decorativos (flower.svg, pattern.svg, flor_rabisco.svg)
```

### 5.2. Mapeamento nome do arquivo → produto

**Atenção:** alguns nomes de arquivo diferem do nome oficial do produto. Mapa canônico:

| Arquivo               | Nome oficial no catálogo                                           |
| --------------------- | ------------------------------------------------------------------ |
| `gerbera.png`         | Gérbera                                                            |
| `tulipa1.png`         | Tulipa                                                             |
| `tulipa2.png`         | Tulipa 2                                                           |
| `lirio.png`           | Lírio                                                              |
| `lirio_tigre.png`     | Lírio Tigre                                                        |
| `lirio_do_vale.png`   | Lírio do Vale                                                      |
| `girassol.png`        | Girassol 1 (usar mesmo asset pra Girassol 2)                       |
| `rosa1.png`           | Rosa 1                                                             |
| `rosa2.png`           | Rosa 2                                                             |
| `papoula.png`         | Papoula                                                            |
| `cravo.png`           | Cravo                                                              |
| `hibisco.png`         | Hibisco                                                            |
| `lotus.png`           | Lotús                                                              |
| `peonia.png`          | Peônia                                                             |
| `orquidia.png`        | Orquídea                                                           |
| `copo_de_leite.png`   | Copo de Leite                                                      |
| `margarida_g.png`     | Margarida G                                                        |
| `margarida_m.png`     | Margarida M                                                        |
| `margarida_p.png`     | Margarida P                                                        |
| `mosquitinho.png`     | Mosquitinho                                                        |
| `lavanda.png`         | Lavanda                                                            |
| `jardim_de_bolso.png` | Jardim de bolso (centro P)                                         |
| `abraco_de_mesa.png`  | Abraço de mesa (centro M)                                          |
| `grande_jardim.png`   | Grande jardim (centro G)                                           |
| `buque_surpresa.png`  | Surpresa do ateliê (todos os tamanhos)                             |
| `lembrei_de_ti.png`   | Lembrei de ti (modelo flor avulsa)                                 |
| `dio_de_fada.png`     | Fio de fada ⚠️ _arquivo tem typo — renomear pra `fio_de_fada.png`_ |

### 5.3. Regras de uso das ilustrações

- **Todas têm fundo transparente** — podem ir sobre qualquer cor da paleta
- **Não rotacionar nem espelhar** — cada ilustração foi composta com intenção
- **Não aplicar filtros** (grayscale, hue-shift) — desfigura a identidade
- **Proporção preservada** sempre — usar `object-contain`, não `object-cover`

---

## 6. Sistema de ícones

Pra interface (navegação, CTAs, estados, etc.), usar **Lucide** (`lucide-react`).

### 6.1. Regras

- **Tamanho padrão:** 20px (inline com body text), 24px (em buttons), 16px (em labels compactos)
- **Stroke width:** 1.5 (default do Lucide) — nunca aumentar pra 2+, fica grosso demais
- **Cor:** sempre `currentColor` — segue o texto do contexto
- **Ícones flor-temáticos:** quando houver opção Lucide adequada (`Flower2`, `Leaf`, `Sparkles`), usar. Senão, usar SVG do `assets/common/`

### 6.2. Ícones customizados

- `assets/common/flower.svg` — flor simplificada pra bullet points ou ornamento
- `assets/common/flor_rabisco.svg` — flor em estilo rabisco/desenho a mão, pra acentos afetivos
- `assets/common/pattern.svg` — elemento de pattern pra repetir em backgrounds

---

## 7. Imagens de flores — mapa de referência visual

A Amaranthos tem fotos **individuais de cada flor** (22 fotos) em `assets/flowers/`. Essas imagens são usadas no configurador do buquê — quando a cliente escolhe as flores, ela vê cada opção.

**Importante:** essas imagens **não são ilustrações estilizadas** — são fotos reais das flores de chenille da Gisele sobre fundo transparente. Preservar a textura é essencial (é o diferencial visual do produto).

---

## 8. Motion e animação

Padrão de movimento pra todo o site.

### 8.1. Princípios

- **Suave, não dramático** — a Amaranthos é íntima, não grandiloquente
- **Respira com o usuário** — transições de 200-400ms, nunca abaixo de 150ms nem acima de 600ms
- **Ease** preferencial: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo, sensação de chegar com calma)
- **`prefers-reduced-motion` respeitado sempre** — quando o usuário pede, animações viram fade simples

### 8.2. Tokens de duração

```css
--duration-instant: 100ms; /* Hover, focus */
--duration-fast: 200ms; /* Microinterações, toggles */
--duration-normal: 300ms; /* Transições padrão */
--duration-slow: 500ms; /* Hero reveals, entrada de seção */
--duration-deliberate: 800ms; /* Momentos cinematográficos */
```

### 8.3. Padrões de animação

- **Scroll reveal:** fade + translate-y 20px, stagger de 80ms entre filhos
- **Hover em cards:** scale 1.02, transition 300ms, shadow sutil
- **Hover em buttons:** background shift, transition 200ms
- **Loading states:** skeleton com shimmer suave (não pulse agressivo)
- **Page transitions:** crossfade simples, 400ms

### 8.4. Bibliotecas

- **Framer Motion** — default pra animações componentizadas, entrada/saída, gestures
- **GSAP + ScrollTrigger** — reservado pra efeitos cinematográficos complexos no hero
- **Lenis** — scroll suave global

---

## 9. Layout e espaçamento

### 9.1. Grid

- **Container máximo:** 1280px (`max-w-7xl`)
- **Padding lateral:** 16px mobile, 24px tablet, 48px desktop
- **Grid de produto:** 1 coluna mobile, 2 colunas tablet, 3 colunas desktop, 4 colunas wide

### 9.2. Escala de espaçamento (Tailwind default)

Respeitar a escala Tailwind (0.25rem = 4px). Espaçamentos preferidos:

| Token      | Valor | Uso                                        |
| ---------- | ----- | ------------------------------------------ |
| `space-2`  | 8px   | Entre elementos inline (ícone + texto)     |
| `space-4`  | 16px  | Padding interno de cards                   |
| `space-6`  | 24px  | Gap entre itens em grid compacto           |
| `space-8`  | 32px  | Gap entre seções pequenas                  |
| `space-12` | 48px  | Gap entre seções médias                    |
| `space-24` | 96px  | Gap entre seções grandes (hero → catálogo) |

### 9.3. Border radius

| Token          | Valor  | Uso                              |
| -------------- | ------ | -------------------------------- |
| `rounded-md`   | 6px    | Buttons, inputs, tags            |
| `rounded-lg`   | 12px   | Cards de produto, modals         |
| `rounded-xl`   | 16px   | Cards hero, seções destacadas    |
| `rounded-full` | 9999px | Avatar, botões circulares, pills |

Nunca usar `rounded-none` ou `rounded-sm` — a Amaranthos é arredondada por natureza.

### 9.4. Shadows

Sombras são **suaves**, quase invisíveis. Nunca drop shadows pesadas.

```css
--shadow-sm: 0 1px 2px rgba(42, 31, 36, 0.04);
--shadow-md: 0 2px 8px rgba(42, 31, 36, 0.06);
--shadow-lg: 0 8px 24px rgba(42, 31, 36, 0.08);
--shadow-cinematic: 0 20px 60px rgba(135, 75, 105, 0.12); /* Hero, cards destacados */
```

---

## 10. Regras absolutas (do-not-break list)

1. **Nunca usar preto puro `#000000` em textos** — sempre Grafite `#2A1F24`
2. **Nunca gradientes** — flat é a identidade
3. **Nunca drop shadows pesadas** — sombras são respiração, não peso
4. **Nunca emoji em copy do site** — texto afetivo sustenta sozinho
5. **Nunca Title Case ou ALL CAPS** — sempre sentence case
6. **Nunca rotacionar, espelhar ou recolorir o mascote**
7. **Nunca usar Mainstay em corpo de texto** — reservado pra display
8. **Nunca white puro como background principal** — sempre Creme `#FDF7F1`
9. **Nunca animações agressivas** (bounce exagerado, zoom-in abrupto)
10. **Nunca termos de venda forçados** ("transforme", "o presente perfeito", "última chance")

---

## 11. Assets externos necessários (próximos ciclos)

Lista do que ainda falta produzir — não bloqueia MVP, mas entra em versões seguintes:

- [ ] `og-image.png` (1200x630) pra compartilhamento em redes sociais
- [ ] `apple-touch-icon.png` (180x180) pra iOS home screen
- [ ] Vídeo hero curto (5-10s) — Gisele trabalhando no ateliê, loop silencioso
- [ ] Foto da Gisele pra seção "Sobre" (próximo ciclo)
- [ ] Pack de Stories templates (9 layouts) pra Instagram

---

## 12. Arquivos de referência oficial

Ao importar assets no código, **sempre** usar os arquivos em `assets/` do repositório como source of truth. Nunca recolorir, nunca re-exportar de ferramentas externas sem confirmar com a Gisele.

Fontes:

- `assets/brand/fontsBranding/Mainstay.otf` — display primária
- `assets/brand/fontsBranding/Mainstay.ttf` — fallback
- `assets/brand/fontsBranding/moontime-regular.ttf` — script secundária
- **DM Sans** e **Inter** — Google Fonts (npm install via `next/font` ou similar)

---

_Brand kit Amaranthos Atélie — Recife, PE. Abril 2026._
_Documento mantido por Léo (Leovox Studios) como tech lead do projeto._
