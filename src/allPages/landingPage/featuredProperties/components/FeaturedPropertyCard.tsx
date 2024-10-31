// "use client";
// import { faBath, faBed, faEye, faMaximize } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { usePostData } from "@/Hooks/useAxios";
// // import LangLink from "../MainComponents/LangLink";
// import { FaCamera } from "react-icons/fa";

// import { TUser } from "@/Types/AppTypes";
// import { useOutletContext } from "react-router-dom";
// import { CiLocationOn } from "react-icons/ci";
// import i18next from "i18next";
// import Image from "next/image";
// import LangLink from "@/components/LangLink";
// import { usePostData } from "@/Hooks/usePostData";
// import { useEffect, useState } from "react";
// import { userData } from "@/Store/Features/AuthenticationSlice";
// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

// function FeaturedPropertyCard(props: any) {
//   // const [userProfileDataOutlet, refetch] = useOutletContext() as [TUser, () => void];
//   const { i18n } = useTranslation();
//   const [userProfileDataOutlet, setUserProfileDataOutlet] = useState<any>([]);
//   const user = useSelector(userData);

//   async function getUserProfile(token: string, language: string) {
//     try {
//       const response = await fetch(
//         `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Accept-Language": language,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const dataProfile = await response.json();

//       setUserProfileDataOutlet(dataProfile?.data);
//     } catch (error) {
//       console.error("Failed to fetch user profile:", error);
//     }
//   }

//   useEffect(() => {
//     if (user?.token && i18n.language) {
//       getUserProfile(user?.token, i18n?.language);
//       // getNotifications(user?.token);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user?.token, i18n.language]);

//   const { mutate }: any = usePostData(
//     true,
//     () => {
//       // refetch();
//       //like from all properties doesn't have onSuccuss and favorites page can only unlike the property, so it has onSuccess
//       props?.onSuccess ? props?.onSuccess(props.slide?.id) : "";
//     },
//     true,
//     () => {}
//   );

//   return (
//     <div className="w-full max-w-[90%  sm:max-w-full h-[600px] clg:h-[440px] ss:h-[500px] fmd:h-[650px] shadow- bg-">
//       <div className="img-slider-wrapper relative w-full max-h-[360px]  round  group">
//         <div className="img__wrapper w-full h-[450px] max-h-[560px] clg:h-[260px]  clg:max-h-[260px] fmd:h-[360px] fmd:max-h-[360px] overflow-hidden round ">
//           <Image
//             width={1000}
//             height={1000}
//             className="w-full  h-full max-h-full object-cover  cursor-pointer group-hover:scale-110 trns"
//             src={props.slide?.primary_image}
//             alt={props.slide?.title}
//             // loading="lazy"
//           />
//         </div>
//         <div className="absolute top-3 z-40 flex gap-1  flex-col right-10  py-1 rtl:right-auto rtl:left-3 rtl:rtl ">
//           {props.slide?.for_what && (
//             <div className="property__type  text-sm round   bg-accent text-secondary  w-full text-center px-3 py-1">
//               {props?.t("FeaturedPropertyCard.for_what", {
//                 context: props.slide?.for_what,
//               })}
//             </div>
//           )}
//           <div className="w-fit mx-auto px-3 flex gap-1 items-center justify-center rtl:flex-row-reverse bg-white rounded">
//             <FaCamera size={15} />
//             <span>{props.slide?.images_count}</span>
//           </div>
//         </div>

//         <LangLink
//           to={`/Agencies/${props.slide?.broker_details?.[0]?.name?.replace(/\s/g, "-")}/${
//             props.slide?.broker_details?.[0]?.id
//           }/${props.slide?.broker_details?.[0]?.broker_type}`}
//           className="broker__details round max-w-[75%] flex justify-start items-center bg-bg py-2 px-3  gap-3 w-fit absolute top-3 left-3 rtl:left-auto rtl:right-3 rtl:rtl z-40"
//           title={props.slide?.broker_details?.[0]?.name}
//         >
//           <Image
//             width={1000}
//             height={1000}
//             src={props.slide?.broker_details?.[0]?.logo}
//             alt={props.slide?.broker_details?.[0]?.name}
//             className="broker__img w-8 min-w-[32px] aspect-square cursor-pointer object-fill rounded-full border-[1px] border-secondary"
//           />
//           <p className="text-sm truncate">{props.slide?.broker_details?.[0]?.name}</p>
//         </LangLink>
//         <div className="property__details absolute  round   overflow-hidden w-[89%]  h- translate-x-1/2 right-1/2 -bottom-16 translate-y-[41.5%] asm:translate-y-[28%] bg-bg z-40 p-2">
//           <div className="border-[3px] border-secondary round">
//             <div className="title__location--love p-3 flex justify-between items-center bg- h-1/3 relative group/parent overflow-hidden cursor-pointer hover:text-bg rtl:rtl">
//               <div
//                 className="hover__bg bg-secondary absolute w-full h-full left-0 -translate-x-full  origin-left  group-hover/parent:-translate-x-0

//               rtl:left-auto rtl:right-0 rtl:translate-x-full  rtl:origin-right  rtl:group-hover/parent:translate-x-0

