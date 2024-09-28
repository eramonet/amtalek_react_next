import Link from "next/link";
import MostViewCard from "./components/MostViewCard";
import ButtonSections from "@/components/buttonSections/ButtonSections";
import HeaderSection from "@/components/headerSection/HeaderSection";

export default function MostViews({ data, t, locale, countrie }: any) {
  return (
    <section className="h-auto bg-custome-venice text-secondary ">
      <section className="relative z-10  py-20 flex flex-col items-center site_container  min-h-[550px] ">
        {/* <Heading style={"asm:text-center"}>{data?.title}</Heading> */}
        {/* <SubHeading style={"asm:text-center"}>{data?.sub_title} </SubHeading> */}
        <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          locale={locale}
          className={"w-fit mx-auto text-center"}
          countrie={countrie}
        />
        {/* ************************************************************************************** */}
        <div className="w-full grid grid-cols-4 clg:grid-cols-1 gap-5 my-10">
          <div className="col-span-2 bg-red- flex flex-col gap-7">
            {data?.main_cards[0]?.map((card: any, ind: number) => {
              return <MostViewCard key={ind} card={card} locale={locale} />;
            })}
          </div>

          <div className="col-span-2 ss:grid-cols-1 grid grid-cols-2 gap-4  min-h-[500px]">
            {data?.other_cards[0]?.map((card: any, ind: number) => (
              <MostViewCard key={ind} card={card} />
            ))}
          </div>
        </div>
        {/* ************************************************************************************** */}
        <ButtonSections title={t("MostViews.main_CTA")} className={"mt-6"} />

        {/* <Link
          href={``}
          className="login__bt border-2 round w-[200px] h-[50px] flex justify-center items-center font-medium border-secondary text-sm  bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary active:scale-90 mt-10"
        >
          {"MostViews.main_CTA"}
        </Link> */}
      </section>
    </section>
  );
}
