/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
// import AgenciesCard from "./AgenciesCard";
import getData from "@/api/getData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/loader/Loader";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ProjectCard from "./components/ProjectCard";
import { OwnCountry } from "@/Store/Features/MiscellaneousSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Projects({ locale }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrokers, setFilteredBrokers] = useState<any[]>([]);
  const [allBrokers, setAllBrokers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 9;

  const { t } = useTranslation("Pages_Projects");
  // const theCountry = useSelector(OwnCountry);
  // console.log(theCountry);

  // const fetchAllBrokers = async () => {
  // setIsLoading(true);
  // const brokers = await getData(`web/brokers?limit=1000`, locale);
  // const brokersData = brokers?.data?.original?.data;
  // setAllBrokers(brokersData);
  // setFilteredBrokers(brokersData);
  // setIsLoading(false);
  // console.log(brokersData);
  // };

  const fetchPageData = async () => {
    setIsLoading(true);
    const brokers = await getData(`web/projects?page=${currentPage}&limit=${itemsPerPage}`, locale);
    const brokersData = brokers?.data?.original?.data;
    setAllBrokers(brokersData);
    setFilteredBrokers(brokersData);
    setTotalPages(brokers.data.original.meta.last_page);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredBrokers(allBrokers);
    } else {
      const results = allBrokers.filter((broker: any) =>
        broker?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setFilteredBrokers(results);
    }
    console.log(searchTerm?.toLowerCase());
  }, [searchTerm, allBrokers]);

  const handlePageChange = (selectedItem: any) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
  };
  // <div><ProjectCard/></div>;
  return (
    <div className="pt-10 pb-0">
      <div className="">
        <input
          type="text"
          placeholder={t("placeholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-100 outline-none border p-3 rounded-xl mx-auto flex mb-5 w-full ss:w-full"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {filteredBrokers?.length > 0 ? (
            // <div className="site_container grid grid-cols-3 gap-5 ss:grid-cols-1 clg:grid-cols-2">
            <div className="all__news--wrapper w-full grid grid-cols-3 gap-x-5 gap-y-16 my-10 md:grid-cols-1 xl:grid-cols-2 border-b-2 pb-24 border-secondary">
              {filteredBrokers.map((broker: any, ind: any) => (
                <motion.div
                  key={ind}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: ind * 0.1 }}
                >
                  <ProjectCard broker={broker} t={t} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p>{t("noResults")}</p>
          )}
          {/* **************************************************************************************************** */}
          {filteredBrokers?.length > 9 && (
            <div className="flex items-center justify-between mt-10">
              <div
                className={`w-fit ${currentPage === 1 && "cursor-not-allowed"} ${
                  totalPages > 1 ? "block" : "hidden"
                }`}
              >
                <button
                  disabled={currentPage === 1}
                  className="pl-2 rtl:pl-0 rtl:pr-2 w-20 h-9 md:w-9 md:pl-0 md:rtl:pr-0 md:justify-center flex justify-start items-center gap-2 active:scale-90 hover:gap-3 transition-all duration-300 ease-in-out border-2 border-custome-blue bg-custome-blue text-custome-white disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => handlePageChange({ selected: currentPage - 2 })}
                >
                  <FontAwesomeIcon className="rotate-180 rtl:rotate-0" icon={faArrowRight} />
                  <span className={`md:hidden `}>{t("Pagination.Previous")}</span>
                </button>
              </div>

              <ReactPaginate
                // previousLabel={"«"}
                // nextLabel={"»"}
                breakLabel={"..."}
                pageCount={totalPages}
                onPageChange={handlePageChange}
                marginPagesDisplayed={3}
                pageRangeDisplayed={5}
                containerClassName="pagination__wrapper"
                previousClassName="pagination__previous"
                nextClassName="pagination__next"
                activeClassName="active__page--pagination"
                disabledClassName="pagination__disabled"
                forcePage={currentPage - 1}
              />
              <div
                className={`w-fit ${currentPage === totalPages && "cursor-not-allowed"} ${
                  totalPages > 1 ? "block" : "hidden"
                }`}
              >
                <button
                  disabled={currentPage === totalPages}
                  className="pl-[9px] rtl:pl-[0px] rtl:pr-[9px] w-[75px] h-9 md:w-9 md:pl-[0px] md:rtl:pr-[0px] md:justify-center flex justify-start items-center gap-2 active:scale-90 hover:gap-3 transition-all duration-300 ease-in-out border-2 border-custome-blue bg-custome-blue text-custome-white disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => handlePageChange({ selected: currentPage })}
                >
                  <span className="md:hidden">{t("Pagination.Next")}</span>
                  <FontAwesomeIcon className="rtl:rotate-180" icon={faArrowRight} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
