import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "요금제 (Solana USDC Micro-payment)",
  description:
    "AZNP는 계정과 API Key 없이 솔라나 지갑(USDC) 충전 및 Ed25519 서명 인증으로 동작하는 무키(Stateless) 소액 결제를 제공합니다.",
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
      { label: "Tier 3 JS Rendering", yes: false, note: "USDC 충전 필요" },
      { label: "Advanced Extraction (+15~30%)", yes: false, note: "USDC 충전 필요" },
      { label: "요약 모드 (mode=summary)", yes: false, note: "USDC 충전 필요" },
      { label: "max_tokens 제한", yes: false, note: "USDC 충전 필요" },
      { label: "Structured JSON 출력", yes: false, note: "USDC 충전 필요" },
      { label: "Rate Limit", yes: true, note: "15 RPM / 1,000 RPD" },
      { label: "Cache API TTL", yes: true, note: "1시간" },
      { label: "회원가입 / 로그인 / Key", yes: true, note: "불필요 (Zero-Friction)" },
    ],
    cta: { label: "지금 시작하기", href: "/docs" },
  },
  {
    name: "Pro Agent",
    price: "$20",
    period: "USDC 충전 (12,000회)",
    target: "자율 실행 AI 에이전트 / 개발자",
    color: "var(--color-indigo-400)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.4)",
    featured: true,
    features: [
      { label: "Tier 1 Cloudflare Native", yes: true },
      { label: "Tier 2 Advanced Extraction", yes: true },
      { label: "Tier 3 JS Rendering (동적 웹)", yes: true },
      { label: "Advanced Extraction (+15~30%)", yes: true },
      { label: "요약 모드 & max_tokens", yes: true },
      { label: "Structured JSON 출력", yes: true },
      { label: "건당 단가", yes: true, note: "$0.00166 (약 2.1원)" },
      { label: "수수료 비중 (0.7 USDC 기준)", yes: true, note: "3.5%" },
      { label: "Solana Ed25519 서명 인증", yes: true, note: "무키 (Stateless)" },
      { label: "회원가입 / API Key 관리", yes: true, note: "불필요 (지갑 계정)" },
    ],
    cta: { label: "충전 API 가이드", href: "/docs/api" },
  },
  {
    name: "Enterprise",
    price: "$100",
    period: "USDC 충전 (80,000회)",
    target: "대규모 에이전트 서비스",
    color: "var(--color-purple-400)",
    bg: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.25)",
    featured: false,
    features: [
      { label: "Pro Agent 기능 전체 포함", yes: true },
      { label: "건당 단가 극소화", yes: true, note: "$0.00125 (약 1.6원)" },
      { label: "수수료 비중 (0.7 USDC 기준)", yes: true, note: "0.7% (최소화)" },
      { label: "아끼는 LLM 토큰 가치", yes: true, note: "약 $5,600 상당" },
      { label: "우선 처리 큐", yes: true },
      { label: "Solana Ed25519 서명 인증", yes: true, note: "무키 (Stateless)" },
    ],
    cta: { label: "API 레퍼런스 보기", href: "/docs/api" },
  },
];

const faqs = [
  {
    q: "Solana Wallet-based Stateless 결제가 무엇인가요?",
    a: "별도의 회원가입이나 API Key를 생성하지 않고, 솔라나 지갑 주소(PublicKey) 자체를 계정 ID로 사용합니다. $20 USDC 이상 송금 후 트랜잭션 해시를 제출해 크레딧을 충전하고, API 호출 시 Ed25519 서명을 헤더에 포함해 인증합니다.",
  },
  {
    q: "충전은 어떻게 진행하나요?",
    a: "Solana 수신 지갑 주소(GuUdPHj3dnafbFvF2gMscCVAMCd4NvSE5ktsrbdAvT4E)로 최소 $20 USDC를 입금하신 후, `POST /v1/topup` 엔드포인트로 본인의 지갑 주소와 트랜잭션 해시(tx_hash)를 제출하면 크레딧이 즉시 부여됩니다.",
  },
  {
    q: "서명 인증 헤더는 어떻게 작성하나요?",
    a: "요청 시 `x-wallet-address`(지갑 주소), `x-timestamp`(현재 시간 Unix초), `x-signature`(`x402:{timestamp}` 메세지의 Ed25519 서명) 3가지 헤더를 포함하면 됩니다.",
  },
  {
    q: "정말 API Key 보관이나 회원가입이 필요 없나요?",
    a: "네! 비밀키 보관이나 회원가입 관리가 전혀 없습니다. 에이전트 지갑 비밀키로 서명하여 즉시 무키(Stateless)로 호출할 수 있습니다.",
  },
];

export default function PricingPage() {
  return (
    <div style={{ padding: "5rem 0" }}>
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "1rem" }}>Solana USDC Micro-payment</span>
          <h1 className="section-title" style={{ marginBottom: "1rem" }}>
            에이전트를 위한 무키(Stateless) 소액 결제
          </h1>
          <p className="section-subtitle">
            회원가입, 로그인, API Key 관리가 전혀 필요 없습니다.
            <br />
            Solana 지갑(USDC) 소액 충전으로 크레딧을 부여받아 즉시 사용하세요.
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
            🏦 Solana 공식 수신 지갑 정보
          </h2>
          <div className="glass-card" style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginBottom: "0.25rem" }}>
                  Solana 서비스 수신 지갑 주소 (USDC)
                </div>
                <code className="code-block" style={{ display: "block", wordBreak: "break-all", margin: 0, padding: "0.75rem 1rem", color: "var(--color-cyan-400)" }}>
                  GuUdPHj3dnafbFvF2gMscCVAMCd4NvSE5ktsrbdAvT4E
                </code>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginBottom: "0.25rem" }}>
                    USDC Mint Address
                  </div>
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-indigo-400)", wordBreak: "break-all" }}>
                    EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
                  </code>
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginBottom: "0.25rem" }}>
                    최소 충전 요건
                  </div>
                  <div style={{ fontWeight: 700, color: "#f87171", fontSize: "0.9rem" }}>
                    $20 USDC 이상 ($20 미만 시 거부)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 충전 API 안내 */}
        <div style={{ maxWidth: "840px", margin: "0 auto 5rem" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.375rem", marginBottom: "1.25rem", color: "var(--color-slate-50)", textAlign: "center" }}>
            ⚡ 충전 API (`POST /v1/topup`)
          </h2>
          <div className="glass-card" style={{ padding: "1.75rem" }}>
            <div style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "var(--color-slate-300)" }}>
              송금 완료 후 본인의 Solana 지갑 주소와 트랜잭션 해시(`tx_hash`)를 제출하면 즉시 크레딧이 충전됩니다:
            </div>
            <div className="code-block" style={{ margin: 0 }}>
              <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}># 충전 요청 예시</div>
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
            자주 묻는 질문 (Solana FAQ)
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
