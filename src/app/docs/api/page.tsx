import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API 레퍼런스 (Solana Wallet Auth v2.0)",
  description:
    "AZNP v2.1 API 레퍼런스. Solana Ed25519 서명 헤더 인증, POST /v1/topup 충전 API 및 HTTP 402 명세를 확인하세요.",
};

const queryParams = [
  { name: "url", required: true, plan: "Free/USDC", desc: "대상 웹페이지 URL (필수)" },
  { name: "mode", required: false, plan: "auto: Free, summary: USDC", desc: "auto (기본) / summary (요약 모드)" },
  { name: "max_tokens", required: false, plan: "USDC", desc: "반환 Markdown 최대 토큰 수" },
  { name: "render", required: false, plan: "USDC", desc: "true → JS 렌더링 강제 (Tier 3 Browser Rendering)" },
  { name: "format", required: false, plan: "markdown: 모두, json: USDC", desc: "markdown (기본) / json (구조화 JSON)" },
  { name: "fresh", required: false, plan: "Free/USDC", desc: "1 → 캐시 무시하고 강제 갱신" },
  { name: "images", required: false, plan: "Free/USDC", desc: "0 → 이미지 관련 텍스트 최소화" },
];

const authHeaders = [
  { name: "x-wallet-address", required: true, desc: "Solana Public Key (Base58 포맷)" },
  { name: "x-timestamp", required: true, desc: "Unix Timestamp (초 단위, 현재 시간 5분 이내)" },
  { name: "x-signature", required: true, desc: "x402:{timestamp} 메시지에 대한 Ed25519 서명 (Base58 포맷)" },
];

const responseHeaders = [
  { name: "X-AZNP-Plan", desc: "사용 플랜 (free | pro | enterprise)" },
  { name: "X-AZNP-Source", desc: "변환 소스 (cloudflare-native | aznp-self | browser-rendering | cache | kv)" },
  { name: "X-AZNP-Cache", desc: "캐시 상태 (HIT | MISS)" },
  { name: "X-Token-Reduction", desc: "추정 토큰 절감률 (예: Estimated 82%)" },
  { name: "X-Markdown-Tokens", desc: "반환 Markdown 토큰 수 (추정)" },
  { name: "X-RateLimit-Remaining", desc: "남은 크레딧 요청 수" },
  { name: "PAYMENT-REQUIRED", desc: "HTTP 402 반환 시 충전 정보 JSON (수신 지갑 주소, 충전 단가)" },
];

export default function ApiReferencePage() {
  return (
    <article>
      {/* 헤더 */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="badge badge-purple" style={{ marginBottom: "0.875rem" }}>API 레퍼런스</span>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.875rem", color: "var(--color-slate-50)" }}>
          API 레퍼런스 &amp; Solana 인증
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-slate-400)", lineHeight: 1.7 }}>
          AZNP v2.1 API 엔드포인트, Solana Ed25519 서명 인증 헤더 및 충전(`POST /v1/topup`) API 명세를 확인하세요.
        </p>
      </div>

      {/* 기본 엔드포인트 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          기본 변환 엔드포인트
        </h2>
        <div className="code-block">
          <span style={{ color: "var(--color-cyan-400)" }}>GET</span>{" "}
          <span style={{ color: "var(--color-indigo-400)" }}>
            https://aznp-proxy.kerberos79.workers.dev/
          </span>
          <span style={{ color: "var(--color-slate-500)" }}>?url=</span>
          <span style={{ color: "var(--color-purple-400)" }}>{"{target_url}"}</span>
        </div>
      </section>

      {/* Solana 서명 인증 헤더 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          🔑 Solana Ed25519 인증 헤더 (무키 / Stateless)
        </h2>
          충전된 크레딧을 사용하려면 API 호출 시 <code style={{ fontFamily: "var(--font-mono)", color: "var(--color-indigo-400)" }}>x402:&#123;timestamp&#125;</code> 메시지를 솔라나 지갑 비밀키로 서명한 헤더를 제출합니다:
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {authHeaders.map((h) => (
            <div key={h.name} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <code style={{ fontFamily: "var(--font-mono)", color: "var(--color-indigo-400)", fontSize: "0.825rem", flexShrink: 0, minWidth: "180px" }}>
                {h.name}
              </code>
              <span style={{ fontSize: "0.875rem", color: "var(--color-slate-300)", lineHeight: 1.6 }}>{h.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 충전 API (POST /v1/topup) */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          💳 크레딧 충전 API (`POST /v1/topup`)
        </h2>
        <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.875rem", color: "var(--color-slate-300)", marginBottom: "0.75rem" }}>
            Solana 수신 지갑 주소(<code style={{ color: "var(--color-cyan-400)" }}>GuUdPHj3dnafbFvF2gMscCVAMCd4NvSE5ktsrbdAvT4E</code>)로 $20 USDC 이상 송금 후 제출합니다:
          </div>
          <div className="code-block" style={{ margin: 0 }}>
            <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}># Request</div>
            <div>
              <span style={{ color: "var(--color-cyan-400)" }}>curl</span> -X POST <span style={{ color: "var(--color-indigo-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/v1/topup&quot;</span>{" \\\n  "}
              -H <span style={{ color: "var(--color-purple-400)" }}>&quot;Content-Type: application/json&quot;</span>{" \\\n  "}
              -d <span style={{ color: "var(--color-indigo-400)" }}>&apos;{"{"}&quot;wallet&quot;: &quot;7xKX...SolanaPublicKey&quot;, &quot;tx_hash&quot;: &quot;5K...SolanaTxHash&quot;{"}"}&apos;</span>
            </div>
            <div style={{ color: "var(--color-slate-500)", marginTop: "1rem", marginBottom: "0.5rem" }}># Response (200 OK)</div>
            <div>
              {`{
  "success": true,
  "wallet": "7xKX...SolanaPublicKey",
  "deposited_usdc": 20.0,
  "added_credits": 12000,
  "total_allowed_requests": 12000
}`}
            </div>
          </div>
        </div>
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

      {/* 코드 예시 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-slate-50)" }}>
          AI 에이전트 서명 및 호출 코드 예시 (Node.js)
        </h2>
        <div className="code-block">
          {`import nacl from 'tweetnacl';
import bs58 from 'bs58';

const AGENT_PRIVATE_KEY_BASE58 = "YOUR_AGENT_SOLANA_PRIVATE_KEY";
const secretKey = bs58.decode(AGENT_PRIVATE_KEY_BASE58);
const keypair = nacl.sign.keyPair.fromSecretKey(secretKey);
const publicKeyBase58 = bs58.encode(keypair.publicKey);

async function callAZNPProxy(targetUrl) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const messageBytes = new TextEncoder().encode(\`x402:\${timestamp}\`);

  // Ed25519 서명 생성
  const signatureBytes = nacl.sign.detached(messageBytes, keypair.secretKey);
  const signatureBase58 = bs58.encode(signatureBytes);

  const res = await fetch(
    \`https://aznp-proxy.kerberos79.workers.dev/?url=\${encodeURIComponent(targetUrl)}&render=true\`,
    {
      headers: {
        'x-wallet-address': publicKeyBase58,
        'x-timestamp': timestamp,
        'x-signature': signatureBase58,
      }
    }
  );

  if (res.status === 402) {
    const err = await res.json();
    console.error("잔액 부족! 충전 필요. 수신 지갑:", err.service_wallet);
  } else {
    const markdown = await res.text();
    console.log("변환 성공 Clean Markdown:", markdown.slice(0, 200));
  }
}`}
        </div>
      </section>
    </article>
  );
}
