import Link from "next/link";

const docLinks = [
  { href: "/docs", label: "소개", desc: "AZNP 개요 및 빠른 시작" },
  { href: "/docs/api", label: "API 레퍼런스", desc: "파라미터, 헤더, 에러 코드" },
  { href: "/pricing", label: "요금제", desc: "Free / Pro / Team / Business" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ display: "flex", minHeight: "calc(100vh - 4rem)" }}
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
      <main style={{ flex: 1, padding: "2.5rem 3rem", maxWidth: "900px" }} className="docs-main">
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .docs-sidebar { display: none !important; }
          .docs-main { padding: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}
