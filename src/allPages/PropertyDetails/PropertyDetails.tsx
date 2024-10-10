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
import Heading from "@/components/Heading";
import { NoItemsMessage } from "@/SubComponents";
import Comments from "@/MainComponents/Comments";
import Head from "next/head";

export default async function PropertyDetails({ locale, listing_number }: any) {
  const data = await getData(`web/property/${listing_number}`, locale);
  const allData = data.data;

  const i18nNamespaces = ["Pages_PropertyDetails"];
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <section className="Property__Details--content w-[66%] flex flex-col gap-8 ss:gap-5 clg:w-full">
      {!allData[0] ? (
        <Loader />
      ) : (
        <div className="Property__general--info w-full flex flex-col gap-4">
          {/* t={t} i18n={i18n} */}

          <Head>
            <title>{allData[0].name} - Broker Details</title>
            <meta
              name="description"
              content={`View details about ${allData[0].name}, a broker in our system.`}
            />
            <meta property="og:title" content={allData[0].name} />
            <meta
              property="og:description"
              content={`Check out properties and projects by ${allData[0].name}.`}
            />
            <meta property="og:image" content={allData[0].image_url} />
          </Head>

          <LoginPopUp />

          <PropertyHeader data={allData[0]} />

          {/* <PropertySlider data={allData[0]} style={"mt-10"} /> */}
          <UnderSlider data={allData[0]} locale={locale} t={t} />

          <Share data={allData[0]} type="property" style={"mt-8"} file={"Pages_PropertyDetails"} />

          <PropertyViews data={allData[0]} locale={locale} t={t} />

          <PropertyDescription data={allData[0]} locale={locale} t={t} />

          <PropertyDetailsPoint data={allData[0]} locale={locale} t={t} />

          <PropertyAminities data={allData[0]} locale={locale} t={t} />

          <PropertyLocation data={allData[0]} locale={locale} t={t} />

          <PropertyVideo data={allData[0]} locale={locale} />

          <SimilarProperty data={allData[0]} locale={locale} />

          {allData[0]?.comments?.length > 0 && (
            <div className="Property__COMMENTS -mt-14 mb-14">
              <Heading>{t("headings.COMMENTS")}</Heading>
              {allData[0]?.comments?.length === 0 ? (
                ""
              ) : (
                <Comments data={allData[0]?.comments} locale={locale} />
              )}
            </div>
          )}

          <SendMessage data={allData[0]} locale={locale} t={t} />
        </div>
      )}
    </section>
  );
}
