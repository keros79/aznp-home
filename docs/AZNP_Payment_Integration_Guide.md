# AZNP 결제 연동 가이드 (Next.js)

**버전**: 1.0  
**작성일**: 2026년 8월 9일  
**목표**: 사람 사용자(Lemon Squeezy) + AI 에이전트(x402) 모두 지원

---

## 1. 개요

AZNP Pro 결제는 두 가지 경로를 지원합니다.

| 경로 | 대상 | 방식 | 특징 |
|------|------|------|------|
| **A. Lemon Squeezy** | 사람 사용자 | 월 구독 ($19) | 카드 결제, API Key 발급 |
| **B. x402** | AI 에이전트 | 요청당 / 크레딧 | 계정·API Key 없이 USDC 결제 |

이 문서는 **Next.js 홈페이지 + Cloudflare Worker API** 기준으로 두 경로를 모두 구현하는 방법을 정리합니다.

---

## 2. 전체 아키텍처

```
[사람 사용자]
     │
     │  홈페이지 "Upgrade to Pro" 클릭
     ▼
Lemon Squeezy Checkout
     │
     │  Webhook (결제 성공)
     ▼
Next.js API Route  →  KV에 API Key 활성화
     │
     ▼
사용자가 X-API-Key로 AZNP 호출


[AI 에이전트]
     │
     │  API 호출 (API Key 없음)
     ▼
Cloudflare Worker
     │
     ├─ 잔액/크레딧 있음? → 결과 반환
     │
     └─ 없음? → 402 Payment Required (x402)
              │
              ▼
         에이전트 지갑이 USDC 결제
              │
              ▼
         결제 확인 후 Markdown 반환
```

---

## 3. Lemon Squeezy 연동 (사람용)

### 3.1 사전 준비

1. [Lemon Squeezy](https://lemonsqueezy.com) 가입 (한국 가능)
2. Store 생성
3. Product 생성
   - Name: `AZNP Pro`
   - Price: `$19 / month` (Subscription)
4. Webhook 설정
   - URL: `https://your-domain.com/api/webhooks/lemonsqueezy`
   - Events: `subscription_created`, `subscription_updated`, `subscription_cancelled`, `subscription_expired`

### 3.2 환경 변수 (.env.local)

```env
LEMON_SQUEEZY_API_KEY=your_api_key
LEMON_SQUEEZY_STORE_ID=your_store_id
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_secret
LEMON_SQUEEZY_VARIANT_ID=your_variant_id   # Pro 상품 Variant ID
```

### 3.3 체크아웃 버튼 (프론트엔드)

```tsx
// components/UpgradeButton.tsx
"use client";

export default function UpgradeButton() {
  const checkoutUrl = `https://yourstore.lemonsqueezy.com/checkout/buy/${process.env.NEXT_PUBLIC_LEMON_VARIANT_ID}?checkout[email]=`;

  // 또는 Overlay 방식
  const handleClick = () => {
    // Lemon.js 사용 시
    window.createLemonSqueezy?.();
    // 또는 단순 링크로 이동
    window.location.href = checkoutUrl;
  };

  return (
    <button
      onClick={handleClick}
      className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
    >
      Upgrade to Pro — $19/mo
    </button>
  );
}
```

### 3.4 Webhook 처리 (Next.js API Route)

```ts
// app/api/webhooks/lemonsqueezy/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;

function verifySignature(rawBody: string, signature: string): boolean {
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") || "";

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta?.event_name;
  const data = payload.data;
  const attrs = data?.attributes;

  // 사용자 식별 (이메일 또는 custom data)
  const email = attrs?.user_email;
  const subscriptionId = data?.id;
  const status = attrs?.status; // active, cancelled, expired 등

  // Cloudflare KV 또는 D1에 반영
  // 실제 구현 시 Cloudflare API 또는 별도 DB 사용
  if (eventName === "subscription_created" || eventName === "subscription_updated") {
    if (status === "active") {
      await activateProUser({
        email,
        subscriptionId,
        plan: "pro",
        status: "active",
      });
    }
  }

  if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
    await deactivateProUser({ email, subscriptionId });
  }

  return NextResponse.json({ received: true });
}

