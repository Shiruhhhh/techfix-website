import { Layout, Menu, Button, Flex } from "antd";

const items = [
  { key: "servicos", label: <a href="#servicos">Serviços</a> },
  { key: "marcas", label: <a href="#marcas">Marcas</a> },
  { key: "porque-nos", label: <a href="#porque-nos">Porquê Nós</a> },
  { key: "contacto", label: <a href="#contacto">Contacto</a> },
];

export default function Header() {
  return (
    <Layout.Header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #f0f0f0" }}>
      <Flex align="center" justify="space-between" style={{ height: "100%", maxWidth: 1180, margin: "0 auto" }}>
        <a href="#top" style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)" }}>
          Tech<span style={{ color: "var(--accent)" }}>Fix</span>
        </a>
        <Menu mode="horizontal" items={items} style={{ flex: 1, justifyContent: "center", border: "none" }} />
        <Button type="primary" href="#contacto">
          Marcar Reparação
        </Button>
      </Flex>
    </Layout.Header>
  );
}
