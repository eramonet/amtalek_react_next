import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export default async function PackagesLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // "LayoutComponents",
  const i18nNamespaces = ["Pages_Packages", "Pages_Brokers"];
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      {children}
    </TranslationsProvider>
  );
}