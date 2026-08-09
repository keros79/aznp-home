"use client";

import { useI18nStore } from "@/store/i18nStore";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18nStore();

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "rgba(255,255,255,0.05)", padding: "0.2rem 0.375rem", borderRadius: "9999px", border: "1px solid var(--color-border)" }}>
      <button
        type="button"
        onClick={() => setLang("en")}
        style={{
          background: lang === "en" ? "var(--color-indigo-600)" : "transparent",
          color: lang === "en" ? "white" : "var(--color-slate-400)",
          border: "none",
          borderRadius: "9999px",
          padding: "0.15rem 0.5rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all var(--duration-fast) ease",
        }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ko")}
        style={{
          background: lang === "ko" ? "var(--color-indigo-600)" : "transparent",
          color: lang === "ko" ? "white" : "var(--color-slate-400)",
          border: "none",
          borderRadius: "9999px",
          padding: "0.15rem 0.5rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all var(--duration-fast) ease",
        }}
      >
        KO
      </button>
    </div>
  );
}