// 예시: KV에 API Key 저장/활성화
async function activateProUser(user: {
  email: string;
  subscriptionId: string;
  plan: string;
  status: string;
}) {
  // 1. API Key 생성
  const apiKey = `aznp_pro_${crypto.randomBytes(16).toString("hex")}`;

  // 2. Cloudflare KV에 저장 (Workers API 또는 바인딩 사용)
  // await env.API_KEYS.put(apiKey, JSON.stringify({
  //   email: user.email,
  //   subscriptionId: user.subscriptionId,
  //   plan: "pro",
  //   status: "active",
  //   createdAt: new Date().toISOString(),
  // }));

  // 3. 사용자에게 이메일로 API Key 발송 (Resend, SendGrid 등)
  console.log(`Pro activated for ${user.email}, key: ${apiKey}`);
}

async function deactivateProUser(user: { email: string; subscriptionId: string }) {
  // KV에서 해당 subscription의 Key를 inactive로 변경
  console.log(`Pro deactivated for ${user.email}`);
}
```

### 3.5 사용자에게 API Key 보여주는 페이지

```tsx
// app/dashboard/page.tsx (로그인 후)
export default function DashboardPage() {
  // 세션/이메일 기준으로 KV에서 API Key 조회
  const apiKey = "aznp_pro_xxxxx"; // 실제로는 서버에서 조회

  return (
    <div>
      <h1>Your Pro API Key</h1>
      <code className="bg-gray-100 p-4 rounded block">{apiKey}</code>
      <p className="text-sm text-gray-500 mt-2">
        Header: <code>X-API-Key: {apiKey}</code>
      </p>
    </div>
  );
}
```

---

## 4. x402 연동 (AI 에이전트용)

### 4.1 개념

에이전트가 API Key 없이 요청하면:

1. Worker가 `402 Payment Required` 반환
2. 응답 헤더에 결제 정보 포함 (금액, 토큰, 주소, 네트워크)
3. 에이전트 지갑이 USDC로 결제
4. 결제 증명과 함께 재요청
5. Worker가 검증 후 결과 반환

### 4.2 Cloudflare Worker에서 x402 처리 (핵심)

```js
// worker.js 일부 (x402 지원 추가)

const X402_PRICE_USDC = "0.01"; // 요청당 가격 (예시)
const MERCHANT_ADDRESS = "0xYourUSDCAddress"; // USDC 받을 주소
const NETWORK = "base"; // 또는 solana 등

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");
    const apiKey = request.headers.get("X-API-Key");

    // 1. API Key가 있으면 → 기존 Pro 로직
    if (apiKey) {
      const plan = await getPlan(request, env);
      if (plan.plan === "pro") {
        return handleNormalRequest(request, env, ctx, plan);
      }
    }

    // 2. x402 결제 헤더가 있는지 확인
    const paymentSignature = request.headers.get("PAYMENT-SIGNATURE");
    // 또는 x402 표준에 맞는 헤더명 사용

    if (paymentSignature) {
      // 결제 검증
      const isValid = await verifyX402Payment(paymentSignature, env);
      if (isValid) {
        return handleNormalRequest(request, env, ctx, { plan: "x402" });
      }
    }

    // 3. 결제 없음 → 402 반환
    return new Response(
      JSON.stringify({
        error: "Payment Required",
        message: "This endpoint requires payment via x402 or a Pro API Key",
      }),
      {
        status: 402,
        headers: {
          "Content-Type": "application/json",
          // x402 표준 헤더 (실제 스펙에 맞게 조정)
          "PAYMENT-REQUIRED": JSON.stringify({
            amount: X402_PRICE_USDC,
            currency: "USDC",
            network: NETWORK,
            payTo: MERCHANT_ADDRESS,
            description: "AZNP Markdown conversion",
          }),
          "Access-Control-Expose-Headers": "PAYMENT-REQUIRED",
        },
      }
    );
  },
};

