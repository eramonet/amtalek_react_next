"use client";
import { userData } from "@/Store/Features/AuthenticationSlice";
import { useEffect, useState } from "react";
// import { HelmetTags } from "../../../../src/Components/MainComponents";
// import { TUser } from "@/Types/AppTypes";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import { useOutletContext } from "react-router-dom";

export default function CurrentPackage({}: any) {
  const { t, i18n } = useTranslation("Pages_CurrentPackage");
  // const [userProfileDataOutlet] = useOutletContext() as [TUser];
  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState<any>([]);
  const user = useSelector(userData);

  useEffect(() => {
    if (user?.token && i18n.language) {
      setUserProfileDataOutlet(() =>
        JSON.parse(localStorage.getItem("userProfileDataOutlet") || "{}")
      );
    }
  }, [user?.token, i18n.language]);
  return (
    <section className="site_container pb-44 ">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}

      <div className="w-full grid grid-cols-1 ss:grid-cols-1 gap-2">
        <div className="col-span-1 p-7 rounded-xl border flex flex-col gap-3 bg-grey relative">
          <span className="absolute rtl:-top-4 ltr:-top-3 bg- rtl:right-4 ltr:left-4 text-base">
            {t("package_details")}
          </span>
          <span className="text-2xl">{t("your_package")}</span>
          {/* <span className="text-xl border-b pb-3">
            {i18n.language.startsWith("en") ? "Package" : "الباقة"}
          </span> */}

          <div className="w-full flex justify-between border-b pb-3">
            <span>{t("duration")}</span>
            <span>
              {userProfileDataOutlet?.current_package_info?.expiration_date?.duration === "monthly"
                ? t("monthly")
                : t("yearly")}
              {/* {duration === "monthly"
                ? t("pricing_options.monthly.title")
                : t("pricing_options.Yearly.title")} */}
            </span>
          </div>
          <div className="text-xl">{t("package_details")}</div>
          {userProfileDataOutlet?.current_package_info?.package_info?.map((info: any) => (
            <div key={info?.title} className="w-full flex justify-between">
              <span>{info?.title}</span>
              <span>
                {info?.used} / {info?.base}
              </span>
            </div>
          ))}
          {/* {state?.featured_listings && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.featured_listings")}</span>
              <span>{state?.featured_listings}</span>
            </div>
          )} */}
          {/* {state?.projects && (
            <div className="w-full flex justify-between">
              <span>{t("projects")}</span>
              <span>{state?.projects}</span>
            </div>
          )} */}
          {/* {state?.emoney && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.emoney")}</span>
              <span>{state?.emoney}</span>
            </div>
          )} */}
          {/* {state?.leads_management && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.leads")}</span>
              <span>{state?.leads_management}</span>
            </div>
          )} */}
          {/* {state?.messages && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.messages")}</span>
              <span>{state?.messages}</span>
            </div>
          )} */}
          {/* {state?.supervisors && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.supervisors")}</span>
              <span>{state?.supervisors}</span>
            </div>
          )} */}
          {/* {state?.hr_module && (
            <div className="w-full flex justify-between">
              <span>
                {t("PackageCard.hr_module", { context: state?.hr_module })}
              </span>
            </div>
          )} */}
          <div className="w-full flex justify-between border-t pt-3">
            <span className="text-xl font-bold">{t("price")}</span>
            <span className="text-xl font-semibold">
              {userProfileDataOutlet?.current_package_info?.actual_payment}{" "}
              {i18n.language.startsWith("en") ? "EGP" : "جنيه"}
              {/* {duration === "monthly"
                ? state?.price_monthly
                : state?.price_yearly}{" "}
              {t("PackageCard.price_prefix")} */}
            </span>
          </div>
          <div className="w-full flex justify-between border-t pt-3">
            <span className="text-xl font-bold">{t("payment")}</span>
            <span className="text-xl font-semibold">
              {userProfileDataOutlet?.current_package_info?.expiration_date?.payment_method ===
              "visa"
                ? t("visa")
                : "cash"}
            </span>
          </div>
          {/* <div className="w-full flex justify-between items-center  border-t pt-3"></div> */}
        </div>
      </div>
    </section>
  );
}
