import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Card, Skeleton } from "antd";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "";

export default function BrandPicker() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/catalog/brands`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setBrands)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "64px 24px", maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
      <Title level={2}>Escolha a sua Marca</Title>
      <Row gutter={[24, 24]} style={{ marginTop: 32 }} aria-busy={loading || failed} aria-live="polite">
        {loading || failed
          ? Array.from({ length: 6 }).map((_, i) => (
              <Col xs={12} sm={8} md={4} key={i}>
                <Card>
                  <Skeleton active paragraph={false} />
                </Card>
              </Col>
            ))
          : brands.map((b) => (
              <Col xs={12} sm={8} md={4} key={b.id}>
                <Link to={`/reparar/${b.id}`}>
                  <Card hoverable>{b.name}</Card>
                </Link>
              </Col>
            ))}
      </Row>
    </div>
  );
}
