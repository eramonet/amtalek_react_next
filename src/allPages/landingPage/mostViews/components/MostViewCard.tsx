// "use client";
import Image from "next/image";
import { FaBoltLightning, FaMaximize } from "react-icons/fa6";
import { FaBath, FaBed, FaCamera } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function MostViewCard({ card, t }: any) {
  // const { t } = useTranslation("Pages_LandingPage");

  return (
    <div className="overflow-hidden">
      <div className="bg-white group   relative  overflow- shadow-md bg-bg h-fit col-span-1 bg-  hover-translate-y-2  transition-all duration-500 ease-in-out">
        {/* **************************************************************************** */}
        <div
          className="relative border-t-bg border-x-bg border-2 w-full h-[250px] max-w-full rounded group"
          // onClick={() => localStorage.setItem("propertyId", card.listing_number)}
        >
          <div className="">
            <h3 className="absolute top-0 right-3 text-custome-white bg-custome-blue py-3 px-2">
              <FaBoltLightning size={22} />
            </h3>

            <div className="absolute top-2 left-3 py-1 px-2 rounded flex items-center justify-center gap-1 bg-custome-white text-custome-blue">
              <h3>{card.images_count}</h3>
              <FaCamera />
            </div>
          </div>
          <Link href={`properties/${card.listing_number}/${card.title.replace(/\s+/g, "-")}`}>
            <Image
              src={card.primary_image}
              alt={card.primary_image}
              width={1000}
              height={1000}
              className="w-full h-full object-cover  cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
            />
          </Link>
        </div>
        {/* **************************************************************************** */}
        <div className="py-2 px-3 bg-custome-white  h-fit  w-full text-custome-blue">
          <div>
            <h4 className="truncate pl-2 rtl:pl-0 rtl:pr-2 mt-5 mb-1 font-bold text-xl border-l-2 ml-3 rtl:ml-0 rtl:mr-3 border-l-custome-blue rtl:border-l-0 rtl:border-r-2 rtl:border-r-custome-blue  h-fit leading-">
              {card.property_type}
            </h4>
            {/* <h3 className="truncate">{card.broker_details[0].name}</h3> */}
            {/* **************************************************************************** */}
            <div className="p-3 h-fit">
              <p className="truncate text-2xl leading-7 font-medium block cll:text-xl md:text-lg ">
                {card.title}
              </p>
              <h3 className="truncate text-sm opacity-80 mt-1">{card.address}</h3>
            </div>
            {/* **************************************************************************** */}
            <div className="truncate w-full border-custome-black border-y-1 flex items-center gap-2 p-2 text-sm">
              <IoLocationOutline />{" "}
              {/* <span className="text-start truncate">{props.card?.country}</span> |{" "} */}
              <span className="text-start truncate">{card?.city}</span> |{" "}
              <span className="truncate">{card?.region}</span>
              {card?.sub_region && (
                <>
                  {" "}
                  | <span className="truncate">{card?.sub_region}</span>
                </>
              )}
            </div>
          </div>
          {/* **************************************************************************** */}
          <div className="">
            <div className="">
              <h3>{t("MostViewCard.Start_From")}</h3>
              {card.sale_price && (
                <p className="">
                  {card.sale_price} {card.currency}
                </p>
              )}
              {/* *********************************************************************************************************************** */}
              {card.rent_price && (
                <p className="">
                  {card.rent_price} {card.currency} /{" "}
                  {card.rent_duration === "daily" ? "يوم" : "شهر"}
                  {/* {t("MostViewCard.price_formatted", {
                    context: card?.for_what,
                    sale_price: card?.sale_price,
                    rent_price: card?.rent_price,
                    curr: card?.currency,
                    duration: card?.rent_duration,
                  })} */}
                </p>
              )}
            </div>
            {/* **************************************************************************** */}
            <div className="px-3 py-5 flex justify-between items-start h-fit w-full gap-1">
              <h5 className="flex items-center justify-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
                <FaMaximize />
                {/* <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faMaximize} /> */}
                {t("MostViewCard.area_formatted", {
                  area: card?.land_area,
                })}
              </h5>
              <h5 className="flex items-center justify-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
                <FaBed />
                {/* <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faBed} />{" "} */}
                {t("MostViewCard.Bedrooms", {
                  count: card?.bed_rooms_no,
                })}
              </h5>
              <h5 className="flex items-center justify-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
                <FaBath />
                {t("MostViewCard.Bathrooms", {
                  count: card?.bath_room_no,
                })}
              </h5>
            </div>
          </div>
          {/* **************************************************************************** */}
        </div>
      </div>
    </div>
  );
}
