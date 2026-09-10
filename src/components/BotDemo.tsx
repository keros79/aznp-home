"use client";

import { useMutation } from "@tanstack/react-query";
import { useDemoStore } from "@/store/demoStore";
import { convertUrl } from "@/lib/aznpClient";
import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

const EXAMPLE_URLS = [
  "https://news.ycombinator.com",
  "https://example.com",
  "https://github.com/cloudflare/workers-sdk",
];

const sourceLabels: Record<string, string> = {
  "cloudflare-native": "Cloudflare Native ⚡",
  "aznp-self": "AZNP Self-Converted 🔧",
  "browser-rendering": "Browser Rendering 🌐",
  cache: "Cache HIT 🗄️",
  kv: "KV Cache 🗄️",
};

export default function BotDemo() {
  const { inputUrl, setInputUrl, result, setResult, setError, error } = useDemoStore();
  const { lang } = useI18nStore();
  const t = dictionaries[lang].demo;

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      convertUrl({
        url: inputUrl,
      }),
    onSuccess: (data) => {
      setResult(data);
      setError(null);
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    mutate();
  };

  const handleExampleClick = (url: string) => {
    setInputUrl(url);
  };

  return (
    <section
      style={{
        padding: "6rem 0",
        background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.04), transparent)",
      }}
    >
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="badge badge-indigo" style={{ marginBottom: "1rem" }}>{t.badge}</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            {t.title}
          </h2>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </div>

        <div
          className="glass-card demo-card-mobile"
          style={{ maxWidth: "860px", margin: "0 auto", padding: "2.25rem" }}
        >
          {/* 예시 URL */}
          <div className="chip-row" style={{ marginBottom: "1.25rem", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--color-slate-400)", marginRight: "0.25rem" }}>{t.exampleLabel}</span>
            {EXAMPLE_URLS.map((url) => (
              <button
                key={url}
                onClick={() => handleExampleClick(url)}
                style={{
                  fontSize: "0.78rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: "var(--color-indigo-400)",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  transition: "background var(--duration-fast) ease",
                }}
              >
                {url.replace("https://", "")}
              </button>
            ))}
          </div>

          {/* 입력 폼 */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <div style={{ display: "flex", gap: "0.75rem" }} className="demo-input-row">
              <input
                id="demo-url-input"
                type="url"
                className="input-field"
                placeholder={t.urlPlaceholder}
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={isPending || !inputUrl.trim()}
                style={{
                  whiteSpace: "nowrap",
                  opacity: isPending || !inputUrl.trim() ? 0.6 : 1,
                  cursor: isPending || !inputUrl.trim() ? "not-allowed" : "pointer",
                  flexShrink: 0,
                }}
              >
                {isPending ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: "14px",
                        height: "14px",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    {t.converting}
                  </>
                ) : (
                  t.convertBtn
                )}
              </button>
            </div>

            </form>

          {/* 에러 */}
          {error && (
            <div
              style={{
                marginTop: "1.25rem",
                padding: "0.875rem 1.125rem",
                borderRadius: "0.625rem",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#f87171",
                fontSize: "0.875rem",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* 결과 */}
          {result && (
            <div style={{ marginTop: "1.75rem" }}>
              {/* 응답 헤더 뱃지 */}
              <div
                className="chip-row"
                style={{
                  gap: "0.625rem",
                  marginBottom: "1rem",
                }}
              >
                <span className={`badge badge-${result.plan === "pro" ? "purple" : "indigo"}`}>
                  {result.plan === "pro" ? "🔑 Pro Agent" : "✅ Free"}
                </span>
                <span className="badge badge-cyan">
                  {sourceLabels[result.source] ?? result.source}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    background: result.cacheStatus === "HIT" ? "rgba(34,197,94,0.1)" : "rgba(100,116,139,0.1)",
                    color: result.cacheStatus === "HIT" ? "#4ade80" : "var(--color-slate-400)",
                    border: `1px solid ${result.cacheStatus === "HIT" ? "rgba(34,197,94,0.3)" : "rgba(100,116,139,0.2)"}`,
                  }}
                >
                  {t.cacheStatus} {result.cacheStatus}
                </span>
                {result.tokenReduction !== "–" && (
                  <span className="badge badge-indigo">
                    🪙 {result.tokenReduction}
                  </span>
                )}
                {result.markdownTokens !== "–" && (
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-slate-400)", padding: "0.25rem 0.75rem" }}>
                    {t.tokens} {result.markdownTokens}
                  </span>
                )}
                <span style={{ fontSize: "0.8125rem", color: "var(--color-slate-500)", padding: "0.25rem 0.75rem" }}>
                  {t.remaining} {result.rateLimitRemaining}
                </span>
              </div>

              {/* Markdown 출력 */}
              <div
                className="code-block"
                style={{ maxHeight: "400px", overflowY: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {result.markdown}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 560px) {
          .demo-input-row { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
