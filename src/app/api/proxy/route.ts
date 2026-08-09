import { type NextRequest, NextResponse } from "next/server";

const AZNP_URL =
  process.env.NEXT_PUBLIC_AZNP_URL ??
  "https://aznp-proxy.kerberos79.workers.dev";

/**
 * AZNP Worker 프록시 Route Handler
 * 클라이언트로부터 받은 파라미터를 Worker로 중계합니다.
 * Pro API Key는 서버 환경변수(AZNP_PRO_KEY)에서 주입합니다.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const targetUrl = searchParams.get("url");
  if (!targetUrl) {
    return NextResponse.json({ error: "Missing 'url' parameter" }, { status: 400 });
  }

  // URL 유효성 검사
  try {
    new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Worker로 보낼 파라미터 구성
  const workerParams = new URLSearchParams();
  workerParams.set("url", targetUrl);

  const mode = searchParams.get("mode");
  if (mode) workerParams.set("mode", mode);

  const maxTokens = searchParams.get("max_tokens");
  if (maxTokens) workerParams.set("max_tokens", maxTokens);

  const render = searchParams.get("render");
  if (render) workerParams.set("render", render);

  const format = searchParams.get("format");
  if (format) workerParams.set("format", format);

  // API Key: 클라이언트에서 __apiKey로 전달된 경우 사용,
  // 없으면 서버 환경변수(AZNP_PRO_KEY)를 사용
  const clientApiKey = searchParams.get("__apiKey");
  const apiKey = clientApiKey || process.env.AZNP_PRO_KEY;

  const headers: Record<string, string> = {
    "User-Agent": "AZNP-Homepage/1.0",
  };
  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  try {
    const workerRes = await fetch(
      `${AZNP_URL}/?${workerParams.toString()}`,
      { headers }
    );

    // Worker 응답 헤더를 그대로 전달
    const responseHeaders = new Headers();
    const passthroughHeaders = [
      "Content-Type",
      "X-AZNP-Plan",
      "X-AZNP-Source",
      "X-AZNP-Cache",
      "X-Token-Reduction",
      "X-Markdown-Tokens",
      "X-RateLimit-Remaining",
      "Cache-Control",
    ];
    for (const header of passthroughHeaders) {
      const val = workerRes.headers.get(header);
      if (val) responseHeaders.set(header, val);
    }

    const body = await workerRes.text();
    return new Response(body, {
      status: workerRes.status,
      headers: responseHeaders,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Worker request failed" },
      { status: 502 }
    );
  }
}
