// "use client";
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/rules-of-hooks */
// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import AdsCategoryDetails from "./AdsCategoryDetails";
// import Loader from "@/components/loader/Loader";
// import Heading from "@/components/Heading";
// import NewsCard from "@/CardsComponents/NewsCard";
// import { ErrorMessage, NoItemsMessage } from "@/SubComponents";
// import Link from "next/link";
// import getData from "@/api/getData";
// import LatestProperties from "../PropertyDetails/aside/components/LatestProperties";
// import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";

// export function CategoryDetails() {
//   const { t, i18n } = useTranslation("Pages_CategoryDetails");
//   const [News, setNews] = useState<any>([]);
//   const [filteredNews, setFilteredNews] = useState<any>("");
//   const [isLoading, setIsLoading] = useState<any>(true);
//   const [isError, setIsError] = useState(false);
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await getData(
//           `https://amtalek.com/amtalekadmin/public/api/web/${
//             process.env.NEXT_PUBLIC_SINGLE_CATEGORY_DETAILS
//           }${sessionStorage.getItem("newsCategory")}`,
//           i18n.language
//         );
//         setData(result.data[0]);
//         setNews(result.data[0]?.news?.data);
//         setIsLoading(false);
//       } catch (error) {
//         setIsError(true);
//         setIsLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (filteredNews.length > 0) {
//       const filtered = data?.news?.data?.filter((news: any) =>
//         news?.title.toLowerCase().includes(filteredNews.toLowerCase())
//       );
//       setNews(filtered);
//     } else {
//       setNews(data?.news?.data);
//     }
//   }, [filteredNews, data]);

//   if (isError) {
//     return (
//       <div className="h-[calc(100vh-136px)] flex-center w-full">
//         <ErrorMessage message={t("ErrorMessage")} />
//       </div>
//     );
//   }

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <section className="site_container flex justify-between items-start pt-20 gap-0 clg:gap-4 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
//       <section className="news__Details--content w-[66%] flex flex-col gap-6 clg:w-full">
//         <input
//           value={filteredNews}
//           onChange={(e) => setFilteredNews(e.target.value)}
//           placeholder={t("placeholder")}
//           type="text"
//           className="w-full border outline-none rounded-xl bg-slate-100 p-2 mb-9"
//         />
//         <Heading style="text-center">{data?.title}</Heading>
//         <div className="flex-center" dangerouslySetInnerHTML={{ __html: data?.description }}></div>
//         <h3 className="text-2xl text-center font-medium ">{t("ALL_NEWS")}</h3>
//         <motion.div layout className="all__properties--wrapper w-full grid-auto-fit mb-10">
//           {News?.map((news) => (
//             <NewsCard key={news?.id} news={news} t={t} />
//           ))}
//           {News?.length === 0 && <NoItemsMessage message={t("NoItemsMessage")} />}
//         </motion.div>
//       </section>
//       <section className="news__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-16">
//         <Link aria-label="ads" href="/ad">
//           <AdsCategoryDetails />
//         </Link>
//         <LatestProperties />
//         <FeaturedPropertiesAside />
//       </section>
//     </section>
//   );
// }

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
import { ErrorMessage, NoItemsMessage } from "@/SubComponents";
import Link from "next/link";
import getData from "@/api/getData"; // استيراد دالة getData
import LatestProperties from "../PropertyDetails/aside/components/LatestProperties";
import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";

export function CategoryDetails() {
  const { t, i18n } = useTranslation("Pages_CategoryDetails");
  const [News, setNews] = useState<any>([]);
  const [filteredNews, setFilteredNews] = useState<any>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData(
          `web/${process.env.NEXT_PUBLIC_SINGLE_CATEGORY_DETAILS}${JSON.parse(
            sessionStorage.getItem("newsCategory") || ""
          )}`,
          i18n.language
        );
        setData(result?.data[0]);
        setData(result?.data[0]);
        setNews(result?.data[0]?.news?.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (filteredNews?.length > 0) {
      const filtered = data?.news?.data?.filter((news: any) =>
        news?.title.toLowerCase().includes(filteredNews.toLowerCase())
      );
      setNews(filtered);
    } else {
      setNews(data?.news?.data);
    }
  }, [filteredNews, data]);

  if (isError) {
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
    <section className="site_container flex justify-between items-start pt-20 gap-0 clg:gap-4 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
      <section className="news__Details--content w-[66%] flex flex-col gap-6 clg:w-full">
        <input
          value={filteredNews}
          onChange={(e) => setFilteredNews(e.target.value)}
          placeholder={t("placeholder")}
          type="text"
          className="w-full border outline-none rounded-xl bg-slate-100 p-2 mb-9"
        />
        <Heading style="text-center">{data?.title}</Heading>
        <div
          className="flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></div>
        <h3 className="text-2xl text-center font-medium ">{t("ALL_NEWS")}</h3>
        <motion.div layout className="all__properties--wrapper w-full grid-auto-fit mb-10">
          {News?.map((news: any) => (
            <NewsCard key={news?.id} news={news} t={t} />
          ))}
          {News?.length === 0 && <NoItemsMessage message={t("NoItemsMessage")} />}
        </motion.div>
      </section>
      <section className="news__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-16">
        <Link aria-label="ads" href="/ad">
          <AdsCategoryDetails />
        </Link>
        <LatestProperties />
        <FeaturedPropertiesAside />
      </section>
    </section>
  );
}

