import { useTranslation } from "react-i18next";
import { lang } from "@/Store/Features/MiscellaneousSlice";
// import { PackageCard } from "@/CardsComponents/index";
import Loader from "@/SubComponents/Loader";
import { useQuery } from "@tanstack/react-query";
import { userData } from "@/Store/Features/AuthenticationSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import ErrorMessage from "@/SubComponents/ErrorMessage";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { TUser } from "@/Types/AppTypes";
import Heading from "@/components/Heading";
import HeadingTwo from "@/MainComponents/HeadingTwo";
import PackageCard from "@/CardsComponents/PackageCard";

export function Component() {
  const [userProfileDataOutlet] = useOutletContext() as [TUser];
  const user = useSelector(userData);
  const lng = useSelector(lang);
  const { t, i18n } = useTranslation("Pages_Subscription");
  const [left, setLeft] = useState("");
  const [type, setType] = useState("monthly");

  useEffect(() => {
    if (type === "monthly") {
      setLeft(lng === "en" ? "left-0" : "left-1/2");
    } else {
      setLeft(lng === "en" ? "left-1/2" : "left-0");
    }
  }, [lng, type]);

  const headers = {
    Authorization: `Bearer ${user?.token}`,
    "Content-Type": "application/json",
    lang: i18n.language?.startsWith("ar") ? "ar" : "en",
  };

  function getUserPackages() {
    return axios.get(`https://amtalek.com/amtalekadmin/public/api/packages/user`, {
      headers: headers,
    });
  }
  const {
    data: UserPackages,
    isError: UserError,
    isPaused: UserPaused,
    isLoading: UserLoading,
  } = useQuery({
    queryKey: ["UserPackages"],
    queryFn: getUserPackages,
    enabled: !!user?.token,
    select: (data) => data?.data?.data,
  });

  function getPageContent() {
    return axios.get(`https://amtalek.com/amtalekadmin/public/api/packages-page-content`, {
      headers: headers,
    });
  }
  const { data: PageContent } = useQuery({
    queryKey: ["pageContent"],
    queryFn: getPageContent,
    enabled: true,
    select: (data) => data?.data?.data,
  });
  if (UserLoading) {
    return <Loader />;
  }
  return (
    <section className="pt-20  pb-32">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}
      <Heading style={"text-center mx-auto"}>{t("heading")}</Heading>
      <div className="site_containe my-10 p-3 bg-grey ">
        <HeadingTwo style={"text-center"}>{t("sub_heading")}</HeadingTwo>
        <div className="Monthly__yearly w-48 sm:w-full h-10 bg-bg mx-auto mt-10 mb-4 round text-lg relative z-0 flex overflow-hidden">
          <div
            className={`identifier absolute top-0 w-1/2 h-full bg-secondary trns  z-10 ${left}`}
          ></div>
          <button
            onClick={() => {
              setLeft(lng === "en" ? "left-0" : "left-1/2");
              setType("monthly");
            }}
            className={`w-1/2 h-full flex trns relative z-20 font-medium  justify-center items-center gap-2 hover:bg-secondary2  
              ${type === "monthly" && "text-bg"}
              `}
          >
            {t("pricing_options.monthly.title")}
          </button>
          <button
            onClick={() => {
              setLeft(lng === "en" ? "left-1/2" : "left-0");
              setType("yearly");
            }}
            className={`w-1/2 h-full flex trns relative z-20 font-medium  justify-center items-center gap-2 hover:bg-secondary2  ${
              type === "yearly" && "text-bg"
            } `}
          >
            {t("pricing_options.Yearly.title")}
          </button>
        </div>
        <div className="site_container">
          <div className={`w-full  min-h-[500px] `}>
            {UserError || UserPaused ? (
              <ErrorMessage message={t("ErrorMessage")} />
            ) : (
              <div
                className={` packages__wrapper w-full grid ss:grid-cols-1 ss:gap-14  ${
                  UserPackages?.length === 5 ? "grid-cols-5" : "grid-cols-3"
                } justify-items-center mt-10 gap- pt-4  ${
                  UserPackages?.length <= 3 && " justify-center ss:justify-start"
                }`}
              >
                {UserPackages?.map((singlePackage: any) => (
                  <>
                    <PackageCard
                      CurrentPackageID={userProfileDataOutlet?.current_package_info?.package_id}
                      SubscriptionInProfile={true}
                      type={type}
                      key={singlePackage?.id}
                      singlePackage={singlePackage}
                      t={t}
                    />
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="Packages__bottom border-y-2 border-y-secondary20 py-3 flex items-center justify-center">
        <p className="italic site_container  text-center">
          {PageContent?.main_text} {""}
          <a className="font-medium" href={`tel:${PageContent?.sales_number}`}>
            {PageContent?.sales_number}
          </a>{" "}
          {""}
          {PageContent?.sub} {""}
          <a className="font-medium" href={`mailto:${PageContent?.sales_email}`}>
            {PageContent?.sales_email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
