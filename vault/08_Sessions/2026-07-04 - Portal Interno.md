---
type: session-handoff
status: current
created: 2026-07-05
updated: 2026-07-05
tags:
  - current
related:
  - "[[01_Project_State]]"
  - "[[Portal Interno - Arquitetura]]"
  - "[[Cloudflare Access]]"
  - "[[Contacts e Issue Types - Campos Admin]]"
---

# Sessão 2026-07-04 — Portal Interno (implementação completa)

## O que foi pedido
Utilizador quer `portal.<dominio>` para gerir dados da BD (catálogo) e tratar
mensagens de contacto. Sessão cobriu planeamento, implementação completa,
limpeza de código morto, e atualização de memória (vault + graphify).

## Decisões tomadas (ver [[Portal Interno - Arquitetura]] para detalhe)
- Auth: Cloudflare Access (Zero Trust), 1 utilizador só, sem tabela `users`/JWT
  próprio.
- Estrutura: `portal/` nova pasta no MESMO repo (sibling de `frontend/`/`backend/`),
  sem repo GitHub separado, sem workspace tooling.
- Backend: reutiliza o Worker `techfix-backend` + D1 existente, rotas novas
  `/api/admin/*`.
- Deploy: novo Cloudflare Pages project (root `portal/`), subdomínio próprio.
- Scope: CRUD catálogo (brands/model-families/models/issue-types/model-issue-types)
  + gestão de mensagens de contacto. Encomendas/faturação ficam fora, roadmap futuro.
- Stack frontend: Ant Design Pro (Umi Max), template `simple`, escolha do
  utilizador para montar CRUD rápido.

## O que foi implementado (tudo testado localmente)
- **Migrations**: `0019_issue_types_soft_delete.sql`, `0020_contacts_admin_fields.sql`
  — aplicadas local, testadas.
- **Backend** (`backend/src/`):
  - `middleware/access.js` — valida JWT Cloudflare Access via `jose`, com bypass
    `LOCAL_DEV=true` em `.dev.vars` (git-ignored) para dev local.
  - `lib/db.js` — helpers `softDelete`/`restore`/`isUniqueConstraintError`.
  - `routes/admin/{brands,model-families,models,issue-types,model-issue-types,contacts}.js`
    + `routes/admin/index.js` agregador com middleware aplicado uma vez.
  - `index.js` — monta `/api/admin`, CORS allowlist atualizada (placeholder
    `portal.<dominio>` até domínio fechar).
  - `wrangler.toml` — vars `CF_ACCESS_TEAM_DOMAIN`/`CF_ACCESS_AUD` como
    `REPLACE-ME` (placeholders).
  - Testado via `wrangler dev`: CRUD completo, 409 unique constraint, 400 FK
    inválida, soft-delete/restore, 401 sem auth, upsert em lote de preços.
- **Frontend** (`portal/`): scaffold Ant Design Pro, 6 páginas CRUD
  (brands, model-families, models, issue-types, model-issue-types, contacts).
  `tsc --noEmit` limpo, testes Vitest passam, `npm run build` funciona.
- **Limpeza pós-scaffold**: ~70 pacotes npm órfãos removidos (openAPI codegen,
  request-record, mock server, 7 locales além de pt-BR), ficheiros mortos do
  template AntD Pro apagados (CNAME, PWA manifest/service-worker não wired,
  4 componentes demo não usados, LangDropdown, mocks de teste órfãos,
  `types/` do demo antigo). `portal/CLAUDE.md`/`README.md`/`doctor.config.json`
  reescritos para descrever o app real.
- **Scripts de deploy**: `start.ps1` (3º job Portal, porta 8000),
  `deploy-dev.ps1`/`deploy-main.ps1` (exclude `.dev.vars`/`portal/.env`),
  `scripts/README.md`/`UPDATE.md` atualizados. Backup timestamped em
  `scripts/backup/` antes de editar (regra do projeto).
- **Vault**: nova decisão [[Portal Interno - Arquitetura]], nova integração
  [[Cloudflare Access]], novo data model [[Contacts e Issue Types - Campos Admin]],
  [[01_Project_State]] atualizado com rotas/prioridade atual.
- **Graphify**: `graphify update .` corrido após limpeza — 1055 nodes, 1453 edges,
  97 comunidades, sem corrupção grave.

## Commits feitos (branch `dev`, push feito, main NÃO tocado)
- `6ccba93` — feat: portal interno (catálogo CRUD + contactos)
- `e20ebba` — chore: limpa ficheiros mortos do template portal, atualiza graphify

## Bloqueado / próximos passos
- **Domínio de branding ainda não fechado** (~2 semanas a partir de 2026-07-04,
  confirmar com utilizador se ainda válido). Sem isso, impossível:
  - Criar Cloudflare Pages project para `portal/` com custom domain.
  - Criar Access Application (precisa hostname).
  - Preencher `CF_ACCESS_TEAM_DOMAIN`/`CF_ACCESS_AUD` reais em `wrangler.toml`.
- Passos manuais no dashboard Cloudflare (ver [[Portal Interno - Arquitetura]]
  secção "Configuração manual") ficam por fazer até o domínio existir.
- `scripts/deploy-main.ps1` não precisa de alterações — já preparado para o
  2º Pages project assim que for ligado (push main dispara ambos builds).
- Depois do domínio fechar: seguir os 6 passos de config manual, testar
  `portal.<dominio>` pede Access antes de mostrar UI, confirmar CORS do site
  público continua a funcionar.

## Como retomar
1. Ler [[01_Project_State]] e [[Portal Interno - Arquitetura]] primeiro.
2. Correr `./start.ps1` na raiz (arranca backend+frontend+portal juntos) para
   validar que continua tudo a funcionar.
3. Quando o domínio existir, seguir a secção "Configuração manual" da nota de
   arquitetura passo a passo.

## Related
- [[01_Project_State]]
- [[Portal Interno - Arquitetura]]
- [[Cloudflare Access]]
- [[Contacts e Issue Types - Campos Admin]]
