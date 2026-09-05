"use client";

import Link from "next/link";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function ApiReferencePage() {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].docsApi;

  const queryParams = [
    { name: "url", required: true, plan: "Free/USDC", desc: lang === "en" ? "Target web page URL (Required)" : "대상 웹페이지 URL (필수)" },
    { name: "mode", required: false, plan: "auto: Free, summary: USDC", desc: lang === "en" ? "auto (default) / summary (Summary mode)" : "auto (기본) / summary (요약 모드)" },
    { name: "max_tokens", required: false, plan: "USDC", desc: lang === "en" ? "Max tokens limit for return Markdown" : "반환 Markdown 최대 토큰 수" },
    { name: "render", required: false, plan: "USDC", desc: lang === "en" ? "true → Force dynamic JS rendering (Tier 3)" : "true → JS 렌더링 강제 (Tier 3 Browser Rendering)" },
    { name: "format", required: false, plan: "markdown / json", desc: lang === "en" ? "markdown (default) / json (Structured JSON)" : "markdown (기본) / json (구조화 JSON)" },
    { name: "fresh", required: false, plan: "Free/USDC", desc: lang === "en" ? "1 → Bypass cache & force refresh" : "1 → 캐시 무시하고 강제 갱신" },
    { name: "images", required: false, plan: "Free/USDC", desc: lang === "en" ? "0 → Minimize image text bloat" : "0 → 이미지 관련 텍스트 최소화" },
  ];

  const authHeaders = [
    { name: "x-wallet-address", required: true, desc: lang === "en" ? "Solana Public Key (Base58 format)" : "Solana Public Key (Base58 포맷)" },
    { name: "x-timestamp", required: true, desc: lang === "en" ? "Unix Timestamp (Seconds, within 5 mins)" : "Unix Timestamp (초 단위, 현재 시간 5분 이내)" },
    { name: "x-signature", required: true, desc: lang === "en" ? "Ed25519 signature of 'x402:{timestamp}' (Base58)" : "x402:{timestamp} 메시지에 대한 Ed25519 서명 (Base58 포맷)" },
  ];

  const responseHeaders = [
    { name: "X-AZNP-Plan", desc: lang === "en" ? "Execution plan (free | pro | enterprise)" : "사용 플랜 (free | pro | enterprise)" },
    { name: "X-AZNP-Source", desc: lang === "en" ? "Conversion source (cloudflare-native | aznp-self | browser-rendering | openapi-compressed | cache | kv)" : "변환 소스 (cloudflare-native | aznp-self | browser-rendering | openapi-compressed | cache | kv)" },
    { name: "X-AZNP-Cache", desc: lang === "en" ? "Cache status (HIT | MISS | BYPASS)" : "캐시 상태 (HIT | MISS | BYPASS)" },
    { name: "X-AZNP-Bypass", desc: lang === "en" ? "Set to 'true' on 307 Redirect for files or Free plan OpenAPI requests" : "파일 또는 Free 플랜 OpenAPI 요청에 대한 307 Redirect 시 'true' 설정" },
    { name: "X-Token-Reduction", desc: lang === "en" ? "Estimated token reduction % (e.g. 88%)" : "추정 토큰 절감률 (예: 88%)" },
    { name: "X-Markdown-Tokens", desc: lang === "en" ? "Output token count (estimated)" : "반환 토큰 수 (추정)" },
    { name: "X-RateLimit-Remaining", desc: lang === "en" ? "Remaining credit request count" : "남은 크레딧 요청 수" },
    { name: "PAYMENT-REQUIRED", desc: lang === "en" ? "Top-up spec JSON returned on HTTP 402" : "HTTP 402 반환 시 충전 정보 JSON (수신 지갑 주소, 충전 단가)" },
  ];

  const formattedCodeExample = `import nacl from 'tweetnacl';
import bs58 from 'bs58';

const AGENT_SOLANA_PRIVATE_KEY_BASE58 = "YOUR_AGENT_SOLANA_PRIVATE_KEY";
const secretKey = bs58.decode(AGENT_SOLANA_PRIVATE_KEY_BASE58);
const keypair = nacl.sign.keyPair.fromSecretKey(secretKey);
const publicKeyBase58 = bs58.encode(keypair.publicKey);

async function callAZNPProxy(targetUrl) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const messageBytes = new TextEncoder().encode(\`x402:\${timestamp}\`);

  // Generate Ed25519 detached signature
  const signatureBytes = nacl.sign.detached(messageBytes, keypair.secretKey);
  const signatureBase58 = bs58.encode(signatureBytes);

  const endpointUrl = \`https://aznp-proxy.kerberos79.workers.dev/?url=\${encodeURIComponent(targetUrl)}&render=true\`;

  const response = await fetch(endpointUrl, {
    method: 'GET',
    headers: {
      'x-wallet-address': publicKeyBase58,
      'x-timestamp': timestamp,
      'x-signature': signatureBase58,
    },
  });

  if (response.status === 402) {
    const errorData = await response.json();
    console.error("402 Payment Required: Insufficient credits. Please top up.", errorData);
    return null;
  }

  const markdown = await response.text();
  console.log("Token reduction:", response.headers.get("X-Token-Reduction"));
  console.log("Clean Markdown output:", markdown.slice(0, 200));
  return markdown;
}`;

  const walletAndAutoTopupExample = `// 1. Programmatic Solana Keypair Generation (Node.js)
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

// Create a new keypair programmatically for AI Agent
const agentKeypair = Keypair.generate();
const secretKeyBase58 = bs58.encode(agentKeypair.secretKey);
const publicKeyBase58 = agentKeypair.publicKey.toBase58();

console.log("Agent Public Key:", publicKeyBase58);
console.log("Agent Secret Key (Store securely in .env):", secretKeyBase58);

// 2. HTTP 402 Auto-Payment Handler Pattern
async function fetchWithAutoTopup(targetUrl) {
  let res = await callAZNPProxy(targetUrl);
  
  // Detect 402 Payment Required (Insufficient credits)
  if (res && res.status === 402) {
    const paymentInfo = await res.json();
    console.warn("HTTP 402 Payment Required received. Executing automated USDC topup...");
    
    // Step 2a: Send $20 USDC via Solana SDK to recipient wallet
    const txHash = await executeUsdcTransfer({
      fromKeypair: agentKeypair,
      toAddress: paymentInfo.receiver_wallet || "RECEIVER_SOLANA_WALLET",
      amountUsdc: 20.0
    });
    
    // Step 2b: Submit transaction hash to AZNP credit topup endpoint
    const topupRes = await fetch("https://aznp-proxy.kerberos79.workers.dev/v1/topup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: publicKeyBase58, tx_hash: txHash })
    });
    
    if (topupRes.ok) {
      console.log("Auto-topup successful! Resuming original request...");
      return await callAZNPProxy(targetUrl); // Retry request
    }
  }
  return res;
}`;

  return (
    <article>
      {/* 헤더 */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="badge badge-purple" style={{ marginBottom: "0.875rem" }}>{t.badge}</span>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.875rem", color: "var(--color-slate-50)" }}>
          {t.title}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-slate-400)", lineHeight: 1.7 }}>
          {t.subtitle}
        </p>
      </div>

      {/* 기본 엔드포인트 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          {t.endpointTitle}
        </h2>
        <div className="code-block" style={{ wordBreak: "break-all" }}>
          <span style={{ color: "var(--color-cyan-400)" }}>GET</span>{" "}
          <span style={{ color: "var(--color-indigo-400)" }}>
            https://aznp-proxy.kerberos79.workers.dev/
          </span>
          <span style={{ color: "var(--color-slate-500)" }}>?url=</span>
          <span style={{ color: "var(--color-purple-400)" }}>{"{"}target_url{"}"}</span>
        </div>
      </section>

      {/* Solana 서명 인증 헤더 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          {t.authHeaderTitle}
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--color-slate-400)", marginBottom: "1rem", lineHeight: 1.7 }}>
          {t.authHeaderSub}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {authHeaders.map((h) => (
            <div key={h.name} className="def-row" style={{ background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <code className="nowrap-scroll" style={{ fontFamily: "var(--font-mono)", color: "var(--color-indigo-400)", fontSize: "0.825rem", flexShrink: 0 }}>
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
          {t.topupTitle}
        </h2>
        <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.875rem", color: "var(--color-slate-300)", marginBottom: "0.75rem" }}>
            {t.topupSub}
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
          {t.queryParamsTitle}
        </h2>
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", minWidth: "540px", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {[t.colParam, t.colReq, t.colType, t.colDesc].map((h) => (
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
                      whiteSpace: "nowrap",
                      background: p.required ? "rgba(239,68,68,0.1)" : "rgba(100,116,139,0.1)",
                      color: p.required ? "#f87171" : "var(--color-slate-500)",
                    }}>
                      {p.required ? t.reqYes : t.reqNo}
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
          {t.respHeadersTitle}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {responseHeaders.map((h) => (
            <div key={h.name} className="def-row" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(99,102,241,0.08)" }}>
              <code className="nowrap-scroll" style={{ fontFamily: "var(--font-mono)", color: "var(--color-cyan-400)", fontSize: "0.825rem", flexShrink: 0 }}>
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
          {t.codeExamplesTitle}
        </h2>
        <div className="code-block" style={{ whiteSpace: "pre-wrap", fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 1.7 }}>
          {formattedCodeExample}
        </div>
      </section>

      {/* 지갑 생성 및 자동 결제 코드 예시 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-slate-50)" }}>
          {t.walletCodeTitle}
        </h2>
        <div className="code-block" style={{ whiteSpace: "pre-wrap", fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 1.7 }}>
          {walletAndAutoTopupExample}
        </div>
      </section>
    </article>
  );
}
