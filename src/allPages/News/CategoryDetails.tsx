"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdsCategoryDetails from "./AdsCategoryDetails";
import Loader from "@/components/loader/Loader";
import Heading from "@/components/Heading";
import NewsCard from "@/CardsComponents/NewsCard";
import { NoItemsMessage } from "@/SubComponents";
import LatestProperties from "../landingPage/latestProperties/LatestProperties";
import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";
import Link from "next/link";
import getData from "@/api/getData";

export function CategoryDetails() {
  const { t, i18n } = useTranslation("Pages_CategoryDetails");
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState("");
  const [page, setPage] = useState(1);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchCities() {
    setLoading(true);
    setError(false);
    try {
      const data = await getData(
        // ${state?.id}
        `web/${process.env.NEXT_PUBLIC_SINGLE_CATEGORY_DETAILS}`,
        i18n.language
      );
      const allData = data?.data || [];
      setCities(allData);
      setFilteredCities(allData);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCities();
  }, [page, i18n.language]);

  useEffect(() => {
    setPage(1);
  }, []);

  // Check if there was an error
  if (error) {
    return (
      <div className="h-[calc(100vh-136px)] flex-center w-full">
        <NoItemsMessage message={t("ErrorMessage")} />
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="site_container flex justify-between items-start pt-20 gap-0 clg:gap-4 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
      <section className="news__Details--content w-[66%] flex flex-col gap-6 clg:w-full">
        <input
          value={filteredNews}
          onChange={(e) => setFilteredNews(e.target.value)}
          placeholder={t("placeholder")}
          type="text"
          className="w-full border outline-none rounded-xl bg-slate-100 p-2 mb-9"
        />
        {/* <Heading style="text-center">{data?.title}</Heading>
        <div
          className="flex-center"
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></div> */}
        <h3 className="text-2xl text-center font-medium">{t("ALL_NEWS")}</h3>
        <motion.div layout className="all__properties--wrapper w-full grid-auto-fit mb-10">
          {news?.map((newsItem: any) => (
            <NewsCard key={newsItem?.id} news={newsItem} t={t} />
          ))}
          {news?.length === 0 && <NoItemsMessage message={t("NoItemsMessage")} />}
        </motion.div>
      </section>
      <section className="news__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-16">
        <Link aria-label="ads" href="/ad">
          {/* start ads */}
          <AdsCategoryDetails />
          {/* end ads */}
        </Link>
        <LatestProperties t={t} />
        <FeaturedPropertiesAside />
      </section>
    </section>
  );
}
