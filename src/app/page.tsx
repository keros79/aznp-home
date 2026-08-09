import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import PricingPreview from "@/components/PricingPreview";
import BotDemo from "@/components/BotDemo";

export const metadata: Metadata = {
  title: "AZNP – Agentic Zero-Noise Proxy",
  description:
    "AI 에이전트를 위한 초경량 Markdown 프록시. 웹페이지의 노이즈를 제거하고 75~90% 토큰을 절감하세요. Cloudflare Edge 서빙.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <BotDemo />
      <PricingPreview />
    </>
  );
}
