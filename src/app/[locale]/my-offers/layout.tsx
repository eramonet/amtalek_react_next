import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../ClientWrapper";
import ToasterProvider from "../ToasterProvider";
import QueryProvider from "../QueryProvider";
import initTranslations from "@/app/i18n";

export async function generateMetadata({ params: { locale } }: any) {
  const i18nNamespaces = ["Pages_MyProperties"];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function MyOffersLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_MyProperties", "SettingsLayout", "Pages_PropertyDetails"];
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <ClientWrapper>
        {/* <TooltipProviderComponents> */}
        <QueryProvider>
          <ToasterProvider />
          {children}
        </QueryProvider>
        {/* </TooltipProviderComponents> */}
      </ClientWrapper>
    </TranslationsProvider>
  );
}
