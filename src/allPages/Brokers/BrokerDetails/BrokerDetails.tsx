"use client";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ErrorMessage, Loader, NoItemsMessage } from "@/SubComponents";
import BrokerProperties from "./BrokerProperties";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AdsBroker from "./AdsBroker";
import Heading from "@/components/Heading";
import SendMessageForm from "@/allPages/PropertyDetails/components/SendMessageForm";
import SearchForm from "@/MainComponents/SearchForm";
import BrokerInfo from "@/MainComponents/BrokerInfo";
import ProjectCard from "@/allPages/project/components/ProjectCard";
import { userData } from "@/Store/Features/AuthenticationSlice";
// import Head from "next/head";
import ReactPaginate from "react-paginate";
import SearchFormTwo from "@/allPages/search/SearchFormTwo";

export function BrokerDetails({ locale, actor_type, id }: any) {
  const { t, i18n } = useTranslation("Pages_BrokerDetails");
  const [tab, setTab] = useState("sale");
  // const { brokerName, brokerID, type } = useParams();
  const user = useSelector(userData);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState<any>(0);

  useEffect(() => {
    const fetchBrokerDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_SINGLE_BROKER_DETAILS}${id}/${actor_type}`,
          {
            method: "GET",
            headers: {
              lang: i18n.language,
              ...(user?.token && { Authorization: `Bearer ${user?.token}` }), // أضف التوكن إذا كان موجودًا
            },
          }
        );
        const result = await response.json();
        setData(result?.data[0]);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, actor_type, i18n.language, locale]);

  if (error) {
    return (
      <div className="h-[calc(100vh-136px)] flex-center w-full">
        <ErrorMessage message={t("ErrorMessage")} />
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }
  const itemsPerPage = 5; // عدد العناصر في كل صفحة

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem?.selected);
  };

  const paginatedData = data?.projects?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  // console.log(data?.projects); // Add this line to console.log
  return (
    <>
      <section className="site_container flex justify-between items-start pt-20 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
        <section className="broker__Details--content w-[66%] flex flex-col gap-16 clg:w-full">
          <BrokerInfo i18n={i18n} data={data} t={t} />
          {user?.token && (
            <div className="broker__send--message">
              <Heading>{t("send_Message")}</Heading>
              <SendMessageForm
                params={{
                  vendor_id: data?.id,
                  broker_type: data?.broker_type,
                }}
                api={process.env.NEXT_PUBLIC_SEND_MESSAGE_TO_BROKER}
                type="BrokerDetails__Message"
                t={t}
              />
            </div>
          )}

          <div className="broker__properties w-full bg-slate-100 rounded-xl p-5">
            <div className="w-full flex gap-10 ss:gap-4">
              <Heading
                className={`cursor-pointer text-base ss:text-[12px] p-1 transition-[300] ${
                  tab === "sale" ? "bg-[#005879] text-white rounded" : "bg-white text-[#005879]"
                }`}
                onClick={() => setTab("sale")}
              >
                {t("Properties.sell")} (
                {actor_type === "broker"
                  ? data?.property_for_sale
                  : data?.submitted_props_for_sale?.length}
                )
              </Heading>
              <Heading
                className={`cursor-pointer text-base ss:text-[12px] p-1 transition-[300] ${
                  tab === "rent" ? "bg-[#005879] text-white rounded" : "bg-white text-[#005879]"
                }`}
                onClick={() => setTab("rent")}
              >
                {t("Properties.rent")} (
                {actor_type === "broker"
                  ? data?.property_for_rent
                  : data?.submitted_props_for_rent?.length}
                )
              </Heading>

              {data?.broker_type === "broker" && (
                <Heading
                  onClick={() => setTab("projects")}
                  className={`cursor-pointer text-base ss:text-[12px] p-1 transition-[300] ${
                    tab === "projects"
                      ? "bg-[#005879] text-white rounded"
                      : "bg-white text-[#005879]"
                  }`}
                >
                  {t("projects")} ({data?.projects_count})
                </Heading>
              )}
            </div>

            {data?.properties_count > 0 && (
              <p className="my-2 ps-2">
                {data?.name} {t("properties_count")}
              </p>
            )}

            {tab === "sale" || tab === "rent" ? (
              <BrokerProperties
                actor_type={actor_type}
                id={id}
                userpropSuccess={true}
                brokerDetails
                tab={tab}
                userProperties_for_sale={data?.property_for_sale}
                userProperties_for_rent={data?.property_for_rent}
                t={t}
              />
            ) : tab === "projects" && data?.projects?.length > 0 ? (
              <motion.div className="w-full flex flex-col gap-24 ss:gap-16">
                {/* {paginatedData.map((project: any) => ( */}
                {data?.projects?.map((project: any) => (
                  <ProjectCard type="BrokerDetails" broker={project} t={t} key={project.id} />
                ))}
                {/* <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={Math.ceil(data?.projects.length / itemsPerPage)}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                /> */}
              </motion.div>
            ) : (
              <NoItemsMessage message={t("BrokerProjects.NoItemsMessage")} />
            )}
          </div>
        </section>

        <section className="broker__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-16">
          <div className="w-full clg:hidden">
            {/* <SearchForm type={"asideForm"} showOptions locale={locale} /> */}
            <SearchFormTwo type={"asideForm"} showOptions locale={locale} />
          </div>
          <div className="w-full hidden clg:block">
            {/* <SearchForm type={"bigForm"} showOptions locale={locale} /> */}
            <SearchFormTwo type={"bigForm"} showOptions locale={locale} />
          </div>
          <AdsBroker />
        </section>
      </section>
    </>
  );
}
