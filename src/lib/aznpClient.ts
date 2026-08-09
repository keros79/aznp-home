import type { AznpResult } from "@/store/demoStore";

export interface ConvertOptions {
  url: string;
  apiKey?: string;
  mode?: "auto" | "summary";
  maxTokens?: number;
  render?: boolean;
  format?: "markdown" | "json";
}

const AZNP_URL =
  process.env.NEXT_PUBLIC_AZNP_URL ??
  "https://aznp-proxy.kerberos79.workers.dev";

/**
 * AZNP Worker API를 직접 호출합니다. (output: 'export' 정적 내보내기 환경)
 */
export async function convertUrl(options: ConvertOptions): Promise<AznpResult> {
  const params = new URLSearchParams();
  params.set("url", options.url);
  if (options.mode) params.set("mode", options.mode);
  if (options.maxTokens) params.set("max_tokens", String(options.maxTokens));
  if (options.render) params.set("render", "true");
  if (options.format) params.set("format", options.format);

  const headers: Record<string, string> = {};
  if (options.apiKey) {
    headers["X-API-Key"] = options.apiKey;
  }

  const res = await fetch(`${AZNP_URL}/?${params.toString()}`, { headers });

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
