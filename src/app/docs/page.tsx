import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문서",
  description: "AZNP 빠른 시작 가이드. 회원가입과 API Key 없이 즉시 사용 가능한 Zero-Friction 프록시.",
};

export default function DocsPage() {
  return (
    <article>
      {/* 헤더 */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="badge badge-indigo" style={{ marginBottom: "0.875rem" }}>문서</span>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.875rem", color: "var(--color-slate-50)" }}>
          AZNP 시작하기
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-slate-400)", lineHeight: 1.7 }}>
          AZNP는 AI 에이전트와 LLM이 웹페이지를 가져올 때 발생하는 불필요한 노이즈를
          제거하고 초경량 Markdown으로 변환하는 에지 프록시 서비스입니다.
          회원가입, 로그인, API Key 발급이 전혀 필요 없습니다.
        </p>
      </div>

      {/* 빠른 시작 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          ⚡ 빠른 시작 (Free Tier, 즉시 사용)
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-slate-400)", marginBottom: "1rem", lineHeight: 1.7 }}>
          회원가입 및 API Key 없이 즉시 호출할 수 있습니다.
        </p>
        <div className="code-block">
          <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}># 기본 변환</div>
          <div>
            <span style={{ color: "var(--color-cyan-400)" }}>curl</span>{" "}
            <span style={{ color: "var(--color-indigo-400)" }}>
              &quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://news.ycombinator.com&quot;
            </span>
          </div>
          <div style={{ marginTop: "1rem", color: "var(--color-slate-500)" }}># 이미지 텍스트 최소화</div>
          <div>
            <span style={{ color: "var(--color-cyan-400)" }}>curl</span>{" "}
            <span style={{ color: "var(--color-indigo-400)" }}>
              &quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&amp;images=0&quot;
            </span>
          </div>
        </div>
      </section>

      {/* x402 연동 예시 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          💳 x402 AI 에이전트 결제연동 (고급 기능)
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-slate-400)", marginBottom: "1rem", lineHeight: 1.7 }}>
          JS 렌더링, 요약 모드(`mode=summary`), max_tokens 제한 등 고급 기능은 HTTP 402 반환 시 에이전트 지갑이 USDC로 건당 소액결제합니다.
        </p>
        <div className="code-block">
          <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}># TypeScript / Node.js 에이전트 연동 (x402fetch)</div>
          <div>
            <span style={{ color: "var(--color-purple-400)" }}>import</span> {"{ x402fetch }"} <span style={{ color: "var(--color-purple-400)" }}>from</span> <span style={{ color: "var(--color-indigo-400)" }}>&quot;@x402/fetch&quot;</span>;{"\n\n"}
            <span style={{ color: "var(--color-purple-400)" }}>const</span> res = <span style={{ color: "var(--color-purple-400)" }}>await</span> <span style={{ color: "var(--color-cyan-400)" }}>x402fetch</span>(
            <br />
            {"  "}<span style={{ color: "var(--color-indigo-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&amp;mode=summary&quot;</span>,
            <br />
            {"  "}{"{"} wallet: agentWallet, maxAmount: <span style={{ color: "var(--color-indigo-400)" }}>&quot;0.05&quot;</span> {"}"}
            <br />
            );
          </div>
        </div>
      </section>

      {/* 핵심 개념 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-slate-50)" }}>
          📚 핵심 개념
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {[
            {
              title: "3-Tier Cascading",
              desc: "Cloudflare Native → 자체 변환 → Browser Rendering (JS 렌더링) 순으로 시도. 가장 빠른 방법부터 선택합니다.",
            },
            {
              title: "다층 캐시 (Cache API + KV)",
              desc: "L1 Cache API(초고속 엣지) → L2 KV(장기 보관) 순으로 캐시를 조회하여 반복 요청의 CPU 사용량을 70~90% 절약합니다.",
            },
            {
              title: "x402 Protocol (Zero-Friction)",
              desc: "계정과 API Key 관리 없이 에이전트 지갑이 온체인(USDC)으로 직접 402 결제를 수행하는 AI 표준 과금 모델입니다.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="glass-card" style={{ padding: "1.25rem", display: "flex", gap: "1rem" }}>
              <div style={{ width: "3px", background: "var(--color-indigo-500)", borderRadius: "2px", flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.375rem", color: "var(--color-slate-100)" }}>{title}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--color-slate-400)", lineHeight: 1.7 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 다음 단계 */}
      <section>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-slate-50)" }}>
          다음 단계
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/docs/api" className="btn-primary">
            API 레퍼런스 및 x402 명세 →
          </Link>
          <Link href="/pricing" className="btn-outline">
            x402 요금 안내 보기
          </Link>
        </div>
      </section>
    </article>
  );
}
