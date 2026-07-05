---
type: decision
status: current
created: 2026-07-05
updated: 2026-07-05
tags:
  - decision
  - architecture
  - current
related:
  - "[[01_Project_State]]"
  - "[[Cloudflare Workers + D1]]"
---

# Cache das rotas públicas de leitura (catálogo/serviços)

## Decision
Cache em memória do isolate (`backend/src/lib/cache.js`, middleware `memoryCache`)
nas rotas GET de `/api/catalog/*` e `/api/services`, TTL 60s, mais
`Cache-Control: public, max-age=60, s-maxage=300` nas respostas.

## Reason
Proteger o D1 quando o tráfego escalar — catálogo é read-heavy, público e muda
raramente (só edições admin). Primeiro pedido por chave paga a query; seguintes
respondem da RAM do isolate. Sem dependências novas, sem KV, sem custo.

## Como funciona
- Chave = pathname + query string. Só cacheia respostas 200 (404 nunca).
- Header `X-Cache: HIT|MISS` para observabilidade.
- Teto de 500 entradas com eviction da mais antiga (salvaguarda; catálogo é pequeno).
- CORS continua correto: middleware corre depois do `cors()` global, que decora a
  resposta final por pedido — headers CORS nunca são cacheados.

## Limitações aceites
- **Por isolate/colo** — não é partilhado globalmente; cada isolate aquece o seu.
  Suficiente: o objetivo é absorver rajadas, não eliminar todas as queries.
- **Sem invalidação nas escritas admin** — staleness máximo 60s depois de editar
  o catálogo no portal. Aceitável para preços/modelos.
- **Edge cache só com domínio custom** — em `*.workers.dev` a Cloudflare não
  cacheia respostas de Workers; o `s-maxage=300` só passa a ter efeito quando o
  domínio de branding fechar (ver [[Portal Interno - Arquitetura]]). Browsers
  respeitam `max-age=60` já hoje.

## Rever se
- Staleness de 60s deixar de ser aceitável (ex: preços dinâmicos) → invalidação
  explícita ou KV com purge nas rotas admin.
- Módulo de encomendas precisar de cache — esta camada é só para leitura pública,
  não usar em rotas autenticadas.

## Related
- [[Cloudflare Workers + D1]]
- [[Resend Email]]
