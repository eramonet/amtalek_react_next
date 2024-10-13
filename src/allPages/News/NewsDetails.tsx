"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AdsNewsDetails from "./AdsNewsDetails";
import { ErrorMessage } from "@/SubComponents";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import Share from "@/SubComponents/Share";
import Heading from "@/components/Heading";
import NewsCard from "@/CardsComponents/NewsCard";
import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";
import { useFetchData } from "@/Hooks/useFetchData";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// { id } : any
export default function NewsDetails({ data }: any) {
  const { t, i18n } = useTranslation("Pages_NewsDetails");
  const { id }: any = useParams();

  const { isLoading, isError, isPaused, refetch, isSuccess } = useFetchData(
    "NewsDetails",
    `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_SINGLE_NEW_DETAILS}${id}`,
    false,
    true,
    id
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const [isResize1016, setIsResize1016] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsResize1016(window.innerWidth > 1016);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isError || isPaused) {
    return (
      <motion.div
        className="h-[calc(100vh-136px)] flex-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorMessage message={t("ErrorMessage")} />
      </motion.div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    isSuccess && (
      <motion.section
        className="site_container flex justify-between items-start pt-20 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start ss:pt-2"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.section
          className="news__Details--content w-[66%] flex flex-col gap-6 clg:w-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mt-2 font-extrabold text-3xl clg:text-xl md:text-lg ss:text-md">
            {data?.title}
          </h1>

          <motion.div
            className="min-h-[360px] ss:min-h-fit w-full h-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              width={1000}
              height={1000}
              className="h-full w-full"
              src={data?.image}
              alt={data?.title}
            />
          </motion.div>

          <motion.div
            className="news__author--date flex justify-start gap-2 flex-col"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`${
                i18n.language.startsWith("ar") ? "" : "/en"
              }/news/categories/${data?.category_details?.name.replace(/ /g, "-")}`}
              className=" bg-secondary20 text-secondary font-medium px-3 py-1 round w-fit cursor-pointer"
            >
              {data?.category_details?.name}
            </Link>
            <h2 className="flex items-center gap-2">
              <FontAwesomeIcon className="" icon={faCalendarDays} />
              {data?.created_at}
            </h2>
          </motion.div>

          <Share data={data} t={t} type="article" />

          <motion.div
            className="mb-5"
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          ></motion.div>

          {!isResize1016 && <AdsNewsDetails />}

          <Heading style="my-5">{t("LATEST_NEWS")}</Heading>

          <motion.div
            className="all__properties--wrapper w-full grid grid-cols-2 mb-10 gap-5 ss:grid-cols-1"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {data?.latest_news?.map((news: any) => (
              <NewsCard key={news?.id} news={news} t={t} />
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="news__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-8"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isResize1016 && <AdsNewsDetails />}

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6367957675332720"
            crossOrigin="anonymous"
          ></script>

          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6367957675332720"
            data-ad-slot="5248586810"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>

          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

          <FeaturedPropertiesAside />
        </motion.section>
      </motion.section>
    )
  );
}
