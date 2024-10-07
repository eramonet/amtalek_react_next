import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

SwiperCore.use([Autoplay, Pagination, Navigation]);

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
// import "../../../SASS/styles.scss";

export default function AdsCategoryDetails() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // api ADS
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          "https://amtalek.com/amtalekadmin/public/api/ads-getter/category-news"
        );
        const data = await response.json();
        setAds(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // this function to know how much pepole click the ADS
  const trackAdClick = async (adId: never) => {
    try {
      await fetch(`https://amtalek.com/amtalekadmin/public/api/click-on-ad/${adId}`);
    } catch (error) {
      console.error("Error tracking ad click:", error);
    }
  };

  if (loading) {
    return "";
  }

  return (
    ads.length > 0 && (
      // <section className="bg-gray-100">
      <div className="w-[360px] h-[490px] mx-auto">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          speed={3200}
          className="mySwiper transition-all ease-in-out delay-300"
        >
          {ads.map((ad) => {
            return (
              <SwiperSlide key={ad["id"]}>
                <a
                  href={ad["url"]}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAdClick(ad["id"])}
                >
                  {ad["id"] ? (
                    <Image
                      src={ad["image"]}
                      alt={`Ad ${ad["id"]}`}
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span>Image not available</span>
                    </div>
                  )}
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      //   </section>
    )
  );
}
