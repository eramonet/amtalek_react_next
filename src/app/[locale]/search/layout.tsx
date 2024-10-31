"use client";

import { Suspense, useEffect, useState } from "react";
import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import initTranslations from "@/app/i18n";
import Loading from "../loading";

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = [
    "Pages_SearchProperty",
    "SearchProperty",
    "Pages_PropertyDetails",
    "MainComponents_SearchForm",
    "Pages_LandingPage",
    "Pages_AllProperties",
    "Pages_ProjectDetails",
  ];

  const [resources, setResources] = useState<any>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      const { resources } = await initTranslations(locale, i18nNamespaces);
      setResources(resources);
    };

    fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  // if (!resources) {
  //   // يمكن وضع معالج تحميل إذا كانت الترجمات لم يتم جلبها بعد
  //   return <div>Loading...</div>;
  // }

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <ClientWrapper>
        <QueryProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </QueryProvider>
      </ClientWrapper>
    </TranslationsProvider>
  );
}

// import TranslationsProvider from "@/components/TranslationsProvider";
// import ClientWrapper from "../ClientWrapper";
// import QueryProvider from "../QueryProvider";
// import initTranslations from "@/app/i18n";

// export default async function layout({
//   children,
//   params: { locale, listing_number },
// }: {
//   children: React.ReactNode;
//   params: { locale: string; listing_number: string };
// }) {
//   const i18nNamespaces = [
//     "Pages_SearchProperty",
//     "SearchProperty",
//     "Pages_PropertyDetails",
//     "MainComponents_SearchForm",
//     "Pages_LandingPage",
//     "Pages_AllProperties",
//     "Pages_ProjectDetails",
//   ];
//   const { t, resources, i18n } = await initTranslations(locale, i18nNamespaces);

//   return (
//     <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
//       <ClientWrapper>
//         <QueryProvider>{children}</QueryProvider>
//       </ClientWrapper>
//     </TranslationsProvider>
//   );
// }
