const features = [
  {
    icon: "🪙",
    color: "var(--color-cyan-400)",
    bg: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.2)",
    title: "75~90% 토큰 절감",
    desc: "광고, 네비게이션, CSS/JS, 사이드바를 모두 제거합니다. Pro의 Advanced Extraction은 추가 15~30% 절감.",
    stats: "평균 1/5 이하 토큰",
  },
  {
    icon: "⚡",
    color: "var(--color-indigo-400)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    title: "Cloudflare Edge 속도",
    desc: "전 세계 Cloudflare 엣지에서 서빙. Cache API + KV 다층 캐시로 반복 요청 CPU를 70~90% 절약.",
    stats: "글로벌 저지연",
  },
  {
    icon: "🌐",
    color: "var(--color-purple-400)",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.2)",
    title: "범용성",
    desc: "Cloudflare Markdown for Agents를 지원하지 않는 사이트도 처리. 동적 JS 페이지는 Pro에서 Browser Rendering.",
    stats: "어떤 사이트든",
  },
  {
    icon: "💰",
    color: "var(--color-cyan-400)",
    bg: "rgba(34,211,238,0.06)",
    border: "rgba(34,211,238,0.18)",
    title: "비용 효율",
    desc: "Free Plan으로 기본 기능을 $0에 제공. Pro $19/월로 고급 기능을 과금. Stale-While-Revalidate로 CPU 최적화.",
    stats: "Free $0 / Pro $19",
  },
  {
    icon: "📊",
    color: "var(--color-indigo-400)",
    bg: "rgba(99,102,241,0.06)",
    border: "rgba(99,102,241,0.18)",
    title: "토큰 절감 분석",
    desc: "Pro는 D1 기반 Token Analytics로 월간 절감량을 확인하세요. \"이번 달 $XX 절약\"을 수치로 증명.",
    stats: "D1 Analytics (Pro)",
  },
  {
    icon: "🔑",
    color: "var(--color-purple-400)",
    bg: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.18)",
    title: "유연한 출력",
    desc: "기본 Markdown, 요약 모드, max_tokens 제한, Structured JSON 출력 지원. RAG 파이프라인에 최적화.",
    stats: "4가지 출력 모드",
  },
];

export default function Features() {
  return (
    <section
      style={{
        padding: "6rem 0",
        background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.03), transparent)",
      }}
    >
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="badge badge-purple" style={{ marginBottom: "1rem" }}>핵심 기능</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            AI 에이전트를 위해 설계된
            <br />
            <span className="text-gradient">모든 기능</span>
          </h2>
          <p className="section-subtitle">
            단순한 HTML-to-Markdown이 아닙니다.
            에이전트 워크플로우 전반을 최적화합니다.
          </p>
        </div>

        {/* 기능 카드 그리드 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}
          className="features-grid"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card"
              style={{ padding: "1.75rem" }}
            >
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "0.75rem",
                  background: f.bg,
                  border: `1px solid ${f.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  marginBottom: "1.125rem",
                }}
              >
                {f.icon}
              </div>

              <h3 style={{ fontWeight: 700, fontSize: "1.0625rem", marginBottom: "0.625rem", color: "var(--color-slate-50)" }}>
                {f.title}
              </h3>

              <p style={{ fontSize: "0.875rem", color: "var(--color-slate-400)", lineHeight: 1.7, marginBottom: "1rem" }}>
                {f.desc}
              </p>

              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: f.color }}>
                {f.stats}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
