"use client";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useId } from "react";
import { useSelector } from "react-redux";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function PropertySlider({ data, style, fullWidth }: any) {
  const uniqueID = useId();
  const lng = useSelector(lang);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);

  const sliders =
    data?.sliders?.length > 0 && data?.primary_image
      ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
      : data?.sliders?.length > 0
      ? [...data?.sliders]
      : [{ id: uniqueID, src: data?.primary_image }];

  return (
    <div className={`slider w-full h-auto bg-custome-white ${style}`}>
      <div className="relative">
        {sliders?.length > 3 && (
          <button
            onClick={() => mainSwiper.slidePrev()}
            className="prev-slider-btn absolute !bg-bg left-2 top-1/2 -translate-y-1/2 bg-transparent text-custome-blue border-2 hover:scale-105 border-custome-blue flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px] cursor-pointer z-10 asm:hidden"
          >
            <FontAwesomeIcon className="rotate-180 text-lg font-bold" icon={faChevronRight} />
          </button>
        )}
        <Swiper
          className={`ItemSlider__top--slider w-full bg- min-h-fit md:w-full mb-9`}
          navigation
          loop
          autoplay
          modules={[Navigation, Thumbs, Autoplay]}
          thumbs={{ swiper: thumbsSwiper }}
          onSwiper={setMainSwiper}
        >
          {sliders?.map((slide) => (
            <SwiperSlide key={slide?.id}>
              <div
                className={`img-slider-wrapper w-full ${
                  fullWidth
                    ? " max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
                    : " max-h-[450px] h-[450px]"
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
        {sliders?.length > 3 && (
          <button
            onClick={() => mainSwiper.slideNext()}
            className="next-slider-btn absolute right-2 top-1/2 -translate-y-1/2 bg-custome-blue text-grey border-2 border-custome-blue hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px] cursor-pointer z-10 asm:hidden"
          >
            <FontAwesomeIcon className="text-lg font-bold" icon={faChevronRight} />
          </button>
        )}
      </div>
      <div className="bottom-slider bg- relative">
        {sliders?.length > 0 && (
          <Swiper
            className="ItemSlider__bottom-slider"
            modules={[Thumbs]}
            loop
            slidesPerView={4} // لضمان عرض 3 صور مصغرة على الأقل
            spaceBetween={10}
            centeredSlides={true}
            onSwiper={setThumbsSwiper}
            // watchSlidesProgress={true} // لتتبع الصورة النشطة
          >
            {/*  ${
                    thumbsSwiper && index === thumbsSwiper.activeIndex ? "translate-y-[-10px]" : ""
                    } */}
            {sliders?.map((slide, index) => (
              <SwiperSlide key={slide?.id}>
                <div
                  className={`slide__img--wrapper !w-full aspect-square border-custome-blue round !h-full max-h-[250px] max-w-[220px] asm:h-auto cursor-pointer transition-transform duration-300 
                   
                    `}
                >
                  <Image
                    width={1000}
                    height={1000}
                    className="w-full !h-full object-cover round"
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

export default PropertySlider;
