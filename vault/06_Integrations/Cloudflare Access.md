---
type: integration
status: current
created: 2026-07-04
updated: 2026-07-04
tags:
  - integration
  - current
related:
  - "[[Portal Interno - Arquitetura]]"
  - "[[01_Project_State]]"
---

# Cloudflare Access (auth do portal interno)

## O que é
Auth do portal interno (`portal.<dominio>`) — sem tabela `users`/JWT próprio no D1.
Cloudflare Access faz o gate no edge (Zero Trust Application na frente do subdomínio
Pages do portal, policy allow-list com o email do dono, 1 utilizador só).

## Validação no Worker
O Worker (`backend/src/middleware/access.js`, função `cloudflareAccess()`) valida o
JWT do header `Cf-Access-Jwt-Assertion` contra o JWKS remoto do team domain
(`https://<team>.cloudflareaccess.com/cdn-cgi/access/certs`), usando `jose`
(`createRemoteJWKSet` + `jwtVerify`, valida `issuer`/`audience`).

**Porquê validar no Worker e não confiar só no gate do Pages**: o Worker
(`techfix-backend`) é um binding partilhado — pode ser chamado diretamente (via
`*.workers.dev` ou domínio de produção) sem passar pelo subdomínio protegido. Sem
esta validação, `/api/admin/*` ficaria exposto a quem soubesse o URL do Worker.

## Env vars (`backend/wrangler.toml`, secção `[vars]`)
- `CF_ACCESS_TEAM_DOMAIN` — `https://<team-name>.cloudflareaccess.com`.
- `CF_ACCESS_AUD` — Application Audience (AUD) Tag da Access Application.
Não são secrets (JWKS é chave pública). Placeholders (`REPLACE-ME`) até a Access
Application ser criada no dashboard (bloqueado até o domínio de branding fechar —
ver [[Portal Interno - Arquitetura]]).

## Bypass em dev local
`wrangler dev` não tem Access real (sem JWT). `backend/.dev.vars` (git-ignored,
nunca presente em produção) define `LOCAL_DEV=true` — o middleware salta a
validação só quando essa flag existir. Confirmado por teste: sem o ficheiro,
pedidos sem `Cf-Access-Jwt-Assertion` devolvem 401.

## Passos manuais no dashboard (fora do código)
1. Zero Trust → Access → Applications → Add → Self-hosted, domain
   `portal.<dominio>` → copiar AUD tag.
2. Policy: Allow, Include Emails → email do dono.
3. Confirmar team domain em Zero Trust → Settings.
4. Preencher `CF_ACCESS_TEAM_DOMAIN`/`CF_ACCESS_AUD` reais no `wrangler.toml` e
   `wrangler deploy`.

## Related
- [[Portal Interno - Arquitetura]]
- [[01_Project_State]]
