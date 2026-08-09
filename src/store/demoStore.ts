import { create } from "zustand";

export type AznpPlan = "free" | "pro";

export interface AznpResult {
  markdown: string;
  source: string;
  plan: AznpPlan;
  cacheStatus: string;
  tokenReduction: string;
  markdownTokens: string;
  rateLimitRemaining: string;
}

interface DemoState {
  inputUrl: string;
  apiKey: string;
  plan: AznpPlan;
  result: AznpResult | null;
  isLoading: boolean;
  error: string | null;

  setInputUrl: (url: string) => void;
  setApiKey: (key: string) => void;
  setPlan: (plan: AznpPlan) => void;
  setResult: (result: AznpResult) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  inputUrl: "",
  apiKey: "",
  plan: "free",
  result: null,
  isLoading: false,
  error: null,

  setInputUrl: (url) => set({ inputUrl: url }),
  setApiKey: (key) => set({ apiKey: key }),
  setPlan: (plan) => set({ plan }),
  setResult: (result) => set({ result, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  reset: () =>
    set({ result: null, error: null, isLoading: false }),
}));
