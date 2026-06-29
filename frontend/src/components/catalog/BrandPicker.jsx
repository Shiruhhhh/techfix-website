import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import RepairLayout from "./RepairLayout";
import SearchInput from "./SearchInput";
import BrandLogo from "./BrandLogo";
import Reassure from "./Reassure";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function BrandPicker() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/catalog/brands`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setBrands)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const term = q.trim().toLowerCase();
  const list = useMemo(
    () => (term ? brands.filter((b) => b.name.toLowerCase().includes(term)) : brands),
    [brands, term]
  );

  const steps = [
    { label: "Marca", num: 1, state: "current" },
    { label: "Gama", num: 2, state: "todo" },
    { label: "Modelo", num: 3, state: "todo" },
    { label: "Reparação", num: 4, state: "todo" },
  ];

  const selectBrand = (b) => {
    // Salta a gama quando a marca não tem famílias (ou tem só uma) — resolvido em FamilyPicker.
    navigate(`/reparar/${b.id}`);
  };

  return (
    <RepairLayout
      steps={steps}
      eyebrow="Catálogo de reparações"
      title="O que vamos reparar?"
      sub="Escolha a marca do seu equipamento. Diagnóstico grátis e orçamento sem compromisso."
      search={<SearchInput value={q} onChange={setQ} placeholder="Pesquisar marca…" />}
    >
      <div className="repair-grid repair-grid-brand" aria-busy={loading || failed} aria-live="polite">
        {loading || failed
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="repair-card-skeleton">
                <Skeleton active avatar paragraph={false} />
              </div>
            ))
          : list.map((b) => (
              <button key={b.id} onClick={() => selectBrand(b)} className="brand-tile">
                <span className="brand-tile-logo">
                  <BrandLogo slug={b.iconSlug} color={b.iconColor} name={b.name} size={38} monoSize={26} />
                </span>
                <span style={{ textAlign: "center" }}>
                  <span style={{ display: "block", fontWeight: 700, fontSize: 16.5, color: "var(--ink)", letterSpacing: "-.01em" }}>
                    {b.name}
                  </span>
                  <span style={{ display: "block", color: "var(--faint)", fontSize: 12.5, fontWeight: 600, marginTop: 3 }}>
                    {b.modelCount} modelos
                  </span>
                </span>
              </button>
            ))}
      </div>

      {!loading && !failed && list.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted-2)", fontSize: 16 }}>
          Nenhuma marca encontrada para "{q}".{" "}
          <a href="tel:+351210000000" style={{ color: "var(--accent)", fontWeight: 700 }}>Ligue-nos</a> — reparamos na mesma.
        </div>
      )}

      <Reassure />

      <style>{`
        .repair-grid {
          display: grid;
          gap: 18px;
        }
        .repair-grid-brand { grid-template-columns: repeat(5, 1fr); }
        .brand-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 30px 16px 24px;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          transition: transform .25s, box-shadow .25s, border-color .25s;
        }
        .brand-tile:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 48px -26px rgba(11,58,102,.5);
          border-color: #cfe0f2;
        }
        .brand-tile-logo {
          width: 66px;
          height: 66px;
          border-radius: 18px;
          background: #f7f9fd;
          border: 1px solid #eef2f8;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .repair-card-skeleton {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 24px;
        }
        @media (max-width: 980px) { .repair-grid-brand { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .repair-grid-brand { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </RepairLayout>
  );
}
