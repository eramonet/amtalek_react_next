"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import SearchForm from "@/MainComponents/SearchForm";

export default function Hero({ data, locale }: any) {
  const { t } = useTranslation("Pages_LandingPage");

  return (
    <section className="h-[calc(560px)] alg:h-fit w-full relative flex alg:flex-col alg:justify-start alg:items-center justify-end items-start ">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {data?.map((slide: any) => (
          <SwiperSlide key={slide.id} className="relative h-[560px]">
            <Image
              src={slide.image}
              alt={slide.title}
              className="w-full h-[560px]"
              width={1000}
              height={1000}
            />
            <div className="absolute max-lg:text-center z-10 top-3/4 -translate-y-1/2 right-0 pr-14 text-custome-white">
              <h1 className="text-5xl">
                {slide.title} <br /> {slide.subtitle}
              </h1>
              <p className="text-base my-8">{slide.description}</p>
              <Link
                className="w-fit block mb-16 px-6 py-2 max-lg:mx-auto bg-custome-yellow text-custome-blue hover:bg-transparent border-custome-yellow transition-all duration-300 border rounded hover:text-custome-yellow"
                href={slide.link || "#"}
              >
                {t("Hero.CTA_Text")}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`hero__right--header-form  h-full w-[40vw] min-w-[610px] xxxl:min-w-[410px] md:min-w-[300px] alg:w-full alg:h-fit relative z-30 `}
      >
        <SearchForm home type={"bigForm"} locale={locale} />
      </div>
    </section>
  );
}
