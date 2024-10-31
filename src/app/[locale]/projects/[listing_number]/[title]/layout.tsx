import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import ClientWrapper from "../../../ClientWrapper";
import QueryProvider from "../../../QueryProvider";
import getData from "@/api/getData";

// export async function generateMetadata({ params: { locale } }: any) {
//   const i18nNamespaces = ["Pages_PropertyDetails"];

//   const { t } = await initTranslations(locale, i18nNamespaces);

//   return {
//     title: t("tab.title"),
//     description: t("tab.description"),
//     icons: {
//       icon: "/fav-icon.png",
//     },
//   };
// }

export async function generateMetadata({ params: { locale, listing_number } }: any) {
  const i18nNamespaces = ["Pages_ProjectDetails"];

  const { t } = await initTranslations(locale, i18nNamespaces);
  const data = await getData(`web/project-details/${listing_number}`, locale);
  // const allData = data?.data[0];
  // console.log(data?.data[0].name);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    openGraph: {
      title: data?.data[0].name,
      description: data?.data[0].description,
      images: [
        {
          url: data?.data[0]?.primary_image,
          alt: data?.data[0].name,
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
