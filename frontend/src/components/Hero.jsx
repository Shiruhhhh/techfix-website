import { Typography, Button, Flex } from "antd";
import {
  ArrowRightOutlined,
  StarFilled,
  SafetyOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  RocketOutlined,
  ToolOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import heroImg from "../assets/hero-repair.jpg";

const { Title, Paragraph, Text } = Typography;

const display = { fontFamily: "'Space Grotesk', sans-serif" };

const STATS = [
  { value: "15+", label: "Anos a reparar" },
  { value: "30min", label: "Express" },
  { value: "90d", label: "Garantia" },
  { value: "50k+", label: "Reparações" },
];

const TRUST = [
  { icon: <CheckCircleFilled />, text: "Orçamento sem compromisso" },
  { icon: <SafetyOutlined />, text: "Peças com garantia" },
  { icon: <RocketOutlined />, text: "Recolha e entrega grátis" },
  { icon: <CustomerServiceOutlined />, text: "Resposta em menos de 1h" },
];

export default function Hero() {
  return (
    <div
      id="top"
      style={{
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        background:
          "radial-gradient(140% 120% at 78% 8%, #0b3a66 0%, #0a2747 42%, #071a31 100%)",
      }}
    >
      {/* tech grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage: "radial-gradient(80% 80% at 60% 20%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(80% 80% at 60% 20%, #000 30%, transparent 80%)",
        }}
      />
      {/* orb */}
      <div
        className="hero-orb"
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(255,122,26,.30), transparent 62%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(64px, 8vw, 104px) 24px",
        }}
      >
        <div className="hero-grid">
          {/* LEFT */}
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(255,122,26,.13)",
                border: "1px solid rgba(255,122,26,.32)",
                color: "var(--accent-soft)",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <span
                className="pulse-dot"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              Reparação Express em 30 min
            </span>

            <Title
              style={{
                ...display,
                color: "#fff",
                fontSize: "clamp(36px, 5.4vw, 62px)",
                lineHeight: 1.04,
                letterSpacing: "-.025em",
                fontWeight: 700,
                marginTop: 20,
                marginBottom: 18,
              }}
            >
              Reparamos hoje. Com{" "}
              <span style={{ color: "var(--accent)" }}>garantia</span> de 90 dias.
            </Title>

            <Paragraph
              style={{
                color: "#bccadd",
                fontSize: "clamp(16px, 1.6vw, 19px)",
                maxWidth: 520,
                marginBottom: 28,
              }}
            >
              Smartphones, tablets, portáteis, computadores e consolas — todas as
              marcas. Diagnóstico grátis, peças de qualidade e reparações express,
              muitas prontas no próprio dia.
            </Paragraph>

            <Flex gap={14} wrap>
              <Button
                type="primary"
                size="large"
                href="#contacto"
                className="cta-lift"
                icon={<ArrowRightOutlined />}
                iconPlacement="end"
                style={{
                  background: "var(--accent)",
                  borderColor: "var(--accent)",
                  height: 54,
                  padding: "0 30px",
                  fontSize: 16,
                  borderRadius: 12,
                  fontWeight: 700,
                  boxShadow: "0 16px 38px -12px rgba(255,122,26,.85)",
                }}
              >
                Pedir Orçamento Grátis
              </Button>
              <Button
                size="large"
                href="#servicos"
                style={{
                  background: "rgba(255,255,255,.07)",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,.2)",
                  height: 54,
                  padding: "0 28px",
                  fontSize: 16,
                  borderRadius: 12,
                }}
              >
                Ver Serviços
              </Button>
            </Flex>

            {/* social proof */}
            <Flex align="center" gap={16} wrap style={{ marginTop: 28 }}>
              <Flex align="center" gap={8}>
                <span style={{ color: "var(--accent)", fontSize: 16, letterSpacing: 2 }}>
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                </span>
                <Text style={{ color: "#bccadd", fontWeight: 600 }}>
                  4,9/5 · 2.000+ avaliações
                </Text>
              </Flex>
              <span style={{ width: 1, height: 18, background: "rgba(255,255,255,.18)" }} />
              <Text style={{ color: "#9fb1ca" }}>
                <SafetyOutlined style={{ color: "var(--accent)" }} /> Técnicos certificados
              </Text>
            </Flex>

            {/* stats */}
            <Flex gap={36} wrap style={{ marginTop: 40 }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      ...display,
                      color: "var(--accent)",
                      fontWeight: 700,
                      fontSize: 30,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <Text style={{ color: "#93a6c0", fontSize: 13 }}>{s.label}</Text>
                </div>
              ))}
            </Flex>
          </div>

          {/* RIGHT — image card */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.14)",
                boxShadow: "0 40px 90px -30px rgba(0,0,0,.7)",
                height: "clamp(360px, 46vw, 520px)",
              }}
            >
              <img
                src={heroImg}
                alt="Técnico a reparar dispositivo"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(7,26,49,.65), transparent 45%)",
                }}
              />
              <div
                className="hero-scan"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 3,
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,122,26,.9), transparent)",
                }}
              />
            </div>

            {/* floating cards */}
            <div
              className="float-a"
              style={{
                position: "absolute",
                bottom: 24,
                left: -14,
                background: "#fff",
                borderRadius: 14,
                padding: "12px 16px",
                boxShadow: "0 20px 40px -16px rgba(0,0,0,.4)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <CheckCircleFilled style={{ color: "var(--success)", fontSize: 22 }} />
              <div>
                <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: 14 }}>
                  Diagnóstico grátis
                </div>
                <div style={{ color: "var(--muted-2)", fontSize: 12 }}>Sem compromisso</div>
              </div>
            </div>

            <div
              className="float-b"
              style={{
                position: "absolute",
                top: 18,
                right: -14,
                background: "#fff",
                borderRadius: 14,
                padding: "12px 16px",
                boxShadow: "0 20px 40px -16px rgba(0,0,0,.4)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <ClockCircleOutlined style={{ color: "var(--accent)", fontSize: 20 }} />
              <div>
                <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: 14 }}>
                  Pronto hoje
                </div>
                <div style={{ color: "var(--muted-2)", fontSize: 12 }}>
                  Maioria das reparações
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* trust strip */}
      <div
        style={{
          position: "relative",
          background: "rgba(4,16,32,.4)",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {TRUST.map((t) => (
            <Flex key={t.text} align="center" gap={10}>
              <span style={{ color: "var(--accent)", fontSize: 18 }}>{t.icon}</span>
              <Text style={{ color: "#bccadd", fontSize: 14 }}>{t.text}</Text>
            </Flex>
          ))}
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(36px, 5vw, 72px);
          align-items: center;
        }
        @media (max-width: 920px) {
          .hero-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
