/* eslint-disable react-hooks/exhaustive-deps */
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
import logoImg from "@/assets/images/navEnLogo.png";
import arlogoImg from "@/assets/images/navArLogo.png";
import { TbSocial } from "react-icons/tb";
import type { MenuProps } from "antd";
import { Dropdown, Badge, Menu } from "antd";
import { setShowLoginPopUp } from "@/Store/Features/AuthenticationSlice";
import { QueryClient } from "@tanstack/react-query";
import Image from "next/image.js";
import LangLink from "@/components/LangLink";
// import LangNavLink from "@/components/LangNavLink";
import { Tooltip } from "@/components/ui/tooltip";
import Link from "next/link";
import ButtonNavbar from "./ButtonNavbar";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";

const LoginButton = memo(function LoginButton() {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { t, i18n } = useTranslation("LayoutComponents");

  const user = useSelector(userData);
  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unseenCounter, setUnseenCounter] = useState(0);

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

  async function getNotifications(token: string) {
    try {
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/my-notifications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setNotifications(data?.data?.notifications);
      setUnseenCounter(data?.data?.unseen_counter);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }

  useEffect(() => {
    if (user?.token && i18n.language) {
      getUserProfile(user?.token, i18n?.language);
      getNotifications(user?.token);
    }
  }, [user?.token, i18n.language]);

  const [burgerChecked, setBurgerChecked] = useState(false);
  const dispatch = useDispatch();
  function handleBurgerChange(e: any) {
    if (e.target.checked) {
      setBurgerChecked(true);
    } else {
      setBurgerChecked(false);
    }
  }

  const router: any = [];

  if (!router) {
    return null; // أو يمكن عرض شيء آخر
  }

  const items: MenuProps["items"] | undefined = notifications?.length
    ? unseenCounter !== 0
      ? [
          {
            key: "0",
            label: (
              <span className="flex cursor-default hover:bg-none items-center  gap-2 bg-slate rounded p-1 absolute -top-8 left-1/2 -translate-x-1/2 font-medium text-lg w-full">
                {i18n.language?.startsWith("ar") ? "اخر الاشعارات" : "Latest Notifications"}
              </span>
            ),
          },
          ...notifications.map((item: any) => ({
            key: item?.id,
            label: (
              <Link
                href={``}
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
                href="/notifications"
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
                  href="/notifications"
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
      setCount(unseenCounter);
    }
  }, [user, unseenCounter]);

  // const menu = (
  //   <Menu
  //     items={items}
  //     className="!h-96 overflow-auto" // هنا تضيف الـ className المطلوب للـ ul
  //   />
  // );
  const menu = <Menu className="h-96 overflow-auto" items={items} />;
  return (
    <header className="w-full h-[88px] bg-bg z-40 relative">
      <nav className="h-[88px] flex justify-between items-center bg-bg relative z-50">
        <LangLink to="/" className="logo w-36 max-w-[144px] min-w-[144px]">
          <Image
            height={757}
            width={2928}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            src={i18n.language?.startsWith("ar") ? arlogoImg : logoImg}
            alt="Amtalek"
            className="h-full w-full cursor-pointer"
          />
        </LangLink>

        <Navbar t={t} />

        <div className="nav__CTAs flex items-center gap-10 ss:ltr:gap-3 ss:rtl:gap-2">
          {user?.data?.actor_type === "user" && (
            <span onClick={handleClick}>
              <Dropdown
                trigger={user?.token ? ["click"] : []}
                overlay={menu}
                // menu={{ items }}
                placement="bottom"
              >
                <Badge
                  showZero
                  classNames={{
                    indicator: "!text-[14px] rtl:!left-2 !rounded-full !px-1",
                  }}
                  className="cursor-pointer !text-[11px]"
                  size="default"
                  count={count}
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-secondary text-2xl ss:text-[20px]"
                  />
                </Badge>
              </Dropdown>
            </span>
          )}

          <ButtonNavbar />
          {user?.token ? (
            <NavDropDownMenu
              user={userProfileDataOutlet}
              userProfile={userProfileDataOutlet}
              ForRealEstate={true}
            />
          ) : (
            <div className="sigin__wrapper group relative">
              <Dropdown
                overlay={
                  <div className={`signin__menu w-72 h-96`}>
                    <div className="flex flex-col justify-center items-center w-full h-full bg-grey gap-3 shadow-md rounded">
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
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
});

export default LoginButton;
