import PropertyAside from "@/allPages/PropertyDetails/aside/PropertyAside";
import PropertyDetails from "@/allPages/PropertyDetails/PropertyDetails";
import getData from "@/api/getData";
import initTranslations from "@/app/i18n";

export async function generateMetadata({ params: { locale, listing_number } }: any) {
  const i18nNamespaces = ["Pages_PropertyDetails"];

  const { t } = await initTranslations(locale, i18nNamespaces);
  const data = await getData(`web/property/${listing_number}`, locale, "");

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    openGraph: {
      title: data?.data[0]?.title?.toUpperCase(),
      description: data?.data[0]?.description,
      images: [
        {
          // url: "https://amtalek.com/assets/images/meta-image-amtalek.jpg",
          url: data?.data[0]?.primary_image,
          alt: data?.data[0]?.title?.toUpperCase(),
          width: 800,
          height: 600,
        },
      ],
    },

    // meta: {
    //   name: "description",
    //   content: data?.data[0]?.title?.toUpperCase(),
    // },
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function PropertyDetailsPage({ params: { locale, listing_number } }: any) {
  const i18nNamespaces = [
    "Pages_PropertyDetails",
    "Pages_LandingPage",
    "LayoutComponents",
    "Pages_PropertyDetails",
    "MainComponents_SearchForm",
    "Pages_AllProperties",
  ];
  const { t, resources, i18n } = await initTranslations(locale, i18nNamespaces);
  const data = await getData(`web/property/${listing_number}`, locale, "");

  // console.log("url:" + data?.data[0]?.primary_image, "alt:" + data?.data[0]?.title?.toUpperCase());

  return (
    <>
      <main className="min-h-[calc(100vh-136px)]">
        <div className="site_container text-custome-blue flex justify-between items-start pt-20 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
          <PropertyDetails locale={locale} listing_number={listing_number} />
          <PropertyAside locale={locale} listing_number={listing_number} />
        </div>
      </main>
    </>
  );
}
