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
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import { usePostData } from "@/Hooks/usePostData";
import FavoriteButton from "@/components/FavoriteButton";
import React from "react";

export default function Slider({ data, locale, countrie }: any) {
  const { t } = useTranslation("Pages_LandingPage");
  const user = useSelector(userData);
  const { mutate }: any = usePostData(
    true,
    () => {
    },
    true,
    (error: any) => {
      console.error("An error occurred:", error);

      //like from all properties doesn't have onSuccuss and favorites page can only unlike the property, so it has onSuccess
      // onSuccess ? onSuccess(props.slide?.id) : "";
    }
  );
  const dispatchRedux = useDispatch();

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
                  <span className="absolute bg-custome-yellow rtl:left-0 ltr:right-0 top-0 p-2 block z-30 w-11 h-11">
                    {/* {user?.actor_type !== "broker" && (
                      <div
                        className="property__love cursor-pointer bg-accent absolute top-0 right-0 rtl:right-auto rtl:left-0 p-2"
                        onClick={
                          !user?.token
                            ? () => dispatchRedux(setShowLoginPopUp(true))
                            : () =>
                                mutate({
                                  api: `${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE}`,
                                  data: { property_id: slide?.id },
                                  file: undefined,
                                })
                        }
                      >
                        <div className="heart-container" title="Like">
                          {user?.token && (
                            <input
                              defaultChecked={Number(slide?.is_fav) === 1 ? true : false}
                              type="checkbox"
                              className="heart-checkbox"
                              id={slide?.id}
                              onChange={() =>
                                mutate({
                                  api: `${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE}`,
                                  data: { property_id: slide?.id },
                                })
                              }
                            />
                          )}
                          <div className="svg-container">
                            <svg
                              viewBox="0 0 24 24"
                              className="svg-outline"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                            </svg>
                            <svg
                              viewBox="0 0 24 24"
                              className="svg-filled"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                            </svg>
                            <svg
                              className="svg-celebrate"
                              width="100"
                              height="100"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polygon points="10,10 20,20"></polygon>
                              <polygon points="10,50 20,50"></polygon>
                              <polygon points="20,80 30,70"></polygon>
                              <polygon points="90,10 80,20"></polygon>
                              <polygon points="90,50 80,50"></polygon>
                              <polygon points="80,80 70,70"></polygon>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )} */}
                    <FavoriteButton
                      id={slide?.id}
                      is_fav={slide?.is_fav}
                      className={`cursor-pointer bg-accent absolute top-0 right-0 rtl:right-auto rtl:left-0 p-2 bg-custome-yellow ltr:right-0 block z-30 w-11 h-11`}
                    />
                  </span>
                  <h3 className="truncate text-2xl relative z-20 rtl:pl-4 ltr:pr-4">
                    {slide.title}
                  </h3>
                  <h4 className="truncate relative z-20">{slide.address}</h4>
                </div>
                <div className="flex items-center justify-between border-y border-custome-blue py-2 px-3">
                  <h3 className="flex items-center justify-center gap-2 truncate">
                    <FaMaximize />
                    {/* {slide.land_area} */}
                    {t("FeaturedPropertyCard.area_formatted", {
                      area: slide?.land_area,
                    })}
                  </h3>
                  <h3 className="flex items-center justify-center gap-2 truncate">
                    <FaBed />
                    {/* {slide.bed_rooms_no} */}
                    {t("FeaturedPropertyCard.Bedrooms", {
                      count: slide?.bed_rooms_no,
                    })}
                    {/* {t("PropertyCard.price_formatted", {
                context: slide?.for_what,
                sale_price: slide?.sale_price,
                rent_price: slide?.rent_price,
                curr: slide?.currency,
                duration: t(`PropertyCard.${slide?.rent_duration}`),
              })}} */}
                  </h3>
                  <h3 className="flex items-center justify-center gap-2">
                    <FaBath />
                    {/* {slide.bath_room_no} */}
                    {t("FeaturedPropertyCard.Bathrooms", {
                      count: slide?.bath_room_no,
                    })}
                  </h3>
                </div>
                <p className="py-2 px-3 border-y border-custome-blue truncate">
                  {slide.city} | {slide.region} | {slide.sub_region}
                </p>
                {slide.sale_price && (
                  <p className="py-2 px-3 border-y border-custome-blue truncate">
                    {/* {slide.sale_price} {slide.currency} */}
                    {t("PropertyCard.price_formatted", {
                      context: slide?.for_what,
                      sale_price: slide?.sale_price,
                      rent_price: slide?.rent_price,
                      curr: slide?.currency,
                      duration: t(`PropertyCard.${slide?.rent_duration}`),
                    })}
                  </p>
                )}
                {slide.rent_price && (
                  <p className="py-2 px-3 border-y border-custome-blue truncate">
                    {/* {slide.rent_price} {slide.currency} / `{slide.rent_duration}` */}
                    {t("PropertyCard.price_formatted", {
                      context: slide?.for_what,
                      sale_price: slide?.sale_price,
                      rent_price: slide?.rent_price,
                      curr: slide?.currency,
                      duration: t(`PropertyCard.${slide?.rent_duration}`),
                    })}
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
