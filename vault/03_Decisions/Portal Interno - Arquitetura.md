---
type: decision
status: current
created: 2026-07-04
updated: 2026-07-04
tags:
  - decision
  - architecture
  - current
related:
  - "[[01_Project_State]]"
  - "[[Cloudflare Workers + D1]]"
---

# Portal Interno (portal.dominio) — Arquitetura

## Decision
- App frontend separado (pasta `portal/`), novo Cloudflare Pages project próprio, subdomínio `portal.<dominio>`.
- Backend reutiliza o mesmo Worker (`techfix-backend`) e D1 existentes — novas rotas sob `/api/admin/*`.
- Auth via Cloudflare Access (Zero Trust) na frente do subdomínio portal — sem tabela `users`/JWT próprio no D1.
- Scope inicial: CRUD catálogo (brands/models/services/preços) + visualização de mensagens de contacto.
- Fora de scope nesta fase: encomendas, faturação, emails (continuam no roadmap, ver [[01_Project_State]]).

## Reason
- Utilizador quer solução escalável, preparada para crescer (encomendas/faturação a seguir).
- Separar portal do site público evita acoplar auth guards e bundle admin ao frontend público (Ant Design landing).
- Cloudflare Access evita reimplementar login/sessions — gate acontece no edge, antes do pedido chegar ao Worker.

## Consequences
- Worker precisa validar o JWT do Cloudflare Access (header `Cf-Access-Jwt-Assertion`) nas rotas `/api/admin/*` — não confiar apenas no gate do Pages, porque o Worker é um binding partilhado e pode ser chamado diretamente.
- Novo Pages project = novo deploy pipeline. Atualizar [[Cloudflare Workers + D1]] e scripts de deploy quando o `portal/` for criado.
- Se/quando encomendas avançar, schema `orders` fica sob este mesmo portal — não criar terceiro app.

## Estado (2026-07-04)
Implementação completa e testada localmente:
- Migrations `0019_issue_types_soft_delete.sql`, `0020_contacts_admin_fields.sql`
  aplicadas (ver [[Contacts e Issue Types - Campos Admin]]).
- Backend `/api/admin/*` completo (brands, model-families, models, issue-types,
  model-issue-types com upsert em lote, contacts) — testado via `wrangler dev` com
  bypass local (`LOCAL_DEV=true` em `.dev.vars`, git-ignored). Ver [[Cloudflare Access]].
- Frontend `portal/` scaffolded com Ant Design Pro (template `simple`), 6 páginas
  CRUD, sem login/i18n multi-idioma/tailwind (removidos — Access trata auth, 1 idioma
  só, sem necessidade de layout util-first). `tsc --noEmit` limpo, testes passam,
  `npm run build` gera output em `dist/`.
- Limpeza pós-scaffold (2026-07-04): removidos ~70 pacotes npm órfãos (openAPI
  codegen, request-record, mock server, i18n multi-idioma) e ficheiros mortos do
  template (`CNAME`, ícones PWA/`manifest.json`/`service-worker.js` não wired,
  componentes de demo `ArticleListContent`/`AvatarList`/`StandardFormRow`/`TagSelect`,
  `LangDropdown`, 7 pastas de locale além de `pt-BR`, mocks de teste não usados,
  `types/` com namespace `API` do demo antigo). `portal/CLAUDE.md`/`README.md`/
  `doctor.config.json` atualizados para descrever o estado real do app.
- **Bloqueado**: domínio de branding ainda não fechado (~2 semanas a partir de
  2026-07-04) — sem isso não há subdomínio para a Access Application nem para o
  Cloudflare Pages custom domain. `wrangler.toml` tem `CF_ACCESS_TEAM_DOMAIN`/
  `CF_ACCESS_AUD` como placeholders `REPLACE-ME` até então.

## Related
- [[01_Project_State]]
- [[Cloudflare Workers + D1]]
- [[Cloudflare Access]]
- [[Contacts e Issue Types - Campos Admin]]
