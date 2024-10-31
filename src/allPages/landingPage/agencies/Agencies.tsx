"use client";
import { useTranslation } from "react-i18next";
import ButtonSections from "@/components/buttonSections/ButtonSections";
import HeaderSection from "@/components/headerSection/HeaderSection";
import SliderAgencies from "./components/SliderAgencies";
import Heading from "@/components/Heading";
// import { useTranslation } from "react-i18next";

export default function Agencies({ data, locale, countrie }: any) {
  const { t } = useTranslation("Pages_LandingPage");

  return (
    <section className="py-20 h-[600px] relative">
      <div className="site_container">
        {/* **************************************************************************************************** */}

        <Heading className="mx-auto">{data?.title}</Heading>
        <p className="text-base opacity-80 text-center mb-9">{data?.sub_title}</p>
        {/* <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          locale={locale}
          className={"w-fit mx-auto text-center"}
          countrie={countrie}
        /> */}
        {/* **************************************************************************************************** */}
        <SliderAgencies data={data} />
        {/* **************************************************************************************************** */}
        <ButtonSections title={t("Brokers.main_CTA")} className={"my-5"} to={`/Agencies`} />
      </div>
    </section>
  );
}
