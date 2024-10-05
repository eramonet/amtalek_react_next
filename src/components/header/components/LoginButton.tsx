/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { memo, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiClock2 } from "react-icons/ci";
import { faChevronDown, faCircleUser, faBell } from "@fortawesome/free-solid-svg-icons";
import favIconSrc from "@/assets/images/fav-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "@/Store/Features/AuthenticationSlice";
import NavDropDownMenu from "./NavDropDownMenu";
import { useTranslation } from "react-i18next";
import { lang } from "@/Store/Features/MiscellaneousSlice";
// import { LangLink, LangNavLink } from "../MainComponents/index.ts";
// import { Link, useLocation } from "react-router-dom";
// import { useRouter } from "next/router";
import logoImg from "@/assets/images/navEnLogo.png";
import arlogoImg from "@/assets/images/navArLogo.png";
import { TbSocial } from "react-icons/tb";
// import Box from "@mui/material/Box";
// import Menu from "@mui/material/Menu";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import type { MenuProps } from "antd";
import { Dropdown, Badge } from "antd";
import { setShowLoginPopUp } from "@/Store/Features/AuthenticationSlice";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { QueryClient } from "@tanstack/react-query";
import Image from "next/image.js";
import LangLink from "@/components/LangLink";
import LangNavLink from "@/components/LangNavLink";
import { Tooltip } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ButtonNavbar from "./ButtonNavbar";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import getData from "@/api/getData";
// const LoginButton = memo(function LoginButton({ userdata }: any) {
const LoginButton = memo(function LoginButton() {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const lng = useSelector(lang);

  const { t, i18n } = useTranslation("LayoutComponents");

  const lng = i18n.language.startsWith("ar") ? "" : "en";

  const user = useSelector(userData);

  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState([]);

  async function getUserProfile(token: string, language: string) {
    try {
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": language,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataProfile = await response.json();
      setUserProfileDataOutlet(dataProfile?.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }

  useEffect(() => {
    if (user?.token && i18n.language) {
      getUserProfile(user?.token, i18n?.language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, i18n.language]);

  console.log(userProfileDataOutlet);

  const [burgerChecked, setBurgerChecked] = useState(false);
  const dispatch = useDispatch();
  function handleBurgerChange(e: any) {
    if (e.target.checked) {
      setBurgerChecked(true);
    } else {
      setBurgerChecked(false);
    }
  }

  // function changeLanguage(lang: string) {
  //   // i18n.changeLanguage(lang);
  //   // window.location.replace(window.location.href.replace(lng, lang));
  //   // window.location.replace(window.location.href.replace(lng, lang));
  //   i18n.changeLanguage(lang);
  //   lang === "ar"
  //     ? window.location.replace(window.location.origin)
  //     : // : window.location.replace(window.location.href.replace(lng, lang));
  //       window.location.replace(window.location.origin + "/en");
  //   // localStorage.setItem("i18nextLng", lang);
  // }

  const router: any = [];
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [window.location.pathname]);
  const clientquery = new QueryClient();
  // const [notifications, setNotifications]= useState([]);

  const {
    data: notifications,
    isSuccess,
    refetch,
  }: any = useFetchData(
    "notifications",
    `my-notifications`,
    false,
    false,
    "",
    30 * 60 * 1000,
    5 * 60 * 1000,
    !!user?.token
  );
  const { mutate } = usePostData(
    false,
    () => {
      // clientquery.invalidateQueries(["notifications"]);
      clientquery.invalidateQueries({ queryKey: ["notifications"] });

      refetch();
    },
    false, // Provide value for authorizedAPI (e.g., false)
    (error) => {
      console.error("An error occurred:", error);
    } // Provide value for onError);
  );
  if (!router) {
    return null; // أو يمكن عرض شيء آخر
  }
  const items: MenuProps["items"] | undefined = isSuccess
    ? notifications?.unseen_counter !== 0
      ? [
          {
            key: "0",
            label: (
              <span className="flex cursor-default hover:bg-none items-center  gap-2 bg-slate rounded p-1 absolute -top-8 left-1/2 -translate-x-1/2 font-medium text-lg w-full">
                {i18n.language?.startsWith("ar") ? "اخر الاشعارات" : "Latest Notifications"}
              </span>
            ),
          },
          ...notifications?.notifications?.map((item: any) => ({
            key: item?.id,
            label: (
              <Link
                onClick={() =>
                  mutate({
                    api: `see-my-notification/${item?.id}`,
                    data: undefined,
                  })
                }
                href={``}
                // {item?.notification_type === "offer" ? "my-received-offers" : "messages"}
                className={`w-full flex items-center p-1 gap-5 rounded ${
                  item?.seen_status === "no" ? "bg-gray-100" : ""
                }`}
              >
                <Image
                  width={100}
                  height={100}
                  src={
                    item?.sender_data?.image === ""
                      ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      : item?.sender_data?.image
                  }
                  className="w-12 h-12 rounded-full"
                  alt="dsa"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <h2 className="font-semibold text-slate-600">{item?.title}</h2>
                  <span className="text-slate-500">{item?.description}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <CiClock2 /> {item?.time}
                  </span>
                </div>
              </Link>
            ),
          })),
          {
            key: "1543",
            className: "!sticky bg-white bottom-[-4px] hover:!bg-white",
            label: (
              <Link
                // state={{ notifications }}
                href="notifications"
                className=" flex items-center justify-center !text-white border border-primary hover:bg-white mx-auto hover:!text-primary p-1 gap-5 rounded bg-primary w-[90%]"
              >
                {i18n.language?.startsWith("ar")
                  ? "اظهار جميع الاشعارات"
                  : "Show all Notifications"}
              </Link>
            ),
          },
        ]
      : [
          {
            key: "0",
            label: (
              <div className="!w-full !h-[230px] flex justify-center items-center bg-slate-100 rounded flex-col gap-7 cursor-default">
                <span className="bell fa fa-bell">
                  <FontAwesomeIcon className={`text-6xl`} icon={faBell} />
                </span>
                <p>{i18n.language?.startsWith("ar") ? "لا توجد اشعارات" : "No Notifications"}</p>
                <Link
                  // state={{ notifications }}
                  href="notifications"
                  className=" flex items-center justify-center text-white border border-primary hover:bg-transparent hover:text-primary p-1 gap-5 rounded bg-primary w-[90%] "
                >
                  {i18n.language?.startsWith("ar")
                    ? "اظهار جميع الاشعارات"
                    : "Show all Notifications"}
                </Link>
              </div>
            ),
          },
        ]
    : undefined;

  const [count, setCount] = useState(5);
  const handleclick = useCallback(() => {
    if (!user?.token) {
      dispatch(setShowLoginPopUp(true));
    }
  }, [user?.token, dispatch]);
  useEffect(() => {
    if (!user?.token) {
      setCount(0);
    } else {
      setCount(notifications?.unseen_counter);
    }
  }, [user, notifications?.unseen_counter]);

  return (
    <header className="w-full h-[88px] bg-bg shadow-md z-40 relative">
      <nav className="h-[88px] flex justify-between items-center site_container bg-bg relative z-50">
        <LangLink to="" className="logo w-36 max-w-[144px] min-w-[144px]">
          <Image
            height={757}
            width={2928}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            src={i18n.language?.startsWith("ar") ? arlogoImg : logoImg}
            alt="Amtalek"
            className="h-full w-full cursor-pointer"
          />
        </LangLink>

        {/* <ul className="desktop__nav xll:hidden flex justify-between items-center text-secondary text-lg gap-9 xl:gap-7">
          <li>
            <LangNavLink className="desktop__nav--item" homepage end to={``}>
              {t("Navbar.menu_items.Home")}
            </LangNavLink>
          </li>
          <li className="relative h-[88px] flex justify-center items-center group/grand cursor-pointer">
            <LangNavLink
              onClick={() => window.sessionStorage.setItem("step", "1")}
              className="desktop__nav--item group/parent h-fit flex justify-start items-center gap-2"
              to={``}
              // {`/search?k=&cr=${localStorage.getItem(
              //   "country"
              // )}&c=-1&r=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
            >
              {t("Navbar.menu_items.Find_Properties.title")}
              <FontAwesomeIcon
                className="transition-all text-[0.9rem] duration-200 ease-in-out group-hover/grand:rotate-180"
                icon={faChevronDown}
              />
            </LangNavLink>
            <div className="find__properties--sub--menu--1 shadow-md absolute left-0 rtl:left-auto rtl:right-0 bg-secondary text-white top-[88px] w-[215px] h-auto opacity-0 pointer-events-none group-hover/grand:opacity-100 group-hover/grand:pointer-events-auto transition-all duration-300 ease-in-out">
              <div className="sub__menu--for--sale w-full h-10 flex justify-between items-center text-base px-2 hover:bg-bg hover:text-secondary transition-all duration-300 ease-in-out group/sale cursor-pointer relative">
                {t("Navbar.menu_items.Find_Properties.For_Sale.title")}
                <FontAwesomeIcon
                  className="text-[0.9rem] -rotate-90 rtl:rotate-90"
                  icon={faChevronDown}
                />
                <div className="for__sale--sub--menu shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/sale:opacity-100 group-hover/sale:pointer-events-auto">
                  <LangLink
                    onClick={() => window.sessionStorage.setItem("step", "1")}
                    to={``}
                    // {``}
                    // // {`/search?k=&cr=${localStorage.getItem(
                    // //   "country"
                    // )}&c=-1&r=-1&sr=-1&t=&f=&pr=1&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
                    className="w-full bg-secondary h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg"
                  >
                    {t("Navbar.menu_items.Find_Properties.For_Sale.Residential")}
                  </LangLink>
                  <LangLink
                    onClick={() => window.sessionStorage.setItem("step", "1")}
                    to={``}
                    // {`/search?k=&cr=${localStorage.getItem(
                    //   "country"
                    // )}&c=-1&r=-1&sr=-1&t=&f=&pr=2&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
                    className="w-full bg-secondary h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg"
                  >
                    {t("Navbar.menu_items.Find_Properties.For_Sale.Commercial")}
                  </LangLink>
                </div>
              </div>
            </div>
          </li>
          <li>
            <LangNavLink className="desktop__nav--item" to={`/about-us`}>
              {t("Navbar.menu_items.About_Us")}
            </LangNavLink>
          </li>
        </ul> */}
        <Navbar t={t} />

        {/* <div className="burger__btn hidden xll:block ">
          <input
            onChange={handleBurgerChange}
            hidden
            className="burger-icon"
            id="burger-icon"
            name="burger-icon"
            type="checkbox"
            checked={burgerChecked}
          />

          <label className="burger-icon-menu" htmlFor="burger-icon">
            <div className="bar bar--1"></div>
            <div className="bar bar--2"></div>
            <div className="bar bar--3"></div>
          </label>
        </div> */}

        {/* <div className="mobile__nav absolute z-[1000] inset-0 w-full h-full bg-secondary flex justify-center items-center">
          {" "}
          <ul className="mobile__nav--items  flex flex-col justify-center items-center text-bg text-lg gap-9 ">
            <li onClick={() => setBurgerChecked(false)}>
              <LangNavLink className="mobile__nav--item" homepage end to={``}>
                {t("Navbar.menu_items.Home")}
              </LangNavLink>
            </li>
            <li onClick={() => setBurgerChecked(false)}>
              <LangNavLink
                onClick={() => window.sessionStorage.setItem("step", "1")}
                className="mobile__nav--item"
                to={``}
                // {`/search?k=&cr=${localStorage.getItem(
                //   "country"
                // )}&c=-1&r=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
              >
                {t("Navbar.menu_items.Find_Properties.title")}
              </LangNavLink>
            </li>
            <li onClick={() => setBurgerChecked(false)}>
              <LangNavLink className="mobile__nav--item" to="/Agencies">
                {t("Navbar.menu_items.Brokers")}
              </LangNavLink>
            </li>
            <li onClick={() => setBurgerChecked(false)}>
              <LangNavLink className="mobile__nav--item" to="/projects">
                {t("Navbar.menu_items.Projects")}
              </LangNavLink>
            </li>

            <li onClick={() => setBurgerChecked(false)}>
              <LangNavLink className="mobile__nav--item" to="/contact">
                {t("Navbar.menu_items.Contact_Us")}
              </LangNavLink>
            </li>

            <li onClick={() => setBurgerChecked(false)}>
              {/* {i18n.language?.startsWith("ar") === true ? (
                <button className="mobile__nav--item" onClick={() => changeLanguage("en")}>
                  English
                </button>
              ) : (
                <button className="mobile__nav--item" onClick={() => changeLanguage("ar")}>
                  العربية
                </button>
              )} */}
        {/* </li>
          </ul>
        </div>  */}
        <div className="nav__CTAs flex items-center gap-10 ss:ltr:gap-3 ss:rtl:gap-2">
          {user?.data?.actor_type === "user" && (
            <span onClick={handleClick}>
              <Dropdown trigger={user?.token ? ["click"] : []} menu={{ items }} placement="bottom">
                <Badge
                  showZero
                  className="cursor-pointer !text-[11px]"
                  size="default"
                  count={count}
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-secondary text-2xl cursor-pointer"
                  />
                </Badge>
              </Dropdown>
            </span>
          )}

          <ButtonNavbar />
          {user?.token ? (
            <NavDropDownMenu user={userProfileDataOutlet} ForRealEstate={true} />
          ) : (
            <div className="sigin__wrapper group relative">
              {/* <div className="flex items-center">
                <Tooltip>
                  <Button
                    onClick={handleClick}
                    className="round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary border-2 border-secondary"
                  >
                    <FontAwesomeIcon className="font-light text-2xl" icon={faCircleUser} />
                    <FontAwesomeIcon className="text-[0.9rem]" icon={faChevronDown} />
                  </Button>
                </Tooltip>
              </div> */}

              <Dropdown
                overlay={
                  <div className={`signin__menu w-72 h-96`}>
                    <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md rounded">
                      <Image
                        width={100}
                        height={100}
                        className="w-14 aspect-square"
                        src={favIconSrc}
                        alt="fav-icon"
                      />
                      <h3 className="text-2xl font-medium text-center">
                        {t("Navbar.Login_drop_down_menu.heading")}
                      </h3>
                      <p className="opacity-70">{t("Navbar.Login_drop_down_menu.sub_heading")}</p>
                      <LangLink
                        to="/login"
                        className="w-full round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3"
                      >
                        {t("Navbar.Login_drop_down_menu.Login_btn_txt")}
                      </LangLink>
                      <LangLink
                        to="/register"
                        className="w-full round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out hover:bg-secondary hover:text-bg text-secondary text-lg"
                      >
                        {t("Navbar.Login_drop_down_menu.Register_btn_txt")}
                      </LangLink>
                    </div>
                  </div>
                }
              >
                <div>
                  {/* <Button onClick={handleClick} className="bg-secondary text-bg"> */}
                  <div className="flex items-center">
                    <Tooltip>
                      <Button
                        onClick={handleClick}
                        className="round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary border-2 border-secondary"
                      >
                        <FontAwesomeIcon className="font-light text-2xl" icon={faCircleUser} />
                        <FontAwesomeIcon className="text-[0.9rem]" icon={faChevronDown} />
                      </Button>
                    </Tooltip>
                  </div>
                  {/* </Button> */}
                </div>
              </Dropdown>

              {/* <Dropdown
                open={open}
                onOpenChange={handleClose}
                className="absolute z-50"
                anchorEl={anchorEl}
              >
                <div className={`signin__menu w-72 h-96`}>
                  <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md rounded">
                    <Image
                      width={100}
                      height={100}
                      className="w-14 aspect-square"
                      src={favIconSrc}
                      alt="fav-icon"
                    />
                    <h3 className="text-2xl font-medium text-center">
                      {t("Navbar.Login_drop_down_menu.heading")}
                    </h3>
                    <p className="opacity-70">{t("Navbar.Login_drop_down_menu.sub_heading")}</p>
                    <LangLink
                      to="/login"
                      className="w-full round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3"
                    >
                      {t("Navbar.Login_drop_down_menu.Login_btn_txt")}
                    </LangLink>
                    <LangLink
                      to="/register"
                      className="w-full round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out hover:bg-secondary hover:text-bg text-secondary text-lg"
                    >
                      {t("Navbar.Login_drop_down_menu.Register_btn_txt")}
                    </LangLink>
                  </div>
                </div>
              </Dropdown> */}
            </div>
          )}
        </div>
        {/* <div className="flex items-center gap-6">
          {/* content={t("Notifications")} delay={200} */}
        {/* <Tooltip>
            <button onClick={handleClick} className="focus:outline-none">
              <FontAwesomeIcon icon={faBell} className="text-secondary text-xl" />
              {count > 0 && (
                <span className="badge bg-primary text-white rounded-full px-1 text-xs absolute top-1 right-1">
                  {count}
                </span>
              )}
            </button>
          </Tooltip>
          <ButtonNavbar />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FontAwesomeIcon
                icon={faCircleUser}
                className="text-secondary text-3xl cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>
                {t("Profile")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => (window.location.href = "/logout")}>
                {t("Logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </nav>
    </header>
    // <header className="w-full  h-[88px] bg-bg shadow-md z-40 relative ">
    //   <nav className=" h-[88px]  bg- flex justify-between items-center site_container  bg-bg relative z-50 ">
    //     <LangLink href="" className="logo  w-36 max-w-[144px] min-w-[144px] ">
    //       <Image
    //         height={757}
    //         width={2928}
    //         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    //         src={i18n.language?.startsWith("ar") ? arlogoImg : logoImg}
    //         alt="Amtalek"
    //         className="h-full w-full cursor-pointer"
    //       />
    //     </LangLink>
    //     <ul className="desktop__nav xll:hidden flex justify-between items-center text-secondary text-lg gap-9 xl:gap-7 ">
    //       <li>
    //         <LangNavLink className="desktop__nav--item" homepage end href={``}>
    //           {t("Navbar.menu_items.Home")}
    //         </LangNavLink>
    //       </li>
    //       <li className="  relative h-[88px] flex justify-center items-center group/grand cursor-pointer">
    //         <LangNavLink
    //           onClick={() => window.sessionStorage.setItem("step", "1")}
    //           className="desktop__nav--item group/parent h-fit flex justify-start items-center gap-2 "
    //           href={`/search?k=&cr=${localStorage.getItem(
    //             "country"
    //           )}&c=-1&r=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
    //         >
    //           {t("Navbar.menu_items.Find_Properties.title")}
    //           <FontAwesomeIcon
    //             className={`transition-all text-[0.9rem] duration-200 ease-in-out group-hover/grand:rotate-180`}
    //             icon={faChevronDown}
    //           />
    //         </LangNavLink>
    //         <div className="find__properties--sub--menu--1 shadow-md absolute left-0 rtl:left-auto rtl:right-0 bg-secondary text-white top-[88px] w-[215px] h-auto  opacity-0 pointer-events-none group-hover/grand:opacity-100 group-hover/grand:pointer-events-auto transition-all duration-300 ease-in-out">
    //           <div className="sub__menu--for--sale w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-bg hover:text-secondary transition-all duration-300 ease-in-out group/sale cursor-pointer relative">
    //             {t("Navbar.menu_items.Find_Properties.For_Sale.title")}
    //             <FontAwesomeIcon
    //               className={`text-[0.9rem] -rotate-90 rtl:rotate-90`}
    //               icon={faChevronDown}
    //             />
    //             <div className="for__sale--sub--menu shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/sale:opacity-100 group-hover/sale:pointer-events-auto">
    //               <LangLink
    //                 onClick={() => window.sessionStorage.setItem("step", "1")}
    //                 href={`/search?k=&cr=${localStorage.getItem(
    //                   "country"
    //                 )}&c=-1&r=-1&sr=-1&t=&f=&pr=1&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
    //                 className=" w-full bg-secondary h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg"
    //               >
    //                 {t("Navbar.menu_items.Find_Properties.For_Sale.Residential")}
    //               </LangLink>
    //               <LangLink
    //                 onClick={() => window.sessionStorage.setItem("step", "1")}
    //                 href={`/search?k=&cr=${localStorage.getItem(
    //                   "country"
    //                 )}&c=-1&r=-1&sr=-1&t=&f=&pr=2&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
    //                 className=" w-full bg-secondary h-10 flex justify-between items-center px-2 hover:bg-bg transition-all duration-300 ease-in-out hover:text-secondary text-bg"
    //               >
    //                 {t("Navbar.menu_items.Find_Properties.For_Sale.Commercial")}
    //               </LangLink>
    //             </div>
    //           </div>

    //           <div className="sub__menu--for--rent w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-bg hover:text-secondary transition-all duration-300 ease-in-out group/rent cursor-pointer relative">
    //             {t("Navbar.menu_items.Find_Properties.For_Rent.title")}
    //             <FontAwesomeIcon
    //               className={`text-[0.9rem] -rotate-90 rtl:rotate-90`}
    //               icon={faChevronDown}
    //             />
    //             <div className="for__rent--sub--menu shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/rent:opacity-100 group-hover/rent:pointer-events-auto">
    //               <LangLink
    //                 onClick={() => window.sessionStorage.setItem("step", "1")}
    //                 href={`/search?k=&cr=${localStorage.getItem(
    //                   "country"
    //                 )}&c=-1&r=-1&sr=-1&t=&f=&pr=3&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
    //                 className=" w-full bg-secondary h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg"
    //               >
    //                 {t("Navbar.menu_items.Find_Properties.For_Rent.Residential")}
    //               </LangLink>
    //               <LangLink
    //                 onClick={() => window.sessionStorage.setItem("step", "1")}
    //                 href={`/search?k=&cr=${localStorage.getItem(
    //                   "country"
    //                 )}&c=-1&r=-1&sr=-1&t=&f=&pr=4&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
    //                 className=" w-full bg-secondary h-10 flex justify-between items-center px-2 hover:bg-bg transition-all duration-300 ease-in-out hover:text-secondary text-bg"
    //               >
    //                 {t("Navbar.menu_items.Find_Properties.For_Rent.Commercial")}
    //               </LangLink>
    //             </div>
    //           </div>
    //         </div>
    //       </li>
    //       <li>
    //         <LangNavLink className="desktop__nav--item" href="/Agencies">
    //           {t("Navbar.menu_items.Brokers")}
    //         </LangNavLink>
    //       </li>
    //       <li>
    //         <LangNavLink className="desktop__nav--item" href="/projects">
    //           {t("Navbar.menu_items.Projects")}
    //         </LangNavLink>
    //       </li>

    //       <li>
    //         <LangNavLink className="desktop__nav--item" href="/contact">
    //           {t("Navbar.menu_items.Contact_Us")}
    //         </LangNavLink>
    //       </li>
    //     </ul>
    //     <div className="burger__btn hidden xll:block ">
    //       <input
    //         onChange={handleBurgerChange}
    //         hidden
    //         className="burger-icon"
    //         id="burger-icon"
    //         name="burger-icon"
    //         type="checkbox"
    //         checked={burgerChecked}
    //       />

    //       <label className="burger-icon-menu" htmlFor="burger-icon">
    //         <div className="bar bar--1"></div>
    //         <div className="bar bar--2"></div>
    //         <div className="bar bar--3"></div>
    //       </label>
    //     </div>

    // <div className="nav__CTAs flex items-center gap-10 ss:ltr:gap-3 ss:rtl:gap-2">
    //   {userdata?.actor_type === "user" && (
    //     <span onClick={handleclick}>
    //       <Dropdown
    //         rootClassName="navnot"
    //         trigger={user?.token ? ["click"] : []}
    //         menu={{ items }}
    //         placement="bottom"
    //       >
    //         <Badge
    //           showZero
    //           classNames={{
    //             indicator: "!text-[14px] rtl:!left-2 !rounded-full !px-1",
    //           }}
    //           className="cursor-pointer !text-[11px]"
    //           size="default"
    //           count={count}
    //         >
    //           <FontAwesomeIcon
    //             icon={faBell}
    //             className="text-secondary text-2xl cursor-pointer"
    //           />
    //         </Badge>
    //       </Dropdown>
    //     </span>
    //   )}
    //   <LangLink
    //     href="/coming-soon"
    //     className="market__btn  round  h-10  flex justify-center items-center gap-2 px-2 sm:px-3 py-[6px] bg-red500 transition-all duration-300 ease-in-out  hover:bg-transparent hover:text-red500 text-bg text-md border-2 border-red500"
    //   >
    //     <TbSocial />
    //     <span className="sm:hidden ">{t("Navbar.social.title")}</span>
    //   </LangLink>
    //   {user?.token ? (
    //     <NavDropDownMenu user={userdata} ForRealEstate={true} />
    //   ) : (
    //     <div className="sigin__wrapper group relative ">
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           textAlign: "center",
    //           width: "fit-content",
    //         }}
    //       >
    //         <Tooltip title={null}>
    //           <IconButton
    //             onClick={handleClick}
    //             size="small"
    //             aria-controls={open ? "account-menu" : undefined}
    //             aria-haspopup="true"
    //             aria-expanded={open ? "true" : undefined}
    //           >
    //             <button className="round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary border-2 border-secondary ">
    //               <FontAwesomeIcon className="font-light text-2xl " icon={faCircleUser} />
    //               <FontAwesomeIcon className=" text-[0.9rem]" icon={faChevronDown} />
    //             </button>
    //           </IconButton>
    //         </Tooltip>
    //       </Box>

    //       <Menu
    //         anchorEl={anchorEl}
    //         id="account-menu"
    //         open={open}
    //         onClose={handleClose}
    //         onClick={handleClose}
    //         PaperProps={{
    //           elevation: 0,
    //           sx: {
    //             overflow: "visible",
    //             filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    //             mt: 1.5,
    //             "& .MuiAvatar-root": {
    //               width: 32,
    //               height: 32,
    //               ml: -0.5,
    //               mr: 1,
    //             },
    //             "&::before": {
    //               content: '""',
    //               display: "none",
    //               position: "absolute",
    //               top: 0,
    //               right: 14,
    //               width: 10,
    //               height: 10,
    //               bgcolor: "background.paper",
    //               transform: "translateY(-50%) rotate(45deg)",
    //               zIndex: 0,
    //             },
    //             "& .MuiList-padding": {
    //               padding: "0 !important",
    //             },
    //           },
    //         }}
    //         transformOrigin={{ horizontal: "right", vertical: "top" }}
    //         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    //       >
    //         <div className={`signin__menu  w-72 h-96 `}>
    //           <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md round ">
    //             <Image
    //               width={100}
    //               height={100}
    //               className="w-14  aspect-square"
    //               src={favIconSrc}
    //               alt="fav-icon"
    //             />

    //             <h3 className="text-2xl font-medium text-center">
    //               {t("Navbar.Login_drop_down_menu.heading")}
    //             </h3>
    //             <p className="opacity-70">{t("Navbar.Login_drop_down_menu.sub_heading")}</p>
    //             <LangLink
    //               href="/Login"
    //               className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3"
    //             >
    //               {t("Navbar.Login_drop_down_menu.Login_btn_txt")}
    //             </LangLink>
    //             <LangLink
    //               href="/register"
    //               className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out  hover:bg-secondary hover:text-bg text-secondary text-lg"
    //             >
    //               {t("Navbar.Login_drop_down_menu.Register_btn_txt")}
    //             </LangLink>
    //           </div>
    //         </div>
    //       </Menu>
    //     </div>
    //   )}
    // </div>
    //   </nav>
    //   <div
    //     className={`mobile__nav--wrapper relative z-[1000] w-full hidden xll:block h-[calc(100vh-88px)] transition-all duration-300 ease-in-out ${
    //       burgerChecked
    //         ? "translate-x-0 opacity-100 pointer-events-auto"
    //         : "translate-x-0 opacity-0 pointer-events-none"
    //     }`}
    //   >
    //     <div className="mobile__nav absolute z-[1000] inset-0 w-full h-full bg-secondary flex justify-center items-center">
    //       {" "}
    //       <ul className="mobile__nav--items  flex flex-col justify-center items-center text-bg text-lg gap-9 ">
    //         <li onClick={() => setBurgerChecked(false)}>
    //           <LangNavLink className="mobile__nav--item" homepage end href={`/${lng}`}>
    //             {t("Navbar.menu_items.Home")}
    //           </LangNavLink>
    //         </li>
    //         <li onClick={() => setBurgerChecked(false)}>
    //           <LangNavLink
    //             onClick={() => window.sessionStorage.setItem("step", "1")}
    //             className="mobile__nav--item"
    //             href={`/search?k=&cr=${localStorage.getItem(
    //               "country"
    //             )}&c=-1&r=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
    //           >
    //             {t("Navbar.menu_items.Find_Properties.title")}
    //           </LangNavLink>
    //         </li>
    //         <li onClick={() => setBurgerChecked(false)}>
    //           <LangNavLink className="mobile__nav--item" href="/Agencies">
    //             {t("Navbar.menu_items.Brokers")}
    //           </LangNavLink>
    //         </li>
    //         <li onClick={() => setBurgerChecked(false)}>
    //           <LangNavLink className="mobile__nav--item" href="/projects">
    //             {t("Navbar.menu_items.Projects")}
    //           </LangNavLink>
    //         </li>

    //         <li onClick={() => setBurgerChecked(false)}>
    //           <LangNavLink className="mobile__nav--item" href="/contact">
    //             {t("Navbar.menu_items.Contact_Us")}
    //           </LangNavLink>
    //         </li>

    //         <li onClick={() => setBurgerChecked(false)}>
    //           {i18n.language?.startsWith("ar") === true ? (
    //             <button className="mobile__nav--item" onClick={() => changeLanguage("en")}>
    //               English
    //             </button>
    //           ) : (
    //             <button className="mobile__nav--item" onClick={() => changeLanguage("ar")}>
    //               العربية
    //             </button>
    //           )}
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </header>
  );
});

export default LoginButton;
