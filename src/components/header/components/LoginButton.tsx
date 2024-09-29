// "use client";

// import { faBell, faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Badge, Dropdown, Menu, MenuProps, Tooltip } from "antd";
// import Image from "next/image";
// import Link from "next/link";
// import favIconSrc from "@/assets/images/fav-icon.png";
// import NavDropDownMenu from "./NavDropDownMenu";
// import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { TbSocial } from "react-icons/tb";
// import { Box, IconButton } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import { useCallback, useEffect, useState } from "react";
// import { usePostData } from "@/Hooks/usePostData";
// import { QueryClient } from "@tanstack/react-query";
// import { useFetchData } from "@/Hooks/useFetchData";
// import { CiClock2 } from "react-icons/ci";

// export default function LoginButton() {
//   const user = useSelector(userData) as any;
//   const userProfile = user.data;
//   const { t, i18n } = useTranslation("LayoutComponents");
//   const [anchorEl, setAnchorEl] = useState<any>(null);
//   const open = Boolean(anchorEl);
//   const dispatch = useDispatch();

//   const handleClick = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const clientquery = new QueryClient();
//   const {
//     data: notifications,
//     isSuccess,
//     refetch,
//   } = useFetchData(
//     "notifications",
//     `my-notifications`,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     5 * 60 * 1000,
//     !!user?.token
//   );

//   const { mutate } = usePostData(false, () => {
//     clientquery.invalidateQueries(["notifications"]);
//     refetch();
//   });

//   const items: MenuProps["items"] | undefined = isSuccess
//     ? notifications?.unseen_counter !== 0
//       ? [
//           {
//             key: "0",
//             label: (
//               <span className="flex cursor-default hover:bg-none items-center  gap-2 bg-slate rounded p-1 absolute -top-8 left-1/2 -translate-x-1/2 font-medium text-lg w-full">
//                 {i18n.language?.startsWith("ar") ? "اخر الاشعارات" : "Latest Notifications"}
//               </span>
//             ),
//           },
//           ...notifications?.notifications?.map((item) => ({
//             key: item?.id,
//             label: (
//               <Link
//                 onClick={() => mutate({ api: `see-my-notification/${item?.id}` })}
//                 to={item?.notification_type === "offer" ? "my-received-offers" : "messages"}
//                 className={`w-full flex items-center p-1 gap-5 rounded ${
//                   item?.seen_status === "no" ? "bg-gray-100" : ""
//                 }`}
//               >
//                 <Image
//                   width={1000}
//                   height={1000}
//                   src={
//                     item?.sender_data?.image === ""
//                       ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
//                       : item?.sender_data?.image
//                   }
//                   className="w-12 h-12 rounded-full"
//                   alt="dsa"
//                 />
//                 <div className="flex flex-1 flex-col gap-1">
//                   <h2 className="font-semibold text-slate-600">{item?.title}</h2>
//                   <span className="text-slate-500">{item?.description}</span>
//                   <span className="text-xs text-slate-400 flex items-center gap-1">
//                     <CiClock2 /> {item?.time}
//                   </span>
//                 </div>
//               </Link>
//             ),
//           })),
//           {
//             key: "1543",
//             className: "!sticky bg-white bottom-[-4px] hover:!bg-white",
//             label: (
//               <Link
//                 state={{ notifications }}
//                 href="notifications"
//                 className=" flex items-center justify-center !text-white border border-primary hover:bg-white mx-auto hover:!text-primary p-1 gap-5 rounded bg-primary w-[90%]"
//               >
//                 {i18n.language?.startsWith("ar")
//                   ? "اظهار جميع الاشعارات"
//                   : "Show all Notifications"}
//               </Link>
//             ),
//           },
//         ]
//       : [
//           {
//             key: "0",
//             label: (
//               <div className="!w-full !h-[230px] flex justify-center items-center bg-slate-100 rounded flex-col gap-7 cursor-default">
//                 <span className="bell fa fa-bell">
//                   <FontAwesomeIcon className={`text-6xl`} icon={faBell} />
//                 </span>
//                 <p>{i18n.language?.startsWith("ar") ? "لا توجد اشعارات" : "No Notifications"}</p>
//                 <Link
//                   state={{ notifications }}
//                   href="notifications"
//                   className=" flex items-center justify-center text-white border border-primary hover:bg-transparent hover:text-primary p-1 gap-5 rounded bg-primary w-[90%] "
//                 >
//                   {i18n.language?.startsWith("ar")
//                     ? "اظهار جميع الاشعارات"
//                     : "Show all Notifications"}
//                 </Link>
//               </div>
//             ),
//           },
//         ]
//     : undefined;

