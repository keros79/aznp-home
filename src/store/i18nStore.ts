import { create } from "zustand";

export type Language = "en" | "ko";

interface I18nState {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  lang: "en", // Default: English
  setLang: (lang) => set({ lang }),
}));
