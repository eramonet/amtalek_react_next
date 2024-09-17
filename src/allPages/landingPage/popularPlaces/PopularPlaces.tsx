import HeaderSection from "@/components/headerSection/HeaderSection";
import CityCard from "./components/CityCard";
import ButtonSections from "@/components/buttonSections/ButtonSections";

export default function PopularPlaces({ data, t, locale, countrie }: any) {
  return (
    <section className="bg-custome-venice py-20">
      <div className="site_container flex flex-col gap-8">
        <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          className={"w-fit mx-auto text-center"}
          locale={locale}
          countrie={countrie}
        />
        {/* *********************************************************************************** */}
        <div className="grid grid-cols-4 gap-7 clg:grid-cols-1">
          <div className="col-span-2 flex flex-col gap-4 h-[528px]">
            {data?.cards
              ?.filter((city: any) => city.type === "main_slider")
              ?.map((city: any) => (
                <CityCard key={city?.id} city={city} t={t} />
              ))}
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-5 h-[528px]">
            {data?.cards
              ?.filter((city: any) => city.type !== "main_slider")
              ?.map((city: any) => (
                <CityCard key={city?.id} city={city} t={t} />
              ))}
          </div>
        </div>

        <ButtonSections title={t("PopularPlaces.main_CTA")} />
      </div>
    </section>
  );
}
