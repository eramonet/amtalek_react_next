"use client";
import { memo, Suspense, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import Image from "next/image.js";
import LangLink from "@/components/LangLink";
import SearchForm from "@/MainComponents/SearchForm";

const MemoizedHero = memo(function Hero({ data, locale }: any) {
  const { t } = useTranslation("Pages_LandingPage");
  // Swiper.changeLanguageDirection(locale);

  const header = useRef<any>(null);
  const makeNavFixed = useRef(null);
  const makeNavNotFixed = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      let headerHeight = header?.current?.getBoundingClientRect().top;
      if (parseInt(headerHeight) < 5) {
        header?.current?.classList.add("navbar__sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", () => console.log(true));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const options2 = {
    root: null,
    rootMargin: "-88px 0px 0px 0px",
    threshold: 0,
  };

  function handleIntersect2(entries: any, observer: any) {
    entries.map((entry: any) => {
      if (entry.isIntersecting) {
        header?.current?.classList.remove("navbar__sticky");
      }
    });
  }

  // const swiperRef = useRef<any>(null);

  useEffect(() => {
    const observer: any = new IntersectionObserver(handleIntersect2, options2);
    observer.observe(makeNavNotFixed.current);

    // if (swiperRef.current && swiperRef.current.swiper) {
    //   const direction = locale === "ar" ? "rtl" : "ltr"; // Change based on language
    //   swiperRef.current.swiper.changeLanguageDirection(direction);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full relative alg:h-auto">
      <section className="h-[calc(560px)] alg:h-fit w-full relative flex alg:flex-col alg:justify-start alg:items-center justify-end items-start">
        <div className="hero__images--slider w-full h-full ss:h-[558px] alg:h-scree absolute alg:static inset-0 bg-grey">
          {data ? (
            <Swiper
              // ref={swiperRef}
              modules={[Autoplay, EffectFade]}
              autoplay={{ delay: 3000 }}
              // locale === "ar" ? "slide" :
              effect={"fade"}
              // ltr={locale === "ar"}
              // rtl={true}
              speed={500}
              loop={true}
              slidesPerView={1}
            >
              {data?.map((slide: any) => (
                <SwiperSlide key={slide?.id}>
                  <div
                    className={`w-full !h-[558px] relative !flex items-start justify-start rtl:justify-start`}
                  >
                    <picture>
                      <source srcSet={`${slide?.image}?w=800`} media="(max-width: 800px)" />
                      <source srcSet={`${slide?.image}?w=1200`} media="(max-width: 1200px)" />
                      <Image
                        width={1000}
                        height={1000}
                        // loading="lazy"
                        className="w-full h-full bg-no-repeat bg-cover absolute inset-0 -z-10"
                        style={{ backgroundBlendMode: "overlay" }}
                        src={`${slide?.image}?w=1600`}
                        alt="Slide Image"
                      />
                    </picture>

                    <div className="hero__left--text-CTA text-bg w-fit h-full pl-[3.3vw] alg:pl-[0vw] rtl:pl-[0vw] rtl:pr-[3.3vw] alg:pr-[0vw] !flex !flex-col justify-end items-start rtl:items-end alg:rtl:items-center max-w-[55%] alg:max-w-[90%] alg:items-center alg:justify-center alg:gap-2 alg:h-screen alg:mx-auto bg- relative z-40 ss:justify-start ss:pt-20">
                      <h1 className="text-5xl asm:text-3xl text-start font-medium leading-[52.8px] alg:text-center rtl:rtl">
                        {slide?.title} <br className="alg:hidden" /> {slide?.subtitle}
                      </h1>
                      <h2 className="mb-9 mt-8 text-[17px] font-medium leading-tight alg:text-center alg:max-w-[70%] md:max-w-full rtl:ml-auto">
                        {slide?.description.substring(0, 200)}
                        {slide?.description.length > 200 && "..."}
                      </h2>

                      <LangLink
                        onClick={() => window.sessionStorage.setItem("step", "1")}
                        className="mb-[65px] w-[190px] h-[50px] min-h-[50px] text-sm font-medium flex justify-center bg-accent text-secondary hover:bg-transparent border-accent transition-all duration-300 items-center border-[1px] rounded-[4px] hover:text-accent hover:border-accent rtl:ml-auto"
                        to={``}
                      >
                        {t("Hero.CTA_Text")}
                      </LangLink>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Image
              width={200}
              height={300}
              style={{
                backgroundImage: `url("/assets/images/hero-slider-1.jpg"),linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))`,
                backgroundBlendMode: "overlay",
              }}
              alt="hero_img"
              className="w-full h-full bg-no-repeat bg-cover"
              src={""}
            />
          )}
        </div>

        <div className="hero__right--header-form h-full w-[40vw] min-w-[610px] xxxl:min-w-[410px] md:min-w-[300px] alg:w-full alg:h-fit relative z-30">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchForm home type={"bigForm"} />
          </Suspense>
        </div>
      </section>
      <div
        ref={makeNavFixed}
        className="make__nav--fixed absolute bottom-20 bg-transparent w-full h-2 pointer-events-none"
      ></div>
      <div
        ref={makeNavNotFixed}
        className="make__nav--not--fixed absolute bottom-0 bg-transparent w-full h-2 pointer-events-none"
      ></div>
    </section>
  );
});

export default MemoizedHero;

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Navigation, Autoplay } from "swiper/modules";
// import Image from "next/image";
// import Link from "next/link";
// import { useTranslation } from "react-i18next";
// import SearchForm from "@/MainComponents/SearchForm";
// import { Suspense } from "react";

// export default function Hero({ data, locale }: any) {
//   const { t } = useTranslation("Pages_LandingPage");

//   return (
//     <section className="h-[calc(560px)] alg:h-fit w-full relative flex alg:flex-col alg:justify-start alg:items-center justify-end items-start ">
//       <Swiper
//         navigation={true}
//         modules={[Navigation, Autoplay]}
//         className="mySwiper"
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         loop={true}
//       >
//         {data?.map((slide: any) => (
//           <SwiperSlide key={slide.id} className="relative h-[560px]">
//             <Image
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-[560px]"
//               width={1000}
//               height={1000}
//             />
//             <div className="absolute max-lg:text-center z-10 top-3/4 -translate-y-1/2 right-0 pr-14 text-custome-white">
//               <h1 className="text-5xl">
//                 {slide.title} <br /> {slide.subtitle}
//               </h1>
//               <p className="text-base my-8">{slide.description}</p>
//               <Link
//                 className="w-fit block mb-16 px-6 py-2 max-lg:mx-auto bg-custome-yellow text-custome-blue hover:bg-transparent border-custome-yellow transition-all duration-300 border rounded hover:text-custome-yellow"
//                 href={slide.link || "#"}
//               >
//                 {t("Hero.CTA_Text")}
//               </Link>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div
//         className={`hero__right--header-form  h-full w-[40vw] min-w-[610px] xxxl:min-w-[410px] md:min-w-[300px] alg:w-full alg:h-fit relative z-30 `}
//       >
//         <Suspense fallback={<div>Loading...</div>}>
//           <SearchForm home type={"bigForm"} locale={locale} />
//         </Suspense>
//       </div>
//     </section>
//   );
// }
