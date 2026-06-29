# Plano de implementação — Rework do card das marcas + fluxo /reparar

Portar dois protótipos (`TechFix Landing.dc.html` › secção `#marcas`, e `TechFix Reparar.dc.html`) para o codebase React real (`Projects/frontend`, Vite + Ant Design + react-router) e backend Hono/D1 (`Projects/backend`).

Referência visual: tokens em `src/index.css` (`--primary #0b3a66`, `--accent #ff7a1a`, `--ink`, `--mist`, `--line`, `--muted`), tipografia Space Grotesk (display) + Manrope (texto).

---

## Decisão-chave: logos das marcas

Hoje `Brands.jsx` usa ícones estáticos de `react-icons/si` mapeados à mão (`BRAND_ICONS`). O pedido foi **logos reais atualizados automaticamente**.

**Solução:** servir o logo a partir do CDN do Simple Icons — `https://cdn.simpleicons.org/{slug}` (mono na cor da marca: `/{slug}/{HEX}`). Sem rebuild quando se adiciona uma marca; basta o slug. Fallback para monograma (1ª letra) quando o slug não existe no CDN.

- Adicionar coluna `icon_slug` (e opcional `icon_color`) à tabela `brands`, devolvida pelo endpoint `/api/catalog/brands`.
- Componente `<BrandLogo slug color name />` partilhado: `<img>` + `onError` → estado `failed` → monograma. **Importante:** só renderizar o `<img>` quando há slug (evitar disparar onError com dados em falta).

---

## Fase 1 — Backend (catálogo)

Ficheiro: `Projects/backend/src/routes/catalog.js` (+ migration nova em `Projects/backend/migrations`).

1. Migration: `ALTER TABLE brands ADD COLUMN icon_slug TEXT; ALTER TABLE brands ADD COLUMN icon_color TEXT;` e popular (apple→apple, samsung→samsung/1428A0, xiaomi→xiaomi/FF6900, …).
2. `/brands`: incluir `iconSlug`, `iconColor` e `modelCount` (subquery `COUNT(*) FROM models WHERE brand_id = b.id`) para o subtítulo "N modelos".
3. `/brands/:brandId/families`: já existe; adicionar `modelCount` por família e `minPrice` (MIN sobre `model_issue_types`) para o "desde X€".
4. `/brands/:brandId/models`: adicionar `minPrice` por modelo.
5. `/models/:modelId`: já devolve issues com `price`/`eta`/`description`/`iconKey` — mapear `iconKey` aos ícones SVG do protótipo (ecra, bateria, carga, camara, …).

> Os preços/ETAs do protótipo são simulados. A fonte de verdade é a BD (`model_issue_types`). Não hard-codear no frontend.

---

## Fase 2 — Card das marcas (landing)

Ficheiro: `Projects/frontend/src/components/Brands.jsx`.

Substituir o grid de chips de 7 colunas pelo **menu horizontal premium** do protótipo:

- Grid 4 colunas (`repeat(4,1fr)`), gap 16px → 2 col @920px → 1 col @600px.
- Cada card = `<Link to="/reparar/{id}">` horizontal: logo (52px, caixa `--mist`/`--line`), nome + `kinds`/`modelCount` como subtítulo, chevron à direita. Hover: `translateY(-4px)` + sombra.
- Remover o mapa `BRAND_ICONS` e a dependência de `react-icons/si` para as marcas; usar `<BrandLogo>`.
- Subtítulo "gamas" (ex. "iPhone · iPad · Mac"): derivar das famílias devolvidas pela API, ou campo `tagline` na BD.
- Último card destacado (navy) "Ver todas as marcas" → `/reparar`.
- Manter skeleton de loading e `aria-busy`/`aria-live` já existentes.
- Atualizar o copy do header da secção (eyebrow + subtítulo "Clique na sua marca para ver modelos, avarias e preços").

---

## Fase 3 — Fluxo /reparar

Rotas em `App.jsx` (já existentes): `/reparar`, `/reparar/:brandId`, `/reparar/:brandId/:familyId`, `/reparar/:brandId/:familyId/:modelId`.

Elementos transversais novos (extrair como componentes):

- **`RepairLayout`** — header escuro sticky + hero com gradiente radial e **stepper** (Marca › Gama › Modelo › Reparação; passos concluídos clicáveis). Hero recebe `eyebrow`, `title`, `sub` e slot opcional de pesquisa.
- **`BrandLogo`** — partilhado com a Fase 2.
- **`SearchInput`** — pesquisa client-side (filtra marcas / modelos já carregados).

Mapeamento ecrã ↔ ficheiro:

1. **BrandPicker.jsx** (`/reparar`) — grid de marcas com `<BrandLogo>` + "N modelos", pesquisa, empty state. Clicar: se >1 família → família; senão salta para modelos.
2. **FamilyPicker.jsx** (`/reparar/:brandId`) — cards de gama com ícone por `category` (phone/tablet/laptop/watch) + "N modelos · desde X€". Botão voltar.
3. **ModelPicker.jsx** (`/reparar/:brandId/:familyId`) — grid de modelos com "desde X€", pesquisa, empty state.
4. **ModelDetail.jsx + IssueGrid + IssuePriceCard + StickyPanel** (`…/:modelId`) — layout 2 colunas:
   - Esquerda: grelha de avarias selecionáveis (`IssuePriceCard` redesenhado: ícone, descrição, "desde X€", ETA, estado selecionado com borda laranja + tick).
   - Direita: `StickyPanel` redesenhado (`Affix` já em uso) — logo+modelo, resumo da avaria selecionada (preço grande, ETA), CTA "Pedir orçamento grátis" → `ContactModal`, botão telefone, trust badges (garantia 90d, diagnóstico grátis, recolha).

Reaproveitar `ContactModal.jsx` para o CTA; passar marca/modelo/avaria selecionada no payload.

---

## Fase 4 — Polish & QA

- Tokens: trocar o ciano legacy (`#00b4d8` em `IssuePriceCard`/`StickyPanel`) por `--accent #ff7a1a`.
- Responsivo: validar breakpoints 980px / 600px (grids colapsam, painel deixa de ser sticky, esconder labels no header).
- Estados: loading (skeletons), erro de API (mensagem + telefone), empty da pesquisa.
- Acessibilidade: focus visível nos cards, `alt` nos logos, hit targets ≥44px.
- Garantir que `minPrice`/`modelCount` vêm da API e não duplicam lógica de preço no cliente.

---

## Ordem sugerida

1. Migration + endpoints (Fase 1) — desbloqueia tudo.
2. `BrandLogo` partilhado.
3. Card das marcas na landing (Fase 2) — entrega visível rápida.
4. `RepairLayout` + stepper.
5. Os 4 ecrãs do /reparar (Fase 3).
6. Polish/QA (Fase 4).

Protótipos a usar como referência pixel: `TechFix Landing.dc.html` (#marcas) e `TechFix Reparar.dc.html`.
