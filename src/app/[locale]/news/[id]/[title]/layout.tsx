import getData from "@/api/getData";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import React from "react";



export async function generateMetadata({ params: { locale, id } }: any) {
  const i18nNamespaces = ["Pages_NewsDetails"];

  const { t } = await initTranslations(locale, i18nNamespaces);
  const respons = await getData(`web/${process.env.NEXT_PUBLIC_SINGLE_NEW_DETAILS}${id}`, locale);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    openGraph: {
      title: respons?.data[0].title,
      description: respons?.data[0].latest_news[0].description,
      images: [
        {
          url: respons?.data[0].image,
          alt: respons?.data[0].title,
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
export default async function NewsDetailsLayout({
  children,
  params: { locale, title, id },
}: {
  children: React.ReactNode;
  params: { locale: string; title: string; id: number };
}) {
  const i18nNamespaces = ["Pages_NewsDetails"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      {children}
    </TranslationsProvider>
  );
}
