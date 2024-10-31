import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export async function generateMetadata({ params: { locale } }: any) {
  const i18nNamespaces = ["Pages_Cities"];

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

export default async function CitiesLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_Cities"];
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <main className="min-h-[calc(100vh-136px)]">
      <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
        {children}
      </TranslationsProvider>
    </main>
  );
}
