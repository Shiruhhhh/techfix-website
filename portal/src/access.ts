// Cloudflare Access é o único gate (1 utilizador só) — sem roles internas.
export default function access() {
  return {
    canAdmin: true,
  };
}
