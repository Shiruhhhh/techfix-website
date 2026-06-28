import { useState } from "react";
import { Typography, Row, Col, Form, Input, Select, Button, Space, message } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  LockOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "";
const display = { fontFamily: "'Space Grotesk', sans-serif" };

const inputStyle = {
  height: 46,
  borderRadius: 11,
  borderColor: "var(--line-input)",
  background: "var(--input-bg)",
};

const CONTACTS = [
  { icon: <PhoneOutlined />, strong: "210 000 000", sub: "Seg–Sáb · 9h–19h", href: "tel:+351210000000" },
  { icon: <MailOutlined />, strong: "ola@techfix.pt", sub: "Resposta em até 1h", href: "mailto:ola@techfix.pt" },
  { icon: <EnvironmentOutlined />, strong: "Rua das Tecnologias, 42 · Lisboa", sub: "Junto à estação do Rossio" },
];

export default function Contact() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      message.success("Pedido enviado com sucesso!");
      form.resetFields();
      setSent(true);
    } catch {
      message.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="contacto"
      style={{
        padding: "clamp(64px, 8vw, 104px) 24px",
        background: "radial-gradient(130% 120% at 0% 0%, #0b3a66, #0a2747 50%, #071a31)",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="contact-grid">
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
                padding: "7px 15px",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Pronto quando você estiver
            </span>
            <Title
              level={2}
              style={{
                ...display,
                color: "#fff",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.8vw, 46px)",
                letterSpacing: "-.025em",
                lineHeight: 1.08,
                margin: "18px 0 0",
              }}
            >
              O seu dispositivo merece o melhor arranjo.
            </Title>
            <Paragraph
              style={{ color: "#bccadd", fontSize: 17, lineHeight: 1.6, maxWidth: 440, margin: "18px 0 32px" }}
            >
              Peça um orçamento grátis e sem compromisso. Respondemos em menos de
              1 hora em horário comercial.
            </Paragraph>
            <Space direction="vertical" size="middle" style={{ width: "100%", gap: 18 }}>
              {CONTACTS.map((c) => (
                <Space key={c.strong} align="center" size="middle">
                  <span
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: "rgba(255,255,255,.07)",
                      border: "1px solid rgba(255,255,255,.12)",
                      color: "var(--accent)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </span>
                  <div>
                    <Text strong style={{ color: "#fff", display: "block", fontWeight: 800, fontSize: 16 }}>
                      {c.href ? (
                        <a href={c.href} style={{ color: "#fff" }}>
                          {c.strong}
                        </a>
                      ) : (
                        c.strong
                      )}
                    </Text>
                    <Text style={{ color: "#9fb1ca", fontSize: 13 }}>{c.sub}</Text>
                  </div>
                </Space>
              ))}
            </Space>
          </div>

          {/* RIGHT */}
          <div>
            <div
              style={{
                background: "#fff",
                borderRadius: 22,
                boxShadow: "0 40px 80px -30px rgba(0,0,0,.6)",
                padding: "clamp(24px, 3vw, 38px)",
              }}
            >
              {sent ? (
                <div style={{ textAlign: "center", padding: "32px 8px" }}>
                  <CheckCircleFilled style={{ color: "var(--success)", fontSize: 52 }} />
                  <Title level={3} style={{ ...display, color: "var(--ink)", marginTop: 16, marginBottom: 8 }}>
                    Pedido enviado!
                  </Title>
                  <Paragraph style={{ color: "var(--muted)", fontSize: 15 }}>
                    Obrigado. Entramos em contacto em menos de 1 hora em horário comercial.
                  </Paragraph>
                  <Button
                    size="large"
                    onClick={() => setSent(false)}
                    style={{ marginTop: 8, borderRadius: 11, height: 46 }}
                  >
                    Enviar outro pedido
                  </Button>
                </div>
              ) : (
                <>
                  <Title level={3} style={{ ...display, color: "var(--ink)", fontWeight: 700, fontSize: 23, marginTop: 0, marginBottom: 4 }}>
                    Pedir orçamento grátis
                  </Title>
                  <Paragraph style={{ color: "#7a8aa0", fontSize: 14, marginBottom: 22 }}>
                    Preencha e respondemos em menos de 1 hora.
                  </Paragraph>
                  <Form form={form} layout="vertical" size="large" onFinish={onFinish} requiredMark={false}>
                    <Row gutter={14}>
                      <Col xs={24} sm={12}>
                        <Form.Item name="name" label="Nome" rules={[{ required: true, message: "Indique o seu nome" }]}>
                          <Input placeholder="O seu nome" style={inputStyle} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item name="phone" label="Telemóvel">
                          <Input placeholder="9XX XXX XXX" style={inputStyle} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[{ required: true, type: "email", message: "Email válido obrigatório" }]}
                    >
                      <Input placeholder="email@exemplo.pt" style={inputStyle} />
                    </Form.Item>
                    <Form.Item
                      name="device"
                      label="Dispositivo"
                      initialValue="smartphone"
                      rules={[{ required: true, message: "Escolha o dispositivo" }]}
                    >
                      <Select
                        style={inputStyle}
                        options={[
                          { value: "smartphone", label: "Smartphone" },
                          { value: "tablet", label: "Tablet" },
                          { value: "laptop", label: "Portátil" },
                          { value: "desktop", label: "Computador" },
                          { value: "consola", label: "Consola" },
                          { value: "outro", label: "Outro" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item name="message" label="Descreva o problema" rules={[{ required: true, message: "Descreva o problema" }]}>
                      <Input.TextArea
                        placeholder="Ex: ecrã partido, bateria fraca..."
                        rows={4}
                        style={{ borderRadius: 11, borderColor: "var(--line-input)", background: "var(--input-bg)" }}
                      />
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      block
                      loading={submitting}
                      icon={!submitting && <ArrowRightOutlined />}
                      iconPlacement="end"
                      className="cta-lift"
                      style={{
                        background: "var(--accent)",
                        borderColor: "var(--accent)",
                        height: 52,
                        borderRadius: 13,
                        fontWeight: 700,
                        fontSize: 16.5,
                        marginTop: 6,
                        boxShadow: "0 16px 34px -14px rgba(255,122,26,.85)",
                      }}
                    >
                      {submitting ? "A enviar..." : "Enviar Pedido"}
                    </Button>
                    <Text style={{ display: "block", textAlign: "center", color: "var(--faint)", fontSize: 12.5, marginTop: 14 }}>
                      <LockOutlined /> Os seus dados são tratados com confidencialidade.
                    </Text>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          gap: clamp(36px, 5vw, 64px);
          align-items: start;
        }
        @media (max-width: 920px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </div>
  );
}
