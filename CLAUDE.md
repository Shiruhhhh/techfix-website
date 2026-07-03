## Protocolo de contexto do projeto

Antes de alterar código, inspecionar sempre a memória do projeto, por esta ordem:

1. `vault/00_Index.md`
2. `vault/01_Project_State.md`
3. Notas relevantes em:
   - `vault/02_Architecture/`
   - `vault/03_Decisions/`
   - `vault/04_Business_Rules/`
   - `vault/05_Data_Model/`
   - `vault/06_Integrations/`
   - `vault/07_Errors/`
4. Se precisares de estrutura de código, inspecionar `graphify-out/GRAPH_REPORT.md`
   primeiro (visão geral) e só depois `graphify-out/graph.json` para queries específicas.

Não assumir regras do projeto só a partir do histórico da conversa atual — o vault e o
graphify-out são a fonte de verdade persistente entre sessões.

## Skills a usar

Ao criar ou editar qualquer ficheiro dentro de `vault/`, usar sempre as skills instaladas
`obsidian-markdown` e `obsidian-cli` (não escrever markdown genérico):

- `obsidian-markdown` para sintaxe correta: wikilinks (`[[Nota]]`), frontmatter/properties,
  callouts, embeds, tags aninhadas — nunca usar links markdown normais (`[texto](url)`)
  para referenciar notas dentro do vault.
- `obsidian-cli` para pesquisar, ler, ou atualizar properties de notas existentes (`obsidian
  search`, `obsidian read`, `obsidian property:set`) em vez de percorrer ficheiros
  manualmente com `ls`/`grep`/`cat` — só recorrer a leitura direta de ficheiros se o
  `obsidian-cli` falhar (ex: Obsidian não está aberto).

## Regras de memória

- Cada nota tem frontmatter (`type`, `status`, `tags`, `created`, `updated`, `related`).
- Usar wikilinks (`[[Nota]]`) para relacionar notas dentro do vault.
- Tags a usar: `#current`, `#deprecated`, `#decision`, `#architecture`, `#business-rule`,
  `#data-model`, `#integration`, `#error`.
- Se uma nota ficar desatualizada, marcar `status: deprecated` — não apagar sem confirmar
  com o utilizador.
- Código é sempre a fonte de verdade sobre o vault. Se uma nota contradiz o código atual,
  assinalar isso explicitamente na resposta em vez de confiar cegamente na nota.

## Quando atualizar o vault

No fim de qualquer tarefa que:
- introduza uma decisão de arquitetura nova (nova dependência, mudança de stack, etc.),
- mude o schema da base de dados (D1),
- resolva um erro recorrente ou não óbvio,
- adicione/altere uma integração externa (ex: Resend, faturação, pagamentos),

→ atualizar a nota relevante em `vault/`, ou criar uma nova se não existir.

Não criar notas para detalhes triviais ou temporários. Não fazer dump de conversas.
Preferir notas atómicas, pequenas, uma por conceito/decisão.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

Se o código mudou significativamente desde a última build do grafo, correr `graphify update .`
antes de assumir que `graphify-out/` reflete o estado atual.

## Antes de qualquer deploy

Antes de correr `wrangler deploy` (backend) ou fazer push para a branch `main`/deploy do
frontend (Cloudflare Pages), obrigatório:

1. Correr `graphify update .` para o `graphify-out/` refletir o código que vai para
   produção.
2. Rever se alguma mudança desta sessão devia estar em `vault/` e ainda não está —
   nomeadamente novas rotas, mudanças de schema D1, novas variáveis de ambiente/secrets,
   ou mudanças de CORS/domínio — e atualizar as notas relevantes antes de continuar.
3. Só depois de 1 e 2 estarem feitos, proceder com o deploy.

Não fazer deploy com `vault/01_Project_State.md` desatualizado em relação ao que está a
ser publicado — isso é o ficheiro que qualquer sessão futura lê primeiro, e um estado
errado aí é pior do que não ter estado nenhum.
