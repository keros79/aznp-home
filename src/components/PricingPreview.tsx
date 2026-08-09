import Link from "next/link";

const plans = [
  {
    name: "Free Tier",
    price: "$0",
    period: "영구 무료",
    badge: "무키 / 서명 불필요",
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
    name: "Pro Agent",
    price: "$20",
    period: "USDC 충전 (12,000회)",
    badge: "⚡ 건당 $0.00166 (약 2.1원)",
    color: "var(--color-indigo-400)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.4)",
    featured: true,
    features: [
      "Tier 1 + 2 + 3 (JS Rendering) ✅",
      "Advanced Extraction (+15~30% 절감)",
      "요약 모드 & max_tokens 제한",
      "Structured JSON 출력 지원",
      "Solana Ed25519 서명 무키 인증",
      "POST /v1/topup 즉시 충전",
    ],
    cta: { label: "Solana 충전 안내 보기", href: "/pricing" },
  },
  {
    name: "Enterprise",
    price: "$100",
    period: "USDC 충전 (80,000회)",
    badge: "🚀 건당 $0.00125 (수수료 0.7%)",
    color: "var(--color-purple-400)",
    bg: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.25)",
    featured: false,
    features: [
      "Pro Agent 기능 전체 포함 ✅",
      "대규모 에이전트 서비스 전용",
      "건당 단가 극소화 ($0.00125)",
      "Solana Ed25519 서명 무키 인증",
      "우선 처리 큐 지원",
      "POST /v1/topup 즉시 충전",
    ],
    cta: { label: "API 레퍼런스 보기", href: "/docs/api" },
  },
];

export default function PricingPreview() {
  return (
    <section style={{ padding: "6rem 0" }}>
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "1rem" }}>Solana USDC 요금제</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            계정 없이 지갑 서명으로 사용하는 요금
          </h2>
          <p className="section-subtitle">
            회원가입, API Key, 비밀번호 관리가 없습니다.
            <br />
            Solana 지갑(USDC) 소액 충전으로 에이전트 크레딧을 즉시 사용하세요.
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
                  ✨ AI 에이전트 추천
                </div>
              )}

              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontWeight: 700, fontSize: "1.05rem", color: plan.color, marginBottom: "0.25rem" }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-slate-400)", marginBottom: "0.75rem" }}>
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
            Solana 수신 지갑 주소 및 POST /v1/topup 연동 가이드 보기 →
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
