/* eslint-disable react/jsx-key */
import { Modal, Button } from "antd";
import { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, A11y, EffectCoverflow } from "swiper/modules";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css";
import "swiper/css/effect-coverflow";
import ImageDetailsComponentModal from "./ImageDetailsComponentModal";
import Image from "next/image";

type Props = {
  images: string[];
  keyID: number;
  post?: any;
};
function ImagesPostComponent({ images, keyID, post }: Props) {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper();
    return (
      <button
        className="  bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center"
        onClick={() => swiper.slideNext()}
      >
        {children}
      </button>
    );
  };
  const SwiperButtonPrev = ({ children }: any) => {
    const swiper = useSwiper();
    return (
      <button
        className="  bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center"
        onClick={() => swiper.slidePrev()}
      >
        {children}
      </button>
    );
  };
  return (
    <>
      {images?.length > 0 && (
        <Button
          style={{ padding: 0, border: "none" }}
          onClick={() => setShowPreview(true)}
          className={`w-full h-[250px] gap-2 cursor-pointer rounded overflow-hidden  grid ${
            images?.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          <div className="col-span-1 h-[250px] rounded-xl overflow-hidden ">
            <Image width={300} height={300} alt="vvcvc" src={images[0]} className="w-full h-full" />
          </div>
          {images?.length > 1 && (
            <div
              className={`col-span-1 h-[250px] relative gap-2 grid ${
                images?.length === 2 ? "grid-rows-1" : images?.length > 2 && "grid-rows-2"
              }`}
            >
              {images?.length > 3 && (
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-[#01425A] p-2 text-white text-[18px] rounded-xl">
                  + {images?.length - 3}
                </span>
              )}
              {images?.slice(1, 3)?.map((img: string) => {
                return (
                  <Image
                    width={300}
                    height={300}
                    key={img}
                    src={img}
                    alt="llofd"
                    className="w-full h-full rounded-xl"
                  />
                );
              })}
            </div>
          )}
        </Button>
      )}
      <Modal
        centered
        footer={null}
        open={showPreview}
        onCancel={() => setShowPreview(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        closable={false}
        className=" "
        classNames={{
          content: " !p-0 !bg-red-500 ",
          mask: "w-full !bg-black  relative",
          wrapper: " ImgPostModal ",
        }}
      >
        <div
          key={keyID}
          className=" !w-1/2 fixed top-1/2 left-28 -translate-x- -translate-y-1/2 flex justify-center items-center"
        >
          <Swiper
            key={keyID}
            modules={[Navigation, EffectCoverflow, A11y]}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 70,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            speed={1200}
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={50}
            slidesPerView={1}
            className=" "
          >
            {images?.map((img: string) => {
              return (
                <div className="w-[1000px]">
                  <SwiperSlide key={img}>
                    <Image
                      width={300}
                      height={300}
                      alt="vofirvfr"
                      src={img}
                      className="w-full h-[350px]  rounded-xl"
                    />
                  </SwiperSlide>
                </div>
              );
            })}
            {images?.length > 1 && (
              <div className="w-full flex justify-center items-center gap-5 mt-4">
                <SwiperButtonPrev>
                  <BsArrowLeftCircle color="#01425A" size={28} />
                </SwiperButtonPrev>
                <SwiperButtonNext>
                  <BsArrowRightCircle color="#01425A" size={28} />
                </SwiperButtonNext>
              </div>
            )}
          </Swiper>
        </div>
        <div className="bg-white w-1/4 h-screen overflow-scroll fixed right-0">
          <ImageDetailsComponentModal post={post} />
        </div>
      </Modal>
    </>
  );
}

export default ImagesPostComponent;
