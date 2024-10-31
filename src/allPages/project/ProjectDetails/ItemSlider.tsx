// "use client";

// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import Slider from "react-slick";
// import { useId } from "react";
// import Image from "next/image";
// import { useTranslation } from "react-i18next";

// function ItemSlider({ data, style, fullWidth }: any) {
//   const uniqueID = useId();
//   const { i18n } = useTranslation();
//   const [nav1, setNav1] = useState<any>();
//   const [nav2, setNav2] = useState<any>();

//   function SampleNextArrow(props: any) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "red" }}
//         onClick={onClick}
//       />
//     );
//   }

//   function SamplePrevArrow(props: any) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "green" }}
//         onClick={onClick}
//       />
//     );
//   }

//   const sliders =
//     data?.sliders?.length > 0 && data?.primary_image
//       ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
//       : data?.sliders?.length > 0
//       ? [...data?.sliders]
//       : [{ id: uniqueID, src: data?.primary_image }];

//   let commonSettings = {
//     draggable: true,
//     swipeToSlide: true,
//     touchMove: true,
//     swipe: true,
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     pauseOnHover: true,
//     focusOnSelect: true,
//     slidesToScroll: 1,
//     initialSlide: 0,
//   };

//   let responsiveSettings = {
//     responsive: [
//       {
//         breakpoint: 900,
//         settings: {
//           // slidesToShow: Math.min(sliders.length, 3),
//           // settings: {
//           slidesToShow: 1, // عرض صورة واحدة عند الشاشات الصغيرة لتجنب المساحة الكبيرة
//           // },
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className={`slider max-w-[1200px] w-full h-auto overflow-hidden mx-auto ${style}`}>
//       <div className="relative">
//         {sliders?.length > 5 && (
//           <button
//             onClick={() => nav1.slickPrev()}
//             className="prev-slider-btn absolute !bg-bg left-2 top-1/2 -translate-y-1/2 bg-transparent text-secondary border-2 hover:scale-105 border-secondary flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px] cursor-pointer z-10"
//           >
//             <FontAwesomeIcon className="rotate-180 text-lg font-bold" icon={faChevronRight} />
//           </button>
//         )}
//         <Slider
//           // className="w-full"
//           className={`ItemSlider__top--slider !w-full min-h-fit md:w-full mb-9`}
//           asNavFor={nav2}
//           ref={(slider1) => setNav1(slider1)}
//           fade={i18n.language === "ar" ? false : true}
//           autoplay
//           nextArrow={<SampleNextArrow />}
//           prevArrow={<SamplePrevArrow />}
//           {...commonSettings}
//           slidesToShow={1} // عرض صورة واحدة فقط
//           slidesToScroll={1} // التمرير صورة واحدة في كل مرة
//         >
//           <div className="">
//             {sliders?.map((slide) => (
//               <div
//                 key={slide?.id}
//                 className={`img-slider-wrapper w-full ${
//                   fullWidth
//                     ? "max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
//                     : "max-h-[450px] h-[450px]"
//                 } overflow-hidden rounded`}
//               >
//                 <Image
//                   width={1000}
//                   height={1000}
//                   className="w-full h-full object-cover rounded"
//                   src={slide?.src}
//                   alt={slide?.id}
//                 />
//               </div>
//             ))}
//           </div>
//         </Slider>

//         {/* <Slider
//           className={`ItemSlider__top--slider w-full bg- min-h-fit md:w-full mb-9`}
//           asNavFor={nav2}
//           ref={(slider1) => setNav1(slider1)}
//           fade={i18n.language === "ar" ? false : true}
//           autoplay
//           nextArrow={<SampleNextArrow />}
//           prevArrow={<SamplePrevArrow />}
//           {...commonSettings}
//           slidesToShow={1}
//         >
//           {sliders?.map((slide) => (
//             <div
//               key={slide?.id}
//               className={`img-slider-wrapper w-full ${
//                 fullWidth
//                   ? "max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
//                   : "max-h-[450px] h-[450px]"
//               } overflow-hidden rounded cursor-pointer`}
//             >
//               <Image
//                 width={1000}
//                 height={1000}
//                 className="w-full h-full rounded object-cover"
//                 src={slide?.src}
//                 alt={slide?.id}
//               />
//             </div>
//           ))}
//         </Slider> */}
//         {sliders?.length > 5 && (
//           <button
//             onClick={() => nav2.slickNext()}
//             className="next-slider-btn absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-grey border-2 border-secondary hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px] cursor-pointer z-10"
//           >
//             <FontAwesomeIcon className="text-lg font-bold" icon={faChevronRight} />
//           </button>
//         )}
//       </div>
//       <div className="bottom-slider bg- relative">
//         {sliders?.length > 0 && (
//           <Slider
//             asNavFor={nav1}
//             ref={(slider2: any) => setNav2(slider2)}
//             {...commonSettings}
//             {...responsiveSettings}
//             slidesToShow={Math.min(sliders.length, 5)}
//             className="ItemSlider__bottom-slider"
//             centerMode={true}
//             centerPadding="0px"
//             touchThreshold={500}
//           >
//             {sliders?.map((slide) => (
//               <div
//                 key={slide?.id}
//                 className="slide__img--wrapper w-full aspect-square border-secondary rounded !h-full max-h-[250px] max-w-[220px] cursor-pointer"
//               >
//                 <Image
//                   width={1000}
//                   height={1000}
//                   className="w-full h-full object-cover rounded"
//                   src={slide?.src}
//                   alt={slide?.id}
//                 />
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ItemSlider;

"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade"; // إضافة تأثير التلاشي إذا كنت ترغب في ذلك
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
      sliderRef.current.swiper.slideNext(); // استخدام swiper.slideNext للتحريك
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slidePrev(); // استخدام swiper.slidePrev للتحريك
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
          autoplay={{ delay: 3000, disableOnInteraction: false }} // تفعيل الحركة التلقائية
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
