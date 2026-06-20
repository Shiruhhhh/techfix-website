import { useState } from "react";
import { Typography, Row, Col, Form, Input, Button, message } from "antd";

const { Title, Paragraph } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "";

export default function Contact() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

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
    } catch {
      message.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contacto" style={{ padding: "80px 24px", background: "#f5f7fa" }}>
      <Row gutter={[48, 32]} style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Col xs={24} md={11}>
          <Title level={2}>Contacte-nos</Title>
          <Paragraph>
            Envie-nos os detalhes do seu dispositivo e entramos em contacto
            para marcar a reparação.
          </Paragraph>
          <Paragraph><span aria-hidden="true">📍</span> Rua Exemplo, 123, Lisboa</Paragraph>
          <Paragraph><span aria-hidden="true">📞</span> <a href="tel:+351900000000">+351 900 000 000</a></Paragraph>
          <Paragraph><span aria-hidden="true">✉️</span> <a href="mailto:geral@techfix.pt">geral@techfix.pt</a></Paragraph>
          <Paragraph><span aria-hidden="true">🕒</span> Seg-Sáb: 9h-19h</Paragraph>
        </Col>
        <Col xs={24} md={13}>
          <Form form={form} layout="vertical" onFinish={onFinish} style={{ background: "#fff", padding: 32, borderRadius: 8 }}>
            <Form.Item name="name" label="Nome" rules={[{ required: true, message: "Indique o seu nome" }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Email válido obrigatório" }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item name="message" label="Mensagem" rules={[{ required: true, message: "Descreva o problema" }]}>
              <Input.TextArea placeholder="Descreva o problema do seu dispositivo" rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" loading={submitting} block>
                Enviar Pedido
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
