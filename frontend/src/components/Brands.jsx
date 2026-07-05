import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Skeleton } from "antd";
import { RightOutlined, SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import BrandLogo from "./catalog/BrandLogo";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "";
const display = { fontFamily: "'Space Grotesk', sans-serif" };

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/catalog/brands`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setBrands)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      id="marcas"
      style={{
        padding: "clamp(64px, 8vw, 96px) 24px",
        background: "var(--mist)",
        borderTop: "1px solid #eaf0f7",
        borderBottom: "1px solid #eaf0f7",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 48px" }}>
          <span
            style={{
              color: "var(--accent)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: ".12em",
              textTransform: "uppercase",
            }}
          >
            Multimarca certificada
          </span>
          <Title
            level={2}
            style={{
              ...display,
              fontWeight: 700,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              letterSpacing: "-.02em",
              color: "var(--ink)",
              margin: "12px 0 0",
              lineHeight: 1.08,
            }}
          >
            Reparamos todas as marcas
          </Title>
          <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.6, margin: "16px 0 0" }}>
            Clique na sua marca para ver modelos, avarias e preços. Diagnóstico grátis em qualquer equipamento.
          </p>
        </div>

        <div className="brands-grid" aria-busy={loading || failed} aria-live="polite">
          {loading || failed
            ? Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 16,
                    padding: "18px 20px",
                  }}
                >
                  <Skeleton active avatar paragraph={false} title={{ width: "70%" }} />
                </div>
              ))
            : brands.map((b) => (
                <Link key={b.id} to={`/reparar/${b.id}`} className="brand-card">
                  <span className="brand-card-logo">
                    <BrandLogo slug={b.iconSlug} color={b.iconColor} name={b.name} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: 700,
                        fontSize: 16.5,
                        color: "var(--ink)",
                        letterSpacing: "-.01em",
                      }}
                    >
                      {b.name}
                    </span>
                    <span
                      style={{
                        display: "block",
                        color: "var(--faint)",
                        fontSize: 12.5,
                        fontWeight: 600,
                        marginTop: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {b.tagline || `${b.modelCount} modelos`}
                    </span>
                  </span>
                  <RightOutlined style={{ color: "#c3d2e6", fontSize: 16, flexShrink: 0 }} />
                </Link>
              ))}

          {!loading && !failed && (
            <Link to="/reparar" className="brand-card brand-card-all">
              <span className="brand-card-logo brand-card-logo-all">
                <SearchOutlined style={{ color: "var(--accent)", fontSize: 22 }} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", color: "#fff", fontWeight: 700, fontSize: 16.5, letterSpacing: "-.01em" }}>
                  Ver todas as marcas
                </span>
                <span style={{ display: "block", color: "#9fb1ca", fontSize: 12.5, fontWeight: 600, marginTop: 2 }}>
                  Catálogo completo de reparações
                </span>
              </span>
              <ArrowRightOutlined style={{ color: "var(--accent)", fontSize: 16, flexShrink: 0 }} />
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .brands-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .brand-card {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 18px 20px;
          transition: transform .22s, box-shadow .22s, border-color .22s;
        }
        .brand-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 44px -26px rgba(11,58,102,.45);
          border-color: #cfe0f2;
        }
        .brand-card-logo {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #f7f9fd;
          border: 1px solid #eef2f8;
          display: grid;
          place-items: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .brand-card-all {
          background: linear-gradient(135deg, var(--primary), var(--navy-deep));
          border: none;
        }
        .brand-card-all:hover {
          box-shadow: 0 22px 44px -26px rgba(11,58,102,.6);
          border-color: transparent;
        }
        .brand-card-logo-all {
          background: rgba(255,122,26,.18);
          border: none;
        }
        @media (max-width: 920px) {
          .brands-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .brands-grid { grid-template-columns: 1fr; }
          .brand-card:not(.brand-card-all):nth-of-type(n+5) { display: none; }
        }
      `}</style>
    </div>
  );
}
