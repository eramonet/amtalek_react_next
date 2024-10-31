"use client";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import React, { useEffect, useState } from "react";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import ToasterProvider from "../ToasterProvider";

export default function MyReceivedOffersLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = [
    "Pages_Packages",
    "SettingsLayout",
    "Pages_PropertyDetails",
    "Pages_MyOffers",
  ];

  const [resources, setResources] = useState<any>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const { resources } = await initTranslations(locale, i18nNamespaces);
      setResources(resources);
    };

    loadTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  if (!resources) {
    return <div>Loading...</div>;
  }

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <ClientWrapper>
        <QueryProvider>
          <ToasterProvider />
          {children}
        </QueryProvider>
      </ClientWrapper>
    </TranslationsProvider>
  );
}
