# TechFix

Website de reparação de smartphones, laptops e desktops. React + Vite + Ant Design no frontend, Cloudflare Workers + Hono + D1 no backend.

## Estrutura

```
frontend/   React + Vite + Ant Design
backend/    Cloudflare Worker (Hono) + D1 (catálogo/contactos)
```

## Correr localmente

**Backend** (porta 8787, `wrangler dev` simula D1 localmente):
```bash
cd backend
npm install
wrangler d1 migrations apply techfix-db --local   # só na 1ª vez
npm run dev
```

**Frontend** (porta 5173, proxy `/api` → backend):
```bash
cd frontend
npm install
npm run dev
```

Ou usa `start.ps1` na raiz pra correr ambos com logs combinados.

## API (backend)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | Healthcheck |
| GET | `/api/services` | Lista serviços (filtra com `?category=phone\|laptop\|desktop`) |
| GET | `/api/services/brands` | Lista marcas suportadas |
| POST | `/api/contact` | Guarda pedido de contacto em D1 (`name`, `email`, `message`) e envia email via Resend |

## Deploy

**Frontend** — Cloudflare Pages:
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Env var `VITE_API_URL` = URL do Worker (ex: `https://techfix-backend.<subdomain>.workers.dev`)

**Backend** — Cloudflare Worker:
```bash
cd backend
wrangler login
wrangler d1 create techfix-db          # copiar database_id para wrangler.toml
wrangler d1 migrations apply techfix-db --remote
wrangler secret put RESEND_API_KEY     # opcional, sem ele contacto só fica gravado em D1
wrangler deploy
```

CORS no Worker (`src/index.js`) está restrito ao domínio Pages de produção + `localhost:5173` — atualizar `allowedOrigins` se o domínio mudar.

## Branches

- `main` — produção
- `dev` — desenvolvimento
