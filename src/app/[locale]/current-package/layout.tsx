import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import ToasterProvider from "../ToasterProvider";
import initTranslations from "@/app/i18n";

export default async function CurrentPackageLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_CurrentPackage", "SettingsLayout", "Pages_PropertyDetails"];
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
