"use client";
import ShareOptions from "@/allPages/landingPage/latestProperties/components/ShareOptions";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaBath, FaBed, FaCalendarAlt, FaCamera, FaEye, FaRegHeart } from "react-icons/fa";
import { FaBoltLightning, FaMaximize } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

export default function PropertyCard({ card, locale }: any) {
  const { t, i18n } = useTranslation("Pages_PropertyDetails");

  return (
    <div
      className={`text-custome-blue rounded ${
        card.priority === "featured" ? "bg-custome-yellow bg-opacity-40" : "bg-custome-venice"
      }`}
    >
      <div className="relative">
        <div className="">
          <div className="absolute top-2 right-3 py-1 px-2 rounded flex items-center justify-center gap-1 bg-custome-white text-custome-blue truncate">
            <h3>{card.images_count}</h3>
            <FaCamera />
          </div>

          <h3 className="absolute top-2 left-3 py-1 px-2 rounded bg-custome-yellow text-custome-blue truncate">
            {card.for_what}
          </h3>
          {/* *********************************************************************************************************************** */}
        </div>
        {/* <Image
          src={card.primary_image}
          alt={card.title}
          width={1000}
          height={1000}
          className="w-full"
        /> */}
        <Link
          className="group"
          href={`properties/${card.listing_number}/${card.title.replace(/\s+/g, "-")}}`}
        >
          {/* *********************************************************************************************************************** */}

          {/* start image */}
          <div className="overflow-hidden relative">
            <Image
              src={card.primary_image}
              alt=""
              // className="h-[450px] max-xl:h-[450px] max-lg:h-[440px] max-md:h-[450px] rounded transform transition-transform duration-500 group-hover:scale-105"
              className="w-full h-60 transform transition-transform duration-500 group-hover:scale-105 "
              width={1000}
              height={1000}
            />

            {/* start hover and show eye */}
            <div className="absolute bg-transparent-blue w-full h-full top-0 rounded -z-10 transition-opacity duration-300 opacity-0 group-hover:z-10 group-hover:opacity-100">
              <FaEye className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl" />
            </div>
            {/* end hover and show eye */}
          </div>
          {/* end image */}
        </Link>
        {/* *********************************************************************************************************************** */}
        <div className="absolute bg-custome-blue text-custome-white bottom-0 right-0 rounded px-2 py-1">
          {t("PropertyCard.price_formatted", {
            context: card?.for_what,
            sale_price: card?.sale_price,
            rent_price: card?.rent_price,
            curr: card?.currency,
            duration: card?.rent_duration,
          })}
        </div>
      </div>

      {/* ********************************************************************************************* */}
      <div className="">
        <div className="p-3">
          <h3 className="truncate text-lg">{card.property_type}</h3>
          <p className="truncate text-2xl">{card.title}</p>
          <p className="truncate text-sm">{card.address}</p>
          <div className="flex justify-start items-center gap-1">
            <IoLocationOutline />
            <span className="truncate ">
              {card.city} | {card.region} | {card.sub_region}
            </span>
          </div>
        </div>

        <div className="">
          <Link
            href={`properties/${card.title.replace(/\s+/g, "-")}`}
            className="broker__details px-3 pb-3 pt-1 flex justify-start items-center  h-fit gap-3 w-fit"
          >
            <Image
              src={card?.broker_details?.[0]?.logo}
              alt={card?.broker_details?.[0]?.name}
              width={1000}
              height={1000}
              className="w-8 aspect-square cursor-pointer object-cover rounded-full border-[1px] border-secondary"
            />
            <p className="text-sm">{card?.broker_details?.[0]?.name}</p>
          </Link>
        </div>
        {/* *********************************************************************************************************************** */}
        {/* <div className="flex items-center justify-between py-2 px-3">
          <h3 className="truncate">{card.land_area}</h3>
          <h3 className="flex items-center justify-center gap-2 truncate">
            <FaBed /> {card.bed_rooms_no}
          </h3> */}
        {/* *********************************************************************************************************************** */}
        {/* <h3 className="flex items-center justify-center gap-2">
            <FaBath /> {card.bath_room_no}
          </h3>
        </div> */}
        <div className=" p-3 flex justify-between items-start h-fit w-full gap-1">
          <h5 className="flex items-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
            <FaMaximize />
            {t("PropertyCard.area_formatted", {
              area: card?.land_area,
            })}
          </h5>
          <h5 className="flex items-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
            <FaBed />{" "}
            {t("PropertyCard.Bedrooms", {
              count: card?.bed_rooms_no,
            })}
          </h5>
          <h5 className="flex items-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
            <FaBath />{" "}
            {t("PropertyCard.Bathrooms", {
              count: card?.bath_room_no,
            })}
          </h5>
        </div>
        {/* ********************************************************************************************* */}
        <hr />
        {/* ********************************************************************************************* */}
        <div className="py-4 px-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaCalendarAlt />
            {card.created_at}
          </div>
          {/* ********************************************************************************************* */}
          <div className="flex items-center gap-3">
            <FaRegHeart color="red" size={24} />
            {/* <div className="flex justify-end gap- items-center mt-"> */}
            {/* <FaShareAlt size={24} /> */}

            <div className="group w-fit h-auto relative">
              {/* <FaShareNodes /> */}
              <ShareOptions card={card} locale={locale} />
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
