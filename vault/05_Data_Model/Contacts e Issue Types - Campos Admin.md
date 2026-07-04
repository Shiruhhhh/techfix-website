---
type: data-model
status: current
created: 2026-07-04
updated: 2026-07-04
tags:
  - data-model
  - current
related:
  - "[[Portal Interno - Arquitetura]]"
  - "[[01_Project_State]]"
---

# Contacts e Issue Types — campos novos para o portal admin

## `issue_types.enabled` (migration `0019_issue_types_soft_delete.sql`)
`issue_types` era a única tabela de catálogo sem soft-delete (`brands`,
`model_families`, `models`, `services`, `model_issue_types` já tinham desde
`0018_add_enabled_soft_delete.sql`). Adicionado `enabled INTEGER NOT NULL DEFAULT 1`
para uniformidade e para evitar FKs órfãs em `model_issue_types` quando um tipo de
avaria é desativado pelo portal.

## `contacts.read_at` e `contacts.archived` (migration `0020_contacts_admin_fields.sql`)
`contacts` é log de submissões de clientes (form de contacto público) — **nunca tem
DELETE real**, mesmo no portal admin. Só marcar como lido (`read_at`) ou arquivar
(`archived`). `read_at` fica nullable sem default (D1 não permite default
não-constante tipo `datetime('now')` em `ALTER TABLE ADD COLUMN`), populado só
quando o admin marca como lido.

Se um dia for mesmo necessário apagar (ex: pedido RGPD do titular dos dados), isso
é ação manual via `wrangler d1 execute`, fora do portal — não expor DELETE na UI.

## Related
- [[Portal Interno - Arquitetura]]
- [[01_Project_State]]
