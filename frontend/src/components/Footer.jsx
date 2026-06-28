import { Layout, Typography, Space, Divider } from "antd";
import { ToolOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;
const display = { fontFamily: "'Space Grotesk', sans-serif" };

const linkStyle = { color: "#9fb1ca", transition: "color .2s ease" };

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      style={linkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#ff7a1a")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#9fb1ca")}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <Layout.Footer style={{ background: "#061528", color: "#9fb1ca", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid">
          <div>
            <Space style={{ marginBottom: 16 }}>
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #0b3a66, #ff7a1a)",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                }}
              >
                <ToolOutlined />
              </span>
              <Text strong style={{ ...display, color: "#fff", fontSize: 20, fontWeight: 800 }}>
                Tech<span style={{ color: "var(--accent)" }}>Fix</span>
              </Text>
            </Space>
            <Paragraph style={{ color: "#9fb1ca", maxWidth: 320 }}>
              Reparação profissional de smartphones, tablets, portáteis, computadores
              e consolas. Diagnóstico grátis e 90 dias de garantia.
            </Paragraph>
          </div>

          <div>
            <Text strong style={{ color: "#fff", display: "block", marginBottom: 14 }}>
              Serviços
            </Text>
            <Space direction="vertical">
              <FooterLink href="#servicos">Serviços</FooterLink>
              <FooterLink href="#marcas">Marcas</FooterLink>
              <FooterLink href="#como-funciona">Como Funciona</FooterLink>
            </Space>
          </div>

          <div>
            <Text strong style={{ color: "#fff", display: "block", marginBottom: 14 }}>
              Empresa
            </Text>
            <Space direction="vertical">
              <FooterLink href="#porque-nos">Porquê Nós</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
              <FooterLink href="#contacto">Contacto</FooterLink>
            </Space>
          </div>

          <div>
            <Text strong style={{ color: "#fff", display: "block", marginBottom: 14 }}>
              Contacto
            </Text>
            <Space direction="vertical">
              <Text style={{ color: "#9fb1ca" }}>
                <PhoneOutlined /> 210 000 000
              </Text>
              <Text style={{ color: "#9fb1ca" }}>
                <MailOutlined /> ola@techfix.pt
              </Text>
              <Text style={{ color: "#9fb1ca" }}>
                <EnvironmentOutlined /> Rua das Tecnologias, 42, Lisboa
              </Text>
            </Space>
          </div>
        </div>

        <Divider style={{ borderColor: "rgba(255,255,255,0.1)", margin: "40px 0 20px" }} />
        <div style={{ textAlign: "center", color: "#6b7c93", fontSize: 13 }}>
          © {new Date().getFullYear()} TechFix. Todos os direitos reservados.
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
          gap: 40px;
        }
        @media (max-width: 920px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout.Footer>
  );
}
