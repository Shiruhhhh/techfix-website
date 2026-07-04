// Valida o JWT emitido pelo Cloudflare Access para o subdomínio do portal.
// O gate no edge (Access Application) já bloqueia pedidos sem sessão válida,
// mas o Worker é um binding partilhado por outros frontends — não confiar só
// nisso, validar o JWT aqui também.
import { createRemoteJWKSet, jwtVerify } from "jose";

let jwks;

export function cloudflareAccess() {
  return async (c, next) => {
    if (c.env.LOCAL_DEV === "true") {
      c.set("accessUser", { email: "local-dev@localhost" });
      await next();
      return;
    }

    const teamDomain = c.env.CF_ACCESS_TEAM_DOMAIN;
    const aud = c.env.CF_ACCESS_AUD;
    if (!teamDomain || !aud) {
      return c.json({ error: "Access não configurado no servidor" }, 500);
    }

    const token = c.req.header("Cf-Access-Jwt-Assertion");
    if (!token) {
      return c.json({ error: "não autenticado" }, 401);
    }

    jwks ??= createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`));

    try {
      const { payload } = await jwtVerify(token, jwks, {
        issuer: teamDomain,
        audience: aud,
      });
      c.set("accessUser", { email: payload.email, sub: payload.sub });
    } catch {
      return c.json({ error: "sessão inválida" }, 403);
    }

    await next();
  };
}
