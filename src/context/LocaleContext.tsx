"use client";
import { createContext, useContext, ReactNode } from "react";

// إنشاء LocaleContext
const LocaleContext = createContext<string | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

// مقدم لـ LocaleContext
export function LocaleProvider({ locale, children }: { locale: string; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
