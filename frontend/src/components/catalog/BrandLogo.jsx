import { useEffect, useState } from "react";

// Logo da marca a partir do CDN do Simple Icons (atualiza-se sem rebuild).
// Mono na cor da marca quando há `color`. Sem slug, ou falha de carregamento -> monograma.
export default function BrandLogo({ slug, color, name, size = 30, monoSize = 21 }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [slug, color]);

  if (slug && !failed) {
    const url = color
      ? `https://cdn.simpleicons.org/${slug}/${color}`
      : `https://cdn.simpleicons.org/${slug}`;
    return (
      <img
        src={url}
        alt={name || slug}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }

  const initial = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <span
      aria-hidden="true"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: monoSize,
        color: "var(--primary)",
        lineHeight: 1,
      }}
    >
      {initial}
    </span>
  );
}
