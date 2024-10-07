"use client";
import PackageCard from "@/CardsComponents/PackageCard";
import HeadingTwo from "@/MainComponents/HeadingTwo";
import { ErrorMessage } from "@/SubComponents";
// import { PackageCard } from "../../Components/CardsComponents/index.ts";
// import { HeadingTwo } from "../../Components/MainComponents/index.ts";
// import ErrorMessage from "../../Components/SubComponents/ErrorMessage.tsx";
// import { lang } from "../../Store/Features/MiscellaneousSlice.tsx";
import { TFunction } from "i18next";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

type Props = {
  t: TFunction;
  Error: boolean;
  Paused: boolean;
  Packages: any;
  forUser?: boolean;
};
function GuestPackageComponent({ t, Error, Paused, Packages, forUser }: Props) {
  // const lng = useSelector(lang);
  const { i18n } = useTranslation("Pages_Packages");

  const [left, setLeft] = useState("");
  const [type, setType] = useState("monthly");
  useEffect(() => {
    if (type === "monthly") {
      setLeft(i18n.language === "en" ? "left-0" : "left-1/2");
    } else {
      setLeft(i18n.language === "en" ? "left-1/2" : "left-0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, type]);

  {
    /* ******************************************************************************************************************** */
  }

  return (
    <div className="site_container  pb-10 border-b-2 border-black">
      <HeadingTwo style={"text-center"}>
        {forUser ? t("sub_heading_users") : t("sub_heading_agents")}

        {/* *************************************************************************************************************************** */}
      </HeadingTwo>

      {/* *************************************************************************************************************************** */}

      <div className="Monthly__yearly w-48 sm:w-full h-10 bg-bg mx-auto mt-10 mb-4 round text-lg relative z-0 flex overflow-hidden">
        <div
          className={`identifier absolute top-0 w-1/2 h-full bg-secondary trns  z-10 ${left}`}
        ></div>
        <button
          onClick={() => {
            setLeft(i18n.language === "en" ? "left-0" : "left-1/2");
            setType("monthly");
          }}
          className={`w-1/2 h-full flex trns relative z-20 font-medium  justify-center items-center gap-2 hover:bg-secondary2  
              ${type === "monthly" && "text-bg"}
              `}
        >
          {t("pricing_options.monthly.title")}
        </button>

        {/* *************************************************************************************************************************** */}

        <button
          onClick={() => {
            setLeft(i18n.language === "en" ? "left-1/2" : "left-0");
            setType("Yearly");
          }}
          className={`w-1/2 h-full flex trns relative z-20 font-medium  justify-center items-center gap-2 hover:bg-secondary2  ${
            type === "Yearly" && "text-bg"
          } `}
        >
          {t("pricing_options.Yearly.title")}
        </button>
      </div>

      {/* *************************************************************************************************************************** */}

      <div className={`w-full  min-h-[500px] `}>
        {Error || Paused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : (
          // ***************************************************************************************************************************
          <div
            className={` packages__wrapper w-full grid ss:grid-cols-1 ss:gap-14  ${
              Packages?.length === 5 ? "grid-cols-5" : "grid-cols-3"
            } justify-items-center mt-10 gap- pt-4  ${
              Packages?.length <= 3 && " justify-center ss:justify-start"
            }`}
          >
            {Packages?.map((singlePackage: any) => (
              <>
                <PackageCard
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
  );
}

export default GuestPackageComponent;
