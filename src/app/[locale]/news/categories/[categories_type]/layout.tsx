import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";

export async function generateMetadata({ params: { locale, categories_type } }: any) {
  const i18nNamespaces = ["Pages_CategoryDetails"];

  const { t } = await initTranslations(locale, i18nNamespaces);
  const decodedName = decodeURIComponent(categories_type);
  return {
    title: t("tab.title", { details: decodedName }),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function layout({
  children,
  params: { locale, categories_type },
}: {
  children: React.ReactNode;
  params: { locale: string; categories_type: string };
}) {
  const i18nNamespaces = [
    "Pages_News",
    "Pages_NewsDetails",
    "Pages_CategoryDetails",
    "Pages_PropertyDetails",
  ];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <main className="min-h-[calc(100vh-136px)]">
      <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
        {children}
      </TranslationsProvider>
    </main>
  );
}
