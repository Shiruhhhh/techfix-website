import { Typography } from "antd";
import { StarFilled } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const display = { fontFamily: "'Space Grotesk', sans-serif" };

// NOTA: amostras do handoff — substituir por testemunhos reais antes de publicar.
const TESTIMONIALS = [
  {
    name: "Marta S.",
    meta: "Lisboa · iPhone 13",
    text: "Levaram o meu telemóvel com ecrã partido de manhã, estava pronto à tarde. Atendimento impecável.",
  },
  {
    name: "João P.",
    meta: "Almada · Desktop",
    text: "Recuperaram dados de um disco que outra loja disse ser irrecuperável. Recomendo.",
  },
  {
    name: "Rita M.",
    meta: "Lisboa · Portátil Asus",
    text: "Fizeram upgrade ao meu portátil — ficou muito mais rápido e custou menos que comprar outro.",
  },
];

function Stars({ size = 14 }) {
  return (
    <span style={{ color: "var(--accent)", fontSize: size }}>
      <StarFilled />
      <StarFilled />
      <StarFilled />
      <StarFilled />
      <StarFilled />
    </span>
  );
}

export default function Testimonials() {
  return (
    <div id="testemunhos" style={{ padding: "clamp(64px, 8vw, 104px) 24px", background: "var(--mist)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              color: "var(--accent)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: ".12em",
              textTransform: "uppercase",
            }}
          >
            Testemunhos
          </span>
          <Title
            level={2}
            style={{
              ...display,
              fontWeight: 700,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              letterSpacing: "-.02em",
              color: "var(--ink)",
              margin: "12px 0 14px",
            }}
          >
            Clientes satisfeitos
          </Title>
          <Text style={{ color: "var(--muted)", fontSize: 15 }}>
            <Stars size={15} /> 4,9 de 5 · 2.000+ avaliações
          </Text>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="hover-lift"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 18,
                padding: 28,
              }}
            >
              <Stars />
              <Paragraph style={{ marginTop: 12, fontSize: 15.5, color: "var(--body)" }}>
                &ldquo;{t.text}&rdquo;
              </Paragraph>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
                <span
                  style={{
                    ...display,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0b3a66, #ff7a1a)",
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {t.name[0]}
                </span>
                <div>
                  <Text strong style={{ display: "block", color: "var(--ink)" }}>
                    {t.name}
                  </Text>
                  <Text style={{ color: "var(--faint)", fontSize: 13 }}>{t.meta}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 920px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
