"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Loader from "@/components/loader/Loader";
import ErrorMessage from "@/SubComponents/ErrorMessage";
// import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";
import Share from "@/SubComponents/Share";
import NewsCard from "@/CardsComponents/NewsCard";
import Heading from "@/components/Heading";
// import AdsNewsDetails from "./AdsNewsDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import getData from "@/api/getData";
import AdsNewsDetails from "@/allPages/News/AdsNewsDetails";
import FeaturedPropertiesAside from "@/allPages/PropertyDetails/aside/components/FeaturedPropertiesAside";

export default function NewsDetails() {
  const { t, i18n } = useTranslation("Pages_NewsDetails");
  const { id } = useParams();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getData(
          `${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_SINGLE_PROJECT_DETAILS}${id}`,
          i18n.language
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = response;
        setData(result?.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, i18n.language]); // إعادة الجلب عند تغيير اللغة أو id

  if (error) {
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

  if (loading) {
    return <Loader />;
  }

  return (
    data && (
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
            {data.title}
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
              src={data.image}
              alt={data.title}
              className="h-full w-full"
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
              }/news/categories/${data.category_details.name.replace(/ /g, "-")}`}
              className=" bg-secondary20 text-secondary font-medium px-3 py-1 round w-fit cursor-pointer"
            >
              {data.category_details.name}
            </Link>
            <h2 className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarDays} />
              {data.created_at}
            </h2>
          </motion.div>

          <Share data={data} t={t} type="article" />

          <motion.div
            className="mb-5"
            dangerouslySetInnerHTML={{ __html: data.description }}
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
            {data.latest_news.map((news: any) => (
              <NewsCard key={news.id} news={news} t={t} />
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
          {/* أي مكونات أخرى تحتاجها في الجزء الجانبي */}
          <FeaturedPropertiesAside />
        </motion.section>
      </motion.section>
    )
  );
}