//   const [count, setCount] = useState(5);
//   const handleclick = useCallback(() => {
//     if (!user?.token) {
//       dispatch(setShowLoginPopUp(true));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user?.token, dispatch]);
//   useEffect(() => {
//     if (!user?.token) {
//       setCount(0);
//     } else {
//       setCount(notifications?.unseen_counter);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user, notifications?.unseen_counter]);

//   return (
//     <div className="nav__CTAs flex items-center gap-10 ss:ltr:gap-3 ss:rtl:gap-2">
//       {userProfile?.actor_type === "user" && (
//         <span onClick={handleClick}>
//           <Dropdown
//             rootClassName="navnot"
//             trigger={user?.token ? ["click"] : []}
//             menu={{ items }}
//             placement="bottom"
//           >
//             <Badge
//               showZero
//               classNames={{
//                 indicator: "!text-[14px] rtl:!left-2 !rounded-full !px-1",
//               }}
//               className="cursor-pointer !text-[11px]"
//               size="default"
//               count={count}
//             >
//               <FontAwesomeIcon icon={faBell} className="text-secondary text-2xl cursor-pointer" />
//             </Badge>
//           </Dropdown>
//         </span>
//       )}
//       <Link
//         href="/coming-soon"
//         className="market__btn  round  h-10  flex justify-center items-center gap-2 px-2 sm:px-3 py-[6px] bg-red500 transition-all duration-300 ease-in-out  hover:bg-transparent hover:text-red500 text-bg text-md border-2 border-red500"
//       >
//         <TbSocial />
//         <span className="sm:hidden ">{t("Navbar.social.title")}</span>
//       </Link>
//       {user?.token ? (
//         <NavDropDownMenu ForRealEstate={true} user={user} userProfile={userProfile} />
//       ) : (
//         <div className="sigin__wrapper group relative ">
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               textAlign: "center",
//               width: "fit-content",
//             }}
//           >
//             <Tooltip title={null}>
//               <IconButton
//                 onClick={handleClick}
//                 size="small"
//                 aria-controls={open ? "account-menu" : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? "true" : undefined}
//               >
//                 <button className="round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary border-2 border-secondary ">
//                   <FontAwesomeIcon className="font-light text-2xl " icon={faCircleUser} />
//                   <FontAwesomeIcon className=" text-[0.9rem]" icon={faChevronDown} />
//                 </button>
//               </IconButton>
//             </Tooltip>
//           </Box>

//           <Menu
//             anchorEl={anchorEl}
//             id="account-menu"
//             open={open}
//             onClose={handleClose}
//             onClick={handleClose}
//             PaperProps={{
//               elevation: 0,
//               sx: {
//                 overflow: "visible",
//                 filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                 mt: 1.5,
//                 "& .MuiAvatar-root": {
//                   width: 32,
//                   height: 32,
//                   ml: -0.5,
//                   mr: 1,
//                 },
//                 "&::before": {
//                   content: '""',
//                   display: "none",
//                   position: "absolute",
//                   top: 0,
//                   right: 14,
//                   width: 10,
//                   height: 10,
//                   bgcolor: "background.paper",
//                   transform: "translateY(-50%) rotate(45deg)",
//                   zIndex: 0,
//                 },
//                 "& .MuiList-padding": {
//                   padding: "0 !important",
//                 },
//               },
//             }}
//             transformOrigin={{ horizontal: "right", vertical: "top" }}
//             anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//           >
//             <div className={`signin__menu  w-72 h-96 `}>
//               <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md round ">
//                 <Image
//                   width={1000}
//                   height={1000}
//                   className="w-14  aspect-square"
//                   src={favIconSrc}
//                   alt="fav-icon"
//                 />

//                 <h3 className="text-2xl font-medium text-center">
//                   {t("Navbar.Login_drop_down_menu.heading")}
//                 </h3>
//                 <p className="opacity-70">{t("Navbar.Login_drop_down_menu.sub_heading")}</p>
//                 <Link
//                   href="/Login"
//                   className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3"
//                 >
//                   {t("Navbar.Login_drop_down_menu.Login_btn_txt")}
//                 </Link>
//                 <Link
//                   href="/register"
//                   className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out  hover:bg-secondary hover:text-bg text-secondary text-lg"
//                 >
//                   {t("Navbar.Login_drop_down_menu.Register_btn_txt")}
//                 </Link>
//               </div>
//             </div>
//           </Menu>
//         </div>
//       )}
//     </div>
//   );
// }
