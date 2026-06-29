import {
  CheckCircleOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  CarOutlined,
} from "@ant-design/icons";

const items = [
  { icon: <CheckCircleOutlined />, text: "Orçamento sem compromisso" },
  { icon: <SafetyOutlined />, text: "90 dias de garantia" },
  { icon: <ThunderboltOutlined />, text: "Muitas reparações em 30 min" },
  { icon: <CarOutlined />, text: "Recolha e entrega grátis" },
];

export default function Reassure() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "18px 40px",
        marginTop: "clamp(40px,5vw,60px)",
        paddingTop: "clamp(34px,4vw,44px)",
        borderTop: "1px solid var(--line)",
        color: "var(--muted)",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {items.map((it) => (
        <span key={it.text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--accent)", fontSize: 16 }}>{it.icon}</span>
          {it.text}
        </span>
      ))}
    </div>
  );
}
