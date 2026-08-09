import Link from "next/link";

const footerLinks: Record<string, { label: string; href: string; external?: boolean }[]> = {
  "제품": [
    { label: "소개", href: "/" },
    { label: "요금", href: "/pricing" },
    { label: "문서", href: "/docs" },
    { label: "API 레퍼런스", href: "/docs/api" },
  ],
  "리소스": [
    { label: "Cloudflare Workers", href: "https://workers.cloudflare.com", external: true },
    { label: "Markdown for Agents", href: "https://blog.cloudflare.com/markdown-for-agents/", external: true },
    { label: "GitHub", href: "https://github.com", external: true },
  ],
  "법적 고지": [
    { label: "이용약관", href: "/terms" },
    { label: "개인정보처리방침", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        marginTop: "6rem",
        paddingTop: "3rem",
        paddingBottom: "2.5rem",
      }}
    >
      <div className="section-wrapper">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr repeat(3, 1fr)",
            gap: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "1rem" }}
            >
              <span
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(135deg, var(--color-indigo-500), var(--color-purple-600))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  fontWeight: 800,
                  color: "white",
                }}
              >
                AZ
              </span>
              <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--color-slate-50)" }}>
                AZNP
              </span>
            </Link>
            <p style={{ fontSize: "0.9rem", color: "var(--color-slate-400)", lineHeight: 1.7, maxWidth: "280px" }}>
              AI 에이전트를 위한 초경량 Markdown 프록시.
              <br />
              노이즈를 제거하고, 토큰을 절감하세요.
            </p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
              <span className="badge badge-indigo">Cloudflare Edge</span>
              <span className="badge badge-cyan">v2.1</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-slate-400)",
                  marginBottom: "1rem",
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="footer-link"
                    >
                      {label} {external && "↗"}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--color-border)",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "var(--color-slate-500)" }}>
            © 2026 AZNP. MIT License.
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--color-slate-500)" }}>
            Built on{" "}
            <span style={{ color: "var(--color-indigo-400)" }}>Cloudflare Workers</span>
            {" & "}
            <span style={{ color: "var(--color-purple-400)" }}>Cloudflare Pages</span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
