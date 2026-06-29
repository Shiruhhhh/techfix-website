import { SearchOutlined } from "@ant-design/icons";

// Campo de pesquisa do hero (sobre fundo escuro). Filtragem client-side feita pelo pai.
export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative", width: "min(360px, 100%)" }}>
      <span
        style={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#8ea2bd",
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}
      >
        <SearchOutlined style={{ fontSize: 16 }} />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="repair-search"
        style={{
          width: "100%",
          height: 50,
          padding: "0 16px 0 46px",
          borderRadius: 13,
          border: "1px solid rgba(255,255,255,.16)",
          background: "rgba(255,255,255,.08)",
          color: "#fff",
          fontSize: 15,
          fontFamily: "'Manrope', sans-serif",
          outline: "none",
        }}
      />
      <style>{`
        .repair-search::placeholder { color: #8ea2bd; }
        .repair-search:focus {
          border-color: var(--accent);
          background: rgba(255,255,255,.13);
        }
      `}</style>
    </div>
  );
}
