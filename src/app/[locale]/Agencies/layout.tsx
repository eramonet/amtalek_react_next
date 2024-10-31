"use client";

import { useEffect, useState } from "react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Loader from "@/components/loader/Loader";

export default function AgenciesLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_Brokers"];
  const [resources, setResources] = useState<any>(null);

  useEffect(() => {
    // تحميل الترجمة عند تحميل المكون
    const loadTranslations = async () => {
      const { resources } = await initTranslations(locale, i18nNamespaces);
      setResources(resources);
    };

    loadTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  // عرض محتوى عند انتظار تحميل الموارد
  if (!resources) {
    return <Loader/>;
  }

  return (
    <main className="min-h-[calc(100vh-136px)]">
      <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
        {children}
      </TranslationsProvider>
    </main>
  );
}
