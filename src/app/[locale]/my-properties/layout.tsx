import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import ToasterProvider from "../ToasterProvider";

export async function generateMetadata({ params: { locale } }: any) {
  const i18nNamespaces = ["Pages_MyProperties"];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function MypropertiesLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = [
    "Pages_MyProperties",
    "LayoutComponents",
    "Pages_LandingPage",
    "SettingsLayout",
    "Pages_MyProperties",
    "Pages_PropertyDetails",
    "Pages_AllProperties",
  ];
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <ClientWrapper>
        {/* <TooltipProviderComponents> */}
        <QueryProvider>
          <ToasterProvider />
          {children}
        </QueryProvider>
        {/* </TooltipProviderComponents> */}
      </ClientWrapper>
    </TranslationsProvider>
  );
}
