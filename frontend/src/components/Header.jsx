import { useState } from "react";
import { Layout, Menu, Button, Flex, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const items = [
  { key: "servicos", label: <a href="#servicos">Serviços</a> },
  { key: "marcas", label: <a href="#marcas">Marcas</a> },
  { key: "porque-nos", label: <a href="#porque-nos">Porquê Nós</a> },
  { key: "contacto", label: <a href="#contacto">Contacto</a> },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <Layout.Header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #f0f0f0", paddingInline: 16 }}>
      <Flex align="center" justify="space-between" style={{ height: "100%", maxWidth: 1180, margin: "0 auto" }}>
        <a href="#top" style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)" }}>
          Tech<span style={{ color: "var(--accent)" }}>Fix</span>
        </a>

        <Menu
          mode="horizontal"
          items={items}
          style={{ flex: 1, justifyContent: "center", border: "none", display: "none" }}
          className="header-menu-desktop"
        />

        <Button type="primary" href="#contacto" className="header-cta-desktop">
          Marcar Reparação
        </Button>

        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 20 }} />}
          onClick={() => setOpen(true)}
          className="header-menu-toggle"
        />
      </Flex>

      <Drawer placement="right" onClose={() => setOpen(false)} open={open} width={260}>
        <Menu
          mode="vertical"
          items={items}
          onClick={() => setOpen(false)}
          style={{ border: "none" }}
        />
        <Button type="primary" href="#contacto" block onClick={() => setOpen(false)} style={{ marginTop: 16 }}>
          Marcar Reparação
        </Button>
      </Drawer>

      <style>{`
        @media (min-width: 769px) {
          .header-menu-desktop { display: flex !important; }
          .header-menu-toggle { display: none !important; }
        }
        @media (max-width: 768px) {
          .header-cta-desktop { display: none !important; }
        }
      `}</style>
    </Layout.Header>
  );
}
