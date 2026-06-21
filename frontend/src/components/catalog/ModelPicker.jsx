import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Row, Col, Card, Skeleton, Breadcrumb } from "antd";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "";

export default function ModelPicker() {
  const { brandId, familyId } = useParams();
  const noFamily = familyId === "modelos";
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const query = noFamily ? "" : `?familyId=${familyId}`;
    fetch(`${API_URL}/api/catalog/brands/${brandId}/models${query}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setModels)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [brandId, familyId, noFamily]);

  const modelLinkBase = noFamily
    ? `/reparar/${brandId}/m`
    : `/reparar/${brandId}/${familyId}`;

  return (
    <div style={{ padding: "64px 24px", maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
      <Breadcrumb
        style={{ textAlign: "left", marginBottom: 24 }}
        items={[
          { title: <Link to="/reparar">Reparações</Link> },
          { title: <Link to={`/reparar/${brandId}`}>{brandId}</Link> },
          ...(noFamily ? [] : [{ title: familyId }]),
        ]}
      />
      <Title level={2}>Escolha o Modelo</Title>
      <Row gutter={[24, 24]} style={{ marginTop: 32 }} aria-busy={loading || failed} aria-live="polite">
        {loading || failed
          ? Array.from({ length: 6 }).map((_, i) => (
              <Col xs={12} sm={8} md={6} key={i}>
                <Card>
                  <Skeleton active paragraph={false} />
                </Card>
              </Col>
            ))
          : models.map((m) => (
              <Col xs={12} sm={8} md={6} key={m.id}>
                <Link to={`${modelLinkBase}/${m.id}`}>
                  <Card hoverable>{m.name}</Card>
                </Link>
              </Col>
            ))}
      </Row>
    </div>
  );
}
