# TechFix — Portal Interno

Portal admin para gerir o catálogo (marcas, gamas, modelos, tipos de avaria,
preços/eta) e as mensagens de contacto do site TechFix. Frontend em Ant Design
Pro (Umi Max), fala com o Worker partilhado (`../backend`) via `/api/admin/*`.

Sem login próprio — Cloudflare Access protege o subdomínio no edge. Ver
`vault/03_Decisions/Portal Interno - Arquitetura.md` e
`vault/06_Integrations/Cloudflare Access.md` no repo root.

## Correr localmente

Precisa do backend a correr em paralelo (`cd ../backend && npm run dev`,
porta 8787) — `backend/.dev.vars` tem `LOCAL_DEV=true`, que salta a
validação Access em dev.

```bash
npm install
npm run dev
```

Abre em `http://localhost:8000`. O proxy `/api` (`config/proxy.ts`) encaminha
para `localhost:8787`.

## Scripts

- `npm run dev` — dev server (Umi Max, sem mock)
- `npm run build` — build de produção (`dist/`)
- `npm run lint` — Biome + `tsc --noEmit`
- `npm test` — Vitest

## Estrutura

Cada página em `src/pages/<entidade>/` tem `index.tsx` (tabela/lista),
`service.ts` (chamadas fetch ao backend) e, quando há CRUD com formulário,
`<Entidade>Form.tsx`. Sem geração automática de API (OpenAPI/mock) — os
services são escritos à mão, dado o scope pequeno (6 páginas).
