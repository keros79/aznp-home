"use client";

import Link from "next/link";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function DocsPage() {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].docsPage;

  return (
    <article>
      {/* 헤더 */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="badge badge-indigo" style={{ marginBottom: "0.875rem" }}>{t.badge}</span>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.875rem", color: "var(--color-slate-50)" }}>
          {t.title}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-slate-400)", lineHeight: 1.7 }}>
          {t.subtitle}
        </p>
      </div>

      {/* 빠른 시작 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-slate-50)" }}>
          {t.quickstartTitle}
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-slate-400)", marginBottom: "1rem", lineHeight: 1.7 }}>
          {t.quickstartSub}
        </p>
        <div className="code-block">
          <div style={{ color: "var(--color-slate-500)", marginBottom: "0.5rem" }}># Basic Conversion</div>
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
          {t.solanaTitle}
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-slate-400)", marginBottom: "1rem", lineHeight: 1.7 }}>
          {t.solanaSub}
        </p>
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <ol style={{ paddingLeft: "1.25rem", margin: 0, color: "var(--color-slate-300)", fontSize: "0.9rem", lineHeight: 1.8 }}>
            <li><strong>{t.step1}</strong></li>
            <li><strong>{t.step2}</strong></li>
            <li><strong>{t.step3}</strong></li>
          </ol>
        </div>
      </section>

      {/* AI 에이전트 지갑 생성 & 자동 결제 가이드 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--color-slate-50)" }}>
          {t.walletTitle}
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-slate-400)", marginBottom: "1.25rem", lineHeight: 1.7 }}>
          {t.walletSub}
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="glass-card" style={{ padding: "1.25rem", borderLeft: "3px solid var(--color-cyan-400)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-cyan-400)", marginBottom: "0.5rem" }}>
              {t.walletMethod1Title}
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--color-slate-300)", lineHeight: 1.7 }}>
              {t.walletMethod1Desc}
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.25rem", borderLeft: "3px solid var(--color-indigo-400)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-indigo-400)", marginBottom: "0.5rem" }}>
              {t.walletMethod2Title}
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--color-slate-300)", lineHeight: 1.7 }}>
              {t.walletMethod2Desc}
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.25rem", borderLeft: "3px solid var(--color-purple-400)", background: "rgba(168,85,247,0.04)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-purple-400)", marginBottom: "0.5rem" }}>
              {t.autoTopupTitle}
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--color-slate-300)", lineHeight: 1.7 }}>
              {t.autoTopupDesc}
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 개념 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-slate-50)" }}>
          {t.conceptsTitle}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {[
            {
              title: t.c1Title,
              desc: t.c1Desc,
            },
            {
              title: t.c2Title,
              desc: t.c2Desc,
            },
            {
              title: t.c3Title,
              desc: t.c3Desc,
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
          {t.nextStepsTitle}
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/docs/api" className="btn-primary">
            {t.apiRefBtn}
          </Link>
          <Link href="/pricing" className="btn-outline">
            {t.pricingBtn}
          </Link>
        </div>
      </section>
    </article>
  );
}
