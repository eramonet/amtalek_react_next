import PropertyAside from "@/allPages/PropertyDetails/aside/PropertyAside";
import PropertyDetails from "@/allPages/PropertyDetails/PropertyDetails";
import initTranslations from "@/app/i18n";
import Head from "next/head";

export default async function PropertyDetailsPage({ params: { locale, listing_number } }: any) {
  const i18nNamespaces = [
    "Pages_PropertyDetails",
    "MainComponents_SearchForm",
    "Pages_LandingPage",
    "Pages_AllProperties",
  ];
  const { t, resources, i18n } = await initTranslations(locale, i18nNamespaces);

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
