const tiers = [
  {
    id: "tier1",
    name: "Tier 1",
    subtitle: "Cloudflare Native",
    color: "var(--color-cyan-400)",
    bg: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.25)",
    icon: "⚡",
    desc: "Accept: text/markdown 헤더로 요청. 사이트가 지원하면 CPU 사용 0, 가장 빠른 응답.",
    badge: "CPU ≈ 0",
  },
  {
    id: "tier2",
    name: "Tier 2",
    subtitle: "자체 변환",
    color: "var(--color-indigo-400)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.25)",
    icon: "🔧",
    desc: "HTML Fetch → 본문 추출 → Markdown 변환. Free는 경량, Pro는 Advanced Extraction.",
    badge: "Free / Pro",
  },
  {
    id: "tier3",
    name: "Tier 3",
    subtitle: "Browser Rendering",
    color: "var(--color-purple-400)",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.25)",
    icon: "🌐",
    desc: "JS 렌더링이 필요한 동적 페이지. Cloudflare Browser Rendering 사용. Pro 전용.",
    badge: "Pro only",
  },
];

const cacheRows = [
  { layer: "L1 Cache API", ttl: "Free 1h / Pro 6h", role: "가장 빠른 엣지 응답", speed: "초고속" },
  { layer: "L2 KV", ttl: "24h ~ 7일", role: "인기 페이지 장기 보관", speed: "빠름" },
  { layer: "L3 실제 변환", ttl: "캐시 미스 시", role: "3-Tier Cascading 실행", speed: "일반" },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "6rem 0" }}>
      <div className="section-wrapper">
        {/* 섹션 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="badge badge-indigo" style={{ marginBottom: "1rem" }}>How It Works</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            3-Tier Cascading 변환
          </h2>
          <p className="section-subtitle">
            가장 빠르고 저렴한 방법부터 순서대로 시도합니다.
            캐시 히트 시 CPU 사용량을 70~90% 절약합니다.
          </p>
        </div>

        {/* Tier 카드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
          className="tier-grid"
        >
          {tiers.map((tier, i) => (
            <div key={tier.id} className="glass-card" style={{ padding: "1.75rem", position: "relative" }}>
              {/* 순서 번호 */}
              <div
                style={{
                  position: "absolute",
                  top: "-0.75rem",
                  left: "1.5rem",
                  background: "var(--color-bg)",
                  border: `1px solid ${tier.border}`,
                  borderRadius: "9999px",
                  padding: "0.125rem 0.75rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: tier.color,
                  letterSpacing: "0.04em",
                }}
              >
                0{i + 1}
              </div>

              {/* 아이콘 + 타이틀 */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", marginTop: "0.5rem" }}>
                <span
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.625rem",
                    background: tier.bg,
                    border: `1px solid ${tier.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                  }}
                >
                  {tier.icon}
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: tier.color }}>{tier.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-slate-400)" }}>{tier.subtitle}</div>
                </div>
              </div>

              <p style={{ fontSize: "0.9rem", color: "var(--color-slate-400)", lineHeight: 1.7, marginBottom: "1rem" }}>
                {tier.desc}
              </p>

              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "0.2rem 0.625rem",
                  borderRadius: "9999px",
                  background: tier.bg,
                  color: tier.color,
                  border: `1px solid ${tier.border}`,
                }}
              >
                {tier.badge}
              </span>

              {/* 화살표 (마지막 제외) */}
              {i < tiers.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    right: "-1.25rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-slate-600)",
                    fontSize: "1.25rem",
                    zIndex: 1,
                  }}
                  className="tier-arrow"
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 캐시 전략 테이블 */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.125rem", marginBottom: "1.25rem", color: "var(--color-slate-50)" }}>
            🗄️ 다층 캐시 전략 (CPU 70~90% 절약)
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  {["계층", "TTL", "역할", "속도"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.625rem 1rem",
                        color: "var(--color-slate-400)",
                        fontWeight: 500,
                        fontSize: "0.8125rem",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cacheRows.map((row, i) => (
                  <tr
                    key={row.layer}
                    style={{
                      borderBottom: i < cacheRows.length - 1 ? "1px solid rgba(99,102,241,0.1)" : "none",
                    }}
                  >
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--color-indigo-400)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                      {row.layer}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--color-slate-300)" }}>{row.ttl}</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--color-slate-400)" }}>{row.role}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.15rem 0.625rem",
                          borderRadius: "9999px",
                          background: i === 0 ? "rgba(34,211,238,0.1)" : i === 1 ? "rgba(99,102,241,0.1)" : "rgba(100,116,139,0.1)",
                          color: i === 0 ? "var(--color-cyan-400)" : i === 1 ? "var(--color-indigo-400)" : "var(--color-slate-400)",
                        }}
                      >
                        {row.speed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tier-grid { grid-template-columns: 1fr !important; }
          .tier-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}
