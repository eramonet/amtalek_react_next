import HeaderSection from "@/components/headerSection/HeaderSection";
import LatestPropertiesAllCards from "./components/LatestPropertiesAllCards";
import ButtonSections from "@/components/buttonSections/ButtonSections";
import initTranslations from "@/app/i18n";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";

const i18nNamespaces = ["Pages_LandingPage"];

export default async function LatestProperties({ data, locale, countrie, t }: any) {
  // const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <section className="bg-custome-venice py-20">
      <div className="site_container flex flex-col gap-10">
        {/* ************************************************************************************* */}

        <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          className={"w-fit mx-auto text-center"}
          locale={locale}
          countrie={countrie}
        />
        {/* ************************************************************************************* */}

        {/* عرض المكونات بالبيانات */}
        <LatestPropertiesAllCards data={data} locale={locale} t={t} />
        {/* ************************************************************************************* */}
        <ButtonSections title={t("LatestProperties.main_CTA")} />
      </div>
    </section>
  );
}
