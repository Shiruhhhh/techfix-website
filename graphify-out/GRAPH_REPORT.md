# Graph Report - .  (2026-07-03)

## Corpus Check
- 67 files · ~69,387 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 187 nodes · 249 edges · 15 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Landing Page Sections|Landing Page Sections]]
- [[_COMMUNITY_TechFix Project Overview|TechFix Project Overview]]
- [[_COMMUNITY_App Shell & Navigation|App Shell & Navigation]]
- [[_COMMUNITY_Repair Catalog Flow|Repair Catalog Flow]]
- [[_COMMUNITY_Frontend Dependencies|Frontend Dependencies]]
- [[_COMMUNITY_Backend Dependencies|Backend Dependencies]]
- [[_COMMUNITY_Frontend Dev Tooling|Frontend Dev Tooling]]
- [[_COMMUNITY_Backend API Routes|Backend API Routes]]
- [[_COMMUNITY_Repair Icons & Pricing|Repair Icons & Pricing]]
- [[_COMMUNITY_Brand & Sticky Panel UI|Brand & Sticky Panel UI]]
- [[_COMMUNITY_Graphify Tooling Docs|Graphify Tooling Docs]]
- [[_COMMUNITY_HTML Entry & Assets|HTML Entry & Assets]]

## God Nodes (most connected - your core abstractions)
1. `Backend Stack (Cloudflare Workers + Hono + D1)` - 9 edges
2. `useAnchorNav()` - 7 edges
3. `TechFix Project` - 7 edges
4. `graphify Knowledge Graph Tooling` - 6 edges
5. `scripts` - 5 edges
6. `scripts` - 5 edges
7. `RepairLayout()` - 5 edges
8. `Frontend Stack (React + Vite + Ant Design)` - 5 edges
9. `React + Vite Template` - 5 edges
10. `BackButton()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `TechFix Brand Favicon (purple arrow/lightning mark)` --conceptually_related_to--> `TechFix Project`  [INFERRED]
  frontend/public/favicon.svg → README.md
- `Hero Image: Disassembled Smartphone Repair Close-up` --conceptually_related_to--> `TechFix Project`  [INFERRED]
  frontend/src/assets/hero-repair-2.jpg → README.md
- `Hero Image: Technician Repairing Phone Motherboard` --conceptually_related_to--> `TechFix Project`  [INFERRED]
  frontend/src/assets/hero-repair.jpg → README.md
- `React + Vite Template` --conceptually_related_to--> `Frontend Stack (React + Vite + Ant Design)`  [INFERRED]
  frontend/README.md → README.md
- `favicon.svg link` --references--> `TechFix Brand Favicon (purple arrow/lightning mark)`  [EXTRACTED]
  frontend/index.html → frontend/public/favicon.svg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **TechFix Deployment Flow (Frontend Pages + Backend Worker + D1 + CORS)** — readme_cloudflare_pages_deploy, readme_cloudflare_worker_deploy, readme_d1_techfix_db, readme_cors_config [INFERRED 0.85]
- **TechFix Visual Brand Assets (favicon + hero images)** — frontend_public_favicon_svg, frontend_src_assets_hero_repair_2_jpg, frontend_src_assets_hero_repair_jpg, frontend_index_html [INFERRED 0.75]

## Communities (15 total, 0 thin omitted)

### Community 0 - "Landing Page Sections"
Cohesion: 0.07
Nodes (21): Contact(), CONTACTS, display, inputStyle, display, FAQ(), ITEMS, display (+13 more)

### Community 1 - "TechFix Project Overview"
Cohesion: 0.11
Nodes (23): @vitejs/plugin-react (Oxc), @vitejs/plugin-react-swc (SWC), React Compiler, typescript-eslint, React + Vite Template, Hero Image: Disassembled Smartphone Repair Close-up, Hero Image: Technician Repairing Phone Motherboard, POST /api/contact (+15 more)

### Community 2 - "App Shell & Navigation"
Cohesion: 0.13
Nodes (15): App(), BrandPicker(), FamilyPicker(), ModelPicker(), display, Footer(), linkStyle, Header() (+7 more)

### Community 3 - "Repair Catalog Flow"
Cohesion: 0.21
Nodes (9): BackButton(), ContactModal(), ModelDetail(), fullModelName(), items, Reassure(), display, RepairLayout() (+1 more)

### Community 4 - "Frontend Dependencies"
Cohesion: 0.12
Nodes (16): dependencies, @ant-design/icons, antd, react, react-dom, react-icons, react-router-dom, name (+8 more)

### Community 5 - "Backend Dependencies"
Cohesion: 0.15
Nodes (12): dependencies, hono, devDependencies, wrangler, name, private, scripts, db:migrate:local (+4 more)

### Community 6 - "Frontend Dev Tooling"
Cohesion: 0.18
Nodes (11): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, sharp, @types/react (+3 more)

### Community 7 - "Backend API Routes"
Cohesion: 0.27
Nodes (6): allowedOrigins, app, app, app, MAX_LENGTHS, app

### Community 8 - "Repair Icons & Pricing"
Cohesion: 0.29
Nodes (7): IssueGrid(), IssuePriceCard(), CATEGORY_PATHS, CategoryIcon(), ISSUE_PATHS, IssueIcon(), svg()

### Community 9 - "Brand & Sticky Panel UI"
Cohesion: 0.28
Nodes (4): Brands(), display, BrandLogo(), StickyPanel()

### Community 10 - "Graphify Tooling Docs"
Cohesion: 0.33
Nodes (7): GRAPH_REPORT.md, graphify Knowledge Graph Tooling, graphify explain command, graphify path command, graphify query command, graphify update command, graphify-out/wiki/index.md

### Community 11 - "HTML Entry & Assets"
Cohesion: 0.40
Nodes (6): frontend/index.html entry page, favicon.svg link, Google Fonts (Space Grotesk, Manrope), #root mount div, TechFix Brand Favicon (purple arrow/lightning mark), src/main.jsx

## Knowledge Gaps
- **76 isolated node(s):** `name`, `private`, `type`, `dev`, `deploy` (+71 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Frontend Dev Tooling` to `Frontend Dependencies`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `TechFix Project` connect `TechFix Project Overview` to `HTML Entry & Assets`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `TechFix Project` (e.g. with `TechFix Brand Favicon (purple arrow/lightning mark)` and `Hero Image: Disassembled Smartphone Repair Close-up`) actually correct?**
  _`TechFix Project` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _77 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Landing Page Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.07386363636363637 - nodes in this community are weakly interconnected._
- **Should `TechFix Project Overview` be split into smaller, more focused modules?**
  _Cohesion score 0.1067193675889328 - nodes in this community are weakly interconnected._
- **Should `App Shell & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.12648221343873517 - nodes in this community are weakly interconnected._