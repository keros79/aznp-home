import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import PricingPreview from "@/components/PricingPreview";
import BotDemo from "@/components/BotDemo";

export const metadata: Metadata = {
  title: "AZNP – Agentic Zero-Noise Proxy",
  description:
    "Free public web-to-Markdown converter for AI agents. Convert any URL to clean Markdown with 75~90% token savings — no API key, wallet, or signup. Optional Solana Ed25519 signing is identity, not billing.",
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
