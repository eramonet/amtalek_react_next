// import initTranslations from "@/app/i18n";
import PropertyHeader from "./components/PropertyHeader";
import getData from "@/api/getData";
import PropertySlider from "./components/PropertySlider";
import initTranslations from "@/app/i18n";
import UnderSlider from "./components/UnderSlider";
import Share from "@/components/Share";
import PropertyViews from "./components/PropertyViews";
import PropertyDescription from "./components/PropertyDescription";
import PropertyDetailsPoint from "./components/PropertyDetailsPoint";
import PropertyAminities from "./components/PropertyAminities";

import PropertyVideo from "./components/PropertyVideo";
import PropertyLocation from "./components/PropertyLocation";
import SimilarProperty from "./components/SimilarProperty";
import Loader from "@/components/loader/Loader";
import SendMessage from "./components/SendMessage";
import LoginPopUp from "@/allPages/login/LoginPopUp";

export default async function PropertyDetails({ locale, listing_number }: any) {
  const data = await getData(`web/property/${listing_number}`, locale);
  const allData = data.data;

  const i18nNamespaces = ["Pages_PropertyDetails"];
  const { t, i18n } = await initTranslations(locale, i18nNamespaces);

  return (
    <section className="Property__Details--content w-[66%] flex flex-col gap-8 ss:gap-5 clg:w-full">
      {!allData[0] ? (
        <Loader />
      ) : (
        <div className="Property__general--info w-full flex flex-col gap-4">
          {/* t={t} i18n={i18n} */}

          <LoginPopUp />

          <PropertyHeader data={allData[0]} />

          <PropertySlider data={allData[0]} style={"mt-10"} />

          <UnderSlider data={allData[0]} locale={locale} t={t} />

          <Share data={allData[0]} type="property" style={"mt-8"} file={"Pages_PropertyDetails"} />

          <PropertyViews data={allData[0]} locale={locale} t={t} />

          <PropertyDescription data={allData[0]} locale={locale} t={t} />

          <PropertyDetailsPoint data={allData[0]} locale={locale} t={t} />

          <PropertyAminities data={allData[0]} locale={locale} t={t} />

          <PropertyLocation data={allData[0]} locale={locale} t={t} />

          <PropertyVideo data={allData[0]} locale={locale} />

          <SimilarProperty data={allData[0]} locale={locale} />

          <SendMessage data={allData[0]} locale={locale} t={t} />
        </div>
      )}
    </section>
  );
}
