import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문서",
  description: "AZNP 빠른 시작 가이드. 무료로 시작하고 API Key 없이 즉시 사용하세요.",
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
        </p>
      </div>

      {/* 빠른 시작 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          ⚡ 빠른 시작 (Free, 즉시 가능)
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-slate-400)", marginBottom: "1rem", lineHeight: 1.7 }}>
          API Key 없이 즉시 사용할 수 있습니다.
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

      {/* Pro 예시 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          🔑 Pro 기능 사용
        </h2>
        <div className="code-block">
          <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}># 요약 모드</div>
          <div>
            <span style={{ color: "var(--color-cyan-400)" }}>curl</span>{" "}
            <span style={{ color: "var(--color-slate-400)" }}>-H</span>{" "}
            <span style={{ color: "var(--color-purple-400)" }}>&quot;X-API-Key: aznp_pro_xxxxx&quot;</span>{" \\\n  "}
            <span style={{ color: "var(--color-indigo-400)" }}>
              &quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&amp;mode=summary&quot;
            </span>
          </div>
          <div style={{ marginTop: "1rem", color: "var(--color-slate-500)" }}># max_tokens 제한</div>
          <div>
            <span style={{ color: "var(--color-cyan-400)" }}>curl</span>{" "}
            <span style={{ color: "var(--color-slate-400)" }}>-H</span>{" "}
            <span style={{ color: "var(--color-purple-400)" }}>&quot;X-API-Key: aznp_pro_xxxxx&quot;</span>{" \\\n  "}
            <span style={{ color: "var(--color-indigo-400)" }}>
              &quot;...?url=https://example.com&amp;max_tokens=2000&quot;
            </span>
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
              desc: "Cloudflare Native → 자체 변환 → Browser Rendering 순으로 시도. 빠르고 저렴한 방법부터.",
            },
            {
              title: "다층 캐시 (Cache API + KV)",
              desc: "L1 Cache API(초고속) → L2 KV(장기) 순으로 캐시 조회. 캐시 히트 시 CPU ≈ 0.",
            },
            {
              title: "Free vs Pro",
              desc: "Free는 $0으로 기본 변환 제공. Pro($19/월)는 JS 렌더링, 요약, 토큰 분석 등 고급 기능 추가.",
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
            API 레퍼런스 →
          </Link>
          <Link href="/pricing" className="btn-outline">
            Pro 플랜 보기
          </Link>
        </div>
      </section>
    </article>
  );
}
