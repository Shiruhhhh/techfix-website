import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import { RightOutlined } from "@ant-design/icons";
import RepairLayout from "./RepairLayout";
import SearchInput from "./SearchInput";
import BackButton from "./BackButton";
import Reassure from "./Reassure";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function ModelPicker() {
  const { brandId, familyId } = useParams();
  const navigate = useNavigate();
  const noFamily = familyId === "modelos";

  const [models, setModels] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    setLoading(true);
    setFailed(false);
    setQ("");

    fetch(`${API_URL}/api/catalog/brands`)
      .then((res) => (res.ok ? res.json() : []))
      .then((bs) => {
        const b = bs.find((x) => x.id === brandId);
        if (b) setBrandName(b.name);
      })
      .catch(() => {});

    if (!noFamily) {
      fetch(`${API_URL}/api/catalog/brands/${brandId}/families`)
        .then((res) => (res.ok ? res.json() : []))
        .then((fs) => {
          const f = fs.find((x) => x.id === familyId);
          if (f) setFamilyName(f.name);
        })
        .catch(() => {});
    }

    const query = noFamily ? "" : `?familyId=${familyId}`;
    fetch(`${API_URL}/api/catalog/brands/${brandId}/models${query}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setModels)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [brandId, familyId, noFamily]);

  const term = q.trim().toLowerCase();
  const words = term ? term.split(/\s+/) : [];
  const list = useMemo(() => {
    if (!term) return models;
    // Todas as palavras da pesquisa têm de aparecer no nome, em qualquer ordem
    // (ex: "11 pro" encontra "iPad Pro 11"); prefixo da frase completa antes
    // de match por palavras soltas, mantém ordem original como desempate.
    return models
      .filter((m) => {
        const name = m.name.toLowerCase();
        return words.every((w) => name.includes(w));
      })
      .sort((a, b) => {
        const an = a.name.toLowerCase();
        const bn = b.name.toLowerCase();
        const ap = an.startsWith(term) ? 0 : 1;
        const bp = bn.startsWith(term) ? 0 : 1;
        return ap - bp;
      });
  }, [models, term, words]);

  const bLabel = brandName || brandId;
  const fLabel = noFamily ? "" : familyName || familyId;
  const eyebrow = bLabel + (fLabel ? ` · ${fLabel}` : "");
  const modelLinkBase = noFamily ? `/reparar/${brandId}/m` : `/reparar/${brandId}/${familyId}`;

  const steps = [
    { label: "Marca", num: 1, state: "done", to: "/reparar" },
    { label: "Gama", num: 2, state: noFamily ? "todo" : "done", to: `/reparar/${brandId}` },
    { label: "Modelo", num: 3, state: "current" },
    { label: "Reparação", num: 4, state: "todo" },
  ];

  return (
    <RepairLayout
      steps={steps}
      eyebrow={eyebrow}
      title="Escolha o modelo"
      sub="Encontre o seu modelo para ver as reparações e preços."
      search={<SearchInput value={q} onChange={setQ} placeholder="Pesquisar modelo…" />}
    >
      <BackButton to={noFamily ? "/reparar" : `/reparar/${brandId}`} label={noFamily ? "Marcas" : fLabel || "Voltar"} />

      <div className="repair-grid repair-grid-model" aria-busy={loading || failed} aria-live="polite">
        {loading || failed
          ? Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="repair-card-skeleton">
                <Skeleton active paragraph={{ rows: 1 }} />
              </div>
            ))
          : list.map((m) => (
              <button
                key={m.id}
                onClick={() => navigate(`${modelLinkBase}/${m.id}`)}
                className="model-tile"
              >
                <span style={{ textAlign: "left" }}>
                  <span style={{ display: "block", fontWeight: 700, fontSize: 16, color: "var(--ink)", letterSpacing: "-.01em" }}>
                    {m.name}
                  </span>
                  {m.minPrice != null && (
                    <span style={{ display: "block", color: "var(--muted)", fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                      desde <span style={{ color: "var(--primary)", fontWeight: 800 }}>{m.minPrice}€</span>
                    </span>
                  )}
                </span>
                <span className="model-tile-arrow">
                  <RightOutlined style={{ fontSize: 16 }} />
                </span>
              </button>
            ))}
      </div>

      {!loading && !failed && list.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted-2)", fontSize: 16 }}>
          {term ? `Sem modelos para "${q}". Experimente outro termo ou ` : "Sem modelos disponíveis. "}
          <a href="tel:+351210000000" style={{ color: "var(--accent)", fontWeight: 700 }}>contacte-nos</a>.
        </div>
      )}

      <Reassure />

      <style>{`
        .repair-grid-model { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .model-tile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 15px;
          padding: 20px 22px;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          transition: transform .2s, box-shadow .2s, border-color .2s;
        }
        .model-tile:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 38px -24px rgba(11,58,102,.5);
          border-color: #cfe0f2;
        }
        .model-tile-arrow {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: var(--chip-bg);
          color: var(--primary);
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }
        @media (max-width: 980px) { .repair-grid-model { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .repair-grid-model { grid-template-columns: 1fr; } }
      `}</style>
    </RepairLayout>
  );
}
