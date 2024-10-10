import ClientWrapper from "@/app/[locale]/ClientWrapper";
import QueryProvider from "@/app/[locale]/QueryProvider";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";

export default async function BrokerDetailsLayout({
  children,
  params: { locale, actor_type, id },
}: {
  children: React.ReactNode;
  params: { locale: string; actor_type: string; id: number };
}) {
  const i18nNamespaces = ["Pages_BrokerDetails"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <>
      <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
        <ClientWrapper>
          <QueryProvider>{children}</QueryProvider>
        </ClientWrapper>
      </TranslationsProvider>
    </>
  );
}
