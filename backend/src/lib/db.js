// table nunca vem de input do utilizador — sempre um literal passado pelo
// código da rota, nunca da query string/body. Nunca interpolar a partir de request.
export async function softDelete(db, table, id) {
  return db.prepare(`UPDATE ${table} SET enabled = 0 WHERE id = ?`).bind(id).run();
}

export async function restore(db, table, id) {
  return db.prepare(`UPDATE ${table} SET enabled = 1 WHERE id = ?`).bind(id).run();
}

export function isUniqueConstraintError(err) {
  return typeof err.message === "string" && err.message.includes("UNIQUE constraint");
}
