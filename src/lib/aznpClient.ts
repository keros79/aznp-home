import type { AznpResult } from "@/store/demoStore";

export interface ConvertOptions {
  url: string;
  apiKey?: string;
  mode?: "auto" | "summary";
  maxTokens?: number;
  render?: boolean;
  format?: "markdown" | "json";
}

/**
 * AZNP Worker API를 /api/proxy를 통해 호출합니다.
 * API Key는 서버 측에서만 처리되어 클라이언트에 노출되지 않습니다.
 */
export async function convertUrl(options: ConvertOptions): Promise<AznpResult> {
  const params = new URLSearchParams();
  params.set("url", options.url);
  if (options.mode) params.set("mode", options.mode);
  if (options.maxTokens) params.set("max_tokens", String(options.maxTokens));
  if (options.render) params.set("render", "true");
  if (options.format) params.set("format", options.format);
  // API Key는 서버 프록시로 전달 (헤더로)
  if (options.apiKey) params.set("__apiKey", options.apiKey);

  const res = await fetch(`/api/proxy?${params.toString()}`);

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try {
      const json = await res.json();
      errMsg = json.error || errMsg;
    } catch {
      // ignore
    }
    throw new Error(errMsg);
  }

  const markdown = await res.text();

  return {
    markdown,
    source: res.headers.get("X-AZNP-Source") ?? "unknown",
    plan: (res.headers.get("X-AZNP-Plan") ?? "free") as AznpResult["plan"],
    cacheStatus: res.headers.get("X-AZNP-Cache") ?? "MISS",
    tokenReduction: res.headers.get("X-Token-Reduction") ?? "–",
    markdownTokens: res.headers.get("X-Markdown-Tokens") ?? "–",
    rateLimitRemaining: res.headers.get("X-RateLimit-Remaining") ?? "–",
  };
}
