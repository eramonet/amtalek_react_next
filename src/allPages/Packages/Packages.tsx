"use client";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
// import { lang } from "@/Store/Features/MiscellaneousSlice";
import { setRegistrationUserType, userData } from "@/Store/Features/AuthenticationSlice";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import GuestPackageComponent from "./GuestPackageComponent";
import Heading from "@/components/Heading";
import { ErrorMessage } from "@/SubComponents";
import Loader from "@/components/loader/Loader";
import React from "react";
import HeadingTwo from "@/MainComponents/HeadingTwo";
import PackageCard from "@/CardsComponents/PackageCard";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export function Packages() {
  const { t, i18n } = useTranslation("Pages_Packages");
  // const lng = useSelector(lang);
  const dispatchRedux = useDispatch();
  const user = useSelector(userData);
  const { actor_type } = useParams();
  // const { state } = useLocation();
  // const router = useRouter();
  // const { state } = router.query; // هنا الوصول إلى الحالة إذا تم تمريرها كـ query parameter

  // useEffect(() => {
  //   if (state === "showErrorToast") {
  //     toast.error("You need to upgrade your package!");
  //   }
  // }, [state]);

  const headers = user?.token
    ? {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
        lang: i18n.language.startsWith("ar") ? "ar" : "en",
      }
    : {
        "Content-Type": "application/json",
        lang: i18n.language.startsWith("ar") ? "ar" : "en",
      };

  // all packages
  const getPackages = () =>
    axios.get(`https://amtalek.com/amtalekadmin/public/api/packages/${actor_type}`, {
      headers: headers,
    });

  const {
    data: packages,
    isError,
    isPaused,
    isInitialLoading,
    isLoading,
  } = useQuery({
    queryKey: ["PackagesPage"],
    queryFn: getPackages,
    enabled: !!actor_type,
    select: (data) => data?.data?.data,
  });

  const getUserPackages = () =>
    axios.get(`https://amtalek.com/amtalekadmin/public/api/packages/user`, {
      headers: headers,
    });

  const {
    data: UserPackages,
    isError: UserError,
    isPaused: UserPaused,
    isInitialLoading: UserInitialLoading,
    isLoading: UserLoading,
  } = useQuery({
    queryKey: ["UserPackagesProfile"],
    queryFn: getUserPackages,
    enabled: !actor_type,
    select: (data) => data?.data?.data,
  });

  const dataUserFromLocalStorage = user //localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")!)
    : null;

  // dataUserFromLocalStorage.data.has_package = "yes";
  const getBrokerPackages = () =>
    axios.get(`https://amtalek.com/amtalekadmin/public/api/packages/broker`, {
      headers: headers,
    });

  const {
    data: BrokerPackages,
    isError: BrokerError,
    isPaused: BrokerPaused,
    isInitialLoading: BrokerInitialLoading,
  } = useQuery({
    queryKey: ["BrokerPackages"],
    queryFn: getBrokerPackages,
    enabled: !actor_type,
    select: (data) => data?.data?.data,
  });

  const getPageContent = () =>
    axios.get(`https://amtalek.com/amtalekadmin/public/api/packages-page-content`, {
      headers: headers,
    });

  const { data: PageContent } = useQuery({
    queryKey: ["pageContent"],
    queryFn: getPageContent,
    enabled: true,
    select: (data) => data?.data?.data,
  });

  useEffect(() => {
    dispatchRedux(setRegistrationUserType(""));
  }, [dispatchRedux]);

  // useEffect(() => {
  //   if (state === "showErrorToast") {
  //     toast.error("You need to upgrade your package!");
  //   }
  // }, [state]);

  const [left, setLeft] = useState("");
  const [type, setType] = useState("monthly");

  useEffect(() => {
    setLeft(
      i18n.language === "en"
        ? type === "monthly"
          ? "left-0"
          : "left-1/2"
        : type === "monthly"
        ? "left-1/2"
        : "left-0"
    );
  }, [i18n.language, type]);

  if (UserInitialLoading || BrokerInitialLoading || isInitialLoading) {
    return <Loader />;
  }

  return (
    <section className="pt-20 pb-32">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}

      <Heading style={"mx-auto"}>{t("heading")}</Heading>

      <div className="bg-grey my-10 py-10">
        {dataUserFromLocalStorage?.data?.actor_type === actor_type && (
          <div className="site_container p-3">
            {dataUserFromLocalStorage?.data?.actor_type && (
              <>
                <HeadingTwo style={"text-center"}>{t("sub_heading")}</HeadingTwo>
                <div className="Monthly__yearly w-48 sm:w-full h-10 bg-bg mx-auto mt-10 mb-4 round text-lg relative z-0 flex overflow-hidden">
                  <div
                    className={`identifier absolute top-0 w-1/2 h-full bg-secondary trns z-10 ${left}`}
                  ></div>
                  <button
                    onClick={() => setType("monthly")}
                    className={`w-1/2 h-full flex trns relative z-20 font-medium justify-center items-center gap-2 hover:bg-secondary2 ${
                      type === "monthly" && "text-bg"
                    }`}
                  >
                    {t("pricing_options.monthly.title")}
                  </button>
                  <button
                    onClick={() => setType("yearly")}
                    className={`w-1/2 h-full flex trns relative z-20 font-medium justify-center items-center gap-2 hover:bg-secondary2 ${
                      type === "yearly" && "text-bg"
                    }`}
                  >
                    {t("pricing_options.Yearly.title")}
                  </button>
                </div>
                <div className="site_container">
                  <div className={`w-full min-h-[500px]`}>
                    {isError || isPaused ? (
                      <ErrorMessage message={t("ErrorMessage")} />
                    ) : (
                      <div
                        className={`packages__wrapper w-full grid ss:grid-cols-1 ss:gap-14 ${
                          packages?.length === 5 ? "grid-cols-5" : "grid-cols-3"
                        } justify-items-center mt-10 gap- pt-4 ${
                          packages?.length <= 3 && "justify-center ss:justify-start"
                        }`}
                      >
                        {packages?.map((singlePackage: any) => (
                          <PackageCard
                            type={type}
                            key={singlePackage?.id}
                            singlePackage={singlePackage}
                            t={t}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {dataUserFromLocalStorage === null && (
          <div className="flex flex-col gap-20">
            <GuestPackageComponent
              t={t}
              Error={BrokerError}
              Paused={BrokerPaused}
              Packages={BrokerPackages}
            />
            <GuestPackageComponent
              t={t}
              Error={UserError}
              Paused={UserPaused}
              Packages={UserPackages}
              forUser={true}
            />
          </div>
        )}
      </div>
      <div className="Packages__bottom border-y-2 border-y-secondary20 py-3 flex items-center justify-center">
        <p className="italic site_container text-center">
          {PageContent?.main_text}
          <Link className="font-medium" href={`tel:${PageContent?.sales_number}`}>
            {PageContent?.sales_number}
          </Link>{" "}
          {PageContent?.sub}{" "}
          <Link className="font-medium" href={`mailto:${PageContent?.sales_email}`}>
            {PageContent?.sales_email}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
