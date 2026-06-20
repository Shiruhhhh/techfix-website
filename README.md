# TechFix

Website de reparação de smartphones, laptops e desktops. React + Vite + Ant Design no frontend, Node + Express no backend.

## Estrutura

```
frontend/   React + Vite + Ant Design
backend/    Node + Express, API mock de serviços/marcas/contacto
```

## Correr localmente

**Backend** (porta 4000, nodemon faz auto-restart):
```bash
cd backend
npm install
npm run dev
```

**Frontend** (porta 5173, proxy `/api` → backend):
```bash
cd frontend
npm install
npm run dev
```

## API (backend)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | Healthcheck |
| GET | `/api/services` | Lista serviços (filtra com `?category=phone\|laptop\|desktop`) |
| GET | `/api/services/brands` | Lista marcas suportadas |
| POST | `/api/contact` | Envia pedido de contacto (`name`, `email`, `message`) |

## Deploy

**Frontend** — Cloudflare Pages (ou qualquer host estático):
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

**Backend** — precisa de host Node (Railway, Render, Fly.io, VPS). Cloudflare Pages não serve Express.

## Branches

- `main` — produção
- `dev` — desenvolvimento