async function verifyX402Payment(signature, env) {
  // 실제 구현:
  // 1. facilitator 서비스 호출 또는 온체인 검증
  // 2. Cloudflare Monetization Gateway / Coinbase facilitator 사용 권장
  // 3. 금액, 수신 주소, 네트워크 확인
  return true; // placeholder
}
```

### 4.3 Cloudflare Monetization Gateway 활용 (권장)

Cloudflare가 2026년에 발표한 **Monetization Gateway**를 사용하면 x402 검증을 직접 구현하지 않아도 됩니다.

- Worker 앞에서 Gateway가 결제 검증
- 결제 완료된 요청만 Worker로 전달
- 설정은 Cloudflare Dashboard에서 진행

문서: [Cloudflare Monetization Gateway](https://blog.cloudflare.com/monetization-gateway/)

### 4.4 에이전트 쪽 사용 예시 (참고)

```js
// 에이전트 코드 예시 (x402 클라이언트)
import { x402fetch } from "@x402/fetch"; // 예시 SDK

const response = await x402fetch(
  "https://aznp.example.com/?url=https://example.com",
  {
    wallet: agentWallet, // USDC 잔액이 있는 지갑
    maxAmount: "0.05",   // 최대 지불 한도
  }
);

const markdown = await response.text();
```

---

## 5. Next.js에서 두 경로를 함께 노출하는 UI

```tsx
// app/pricing/page.tsx
export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Pricing</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 사람용 */}
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold">Pro (Human)</h2>
          <p className="text-3xl font-bold mt-2">$19<span className="text-base font-normal">/mo</span></p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>✓ API Key 발급</li>
            <li>✓ 높은 Rate Limit</li>
            <li>✓ JS Rendering, Summary 등</li>
            <li>✓ 월간 토큰 절감 리포트</li>
          </ul>
          <UpgradeButton />
        </div>

        {/* 에이전트용 */}
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold">Pay-per-request (Agents)</h2>
          <p className="text-3xl font-bold mt-2">~$0.01<span className="text-base font-normal">/req</span></p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>✓ API Key 불필요</li>
            <li>✓ x402 (USDC) 결제</li>
            <li>✓ 계정 생성 없이 바로 사용</li>
            <li>✓ 에이전트 자동화에 최적</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            에이전트는 <code>Accept</code> / x402 헤더로 자동 결제합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## 6. 구현 우선순위 체크리스트

### Phase 1 — 사람 결제 (바로 가능)
- [ ] Lemon Squeezy 가입 및 상품 생성
- [ ] 체크아웃 버튼 홈페이지에 배치
- [ ] Webhook API Route 작성
- [ ] 결제 성공 시 API Key 발급 + KV 저장
- [ ] 대시보드에서 Key 확인 가능하게

### Phase 2 — 에이전트 결제
- [ ] Cloudflare Monetization Gateway 또는 x402 facilitator 연동
- [ ] Worker에 402 응답 로직 추가
- [ ] 결제 검증 후 결과 반환 테스트
- [ ] 문서에 에이전트용 사용법 추가

### Phase 3 — 통합
- [ ] Pricing 페이지에 두 옵션 모두 표시
- [ ] 사용량/수익 대시보드 (사람 구독 + x402 수익)
- [ ] Rate Limit / 남용 방지 보완

---

## 7. 보안 및 주의사항

1. **Webhook 서명 검증** 필수 (Lemon Squeezy)
2. **API Key**는 절대 프론트엔드에 하드코딩하지 말 것
3. **x402** 결제 검증은 가급적 Cloudflare/Coinbase facilitator에 맡길 것
4. 한국 판매자: Lemon Squeezy 정산은 Payoneer/PayPal 사용
5. 국내 소득세·부가세 신고는 본인 책임

---

## 8. 참고 링크

- [Lemon Squeezy Docs](https://docs.lemonsqueezy.com)
- [Cloudflare Monetization Gateway](https://blog.cloudflare.com/monetization-gateway/)
- [x402 Protocol](https://developers.cloudflare.com/agents/tools/payments/x402/)
- [Cloudflare Agents Payments](https://developers.cloudflare.com/agents/tools/payments/)

---

**문서 끝**

이 가이드를 따라가면  
- 사람은 Lemon Squeezy로 편하게 구독하고  
- AI 에이전트는 x402로 계정 없이 바로 결제  

하는 구조가 완성됩니다.
`}