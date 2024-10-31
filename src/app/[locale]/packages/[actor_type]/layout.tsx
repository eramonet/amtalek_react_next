import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";

export async function generateMetadata({ params: { locale } }: any) {
  const i18nNamespaces = ["Pages_Packages"];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function PackagesActorLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // "LayoutComponents",
  const i18nNamespaces = ["Pages_Packages", "Pages_Brokers"];
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      {children}
    </TranslationsProvider>
  );
}
