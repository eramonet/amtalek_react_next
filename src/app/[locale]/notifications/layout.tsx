import TranslationsProvider from "@/components/TranslationsProvider";
import ToasterProvider from "../ToasterProvider";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import initTranslations from "@/app/i18n";

export default async function NotificationsLayout({
  children,
  params: { locale ,notifications},
}: {
  children: React.ReactNode;
  params: { locale: string,notifications:string };
}) {
  const i18nNamespaces = ["SettingsLayout"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  // const csrfToken = headers().get("X-CSRF-Token") || "no_token";

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
