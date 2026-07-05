---
type: checklist
status: current
created: 2026-07-05
updated: 2026-07-05
tags:
  - architecture
  - current
related:
  - "[[01_Project_State]]"
  - "[[Portal Interno - Arquitetura]]"
  - "[[Cloudflare Access]]"
  - "[[Resend Email]]"
  - "[[Cache do Catalogo]]"
---

# Domínio de branding — Checklist de Go-Live

Tudo o que fica pendente até o domínio fechar (~2 semanas a partir de 2026-07-04).
Itens espalhados por várias notas, consolidados aqui. Executar por esta ordem —
TLS primeiro, HSTS só no fim da configuração de rede.

## 1. Zona e TLS (dashboard Cloudflare)

- [ ] Adicionar domínio como zona no Cloudflare (nameservers).
- [ ] SSL/TLS → encryption mode **Full (strict)** — antes de qualquer HSTS.
- [ ] SSL/TLS → Edge Certificates → **Always Use HTTPS**: on.

## 2. Hostnames

- [ ] Pages (site público): custom domain apex + `www`.
- [ ] Pages (portal): custom domain `portal.<dominio>`.
- [ ] Worker (`techfix-backend`): custom domain `api.<dominio>` (ou route na zona).

## 3. Cloudflare Access (portal)

- [ ] Criar Access Application para `portal.<dominio>` (Zero Trust → Access).
- [ ] Preencher `CF_ACCESS_TEAM_DOMAIN` e `CF_ACCESS_AUD` no `backend/wrangler.toml`
      (substituir `REPLACE-ME`) e redeploy do Worker.
- [ ] Ver [[Cloudflare Access]] para detalhes do JWT/middleware.

## 4. Código e config a atualizar

- [ ] CORS (`backend/src/index.js`, `allowedOrigins`): adicionar domínios novos;
      separar lista dev/prod (localhost fora de produção — pendente do scan 2026-07-05).
- [ ] CSP (`frontend/public/_headers`, `connect-src`): trocar `https://*.workers.dev`
      pelo host da API.
- [ ] `VITE_API_URL` (env de produção do Pages do site) → `https://api.<dominio>`.
- [ ] Portal `baseURL` (`portal/src/app.tsx`, `REPLACE-ME-backend-domain`) →
      `https://api.<dominio>`. **Portal congelado por agora** — fazer quando o
      trabalho do portal retomar.
- [ ] Atualizar nota [[CORS Configuration]] (já estava stale: falta `localhost:8000`).

## 5. HSTS — só depois de 1–4 estarem verdes

- [ ] SSL/TLS → Edge Certificates → **HSTS**: enable.
      - `max-age`: começar 1 dia/1 mês → subir para 12 meses (`31536000`) após uma
        semana sem problemas.
      - `includeSubDomains`: on (tudo é proxied Cloudflare HTTPS).
      - `preload`: **off** inicialmente — compromisso quase irreversível, avaliar mais tarde.
      Nota: em `*.pages.dev`/`*.workers.dev` o HSTS já vem preloaded pelos browsers;
      só o domínio próprio precisa disto.

## 6. Resend

- [ ] Verificar domínio no Resend; trocar `from` de `onboarding@resend.dev` para
      endereço do domínio (`backend/src/routes/contact.js`).
- [ ] `wrangler secret put CONTACT_EMAIL_TO` em produção — **já pendente hoje**
      (sem ele o email de notificação não é enviado; mensagens ficam na BD).

## 7. Fecho

- [ ] Smoke test: site, portal (login via Access), `GET /api/health`, formulário
      de contacto (rate limit 429 ao 6.º pedido/min), `X-Cache: HIT` no catálogo.
- [ ] `graphify update .` + atualizar [[01_Project_State]] e notas tocadas
      (protocolo de deploy do repo).
