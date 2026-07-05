import IssuePriceCard from "./IssuePriceCard";

export default function IssueGrid({ issues, selectedIssueId, onSelect }) {
  return (
    <div className="issue-grid">
      {issues.map((issue) => (
        <IssuePriceCard
          key={issue.id}
          issue={issue}
          selected={issue.id === selectedIssueId}
          onSelect={onSelect}
        />
      ))}
      <style>{`
        .issue-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        @media (max-width: 600px) { .issue-grid { gap: 10px; } }
      `}</style>
    </div>
  );
}
