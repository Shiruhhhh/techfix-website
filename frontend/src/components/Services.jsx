import { Link } from "react-router-dom";
import { Typography, Flex } from "antd";
import {
  MobileOutlined,
  TabletOutlined,
  LaptopOutlined,
  DesktopOutlined,
  PlaySquareOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const display = { fontFamily: "'Space Grotesk', sans-serif" };

const SERVICES = [
  {
    icon: <MobileOutlined />,
    title: "Smartphones",
    desc: "Ecrã, bateria e mais — para Apple, Samsung, Xiaomi e todas as marcas.",
    chips: ["Ecrã partido", "Bateria", "Carga"],
    price: "29€",
    eta: "30 min",
  },
  {
    icon: <TabletOutlined />,
    title: "Tablets",
    desc: "iPad e Android — vidro, bateria, botões e problemas de software.",
    chips: ["Vidro / ecrã", "Bateria", "Software"],
    price: "39€",
    eta: "24-48h",
  },
  {
    icon: <LaptopOutlined />,
    title: "Portáteis",
    desc: "Não liga, teclado, ecrã ou upgrades de SSD e RAM para qualquer marca.",
    chips: ["Teclado", "SSD / RAM", "Não liga"],
    price: "39€",
    eta: "24-72h",
  },
  {
    icon: <DesktopOutlined />,
    title: "Computadores",
    desc: "Montagem, upgrades, remoção de vírus e recuperação de dados.",
    chips: ["Upgrade", "Vírus", "Dados"],
    price: "35€",
    eta: "24-72h",
  },
  {
    icon: <PlaySquareOutlined />,
    title: "Consolas",
    desc: "PlayStation, Xbox e Nintendo — HDMI, drift, leitor e sobreaquecimento.",
    chips: ["HDMI", "Drift comandos", "Ventoinha"],
    price: "39€",
    eta: "48-72h",
  },
];

function Eyebrow({ children }) {
  return (
    <span
      style={{
        color: "var(--accent)",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: ".12em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function ServiceCard({ s }) {
  return (
    <div
      className="hover-lift"
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 18,
        padding: 26,
        height: "100%",
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 14,
          background: "linear-gradient(135deg, #0b3a66, #114a82)",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          fontSize: 24,
          marginBottom: 18,
        }}
      >
        {s.icon}
      </div>
      <Title level={4} style={{ ...display, fontWeight: 600, fontSize: 20, margin: "0 0 8px" }}>
        {s.title}
      </Title>
      <Paragraph style={{ color: "var(--muted-2)", fontSize: 14, marginBottom: 16 }}>
        {s.desc}
      </Paragraph>
      <Flex gap={8} wrap style={{ marginBottom: 18 }}>
        {s.chips.map((c) => (
          <span
            key={c}
            style={{
              background: "var(--chip-bg)",
              color: "var(--chip-text)",
              borderRadius: 7,
              padding: "4px 10px",
              fontSize: 12.5,
              fontWeight: 500,
            }}
          >
            {c}
          </span>
        ))}
      </Flex>
      <Flex align="center" justify="space-between">
        <Text style={{ ...display, fontWeight: 800, color: "var(--ink)", fontSize: 16 }}>
          desde {s.price}
        </Text>
        <Text style={{ color: "var(--faint)", fontSize: 13 }}>
          <ClockCircleOutlined /> {s.eta}
        </Text>
      </Flex>
    </div>
  );
}

function CatalogCard() {
  return (
    <Link to="/reparar" style={{ height: "100%" }}>
      <div
        className="hover-lift"
        style={{
          background: "linear-gradient(150deg, #0b3a66, #0a2747)",
          borderRadius: 18,
          padding: 26,
          height: "100%",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: "rgba(255,122,26,.2)",
              color: "var(--accent)",
              display: "grid",
              placeItems: "center",
              fontSize: 24,
              marginBottom: 18,
            }}
          >
            <SearchOutlined />
          </div>
          <Title level={4} style={{ ...display, color: "#fff", fontWeight: 600, fontSize: 20, margin: "0 0 8px" }}>
            Procurar o meu modelo
          </Title>
          <Paragraph style={{ color: "#bccadd", fontSize: 14, marginBottom: 18 }}>
            Veja preços por marca e modelo no nosso catálogo completo.
          </Paragraph>
        </div>
        <Text style={{ color: "var(--accent)", fontWeight: 700 }}>
          Ver catálogo <ArrowRightOutlined />
        </Text>
      </div>
    </Link>
  );
}

export default function Services() {
  return (
    <div id="servicos" style={{ padding: "clamp(64px, 8vw, 104px) 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow>Os Nossos Serviços</Eyebrow>
          <Title
            level={2}
            style={{
              ...display,
              fontWeight: 700,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              letterSpacing: "-.02em",
              color: "var(--ink)",
              lineHeight: 1.08,
              margin: "12px 0 14px",
            }}
          >
            Reparamos todos os seus dispositivos
          </Title>
          <Paragraph style={{ color: "var(--muted)", fontSize: 16, maxWidth: 620, margin: "0 auto" }}>
            Todas as marcas, todos os problemas, com preços transparentes e
            reparações muitas vezes prontas no próprio dia.
          </Paragraph>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(214px, 1fr))",
            gap: 20,
          }}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
          <CatalogCard />
        </div>
      </div>
    </div>
  );
}
