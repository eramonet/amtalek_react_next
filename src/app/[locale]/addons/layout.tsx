"use client";
import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import ToasterProvider from "../ToasterProvider";
import { useEffect, useState } from "react";
import initTranslations from "@/app/i18n";
import Loader from "@/components/loader/Loader";

export default function AddonsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_Packages", "SettingsLayout", "Pages_PropertyDetails"];
  const [resources, setResources] = useState(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const { resources } = await initTranslations(locale, i18nNamespaces);
      setResources(resources);
    };

    loadTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  if (!resources) {
    return <Loader />; // عرض رسالة تحميل إلى أن يتم تحميل الترجمات
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
