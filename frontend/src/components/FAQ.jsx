import { useState } from "react";
import { Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const display = { fontFamily: "'Space Grotesk', sans-serif" };

const ITEMS = [
  {
    q: "Quanto tempo demora uma reparação?",
    a: "Muitas reparações de smartphone, como troca de ecrã ou bateria, ficam prontas em cerca de 30 minutos. Portáteis e computadores costumam levar 24 a 72 horas, consoante a peça. Damos sempre uma estimativa no orçamento.",
  },
  {
    q: "O orçamento é mesmo grátis?",
    a: "Sim. O diagnóstico e o orçamento são totalmente gratuitos e sem compromisso. Só avançamos com a reparação depois da sua aprovação do preço fixo.",
  },
  {
    q: "Que garantia oferecem?",
    a: "Todas as reparações incluem 90 dias de garantia, tanto nas peças como na mão-de-obra. Se algo correr mal dentro desse período, resolvemos sem custo.",
  },
  {
    q: "Os meus dados ficam seguros?",
    a: "Sempre que possível não acedemos aos seus dados. Em recuperações de dados seguimos protocolos de confidencialidade e recomendamos backup antes de qualquer intervenção.",
  },
  {
    q: "Reparam a minha marca e modelo?",
    a: "Trabalhamos com todas as principais marcas — Apple, Samsung, Xiaomi, Huawei, Google e muitas outras. Pode confirmar o seu modelo no catálogo completo na secção de serviços.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div id="faq" style={{ padding: "clamp(64px, 8vw, 104px) 24px", background: "#fff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
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
            Perguntas frequentes
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
            Tudo o que precisa de saber
          </Title>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "20px 22px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: 700,
                    fontSize: 16.5,
                    color: "var(--ink)",
                    fontFamily: "inherit",
                  }}
                >
                  {item.q}
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      background: open ? "var(--accent)" : "var(--chip-bg)",
                      color: open ? "#fff" : "var(--chip-text)",
                      transform: open ? "rotate(45deg)" : "none",
                      transition: "transform .25s ease, background .25s ease, color .25s ease",
                    }}
                  >
                    <PlusOutlined />
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: open ? 320 : 0,
                    overflow: "hidden",
                    transition: "max-height .35s ease",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      padding: "0 22px 22px",
                      color: "var(--muted)",
                      fontSize: 15,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
