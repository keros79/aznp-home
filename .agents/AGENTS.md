# AZNP Home – Agent Rules

## 프로젝트 개요
AZNP(Agentic Zero-Noise Proxy) 공식 랜딩페이지.
Next.js 15 App Router + Tailwind CSS v4 + Zustand + TanStack Query v5.

## 기술 스택 & 규칙

### Next.js
- **App Router** 사용. `pages/` 디렉터리 절대 사용 금지.
- **Static Export**: `next.config.ts`에서 `output: "export"` 설정 적용. `/out` 디렉터리로 정적 HTML 내보내기.
- 서버 컴포넌트를 기본으로 사용. 클라이언트 상태가 필요한 경우에만 `"use client"` 지시어 추가.
- `params`는 항상 `Promise`로 받아 `await`으로 풀어야 함 (Next.js 15 breaking change).
- `fetch`는 Next.js 확장 fetch를 사용 (캐싱, `revalidate` 옵션 활용).
- Route Handlers는 `src/app/api/` 하위에 `route.ts`로 작성.

### Tailwind CSS v4
- `tailwind.config.js` 없음. `src/app/globals.css`의 `@theme` 블록에서 디자인 토큰 정의.
- 유틸리티 클래스는 JSX 안에서 직접 사용. `@apply` 최소화.
- 컬러 팔레트: `--color-indigo-*`, `--color-purple-*`, `--color-cyan-*`.

### Zustand
- Store는 `src/store/` 디렉터리에 위치.
- 클라이언트 전용: `"use client"` 파일에서만 import.
- 파일명: `{feature}Store.ts` 형식.

### TanStack Query v5
- `QueryClient`는 `src/lib/providers.tsx`에서 생성.
- 훅은 `src/lib/` 또는 해당 컴포넌트 가까이에 위치.
- `useQuery`, `useMutation` 사용. `useInfiniteQuery`는 필요 시에만.

### 컴포넌트
- `src/components/` 하위에 PascalCase 파일명.
- 서버 컴포넌트: `export default function ComponentName()`
- 클라이언트 컴포넌트: 파일 최상단 `"use client"` + `export default function ComponentName()`
- Props 타입은 인라인 인터페이스 또는 별도 `type Props = {}`로 정의.

### API 프록시 규칙
- Worker 엔드포인트: `https://aznp-proxy.kerberos79.workers.dev`
- 환경변수: `NEXT_PUBLIC_AZNP_URL` (공개), `AZNP_PRO_KEY` (서버 전용)
- Pro API Key는 절대 클라이언트에 노출하지 말 것. `/api/proxy` Route Handler를 통해서만 주입.

### 파일 구조
```
src/
  app/
    layout.tsx         # 루트 레이아웃
    page.tsx           # 메인 랜딩 (/)
    globals.css        # 전역 스타일 + Tailwind @theme
    api/proxy/route.ts # AZNP Worker 프록시
    pricing/page.tsx   # 요금 페이지
    docs/
      layout.tsx       # 사이드바 레이아웃
      page.tsx         # 문서 개요
      api/page.tsx     # API 레퍼런스
    sitemap.ts
  components/          # UI 컴포넌트
  store/               # Zustand stores
  lib/                 # 유틸리티, providers, API 클라이언트
public/
  robots.txt
  llms.txt
```

## 배포 규칙
- **배포 전 사용자 승인 필수**: `npm run deploy`, `wrangler pages deploy`, `wrangler deploy` 등 프로덕션 환경으로 배포하는 모든 명령어/작업은 **반드시 사용자에게 사전에 변경 사항을 설명하고 명시적 승인을 얻은 후에만 실행**해야 합니다.
- 승인 없이 임의로 배포 명령어를 실행하지 말 것.

## 코딩 컨벤션
- TypeScript strict 모드 유지.
- `any` 타입 사용 금지.
- 컴포넌트는 named export 대신 default export 사용.
- CSS 클래스 정렬: 레이아웃 → 크기 → 색상 → 타이포 → 인터랙션 순서.
- 한국어 주석 허용.
