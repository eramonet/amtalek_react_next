// import { useFetchData } from "../../Components/Hooks/useAxios.tsx";
// import {
//   Loader,
//   NoItemsMessage,
//   ErrorMessage,
// } from "../../Components/SubComponents/index.ts";
// import { useState } from "react";
// import { Aside } from "../../Components/AsideComponents/index.ts";
// import { useTranslation } from "react-i18next";
// import HelmetTags from "../../Components/MainComponents/HelmetTags.tsx";
// import Heading from "../../Components/MainComponents/Heading.tsx";
// import SubHeading from "../../Components/MainComponents/SubHeading.tsx";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import { motion } from "framer-motion";

// export function Component() {
//   const { t } = useTranslation("Pages_FAQs");

//   const {
//     data: FAQsData,
//     isLoading,
//     isError,
//     isPaused,
//   } = useFetchData("FAQs", import.meta.env.VITE_FAQS);
//   const [currentAccordion, setCurrentAccordion] = useState(0);

//   if (isError || isPaused) {
//     return (
//       <div className="h-[calc(100vh-136px)] w-full flex justify-center items-center">
//         <ErrorMessage message={t("ErrorMessage")} />{" "}
//       </div>
//     );
//   }
//   if (isLoading) {
//     return <Loader />;
//   }
//   if (FAQsData?.length === 0) {
//     return (
//       <div className="h-[calc(100vh-136px)] w-full flex justify-center items-center">
//         <NoItemsMessage message={t("NoItemsMessage")} />
//       </div>
//     );
//   }
//   return (
//     <section className="pt-20 pb-32 md:pb-36 site_container ">
//       <HelmetTags title={t("tab.title")} description={t("tab.description")} />
//       <Heading style={"text-center"}>{t("heading")}</Heading>
//       <SubHeading style="text-start">{t("sub_heading")}</SubHeading>

//       <section className=" site_containe flex justify-betwee items-start pt-20 gap-10 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
//         <section className="faqs__left   flex flex-col gap-12 clg:w-full  ">
//           {FAQsData?.map((question, i) => (
//             <div
//               key={question.id}
//               className={`accordion__wrapper ${
//                 currentAccordion === i ? "h-48" : "h-12"
//               } w-full  border-[1px] border-secondary round overflow-hidden transition-all duration-300 ease-in-out `}
//             >
//               <div className="w-full flex justify-between items-center relative">
//                 <motion.span
//                   initial={{ rotate: 0, translateY: "-50%" }}
//                   animate={
//                     i === currentAccordion
//                       ? { rotate: 180, color: "white" }
//                       : { rotate: 0, color: "#005879" }
//                   }
//                   transition={{ duration: 0.3, bounce: 0.5, type: "spring" }}
//                   className="absolute top-1/2  text-white ltr:right-3 rtl:left-3 w-fit "
//                 >
//                   <FontAwesomeIcon icon={faAngleDown} />
//                 </motion.span>
//                 <h2
//                   dangerouslySetInnerHTML={{ __html: question.question }}
//                   onClick={() => {
//                     if (currentAccordion !== i) {
//                       setCurrentAccordion(i);
//                     } else {
//                       setCurrentAccordion(null);
//                     }
//                   }}
//                   className={`accordion__question w-full ${
//                     currentAccordion === i
//                       ? "bg-secondary text-bg"
//                       : "bg-bg text-secondary"
//                   } h-12 cursor-pointer flex items-center px-5 font-medium text-md`}
//                 ></h2>
//               </div>

//               <div
//                 className={`overflow-y-auto p-5  ${
//                   currentAccordion === i
//                     ? "h-[140px] opacity-100 pointer-events-auto"
//                     : "h-0 opacity-0 pointer-events-none"
//                 } transition-all duration-300 ease-in-out `}
//               >
//                 <p
//                   dangerouslySetInnerHTML={{ __html: question.answer }}
//                   className={`accordion__answer  text-justify  h-full`}
//                 ></p>
//               </div>
//             </div>
//           ))}
//         </section>
//         <section className="faqs__right w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-16">
//           <Aside t={t} />
//         </section>
//       </section>
//     </section>
//   );
// }
