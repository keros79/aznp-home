"use client";

import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function Features() {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].features;

  const featuresList = [
    {
      icon: "🪙",
      color: "var(--color-cyan-400)",
      bg: "rgba(34,211,238,0.08)",
      border: "rgba(34,211,238,0.2)",
      title: t.f1Title,
      desc: t.f1Desc,
      stats: t.f1Stats,
    },
    {
      icon: "⚡",
      color: "var(--color-indigo-400)",
      bg: "rgba(99,102,241,0.08)",
      border: "rgba(99,102,241,0.2)",
      title: t.f2Title,
      desc: t.f2Desc,
      stats: t.f2Stats,
    },
    {
      icon: "🌐",
      color: "var(--color-purple-400)",
      bg: "rgba(168,85,247,0.08)",
      border: "rgba(168,85,247,0.2)",
      title: t.f3Title,
      desc: t.f3Desc,
      stats: t.f3Stats,
    },
    {
      icon: "🔑",
      color: "var(--color-cyan-400)",
      bg: "rgba(34,211,238,0.06)",
      border: "rgba(34,211,238,0.18)",
      title: t.f4Title,
      desc: t.f4Desc,
      stats: t.f4Stats,
    },
    {
      icon: "📊",
      color: "var(--color-indigo-400)",
      bg: "rgba(99,102,241,0.06)",
      border: "rgba(99,102,241,0.18)",
      title: t.f5Title,
      desc: t.f5Desc,
      stats: t.f5Stats,
    },
    {
      icon: "⚙️",
      color: "var(--color-purple-400)",
      bg: "rgba(168,85,247,0.06)",
      border: "rgba(168,85,247,0.18)",
      title: t.f6Title,
      desc: t.f6Desc,
      stats: t.f6Stats,
    },
  ];

  return (
    <section
      style={{
        padding: "6rem 0",
        background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.03), transparent)",
      }}
    >
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="badge badge-purple" style={{ marginBottom: "1rem" }}>{t.badge}</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            {t.titleLine1}
            <br />
            <span className="text-gradient">{t.titleLine2}</span>
          </h2>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </div>

        {/* 기능 카드 그리드 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}
          className="features-grid"
        >
          {featuresList.map((f) => (
            <div
              key={f.title}
              className="glass-card"
              style={{ padding: "1.75rem" }}
            >
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "0.75rem",
                  background: f.bg,
                  border: `1px solid ${f.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  marginBottom: "1.125rem",
                }}
              >
                {f.icon}
              </div>

              <h3 style={{ fontWeight: 700, fontSize: "1.0625rem", marginBottom: "0.625rem", color: "var(--color-slate-50)" }}>
                {f.title}
              </h3>

              <p style={{ fontSize: "0.875rem", color: "var(--color-slate-400)", lineHeight: 1.7, marginBottom: "1rem" }}>
                {f.desc}
              </p>

              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: f.color }}>
                {f.stats}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
