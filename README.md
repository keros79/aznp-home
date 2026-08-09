# AZNP Home (Agentic Zero-Noise Proxy 랜딩페이지)

AZNP(Agentic Zero-Noise Proxy) 랜딩페이지 및 문서 사이트입니다.
Next.js 15 App Router + Tailwind CSS v4 + Zustand + TanStack Query로 구축되었습니다.

## 🚀 기술 스택
- **Framework**: Next.js 15 (App Router, Static Export `output: 'export'`)
- **Styling**: Tailwind CSS v4 (`@theme` 기반 디자인 토큰)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query v5
- **Deployment**: Cloudflare Pages (`/out` 정적 자산 배포)

---

## 🛠️ 개발 및 테스트

```bash
# 개발 서버 실행
npm run dev

# 빌드 테스트 (정적 HTML /out 내보내기)
npm run build

# 로컬 Cloudflare Pages 로컬 에뮬레이션 테스트
npm run preview
```

---

## ☁️ Cloudflare Pages 배포 방법

### 방법 1. CLI 직접 배포 (권장 & 가장 빠름)

```bash
# 1. Cloudflare 로그인 (최초 1회)
npx wrangler login

# 2. 빌드 및 배포
npm run deploy
```

---

### 방법 2. Cloudflare Dashboard 대시보드 자동 연결

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 접속 → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. GitHub 저장소(`aznp-home`) 선택
3. 빌드 설정 지정:
   - **Framework preset**: `Next.js (Static)` 또는 `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. **Save and Deploy** 클릭

---

### 방법 3. GitHub Actions CI/CD 자동 배포

저장소 `main` 브랜치에 코드를 푸시하면 `.github/workflows/deploy.yml`이 실행되어 자동으로 배포됩니다.

#### 필수 GitHub Secrets 설정:
1. GitHub 저장소 → **Settings** → **Secrets and variables** → **Actions**
2. 다음 Secret 추가:
   - `CLOUDFLARE_API_TOKEN`: Cloudflare Dashboard에서 생성한 Pages 편집 권한 API 토큰
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 계정 ID

---

## 📁 주요 파일 구조

```
├── public/
│   ├── robots.txt       # Content-Signal 지시어 포함
│   └── llms.txt         # AI 에이전트용 웹사이트 문서
├── src/
│   ├── app/
│   │   ├── page.tsx          # 메인 랜딩페이지
│   │   ├── pricing/page.tsx  # 전체 요금 페이지
│   │   ├── docs/             # 문서 및 API 레퍼런스
│   │   ├── globals.css       # 전역 스타일 및 Tailwind @theme
│   │   └── sitemap.ts        # sitemap.xml 생성
│   ├── components/      # UI 컴포넌트
│   ├── lib/             # API 클라이언트 및 Providers
│   └── store/           # Zustand 스토어
├── wrangler.toml        # Cloudflare Pages 설정
└── next.config.ts       # output: 'export' 설정
```
