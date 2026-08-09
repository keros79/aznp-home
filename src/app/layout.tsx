import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aznp-home.pages.dev"),
  title: {
    default: "AZNP – Agentic Zero-Noise Proxy",
    template: "%s | AZNP",
  },
  description:
    "AI 에이전트를 위한 초경량 Markdown 프록시. 웹페이지의 노이즈를 제거하고 75~90% 토큰을 절감하세요.",
  keywords: [
    "AZNP",
    "Agentic Zero-Noise Proxy",
    "AI proxy",
    "Markdown proxy",
    "token reduction",
    "Cloudflare Workers",
    "LLM",
    "AI agent",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://aznp-home.pages.dev",
    siteName: "AZNP",
    title: "AZNP – Agentic Zero-Noise Proxy",
    description:
      "AI 에이전트를 위한 초경량 Markdown 프록시. 평균 75~90% 토큰 절감, 전 세계 Cloudflare Edge 서빙.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AZNP – Agentic Zero-Noise Proxy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AZNP – Agentic Zero-Noise Proxy",
    description: "AI 에이전트를 위한 초경량 Markdown 프록시. 평균 75~90% 토큰 절감.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AZNP – Agentic Zero-Noise Proxy",
  description:
    "AI 에이전트를 위한 초경량 Markdown 프록시 서비스. 웹페이지를 Markdown으로 변환하고 75~90%의 토큰을 절감합니다.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "19",
      priceCurrency: "USD",
      billingIncrement: "month",
    },
  ],
  url: "https://aznp-home.pages.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${outfit.variable} ${firaCode.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
