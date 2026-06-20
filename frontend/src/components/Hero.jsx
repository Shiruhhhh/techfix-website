import { Typography, Button, Flex, Statistic } from "antd";

const { Title, Paragraph } = Typography;

export default function Hero() {
  return (
    <div
      id="top"
      style={{
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
        padding: "80px 24px",
      }}
    >
      <Flex
        wrap
        justify="space-between"
        align="center"
        gap={48}
        style={{ maxWidth: 1180, margin: "0 auto" }}
      >
        <div style={{ flex: "1 1 480px" }}>
          <Title style={{ color: "#fff", fontSize: 44 }}>
            Reparação de Smartphones, Laptops e Desktops
          </Title>
          <Paragraph style={{ color: "#cdd9e6", fontSize: 18, maxWidth: 520 }}>
            Diagnóstico rápido, peças de qualidade e garantia em todas as
            reparações. Devolvemos o seu dispositivo a funcionar como novo.
          </Paragraph>
          <Flex gap={16}>
            <Button type="primary" size="large" href="#contacto">
              Marcar Reparação
            </Button>
            <Button ghost size="large" href="#servicos" style={{ color: "#fff" }}>
              Ver Serviços
            </Button>
          </Flex>
        </div>
        <Flex gap={32} wrap justify="flex-end" style={{ flex: "1 1 320px" }}>
          <Statistic title={<span style={{ color: "#cdd9e6" }}>Anos de Experiência</span>} value="15+" valueStyle={{ color: "var(--accent)" }} />
          <Statistic title={<span style={{ color: "#cdd9e6" }}>Reparações Express</span>} value="30 min" valueStyle={{ color: "var(--accent)" }} />
          <Statistic title={<span style={{ color: "#cdd9e6" }}>Garantia</span>} value="90 dias" valueStyle={{ color: "var(--accent)" }} />
        </Flex>
      </Flex>
    </div>
  );
}
