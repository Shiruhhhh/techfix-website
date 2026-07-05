---
type: integration
status: current
created: 2026-07-05
updated: 2026-07-05
tags:
  - integration
  - current
related:
  - "[[01_Project_State]]"
  - "[[Cloudflare Workers + D1]]"
---

# Resend — Email de notificação do formulário de contacto

## Como funciona
`POST /api/contact` (`backend/src/routes/contact.js`) grava a mensagem no D1 e, se
configurado, envia email de notificação via API do Resend (`api.resend.com/emails`,
com `waitUntil` — não bloqueia a resposta).

## Variáveis de ambiente (Worker)
- `RESEND_API_KEY` — secret (`wrangler secret put RESEND_API_KEY`). Sem ela, o email
  é saltado silenciosamente (a mensagem fica na BD na mesma).
- `CONTACT_EMAIL_TO` — destinatário da notificação. Retirado do código em 2026-07-05
  (estava hardcoded). Local: `backend/.dev.vars` (git-ignored). Produção: definir via
  `wrangler secret put CONTACT_EMAIL_TO` ou var no dashboard — **não** pôr no
  `wrangler.toml` (é público no repo). Sem ela, email também é saltado.

## Proteções (adicionadas 2026-07-05, security scan)
- **Rate limit**: binding `CONTACT_RATE_LIMITER` (`[[unsafe.bindings]]` no
  `wrangler.toml`, API de Rate Limiting dos Workers) — 5 pedidos/60s por IP
  (`CF-Connecting-IP`). Excesso → 429. Se o binding faltar, a rota segue sem limitar
  (falha aberta de propósito).
- **Sanitização**: caracteres de controlo (`\x00-\x1F`, `\x7F`) removidos de
  name/email/phone antes de guardar/enviar — evita injeção no subject do email.
- **Validação de email**: regex básica; inválido → 400.

> [!todo] Pendente
> Turnstile no formulário público continua por fazer (decidido não avançar já).
> `from` ainda usa `onboarding@resend.dev` — trocar quando o domínio de branding
> fechar e for verificado no Resend.

## Related
- [[Cloudflare Access]] — auth das rotas admin (não afeta esta rota pública)
