import { dir } from "i18next";
import TopHeader from "@/components/topHeader/TopHeader";
import Header from "@/components/header/Header";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Cairo, Roboto } from "next/font/google";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import i18nConfig from "../../../i18nConfig";

const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
// **************************************************************************

export const metadata = {
  icons: {
    icon: "/fav-icon.png",
  },
};
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const fontClass = locale === "ar" ? cairo.className : roboto.className;
  const i18nNamespaces = ["LayoutComponents", "Pages_LandingPage"];
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang={locale} dir={dir(locale)}>
      <head></head>
      <body className={fontClass}>
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
          {/* <ClientWrapper> */}
          <TopHeader locale={locale} t={t} />
          <Header t={t} locale={locale} />
          {children}
          <Footer locale={locale} t={t} />
          {/* </ClientWrapper> */}
        </TranslationsProvider>
      </body>
    </html>
  );
}
