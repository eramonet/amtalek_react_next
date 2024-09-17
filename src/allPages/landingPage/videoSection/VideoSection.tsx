import HeaderSection from "@/components/headerSection/HeaderSection";
import VideoBtn from "./components/VideoBtn";

export default function VideoSection({ data, locale, countrie }: any) {
  return (
    <section className="relative flex items-center min-h-[700px] py-28 bg-custome-white">
      <div className="site_container">
        <div className="flex-1 w-1/2 min-h-[500px] amd:min-h-fit  flex flex-col justify-center amd:items-center gap-3 pt-5 pr-5 rtl:pr-0 rtl:pl-5 amd:w-full amd:mb-6">
          <h3 className="round bg-custome-blue rounded font-medium text-custome-white px-3 py-2 w-fit mb-5 text-xl uppercase ">
            {data?.base_title}
          </h3>

          <HeaderSection title={data?.title} locale={locale} countrie={countrie} />
          <p className="mt-5 mb-1 amd:text-justify opacity-80">{data?.description}</p>
        </div>

        <VideoBtn data={data} />
      </div>
    </section>
  );
}
