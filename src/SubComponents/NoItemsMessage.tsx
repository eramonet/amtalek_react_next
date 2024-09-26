// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";

// function NoItemsMessage({ h, message, result, setStep }) {
//   const navigate = useNavigate();
//   const { i18n } = useTranslation();
//   return (
//     <section
//       className={`w-full flex flex-col ${result && "gap-5"} ${
//         h === "screen" ? "h-[calc(100vh-136px)]" : "h-full"
//       } flex justify-center items-center`}
//     >
//       <p className="w-full"> {message}</p>
//       {result && (
//         <button
//           className="bg-primary/80 text-white rounded-xl hover:text-primary hover:bg-white border transition duration-300 text-lg px-5"
//           onClick={() => {
//             setStep((prev) => prev - 1);
//             navigate(-1);
//           }}
//         >
//           {i18n.language === "ar" ? "العودة" : "Back"}
//         </button>
//       )}
//     </section>
//   );
// }

// export default NoItemsMessage;
