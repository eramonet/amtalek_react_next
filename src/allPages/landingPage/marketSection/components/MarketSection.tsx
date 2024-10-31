"use client";
import { memo } from "react";
// import LangLink from "../../../Components/MainComponents/LangLink";
import arrow from "@/assets/images/arrow.svg";
import { TbSocial } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import LangLink from "@/components/LangLink";

const MarketSection = memo(function MarketSection({ data }: any) {
  const { t } = useTranslation("Pages_LandingPage");

  return (
    <section className="h-auto     bg-bg  ">
      <section className=" my-20  flex site_container h-[60vh] amd:flex-col amd:items-center amd:h-auto min-h-[550px] round overflow- shadow-2xl shadow-secondary/40 ">
        <div
          className="MarketSection__left w-1/2 h-full min-h-full relative amd:h-fit amd:min-h-fit amd:w-full amd:bg-no-repeat amd:bg-cover   bg-[#f54003] text-bg px-16 xl:px-9 py-20 flex flex-col justify-center amd:items-center opac"
          // style={{ backgroundImage:"url("}}
        >
          <div
            className="MarketSection__left--pattern-top w-14 h-14 bg-transparent absolute bottom-full 
            right-full
          xlll:left-0 xlll:rotate-[40deg] sm:left-auto sm:right-1/2 sm:translate-x-1/2 sm:rotate-[40deg] sm:-translate-y-1
          
          rtl:right-auto rtl:left-full
          rtl:xlll:left-auto rtl:xlll:right-0 rtl:rotate-[85deg] rtl:xlll:rotate-[40deg]  rtl:sm:right-1/2  
          "
          >
            <div className="w-full h-full relative">
              <div className="absolute pattern__line-center w-full h-1 bg-[#f54003] rounded-full top-[37%] right-2  rotate-45 "></div>
              <div className="absolute pattern__line-top w-full h-1 bg-[#f54003] rounded-full top-[25%] -right-2 rotate-[55deg] "></div>
              <div className="absolute pattern__line-bottom w-full h-1 bg-[#f54003] rounded-full bottom-[32%] -left-4 rotate-[35deg] "></div>
            </div>
          </div>
          <p className="font-bold uppercase border-l-[3px] border-l-bg rtl:border-l-[0px] rtl:border-r-[3px] rtl:border-r-bg  pl-3 rtl:pl-0 rtl:pr-3 text-lg  w-full ">
            {data?.title}
          </p>
          <h3
            className="text-[2.5rem] xl:text-4xl font-medium mt-6 leading-[55px] text-transparent 
           bg-clip-text bg-gradient-to-r  from-bg to-delete clg:text-2xl"
          >
            {data?.sub_title}
          </h3>

          <Image
            className="!w-72 mx-auto -mb-16  -mt-20 bg-red-  pointer-events-none select-none  "
            src={arrow}
            alt="arrow"
            width={200}
            height={200}
          />
          <LangLink
            className={`package__CTA market__CTA rounded-full w-full  px-4 py-2  min-h-[48px] !border-2 !border-bg hover:!border-bg border-solid font-medium text-lg group/CTA  active:scale-90 trns bg-secondary flex items-center justify-center text-secondary before:bg-accent  `}
            to="/coming-soon"
          >
            <span className={` group-hover/CTA:text-bg flex gap-2 items-center`}>
              <TbSocial />
              {t("MarketSection.Market_btn_text")}
            </span>
          </LangLink>
        </div>

        <div className="MarketSection__right bg- w-1/2 h-full min-h-full amd:w-full ">
          <Image
            width={1000}
            height={1000}
            src={`${data?.image}`}
            alt="Market_img"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </section>
  );
});

export default MarketSection;
