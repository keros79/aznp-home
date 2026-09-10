import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aznp-home.pages.dev"),
  title: {
    default: "AZNP – Agentic Zero-Noise Proxy",
    template: "%s | AZNP",
  },
  description:
    "Free public web-to-Markdown converter for AI agents. Convert any URL to clean Markdown — no API key, wallet, or signup. Optional Solana Ed25519 signing is identity, not billing.",
  keywords: [
    "AZNP",
    "Agentic Zero-Noise Proxy",
    "AI proxy",
    "Markdown proxy",
    "free markdown converter",
    "token reduction",
    "Cloudflare Workers",
    "LLM",
    "AI agent",
    "Solana",
    "Solana identity",
    "Ed25519",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://aznp-home.pages.dev",
    siteName: "AZNP",
    title: "AZNP – Agentic Zero-Noise Proxy",
    description:
      "Free public web-to-Markdown converter for AI agents. No API key or wallet needed. Optional Solana Ed25519 signing is identity, not billing.",
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
    description: "Free public web-to-Markdown converter for AI agents. No API key or wallet needed.",
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
    "Free public web-to-Markdown converter for AI agents. Convert any URL to clean Markdown without an API key, wallet, or signup.",
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
