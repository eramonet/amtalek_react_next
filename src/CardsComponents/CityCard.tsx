"use client";
import { memo } from "react";
// import LangLink from "../MainComponents/LangLink";
import Image from "next/image";
import LangLink from "@/components/LangLink";
import { usePathname } from "next/navigation";
import useSessionStorageState from "use-session-storage-state";

const CityCard = memo(function CityCard({ city, navSlider, t }: any) {
  // ${city?.title?.replace(/\s/g, "-")}

  const defaultFormData = {
    keyword: "",
    country: "1",
    city: "",
    region: "",
    sub_region: "",
    property_type: "",
    min_beds: "",
    min_bathes: "",
    purpose: "",
    min_area: "",
    max_area: "",
    min_price: "",
    max_price: "",
    finishing: "",
    currency: "",
    amenities: [] as any,
    price_arrange_keys: "" as any,
    priority_keys: "" as any,
    page: 1,
    fc: "",
    // srt: "",
  };
  const pathname = usePathname();
  const [formData, setFormData] = useSessionStorageState("formData", {
    defaultValue: defaultFormData,
  });

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  return (
    <LangLink
      state={""}
      //! r must be -1 to search in cites and neglect searching in regions in the search page, whereas we check from the last to the first (r => c => cr)
      // to={`/search?k=&cr=-1&c=${city?.id}&r=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=&page=1`}
      // localStorage.getItem("country") ||
      to={`/search/عقارات`}
      // {`/search?k=&cr=${"-1"}&c=${
      //   city?.id
      // }&r=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
      //!for width in sm, the card either be for slider or grid (w-full)
      className={`sm:w-full group overflow-hidden round ${
        navSlider
          ? "h-[250px] w-[360px]  "
          : city?.type === "main_slider"
          ? " h-[528px] w-full hover:-translate-y-2   "
          : "h-[250px] col-span-1 hover:-translate-y-2   "
      } my- bg- relative transition-all duration-500 ease-in-out shadow-md `}
    >
      <div className="h-full" onClick={() => setFormData({ ...defaultFormData, city: city?.id })}>
        <Image
          width={1000}
          height={1000}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-110 trns "
          src={city?.image}
          alt={city?.title}
        />
        <div className="CityCard__gradient--background absolute inset- bottom-0 w-full h-4/5 bg-gradient-to-t opacity- from-secondary/70  flex justify-center items-center flex-col gap- z-40 group-hover:translate-y-1 translate-y-5 transition-all duration-300 ease-in-out text-bg">
          <h3 title={city?.title} className="text-3xl clg:text-xl font-medium truncate">
            {city?.title}
          </h3>

          <h4 className="rtl:rtl text-2xl ">
            {t("CityCard.total_count_formatted", {
              count: city?.properties,
            })}
          </h4>
          <h3 className="rtl:rtl mt-3">
            {t("CityCard.rent_count_formatted", {
              count: city?.rent_properties,
            })}
          </h3>
          <h3 className="rtl:rtl ">
            {t("CityCard.sale_count_formatted", {
              count: city?.sale_properties,
            })}
          </h3>
        </div>
      </div>
    </LangLink>
  );
});

export default CityCard;
