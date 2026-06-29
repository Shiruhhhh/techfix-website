import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

const display = { fontFamily: "'Space Grotesk', sans-serif" };

// Passos: { label, num, state: 'done' | 'current' | 'todo', to? }
function Stepper({ steps }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 30 }}>
      {steps.map((st, i) => {
        const isCur = st.state === "current";
        const done = st.state === "done";
        const accent = isCur ? "var(--accent)" : done ? "#fff" : "rgba(255,255,255,.42)";
        const numBg = isCur ? "var(--accent)" : done ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.07)";
        const numEl = (
          <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                fontSize: 13,
                background: numBg,
                color: isCur ? "#fff" : accent,
                border: done ? "1px solid rgba(255,255,255,.3)" : "1px solid transparent",
              }}
            >
              {st.num}
            </span>
            <span style={{ fontWeight: 700, fontSize: 14, color: accent, letterSpacing: "-.01em" }}>
              {st.label}
            </span>
          </span>
        );
        return (
          <div key={st.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {done && st.to ? (
              <Link to={st.to} style={{ textDecoration: "none" }}>
                {numEl}
              </Link>
            ) : (
              numEl
            )}
            {i < steps.length - 1 && (
              <RightOutlined style={{ color: "rgba(255,255,255,.28)", fontSize: 14 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function RepairLayout({ steps, eyebrow, title, sub, search, children }) {
  return (
    <div style={{ background: "var(--mist)", minHeight: "70vh" }}>
      <section
        style={{
          position: "relative",
          background:
            "radial-gradient(130% 130% at 82% 0%, var(--primary) 0%, var(--navy-deep) 48%, var(--navy-deepest) 100%)",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <div
          className="hero-orb"
          style={{
            position: "absolute",
            top: -120,
            right: -50,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,122,26,.26), transparent 62%)",
            filter: "blur(16px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "46px 24px 40px" }}>
          <Stepper steps={steps} />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              {eyebrow && (
                <div
                  style={{
                    color: "var(--accent-soft)",
                    fontWeight: 700,
                    fontSize: 12.5,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                  }}
                >
                  {eyebrow}
                </div>
              )}
              <h1
                style={{
                  ...display,
                  fontWeight: 700,
                  fontSize: "clamp(28px, 4vw, 46px)",
                  lineHeight: 1.06,
                  letterSpacing: "-.025em",
                  margin: "10px 0 0",
                }}
              >
                {title}
              </h1>
              {sub && (
                <p style={{ color: "#bccadd", fontSize: 16, lineHeight: 1.55, margin: "12px 0 0", maxWidth: 520 }}>
                  {sub}
                </p>
              )}
            </div>
            {search}
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(34px,4vw,52px) 24px clamp(48px,6vw,72px)" }}>
        {children}
      </main>
    </div>
  );
}
