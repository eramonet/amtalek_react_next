import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import ToasterProvider from "../ToasterProvider";
import initTranslations from "@/app/i18n";

export default async function FavoritesLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = [
    "SettingsLayout",
    "Pages_PropertyDetails",
    "Pages_Favorites",
    "Pages_Messages",
    "Pages_MyProperties",
    "Pages_LandingPage"
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
