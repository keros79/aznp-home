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
    { href: "/about", label: t.about },
  ];

  return (
    <header className="nav-header">
      <div className="section-wrapper nav-row">
        {/* Logo */}
        <Link href="/" className="nav-logo">
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

        {/* Desktop nav — display는 .nav-desktop 이 제어 */}
        <nav className="nav-desktop">
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

        {/* 우측: Language Switcher + 햄버거(모바일) */}
        <div className="nav-actions">
          <LanguageSwitcher />

          {/* 햄버거 버튼: 데스크탑에서 숨김 (.nav-toggle) */}
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 — display는 .nav-mobile-menu 가 제어 */}
      {menuOpen && (
        <div id="mobile-menu" className="nav-mobile-menu">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-mobile-link"
              onClick={() => setMenuOpen(false)}
              style={{
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
