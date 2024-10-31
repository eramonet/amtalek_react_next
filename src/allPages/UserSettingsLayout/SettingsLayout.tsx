"use client";

// /* eslint-disable react-hooks/exhaustive-deps */
import {
  faCircleUser,
  faHeart,
  faHouseUser,
  faPlus,
  faRightFromBracket,
  faCoins,
  faInfoCircle,
  faFileInvoice,
  faMoneyBill1,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { setToggleLogOutPopUp } from "@/Store/Features/MiscellaneousSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LogOutPopUp from "@/MainComponents/LogOutPopUp";
import { Dropdown } from "antd";
import { HiOutlineArrowUpRight, HiOutlineArrowDownLeft } from "react-icons/hi2";
import { TUser } from "@/Types/AppTypes";
import { useEffect, useState } from "react";
import React from "react";
import LoginPopUp from "../login/LoginPopUp";
import { userData } from "@/Store/Features/AuthenticationSlice";

// import { useRouter } from "next/router"; // استخدم useRouter
// userProfileDataOutlet
function SettingsLayout({}: any) {
  const { t, i18n } = useTranslation("SettingsLayout");

  const user = useSelector(userData);
  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState<any>([]);
  // const router = useRouter(); // استخدم useRouter

  //  if (user) {
  //   }

  // async function getUserProfile(token: string, language: string) {
  //   try {
  //     const response = await fetch(
  //       `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           lang: language,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const dataProfile = await response.json();
  //     setUserProfileDataOutlet(dataProfile?.data);
  //   } catch (error) {
  //     console.error("Failed to fetch user profile:", error);
  //   }
  // }

  useEffect(() => {
    if (user?.token && i18n.language) {
      setUserProfileDataOutlet(() =>
        JSON.parse(localStorage.getItem("userProfileDataOutlet") || "{}")
      );
      // getUserProfile(user?.token, i18n?.language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, i18n.language]);

  const dispatchRedux = useDispatch();

  const items = [
    {
      key: "1",
      label: (
        <Link
          href="/current-package"
          className="w-full h-full flex trns font-medium justify-start items-center gap-2 hover:bg-secondary/20 hover:text-secondary p-3 rounded"
        >
          <FontAwesomeIcon className="amd:text-xl" icon={faCoins} />
          <span className="amd:hidden lg:text-xs ">{t("menu.packages")}</span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          href="/invoices"
          className="w-full h-full flex trns font-medium justify-start items-center gap-2 hover:bg-secondary/20 hover:text-secondary p-3 rounded my-1"
        >
          <FontAwesomeIcon className="amd:text-xl" icon={faFileInvoice} />
          <span className="amd:hidden lg:text-xs ">{t("menu.invoices")}</span>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          href="/subscription"
          className="w-full h-full flex trns font-medium justify-start items-center gap-2 hover:bg-secondary/20 hover:text-secondary p-3 rounded my-1"
        >
          <FontAwesomeIcon className="amd:text-xl" icon={faMoneyBill1} />
          <span className="amd:hidden lg:text-xs ">{t("menu.toPackage")}</span>
        </Link>
      ),
    },
  ];

  const Offersitems = [
    {
      key: "12",
      label: (
        <Link
          href="/my-offers"
          className="w-full h-full flex trns font-medium justify-start items-center gap-2 hover:bg-secondary/20 hover:text-secondary p-3 rounded"
        >
          <HiOutlineArrowUpRight />
          <span className="amd:hidden lg:text-xs ">{t("menu.my_offers")}</span>
        </Link>
      ),
    },
    {
      key: "23",
      label: (
        <Link
          href="/my-received-offers"
          className="w-full h-full flex trns font-medium justify-start items-center gap-2 hover:bg-secondary/20 hover:text-secondary p-3 rounded my-1"
        >
          <HiOutlineArrowDownLeft />
          <span className="amd:hidden lg:text-xs ">{t("menu.my_offers_received")}</span>
        </Link>
      ),
    },
  ];

  return (
    // <>
    <main className="">
      <LoginPopUp />
      <LogOutPopUp />
      {userProfileDataOutlet?.actor_type === "user" &&
        userProfileDataOutlet?.has_package === "yes" && (
          <div className="site_container mt-10 flex items-center justify-center gap-3 ss:flex-col">
            {userProfileDataOutlet?.has_package === "yes" && (
              <Link href="addons" className="w-fit bg-primary text-white p-3 rounded-xl ">
                {i18n.language?.startsWith("ar") ? "اضافة اضافات " : "Add Addons "}
              </Link>
            )}
            <div className="bg-secondary text-white px-10 py-2 rounded-xl">
              {t("expiration", {
                date: userProfileDataOutlet?.current_package_info?.expiration_date?.expiration_date,
              })}
            </div>
          </div>
        )}
      <section className="w-full">
        {userProfileDataOutlet?.actor_type === "user" && (
          <div className="user__settings--nav site_container lg:w h-14 bg-grey mx-auto my-10 round relative z-0 flex overflow-hidden">
            <Link
              href="/profile"
              className="w-1/6 h-full flex trns justify-center items-center gap-2 hover:bg-secondary/20 hover:text-secondary"
            >
              <FontAwesomeIcon className="amd:text-xl" icon={faCircleUser} />
              <span className="amd:hidden lg:text-xs ">{t("menu.profile")}</span>
            </Link>
            <div className="h-full w-[1px] bg-bg"></div>
            <Link
              href="messages"
              className="w-1/6 h-full flex trns justify-center items-center gap-2 hover:bg-secondary/20 hover:text-secondary"
            >
              <FontAwesomeIcon className="amd:text-xl" icon={faCommentDots} />
              <span className="amd:hidden lg:text-xs ">{t("menu.messages")}</span>
            </Link>
            <div className="h-full w-[1px] bg-bg"></div>
            <Dropdown
              rootClassName="dropdownpackages"
              className="w-1/6 h-full flex trns justify-center items-center gap-2 cursor-pointer border-none hover:bg-secondary/20 hover:text-secondary"
              menu={{ items: Offersitems }}
              placement="bottomLeft"
            >
              <div className="lg:text-xs flex items-center gap-2">
                <FontAwesomeIcon className="amd:text-xl" icon={faHouseUser} />
                <span className="amd:hidden text-sm rtl:text-[11px]">{t("menu.my_offers")}</span>
                <IoIosArrowDown className="arrow text-xl" />
              </div>
            </Dropdown>

            <div className="h-full w-[1px] bg-bg"></div>
            <Link
              href="/my-properties"
              className="w-1/6 h-full flex trns justify-center items-center gap-2 hover:bg-secondary/20 hover:text-secondary"
            >
              <FontAwesomeIcon className="amd:text-xl" icon={faHouseUser} />
              <span className="amd:hidden lg:text-xs ">{t("menu.my_properties")}</span>
            </Link>
            <div className="h-full w-[1px] bg-bg"></div>
            <Link
              href={`${
                userProfileDataOutlet?.has_package === "yes"
                  ? "/submit-property"
                  : `/packages/${userProfileDataOutlet?.actor_type}`
              }`}
              className="w-1/6 h-full flex trns justify-center items-center gap-2 hover:bg-secondary/20 hover:text-secondary"
            >
              <FontAwesomeIcon className="amd:text-xl" icon={faPlus} />
              <span className="amd:hidden lg:text-xs ">{t("menu.submit_property")}</span>
            </Link>

            <div className="h-full w-[1px] bg-bg"></div>
            <Link
              href="/favorites"
              className={`w-1/6 h-full flex trns relative z-20 font-medium  justify-center items-center gap-2 hover:!bg-secondary/20 hover:!text-secondary  `}
            >
              <FontAwesomeIcon className="amd:text-xl" icon={faHeart} />
              <span className="amd:hidden lg:text-xs "> {t("menu.favorites")}</span>
            </Link>
            <div className="h-full w-[1px] bg-bg"></div>

            <Dropdown
              rootClassName="dropdownpackages"
              className={`w-1/6 h-full flex trns relative z-20 font-medium  justify-center items-center gap-2 cursor-pointer border-none hover:!bg-secondary/20 hover:!text-secondary  ${
                location.pathname.includes("current-package") ||
                location.pathname.includes("invoices") ||
                location.pathname.includes("subscription")
                  ? "bg-secondary text-white"
                  : ""
              }`}
              menu={{ items }}
              placement="bottomLeft"
            >
              <span className=" lg:text-xs ">
                <FontAwesomeIcon className="amd:text-xl" icon={faInfoCircle} />{" "}
                <span className="amd:hidden text-sm rtl:text-[11px]">{t("menu.packageInfo")}</span>
                <IoIosArrowDown className="arrow text-xl" />
              </span>
            </Dropdown>

            <div className="h-full w-[1px] bg-bg"></div>
            <button
              onClick={() => {
                dispatchRedux(setToggleLogOutPopUp(true));
              }}
              className={`w-1/6 h-full flex trns relative z-20 font-medium  justify-center items-center gap-2 hover:!bg-secondary/20 hover:!text-secondary   `}
            >
              <FontAwesomeIcon className="amd:text-xl" icon={faRightFromBracket} />
              <span className="amd:hidden lg:text-xs "> {t("menu.log_out")}</span>
            </button>
          </div>
        )}
      </section>
    </main>
    // </>
  );
}

export default SettingsLayout;
