import { useEffect, useState } from "react";
import { Typography, Segmented, Row, Col, Card, Skeleton, Tag } from "antd";

const { Title, Paragraph } = Typography;

const CATEGORIES = [
  { value: "all", label: "Todos" },
  { value: "phone", label: "Smartphone" },
  { value: "laptop", label: "Laptop" },
  { value: "desktop", label: "Desktop" },
];

const API_URL = import.meta.env.VITE_API_URL || "";

export default function Services() {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFailed(false);
    const query = category === "all" ? "" : `?category=${category}`;
    fetch(`${API_URL}/api/services${query}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setServices)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div id="servicos" style={{ padding: "80px 24px", maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
      <Title level={2}>Os Nossos Serviços</Title>
      <Paragraph style={{ marginBottom: 32 }}>
        Reparamos smartphones, laptops e computadores de mesa de todas as marcas.
      </Paragraph>

      <Segmented
        options={CATEGORIES}
        value={category}
        onChange={setCategory}
        style={{ marginBottom: 40 }}
      />

      <Row gutter={[24, 24]} style={{ textAlign: "left" }} aria-busy={loading || failed} aria-live="polite">
        {loading || failed
          ? Array.from({ length: 6 }).map((_, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <Card>
                  <Skeleton active paragraph={{ rows: 2 }} />
                </Card>
              </Col>
            ))
          : services.map((s) => (
              <Col xs={24} sm={12} md={8} key={s.id}>
                <Card hoverable title={s.title}>
                  <Paragraph style={{ minHeight: 42 }}>{s.description}</Paragraph>
                  <Tag color="cyan">A partir de {s.priceFrom}€</Tag>
                  <Tag>{s.eta}</Tag>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
}
