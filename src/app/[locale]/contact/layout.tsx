// "use client";
import React, { Suspense, useEffect, useState } from "react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import Loading from "../loading";

export async function generateMetadata({ params: { locale } }: any) {
  const i18nNamespaces = ["Pages_ContactUs"];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    canonical: t("tab.canonical"),
    title: t("tab.title"),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function ContactLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_ContactUs", "Pages_LandingPage"];
  // const [resources, setResources] = useState<any>(null);
  const { resources } = await initTranslations(locale, i18nNamespaces);

  // useEffect(() => {

  //   const loadTranslations = async () => {
  //     const { resources } = await initTranslations(locale, i18nNamespaces);
  //     setResources(resources);
  //   };

  //   loadTranslations();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [locale]);

  // if (!resources) {
  //   return <div>Loading...</div>;
  // }

  return (
    <main className="min-h-[calc(100vh-136px)]">
      <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
        <ClientWrapper>
          <QueryProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </QueryProvider>
        </ClientWrapper>
      </TranslationsProvider>
    </main>
  );
}
