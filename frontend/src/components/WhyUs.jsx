import { Typography, Space } from "antd";
import {
  SafetyCertificateOutlined,
  ToolOutlined,
  ThunderboltOutlined,
  CustomerServiceOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const display = { fontFamily: "'Space Grotesk', sans-serif" };

const STATS = [
  { value: "50.000+", label: "Reparações concluídas" },
  { value: "4,9/5", label: "Avaliação dos clientes" },
  { value: "90 dias", label: "Garantia em tudo" },
  { value: "15+", label: "Anos de experiência" },
];

const CHECKLIST = [
  "Diagnóstico grátis em todas as visitas",
  "Orçamento sem compromisso em até 24h",
  "Garantia de 90 dias em peças e mão-de-obra",
  "Recolha e entrega gratuitas na cidade",
];

const FEATURES = [
  { icon: <ThunderboltOutlined />, title: "Reparação Express", text: "30 min para serviços rápidos" },
  { icon: <SafetyCertificateOutlined />, title: "Garantia 90 dias", text: "Em peças e mão-de-obra" },
  { icon: <ToolOutlined />, title: "Peças de qualidade", text: "Originais ou compatíveis premium" },
  { icon: <CustomerServiceOutlined />, title: "Apoio 7 dias", text: "Acompanhamento total" },
];

export default function WhyUs() {
  return (
    <div
      id="porque-nos"
      style={{
        padding: "clamp(64px, 8vw, 104px) 24px",
        background:
          "radial-gradient(120% 120% at 100% 0%, #0b3a66, #0a2747 55%, #071a31)",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* stats strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 24,
            paddingBottom: 40,
            marginBottom: 56,
            borderBottom: "1px solid rgba(255,255,255,.12)",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ ...display, color: "var(--accent)", fontWeight: 700, fontSize: 34, lineHeight: 1 }}>
                {s.value}
              </div>
              <Text style={{ color: "#93a6c0", fontSize: 14 }}>{s.label}</Text>
            </div>
          ))}
        </div>

        <div className="why-grid">
          {/* left */}
          <div>
            <span
              style={{
                color: "var(--accent)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: ".12em",
                textTransform: "uppercase",
              }}
            >
              Porquê a TechFix
            </span>
            <Title
              level={2}
              style={{
                ...display,
                color: "#fff",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.6vw, 44px)",
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                margin: "12px 0 16px",
              }}
            >
              Técnicos certificados.
              <br />
              Peças garantidas.
              <br />
              Preços justos.
            </Title>
            <Paragraph style={{ color: "#bccadd", fontSize: 16 }}>
              Já reparámos mais de 50.000 dispositivos. Seguimos cada reparação com
              diagnóstico transparente — sem surpresas no orçamento final.
            </Paragraph>
            <Space direction="vertical" size="middle" style={{ marginTop: 12 }}>
              {CHECKLIST.map((t) => (
                <Space key={t} align="start">
                  <CheckCircleOutlined style={{ color: "var(--accent)", fontSize: 18 }} />
                  <Text style={{ color: "#dbe5f2", fontSize: 15 }}>{t}</Text>
                </Space>
              ))}
            </Space>
          </div>

          {/* right */}
          <div className="why-cards">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="hover-lift"
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "rgba(255,122,26,.16)",
                    color: "var(--accent)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 20,
                    marginBottom: 12,
                  }}
                >
                  {f.icon}
                </div>
                <Text strong style={{ color: "#fff", display: "block", marginBottom: 4 }}>
                  {f.title}
                </Text>
                <Text style={{ color: "#9fb1ca", fontSize: 13 }}>{f.text}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(36px, 5vw, 64px);
          align-items: center;
        }
        .why-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 920px) {
          .why-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .why-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
