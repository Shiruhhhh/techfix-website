import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Button, Flex, Drawer } from "antd";
import { MenuOutlined, ToolOutlined, PhoneOutlined } from "@ant-design/icons";
import { useAnchorNav } from "./useAnchorNav";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#marcas", label: "Marcas" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#porque-nos", label: "Porquê Nós" },
  { href: "#faq", label: "FAQ" },
];

function Logo() {
  const location = useLocation();
  const onClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <Link to="/" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          background: "linear-gradient(135deg, #0b3a66, #ff7a1a)",
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        <ToolOutlined />
      </span>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 22,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        Tech<span style={{ color: "var(--accent)" }}>Fix</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const anchorNav = useAnchorNav();

  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 120,
        height: 72,
        paddingInline: 24,
        background: "rgba(6,22,44,0.78)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        gap={16}
        style={{ height: "100%", maxWidth: 1200, margin: "0 auto" }}
      >
        <Logo />

        <Flex align="center" gap={28} className="header-nav-desktop">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={anchorNav(l.href)}
              className="nav-underline"
              style={{ color: "#cdd9ea", fontWeight: 500, fontSize: 15 }}
            >
              {l.label}
            </a>
          ))}
        </Flex>

        <Flex align="center" gap={16} className="header-cta-desktop">
          <a href="tel:+351210000000" style={{ color: "#cdd9ea", fontWeight: 600 }}>
            <PhoneOutlined /> 210 000 000
          </a>
          <Button
            type="primary"
            href="#contacto"
            onClick={anchorNav("#contacto")}
            className="cta-lift"
            style={{
              background: "var(--accent)",
              borderColor: "var(--accent)",
              height: 44,
              borderRadius: 11,
              fontWeight: 700,
              boxShadow: "0 10px 24px -10px rgba(255,122,26,.8)",
            }}
          >
            Orçamento Grátis
          </Button>
        </Flex>

        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 20, color: "#fff" }} />}
          onClick={() => setOpen(true)}
          className="header-menu-toggle"
          style={{ background: "rgba(255,255,255,.08)", width: 44, height: 44 }}
        />
      </Flex>

      <Drawer
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        styles={{ body: { display: "flex", flexDirection: "column", gap: 8 } }}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => {
              setOpen(false);
              anchorNav(l.href)(e);
            }}
            style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", padding: "8px 0" }}
          >
            {l.label}
          </a>
        ))}
        <Button
          type="primary"
          href="#contacto"
          block
          onClick={(e) => {
            setOpen(false);
            anchorNav("#contacto")(e);
          }}
          style={{
            marginTop: 12,
            background: "var(--accent)",
            borderColor: "var(--accent)",
            height: 46,
            borderRadius: 11,
            fontWeight: 700,
          }}
        >
          Orçamento Grátis
        </Button>
      </Drawer>

      <style>{`
        .header-menu-toggle { display: none !important; }
        @media (max-width: 600px) {
          .header-nav-desktop, .header-cta-desktop { display: none !important; }
          .header-menu-toggle { display: inline-flex !important; }
        }
        @media (max-width: 920px) {
          .header-nav-desktop { gap: 18px !important; }
        }
      `}</style>
    </Layout.Header>
  );
}
