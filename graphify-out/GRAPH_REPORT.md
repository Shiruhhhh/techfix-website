# Graph Report - .  (2026-07-04)

## Corpus Check
- 13 files · ~71,795 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 237 nodes · 302 edges · 23 communities (19 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Deploy Scripts & Docs|Deploy Scripts & Docs]]
- [[_COMMUNITY_Frontend Dependencies|Frontend Dependencies]]
- [[_COMMUNITY_App Shell & Navigation|App Shell & Navigation]]
- [[_COMMUNITY_TechFix Project Overview|TechFix Project Overview]]
- [[_COMMUNITY_Repair Catalog Flow|Repair Catalog Flow]]
- [[_COMMUNITY_Graphify & Vault Protocol|Graphify & Vault Protocol]]
- [[_COMMUNITY_Brand & Catalog Detail UI|Brand & Catalog Detail UI]]
- [[_COMMUNITY_Backend Dependencies|Backend Dependencies]]
- [[_COMMUNITY_Backend API Routes|Backend API Routes]]
- [[_COMMUNITY_HTML Entry & Assets|HTML Entry & Assets]]
- [[_COMMUNITY_Landing Services Section|Landing: Services Section]]
- [[_COMMUNITY_Landing Why Us Section|Landing: Why Us Section]]
- [[_COMMUNITY_Landing Contact Section|Landing: Contact Section]]
- [[_COMMUNITY_Landing FAQ Section|Landing: FAQ Section]]
- [[_COMMUNITY_Landing How It Works Section|Landing: How It Works Section]]
- [[_COMMUNITY_Landing Testimonials Section|Landing: Testimonials Section]]

## God Nodes (most connected - your core abstractions)
1. `deploy-main.ps1` - 11 edges
2. `Protocolo de contexto do projeto` - 10 edges
3. `Backend Stack (Cloudflare Workers + Hono + D1)` - 9 edges
4. `TechFix Project` - 7 edges
5. `useAnchorNav()` - 7 edges
6. `Step 1: Verify scripts still match codebase` - 7 edges
7. `smoothScrollTo()` - 6 edges
8. `graphify workflow (query/path/explain/update)` - 6 edges
9. `migrate-db.ps1` - 6 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `TechFix Brand Favicon (purple arrow/lightning mark)` --conceptually_related_to--> `TechFix Project`  [INFERRED]
  frontend/public/favicon.svg → README.md
- `Hero Image: Disassembled Smartphone Repair Close-up` --conceptually_related_to--> `TechFix Project`  [INFERRED]
  frontend/src/assets/hero-repair-2.jpg → README.md
- `Hero Image: Technician Repairing Phone Motherboard` --conceptually_related_to--> `TechFix Project`  [INFERRED]
  frontend/src/assets/hero-repair.jpg → README.md
- `Quando atualizar o vault` --semantically_similar_to--> `Backup-then-edit procedure`  [INFERRED] [semantically similar]
  CLAUDE.md → scripts/UPDATE.md
- `Antes de qualquer deploy (checklist)` --semantically_similar_to--> `Deploy order: code merge -> DB migration -> Worker deploy`  [INFERRED] [semantically similar]
  CLAUDE.md → scripts/README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Deploy flow: dev -> main -> D1 migration -> Worker deploy** — scripts_deploy_dev_ps1, scripts_deploy_main_ps1, scripts_migrate_db_ps1, scripts_readme_cloudflare_pages, scripts_readme_cloudflare_worker [EXTRACTED 0.90]
- **Project persistent memory sources read before code changes** — claude_md_vault_00_index, claude_md_vault_01_project_state, claude_md_vault_02_architecture, claude_md_vault_03_decisions, claude_md_graphify_out_graph_report [EXTRACTED 0.90]
- **Backup-then-edit maintenance cycle for deploy scripts** — scripts_update_md_verify_step, scripts_update_md_backup_then_edit, scripts_backup_dir, scripts_readme_deploy_scripts [EXTRACTED 0.85]
- **TechFix Deployment Flow (Frontend Pages + Backend Worker + D1 + CORS)** — readme_cloudflare_pages_deploy, readme_cloudflare_worker_deploy, readme_d1_techfix_db, readme_cors_config [INFERRED 0.85]
- **TechFix Visual Brand Assets (favicon + hero images)** — frontend_public_favicon_svg, frontend_src_assets_hero_repair_2_jpg, frontend_src_assets_hero_repair_jpg, frontend_index_html [INFERRED 0.75]

