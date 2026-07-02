import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import { RightOutlined } from "@ant-design/icons";
import RepairLayout from "./RepairLayout";
import BackButton from "./BackButton";
import Reassure from "./Reassure";
import { CategoryIcon } from "./repairIcons";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function FamilyPicker() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [families, setFamilies] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFailed(false);

    fetch(`${API_URL}/api/catalog/brands`)
      .then((res) => (res.ok ? res.json() : []))
      .then((bs) => {
        const b = bs.find((x) => x.id === brandId);
        if (b) setBrandName(b.name);
      })
      .catch(() => {});

    fetch(`${API_URL}/api/catalog/brands/${brandId}/families`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        // Sem famílias -> salta direto para os modelos.
        if (data.length === 0) {
          navigate(`/reparar/${brandId}/modelos`, { replace: true });
          return;
        }
        setFamilies(data);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [brandId, navigate]);

  const label = brandName || brandId;
  const steps = [
    { label: "Marca", num: 1, state: "done", to: "/reparar" },
    { label: "Gama", num: 2, state: "current" },
    { label: "Modelo", num: 3, state: "todo" },
    { label: "Reparação", num: 4, state: "todo" },
  ];

  return (
    <RepairLayout
      steps={steps}
      eyebrow={label}
      title="Escolha a gama"
      sub={`Selecione a linha de produto ${label}.`}
    >
      <BackButton to="/reparar" label="Marcas" />

      <div className="repair-grid repair-grid-fam" aria-busy={loading || failed} aria-live="polite">
        {loading || failed
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="repair-card-skeleton">
                <Skeleton active avatar paragraph={{ rows: 1 }} />
              </div>
            ))
          : families.map((f) => (
              <button
                key={f.id}
                onClick={() => navigate(`/reparar/${brandId}/${f.id}`)}
                className="fam-tile"
              >
                <span className="fam-tile-icon">
                  <CategoryIcon category={f.category} size={26} />
                </span>
                <span style={{ flex: 1, textAlign: "left" }}>
                  <span style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 19, color: "var(--ink)" }}>
                    {f.name}
                  </span>
                  <span style={{ display: "block", color: "var(--faint)", fontSize: 13, fontWeight: 600, marginTop: 3 }}>
                    {f.modelCount} modelos
                    {f.minPrice != null && ` · desde ${f.minPrice}€`}
                  </span>
                </span>
                <RightOutlined style={{ color: "#c3d2e6", fontSize: 18 }} />
              </button>
            ))}
      </div>

      <Reassure />

      <style>{`
        .repair-grid-fam { grid-template-columns: repeat(3, 1fr); }
        .fam-tile {
          display: flex;
          align-items: center;
          gap: 18px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 24px;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          transition: transform .25s, box-shadow .25s, border-color .25s;
        }
        .fam-tile:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 48px -26px rgba(11,58,102,.5);
          border-color: #cfe0f2;
        }
        .fam-tile-icon {
          width: 58px;
          height: 58px;
          border-radius: 15px;
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: #fff;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }
        @media (max-width: 980px) { .repair-grid-fam { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .repair-grid-fam { grid-template-columns: 1fr; } }
      `}</style>
    </RepairLayout>
  );
}
