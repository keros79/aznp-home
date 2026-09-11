"use client";

import Link from "next/link";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function PricingPreview() {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].pricing;

  const plans = [
    {
      name: t.freeTitle,
      price: t.freePrice,
      period: t.freePeriod,
      badge: t.freeBadge,
      color: "var(--color-slate-400)",
      bg: "rgba(100,116,139,0.06)",
      border: "rgba(100,116,139,0.2)",
      featured: false,
      features: [
        "Tier 1 Cloudflare Native ✅",
        "Tier 2 Self Conversion ✅",
        "Markdown / JSON / TOML / YAML / JSON-LD ✅",
        "max_tokens (token budget) ✅",
        "15 RPM / 1,000 RPD Limit",
        "Cache API 1h TTL",
        "No Signups / API Keys",
      ],
      cta: { label: t.ctaDocs, href: "/docs" },
    },
    {
      name: t.p1Title,
      price: t.p1Price,
      period: t.p1Period,
      badge: t.p1Badge,
      color: "var(--color-indigo-400)",
      bg: "rgba(99,102,241,0.08)",
      border: "rgba(99,102,241,0.4)",
      featured: true,
      features: [
        "Tier 1 + 2 + 3 (JS Rendering) ✅",
        "Advanced Extraction (+15~30% Savings)",
        "OpenAPI / Swagger 90% Compression ✅",
        "Solana Ed25519 Stateless Auth",
        "POST /v1/topup Instant Deposit",
      ],
      cta: { label: t.ctaTopup, href: "/pricing" },
    },
    {
      name: t.p2Title,
      price: t.p2Price,
      period: t.p2Period,
      badge: t.p2Badge,
      color: "var(--color-purple-400)",
      bg: "rgba(168,85,247,0.06)",
      border: "rgba(168,85,247,0.25)",
      featured: false,
      features: [
        "All Pro Agent Features (JS Rendering, OpenAPI/Swagger 90% Compression) ✅",
        "Scale Agent Workloads",
        "Lowest Per-Req Unit Cost ($0.00125)",
        "Priority Execution Queue",
        "POST /v1/topup Instant Deposit",
      ],
      cta: { label: t.ctaApi, href: "/docs/api" },
    },
  ];

  return (
    <section style={{ padding: "6rem 0" }}>
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "1rem" }}>{t.badge}</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            {t.title}
          </h2>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </div>

        {/* 요금 카드 (3개 미리보기) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
            maxWidth: "1080px",
            margin: "0 auto 2.5rem",
          }}
          className="pricing-preview-grid"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="glass-card"
              style={{
                padding: "1.75rem",
                border: `1px solid ${plan.border}`,
                background: plan.bg,
                position: "relative",
              }}
            >
              {plan.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: "-0.875rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, var(--color-indigo-500), var(--color-purple-600))",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.875rem",
                    borderRadius: "9999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✨ AI Agent Recommended
                </div>
              )}

              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontWeight: 700, fontSize: "1.05rem", color: plan.color, marginBottom: "0.25rem" }}>
                  {plan.name}
                </div>
                <div className="nowrap-scroll" style={{ fontSize: "0.75rem", color: "var(--color-slate-400)", marginBottom: "0.75rem" }}>
                  {plan.badge}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                  <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--color-slate-50)", letterSpacing: "-0.04em" }}>
                    {plan.price}
                  </span>
                  <span style={{ color: "var(--color-slate-400)", fontSize: "0.8rem" }}>{plan.period}</span>
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ fontSize: "0.825rem", color: "var(--color-slate-300)", display: "flex", gap: "0.5rem" }}>
                    <span style={{ color: plan.color, flexShrink: 0 }}>›</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.cta.href}
                className={plan.featured ? "btn-primary" : "btn-outline"}
                style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", padding: "0.625rem 1rem" }}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>

        {/* 전체 요금 보기 링크 */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/pricing"
            style={{
              color: "var(--color-indigo-400)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            {lang === "en" ? "View Solana receiver wallet & POST /v1/topup guide →" : "Solana 수신 지갑 주소 및 POST /v1/topup 연동 가이드 보기 →"}
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-preview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
