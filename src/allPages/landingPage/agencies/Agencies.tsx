import { useTranslation } from "react-i18next";
import ButtonSections from "@/components/buttonSections/ButtonSections";
import HeaderSection from "@/components/headerSection/HeaderSection";
import SliderAgencies from "./components/SliderAgencies";

export default function Agencies({ data, locale, countrie, t }: any) {
  return (
    <section className="py-20 h-[600px]">
      <div className="site_container">
        {/* **************************************************************************************************** */}

        <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          locale={locale}
          className={"w-fit mx-auto text-center"}
          countrie={countrie}
        />
        {/* **************************************************************************************************** */}
        <SliderAgencies data={data} />
        {/* **************************************************************************************************** */}
        <ButtonSections title={t("Brokers.main_CTA")} className={"my-5"} to={`/Agencies`} />
      </div>
    </section>
  );
}
