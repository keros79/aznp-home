"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useI18nStore();
  const t = dictionaries[lang].nav;

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/pricing", label: t.pricing },
    { href: "/docs", label: t.docs },
    { href: "/docs/api", label: t.api },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--color-border)",
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        className="section-wrapper"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
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
              letterSpacing: "-0.05em",
            }}
          >
            AZ
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.125rem",
              color: "var(--color-slate-50)",
              letterSpacing: "-0.02em",
            }}
          >
            AZNP
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "0.25rem", alignItems: "center" }} className="hidden sm:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding: "0.375rem 0.875rem",
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "background var(--duration-fast) ease, color var(--duration-fast) ease",
                color: pathname === href ? "var(--color-indigo-400)" : "var(--color-slate-400)",
                background: pathname === href ? "rgba(99,102,241,0.1)" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA & Language Switcher */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <LanguageSwitcher />
          <Link href="/pricing" className="btn-primary" style={{ padding: "0.45rem 1.125rem", fontSize: "0.875rem" }}>
            {t.cta}
          </Link>
          {/* 모바일 햄버거 */}
          <button
            className="sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "1px solid var(--color-border)",
              borderRadius: "0.5rem",
              padding: "0.375rem 0.625rem",
              cursor: "pointer",
              color: "var(--color-slate-400)",
              fontSize: "1.1rem",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
          className="sm:hidden"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "0.625rem 0.875rem",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                color: pathname === href ? "var(--color-indigo-400)" : "var(--color-slate-300)",
                background: pathname === href ? "rgba(99,102,241,0.1)" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
