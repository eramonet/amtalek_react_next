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

const AdsBroker = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // api ADS
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          "https://amtalek.com/amtalekadmin/public/api/ads-getter/broker-page"
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
      <section className="w-full h-full mx-auto clg:w-[330px]">
        <div className="">
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
                    {ad["image"] ? (
                      <Image
                        width={1000}
                        height={1000}
                        src={ad["image"]}
                        alt={`Ad ${ad["id"]}`}
                        className=" object-cover"
                      />
                    ) : (
                      <div className="max-w-full max-h-[220px] bg-gray-200 flex items-center justify-center">
                        {/* <script
                          async
                          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6367957675332720"
                          crossOrigin="anonymous"
                        ></script>
                        <ins
                          className="adsbygoogle"
                          style={{ display: "block" }}
                          data-ad-client="ca-pub-6367957675332720"
                          data-ad-slot="9116447549"
                          data-ad-format="auto"
                          data-full-width-responsive="true"
                        ></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script> */}
                      </div>
                    )}
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    )
  );
};

export default AdsBroker;
