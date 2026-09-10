# AZNP Home — 수정사항 체크리스트 (TASKS)

> 이 문서는 **`aznp-home`(본 레포)** 의 수정 작업 체크리스트입니다.
> 원본(정본)은 워커 레포(`../aznp-worker/docs/TASKS.md`)의 **3단계 3.7 `../aznp-home`** 절이며, 이 파일은 그 항목을 본 프로젝트 관점으로 옮긴 것입니다.
> 완료 후 체크박스를 `[x]`로 갱신하세요.

## 목표

- **Solana-first** 카피: Solana는 "결제"가 아니라 **Ed25519 서명 신원(Identity)** 으로 소개.
- **convert는 공개 무료**: `format`(markdown/json/toml/yaml/json-ld) · `max_tokens`는 지갑·크레딧 없이 사용 가능.
- 워커의 발견 엔드포인트(`/llms.txt` · `/llms-full.txt` · `/openapi.json`) 및 `README`와 **모순이 없도록** 정합.
- 유료(topup/크레딧/402)는 코드·문서를 **삭제하지 않고** "Out of grant scope"로만 표기.
- 배포(`npm run deploy` / `main` 푸시 → Pages)는 **사용자 승인 후에만** 수행.

## 현재 상태 (aznp-home `main` 기준, 2026-09-10)

- [x] 워커 3.7의 "미착수" 상태 — 아래 항목들이 대부분 아직 반영되지 않음.
- [x] 기반: Next.js 15 App Router + Tailwind v4 + Zustand + TanStack Query, `output: 'export'`.
- [x] i18n(en 기본 · ko) · LanguageSwitcher · 모바일 레이아웃 · About 페이지 등 기반 UI는 구현됨.

---

## 1. 카피(Solana-first) — `src/components` · `src/app`

- [x] **Hero CTA**: `/pricing` → `/docs` (무료 시작). `src/components/Hero.tsx`의 `getStarted` 링크
  - 현재: `<Link href="/pricing">` (기존). `/docs`로 변경 필요
- [x] **Hero 터미널**: unsigned `format=json` · `max_tokens=2000` curl 추가 (워커 README 사용법과 동일). 서명 예시는 "optional identity" 주석으로
  - 현재: 기본 markdown curl + 서명(`mode=summary`) curl 2개만 존재
- [x] **Features f4**: "Stateless Micropayments" / "소액 결제" → Solana Ed25519 **신원**(결제가 앞면이 아님). `f4Stats`의 `$0 Free / Solana USDC`도 신원 카피로
  - 현재: `en` f4Title "Stateless Micropayments", f4Stats "$0 Free / Solana USDC" (결제 중심)
- [x] **Features f6**: `markdown` / `json` / `toml` / `yaml` / `json-ld` + `max_tokens` **전부 무료**. "4 Output Modes" 폐기
  - 현재: f6Title "Flexible Output Formats", f6Stats "4 Output Modes"
- [x] **홈·루트 metadata** (`src/app/page.tsx`, `src/app/layout.tsx`): 무료 convert + Solana identity. 키워드에 Solana 가능
- [x] **Nav**: Docs / API를 Pricing보다 앞 (`src/components/Nav.tsx`)
  - 현재 순서: Home → Pricing → Docs → API → About
- [x] **Footer GitHub**: `https://github.com` → 워커 공개 레포 URL (`https://github.com/keros79/aznp-worker`, 3.1 Public 후 동일 URL). home 레포를 별도로 열면 그 URL도 병기
  - 현재: `Footer.tsx`의 Resources GitHub 링크가 `https://github.com` 그대로

## 2. 요금 UI를 그랜트 밖으로 — `src/components/PricingPreview.tsx` · `src/app/pricing/page.tsx` · `src/i18n/dictionaries.ts`

- [x] **홈 `PricingPreview`**: 무료 convert를 앞면. $20 / $100 3열은 하단 또는 "Out of grant scope" 배지. Pro 피처에서 `Structured JSON Output` · `Summary mode & max_tokens` 제거
  - 현재: 3열(Free / $20 / $100) 그대로, Pro 피처에 "Summary mode & max_tokens", "Structured JSON Output" 포함
- [x] **`/pricing`**: Free 행의 `max_tokens limits` · `Structured JSON Output` 을 ✅ (USDC required 삭제). Pro 전용은 `render` / `summary` / OpenAPI 압축 / Tier 3
  - 현재: Free 행에 `max_tokens limits`·`Structured JSON Output` = "USDC required"로 표기
- [x] **dictionaries `pricing.subtitle`** (en+ko): 충전을 앞면이 아니라 선택·호환으로
  - 현재: en `"Start free, or deposit Solana USDC for instant agent credits."`
