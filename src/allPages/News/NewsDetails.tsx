/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
// import { useFetchData } from "../../Components/Hooks/useAxios";
// import { FeaturedPropertiesAside, LatestProperties } from "../../Components/AsideComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
// import { Loader, Share, ErrorMessage } from "../../Components/SubComponents";
// import { Heading, HelmetTags } from "../../Components/MainComponents";
// import { NewsCard } from "../../Components/CardsComponents";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AdsNewsDetails from "./AdsNewsDetails";
import { ErrorMessage } from "@/SubComponents";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import Share from "@/SubComponents/Share";
import Heading from "@/components/Heading";
import NewsCard from "@/CardsComponents/NewsCard";
import LatestProperties from "../landingPage/latestProperties/LatestProperties";
import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";
import { useFetchData } from "@/Hooks/useFetchData";
export function Component() {
  const { t, i18n } = useTranslation("Pages_NewsDetails");
  const { newsID } = useParams();

  const { isLoading, isError, isPaused, data, refetch, isSuccess } = useFetchData(
    "NewsDetails",
    `${process.env.NEXT_PUBLIC_SINGLE_NEW_DETAILS}${newsID}`,
    false,
    true,
    newsID
  );

  console.log(data);

  useEffect(() => {
    refetch();
  }, [i18n.language]);

  // start check if window is less than 1016px to can change location ADS from aside to under artcture  in some page

  const [isResize1016, setIsResize1016] = useState(window.innerWidth > 1016 ? true : false);
  window.addEventListener("resize", () =>
    window.innerWidth > 1016 ? setIsResize1016(() => true) : setIsResize1016(() => false)
  );
  if (isError || isPaused) {
    return (
      <div className="h-[calc(100vh-136px)] flex-center w-full">
        <ErrorMessage message={t("ErrorMessage")} />
      </div>
    );
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    isSuccess && (
      <section className="site_container  flex justify-between items-start pt-20 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start ss:pt-2">
        {/* <HelmetTags
          title={
            `${i18n.language.startsWith("ar") ? "امتلك.كوم |" : "Amtalek |"}` + " " + data?.title
          }
          description={t("tab.description")}
        /> */}

        <section className="news__Details--content w-[66%]  flex flex-col gap-6 clg:w-full  ">
          <h1 className="mt-2 font-extrabold text-3xl clg:text-xl md:text-lg ss:text-md">
            {data?.title}{" "}
          </h1>
          <div className="min-h-[360px] ss:min-h-fit w-full h-fit">
            <Image
              width={100}
              height={100}
              className=" h-full w-full "
              src={data?.image}
              alt={data?.title}
            />
          </div>
          <div className="news__author--date flex justify-start  gap-2 flex-col">
            <Link
              to={`${
                i18n.language.startsWith("ar") ? "" : "/en"
              }/news/categories/${data?.category_details?.name.replace(/ /g, "-")}`}
              state={{ id: data?.category_details?.id }}
              className=" bg-secondary20 text-secondary font-medium px-3 py-1 round w-fit cursor-pointer"
            >
              {data?.category_details?.name}
            </Link>
            <h2 className="flex items-center gap-2 ">
              <FontAwesomeIcon className=" " icon={faCalendarDays} />
              {data?.created_at}
            </h2>
          </div>
          <Share data={data} t={t} type="article" />

          <div
            className="mb-5"
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
          ></div>

          {/* start ads in mobile */}
          {/* condtion to can show in mobile screen */}
          {!isResize1016 && <AdsNewsDetails />}
          {/* end ads in mobile */}

          <Heading style="my-5">{t("LATEST_NEWS")}</Heading>
          <div
            className={`all__properties--wrapper w-full grid grid-cols-2 mb-10 gap-5 ss:grid-cols-1`}
          >
            {data?.latest_news?.map((news: any) => (
              <NewsCard key={news?.id} news={news} t={t} />
            ))}
          </div>
        </section>
        <section className="news__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-8">
          {/* start ads in full screen */}
          {/* condtion to can show in full screen */}
          {isResize1016 && <AdsNewsDetails />}
          {/* end ads in full screen */}

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6367957675332720"
            crossOrigin="anonymous"
          ></script>
          {/* <!-- news amp --> */}
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6367957675332720"
            data-ad-slot="5248586810"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <LatestProperties t={t} />
          <FeaturedPropertiesAside />
        </section>
      </section>
    )
  );
}
