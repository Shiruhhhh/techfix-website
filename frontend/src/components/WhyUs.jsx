import { Typography, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;

const REASONS = [
  {
    title: "Diagnóstico Gratuito",
    text: "Avaliamos o seu dispositivo sem compromisso antes de qualquer reparação.",
  },
  {
    title: "Peças de Qualidade",
    text: "Usamos componentes originais ou de qualidade equivalente, testados.",
  },
  {
    title: "Garantia em Todas as Reparações",
    text: "90 dias de garantia em peças e mão-de-obra em qualquer serviço.",
  },
  {
    title: "Reparação Rápida",
    text: "A maioria das reparações fica pronta no mesmo dia.",
  },
];

export default function WhyUs() {
  return (
    <div id="porque-nos" style={{ padding: "80px 24px", maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
      <Title level={2}>Porquê Escolher-nos</Title>
      <Row gutter={[24, 24]} style={{ marginTop: 32, textAlign: "left" }}>
        {REASONS.map((r) => (
          <Col xs={24} sm={12} md={6} key={r.title}>
            <Card>
              <Title level={4}>{r.title}</Title>
              <Paragraph>{r.text}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
