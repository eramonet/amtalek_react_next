import getData from "@/api/getData";
import AsideForm from "./components/AsideForm";
import PropertyOwner from "./components/PropertyOwner";
import AdsProperty from "@/components/ADS/AdsProperty";
import SearchForm from "@/MainComponents/SearchForm";
import LatestProperties from "./components/LatestProperties";
import FeaturedPropertiesAside from "./components/FeaturedPropertiesAside";
import Loader from "@/components/loader/Loader";

export default async function PropertyAside({ listing_number, locale }: any) {
  const data = await getData(`web/property/${listing_number}`, locale);
  const allData = data.data;
  return (
    <section className="Property__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-10">
      {!allData ? (
        <Loader />
      ) : (
        <>
          <PropertyOwner data={allData[0]} locale={locale} />
          <AdsProperty />
          <AsideForm
            params={{
              vendor_id: allData[0]?.broker_details?.[0]?.id,
              broker_type: allData[0]?.broker_details[0]?.broker_type,
            }}
            api={`https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_SEND_MESSAGE_TO_BROKER}`}
            type="offer"
            Bgcolor="light"
            // t={t}
            propID={allData[0]?.id}
          />
          <div className="w-full clg:hidden">
            <SearchForm type={"asideForm"} locale={locale} showOptions />
          </div>
          <div className="w-full hidden clg:block">
            <SearchForm type={"bigForm"} locale={locale} showOptions home={true} />
          </div>
          <LatestProperties />
          <FeaturedPropertiesAside />
        </>
      )}
    </section>
  );
}