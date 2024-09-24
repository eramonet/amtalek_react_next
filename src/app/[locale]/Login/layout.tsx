import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../ClientWrapper";
import QueryProvider from "../QueryProvider";
import { headers } from "next/headers";

export default async function LoginLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["Pages_Login"];
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  // const csrfToken = headers().get("X-CSRF-Token") || "no_token";

  return (
    <main className="min-h-[calc(100vh-136px)]">
      <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
        <ClientWrapper>
          <QueryProvider>{children}</QueryProvider>
        </ClientWrapper>
      </TranslationsProvider>
    </main>
  );
}