// "use client";
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/rules-of-hooks */
// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import AdsCategoryDetails from "./AdsCategoryDetails";
// import Loader from "@/components/loader/Loader";
// import Heading from "@/components/Heading";
// import NewsCard from "@/CardsComponents/NewsCard";
// import { ErrorMessage, NoItemsMessage } from "@/SubComponents";
// // import LatestProperties from "../landingPage/latestProperties/LatestProperties";
// import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";
// import Link from "next/link";
// import getData from "@/api/getData";
// import { useFetchData } from "@/Hooks/useFetchData";
// import LatestProperties from "../PropertyDetails/aside/components/LatestProperties";

// export function CategoryDetails() {
//   const { t } = useTranslation("Pages_CategoryDetails");
//   const [News, setNews] = useState([]);
//   const [filteredNews, setFilteredNews] = useState("");
//   // const { state } = useLocation();

//   const { isLoading, isError, isPaused, error, data, isSuccess }: any = useFetchData(
//     "CategoryDetails",
//     // ${state?.id}
//     `${process.env.NEXT_PUBLIC_SINGLE_CATEGORY_DETAILS}`,
//     false,
//     true
//     // state?.id
//   );
//   if (isError || isPaused) {
//     return (
//       <div className="h-[calc(100vh-136px)] flex-center w-full">
//         <ErrorMessage message={t("ErrorMessage")} />
//       </div>
//     );
//   }

//   if (isLoading) {
//     return <Loader />;
//   }
//   useEffect(() => {
//     if (isSuccess) {
//       setNews(data?.news?.data);
//     }
//   }, [data?.news?.data, isSuccess]);
//   useEffect(() => {
//     if (filteredNews?.length > 0) {
//       setNews(
//         data?.news?.data?.filter((news: any) =>
//           news?.title.toLowerCase().includes(filteredNews?.toLowerCase())
//         )
//       );
//     } else {
//       setNews(data?.news?.data);
//     }
//   }, [filteredNews]);

//   if (isLoading) {
//     return <Loader />;
//   } else
//     return (
//       <section className="site_container  flex justify-between  items-start pt-20 gap-0 clg:gap-4 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
//         {/* <HelmetTags
//           title={t("tab.title", { details: data?.title })}
//           description={t("tab.description")}
//         /> */}
//         <section className="news__Details--content w-[66%]  flex flex-col gap-6 clg:w-full  ">
//           <input
//             value={filteredNews}
//             onChange={(e) => setFilteredNews(e.target.value)}
//             placeholder={t("placeholder")}
//             type="text"
//             className="w-full border outline-none rounded-xl bg-slate-100 p-2 mb-9 "
//           />
//           <Heading style="text-center">{data?.title}</Heading>
//           <div
//             className="flex-center "
//             dangerouslySetInnerHTML={{
//               __html: data?.description,
//             }}
//           ></div>
//           <h3 className="text-2xl text-center font-medium ">{t("ALL_NEWS")}</h3>
//           <motion.div layout className="all__properties--wrapper w-full grid-auto-fit mb-10">
//             {News?.map((news: any) => (
//               <NewsCard key={news?.id} news={news} t={t} />
//             ))}

//             {News?.length === 0 && <NoItemsMessage message={t("NoItemsMessage")} />}
//           </motion.div>
//         </section>
//         <section className="news__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-16">
//           <Link aria-label="ads" href="/ad">
//             {/* start ads */}
//             <AdsCategoryDetails />
//             {/* end ads */}
//           </Link>
//           <LatestProperties />
//           <FeaturedPropertiesAside />
//         </section>
//       </section>
//     );
// }
