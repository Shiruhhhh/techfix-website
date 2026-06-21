import { Affix, Card, Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function StickyPanel({ model, selectedIssue }) {
  const content = (
    <Card style={{ textAlign: "center" }}>
      <Title level={4}>{model.brand.name} {model.name}</Title>
      {selectedIssue ? (
        <>
          <Paragraph>{selectedIssue.name}</Paragraph>
          {selectedIssue.eta && <Paragraph type="secondary">{selectedIssue.eta}</Paragraph>}
          <Title level={3} style={{ color: "var(--accent, #00b4d8)" }}>
            {selectedIssue.price === null ? "Contacte-nos" : `${selectedIssue.price}€`}
          </Title>
        </>
      ) : (
        <Paragraph>Selecione uma avaria para ver o preço</Paragraph>
      )}
      <Button type="primary" size="large" block href="#contacto">
        Contacte-nos
      </Button>
    </Card>
  );

  return (
    <>
      <div className="sticky-panel-desktop">
        <Affix offsetTop={88}>{content}</Affix>
      </div>
      <div className="sticky-panel-mobile">{content}</div>
      <style>{`
        @media (min-width: 769px) {
          .sticky-panel-mobile { display: none; }
        }
        @media (max-width: 768px) {
          .sticky-panel-desktop { display: none; }
        }
      `}</style>
    </>
  );
}
