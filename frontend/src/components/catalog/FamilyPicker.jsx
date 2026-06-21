import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Typography, Row, Col, Card, Skeleton, Breadcrumb } from "antd";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "";

export default function FamilyPicker() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFailed(false);
    fetch(`${API_URL}/api/catalog/brands/${brandId}/families`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          navigate(`/reparar/${brandId}/modelos`, { replace: true });
          return;
        }
        setFamilies(data);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [brandId, navigate]);

  return (
    <div style={{ padding: "64px 24px", maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
      <Breadcrumb
        style={{ textAlign: "left", marginBottom: 24 }}
        items={[
          { title: <Link to="/reparar">Reparações</Link> },
          { title: brandId },
        ]}
      />
      <Title level={2}>Escolha a Família</Title>
      <Row gutter={[24, 24]} style={{ marginTop: 32 }} aria-busy={loading || failed} aria-live="polite">
        {loading || failed
          ? Array.from({ length: 4 }).map((_, i) => (
              <Col xs={12} sm={8} md={6} key={i}>
                <Card>
                  <Skeleton active paragraph={false} />
                </Card>
              </Col>
            ))
          : families.map((f) => (
              <Col xs={12} sm={8} md={6} key={f.id}>
                <Link to={`/reparar/${brandId}/${f.id}`}>
                  <Card hoverable>{f.name}</Card>
                </Link>
              </Col>
            ))}
      </Row>
    </div>
  );
}
