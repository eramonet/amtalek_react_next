"use client";
import NewsCard from "@/CardsComponents/NewsCard";
import Heading from "@/components/Heading";
import LangLink from "@/components/LangLink";
import SubHeading from "@/MainComponents/SubHeading";
import { memo } from "react";

import { useTranslation } from "react-i18next";
const LatestNews = memo(function LatestNews({ data }: any) {
  const { t } = useTranslation("Pages_LandingPage");

  if (data?.cards?.length < 1) {
    return;
  }

  return (
    <section className="h-auto   bg-dark-gray  ">
      <section className="  site_container min-h-[700pw] md:!h-[1200px] py-20 flex flex-col items-center">
        <Heading style={"asm:text-center"}>{data?.title}</Heading>
        <SubHeading style={"asm:text-center"}>{data?.sub_title} </SubHeading>

        <div className="latest__properties--cards w-full grid grid-cols-3 md:grid-cols-1 gap-4 my-10 h-[300px] ">
          {data?.cards?.map((news: any) => (
            <NewsCard homePage key={news?.id} news={news} t={t} />
          ))}
        </div>

        <LangLink
          to="/news"
          className="login__bt border-2 round w-[200px] h-[50px] flex justify-center items-center font-medium border-secondary text-sm  bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary active:scale-90"
        >
          {t("LatestNews.main_CTA")}
        </LangLink>
      </section>
    </section>
  );
});

export default LatestNews;
