// import { useNavigate, useOutletContext } from "react-router-dom";
import { GoDot } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { TfiClose } from "react-icons/tfi";

import i18next, { use } from "i18next";
import { TUser } from "@/Types/AppTypes";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { userData } from "@/Store/Features/AuthenticationSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function PackageCard({ singlePackage, t, type, SubscriptionInProfile, CurrentPackageID }: any) {
  const { i18n } = useTranslation("LayoutComponents");
  const user = useSelector(userData);

  const lng = i18n.language.startsWith("ar") ? "" : "en";

  // const user = useSelector(userData);

  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState<any>({});

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

  // const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (user?.token) {
      if (userProfileDataOutlet?.has_package === "no") {
        // navigate(
        //   `/${i18next.language.startsWith("ar") ? "" : "en"}${
        //     i18next.language.startsWith("en") ? "/" : ""
        //   }payment/${singlePackage?.id}/${type === "monthly" ? "monthly" : "yearly"}`,
        //   { state: singlePackage }
        // );
      } else {
        toast.error(t("subscribed"));
      }
    } else {
      // navigate(
      //   `/${i18next.language.startsWith("ar") ? "" : "en"}${
      //     i18next.language.startsWith("en") ? "/" : ""
      //   }login`
      // );
      toast.error(t("loginFirst"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, type]);
  return (
    <div
      className={` w-[90%] flex flex-col rounded-xl overflow-hidden relative bg-white gap-  py-5 ${
        singlePackage?.package_type === "featured" && "scale-110"
      }`}
    >
      <div
        style={{
          background:
            singlePackage?.package_type === "free"
              ? "linear-gradient(300deg, rgba(0,167,47,1) 30%, rgba(0,213,76,1) 68%, rgba(199,255,185,1) 100%)"
              : singlePackage?.package_type === "normal"
              ? "linear-gradient(300deg, rgba(27,75,161,1) 30%, rgba(20,84,164,1) 60%, rgba(2,163,230,1) 100%)"
              : singlePackage?.package_type === "featured"
              ? "linear-gradient(300deg, rgba(194,0,0,1) 30%, rgba(255,41,41,1) 68%, rgba(251,148,148,1) 100%)"
              : "",
        }}
        className=" h-[170px] w-full flex flex-col justify-center items-center gap-1"
      >
        <span className="absolute w-[120%] top-[145px] left-1/2 -translate-x-1/2 z-10  h-[90px] rounded-t-full bg-white text-black flex items-center justify-center"></span>
        <span className="border  border-white text-white p-3 rounded w-fit text-xl">
          {singlePackage?.name.toUpperCase()}
        </span>
        <span className="text-white text-[10px] ">{singlePackage?.sub_title}</span>
        <div className="text-white text-xl flex gap-1 items-end justify-center">
          {type === "monthly" ? (
            <span className="flex items-end gap-1 text-2xl">
              {singlePackage?.price_monthly}{" "}
              <span className="text-sm ">{t("PackageCard.price_prefix")}</span>
            </span>
          ) : (
            <span className="flex items-end gap-1 text-2xl">
              {singlePackage?.price_yearly}
              <span className="text-sm ">{t("PackageCard.price_prefix")}</span>
            </span>
          )}
          <span className="text-sm">/</span>
          {type === "monthly" ? (
            <span className="text-sm">{t("PackageCard.price_suffix_month")}</span>
          ) : (
            <span className="text-sm">{t("PackageCard.price_suffix_year")}</span>
          )}
        </div>
      </div>

      <div className="text-black z-20 flex flex-col gap-4 w-full items-center px-">
        {singlePackage?.normal_listings && (
          <div className="w-3/4">
            <div className="flex items-center gap-2 border-b-[1px] w-full justify-start pb-1">
              <span className="flex items-center">
                {singlePackage?.normal_listings !== "0" ? (
                  <FaCheck color="#00a72f" />
                ) : (
                  <TfiClose color="red" />
                )}
              </span>
              <span className="text-sm">{singlePackage?.normal_listings}</span>
              <span className="text-sm">{t("PackageCard.normal_listings")}</span>
            </div>
          </div>
        )}
        {singlePackage?.featured_listings && (
          <div className="w-3/4">
            <div className="flex items-center gap-2 border-b-[1px] w-full justify-start pb-1">
              <span className="flex items-center">
                {singlePackage?.featured_listings !== "0" ? (
                  <FaCheck color="#00a72f" />
                ) : (
                  <TfiClose color="red" />
                )}
              </span>
              <span className="text-sm">{singlePackage?.featured_listings}</span>
              <span className="text-sm">{t("PackageCard.featured_listings")}</span>
            </div>
          </div>
        )}
        {singlePackage?.projects && (
          <div className="w-3/4">
            <div className="flex items-center gap-2 border-b-[1px] w-full justify-start pb-1">
              <span className="flex items-center">
                {singlePackage?.projects !== "0" ? (
                  <FaCheck color="#00a72f" />
                ) : (
                  <TfiClose color="red" />
                )}
              </span>
              <span>{singlePackage?.projects}</span>
              <span>{t("PackageCard.projects")}</span>
            </div>
          </div>
        )}
        {singlePackage?.crm_agents && (
          <div className="w-3/4">
            <div className="flex items-center gap-2 border-b-[1px] w-full justify-start pb-1">
              <span className="flex items-center">
                {singlePackage?.crm_agents !== "0" ? (
                  <FaCheck color="#00a72f" />
                ) : (
                  <TfiClose color="red" />
                )}
              </span>
              <span className="text-sm">{singlePackage?.crm_agents}</span>
              <span className="text-sm">{t("PackageCard.crm_agents")}</span>
            </div>
          </div>
        )}
        {singlePackage?.supervisors && (
          <div className="w-3/4">
            <div className="flex items-center gap-2 border-b-[1px] w-full justify-start pb-1">
              <span className="flex items-center">
                {singlePackage?.supervisors !== "0" ? (
                  <FaCheck color="#00a72f" />
                ) : (
                  <TfiClose color="red" />
                )}
              </span>
              <span className="text-sm">{singlePackage?.supervisors}</span>
              <span className="text-sm">{t("PackageCard.supervisors")}</span>
            </div>
          </div>
        )}
        {singlePackage?.hr_module && (
          <div className="w-3/4">
            <div className="flex items-center gap-2 border-b-[1px] w-full justify-start pb-1">
              <span className="flex items-center">
                {singlePackage?.hr_module !== "no" ? (
                  <FaCheck color="#00a72f" />
                ) : (
                  <TfiClose color="red" />
                )}
              </span>
              <span className="text-sm">
                {singlePackage?.hr_module === "yes"
                  ? t("PackageCard.hr_module_yes")
                  : t("PackageCard.hr_module_no")}
              </span>
            </div>
          </div>
        )}
        {singlePackage?.accounting_module && (
          <div className="w-3/4">
            <div className="flex items-center gap-2 border-b-[1px] w-full justify-start pb-1">
              <span className="flex items-center">
                {singlePackage?.accounting_module !== "no" ? (
                  <FaCheck color="#00a72f" />
                ) : (
                  <TfiClose color="red" />
                )}
              </span>
              <span className="text-sm">
                {singlePackage?.accounting_module === "yes"
                  ? t("PackageCard.accounting_module_yes")
                  : t("PackageCard.accounting_module_no")}
              </span>
            </div>
          </div>
        )}
        {singlePackage?.messages && (
          <div className="w-3/4 ">
            <div className="flex items-center gap-2 border-b-[1px] w-full justify-start pb-1">
              <span className="flex items-center">
                {singlePackage?.messages !== "0" ? (
                  <FaCheck color="#00a72f" />
                ) : (
                  <TfiClose color="red" />
                )}
              </span>
              <span className="text-sm">{singlePackage?.messages}</span>
              <span className="text-sm">{t("PackageCard.messages")}</span>
            </div>
          </div>
        )}
        {singlePackage?.leads_management && (
          <div className="w-3/4">
            <div className="flex  items-center gap-2 border-b-[1px] w-full justify-start pb-1">
              <span className="flex items-center">
                {singlePackage?.leads_management !== "0" ? (
                  <FaCheck color="#00a72f" />
                ) : (
                  <TfiClose color="red" />
                )}
              </span>
              <span className="text-sm">{singlePackage?.leads_management}</span>
              <span className="text-[11px]">{t("PackageCard.leads")}</span>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleClick}
        disabled={CurrentPackageID === singlePackage?.id}
        style={{
          background:
            CurrentPackageID !== singlePackage?.id && singlePackage?.package_type === "free"
              ? "linear-gradient(300deg, rgba(0,167,47,1) 30%, rgba(0,213,76,1) 68%, rgba(199,255,185,1) 100%)"
              : singlePackage?.package_type === "normal" && CurrentPackageID !== singlePackage?.id
              ? "linear-gradient(300deg, rgba(27,75,161,1) 30%, rgba(20,84,164,1) 60%, rgba(2,163,230,1) 100%)"
              : singlePackage?.package_type === "featured" && CurrentPackageID !== singlePackage?.id
              ? "linear-gradient(300deg, rgba(194,0,0,1) 30%, rgba(255,41,41,1) 68%, rgba(251,148,148,1) 100%)"
              : "rgba(128, 128, 128, 0.5)",
        }}
        className={` ${
          CurrentPackageID === singlePackage?.id && "cursor-not-allowed"
        } text-white w-1/2 flex mx-auto  justify-center items-center p-3 rounded-xl mt-3  ${
          CurrentPackageID !== singlePackage?.id &&
          (singlePackage?.package_type === "featured"
            ? "featuredHover"
            : singlePackage?.package_type === "normal"
            ? "normalHover"
            : "freeHover")
        }`}
      >
        {SubscriptionInProfile && CurrentPackageID === singlePackage?.id
          ? t("PackageCard.current_package")
          : t("PackageCard.buy")}
      </button>
    </div>
  );
}

export default PackageCard;
