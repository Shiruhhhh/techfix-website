import { Card, Tag } from "antd";

export default function IssuePriceCard({ issue, selected, onSelect }) {
  return (
    <Card
      hoverable
      onClick={() => onSelect(issue.id)}
      style={selected ? { borderColor: "#00b4d8", boxShadow: "0 0 0 1px #00b4d8" } : undefined}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{issue.name}</div>
      {issue.price === null ? (
        <Tag>Contacte-nos</Tag>
      ) : (
        <Tag color="cyan">{issue.price}€</Tag>
      )}
    </Card>
  );
}
