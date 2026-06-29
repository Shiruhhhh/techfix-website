import { CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { IssueIcon } from "./repairIcons";

export default function IssuePriceCard({ issue, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(issue.id)}
      aria-pressed={selected}
      className={`issue-card${selected ? " issue-card-on" : ""}`}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <span className={`issue-card-icon${selected ? " issue-card-icon-on" : ""}`}>
          <IssueIcon iconKey={issue.iconKey} size={22} />
        </span>
        <span className="issue-card-tick" style={{ display: selected ? "grid" : "none" }}>
          <CheckOutlined style={{ fontSize: 12 }} />
        </span>
      </div>

      <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", marginTop: 14 }}>{issue.name}</div>
      {issue.description && (
        <div style={{ color: "var(--muted-2)", fontSize: 13, lineHeight: 1.45, marginTop: 4, minHeight: 38 }}>
          {issue.description}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #eef2f8",
          marginTop: 12,
          paddingTop: 12,
        }}
      >
        <span style={{ color: "var(--ink)", fontWeight: 800, fontSize: 14 }}>
          {issue.price == null ? "Sob consulta" : `desde ${issue.price}€`}
        </span>
        {issue.eta && (
          <span style={{ color: "var(--faint)", fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
            <ClockCircleOutlined style={{ fontSize: 13 }} />
            {issue.eta}
          </span>
        )}
      </div>

      <style>{`
        .issue-card {
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 18px;
          transition: transform .18s, box-shadow .18s, border-color .18s;
        }
        .issue-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 38px -24px rgba(11,58,102,.5);
          border-color: #cfe0f2;
        }
        .issue-card-on {
          border: 2px solid var(--accent);
          box-shadow: 0 18px 38px -22px rgba(255,122,26,.6);
        }
        .issue-card-on:hover { border-color: var(--accent); }
        .issue-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: #fff;
        }
        .issue-card-icon-on {
          background: rgba(255,122,26,.14);
          color: var(--accent);
        }
        .issue-card-tick {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          place-items: center;
          background: var(--accent);
          color: #fff;
        }
      `}</style>
    </button>
  );
}
