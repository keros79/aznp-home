import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API 레퍼런스",
  description:
    "AZNP API 레퍼런스. 쿼리 파라미터, 응답 헤더, 에러 코드, curl 및 JavaScript 예시를 확인하세요.",
};

const queryParams = [
  { name: "url", required: true, plan: "Free/Pro", desc: "대상 웹페이지 URL (필수)" },
  { name: "mode", required: false, plan: "auto: Free/Pro, summary: Pro", desc: "auto (기본) / summary" },
  { name: "max_tokens", required: false, plan: "Pro", desc: "반환 Markdown 최대 토큰 수" },
  { name: "render", required: false, plan: "Pro", desc: "true → JS 렌더링 강제" },
  { name: "format", required: false, plan: "markdown: 모두, json: Pro", desc: "markdown (기본) / json" },
  { name: "fresh", required: false, plan: "Free/Pro", desc: "1 → 캐시 무시하고 강제 갱신" },
  { name: "images", required: false, plan: "Free/Pro", desc: "0 → 이미지 관련 텍스트 최소화" },
];

const responseHeaders = [
  { name: "X-AZNP-Plan", desc: "사용 플랜 (free | pro)" },
  { name: "X-AZNP-Source", desc: "변환 소스 (cloudflare-native | aznp-self | browser-rendering | cache | kv)" },
  { name: "X-AZNP-Cache", desc: "캐시 상태 (HIT | MISS)" },
  { name: "X-Token-Reduction", desc: "추정 토큰 절감률 (예: Estimated 82%)" },
  { name: "X-Markdown-Tokens", desc: "반환 Markdown 토큰 수 (추정)" },
  { name: "X-RateLimit-Remaining", desc: "남은 Rate Limit (분당)" },
  { name: "Cache-Control", desc: "캐시 정책 (public, max-age=..., stale-while-revalidate=...)" },
];

const errorCodes = [
  { code: "400", title: "Bad Request", desc: "url 파라미터 누락 또는 유효하지 않은 URL" },
  { code: "403", title: "Forbidden", desc: "Pro 전용 기능(JS Rendering, Summary 등)을 Free 플랜에서 요청" },
  { code: "429", title: "Rate Limit Exceeded", desc: "분당 또는 일일 요청 한도 초과" },
  { code: "500", title: "Internal Error", desc: "변환 중 내부 오류 발생" },
  { code: "502", title: "Bad Gateway", desc: "대상 URL fetch 실패" },
];

export default function ApiReferencePage() {
  return (
    <article>
      {/* 헤더 */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="badge badge-purple" style={{ marginBottom: "0.875rem" }}>API 레퍼런스</span>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.875rem", color: "var(--color-slate-50)" }}>
          API 레퍼런스
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-slate-400)", lineHeight: 1.7 }}>
          AZNP v2.1 API 엔드포인트, 파라미터, 응답 헤더 및 에러 코드를 확인하세요.
        </p>
      </div>

      {/* 기본 엔드포인트 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          엔드포인트
        </h2>
        <div className="code-block">
          <span style={{ color: "var(--color-cyan-400)" }}>GET</span>{" "}
          <span style={{ color: "var(--color-indigo-400)" }}>
            https://aznp-proxy.kerberos79.workers.dev/
          </span>
          <span style={{ color: "var(--color-slate-500)" }}>?url=</span>
          <span style={{ color: "var(--color-purple-400)" }}>{"{target_url}"}</span>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-slate-400)", marginTop: "0.75rem", lineHeight: 1.7 }}>
          Pro 플랜: <code style={{ fontFamily: "var(--font-mono)", color: "var(--color-indigo-400)", fontSize: "0.85em" }}>X-API-Key: aznp_pro_xxxxx</code> 헤더 추가
        </p>
      </section>

      {/* 쿼리 파라미터 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          쿼리 파라미터
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["파라미터", "필수", "플랜", "설명"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "0.75rem 1rem", color: "var(--color-slate-400)", fontWeight: 500, fontSize: "0.8125rem" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queryParams.map((p, i) => (
                <tr key={p.name} style={{ borderBottom: i < queryParams.length - 1 ? "1px solid rgba(99,102,241,0.1)" : "none" }}>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <code style={{ fontFamily: "var(--font-mono)", color: "var(--color-indigo-400)", fontSize: "0.875em" }}>{p.name}</code>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span style={{
                      fontSize: "0.75rem",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px",
                      background: p.required ? "rgba(239,68,68,0.1)" : "rgba(100,116,139,0.1)",
                      color: p.required ? "#f87171" : "var(--color-slate-500)",
                    }}>
                      {p.required ? "필수" : "선택"}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--color-slate-400)", fontSize: "0.8125rem" }}>{p.plan}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--color-slate-300)" }}>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 응답 헤더 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          응답 헤더
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {responseHeaders.map((h) => (
            <div key={h.name} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(99,102,241,0.08)" }}>
              <code style={{ fontFamily: "var(--font-mono)", color: "var(--color-cyan-400)", fontSize: "0.825rem", flexShrink: 0, minWidth: "200px" }}>
                {h.name}
              </code>
              <span style={{ fontSize: "0.875rem", color: "var(--color-slate-400)", lineHeight: 1.6 }}>{h.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 코드 예시 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-slate-50)" }}>
          코드 예시
        </h2>

        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--color-slate-300)" }}>curl</h3>
        <div className="code-block" style={{ marginBottom: "1.5rem" }}>
          <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}># Free</div>
          <div><span style={{ color: "var(--color-cyan-400)" }}>curl</span> <span style={{ color: "var(--color-indigo-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://news.ycombinator.com&quot;</span></div>
          <div style={{ marginTop: "1rem", color: "var(--color-slate-500)" }}># Pro - 요약 + max_tokens</div>
          <div>
            <span style={{ color: "var(--color-cyan-400)" }}>curl</span>{" "}
            <span style={{ color: "var(--color-slate-400)" }}>-H</span>{" "}
            <span style={{ color: "var(--color-purple-400)" }}>&quot;X-API-Key: aznp_pro_xxxxx&quot;</span>{" \\\n  "}
            <span style={{ color: "var(--color-indigo-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&amp;mode=summary&amp;max_tokens=2000&quot;</span>
          </div>
        </div>

        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--color-slate-300)" }}>JavaScript (fetch)</h3>
        <div className="code-block">
          {`const res = await fetch(
  "https://aznp-proxy.kerberos79.workers.dev/?" +
  new URLSearchParams({ url: "https://example.com" }),
  {
    headers: {
      "X-API-Key": "aznp_pro_xxxxx", // Pro only
    },
  }
);

const markdown = await res.text();
const source = res.headers.get("X-AZNP-Source");
const reduction = res.headers.get("X-Token-Reduction");

console.log(\`Source: \${source}, Reduction: \${reduction}\`);`}
        </div>
      </section>

      {/* 에러 코드 */}
      <section>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          에러 코드
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {errorCodes.map((e) => (
            <div key={e.code} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "0.875rem 1rem", borderRadius: "0.5rem", background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}>
              <code style={{ fontFamily: "var(--font-mono)", color: "#f87171", fontSize: "0.9rem", flexShrink: 0, fontWeight: 700, minWidth: "48px" }}>
                {e.code}
              </code>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-slate-200)", marginBottom: "0.2rem" }}>{e.title}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-slate-400)" }}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
