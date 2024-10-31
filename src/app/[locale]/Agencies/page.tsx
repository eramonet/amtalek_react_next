"use client";
import Agencies from "@/allPages/Agencies/Agencies";

export default function AgenciespPage({ params: { locale } }: any) {
  return <Agencies locale={locale} />;
}
