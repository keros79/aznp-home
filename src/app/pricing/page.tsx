import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "요금제",
  description:
    "AZNP Free, Pro, Team, Business 플랜을 비교하세요. 무료로 시작하고 필요할 때 업그레이드하세요.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "영구 무료",
    target: "개인 / 테스트",
    color: "var(--color-slate-400)",
    bg: "rgba(100,116,139,0.06)",
    border: "rgba(100,116,139,0.2)",
    featured: false,
    features: [
      { label: "Tier 1 Cloudflare Native", yes: true },
      { label: "Tier 2 경량 자체 변환", yes: true },
      { label: "Tier 3 JS Rendering", yes: false },
      { label: "Advanced Extraction", yes: false },
      { label: "요약 모드 (mode=summary)", yes: false },
      { label: "max_tokens 제한", yes: false },
      { label: "Structured JSON 출력", yes: false },
      { label: "Rate Limit", yes: true, note: "15 RPM / 1,000 RPD" },
      { label: "Cache TTL", yes: true, note: "1시간" },
      { label: "KV 결과 캐시", yes: true, note: "기본" },
      { label: "Token Analytics (D1)", yes: false },
      { label: "Custom Domain Rules", yes: false },
      { label: "Priority Queue", yes: false },
      { label: "지원", yes: true, note: "커뮤니티" },
    ],
    cta: { label: "무료로 시작", href: "/docs" },
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ 월",
    target: "솔로 개발자",
    color: "var(--color-indigo-400)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.4)",
    featured: true,
    features: [
      { label: "Tier 1 Cloudflare Native", yes: true },
      { label: "Tier 2 Advanced Extraction", yes: true },
      { label: "Tier 3 JS Rendering", yes: true },
      { label: "Advanced Extraction (+15~30%)", yes: true },
      { label: "요약 모드 (mode=summary)", yes: true },
      { label: "max_tokens 제한", yes: true },
      { label: "Structured JSON 출력", yes: true },
      { label: "Rate Limit", yes: true, note: "120 RPM / 20,000 RPD" },
      { label: "Cache TTL", yes: true, note: "6시간 + SWR" },
      { label: "KV 결과 캐시", yes: true, note: "더 긴 TTL + 우선" },
      { label: "Token Analytics (D1)", yes: true },
      { label: "Custom Domain Rules", yes: true },
      { label: "Priority Queue", yes: true },
      { label: "지원", yes: true, note: "이메일 우선" },
    ],
    cta: { label: "Pro 시작하기", href: "/docs" },
  },
  {
    name: "Team",
    price: "$49",
    period: "/ 월",
    target: "소규모 팀 (좌석 5개)",
    color: "var(--color-purple-400)",
    bg: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.25)",
    featured: false,
    features: [
      { label: "Pro 기능 전체", yes: true },
      { label: "팀 좌석 5개", yes: true },
      { label: "공유 API Key 관리", yes: true },
      { label: "팀 사용량 대시보드", yes: true },
      { label: "Rate Limit", yes: true, note: "팀 공유 풀" },
      { label: "지원", yes: true, note: "우선 이메일 + 슬랙" },
    ],
    cta: { label: "팀 플랜 문의", href: "mailto:hello@aznp.example.com" },
  },
  {
    name: "Business",
    price: "협의",
    period: "",
    target: "대규모 / SLA",
    color: "var(--color-cyan-400)",
    bg: "rgba(34,211,238,0.05)",
    border: "rgba(34,211,238,0.2)",
    featured: false,
    features: [
      { label: "Team 기능 전체", yes: true },
      { label: "무제한 좌석", yes: true },
      { label: "SLA 보장", yes: true },
      { label: "전용 지원 담당자", yes: true },
      { label: "커스텀 Rate Limit", yes: true },
      { label: "온프레미스 배포 협의", yes: true },
    ],
    cta: { label: "영업팀 문의", href: "mailto:hello@aznp.example.com" },
  },
];

const faqs = [
  {
    q: "Rate Limit이 초과되면 어떻게 되나요?",
    a: "429 응답과 함께 JSON 에러가 반환됩니다. Free는 15 RPM, Pro는 120 RPM입니다. 캐시 히트 요청은 Rate Limit을 소비하지 않습니다.",
  },
  {
    q: "무료 플랜에서 Pro로 언제든 전환 가능한가요?",
    a: "네, Stripe를 통해 언제든 업그레이드하거나 다운그레이드할 수 있습니다. 결제는 일할 계산됩니다.",
  },
  {
    q: "API Key는 어떻게 발급받나요?",
    a: "Pro 결제 완료 후 aznp_pro_xxxxx 형식의 API Key가 이메일로 발송됩니다. X-API-Key 헤더에 포함해서 요청하세요.",
  },
  {
    q: "Cloudflare Markdown for Agents를 지원하지 않는 사이트도 처리되나요?",
    a: "네. Tier 1이 실패하면 자동으로 Tier 2(자체 변환)로 폴백합니다. JS가 필요한 동적 페이지는 Pro의 Tier 3(Browser Rendering)으로 처리됩니다.",
  },
];

export default function PricingPage() {
  return (
    <div style={{ padding: "5rem 0" }}>
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "1rem" }}>요금제</span>
          <h1 className="section-title" style={{ marginBottom: "1rem" }}>
            간단하고 투명한 요금
          </h1>
          <p className="section-subtitle">
            무료로 시작하고, 필요할 때 업그레이드하세요.
            <br />숨겨진 비용 없이 투명하게 운영됩니다.
          </p>
        </div>

        {/* 요금 카드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            marginBottom: "5rem",
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
                  ✨ 가장 인기
                </div>
              )}

              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: plan.color }}>{plan.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginBottom: "0.75rem" }}>{plan.target}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-slate-50)", letterSpacing: "-0.04em" }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={{ color: "var(--color-slate-400)", fontSize: "0.875rem" }}>{plan.period}</span>
                  )}
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {plan.features.map((f) => (
                  <li key={f.label} style={{ fontSize: "0.825rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <span style={{ color: f.yes ? "#4ade80" : "var(--color-slate-600)", flexShrink: 0, marginTop: "1px" }}>
                      {f.yes ? "✓" : "✗"}
                    </span>
                    <span style={{ color: f.yes ? "var(--color-slate-300)" : "var(--color-slate-600)" }}>
                      {f.label}
                      {f.note && (
                        <span style={{ color: "var(--color-slate-500)", marginLeft: "0.375rem", fontSize: "0.75rem" }}>
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

        {/* FAQ */}
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.5rem", textAlign: "center", marginBottom: "2.5rem", color: "var(--color-slate-50)" }}>
            자주 묻는 질문
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
        @media (max-width: 1100px) {
          .plans-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
