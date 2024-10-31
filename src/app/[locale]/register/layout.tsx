import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import initTranslations from "@/app/i18n";
import ToasterProvider from "../ToasterProvider";

export async function generateMetadata({ params: { locale, name } }: any) {
  const i18nNamespaces = ["Pages_Register"];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function RegisterLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_Register"];
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <main className="min-h-[calc(100vh-136px)]">
      <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
        <ClientWrapper>
          <ToasterProvider />
          <QueryProvider>{children}</QueryProvider>
        </ClientWrapper>
      </TranslationsProvider>
    </main>
  );
}
