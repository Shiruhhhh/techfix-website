import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";
import RepairLayout from "./RepairLayout";
import BackButton from "./BackButton";
import IssueGrid from "./IssueGrid";
import StickyPanel from "./StickyPanel";
import ContactModal from "./ContactModal";
import { fullModelName } from "./modelName";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function ModelDetail() {
  const { brandId, familyId, modelId } = useParams();
  const noFamily = familyId === undefined;
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFailed(false);
    setSelectedIssueId(null);
    fetch(`${API_URL}/api/catalog/models/${modelId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setModel)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [modelId]);

  const handleSelect = (issueId) => {
    setSelectedIssueId(issueId);
    window.history.replaceState(null, "", `#${issueId}`);
  };

  const selectedIssue = model?.issues.find((i) => i.id === selectedIssueId) || null;
  const modelsTo = noFamily ? `/reparar/${brandId}/modelos` : `/reparar/${brandId}/${familyId}`;
  const eyebrow = model ? model.brand.name : brandId;

  const steps = [
    { label: "Marca", num: 1, state: "done", to: "/reparar" },
    { label: "Gama", num: 2, state: noFamily ? "todo" : "done", to: `/reparar/${brandId}` },
    { label: "Modelo", num: 3, state: "done", to: modelsTo },
    { label: "Reparação", num: 4, state: "current" },
  ];

  return (
    <RepairLayout
      steps={steps}
      eyebrow={eyebrow}
      title={model ? model.name : "Reparação"}
      sub="Preço fixo por avaria, com 90 dias de garantia."
    >
      <BackButton to={modelsTo} label={model ? model.name : "Modelos"} />

      {loading || failed ? (
        <div className="detail-grid">
          <div className="issue-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 16, padding: 18 }}>
                <Skeleton active paragraph={{ rows: 2 }} />
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 20, padding: 26 }}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        </div>
      ) : (
        <div className="detail-grid">
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: "-.02em", color: "var(--ink)", margin: "0 0 6px" }}>
              Qual é o problema?
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, margin: "0 0 22px" }}>
              Escolha a avaria do {fullModelName(model)}. Preço fixo, sem surpresas.
            </p>
            <IssueGrid issues={model.issues} selectedIssueId={selectedIssueId} onSelect={handleSelect} />
          </div>
          <div className="detail-panel">
            <StickyPanel model={model} selectedIssue={selectedIssue} onContact={() => setContactOpen(true)} />
          </div>
        </div>
      )}

      {model && (
        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
          modelName={fullModelName(model)}
          issueName={selectedIssue?.name || ""}
        />
      )}

      <style>{`
        .detail-grid {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 980px) {
          .detail-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </RepairLayout>
  );
}
