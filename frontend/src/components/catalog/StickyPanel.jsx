import { Affix } from "antd";
import {
  ArrowRightOutlined,
  PhoneOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  CarOutlined,
} from "@ant-design/icons";
import BrandLogo from "./BrandLogo";

function Panel({ model, selectedIssue, onContact }) {
  const has = !!selectedIssue;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 20,
        padding: 26,
        boxShadow: "0 24px 56px -34px rgba(11,58,102,.5)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 18, borderBottom: "1px solid #eef2f8" }}>
        <span
          style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: "#f7f9fd",
            border: "1px solid #eef2f8",
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <BrandLogo slug={model.brand.iconSlug} color={model.brand.iconColor} name={model.brand.name} size={28} monoSize={20} />
        </span>
        <div>
          <div style={{ color: "var(--faint)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>
            {model.brand.name}
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 18, color: "var(--ink)", lineHeight: 1.15 }}>
            {model.name}
          </div>
        </div>
      </div>

      {has ? (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18 }}>
            <span style={{ color: "var(--muted)", fontSize: 14, fontWeight: 600 }}>Reparação</span>
            <span style={{ color: "var(--ink)", fontSize: 14.5, fontWeight: 700 }}>{selectedIssue.name}</span>
          </div>
          {selectedIssue.eta && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
              <span style={{ color: "var(--muted)", fontSize: 14, fontWeight: 600 }}>Tempo estimado</span>
              <span style={{ color: "var(--ink)", fontSize: 14.5, fontWeight: 700 }}>{selectedIssue.eta}</span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px dashed var(--line-input)",
            }}
          >
            <span style={{ color: "var(--muted)", fontSize: 14, fontWeight: 600 }}>A partir de</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--primary)", fontWeight: 700, fontSize: 30, lineHeight: 1 }}>
              {selectedIssue.price == null ? "Sob consulta" : `${selectedIssue.price}€`}
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: 18,
            padding: 18,
            background: "#f7f9fd",
            border: "1px dashed var(--line-input)",
            borderRadius: 13,
            color: "var(--muted-2)",
            fontSize: 14,
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          Selecione a avaria à esquerda para ver o preço e o prazo.
        </div>
      )}

      <button onClick={onContact} className="panel-cta">
        {has ? "Pedir orçamento grátis" : "Pedir diagnóstico grátis"}
        <ArrowRightOutlined />
      </button>

      <a href="tel:+351210000000" className="panel-phone">
        <PhoneOutlined />
        Falar com um técnico
      </a>

      <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 20, paddingTop: 18, borderTop: "1px solid #eef2f8" }}>
        <Badge icon={<SafetyOutlined />} text="90 dias de garantia em peças e mão-de-obra" />
        <Badge icon={<CheckCircleOutlined />} text="Diagnóstico e orçamento grátis" />
        <Badge icon={<CarOutlined />} text="Recolha e entrega grátis na cidade" />
      </div>

      <style>{`
        .panel-cta {
          width: 100%;
          margin-top: 18px;
          height: 52px;
          background: var(--accent);
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          border: none;
          border-radius: 13px;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          box-shadow: 0 16px 34px -14px rgba(255,122,26,.85);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          transition: transform .18s, box-shadow .18s;
        }
        .panel-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -14px rgba(255,122,26,.95);
        }
        .panel-phone {
          width: 100%;
          margin-top: 10px;
          height: 48px;
          background: #fff;
          color: var(--primary);
          font-weight: 700;
          font-size: 15px;
          border: 1px solid var(--line-input);
          border-radius: 13px;
          font-family: 'Manrope', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          transition: border-color .2s, background .2s;
        }
        .panel-phone:hover { border-color: #cfe0f2; background: #f7f9fd; }
      `}</style>
    </div>
  );
}

function Badge({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--chip-text)", fontSize: 13.5, fontWeight: 600 }}>
      <span style={{ color: "var(--success)", fontSize: 17, flexShrink: 0 }}>{icon}</span>
      {text}
    </div>
  );
}

export default function StickyPanel({ model, selectedIssue, onContact }) {
  const content = <Panel model={model} selectedIssue={selectedIssue} onContact={onContact} />;
  return (
    <>
      <div className="sticky-panel-desktop">
        <Affix offsetTop={90}>{content}</Affix>
      </div>
      <div className="sticky-panel-mobile">{content}</div>
      <style>{`
        @media (min-width: 769px) { .sticky-panel-mobile { display: none; } }
        @media (max-width: 768px) { .sticky-panel-desktop { display: none; } }
      `}</style>
    </>
  );
}
