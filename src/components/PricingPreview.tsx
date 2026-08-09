import Link from "next/link";

const plans = [
  {
    name: "Free Tier",
    price: "$0",
    period: "영구 무료",
    badge: "계정 / Key 불필요",
    color: "var(--color-slate-400)",
    bg: "rgba(100,116,139,0.06)",
    border: "rgba(100,116,139,0.2)",
    featured: false,
    features: [
      "Tier 1 Cloudflare Native ✅",
      "Tier 2 경량 자체 변환 ✅",
      "15 RPM / 1,000 RPD 한도",
      "Cache API 1시간 TTL",
      "회원가입 / 로그인 없음",
    ],
    cta: { label: "지금 바로 시작", href: "/docs" },
  },
  {
    name: "Pay-per-request (x402)",
    price: "~$0.01",
    period: "/ 건당",
    badge: "⚡ AI 에이전트 전용 (USDC)",
    color: "var(--color-indigo-400)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.4)",
    featured: true,
    features: [
      "Tier 1 + 2 + 3 (JS Rendering) ✅",
      "Advanced Extraction (+15~30% 절감)",
      "요약 모드 (mode=summary)",
      "max_tokens 및 Structured JSON",
      "계정 / API Key 불필요 (x402 헤더)",
      "x402 프로토콜 지갑 자동 결제",
    ],
    cta: { label: "x402 연동가이드 보기", href: "/docs/api" },
  },
];

export default function PricingPreview() {
  return (
    <section style={{ padding: "6rem 0" }}>
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "1rem" }}>x402 요금제</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            계정 없이 즉시 사용하는 요금
          </h2>
          <p className="section-subtitle">
            회원가입과 API Key 관리가 없습니다.
            <br />
            무료로 시작하고, 에이전트 고급 기능은 x402(USDC)로 건당 결제하세요.
          </p>
        </div>

        {/* 요금 카드 (2개 미리보기) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            maxWidth: "820px",
            margin: "0 auto 2.5rem",
          }}
          className="pricing-preview-grid"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="glass-card"
              style={{
                padding: "2rem",
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
                    padding: "0.25rem 1rem",
                    borderRadius: "9999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✨ AI 에이전트 추천
                </div>
              )}

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontWeight: 700, fontSize: "1.05rem", color: plan.color, marginBottom: "0.25rem" }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-slate-400)", marginBottom: "0.75rem" }}>
                  {plan.badge}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                  <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--color-slate-50)", letterSpacing: "-0.04em" }}>
                    {plan.price}
                  </span>
                  <span style={{ color: "var(--color-slate-400)", fontSize: "0.9rem" }}>{plan.period}</span>
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ fontSize: "0.875rem", color: "var(--color-slate-300)", display: "flex", gap: "0.5rem" }}>
                    <span style={{ color: plan.color, flexShrink: 0 }}>›</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.cta.href}
                className={plan.featured ? "btn-primary" : "btn-outline"}
                style={{ width: "100%", justifyContent: "center" }}
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
            상세 x402 연동 방식 및 에이전트 프레임워크 예시 보기 →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .pricing-preview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
