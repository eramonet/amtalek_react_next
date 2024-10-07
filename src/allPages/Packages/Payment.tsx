"use client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { userData } from "@/Store/Features/AuthenticationSlice";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { Hourglass } from "react-loader-spinner";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { TUser } from "@/Types/AppTypes";
import Heading from "@/components/Heading";
import { setSubscribed } from "@/Store/Features/MiscellaneousSlice";

export function PaymentPage() {
  const dispatchRedux = useDispatch();
  const { t, i18n } = useTranslation("Pages_Packages");
  const [PaymentType, setPaymentType] = useState("visa");
  const [left, setLeft] = useState("");
  // const lng = useSelector(lang);
  const { packageID, duration } = useParams();
  const user = useSelector(userData);
  const { state } = useLocation();
  const queryClient = useQueryClient();

  const headers = user?.token
    ? {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
        lang: i18n.language?.startsWith("ar") ? "ar" : "en",
      }
    : {
        "Content-Type": "application/json",
        lang: i18n.language?.startsWith("ar") ? "ar" : "en",
      };
  const [userProfileDataOutlet, refetch] = useOutletContext() as [TUser, () => void];

  function getSubscribtion() {
    return axios.post(
      `https://amtalek.com/amtalekadmin/public/api/subscribe-package`,
      {
        package_id: packageID,
        duration: duration,
        actor_type: user?.data?.actor_type,
      },
      { headers: headers }
    );
  }
  const { mutate, isLoading, error }: any = useMutation({
    mutationKey: ["Subscribe"],
    mutationFn: getSubscribtion,
    onSuccess: (data) => {
      dispatchRedux(setSubscribed(true));
      navigate(`${i18n.language?.startsWith("ar") ? "" : "/en"}/finish/visa`, { replace: true });
      refetch();
      queryClient.invalidateQueries({ queryKey: ["userDataProf"] });
    },
  });
  useEffect(() => {
    if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    if (PaymentType === "visa") {
      setLeft(i18n.language === "en" ? "left-0" : "left-1/2");
    } else {
      setLeft(i18n.language === "en" ? "left-1/2" : "left-0");
    }
  }, [i18n.language, PaymentType]);
  const navigate = useNavigate();

  return (
    <section className="site_container py-5 flex flex-col gap-5 pb-24 lg:pb-32">
      {/* <HelmetTags title={t("tab.payment")} description={t("tab.description")} /> */}
      <Heading style={"text-center"}>{t("HeaderDetails")}</Heading>
      <section className="w-full grid grid-cols-3 gap-2 ss:grid-cols-1">
        <form className="col-span-1 flex flex-col gap-5  p-2 rounded-xl ss:col-span-1">
          <legend className="text-2xl">{t("BillingDetails")}</legend>
          <div className="w-full grid grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col gap-2">
              <label>{t("first_name")}</label>
              <input
                disabled
                className="w-full bg-grey px-2 py-4 rounded-xl"
                value={userProfileDataOutlet?.first_name}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label>{t("last_name")}</label>
              <input
                disabled
                className="w-full bg-grey px-2 py-4 rounded-xl"
                value={userProfileDataOutlet?.last_name}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <label>{t("phone")}</label>
              <input
                disabled
                className="w-full bg-grey px-2 py-4 rounded-xl"
                value={userProfileDataOutlet?.phone}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <label>{t("email")}</label>
              <input
                disabled
                className="w-full bg-grey px-2 py-4 rounded-xl"
                value={userProfileDataOutlet?.email}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <label>{t("country")}</label>
              <input
                disabled
                className="w-full bg-grey px-2 py-4 rounded-xl"
                value={userProfileDataOutlet?.country_name}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <label>{t("city")}</label>
              <input
                disabled
                className="w-full bg-grey px-2 py-4 rounded-xl"
                value={userProfileDataOutlet?.city_name}
              />
            </div>
          </div>
        </form>
        <div className="col-span-2 p-8 rounded-xl border flex flex-col gap-3 bg-grey">
          <span className="text-2xl">{t("your_order")}</span>
          <span className="text-xl border-b pb-3">
            {i18n.language.startsWith("en") ? "Package" : "الباقة"}
          </span>
          <div className="w-full flex justify-between items-center">
            <span>{t("name")}</span>
            <div className="flex flex-col">
              <span className="text-xl text-end">{state?.name}</span>
              {/* <span>{state?.sub_title}</span> */}
            </div>
          </div>
          <div className="w-full flex justify-between border-b pb-3">
            <span>{t("duration")}</span>
            <span>
              {" "}
              {duration === "monthly"
                ? t("pricing_options.monthly.title")
                : t("pricing_options.Yearly.title")}
            </span>
          </div>
          <div className="text-xl">{t("package_details")}</div>
          {state?.normal_listings && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.normal_listings")}</span>
              <span>{state?.normal_listings}</span>
            </div>
          )}
          {state?.featured_listings && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.featured_listings")}</span>
              <span>{state?.featured_listings}</span>
            </div>
          )}
          {state?.projects && (
            <div className="w-full flex justify-between">
              <span>{t("projects")}</span>
              <span>{state?.projects}</span>
            </div>
          )}
          {state?.emoney && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.emoney")}</span>
              <span>{state?.emoney}</span>
            </div>
          )}
          {state?.leads_management && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.leads")}</span>
              <span>{state?.leads_management}</span>
            </div>
          )}
          {state?.messages && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.messages")}</span>
              <span>{state?.messages}</span>
            </div>
          )}
          {state?.supervisors && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.supervisors")}</span>
              <span>{state?.supervisors}</span>
            </div>
          )}
          {state?.hr_module && (
            <div className="w-full flex justify-between">
              <span>{t("PackageCard.hr_module", { context: state?.hr_module })}</span>
            </div>
          )}
          <div className="w-full flex justify-between border-t pt-3">
            <span className="text-2xl font-bold">{t("price")}</span>
            <span className="text-xl font-semibold">
              {duration === "monthly" ? state?.price_monthly : state?.price_yearly}{" "}
              {t("PackageCard.price_prefix")}
            </span>
          </div>
          <div className="w-full flex justify-between items-center  border-t pt-3 ss:flex-col">
            <div className="flex flex-col gap-3">
              <span className="text-xl">{t("payment")}</span>
              <div className="flex gap-2">
                <div className="w-fit flex gap-2">
                  <input type="radio" name="payment" value="cash" id="cash" checked />
                  <label htmlFor="cash">{t("cash")}</label>
                </div>
                <div className="w-fit flex gap-2">
                  <input disabled type="radio" name="payment" value="visa" id="visa" />
                  <label htmlFor="visa">{t("visa")}</label>
                </div>
              </div>
            </div>
            <button
              onClick={() => mutate()}
              className="w-fit ms-auto ss:mx-auto ss:mt-2 p-2 rounded bg-primary text-white flex justify-center items-center gap-3 ss:text-sm"
            >
              {t("confirm")}

              {isLoading && <ClipLoader size={20} color={"#ffffff"} />}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
