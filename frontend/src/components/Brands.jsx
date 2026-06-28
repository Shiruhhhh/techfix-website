import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Skeleton } from "antd";
import { ToolOutlined } from "@ant-design/icons";
import {
  SiApple,
  SiSamsung,
  SiHuawei,
  SiMotorola,
  SiAsus,
  SiOneplus,
  SiXiaomi,
  SiHtc,
  SiNokia,
  SiLenovo,
  SiDell,
  SiOppo,
  SiGoogle,
  SiHonor,
} from "react-icons/si";

const { Title, Text } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "";
const display = { fontFamily: "'Space Grotesk', sans-serif" };

const BRAND_ICONS = {
  apple: { Icon: SiApple, color: "#000000" },
  samsung: { Icon: SiSamsung, color: "#1428A0" },
  huawei: { Icon: SiHuawei, color: "#FF0000" },
  motorola: { Icon: SiMotorola, color: "#E1140A" },
  asus: { Icon: SiAsus, color: "#000000" },
  oneplus: { Icon: SiOneplus, color: "#F5010C" },
  xiaomi: { Icon: SiXiaomi, color: "#FF6900" },
  htc: { Icon: SiHtc, color: "#A5C418" },
  nokia: { Icon: SiNokia, color: "#124191" },
  lenovo: { Icon: SiLenovo, color: "#E2231A" },
  dell: { Icon: SiDell, color: "#007DB8" },
  oppo: { Icon: SiOppo, color: "#1BA784" },
  google: { Icon: SiGoogle, color: "#4285F4" },
  honor: { Icon: SiHonor, color: "#000000" },
};

function BrandIcon({ brandId }) {
  const entry = BRAND_ICONS[brandId];
  if (!entry) return <ToolOutlined />;
  const { Icon, color } = entry;
  return <Icon size={28} color={color} />;
}

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
        padding: "clamp(64px, 8vw, 104px) 24px",
        background: "var(--mist)",
        borderTop: "1px solid #eaf0f7",
        borderBottom: "1px solid #eaf0f7",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
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
            }}
          >
            Reparamos todas as marcas
          </Title>
        </div>

        <div className="brands-grid" aria-busy={loading || failed} aria-live="polite">
          {loading || failed
            ? Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 13,
                    padding: "18px 10px",
                  }}
                >
                  <Skeleton active paragraph={false} title={{ width: "80%" }} />
                </div>
              ))
            : brands.map((b) => (
                <Link key={b.id} to={`/reparar/${b.id}`}>
                  <div
                    className="brand-chip"
                    style={{
                      background: "#fff",
                      border: "1px solid var(--line)",
                      borderRadius: 13,
                      padding: "18px 10px",
                      textAlign: "center",
                      transition: "transform .25s ease, color .25s ease, border-color .25s ease",
                    }}
                  >
                    <div style={{ display: "grid", placeItems: "center", marginBottom: 8 }}>
                      <BrandIcon brandId={b.id} />
                    </div>
                    <Text strong style={{ color: "#3c4f6b", fontWeight: 700 }}>
                      {b.name}
                    </Text>
                  </div>
                </Link>
              ))}
          {!loading && !failed && (
            <div
              style={{
                border: "1px dashed #c3d2e6",
                borderRadius: 13,
                padding: "18px 10px",
                display: "grid",
                placeItems: "center",
                color: "var(--muted)",
                fontWeight: 700,
              }}
            >
              + todas
            </div>
          )}
        </div>
      </div>

      <style>{`
        .brands-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 14px;
        }
        .brand-chip:hover {
          transform: translateY(-3px);
          color: #0b3a66;
          border-color: #cfe0f2;
        }
        @media (max-width: 920px) {
          .brands-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 600px) {
          .brands-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
}
