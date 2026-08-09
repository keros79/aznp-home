# AZNP Home (Agentic Zero-Noise Proxy 랜딩페이지)

AZNP(Agentic Zero-Noise Proxy) 공식 랜딩페이지 및 문서 사이트입니다.
회원가입, 비밀번호, API Key 관리 없이 AI 에이전트 솔라나 지갑(USDC) 및 Ed25519 서명 인증으로 동작하는 무키(Stateless) 소액 충전 결제 프로토콜을 지원합니다.
Next.js 15 App Router + Tailwind CSS v4 + Zustand + TanStack Query로 구축되었습니다.

## 🚀 기술 스택
- **Framework**: Next.js 15 (App Router, Static Export `output: 'export'`)
- **Styling**: Tailwind CSS v4 (`@theme` 기반 디자인 토큰)
- **Localization**: i18n (English `en` 기본, 한국어 `ko` 지원, 🌐 언어 스위처 제공)
- **State Management**: Zustand (`i18nStore`, `demoStore`)
- **Data Fetching**: TanStack Query v5
- **Deployment**: Cloudflare Pages (GitHub 저장소 자동 연동 배포)

---

## 💳 과금 및 Solana Wallet Stateless 인증 모델 (v2.0)

AZNP는 **회원가입, 로그인, API Key 관리가 전혀 없는 무키(Stateless) 소액 충전 결제 아키텍처**를 지향합니다.

| 티어 | 최소 입금액 | 부여 크레딧 (요청 횟수) | 건당 단가 | 수수료 비중 (0.7 USDC 기준) | 지원 기능 |
|------|------------|------------------------|-----------|--------------------------------|-----------|
| **Free Tier** | **$0** | **15 RPM / 1,000 RPD** | **$0** | - | Tier 1~2 기본 Markdown 변환 |
| **Pro Agent** | **$20 USDC** | **12,000회** | **$0.00166** (약 2.1원) | **3.5%** | Tier 3 JS 렌더링, Advanced Extraction, 요약, max_tokens |
| **Enterprise** | **$100 USDC** | **80,000회** | **$0.00125** (약 1.6원) | **0.7%** (최소화) | Pro Agent 전체 + 우선 처리 큐 |

### Solana 결제 및 충전 정보
- **충전 엔드포인트**: `POST /v1/topup` (`{ "wallet": "...", "tx_hash": "..." }`)

### 에이전트 인증 헤더 Specification
- `x-wallet-address`: Solana Public Key (Base58)
- `x-timestamp`: Unix Timestamp (초 단위, 5분 이내)
- `x-signature`: `x402:{timestamp}` 메세지에 대한 Ed25519 서명 (Base58)

---

## 🤖 AI 에이전트 전용 표준 규격 (Machine-Readable Specs)

도메인 루트(`/`)에 LLM, AI 에이전트, GPT Actions가 자율 검색/파싱할 수 있는 표준 규격 문서 3종을 제공합니다:

- **[`/llms.txt`](https://aznp-home.pages.dev/llms.txt)**: AI 에이전트 탐색용 글로벌 표준 마크다운 개요 명세
- **[`/llms-full.txt`](https://aznp-home.pages.dev/llms-full.txt)**: 전체 API 파라미터, 헤더, Ed25519 서명 코드 포함 에이전트 가이드
- **[`/openapi.json`](https://aznp-home.pages.dev/openapi.json)**: GPT Actions, Custom GPTs, AutoGen, LangChain 툴 자동 연동용 OpenAPI 3.0 명세

---

## 🛠️ 개발 및 테스트

```bash
# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 정적 빌드 테스트 (output: 'export' → /out 내보내기)
npm run build

# 로컬 Cloudflare Pages 에뮬레이션 테스트
npm run preview
```

---

## ☁️ Cloudflare Pages 배포 방법

본 프로젝트는 **Cloudflare Pages - GitHub 자동 연동**이 완료되어 있습니다.

### 방법 1. GitHub 연동 자동 배포 (기본 동작)
`main` 브랜치에 코드가 푸시되면 Cloudflare Pages가 정적 빌드(`npm run build`) 후 자동으로 글로벌 에지 네트워크로 내보냅니다.
- **Build command**: `npm run build`
- **Build output directory**: `out`

> ⚠️ **주의사항 (Agent Rule)**: 프로덕션 배포 전 반드시 사용자에게 변경 사항을 설명하고 사전 승인을 받아야 합니다.

### 방법 2. Wrangler CLI 직접 배포 (수동 배포 필요 시)

```bash
# 1. 빌드 및 직접 배포
npm run deploy
```

---

## 📁 주요 파일 구조

```
├── public/
│   ├── robots.txt       # AI 크롤러 지침 및 명세 지시어 포함
│   ├── llms.txt         # AI 에이전트 탐색용 개요 명세
│   ├── llms-full.txt    # AI 에이전트 통합 상세 가이드
│   └── openapi.json     # OpenAPI 3.0 규격 명세
├── src/
│   ├── app/
│   │   ├── page.tsx          # 메인 랜딩페이지
│   │   ├── pricing/page.tsx  # 전체 요금 페이지
│   │   ├── docs/             # 문서 및 API 레퍼런스
│   │   ├── globals.css       # 전역 스타일 및 Tailwind @theme
│   │   └── sitemap.ts        # sitemap.xml 생성
│   ├── components/      # UI 컴포넌트 (Hero, HowItWorks, Features, BotDemo, LanguageSwitcher 등)
│   ├── i18n/            # 다국어 사전 (dictionaries.ts - en, ko)
│   ├── lib/             # API 클라이언트 (aznpClient.ts) 및 Providers
│   └── store/           # Zustand 스토어 (i18nStore.ts, demoStore.ts)
├── wrangler.toml        # Cloudflare Pages 설정
└── next.config.ts       # output: 'export' 정적 내보내기 설정
```
