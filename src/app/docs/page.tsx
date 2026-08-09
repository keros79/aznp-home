import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문서",
  description: "AZNP 빠른 시작 가이드. Solana 지갑 서명 기반 무키(Stateless) 프록시 서비스.",
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
          회원가입과 API Key 보관 없이 Solana 지갑 주소 기반 서명 인증으로 즉시 동작합니다.
        </p>
      </div>

      {/* 빠른 시작 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          ⚡ 빠른 시작 (Free Tier, 즉시 사용)
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-slate-400)", marginBottom: "1rem", lineHeight: 1.7 }}>
          서명이나 충전 없이 기본 변환(15 RPM)을 즉시 사용할 수 있습니다.
        </p>
        <div className="code-block">
          <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}># 기본 변환</div>
          <div>
            <span style={{ color: "var(--color-cyan-400)" }}>curl</span>{" "}
            <span style={{ color: "var(--color-indigo-400)" }}>
              &quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://news.ycombinator.com&quot;
            </span>
          </div>
        </div>
      </section>

      {/* Solana 충전 및 서명 인증 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          💳 Solana 지갑 충전 및 서명 인증 (Pro / Enterprise)
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-slate-400)", marginBottom: "1rem", lineHeight: 1.7 }}>
          JS 렌더링, 요약 모드, max_tokens 제한 해제는 $20 USDC 이상 충전 후 Ed25519 서명 헤더를 통해 실행됩니다.
        </p>
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <ol style={{ paddingLeft: "1.25rem", margin: 0, color: "var(--color-slate-300)", fontSize: "0.9rem", lineHeight: 1.8 }}>
            <li><strong>Solana USDC 입금</strong>: 수신 지갑(<code style={{ color: "var(--color-cyan-400)" }}>GuUdPHj3dnafbFvF2gMscCVAMCd4NvSE5ktsrbdAvT4E</code>)으로 $20 USDC 이상 송금</li>
            <li><strong>크레딧 충전 API 제출</strong>: <code style={{ color: "var(--color-indigo-400)" }}>POST /v1/topup</code> (`wallet`, `tx_hash`제출) → 12,000회 크레딧 즉시 부여</li>
            <li><strong>Ed25519 서명 호출</strong>: 요청 시 <code style={{ color: "var(--color-indigo-400)" }}>x-wallet-address</code>, <code style={{ color: "var(--color-indigo-400)" }}>x-signature</code>, <code style={{ color: "var(--color-indigo-400)" }}>x-timestamp</code> 제출</li>
          </ol>
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
              title: "Solana Wallet Auth (Stateless)",
              desc: "회원가입과 API Key 보관 없이 Solana 지갑 서명으로 동작하는 무키 소액 충전 시스템입니다.",
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
            API 레퍼런스 및 Solana 서명 명세 →
          </Link>
          <Link href="/pricing" className="btn-outline">
            Solana 충전 요금 안내
          </Link>
        </div>
      </section>
    </article>
  );
}
