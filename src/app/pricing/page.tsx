import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "요금제 (x402 Micropayments)",
  description:
    "AZNP는 계정과 API Key 없이 에이전트 지갑(USDC)으로 건당 결제하는 x402 프로토콜을 지원합니다.",
};

const plans = [
  {
    name: "Free Tier",
    price: "$0",
    period: "영구 무료",
    target: "개발 / 테스트 / 기본 에이전트",
    color: "var(--color-slate-400)",
    bg: "rgba(100,116,139,0.06)",
    border: "rgba(100,116,139,0.2)",
    featured: false,
    features: [
      { label: "Tier 1 Cloudflare Native", yes: true },
      { label: "Tier 2 경량 자체 변환", yes: true },
      { label: "Tier 3 JS Rendering", yes: false, note: "x402 필요" },
      { label: "Advanced Extraction (+15~30%)", yes: false, note: "x402 필요" },
      { label: "요약 모드 (mode=summary)", yes: false, note: "x402 필요" },
      { label: "max_tokens 제한", yes: false, note: "x402 필요" },
      { label: "Structured JSON 출력", yes: false, note: "x402 필요" },
      { label: "Rate Limit", yes: true, note: "15 RPM / 1,000 RPD" },
      { label: "Cache API TTL", yes: true, note: "1시간" },
      { label: "회원가입 / 로그인", yes: true, note: "불필요 (Zero-Friction)" },
    ],
    cta: { label: "지금 시작하기", href: "/docs" },
  },
  {
    name: "Pay-per-request (x402)",
    price: "~$0.01",
    period: "/ 건당 (USDC)",
    target: "자율 실행 AI 에이전트",
    color: "var(--color-indigo-400)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.4)",
    featured: true,
    features: [
      { label: "Tier 1 Cloudflare Native", yes: true },
      { label: "Tier 2 Advanced Extraction", yes: true },
      { label: "Tier 3 JS Rendering (동적 웹)", yes: true },
      { label: "Advanced Extraction (+15~30%)", yes: true },
      { label: "요약 모드 (mode=summary)", yes: true },
      { label: "max_tokens 및 Structured JSON", yes: true },
      { label: "Rate Limit", yes: true, note: "높은 동시 요청 풀" },
      { label: "Cache API TTL", yes: true, note: "6시간 + SWR" },
      { label: "x402 프로토콜 결제", yes: true, note: "402 Payment Required" },
      { label: "회원가입 / API Key 관리", yes: true, note: "전혀 불필요 (온체인)" },
    ],
    cta: { label: "x402 연동 가이드", href: "/docs/api" },
  },
];

const faqs = [
  {
    q: "x402 프로토콜이 무엇인가요?",
    a: "x402는 AI 에이전트가 회원가입이나 API Key 발급 없이 HTTP 402 Payment Required 응답을 받아 온체인 암호화폐(USDC)로 건당 소액 결제하고 결과를 반환받는 에이전트 전용 오픈 결제 표준입니다.",
  },
  {
    q: "정말 회원가입이나 API Key가 필요 없나요?",
    a: "네! AZNP는 Zero-Noise뿐만 아니라 Zero-Friction을 지향합니다. 에이전트 지갑만 있으면 계정 생성이나 Key 유출 걱정 없이 온체인 지불로 즉시 모든 고급 기능을 사용할 수 있습니다.",
  },
  {
    q: "어떤 네트워크와 통화를 지원하나요?",
    a: "Base, Arbitrum, Solana 등 주요 Layer2 네트워크의 USDC 소액 결제를 지원합니다.",
  },
  {
    q: "Rate Limit이 초과되면 어떻게 되나요?",
    a: "Free 한도(15 RPM)를 초과하거나 JS 렌더링/요약 등 고급 옵션을 요청할 때 HTTP 402 응답이 리턴됩니다. 에이전트 헤더로 x402 결제를 보내면 즉시 처리됩니다.",
  },
];

export default function PricingPage() {
  return (
    <div style={{ padding: "5rem 0" }}>
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "1rem" }}>x402 Agentic Payment</span>
          <h1 className="section-title" style={{ marginBottom: "1rem" }}>
            에이전트를 위한 건당 소액 결제
          </h1>
          <p className="section-subtitle">
            회원가입, 로그인, API Key 관리가 전혀 필요 없습니다.
            <br />
            무료로 시작하고, 에이전트는 x402(USDC)로 건당 필요한 만큼만 지불하세요.
          </p>
        </div>

        {/* 요금 카드 (2개 중심) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            maxWidth: "840px",
            margin: "0 auto 4rem",
          }}
          className="plans-grid"
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
                    fontSize: "0.7rem",
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
                <div style={{ fontWeight: 700, fontSize: "1rem", color: plan.color }}>{plan.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginBottom: "0.75rem" }}>{plan.target}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                  <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--color-slate-50)", letterSpacing: "-0.04em" }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={{ color: "var(--color-slate-400)", fontSize: "0.875rem" }}>{plan.period}</span>
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

        {/* 에이전트 연동 예시 세션 */}
        <div style={{ maxWidth: "840px", margin: "0 auto 5rem" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.375rem", marginBottom: "1.25rem", color: "var(--color-slate-50)", textAlign: "center" }}>
            🤖 AI 에이전트 연동 예시 (x402)
          </h2>
          <div className="glass-card" style={{ padding: "1.75rem" }}>
            <div style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "var(--color-slate-300)" }}>
              에이전트는 API Key 없이 `x402fetch` SDK나 표준 HTTP 402 헤더 핸들러로 자동 결제 및 요청을 수행합니다:
            </div>
            <div className="code-block" style={{ margin: 0 }}>
              <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}>// TypeScript / Node.js Agent</div>
              <div>
                <span style={{ color: "var(--color-purple-400)" }}>import</span>{" "}
                {"{ x402fetch }"} <span style={{ color: "var(--color-purple-400)" }}>from</span>{" "}
                <span style={{ color: "var(--color-indigo-400)" }}>&quot;@x402/fetch&quot;</span>;{"\n\n"}
                <span style={{ color: "var(--color-purple-400)" }}>const</span> res = <span style={{ color: "var(--color-purple-400)" }}>await</span>{" "}
                <span style={{ color: "var(--color-cyan-400)" }}>x402fetch</span>(
                <br />
                {"  "}<span style={{ color: "var(--color-indigo-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&amp;mode=summary&quot;</span>,
                <br />
                {"  "}{"{"} wallet: agentWallet, maxAmount: <span style={{ color: "var(--color-indigo-400)" }}>&quot;0.05&quot;</span> {"}"}
                <br />
                );{"\n\n"}
                <span style={{ color: "var(--color-purple-400)" }}>const</span> markdown = <span style={{ color: "var(--color-purple-400)" }}>await</span> res.<span style={{ color: "var(--color-cyan-400)" }}>text</span>();
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.5rem", textAlign: "center", marginBottom: "2.5rem", color: "var(--color-slate-50)" }}>
            자주 묻는 질문 (x402 FAQ)
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
        @media (max-width: 768px) {
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
