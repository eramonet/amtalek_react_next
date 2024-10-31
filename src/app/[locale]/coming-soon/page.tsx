"use client";
import { ComingSoon } from "@/allPages/ComingSoon/Coming_soon";
import { useTranslation } from "react-i18next";

export default function ComingSoonPage() {
  // const { t } = useTranslation("Pages_Coming");
  return (
    <main className="min-h-[calc(100vh-136px)]">
      <ComingSoon />
    </main>
  );
}
