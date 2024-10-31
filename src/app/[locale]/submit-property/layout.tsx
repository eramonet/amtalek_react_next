"use client";
import React, { Suspense, useEffect, useState } from "react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import ToasterProvider from "../ToasterProvider";
import Loading from "../loading";
import Loader from "@/components/loader/Loader";

export default function SubmitPropertyLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["SettingsLayout", "Pages_SubmitProperty"];
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
    // يمكن إضافة واجهة انتظار (loading) هنا حتى يتم تحميل البيانات
    return <Loader/>;
  }

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <ClientWrapper>
        <QueryProvider>
          <ToasterProvider />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </QueryProvider>
      </ClientWrapper>
    </TranslationsProvider>
  );
}
