// import { useTranslation } from "react-i18next";
// import { useFetchData } from "../../Components/Hooks/useAxios.tsx";
// import { ErrorMessage, Loader } from "../../Components/SubComponents/index.ts";
// import HelmetTags from "../../Components/MainComponents/HelmetTags.tsx";
// import { useParams } from "react-router-dom";
// export function Component() {
//   const { t, i18n } = useTranslation("Pages_TermsConditions");

//   const { data, isLoading, isError, isPaused } = useFetchData(
//     "TermsConditions",
//     import.meta.env.VITE_TERMS
//   );
//   const { page } = useParams();

//   return (
//     <section className="pt-20 pb-32 md:pb-36 site_container ">
//       <HelmetTags
//         title={t(
//           "tab.title",
//           i18n.language === "ar" ? { details: "سياسة الخصوصية" } : { details: page?.toUpperCase() }
//         )}
//         description={t("tab.description")}
//       />

//       {/* <Heading style={"text-center"}>{t("heading")}</Heading> */}
//       {/* <SubHeading>{t("sub_heading")}</SubHeading> */}
//       <div className="flex justify-between items-start md:flex-col md:items-center gap-28 md:gap-20 mt-10">
//         {isError || isPaused ? (
//           <ErrorMessage message={t("ErrorMessage")} />
//         ) : isLoading ? (
//           <Loader />
//         ) : (
//           <>
//             <div className="terms__right  w-full">
//               <h2 className="font-medium text-xl mb-5 underline underline-offset-8 decoration-wavy decoration-primary/50 leading-10 md:text-center">
//                 {t("Privacy.title")}
//               </h2>
//               <p dangerouslySetInnerHTML={{ __html: data?.privacy }} className="text-justify"></p>
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// }
