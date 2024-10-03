"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./ItemSlider.css";
import React from "react";

function ItemSlider({ data, style, fullWidth }: any) {
  const uniqueID = useId();
  const { i18n } = useTranslation();

  const sliders =
    data?.sliders?.length > 0 && data?.primary_image
      ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
      : data?.sliders?.length > 0
      ? [...data?.sliders]
      : [{ id: uniqueID, src: data?.primary_image }];

  const sliderRef = useRef<any>(null);

  const [slideIndex, setSlideIndex] = useState<any>(0);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slidePrev();
    }
  };

  return (
    <div className={`slider w-full h-auto ${style}`}>
      <div className="relative">
        {sliders.length > 5 && (
          <button
            className="prev-slider-btn absolute left-2 top-1/2 -translate-y-1/2 bg-transparent text-secondary border-2 hover:scale-105 border-secondary flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px] cursor-pointer z-10 asm:hidden"
            onClick={handlePrev}
          >
            <FontAwesomeIcon className="rotate-180 text-lg font-bold" icon={faChevronRight} />
          </button>
        )}

        <Swiper
          ref={sliderRef}
          className="ItemSlider__top--slider w-full mb-9"
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
        >
          {sliders.map((slide: any) => (
            <SwiperSlide key={slide?.id}>
              <div
                className={`img-slider-wrapper w-full ${
                  fullWidth
                    ? "max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
                    : "max-h-[450px] h-[450px]"
                } overflow-hidden round cursor-pointer`}
              >
                <Image
                  width={1000}
                  height={1000}
                  className="w-full h-full rounded"
                  src={slide?.src}
                  alt={slide?.id}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {sliders.length > 5 && (
          <button
            className="next-slider-btn absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-grey border-2 border-secondary hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px] cursor-pointer z-10 asm:hidden"
            onClick={handleNext}
          >
            <FontAwesomeIcon className="text-lg font-bold" icon={faChevronRight} />
          </button>
        )}
      </div>

      <div className="bottom-slider relative">
        {sliders.length > 0 && (
          <Swiper
            className="ItemSlider__bottom-slider"
            spaceBetween={10}
            slidesPerView={sliders.length > 4 ? 5 : sliders.length}
          >
            {sliders.map((slide: any) => (
              <SwiperSlide key={slide?.id}>
                <div className="slide__img--wrapper aspect-square border-secondary round max-h-[250px] max-w-[220px] asm:h-auto cursor-pointer">
                  <Image
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover round"
                    src={slide?.src}
                    alt={slide?.id}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default ItemSlider;
