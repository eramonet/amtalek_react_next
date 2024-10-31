import React from "react";
import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import ToasterProvider from "../ToasterProvider";
import initTranslations from "@/app/i18n";

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

export default async function layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_Packages", "SettingsLayout", "Pages_PropertyDetails"];
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
