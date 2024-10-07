"use client";
/* eslint-disable react-hooks/exhaustive-deps */
// import { HelmetTags } from "@/MainComponents";
// import { Link, useOutletContext } from "react-router-dom";

import { useTranslation } from "react-i18next";
// import { TUser } from "@/Types/AppTypes";
import { useSelector } from "react-redux";
import { userData } from "@/Store/Features/AuthenticationSlice";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Component() {
  const { i18n } = useTranslation("Pages_MyProperties");
  // const [userProfileDataOutlet] = useOutletContext() as [TUser];
  // const { t, i18n } = useTranslation("SettingsLayout");
  const user = useSelector(userData);
  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState<any>([]);

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
      console.log(dataProfile);

      setUserProfileDataOutlet(dataProfile?.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }

  useEffect(() => {
    if (user?.token && i18n.language) {
      getUserProfile(user?.token, i18n?.language);
    }
  }, [user?.token, i18n.language]);

  return (
    <section className="site_container flex flex-col border rounded-xl relative p-5 bmd:p-7 gap-4 md:flex-row md:overflow-x-auto ">
      {/* <HelmetTags
        title={
          i18n.language?.startsWith("ar")
            ? "امتلك | العروض"
            : "Amtalek | Offers"
        }
        description={t("tab.description")}
      /> */}
      <span className="absolute text-lg rtl:-top-5 bmd:ltr:-top-0 bmd:rtl:-top-0 ltr:-top-4 bg- rtl:right-4 ltr:left-4 ">
        {i18n.language?.startsWith("ar") ? "العروض المستقبلة" : "Received Offers"}
      </span>
      <div className="w-full md:w-fit grid grid-cols-7 gap-1 md:grid-cols-2 shrink-0">
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3 ">
          {i18n.language?.startsWith("ar") ? "العقار " : "Property"}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {i18n.language?.startsWith("ar") ? "سعر العقار " : "Property Price"}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {i18n.language?.startsWith("ar") ? "سعر العرض " : "Offer Price"}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {i18n.language?.startsWith("ar") ? "الاسم" : "Name"}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {i18n.language?.startsWith("ar") ? "الايميل" : "E-mail"}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {i18n.language?.startsWith("ar") ? "رقم الهاتف" : "Phone Number"}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {i18n.language?.startsWith("ar") ? " التاريخ" : "Date"}
        </span>
      </div>
      {userProfileDataOutlet?.received_offers?.map((item: any) => (
        <div
          key={item?.property[0]?.id}
          className="w-full md:w-fit grid grid-cols-7 gap-1 md:grid-cols-2 bmd:p-3 shrink-0"
        >
          <Link
            href={`/properties/${item?.property[0]?.listing_number}`}
            className="col-span-1 md:col-span-2 flex items-center justify-center border rounded p-3"
          >
            {item?.property[0]?.title}
          </Link>
          <span className="col-span-1 md:col-span-2 flex items-center justify-center border rounded p-3">
            {item?.property[0]?.sale_price
              ? item?.property[0]?.sale_price
              : item?.property[0]?.rent_price}{" "}
            {i18n.language.startsWith("en") ? "EGP" : "ج.م"}
          </span>
          <span className="col-span-1 md:col-span-2 flex items-center justify-center border rounded p-3">
            {item?.sender_offer} {i18n.language.startsWith("en") ? "EGP" : "ج.م"}
          </span>
          <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center border rounded p- text-m bmd:p-3">
            {item?.sender_name}
          </span>
          <Link
            href={`mailto:${item?.sender_email}`}
            className="col-span-1 flex flex-col gap-2 items-center justify-center border rounded p-3 break-all"
          >
            {item?.sender_email}
          </Link>
          <Link
            href={`tel:${item?.sender_phone}`}
            className="col-span-1 flex flex-col gap-2 items-center justify-center border rounded p-3 break-all"
          >
            {item?.sender_phone}
          </Link>
          <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center border rounded p- text-m bmd:p-3">
            {item?.offer_time.slice(0, 10)}
          </span>
        </div>
      ))}
    </section>
  );
}
