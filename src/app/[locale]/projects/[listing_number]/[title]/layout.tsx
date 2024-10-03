import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../../../ClientWrapper";
import QueryProvider from "../../../QueryProvider";

export default async function ProjectsDetailsLayout({
  children,
  params: { locale, listing_number },
}: {
  children: React.ReactNode;
  params: { locale: string; listing_number: string };
}) {
  const i18nNamespaces = [
    "Pages_PropertyDetails",
    "MainComponents_SearchForm",
    "Pages_LandingPage",
    "Pages_AllProperties",
    "Pages_ProjectDetails",
  ];
  const { t, resources, i18n } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <ClientWrapper>
        <QueryProvider>{children}</QueryProvider>
      </ClientWrapper>
    </TranslationsProvider>
  );
}
