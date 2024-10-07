"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@/components/Heading";
import Loader from "@/components/loader/Loader";
import { ErrorMessage, NoItemsMessage } from "@/SubComponents";
import CityCard from "../landingPage/popularPlaces/components/CityCard";
// import { useSearchParams } from "next/navigation";
import getData from "@/api/getData";
// import CityCard from "@/CardsComponents/CityCard";

export function Cities({ locale }: any) {
  const { t, i18n } = useTranslation("Pages_Cities");
  // let searchParams = useSearchParams();

  // searchParams.get("page") ||
  const [page, setPage] = useState(1);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredWord, setFilteredWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchCities() {
    setLoading(true);
    setError(false);
    try {
      const data = await getData(
        `web/${process.env.NEXT_PUBLIC_ALL_CITIES}?page=${page}`,
        i18n.language
      );
      const allData = data?.data;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, i18n.language]);

  useEffect(() => {
    // searchParams.get("page") ||
    setPage(1);
    // searchParams
  }, []);

  useEffect(() => {
    if (filteredWord === "") {
      setFilteredCities(cities);
    } else {
      setFilteredCities(
        cities?.filter((city: any) =>
          city?.title?.toLowerCase().includes(filteredWord.toLowerCase())
        )
      );
    }
  }, [filteredWord, cities]);

  return (
    <section className="site_container pt-20 pb-32">
      <input
        className="bg-slate-100 outline-none border p-3 rounded-xl mx-auto flex mb-5 w-full ss:w-full"
        type="text"
        value={filteredWord}
        placeholder={t("placeholder")}
        onChange={(e) => setFilteredWord(e.target.value)}
      />
      <Heading style={"text-center"}>{t("heading")} </Heading>
      <motion.div
        className="all__news--wrapper w-full grid grid-cols-3 gap-3 ss:grid-cols-1 my-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {loading ? (
          <div className="col-span-3">
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : filteredCities?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          <AnimatePresence>
            {filteredCities?.map((city: any) => (
              <motion.div
                key={city?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-[279px]">
                  <CityCard city={city} t={t} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}
