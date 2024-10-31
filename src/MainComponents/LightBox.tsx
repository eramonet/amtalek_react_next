import { faChevronRight, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import Slider from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useSelector } from "react-redux";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import Image from "next/image";

function LightBox({ data }: any) {
  const [index, setIndex] = useState(-1);
  const lng = useSelector(lang);
  const slider = useRef<any>(null);

  const settings = {
    rtl: lng === "ar" ? true : false,
    dots: false,
    arrows: false,
    infinite: data.length > 1,
    speed: 500,
    autoplay: data.length > 1,
    pauseOnHover: true,
    focusOnSelect: true,
    slidesToShow: data?.length > 2 ? 3 : 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: data?.length > 1 ? 2 : 1,
          slidesToScroll: 1,
          infinite: data.length > 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: data.length > 1,
        },
      },
    ],
  };

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  if (data?.length < 1) {
    return null; // إخفاء القسم بالكامل إذا لم يكن هناك صور.
  }

  return (
    <section
      className={`flex rtl:flex-row-reverse ${
        // data?.length > 3 ? "justify-between" : "justify-center"
        data?.length > 3 ? "justify-between" : "w-fit mx-auto"
      } items-center gap-4`}
    >
      {data?.length > 3 && (
        <button
          onClick={() => slider.current.slickPrev()}
          className="prev-slider-btn md:hidden bg-transparent text-secondary border-2 border-secondary hover:scale-105 flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-10 w-10 min-w-[40px] min-h-[40px]"
        >
          <FontAwesomeIcon
            className="rotate-180 text-base font-bold transition-all duration-300 ease-in-out active:scale-90"
            icon={faChevronRight}
          />
        </button>
      )}
      <Slider className={`w-10/12 md:w-full flex items-center`} ref={slider} {...settings}>
        {data?.map((slide: any, index: any) => (
          <div
            key={slide.id}
            className="img__wrapper w-[350px] max-w-[350px] sm:max-w-[330px] sm:w-[330px] h-[350px] overflow-hidden rounded relative group"
          >
            <Image
              width={1000}
              height={1000}
              className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
              src={slide?.src}
              alt={slide?.src}
            />
            <button
              onClick={() => setIndex(index)}
              className="slide__hover_eye absolute inset-0 w-full h-full bg-secondary/40 transition-all duration-300 ease-in-out flex justify-center items-center group-hover:opacity-100 opacity-0 z-0 cursor-pointer"
            >
              <FontAwesomeIcon className="text-4xl text-accent/50" icon={faMagnifyingGlassPlus} />
            </button>
          </div>
        ))}
      </Slider>
      {data?.length > 3 && (
        <button
          onClick={() => slider.current.slickNext()}
          className="prev-slider-btn md:hidden bg-secondary text-bg border-2 border-secondary hover:scale-105 flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-10 w-10 min-w-[40px] min-h-[40px]"
        >
          <FontAwesomeIcon className="text-base font-bold" icon={faChevronRight} />
        </button>
      )}
      <Lightbox
        slides={data}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </section>
  );
}

export default LightBox;

// import { faChevronRight, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import { useRef } from "react";
// import Slider from "react-slick";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import "yet-another-react-lightbox/plugins/thumbnails.css";
// import { useSelector } from "react-redux";
// import { lang } from "@/Store/Features/MiscellaneousSlice";
// import Image from "next/image";
// function LightBox({ data }: any) {
//   const [index, setIndex] = useState(-1);
//   const lng = useSelector(lang);

//   const slider = useRef<any>(null);

//   let settings = {
//     rtl: lng === "ar" ? true : false,
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     pauseOnHover: true,
//     focusOnSelect: true,
//     slidesToShow: data?.length > 2 ? 3 : data?.length,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: data?.length > 1 ? 2 : data?.length,
//           slidesToScroll: 1,
//           initialSlide: 0,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 700,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 0,
//           infinite: true,
//         },
//       },
//     ],
//   };

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
//   if (data?.length < 1) {
//     return;
//   }
//   return (
//     <section
//       className={`flex rtl:flex-row-reverse ${
//         data?.length > 3 ? "justify-between" : "justify-center"
//       } items-center gap-4`}
//     >
//       {data?.length > 3 && (
//         <button
//           onClick={() => slider.current.slickPrev()}
//           className="prev-slider-btn md:hidden bg-transparent text-secondary  border-2 border-secondary hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-10 w-10 min-w-[40px] min-h-[40px]"
//         >
//           <FontAwesomeIcon
//             className="rotate-180 text-base font-bold transition-all duration-300 ease-in-out active:scale-90 "
//             icon={faChevronRight}
//           />
//         </button>
//       )}
//       <Slider className={`w-10/12 md:w-full   flex items-center `} ref={slider} {...settings}>
//         {data?.map((slide: any, index: any) => (
//           <div
//             key={slide.id}
//             className="img__wrapper w-[350px] max-w-[350px] sm:max-w-[330px] sm:w-[330px] h-[350px] overflow-hidden round relative  group"
//           >
//             <Image
//               width={1000}
//               height={1000}
//               className="w-full h-full object-cover  cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
//               src={slide?.src}
//               alt={slide?.src}
//             />
//             <button
//               onClick={() => setIndex(index)}
//               className="slide__hover_eye absolute inset-0 w-full h-full bg-secondary/40 transition-all duration-300 ease-in-out flex justify-center items-center group-hover:opacity-100 opacity-0 z-0 cursor-pointer"
//             >
//               <FontAwesomeIcon className="text-4xl text-accent/50" icon={faMagnifyingGlassPlus} />
//             </button>
//           </div>
//         ))}
//       </Slider>
//       {data?.length > 3 && (
//         <button
//           onClick={() => slider.current.slickNext()}
//           className="prev-slider-btn md:hidden bg-secondary text-bg  border-2 border-secondary hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-10 w-10 min-w-[40px] min-h-[40px]"
//         >
//           <FontAwesomeIcon className=" text-base font-bold" icon={faChevronRight} />
//         </button>
//       )}
//       <Lightbox
//         slides={data}
//         open={index >= 0}
//         index={index}
//         close={() => setIndex(-1)}
//         plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
//       />
//     </section>
//   );
// }

// export default LightBox;
