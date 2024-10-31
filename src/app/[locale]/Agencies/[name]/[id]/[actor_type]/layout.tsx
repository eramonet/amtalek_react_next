import getData from "@/api/getData";
import ClientWrapper from "@/app/[locale]/ClientWrapper";
import QueryProvider from "@/app/[locale]/QueryProvider";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";

export async function generateMetadata({ params: { locale, actor_type, id } }: any) {
  const i18nNamespaces = ["Pages_BrokerDetails"];

  const { t } = await initTranslations(locale, i18nNamespaces);
  const data = await getData(
    `web/${process.env.NEXT_PUBLIC_SINGLE_BROKER_DETAILS}${id}/${actor_type}`,
    locale,
    ""
  );
  return {
    title: t("tab.title"),
    description: t("tab.description"),
    openGraph: {
      title: data?.data[0].name,
      description: data?.data[0].description,
      images: [
        {
          url: data?.data[0].logo,
          alt: data?.data[0].name,
          width: 800,
          height: 600,
        },
      ],
    },
    icons: {
      icon: "/fav-icon.png",
    },
  };
}
export default async function BrokerDetailsLayout({
  children,
  params: { locale, actor_type, id },
}: {
  children: React.ReactNode;
  params: { locale: string; actor_type: string; id: number };
}) {
  const i18nNamespaces = ["Pages_BrokerDetails", "MainComponents_SearchForm"];
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
