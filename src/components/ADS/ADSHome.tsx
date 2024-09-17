"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";

export default function ADSHome({ data }: any) {
  return (
    data?.length > 0 && (
      <section className="bg-gray-100 pb-8">
        <div className="site_container">
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            speed={3000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {data.map((ad: any) => (
              <SwiperSlide key={ad["id"]} className="">
                <a
                  href={ad["url"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  // onClick={() => trackAdClick(ad["id"])}
                >
                  <Image
                    src={ad["image"]}
                    alt={`Ad ${ad["id"]}`}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    )
  );
}
