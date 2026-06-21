import { Row, Col } from "antd";
import IssuePriceCard from "./IssuePriceCard";

export default function IssueGrid({ issues, selectedIssueId, onSelect }) {
  return (
    <Row gutter={[16, 16]}>
      {issues.map((issue) => (
        <Col xs={12} sm={8} md={6} key={issue.id}>
          <IssuePriceCard
            issue={issue}
            selected={issue.id === selectedIssueId}
            onSelect={onSelect}
          />
        </Col>
      ))}
    </Row>
  );
}