## Communities (23 total, 4 thin omitted)

### Community 0 - "Deploy Scripts & Docs"
Cohesion: 0.11
Nodes (28): backend/migrations/, backend/package.json, backend/wrangler.toml, push to main / Cloudflare Pages deploy, Antes de qualquer deploy (checklist), vault/01_Project_State.md, wrangler deploy, frontend Cloudflare Pages auto-build from main (+20 more)

### Community 1 - "Frontend Dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @ant-design/icons, antd, react, react-dom, react-icons, react-router-dom, devDependencies (+19 more)

### Community 2 - "App Shell & Navigation"
Cohesion: 0.13
Nodes (17): App(), display, Footer(), linkStyle, Header(), links, Logo(), display (+9 more)

### Community 3 - "TechFix Project Overview"
Cohesion: 0.11
Nodes (23): @vitejs/plugin-react (Oxc), @vitejs/plugin-react-swc (SWC), React Compiler, typescript-eslint, React + Vite Template, Hero Image: Disassembled Smartphone Repair Close-up, Hero Image: Technician Repairing Phone Motherboard, POST /api/contact (+15 more)

### Community 4 - "Repair Catalog Flow"
Cohesion: 0.15
Nodes (11): BackButton(), items, Reassure(), CATEGORY_PATHS, CategoryIcon(), ISSUE_PATHS, IssueIcon(), svg() (+3 more)

### Community 5 - "Graphify & Vault Protocol"
Cohesion: 0.12
Nodes (20): Protocolo de contexto do projeto, graphify explain "<concept>", graphify-out/graph.json, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md, graphify path "<A>" "<B>", graphify query "<question>", graphify update . (+12 more)

### Community 6 - "Brand & Catalog Detail UI"
Cohesion: 0.15
Nodes (8): display, BrandLogo(), ContactModal(), IssueGrid(), IssuePriceCard(), ModelDetail(), fullModelName(), StickyPanel()

### Community 7 - "Backend Dependencies"
Cohesion: 0.15
Nodes (12): dependencies, hono, devDependencies, wrangler, name, private, scripts, db:migrate:local (+4 more)

### Community 8 - "Backend API Routes"
Cohesion: 0.27
Nodes (6): allowedOrigins, app, app, app, MAX_LENGTHS, app

### Community 9 - "HTML Entry & Assets"
Cohesion: 0.40
Nodes (6): frontend/index.html entry page, favicon.svg link, Google Fonts (Space Grotesk, Manrope), #root mount div, TechFix Brand Favicon (purple arrow/lightning mark), src/main.jsx

### Community 11 - "Landing: Why Us Section"
Cohesion: 0.33
Nodes (4): CHECKLIST, display, FEATURES, STATS

### Community 12 - "Landing: Contact Section"
Cohesion: 0.40
Nodes (3): CONTACTS, display, inputStyle

## Ambiguous Edges - Review These
- `deploy-dev.ps1` → `deploy-main.ps1`  [AMBIGUOUS]
  scripts/README.md · relation: calls

## Knowledge Gaps
- **86 isolated node(s):** `name`, `private`, `type`, `dev`, `deploy` (+81 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `deploy-dev.ps1` and `deploy-main.ps1`?**
  _Edge tagged AMBIGUOUS (relation: calls) - confidence is low._
- **Why does `Protocolo de contexto do projeto` connect `Graphify & Vault Protocol` to `Deploy Scripts & Docs`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `Antes de qualquer deploy (checklist)` connect `Deploy Scripts & Docs` to `Graphify & Vault Protocol`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `deploy-main.ps1` (e.g. with `backend/package.json` and `push to main / Cloudflare Pages deploy`) actually correct?**
  _`deploy-main.ps1` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _88 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Deploy Scripts & Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._