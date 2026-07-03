---
type: decision
status: current
created: 2026-07-03
updated: 2026-07-03
tags:
  - decision
  - architecture
  - current
related:
  - "[[01_Project_State]]"
---

# Usar Cloudflare Workers + D1

## Decision
Backend corre em Cloudflare Workers com Hono; base de dados é D1 (SQLite gerido pela
Cloudflare).

## Context
Projeto começou como website simples de catálogo + formulário de contacto. Vai crescer
para portal interno com encomendas, faturação e emails.

## Reason
_(a preencher pelo utilizador — ex: custo, simplicidade de deploy, já familiarizado com
o ecossistema Cloudflare)_

## Consequences importantes a considerar no crescimento futuro
- D1 não expõe controlo explícito de transações além de batching. Operações que precisem
  de ser atómicas (ex: criar fatura + linhas + atualizar stock) têm de ser feitas como
  batch, não como transação tradicional multi-step.
- Modelo de concorrência do D1 é otimista: deteta conflitos no commit, não os previne à
  partida. Escrita concorrente na mesma linha (ex: dois utilizadores a editar a mesma
  encomenda) pode falhar com erro de conflito — precisa de lógica de retry.
- Rever esta decisão se o volume/complexidade de transações do módulo de faturação
  ultrapassar o que batching consegue resolver de forma limpa.

## Related
- [[01_Project_State]]
