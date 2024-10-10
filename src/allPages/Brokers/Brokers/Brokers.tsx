import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage, Loader, NoItemsMessage } from "@/SubComponents";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { OwnCountry } from "@/Store/Features/MiscellaneousSlice";
import { useSelector } from "react-redux";
import Heading from "@/components/Heading";
import BrokerCard from "@/CardsComponents/BrokerCard";
import Pagination from "@/MainComponents/Pagination";

export function Brokers() {
  const { t } = useTranslation("Pages_Brokers");
  const [filteredAgencies, setFilteredAgencies] = useState([]);
  const [filteredWord, setFilteredWord] = useState("");
  let [searchParams] = useSearchParams();
  const [page, setPage] = useState<any>(searchParams.get("page") || 1);

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // ${process.env.NEXT_PUBLIC_BROKERS}?limit=${
        //   process.env.NEXT_PUBLIC_PAGINATION_LIMIT
        // }&page=${page}&country_id=${localStorage.getItem("country")}
        const response = await fetch(``);
        const result = await response.json();
        setData(result);
        setFilteredAgencies(result?.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const { i18n } = useTranslation();
  const theCountry = useSelector(OwnCountry);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <section className="site_container pt-20  pb-32">
      <input
        className="bg-slate-100 outline-none border p-3 rounded-xl mx-auto flex mb-5 w-full ss:w-full"
        type="text"
        value={filteredWord}
        placeholder={t("placeholder")}
        onChange={(e) => {
          setFilteredWord(e.target.value);
          setFilteredAgencies(
            data?.data?.filter((city: any) =>
              city?.name?.toLowerCase().includes(e.target.value.toLowerCase())
            )
          );
        }}
      />
      <Heading style={"text-center"}>
        {t("heading")} {i18n.language === "ar" ? "في" : "in"} {theCountry?.title}
      </Heading>
      <motion.div
        layout
        className="all__Brokers--wrapper w-full grid grid-cols-3 ss:grid-cols-1 clg:grid-cols-2 my-10 gap-5"
      >
        {isError ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isLoading ? (
          <div className="col-span-3 ">
            <Loader />
          </div>
        ) : filteredAgencies?.length === 0 ? (
          <div className="col-span-3">
            <NoItemsMessage message={t("NoItemsMessage")} />
          </div>
        ) : (
          filteredAgencies?.map((broker: any) => (
            <BrokerCard key={broker.id} broker={broker} t={t} />
          ))
        )}
      </motion.div>
      {data?.meta?.last_page > 1 && filteredWord === "" && (
        <Pagination page={page} t={t} setPage={setPage} data={data} />
      )}
    </section>
  );
}
