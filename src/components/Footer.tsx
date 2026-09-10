"use client";

import Link from "next/link";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function Footer() {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].footer;

  const footerLinks: Record<string, { label: string; href: string; external?: boolean }[]> = {
    [t.catProduct]: [
      { label: t.intro, href: "/" },
      { label: t.pricing, href: "/pricing" },
      { label: t.docs, href: "/docs" },
      { label: t.apiRef, href: "/docs/api" },
    ],
    [t.catResources]: [
      { label: "Cloudflare Workers", href: "https://workers.cloudflare.com", external: true },
      { label: "Markdown for Agents", href: "https://blog.cloudflare.com/markdown-for-agents/", external: true },
      { label: "GitHub (aznp-worker)", href: "https://github.com/keros79/aznp-worker", external: true },
    ],
    [t.catLegal]: [
      { label: t.terms, href: "/terms" },
      { label: t.privacy, href: "/privacy" },
    ],
  };

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
              {t.brandDesc}
            </p>
            <div className="chip-row" style={{ gap: "0.5rem", marginTop: "1.25rem" }}>
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
            {t.copyright}
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--color-slate-500)" }}>
            {t.builtOn}
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