//               z-0 transition-all duration-[350ms]  ease-in-out  group-hover/parent:origin-lef "
//               ></div>
//               <div className="title__location  w-full">
//                 <LangLink
//                   to={`/properties/${props.slide?.listing_number}/${props.slide?.title?.replace(
//                     /\s/g,
//                     "-"
//                   )}`}
//                   className="Featured__slide--title text-2xl clg:text-xl ss:text-lg leading-7 font-medium block truncate relative z-20  max-w-[90%] "
//                   title={props.slide?.title}
//                 >
//                   {props.slide?.title}
//                 </LangLink>
//                 <h5 className="Featured__slide--location text-sm opacity-80 truncate">
//                   {props.slide?.address}
//                 </h5>
//               </div>
//               {userProfileDataOutlet?.actor_type !== "broker" && (
//                 <div
//                   className="property__love cursor-pointer bg-accent absolute top-0 right-0 rtl:right-auto rtl:left-0 p-2"
//                   onClick={!props?.user?.token ? props?.ShowLoginPopUp : () => {}}
//                 >
//                   <div className="heart-container" title="Like">
//                     {props?.user?.token && (
//                       <input
//                         defaultChecked={Boolean(Number(props.slide?.is_fav))}
//                         type="checkbox"
//                         className="heart-checkbox"
//                         id={props.slide?.id}
//                         onChange={() =>
//                           mutate({
//                             api: process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE,
//                             data: { property_id: props.slide?.id },
//                           })
//                         }
//                       />
//                     )}
//                     <div className="svg-container">
//                       <svg
//                         viewBox="0 0 24 24"
//                         className="svg-outline"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
//                       </svg>
//                       <svg
//                         viewBox="0 0 24 24"
//                         className="svg-filled"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
//                       </svg>
//                       <svg
//                         className="svg-celebrate"
//                         width="100"
//                         height="100"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <polygon points="10,10 20,20"></polygon>
//                         <polygon points="10,50 20,50"></polygon>
//                         <polygon points="20,80 30,70"></polygon>
//                         <polygon points="90,10 80,20"></polygon>
//                         <polygon points="90,50 80,50"></polygon>
//                         <polygon points="80,80 70,70"></polygon>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="w-full flex">
//               <div className="w-full flex flex-col border-r-2 border-r-secondary ">
//                 <div className="property__details--bottom  flex  rtl:rtl justify-between items-center h-full bg- gap-2 border-t-2 border-t-secondary px-3 clg:py-3  py-2">
//                   <h5 className="property__size  text-center text-xs font-medium clg:text-[10px] bmd:text-xs smtext-[9px] flex items-center ">
//                     <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faMaximize} />

//                     {props?.t("FeaturedPropertyCard.area_formatted", {
//                       area: props.slide?.land_area,
//                     })}
//                   </h5>

//                   <h5 className="bedrooms__number  text-center text-xs font-medium  clg:text-[10px] bmd:text-xs smtext-[9px] ">
//                     <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faBed} />{" "}
//                     {props?.t("FeaturedPropertyCard.Bedrooms", {
//                       count: props.slide?.bed_rooms_no,
//                     })}
//                   </h5>
//                   <h5 className="rooms__number  text-center text-xs font-medium clg:text-[10px] bmd:text-xs smtext-[9px] ">
//                     <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faBath} />{" "}
//                     {props?.t("FeaturedPropertyCard.Bathrooms", {
//                       count: props.slide?.bath_room_no,
//                     })}
//                   </h5>
//                 </div>
//                 <div className="w-full border-secondary border-t-2 flex rtl:flex-row-reverse items-center gap-2 p-2 text-sm clg:text-[12px]">
//                   <CiLocationOn />{" "}
//                   {/* <span className="text-start truncate">
//                     {props.slide?.country}
//                   </span>{" "}
//                   |{" "} */}
//                   <span className="text-start truncate">{props.slide?.city}</span> |{" "}
//                   <span className="truncate">{props.slide?.region}</span>
//                   {props?.slide?.sub_region && (
//                     <>
//                       | <span className="truncate">{props.slide?.sub_region}</span>
//                     </>
//                   )}
//                 </div>
//               </div>
//               <div className="property__pric clg:hidden hidden   sm:min-w-[20px]  border-secondary text-center font-bold text-base asm:text-xs  !h-full    rtl:text-center border-t-2  rtl:pl-0 rtl:pr- flex flex-col jus">
//                 {props?.t("PropertyCard.price_formatted", {
//                   context: props.slide?.for_what,
//                   sale_price: props.slide?.sale_price,
//                   rent_price: props.slide?.rent_price,
//                   curr: props.slide?.currency,
//                   duration: props.slide?.rent_duration,
//                 })}
//               </div>
//             </div>
//             <div
//               //!this duplicated element o handle  responsive issue
//               className="hidde clg:block text-center font-bold text-base   px-3 py-1 border-t-2 border-t-secondary"
//               style={i18n.language.startsWith("ar") ? { direction: "rtl" } : { direction: "ltr" }}
//             >
//               {props?.t("PropertyCard.price_formatted", {
//                 context: props.slide?.for_what,
//                 sale_price: props.slide?.sale_price,
//                 rent_price: props.slide?.rent_price,
//                 curr: props.slide?.currency,
//                 duration: props.slide?.rent_duration,
//               })}
//             </div>
//           </div>
//         </div>
//         <LangLink
//           to={`/properties/${props.slide?.listing_number}/${props.slide?.title?.replace(
//             /\s/g,
//             "-"
//           )}`}
//           className="slide__hover_eye absolute inset-0 w-full h-full bg-secondary/40 transition-all duration-300 ease-in-out flex justify-center items-center group-hover:opacity-100 opacity-0 z-0 cursor-pointer"
//         >
//           <FontAwesomeIcon className="text-4xl text-grey" icon={faEye} />
//         </LangLink>
//       </div>
//     </div>
//   );
// }

// export default FeaturedPropertyCard;
