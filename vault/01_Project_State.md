---
type: project-state
status: current
updated: 2026-07-03
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
- Email de contacto via Resend (opcional — sem `RESEND_API_KEY` só grava em D1).
- CORS restrito ao domínio de produção do Pages + `localhost:5173`.

## Rotas existentes
- GET `/api/health`
- GET `/api/services` (filtro `?category=phone|laptop|desktop`)
- GET `/api/services/brands`
- POST `/api/contact`

## Prioridade atual
_(a preencher — o que está a ser trabalhado agora)_

## Roadmap conhecido (não implementado ainda)
- Portal interno para gestão de dados.
- Sistema de encomendas.
- Geração de faturas.
- Sistema de emails (para além do contacto atual via Resend).
- Autenticação/autorização (ainda por decidir) — necessária para o portal interno.

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
