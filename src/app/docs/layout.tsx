"use client";

import Link from "next/link";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].footer;

  const docLinks = [
    { href: "/docs", label: t.intro, desc: lang === "en" ? "Overview & Quickstart" : "AZNP 개요 및 빠른 시작" },
    { href: "/docs/api", label: t.apiRef, desc: lang === "en" ? "Endpoints, Auth & Parameters" : "엔드포인트, 서명 헤더, 명세" },
    { href: "/pricing", label: t.pricing, desc: lang === "en" ? "Solana USDC Pricing & Topup" : "Solana 소액 충전 요금" },
  ];

  return (
    <div
      style={{ display: "flex", minHeight: "calc(100vh - 4rem)", overflowX: "hidden" }}
      className="docs-container"
    >
      {/* 사이드바 */}
      <aside
        style={{
          width: "240px",
          flexShrink: 0,
          borderRight: "1px solid var(--color-border)",
          padding: "2rem 1.25rem",
          position: "sticky",
          top: "4rem",
          height: "calc(100vh - 4rem)",
          overflowY: "auto",
        }}
        className="docs-sidebar"
      >
        <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-slate-400)" }}>
          AZNP Docs
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {docLinks.map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="docs-nav-link"
            >
              <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-slate-200)" }}>{label}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)", marginTop: "0.1rem" }}>{desc}</div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* 본문 */}
      <main style={{ flex: 1, padding: "2.5rem 3rem", maxWidth: "900px", minWidth: 0 }} className="docs-main">
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .docs-sidebar { display: none !important; }
          .docs-main { padding: 1.5rem !important; max-width: 100% !important; }
          .docs-container { overflow-x: hidden !important; }
        }
      `}</style>
    </div>
  );
}
