// Cache em memória do isolate para rotas GET públicas de leitura (catálogo).
// Protege o D1 de rajadas de tráfego: o primeiro pedido por chave paga a query,
// os seguintes (no mesmo isolate, dentro do TTL) respondem da RAM.
//
// Limitações conhecidas (aceites de propósito, ver vault/03_Decisions):
// - Por isolate/colo — não é partilhado globalmente. Cada isolate aquece o seu.
// - Sem invalidação nas escritas admin — staleness máximo = TTL.
// - O Cache-Control abaixo deixa browsers (max-age) e o edge da Cloudflare
//   (s-maxage, só com domínio custom — em *.workers.dev o edge não cacheia
//   respostas de Workers) cachear por cima desta camada.

const MAX_ENTRIES = 500; // catálogo é pequeno; teto só como salvaguarda

const store = new Map();

export function memoryCache({ ttlSeconds = 60, edgeTtlSeconds = 300 } = {}) {
  const cacheControl = `public, max-age=${ttlSeconds}, s-maxage=${edgeTtlSeconds}`;

  return async (c, next) => {
    if (c.req.method !== "GET") {
      await next();
      return;
    }

    const url = new URL(c.req.url);
    const key = url.pathname + url.search;
    const hit = store.get(key);

    if (hit && hit.expires > Date.now()) {
      return c.json(hit.data, 200, {
        "Cache-Control": cacheControl,
        "X-Cache": "HIT",
      });
    }

    await next();

    if (c.res.status === 200) {
      const data = await c.res.clone().json().catch(() => undefined);
      if (data !== undefined) {
        if (store.size >= MAX_ENTRIES) {
          store.delete(store.keys().next().value); // evict entrada mais antiga
        }
        store.set(key, { data, expires: Date.now() + ttlSeconds * 1000 });
        c.res.headers.set("Cache-Control", cacheControl);
        c.res.headers.set("X-Cache", "MISS");
      }
    }
  };
}
