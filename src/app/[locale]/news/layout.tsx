import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export default async function NewsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_News", "Pages_NewsDetails"];
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <main className="min-h-[calc(100vh-136px)]">
      <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
        {children}
      </TranslationsProvider>
    </main>
  );
}
