import React from "react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import ToasterProvider from "../ToasterProvider";


export async function generateMetadata({ params: { locale } }: any) {
  const i18nNamespaces = ["Pages_Projects"];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}


export default async function ProjectsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_Brokers", "Pages_Projects"];
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <ToasterProvider />
      {children}
    </TranslationsProvider>
  );
}
