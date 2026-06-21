import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message as antdMessage } from "antd";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function ContactModal({ open, onClose, modelName, issueName }) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        model: modelName,
        issue: issueName,
        message: `Boa tarde, gostaria de obter um orçamento para ${issueName} do ${modelName}.`,
      });
    }
  }, [open, modelName, issueName, form]);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        }),
      });
      if (!res.ok) throw new Error();
      antdMessage.success("Pedido enviado com sucesso!");
      form.resetFields(["name", "email", "phone"]);
      onClose();
    } catch {
      antdMessage.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Pedir Orçamento" open={open} onCancel={onClose} footer={null} destroyOnClose>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Nome" rules={[{ required: true, message: "Indique o seu nome" }]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Email válido obrigatório" }]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="phone" label="Número" rules={[{ required: true, message: "Indique o seu número" }]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="model" label="Modelo">
          <Input size="large" disabled />
        </Form.Item>
        <Form.Item name="issue" label="Peça">
          <Input size="large" disabled />
        </Form.Item>
        <Form.Item name="message" label="Mensagem" rules={[{ required: true, message: "Descreva o pedido" }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={submitting} block>
            Enviar Pedido
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
