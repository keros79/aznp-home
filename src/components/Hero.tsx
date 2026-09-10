"use client";

import Link from "next/link";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function Hero() {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].hero;

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        padding: "7rem 0 6rem",
        overflow: "hidden",
      }}
    >
      {/* 諛곌꼍 洹몃━??*/}
      <div
        className="bg-grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      {/* 諛곌꼍 湲濡쒖슦 */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(600px, 100%)",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.12) 40%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
        {/* 諛곗? */}
        <div style={{ marginBottom: "1.5rem" }}>
          <span className="badge badge-indigo">
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-indigo-400)", display: "inline-block" }} />
            {t.badge}
          </span>
        </div>

        {/* ?ㅻ뱶?쇱씤 */}
        <h1
          className="section-title animate-fade-in-up"
          style={{
            marginBottom: "1.25rem",
            animationDelay: "0.1s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {t.titleLine1}
          <br />
          <span className="text-gradient">{t.titleLine2}</span>
        </h1>

        {/* ?쒕툕?ㅻ뱶?쇱씤 */}
        <p
          className="section-subtitle animate-fade-in-up"
          style={{
            marginBottom: "2.5rem",
            animationDelay: "0.2s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {t.subtitle}{" "}
          <strong style={{ color: "var(--color-cyan-400)" }}>{t.subtitleHighlight}</strong>
        </p>

        {/* CTA 踰꾪듉 */}
        <div
          className="animate-fade-in-up"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            animationDelay: "0.3s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <Link href="/docs" className="btn-primary">
            {t.getStarted}
          </Link>
          <Link href="/docs/api" className="btn-outline">
            {t.apiDocs}
          </Link>
        </div>

        {/* 肄붾뱶 ?덉떆 */}
        <div
          className="glass-card animate-fade-in-up"
          style={{
            maxWidth: "680px",
            margin: "3.5rem auto 0",
            padding: "1.5rem",
            textAlign: "left",
            animationDelay: "0.45s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <div style={{ display: "flex", gap: "0.375rem", marginBottom: "0.875rem" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
            <span style={{ flex: 1, textAlign: "center", fontSize: "0.75rem", color: "var(--color-slate-500)", marginTop: "-1px" }}>
              {t.terminalHeader}
            </span>
          </div>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              color: "var(--color-slate-200)",
              margin: 0,
              overflowX: "auto",
              wordBreak: "break-all",
              overflowWrap: "break-word",
            }}
          >
            <span style={{ color: "var(--color-slate-500)" }}>{t.terminalCommentFree}</span>{"\n"}
            <span style={{ color: "var(--color-cyan-400)" }}>curl</span> <span style={{ color: "var(--color-indigo-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://news.ycombinator.com&quot;</span>{"\n\n"}
            <span style={{ color: "var(--color-slate-500)" }}>{t.terminalCommentJson}</span>{"\n"}
            <span style={{ color: "var(--color-cyan-400)" }}>curl</span> <span style={{ color: "var(--color-indigo-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&amp;format=json&quot;</span>{"\n\n"}
            <span style={{ color: "var(--color-slate-500)" }}>{t.terminalCommentMaxTokens}</span>{"\n"}
            <span style={{ color: "var(--color-cyan-400)" }}>curl</span> <span style={{ color: "var(--color-indigo-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&amp;max_tokens=2000&quot;</span>{"\n\n"}
            <span style={{ color: "var(--color-slate-500)" }}>{t.terminalCommentIdentity}</span>{"\n"}
<span style={{ color: "var(--color-cyan-400)" }}>curl</span> -H <span style={{ color: "var(--color-indigo-400)" }}>&quot;x-wallet-address: 7xKX...SolanaPublicKey&quot;</span> -H <span style={{ color: "var(--color-indigo-400)" }}>&quot;x-signature: 5K...Ed25519Signature&quot;</span>{"\n  "}
            <span style={{ color: "var(--color-purple-400)" }}>&quot;https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&quot;</span>
          </pre>
        </div>

        {/* ?듦퀎 */}
        <div
          className="animate-fade-in-up"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            marginTop: "3rem",
            flexWrap: "wrap",
            animationDelay: "0.55s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {[
            { value: t.statTokens, label: t.statTokensLabel },
            { value: t.statCascading, label: t.statCascadingLabel },
            { value: t.statEdge, label: t.statEdgeLabel },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                className="stat-value-mobile"
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  background: "var(--gradient-brand)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--color-slate-400)", marginTop: "0.25rem" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
