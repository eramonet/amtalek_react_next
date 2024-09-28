// "use client";
// import getData from "@/api/getData";
// import { useFetchData } from "@/Hooks/useFetchData";
// import { usePostData } from "@/Hooks/usePostData";
// import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { QueryClient } from "@tanstack/react-query";
// // import { Box, IconButton, Menu, Tooltip } from "@mui/material";

// // import Link from "next/link";
// // import { useState } from "react";
// // import { FaChevronDown } from "react-icons/fa";
// // import { FaCircleUser } from "react-icons/fa6";
// import type { MenuProps } from "antd";
// import { Dropdown, Badge } from "antd";
// import { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// export default function ButtonNavbarLogin() {
//   const [anchorEl, setAnchorEl] = useState<any>(null);
//   const dispatch = useDispatch();

//   const open = Boolean(anchorEl);
//   const user = useSelector(userData);

//   const handleClick = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const [count, setCount] = useState(5);
//   const handleclick = useCallback(() => {
//     if (!user?.token) {
//       dispatch(setShowLoginPopUp(true));
//     }
//   }, [user?.token, dispatch]);

//   // const clientquery = new QueryClient();
//   // const {
//   //   data: notifications,
//   //   isSuccess,
//   //   refetch,
//   // } = useFetchData(
//   //   "notifications",
//   //   `https://amtalek.com/amtalekadmin/public/api/web/my-notifications`,
//   //   false,
//   //   false,
//   //   "",
//   //   30 * 60 * 1000,
//   //   5 * 60 * 1000,
//   //   !!user?.token
//   // );

//   const [notifications, setNotifications] = useState([]);

//   async function fetchData() {
//     const notificationsData = await getData(`web/my-notifications`, "ar");
//     setNotifications(notificationsData?.data);
//   }

//   // console.log(notifications);

//   // const { mutate } = usePostData(false, () => {
//   // clientquery.invalidateQueries(["notifications"]);
//   // refetch();
//   // });
//   const items: MenuProps["items"] | undefined = true;
//   useEffect(() => {
//     fetchData();
//     // if (!user?.token) {
//     //   setCount(0);
//     // } else {
//     //   setCount(notifications?.unseen_counter);
//     // }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     //   <div className="sigin__wrapper group relative ">
//     //     <Box
//     //       sx={{
//     //         display: "flex",
//     //         alignItems: "center",
//     //         textAlign: "center",
//     //         width: "fit-content",
//     //       }}
//     //     >
//     //       <Tooltip title={null}>
//     //         <IconButton
//     //           onClick={handleClick}
//     //           size="small"
//     //           aria-controls={open ? "account-menu" : undefined}
//     //           aria-haspopup="true"
//     //           aria-expanded={open ? "true" : undefined}
//     //         >
//     //           <button className="round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary border-2 border-secondary ">
//     //             <FaCircleUser />
//     //             <FaChevronDown />
//     //           </button>
//     //         </IconButton>
//     //       </Tooltip>
//     //     </Box>

//     //     <Menu
//     //       anchorEl={anchorEl}
//     //       id="account-menu"
//     //       open={open}
//     //       onClose={handleClose}
//     //       onClick={handleClose}
//     //       PaperProps={{
//     //         elevation: 0,
//     //         sx: {
//     //           overflow: "visible",
//     //           filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//     //           mt: 1.5,
//     //           "& .MuiAvatar-root": {
//     //             width: 32,
//     //             height: 32,
//     //             ml: -0.5,
//     //             mr: 1,
//     //           },
//     //           "&::before": {
//     //             content: '""',
//     //             display: "none",
//     //             position: "absolute",
//     //             top: 0,
//     //             right: 14,
//     //             width: 10,
//     //             height: 10,
//     //             bgcolor: "background.paper",
//     //             transform: "translateY(-50%) rotate(45deg)",
//     //             zIndex: 0,
//     //           },
//     //           "& .MuiList-padding": {
//     //             padding: "0 !important",
//     //           },
//     //         },
//     //       }}
//     //       transformOrigin={{ horizontal: "right", vertical: "top" }}
//     //       anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//     //     >
//     //       <div className={`signin__menu  w-72 h-96 `}>
//     //         <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md round ">
//     //           {/* <img className="w-14  aspect-square" src={favIconSrc} alt="fav-icon" /> */}

//     //           <h3 className="text-2xl font-medium text-center">
//     //             {"Navbar.Login_drop_down_menu.heading"}
//     //           </h3>
//     //           <p className="opacity-70">{"Navbar.Login_drop_down_menu.sub_heading"}</p>
//     //           <Link
//     //             href="/Login"
//     //             className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3"
//     //           >
//     //             {"Navbar.Login_drop_down_menu.Login_btn_txt"}
//     //           </Link>
//     //           <Link
//     //             href="/register"
//     //             className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out  hover:bg-secondary hover:text-bg text-secondary text-lg"
//     //           >
//     //             {"Navbar.Login_drop_down_menu.Register_btn_txt"}
//     //           </Link>
//     //         </div>
//     //       </div>
//     //     </Menu>
//     //   </div>
//     <>
//       {user?.actor_type === "user" && (
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
//     </>
//   );
// }
