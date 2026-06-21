import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Row, Col, Skeleton, Breadcrumb, Card } from "antd";
import IssueGrid from "./IssueGrid";
import StickyPanel from "./StickyPanel";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "";

export default function ModelDetail() {
  const { brandId, familyId, modelId } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  useEffect(() => {
    setLoading(true);
    setFailed(false);
    fetch(`${API_URL}/api/catalog/models/${modelId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setModel)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [modelId]);

  const handleSelect = (issueId) => {
    setSelectedIssueId(issueId);
    window.history.replaceState(null, "", `#${issueId}`);
  };

  const selectedIssue = model?.issues.find((i) => i.id === selectedIssueId) || null;
  const noFamily = familyId === undefined;

  return (
    <div style={{ padding: "64px 24px", maxWidth: 1180, margin: "0 auto" }}>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          { title: <Link to="/reparar">Reparações</Link> },
          { title: <Link to={`/reparar/${brandId}`}>{brandId}</Link> },
          ...(noFamily ? [] : [{ title: <Link to={`/reparar/${brandId}/${familyId}`}>{familyId}</Link> }]),
          { title: model?.name || modelId },
        ]}
      />

      {loading || failed ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Col xs={12} sm={8} md={6} key={i}>
              <Card>
                <Skeleton active paragraph={false} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[32, 32]}>
          <Col xs={24} md={16}>
            <Title level={2}>Reparação {model.brand.name} {model.name}</Title>
            <IssueGrid
              issues={model.issues}
              selectedIssueId={selectedIssueId}
              onSelect={handleSelect}
            />
          </Col>
          <Col xs={24} md={8}>
            <StickyPanel model={model} selectedIssue={selectedIssue} />
          </Col>
        </Row>
      )}
    </div>
  );
}
