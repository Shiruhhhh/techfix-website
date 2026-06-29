import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function BackButton({ to, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
      <Link to={to} className="repair-back">
        <ArrowLeftOutlined />
        {label}
      </Link>
      <style>{`
        .repair-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 11px;
          padding: 9px 15px;
          font-weight: 700;
          font-size: 14px;
          color: var(--chip-text);
          transition: border-color .2s, color .2s;
        }
        .repair-back:hover {
          border-color: #cfe0f2;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
