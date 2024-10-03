// "use client";
// import { useEffect, useState } from "react";
// import { useFetchPaginatedData } from "@/Hooks/useAxios";
// import { useSearchParams } from "next/navigation";

// // import { ProjectCard } from "./";
// // import {
// // Heading,
// // HelmetTags,
// //   Pagination,
// // } from "@/MainComponents";
// // import { BrokersSlider } from "@/MainComponents";
// // import { useSearchParams } from "react-router-dom";
// import { ErrorMessage, Loader, NoItemsMessage } from "@/SubComponents";
// import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";
// import { OwnCountry } from "@/../src/Store/Features/MiscellaneousSlice";
// import { useSelector } from "react-redux";
// import ProjectCard from "./ProjectDetails/ProjectCard";
// import Heading from "@/components/Heading";
// import Pagination from "@/MainComponents/Pagination";

// export default function Projects() {
//   const { t, i18n } = useTranslation("Pages_Projects");

//   // let [searchParams] = useSearchParams();
//   let searchParams = useSearchParams();
//   // const [page, setPage] = useState<any>(searchParams.get("page") || 1);
//   const [page, setPage] = useState<any>(searchParams.get("page") || 1);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [filteredWord, setFilteredWord] = useState("");

//   const { isLoading, isError, isPaused, error, data, isFetching, isPreviousData }: any =
//     useFetchPaginatedData(
//       `Projects`,
//       page,
//       `${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_PROJECTS}`
//       // ?limit=${
//         // process.env.NEXT_PUBLIC_PAGINATION_LIMIT
//         //   // }&page=${page}?country_id=${localStorage.getItem("country")}`
//       // }&page=${page}?country_id=1`
//     );
//   useEffect(() => {
//     setFilteredProjects(data);
//   }, [data, page]);

//   const theCountry = useSelector(OwnCountry);

//   return (
//     <section className="site_container pt-10  pb-32">
//       {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}
//       <input
//         className="bg-slate-100 outline-none border p-3 rounded-xl mx-auto flex mb-5 w-full ss:w-full"
//         type="text"
//         value={filteredWord}
//         placeholder={t("placeholder")}
//         onChange={(e) => {
//           setFilteredWord(e.target.value);
//           setFilteredProjects(
//             data?.data?.filter((project: any) =>
//               project?.title?.toLowerCase().includes(e.target.value.toLowerCase())
//             )
//           );
//         }}
//       />
//       <Heading style={"text-center"}>
//         {t("heading")} {i18n.language === "ar" ? "في" : "in"} {theCountry?.title}
//       </Heading>
//       <motion.div
//         layout
//         className="all__news--wrapper w-full grid grid-cols-3 gap-x-5 gap-y-16 my-10 md:grid-cols-1 xl:grid-cols-2 border-b-2 pb-24 border-secondary"
//       >
//         {isError || isPaused ? (
//           <ErrorMessage message={t("ErrorMessage")} />
//         ) : isLoading ? (
//           <div className="col-span-3">
//             <Loader />
//           </div>
//         ) : filteredProjects?.length === 0 ? (
//           <div className="col-span-3">
//             <NoItemsMessage message={t("NoItemsMessage")} />
//           </div>
//         ) : (
//           filteredProjects?.map((project: any) => (
//             <ProjectCard key={project?.id} project={project} t={t} />
//           ))
//         )}
//       </motion.div>

//       {data?.meta?.last_page > 1 && (
//         <Pagination page={page} setPage={setPage} data={data} isPreviousData={isPreviousData} />
//       )}
//       {/* {data?.data && <BrokersSlider t={t} style="mt-24" simple />} */}
//     </section>
//   );
// }
