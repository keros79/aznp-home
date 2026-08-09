"use client";

import Link from "next/link";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function PricingPage() {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].pricing;

  const plans = [
    {
      name: t.freeTitle,
      price: t.freePrice,
      period: t.freePeriod,
      target: t.freeTarget,
      color: "var(--color-slate-400)",
      bg: "rgba(100,116,139,0.06)",
      border: "rgba(100,116,139,0.2)",
      featured: false,
      features: [
        { label: "Tier 1 Cloudflare Native", yes: true },
        { label: "Tier 2 Self Conversion", yes: true },
        { label: "Tier 3 JS Rendering", yes: false, note: lang === "en" ? "USDC required" : "USDC 충전 필요" },
        { label: "Advanced Extraction (+15~30%)", yes: false, note: lang === "en" ? "USDC required" : "USDC 충전 필요" },
        { label: "Summary mode (mode=summary)", yes: false, note: lang === "en" ? "USDC required" : "USDC 충전 필요" },
        { label: "max_tokens limits", yes: false, note: lang === "en" ? "USDC required" : "USDC 충전 필요" },
        { label: "Structured JSON Output", yes: false, note: lang === "en" ? "USDC required" : "USDC 충전 필요" },
        { label: "Rate Limit", yes: true, note: "15 RPM / 1,000 RPD" },
        { label: "Cache API TTL", yes: true, note: "1 Hour" },
        { label: lang === "en" ? "Signups / Logins / Keys" : "회원가입 / 로그인 / Key", yes: true, note: lang === "en" ? "Zero-Friction" : "불필요 (Zero-Friction)" },
      ],
      cta: { label: t.ctaDocs, href: "/docs" },
    },
    {
      name: t.p1Title,
      price: t.p1Price,
      period: t.p1Period,
      target: t.p1Target,
      color: "var(--color-indigo-400)",
      bg: "rgba(99,102,241,0.08)",
      border: "rgba(99,102,241,0.4)",
      featured: true,
      features: [
        { label: "Tier 1 Cloudflare Native", yes: true },
        { label: "Tier 2 Advanced Extraction", yes: true },
        { label: "Tier 3 JS Rendering (Dynamic Web)", yes: true },
        { label: "Advanced Extraction (+15~30%)", yes: true },
        { label: "Summary mode & max_tokens", yes: true },
        { label: "Structured JSON Output", yes: true },
        { label: lang === "en" ? "Per-Request Cost" : "건당 단가", yes: true, note: "$0.00166 (~2.1 KRW)" },
        { label: lang === "en" ? "Gas Fee Ratio (0.7 USDC basis)" : "수수료 비중 (0.7 USDC 기준)", yes: true, note: "3.5%" },
        { label: "Solana Ed25519 Auth", yes: true, note: "Stateless" },
        { label: lang === "en" ? "Signups / API Key Management" : "회원가입 / API Key 관리", yes: true, note: lang === "en" ? "Zero-Friction" : "불필요 (지갑 계정)" },
      ],
      cta: { label: t.ctaTopup, href: "/docs/api" },
    },
    {
      name: t.p2Title,
      price: t.p2Price,
      period: t.p2Period,
      target: t.p2Target,
      color: "var(--color-purple-400)",
      bg: "rgba(168,85,247,0.06)",
      border: "rgba(168,85,247,0.25)",
      featured: false,
      features: [
        { label: "All Pro Agent Features Included", yes: true },
        { label: lang === "en" ? "Lowest Per-Req Cost" : "건당 단가 극소화", yes: true, note: "$0.00125 (~1.6 KRW)" },
        { label: lang === "en" ? "Gas Fee Ratio (0.7 USDC basis)" : "수수료 비중 (0.7 USDC 기준)", yes: true, note: "0.7% (Minimal)" },
        { label: lang === "en" ? "Saved LLM Token Value" : "아끼는 LLM 토큰 가치", yes: true, note: "~$5,600 Value" },
        { label: lang === "en" ? "Priority Processing Queue" : "우선 처리 큐", yes: true },
        { label: "Solana Ed25519 Auth", yes: true, note: "Stateless" },
      ],
      cta: { label: t.ctaApi, href: "/docs/api" },
    },
  ];

  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
  ];

  return (
    <div style={{ padding: "5rem 0" }}>
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "1rem" }}>{t.badge}</span>
          <h1 className="section-title" style={{ marginBottom: "1rem" }}>
            {t.title}
          </h1>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </div>

        {/* 요금 카드 (3개 배치) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
            maxWidth: "1080px",
            margin: "0 auto 4rem",
          }}
          className="plans-grid"
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
                    fontSize: "0.7rem",
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
                <div style={{ fontWeight: 700, fontSize: "1rem", color: plan.color }}>{plan.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginBottom: "0.75rem" }}>{plan.target}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                  <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--color-slate-50)", letterSpacing: "-0.04em" }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={{ color: "var(--color-slate-400)", fontSize: "0.85rem" }}>{plan.period}</span>
                  )}
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {plan.features.map((f) => (
                  <li key={f.label} style={{ fontSize: "0.825rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <span style={{ color: f.yes ? "#4ade80" : "var(--color-slate-600)", flexShrink: 0, marginTop: "1px" }}>
                      {f.yes ? "✓" : "✕"}
                    </span>
                    <span style={{ color: f.yes ? "var(--color-slate-300)" : "var(--color-slate-500)" }}>
                      {f.label}
                      {f.note && (
                        <span style={{ color: f.yes ? "var(--color-indigo-400)" : "var(--color-slate-500)", marginLeft: "0.375rem", fontSize: "0.75rem" }}>
                          ({f.note})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.cta.href}
                className={plan.featured ? "btn-primary" : "btn-outline"}
                style={{ width: "100%", justifyContent: "center", fontSize: "0.875rem", padding: "0.625rem 1rem" }}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Solana 지갑 정보 카드 */}
        <div style={{ maxWidth: "840px", margin: "0 auto 4rem" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.375rem", marginBottom: "1.25rem", color: "var(--color-slate-50)", textAlign: "center" }}>
            {t.walletTitle}
          </h2>
          <div className="glass-card" style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginBottom: "0.25rem" }}>
                  {t.walletAddrLabel}
                </div>
                <code className="code-block" style={{ display: "block", wordBreak: "break-all", margin: 0, padding: "0.75rem 1rem", color: "var(--color-cyan-400)" }}>
                  GuUdPHj3dnafbFvF2gMscCVAMCd4NvSE5ktsrbdAvT4E
                </code>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginBottom: "0.25rem" }}>
                    {t.usdcMintLabel}
                  </div>
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-indigo-400)", wordBreak: "break-all" }}>
                    EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
                  </code>
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginBottom: "0.25rem" }}>
                    {t.minDepositLabel}
                  </div>
                  <div style={{ fontWeight: 700, color: "#f87171", fontSize: "0.9rem" }}>
                    {t.minDepositVal}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 충전 API 안내 */}
        <div style={{ maxWidth: "840px", margin: "0 auto 5rem" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.375rem", marginBottom: "1.25rem", color: "var(--color-slate-50)", textAlign: "center" }}>
            {t.topupTitle}
          </h2>
          <div className="glass-card" style={{ padding: "1.75rem" }}>
            <div style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "var(--color-slate-300)" }}>
              {t.topupDesc}
            </div>
            <div className="code-block" style={{ margin: 0 }}>
              <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}># Request</div>
              <div>
                <span style={{ color: "var(--color-cyan-400)" }}>curl</span> -X POST <span style={{ color: "var(--color-indigo-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/v1/topup&quot;</span>{" \\\n  "}
                -H <span style={{ color: "var(--color-purple-400)" }}>&quot;Content-Type: application/json&quot;</span>{" \\\n  "}
                -d <span style={{ color: "var(--color-indigo-400)" }}>&apos;{"{"}&quot;wallet&quot;: &quot;7xKX...SolanaPublicKey&quot;, &quot;tx_hash&quot;: &quot;5K...SolanaTxHash&quot;{"}"}&apos;</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.5rem", textAlign: "center", marginBottom: "2.5rem", color: "var(--color-slate-50)" }}>
            {t.faqTitle}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map(({ q, a }) => (
              <div key={q} className="glass-card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.625rem", color: "var(--color-slate-50)" }}>
                  {q}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-slate-400)", lineHeight: 1.7, margin: 0 }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
