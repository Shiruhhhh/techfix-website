---
type: project-state
status: current
updated: 2026-07-05
tags:
  - current
  - project-state
---

# Project State

## O que é
TechFix — website de reparação de smartphones, laptops e desktops.
Frontend: React + Vite + Ant Design. Backend: Cloudflare Workers (Hono) + D1.

## Arquitetura atual
- Frontend em Cloudflare Pages.
- Backend como Cloudflare Worker, base de dados D1 (SQLite via Cloudflare).
- Email de contacto via Resend (opcional — sem `RESEND_API_KEY`/`CONTACT_EMAIL_TO` só
  grava em D1). Rate limit 5/60s por IP + sanitização de input — ver [[Resend Email]].
- Headers de segurança do frontend (CSP, X-Frame-Options, etc.) em
  `frontend/public/_headers` (Cloudflare Pages) desde 2026-07-05.
- CORS restrito ao domínio de produção do Pages + `localhost:5173`.
- Cache em memória (TTL 60s) nas rotas públicas de leitura (`/api/catalog/*`,
  `/api/services`) + `Cache-Control` para browser/edge — ver [[Cache do Catalogo]].

## Rotas existentes
- GET `/api/health`
- GET `/api/services` (filtro `?category=phone|laptop|desktop`)
- GET `/api/services/brands`
- POST `/api/contact`
- GET `/api/catalog/brands`, `/api/catalog/brands/:brandId/families`,
  `/api/catalog/brands/:brandId/models`, `/api/catalog/models/:modelId`
- `/api/admin/*` (protegido por Cloudflare Access — ver [[Portal Interno - Arquitetura]]):
  CRUD `brands`, `model-families`, `models`, `issue-types`, `model-issue-types`
  (+ upsert em lote `PATCH /model-issue-types/model/:modelId`), e gestão de
  `contacts` (`GET`, `PATCH :id/read`, `PATCH :id/archive`, `PATCH :id/unarchive`).

## Prioridade atual
Portal interno (`portal.<dominio>`) — código completo e testado localmente
(backend `/api/admin/*` + frontend `portal/` com Ant Design Pro). Falta apenas:
domínio de branding fechar (~2 semanas a partir de 2026-07-04), depois seguir a
[[Dominio Go-Live Checklist]] (zona/TLS, hostnames, Access, CORS/CSP, HSTS, Resend)
e fazer o primeiro deploy real (ver [[Portal Interno - Arquitetura]] e
[[Cloudflare Access]]).

## Roadmap conhecido (não implementado ainda)
- Sistema de encomendas.
- Geração de faturas.
- Sistema de emails (para além do contacto atual via Resend).

## Non-goals
- Não guardar histórico de conversas no vault.
- Não duplicar código em markdown.
- Não criar notas gigantes — preferir uma nota por conceito.

## Regras
- Toda decisão estável vai para [[03_Decisions]].
- Toda regra de negócio vai para `04_Business_Rules/`.
- Todo schema/tabela D1 vai para `05_Data_Model/`.
- Toda integração externa vai para `06_Integrations/`.
- Todo erro recorrente ou não óbvio vai para `07_Errors/`.

## Related
- [[Cloudflare Workers + D1]]
- [[CORS Configuration]]
- [[Portal Interno - Arquitetura]]
- [[Cloudflare Access]]
