"use client";
import { useEffect, useState } from "react";
import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import ToasterProvider from "../ToasterProvider";
import initTranslations from "@/app/i18n";
import Loading from "./loading";

export default function ProfileLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["SettingsLayout", "Pages_Profile"];
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const { resources } = await initTranslations(locale, i18nNamespaces);
        setResources(resources);
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  if (loading || !resources) {
    return <Loading />;
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

// // "use client"
// import TranslationsProvider from "@/components/TranslationsProvider";
// import ClientWrapper from "../ClientWrapper";
// import QueryProvider from "../QueryProvider";
// import ToasterProvider from "../ToasterProvider";
// import initTranslations from "@/app/i18n";
// import { Suspense } from "react";
// import Loading from "./loading";

// export default async function ProfileLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   const i18nNamespaces = ["SettingsLayout", "Pages_Profile"];
//   const { resources } = await initTranslations(locale, i18nNamespaces);
//   return (
//     <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
//       <ClientWrapper>
//         {/* <TooltipProviderComponents> */}
//         <QueryProvider>
//           <ToasterProvider />
//           <Suspense fallback={<Loading />}>
//             {children}
//           </Suspense>
//         </QueryProvider>
//         {/* </TooltipProviderComponents> */}
//       </ClientWrapper>
//     </TranslationsProvider>
//   );
// }
