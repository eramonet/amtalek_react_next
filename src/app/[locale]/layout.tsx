/* eslint-disable @next/next/no-page-custom-font */
// import NextNProgress from "nextjs-progressbar";
import { dir } from "i18next";
import TopHeader from "@/components/topHeader/TopHeader";
import Header from "@/components/header/Header";
// import "./globals.css";
// import "./heart-animation.css";
import "./SASS/styles.scss";
// import "@/app/[locale]/SASS/styles.scss";

import Footer from "@/components/footer/Footer";
import { Cairo, Roboto } from "next/font/google";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import i18nConfig from "../../../i18nConfig";
import LayoutProvider from "./LayoutProvider";
import QueryProvider from "./QueryProvider";
import ClientWrapper from "./ClientWrapper";
import ScrollToTop from "../../components/header/ScrollToTop";
import ToasterProvider from "./ToasterProvider";
import TooltipProviderComponents from "./TooltipProviderComponents";
import AuthGuard from "./AuthGuard";
import HeaderTopMenu from "@/components/topHeader/HeaderTopMenu";
import useUserProfile from "@/api/useUserProfile";
// import { useRouter } from "next/router";
// import LogOutPopUp from "@/MainComponents/LogOutPopUp";
// import Navbar from "@/components/header/Navbar";
import LoginPopUp from "./../../allPages/login/LoginPopUp";
import LogOutPopUp from "@/MainComponents/LogOutPopUp";
import { Suspense } from "react";
import Loading from "./loading";

const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
// **************************************************************************

export async function generateMetadata({ params: { locale } }: any) {
  const i18nNamespaces = ["Pages_LandingPage"];

  const { t, i18n } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    openGraph: {
      title: t("tab.title"),

      description: i18n.language.startsWith("ar")
        ? "عقارات في مصر: اكتشف أفضل عقارات للبيع والإيجار في مصر. استعرض العروض المتنوعة من الشقق والمنازل لتلبية جميع احتياجاتك في السوق المصري.  ,عقارات في مصر ,عقارات للبيع في مصر, عقارات للايجار في مصر "
        : "AMTALEK is your all in ONE place to manage & track your Real-Estate company, Let's help you Sell and Rent your property and manage your leads.",
      images: [
        {
          url: "https://amtalek.com/assets/images/meta-image-amtalek.jpg",
          alt: "AMTALEK Meta Image",
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

// export function generateStaticParams() {
//   return i18nConfig.locales.map((locale) => ({ locale }));
// }
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const fontClass = locale === "ar" ? cairo.className : roboto.className;
  const i18nNamespaces = [
    "LayoutComponents",
    "Pages_LandingPage",
    "MainComponents_SearchForm",
    "Pages_Finish",
    "SettingsLayout",
    "FriendsProfileLayout",
    "Pages_About",
    "Pages_AllProperties",
    "Pages_BrokerDetails",
    "Pages_Brokers",
    "Pages_CategoryDetails",
    "Pages_Cities",
    "Pages_Coming",
    "Pages_PropertyDetails",
  ];

  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const { userProfileDataOutlet, userData }: any = useUserProfile(locale);
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <meta charSet="UTF-8" />

        <meta name="facebook-domain-verification" content="mweksz5mf6ici4tmt838s3ytl4tt7r" />
        <meta name="google-adsense-account" content="ca-pub-6367957675332720" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <!-- logo page --> */}
        <link rel="icon" type="image/svg+xml" href="/assets/images/fav-icon.png" />
        {/* <!-- font google --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* <!-- to show ads for cdn amp --> */}
        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
          defer
        ></script>

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6367957675332720"
          crossOrigin="anonymous"
          defer
        ></script>

        <meta name="google-play-app" content="app-id=eramo.amtalek" />

        <meta
          property="og:description"
          content="عقارات في مصر: اكتشف أفضل عقارات للبيع والإيجار في مصر. استعرض العروض المتنوعة من الشقق والمنازل لتلبية جميع احتياجاتك في السوق المصري.  ,عقارات في مصر ,عقارات للبيع في مصر, عقارات للايجار في مصر"
        />
        <meta property="og:type" content="Website" />
        <meta property="og:site_name" content="Amtalek" />
        <meta property="og:title" content="عقارات في مصر - عقارات لإيجار وبيع في مصر" />
        <meta property="og:url" content="https://www.amtalek.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@amtalekcom" />
        <meta
          name="twitter:title"
          content="AMTALEK is your all in ONE place to manage & track your Real-Estate company, Let's help you Sell and Rent your property and manage your leads."
        />
        <meta itemProp="url" content="https://www.amtalek.com" />
        <link href="https://www.amtalek.com" rel="canonical" />
        <link href="https://www.amtalek.com" rel="alternate" hrefLang="ar" />
        <link href="https://www.amtalek.com/en" rel="alternate" hrefLang="en" />

        <meta itemProp="image" content="https://amtalek.com/assets/images/meta-image-amtalek.jpg" />
        <meta property="fb:app_id" content="859549992423067" />

        <meta name="yandex-verification" content="e7376701c9d99d86" />

        <meta name="author" content="e-RAMO For Digital Solutions" />

        <meta name="publish_date" property="og:publish_date" content="2024-07-01T12:00:00-0600" />

        <meta itemProp="image" content="https://amtalek.com/assets/images/meta-image-amtalek.jpg" />

        <meta
          property="og:image"
          content="https://amtalek.com/assets/images/meta-image-amtalek.jpg"
        />
        <meta
          name="description"
          content="عقارات في مصر: اكتشف أفضل عقارات للبيع والإيجار في مصر. استعرض العروض المتنوعة من الشقق والمنازل لتلبية جميع احتياجاتك في السوق المصري.  ,عقارات في مصر ,عقارات للبيع في مصر, عقارات للايجار في مصر "
        />
        <meta
          name="keywords"
          content="عقارات في مصر, عقارات للبيع في مصر, عقارات للايجار في مصر, شقق للبيع في القاهرة, شقق للبيع في التجمع الخامس, شقق للايجار في مدينة نصر, عقارات في مدينة نصر"
        />
        <meta name="publisher" content="https://www.amtalek.com" />

        <meta name="distribution" content="global" />

        <link rel="alternate" hrefLang="ar" href="https://www.amtalek.com" />

        {/* <script>
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-KWTCFKJG");
  </script> */}
      </head>
      <body className={fontClass}>
        {/* <body> */}
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
          <ClientWrapper>
            <TooltipProviderComponents>
              <QueryProvider>
                <ToasterProvider />
                <AuthGuard>
                  <Suspense fallback={<Loading />}>
                    <LayoutProvider>
                      {/* <HeaderTopMenu t={t} /> */}
                      <TopHeader locale={locale} t={t} />
                      <Header t={t} locale={locale} />
                      {/* <NextNProgress /> */}
                      {/* <Navbar /> */}
                    </LayoutProvider>

                    <LoginPopUp />
                    <LogOutPopUp />

                    {children}

                    <LayoutProvider>
                      <Footer locale={locale} t={t} />
                      <ScrollToTop />
                    </LayoutProvider>
                  </Suspense>
                </AuthGuard>
              </QueryProvider>
            </TooltipProviderComponents>
          </ClientWrapper>
        </TranslationsProvider>
      </body>
    </html>
  );
}
