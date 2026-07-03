---
type: decision
status: current
created: 2026-07-03
updated: 2026-07-03
tags:
  - decision
  - architecture
  - current
---

# CORS restrito por domínio

## Decision
CORS no Worker (`backend/src/index.js`, `allowedOrigins`) está restrito ao domínio de
produção do Cloudflare Pages + `localhost:5173`.

## Reason
_(a preencher — segurança, evitar uso não autorizado da API)_

## Consequences
- Se o domínio de produção mudar, é preciso atualizar `allowedOrigins` manualmente —
  não há deteção automática.
- Ambientes de preview/staging do Pages (URLs geradas automaticamente) podem precisar de
  ser adicionados manualmente se forem usados para testar o frontend contra o backend real.

## Related
- [[01_Project_State]]
