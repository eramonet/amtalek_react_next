"use client";

import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { FaBath, FaBed, FaCamera, FaRegHeart } from "react-icons/fa";
import HeaderSection from "@/components/headerSection/HeaderSection";
import { useTranslation } from "react-i18next";
import { FaMaximize } from "react-icons/fa6";

export default function Slider({ data, locale, countrie }: any) {
  const { t } = useTranslation("Pages_LandingPage");

  return (
    <>
      <div className="flex items-center justify-between">
        {/* <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          locale={locale}
          countrie={countrie}
        /> */}

        <div
          className={`flex justify-end gap-5 items-center ltr:flex-row-reverse absolute top-0 ltr:right-0 rtl:left-0 ${
            data?.cards?.[0]?.length <= 2 ? "hidden" : "block"
          }`}
        >
          <button className="swiper-button-next bg-transparent text-custome-blue border-2 border-custome-blue hover:scale-105 flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-10 w-10">
            <FaChevronRight className="text-lg font-bold" />
          </button>

          <button className="swiper-button-prev bg-custome-blue text-custome-white border-2 border-custome-blue hover:scale-105 flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-10 w-10">
            <FaChevronLeft className="text-lg font-bold" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        className="relative"
        loop={true}
        speed={1800}
        spaceBetween={30}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 4200,
          disableOnInteraction: false,
        }}
        breakpoints={{
          750: {
            slidesPerView: 1,
          },
          751: {
            slidesPerView: 2,
          },
        }}
      >
        {data?.cards[0].map((slide: any) => (
          <SwiperSlide
            // onClick={() => localStorage.setItem("propertyId", slide.listing_number)}
            key={slide.id}
            className="relative text-custome-blue h-[450px] max-xl:h-[450px] max-lg:h-[440px] max-md:h-[450px]"
          >
            <div className="absolute top-4 z-20 right-4">
              <div className="flex items-center justify-center gap-2 bg-white py-2 px-3 rounded">
                <Image
                  src={slide.broker_details[0].logo}
                  alt={slide.broker_details[0].name}
                  width={1000}
                  height={1000}
                  className="w-8 h-8 rounded-full"
                />
                <h3>{slide.broker_details[0].name}</h3>
              </div>
            </div>
            <div className="absolute top-4 z-20 left-4">
              <div className="flex flex-col gap-1">
                <span className="inline-block rounded bg-custome-yellow px-3 py-1">
                  {t("FeaturedPropertyCard.for_what", {
                    context: slide?.for_what,
                  })}
                </span>
                <span className="flex items-center justify-center gap-2 bg-white rounded px-3 py-1">
                  {slide.images_count} <FaCamera />
                </span>
              </div>
            </div>
            <Link
              href={`properties/${slide.listing_number + "/" + slide.title.replace(/\s+/g, "-")}`}
              className="group"
            >
              <div className="overflow-hidden relative">
                <Image
                  src={slide.primary_image}
                  alt=""
                  className="h-[450px] max-xl:h-[450px] max-lg:h-[440px] max-md:h-[450px] rounded transform transition-transform duration-500 group-hover:scale-105"
                  width={1000}
                  height={1000}
                />
                <div className="absolute bg-transparent-blue w-full h-full top-0 rounded -z-10 transition-opacity duration-300 opacity-0 group-hover:z-10 group-hover:opacity-100">
                  <FaEye className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl" />
                </div>
              </div>
            </Link>
            <div className="relative bottom-36 bg-white rounded w-4/5 p-2 z-10 mx-auto">
              <div className="border-2 border-custome-blue rounded">
                <div className="border-y border-custome-blue py-2 pr-3 pl-6 relative transition duration-300 ease-linear hover:text-custome-white group">
                  <div className="w-0 h-full absolute top-0 right-0 bg-custome-blue group-hover:w-full transition duration-300 ease-linear z-10"></div>
                  <span className="absolute bg-custome-yellow rtl:left-0 ltr:right-0 top-0 p-2 block z-30">
                    <FaRegHeart size={25} color="red" />
                  </span>
                  <h3 className="truncate text-2xl relative z-20 rtl:pl-4 ltr:pr-4">
                    {slide.title}
                  </h3>
                  <h4 className="truncate relative z-20">{slide.address}</h4>
                </div>
                <div className="flex items-center justify-between border-y border-custome-blue py-2 px-3">
                  <h3 className="flex items-center justify-center gap-2 truncate">
                    <FaMaximize />
                    {slide.land_area}
                  </h3>
                  <h3 className="flex items-center justify-center gap-2 truncate">
                    <FaBed /> {slide.bed_rooms_no}
                  </h3>
                  <h3 className="flex items-center justify-center gap-2">
                    <FaBath /> {slide.bath_room_no}
                  </h3>
                </div>
                <p className="py-2 px-3 border-y border-custome-blue truncate">
                  {slide.city} | {slide.region} | {slide.sub_region}
                </p>
                {slide.sale_price && (
                  <p className="py-2 px-3 border-y border-custome-blue truncate">
                    {slide.sale_price} {slide.currency}
                  </p>
                )}
                {slide.rent_price && (
                  <p className="py-2 px-3 border-y border-custome-blue truncate">
                    {slide.rent_price} {slide.currency} / {slide.rent_duration}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
