"use client";

import Image from "next/image";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function AboutPage() {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].about;

  const stacks = [
    {
      title: t.frontend,
      color: "var(--color-indigo-400)",
      border: "rgba(99,102,241,0.3)",
      bg: "rgba(99,102,241,0.05)",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Zustand",
        "TanStack Query",
      ],
    },
    {
      title: t.backend,
      color: "var(--color-purple-400)",
      border: "rgba(168,85,247,0.3)",
      bg: "rgba(168,85,247,0.05)",
      items: [
        "Node.js",
        "TypeScript",
        "Cloudflare Workers",
        "Cloudflare KV",
        "Solana Ed25519",
        "Cloudflare Pages",
        "Wrangler",
      ],
    },
  ];

  return (
    <div style={{ padding: "5rem 0" }}>
      <div className="section-wrapper">
        {/* 프로필 */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="badge badge-indigo" style={{ marginBottom: "1.75rem" }}>{t.badge}</span>

          {/* 브랜드 그래디언트 링 위에 원형 아바타 */}
          <div
            style={{
              width: "160px",
              height: "160px",
              margin: "0 auto 1.5rem",
              padding: "3px",
              borderRadius: "50%",
              background: "var(--gradient-brand)",
              boxShadow: "0 0 40px rgba(99,102,241,0.25)",
            }}
          >
            <Image
              src="/danny-kang.webp"
              alt="Danny Kang"
              width={160}
              height={160}
              loading="eager"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>

          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--color-slate-50)",
              margin: 0,
            }}
          >
            Danny Kang
          </h1>

          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-slate-400)",
              margin: "0.5rem 0 0",
            }}
          >
            {t.role}
          </p>

          <a
            href="mailto:kerberos79@gmail.com"
            className="about-email"
          >
            <span aria-hidden="true">✉</span>
            kerberos79@gmail.com
          </a>
        </div>

        {/* 기술 스택 */}
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              textAlign: "center",
              marginBottom: "2rem",
              color: "var(--color-slate-50)",
            }}
          >
            {t.techTitle}
          </h2>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}
            className="tech-grid"
          >
            {stacks.map((stack) => (
              <div
                key={stack.title}
                className="glass-card"
                style={{ padding: "1.75rem", border: `1px solid ${stack.border}`, background: stack.bg }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: stack.color,
                    marginBottom: "1.125rem",
                  }}
                >
                  {stack.title}
                </div>

                {/* 기술명만 아웃라인 칩으로 나열 — 칩은 안에서 쪼개지지 않고 줄 단위로만 넘어간다 */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {stack.items.map((item) => (
                    <span key={item} className="tech-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .tech-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
