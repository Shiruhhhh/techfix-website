import { Typography } from "antd";

const { Title, Paragraph } = Typography;
const display = { fontFamily: "'Space Grotesk', sans-serif" };

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico grátis",
    text: "Traga-nos o equipamento ou peça recolha. Avaliamos a avaria sem qualquer custo.",
  },
  {
    n: "02",
    title: "Orçamento em 24h",
    text: "Recebe um preço fixo e transparente. Só avançamos com a sua aprovação.",
  },
  {
    n: "03",
    title: "Reparação express",
    text: "Técnicos certificados, peças de qualidade. Muitas reparações prontas no próprio dia.",
  },
  {
    n: "04",
    title: "Entrega com garantia",
    text: "Levantamento ou entrega em casa, com 90 dias de garantia em peças e mão-de-obra.",
  },
];

export default function HowItWorks() {
  return (
    <div id="como-funciona" style={{ padding: "clamp(64px, 8vw, 104px) 24px", background: "#fff" }}>
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
            Simples e transparente
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
            Como funciona
          </Title>
        </div>

        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ position: "relative" }}>
              {i < STEPS.length - 1 && (
                <span
                  className="step-connector"
                  style={{
                    position: "absolute",
                    top: 23,
                    left: "calc(50% + 32px)",
                    right: "calc(-50% + 32px)",
                    height: 2,
                    background: "linear-gradient(90deg, #c9d8ea, transparent)",
                  }}
                />
              )}
              <div
                style={{
                  ...display,
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: i === 3 ? "var(--accent)" : "var(--primary)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontSize: 17,
                  marginBottom: 18,
                }}
              >
                {s.n}
              </div>
              <Title level={4} style={{ ...display, fontWeight: 600, fontSize: 19, margin: "0 0 8px" }}>
                {s.title}
              </Title>
              <Paragraph style={{ color: "var(--muted-2)", fontSize: 14.5, marginBottom: 0 }}>
                {s.text}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        @media (max-width: 920px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .step-connector { display: none; }
        }
        @media (max-width: 600px) {
          .steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
