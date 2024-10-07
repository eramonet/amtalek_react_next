// import Image from "next/image";
// import LangLink from "@/components/LangLink";

// export default function CityCard(props: any) {
//   // ${props.city?.title?.replace(/\s/g, "-")}

//   return (
//     <LangLink
//       //   state={""}
//       //! r must be -1 to search in cites and neglect searching in regions in the search page, whereas we check from the last to the first (r => c => cr)
//       // to={`/search?k=&cr=-1&c=${props.city?.id}&r=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=&page=1`}
//       to={``}
//       //           {`/search?k=&cr=${localStorage.getItem("country") || "-1"}&c=${
//       //     props.city?.id
//       //   }&r=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
//       //!for width in sm, the card either be for slider or grid (w-full)
//       className={`sm:w-full group overflow-hidden round ${
//         props.navSlider
//           ? "h-[250px] w-[360px]  "
//           : props.city?.type === "main_slider"
//           ? " h-[528px] w-full hover:-translate-y-2   "
//           : "h-[250px] col-span-1 hover:-translate-y-2   "
//       } my- bg- relative transition-all duration-500 ease-in-out shadow-md `}
//     >
//       <Image
//         width={200}
//         height={200}
//         className="w-full h-full object-cover cursor-pointer group-hover:scale-110 trns "
//         src={props.city?.image}
//         alt={props.city?.title}
//       />
//       <div className="CityCard__gradient--background absolute inset- bottom-0 w-full h-4/5 bg-gradient-to-t opacity- from-secondary/70  flex justify-center items-center flex-col gap- z-40 group-hover:translate-y-1 translate-y-5 transition-all duration-300 ease-in-out text-bg">
//         <h3 title={props?.city?.title} className="text-3xl clg:text-xl font-medium truncate">
//           {props?.city?.title}
//         </h3>

//         <h4 className="rtl:rtl text-2xl ">
//           {props?.t("CityCard.total_count_formatted", {
//             count: props?.city?.properties,
//           })}
//         </h4>
//         <h3 className="rtl:rtl mt-3">
//           {props?.t("CityCard.rent_count_formatted", {
//             count: props?.city?.rent_properties,
//           })}
//         </h3>
//         <h3 className="rtl:rtl ">
//           {props?.t("CityCard.sale_count_formatted", {
//             count: props?.city?.sale_properties,
//           })}
//         </h3>
//       </div>
//     </LangLink>
//   );
// }

// // export default CityCard;
