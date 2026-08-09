import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API 레퍼런스 (x402 Micropayments)",
  description:
    "AZNP v2.1 API 레퍼런스. 쿼리 파라미터, 응답 헤더, HTTP 402 Payment Required 및 x402 에이전트 결제 예시를 확인하세요.",
};

const queryParams = [
  { name: "url", required: true, plan: "Free/x402", desc: "대상 웹페이지 URL (필수)" },
  { name: "mode", required: false, plan: "auto: Free, summary: x402", desc: "auto (기본) / summary (요약 모드)" },
  { name: "max_tokens", required: false, plan: "x402", desc: "반환 Markdown 최대 토큰 수" },
  { name: "render", required: false, plan: "x402", desc: "true → JS 렌더링 강제 (Tier 3 Browser Rendering)" },
  { name: "format", required: false, plan: "markdown: 모두, json: x402", desc: "markdown (기본) / json (구조화 JSON)" },
  { name: "fresh", required: false, plan: "Free/x402", desc: "1 → 캐시 무시하고 강제 갱신" },
  { name: "images", required: false, plan: "Free/x402", desc: "0 → 이미지 관련 텍스트 최소화" },
];

const responseHeaders = [
  { name: "X-AZNP-Plan", desc: "사용 플랜 (free | x402)" },
  { name: "X-AZNP-Source", desc: "변환 소스 (cloudflare-native | aznp-self | browser-rendering | cache | kv)" },
  { name: "X-AZNP-Cache", desc: "캐시 상태 (HIT | MISS)" },
  { name: "X-Token-Reduction", desc: "추정 토큰 절감률 (예: Estimated 82%)" },
  { name: "X-Markdown-Tokens", desc: "반환 Markdown 토큰 수 (추정)" },
  { name: "X-RateLimit-Remaining", desc: "남은 Free Rate Limit (분당)" },
  { name: "PAYMENT-REQUIRED", desc: "HTTP 402 반환 시 x402 소액 결제 스펙 JSON (금액, 통화, 수신 지갑 주소)" },
  { name: "Cache-Control", desc: "캐시 정책 (public, max-age=..., stale-while-revalidate=...)" },
];

const errorCodes = [
  { code: "400", title: "Bad Request", desc: "url 파라미터 누락 또는 유효하지 않은 URL" },
  { code: "402", title: "Payment Required (x402)", desc: "Free 한도 초과 또는 고급 기능(JS 렌더링, 요약 등) 요청 시 x402 소액 결제 요구" },
  { code: "429", title: "Rate Limit Exceeded", desc: "분당 요청 한도 초과 (x402 결제 시 즉시 해제)" },
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
          API 레퍼런스 &amp; x402 연동
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-slate-400)", lineHeight: 1.7 }}>
          AZNP v2.1 API 엔드포인트, 파라미터, 응답 헤더 및 AI 에이전트 x402 결제 프로토콜 명세를 확인하세요.
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
          별도의 회원가입이나 API Key가 필요 없습니다. 기본 요청은 Free 티어로 처리되며, 고급 연동 시 x402 프로토콜을 통해 지갑으로 자동 승인됩니다.
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
                {["파라미터", "필수", "구분", "설명"].map((h) => (
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

      {/* x402 402 Payment Required 상세 스펙 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          💳 x402 (402 Payment Required) 프로토콜 흐름
        </h2>
        <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
          <ol style={{ paddingLeft: "1.25rem", margin: 0, color: "var(--color-slate-300)", fontSize: "0.9rem", lineHeight: 1.8 }}>
            <li><strong>요청 시도</strong>: AI 에이전트가 AZNP에 요청합니다.</li>
            <li><strong>402 응답</strong>: Free 한도 초과 또는 고급 기능 사용 시 `HTTP 402 Payment Required` 반환</li>
            <li><strong>PAYMENT-REQUIRED 헤더 확인</strong>: 수신 지갑 주소(`payTo`), 금액(`amount`), 네트워크(`network`) 확인</li>
            <li><strong>자동 온체인 서명/결제</strong>: 에이전트 지갑이 USDC 결제 후 `PAYMENT-SIGNATURE` 헤더 포함하여 재요청</li>
            <li><strong>Markdown 반환</strong>: AZNP Worker가 서명 검증 후 고품질 Markdown 응답 반환</li>
          </ol>
        </div>
      </section>

      {/* 코드 예시 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-slate-50)" }}>
          코드 예시
        </h2>

        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--color-slate-300)" }}>TypeScript (AI Agent x402 SDK)</h3>
        <div className="code-block" style={{ marginBottom: "1.5rem" }}>
          {`import { x402fetch } from "@x402/fetch";

const response = await x402fetch(
  "https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&mode=summary",
  {
    wallet: agentWallet, // USDC 잔액이 있는 에이전트 지갑
    maxAmount: "0.05",   // 지불 허용 상한 (USDC)
  }
);

const markdown = await response.text();
console.log("Token reduction:", response.headers.get("X-Token-Reduction"));`}
        </div>

        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--color-slate-300)" }}>Python (AI Agent / LangChain / AutoGen)</h3>
        <div className="code-block">
          {`import httpx

# 1. 402 응답 및 결제 정보 수신 핸들러 예시
async def fetch_aznp_markdown(target_url: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"https://aznp-proxy.kerberos79.workers.dev/?url={target_url}&render=true"
        )
        if res.status_code == 402:
            payment_info = res.headers.get("PAYMENT-REQUIRED")
            # 에이전트 지갑이 payment_info 스펙대로 USDC 온체인 결제 진행 후 재요청
            tx_signature = await sign_and_pay(payment_info)
            res = await client.get(
                f"https://aznp-proxy.kerberos79.workers.dev/?url={target_url}&render=true",
                headers={"PAYMENT-SIGNATURE": tx_signature}
            )
        return res.text`}
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
