import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";

export default async function NewsDetailsLayout({
  children,
  params: { locale, title, id },
}: {
  children: React.ReactNode;
  params: { locale: string; title: string; id: number };
}) {
  const i18nNamespaces = ["Pages_NewsDetails"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      {children}
    </TranslationsProvider>
  );
}