- [x] **`/pricing` 상단**에 워커 README와 같은 한 줄: 그랜트 제품은 무료 convert. 크레딧 코드는 유지

## 3. Docs · API 레퍼런스 — `src/app/docs` · `src/i18n/dictionaries.ts`

- [x] **`/docs` quickstart**: 워커 README와 같은 세 curl (기본 markdown / `format=json` / `max_tokens=2000`)
  - 현재: 기본 markdown curl 1개만
- [x] **`docsPage.solanaSub`** (en+ko): `max_tokens`를 충전 조건에서 뺌. 서명은 신원 + 상위 Rate Limit
  - 현재: en `"Enable ... max_tokens limits by topping up $20 USDC and submitting Ed25519 signed headers."`
- [x] **`/docs/api` `queryParams`**: `format` enum = `markdown|json|toml|yaml|json-ld` (전부 Free). `max_tokens` plan = Free. 서명 헤더는 Optional (지금 `required: true`)
  - 현재: `format` plan "markdown / json", `max_tokens` plan "USDC", `render` plan "USDC", 서명 헤더 `required: true`
- [x] **에러 섹션**: 기본 TOML `[error]` + `action_recommendation`. `format=json`이면 JSON. 402 · `POST /v1/topup` JSON 유지 (워커 2.3과 동일)
- [x] **MCP 예정 한 줄**: `@aznp/mcp-server` (stdio + remote). 5단계 착수 전이므로 planned
- [x] **topup / 402 / 지갑 생성 섹션은 삭제하지 않음** — "out of grant scope" 표기만

## 4. Pages 발견 문서 · README (`public/`, 루트)

> 워커 `src/discovery.js`가 정본. Pages 사본이 어긋나면 심사자가 `aznp-home.pages.dev/llms.txt` vs Worker `/llms.txt`에서 모순을 본다.

- [x] `public/llms.txt` ← 워커 `LLMS_TXT`와 정합 (무료 convert, 전 포맷, MCP 예정, topup/Base는 grant 아님)
  - 현재: "Solana Wallet-based Stateless Micropayments" 결제 중심, `format` `markdown|json`만 명시
- [x] `public/llms-full.txt` ← 워커 `LLMS_FULL_TXT`와 정합
  - 현재: topup/402/자동결제 중심, `format` `markdown|json`만
- [x] `public/openapi.json`: `format` enum 확장, convert 인증 불필요, `/v1/topup` 빼거나 description에 out of grant scope (워커 OpenAPI와 같게)
  - 현재: `format` enum `["markdown","json"]`, `/v1/topup` 경로 포함
- [x] `README.md`: 워커 README와 같은 앞면 (무료 convert, Solana 신원). 요금표($20 USDC / Lemon $19)는 **Out of grant scope** 섹션으로 접음
  - 현재: README에 $20/$100 요금표와 Solana 결제·File Bypass 중심 서술

## 5. 클라이언트 갭 (데모가 402 나면 심사자가 막힘) — `src/lib/aznpClient.ts` · `src/components/BotDemo.tsx`

- [x] **`BotDemo.tsx`**: `apiKey: walletAddr` 버그 — 지갑 주소를 `X-API-Key`로 보냄. 데모 기본은 **unsigned convert**. 지갑 토글은 빼거나, 빼기 전엔 호출에 넣지 말 것 (브라우저 지갑 연동은 이번 범위 밖)
  - 현재: `mutationFn`이 `apiKey: walletAddr || undefined` → 지갑 주소를 `X-API-Key`로 전송
- [x] **`aznpClient.ts`**: `format`에 `toml`/`yaml`/`json-ld` 허용. 에러 본문이 TOML일 때 `res.json().error`가 깨지므로 text로 표시. 402 JSON은 기존대로
  - 현재: `format?: "markdown" | "json"`만, 에러는 `res.json()`만 시도
- [x] Lemon / `X-API-Key`를 UI 앞면에 안 씀 (`aznpClient`의 `apiKey` 필드는 남아도 됨)

## 6. 검증

- [x] `../aznp-home`에서 `npm run build` PASS (`output: 'export'` → `out/`)
- [x] 홈 Hero curl이 인증 없는 convert. `/docs/api`에서 `format=json` · `max_tokens` = Free
- [x] `public/llms.txt`에 "No API key, wallet, or signup needed to convert" (또는 동등). Worker `/llms.txt`와 모순 없음
- [ ] 브라우저: `/` `/docs` `/docs/api` `/pricing` — 데스크톱 + 모바일. 요금 페이지가 그랜트 앞면과 모순되지 않음 (로컬에서 `npm run dev` 후 확인 요망)
- [ ] 배포는 사용자 승인 후 (`npm run deploy` 또는 `main` 푸시 → Pages)

---

**문서 끝**
