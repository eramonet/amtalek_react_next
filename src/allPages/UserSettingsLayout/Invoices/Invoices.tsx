"use client";

// import { useOutletContext } from "react-router-dom";
// import { HelmetTags } from "@/Components/MainComponents";
import { useTranslation } from "react-i18next";
import { TUser } from "@/Types/AppTypes";
import InvoicesDetails from "./component/InvoicesDetails";
import useUserProfile from "@/api/useUserProfile";

export function Invoices() {
  const { t, i18n } = useTranslation("Pages_Invoices");
  // const userProfileDataOutlet = useOutletContext() as [TUser];

  const userProfileDataOutlet: any = useUserProfile();

  function CheckPackageValidation() {
    return (
      new Date(
        userProfileDataOutlet?.data?.current_package_info?.expiration_date?.expiration_date
      ).getTime() > new Date().getTime()
    );
  }

  return (
    <section className="site_container flex flex-col border rounded-xl relative p-5 bmd:p-7  gap-4 md:flex-row md:overflow-x-auto overflow-y-visible ss:gap-0 ">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}
      <span className="absolute text-lg rtl:-top-5 bmd:ltr:-top-0 bmd:rtl:-top-1 ltr:-top-4 bg- rtl:right-4 ltr:left-4 ">
        {t("heading")}
      </span>
      <div className="w-full md:w-fit grid grid-cols-8 gap-1 md:grid-cols-2 shrink-0">
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3 ">
          {t("invoice_ID")}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {t("date")}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {t("package_info")}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {t("amount")}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {t("approval")}
        </span>
        <span className="col-span-2 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {t("status")}
        </span>
        <span className="col-span-1 md:col-span-2 flex items-center text-center justify-center bg-secondary20 p-3">
          {t("actions")}
        </span>
      </div>
      {userProfileDataOutlet?.history_packages_info?.map((info: any, index: number) => (
        <div
          key={info?.expiration_date?.package_id}
          className="w-full md:w-fit grid grid-cols-8 gap-1 md:grid-cols-2 bmd:p-3 shrink-0"
        >
          <span className="col-span-1 md:col-span-2 flex items-center justify-center border rounded p-3">
            {`INVOICE${info?.expiration_date?.package_id}`}
          </span>
          <span className="col-span-1 md:col-span-2 flex items-center justify-center border rounded p-3">
            {info?.expiration_date?.date_of_package}
          </span>
          <span className="col-span-1 md:col-span-2 flex items-center justify-center border rounded p-3">
            {info?.expiration_date?.package_type}
          </span>
          <span className="col-span-1 md:col-span-2 flex items-center  justify-center border rounded p- text-m bmd:p-3">
            {info?.actual_payment} {i18n.language.startsWith("en") ? "EGP" : "ج.م"}
          </span>
          <span className="col-span-1 md:col-span-2 flex items-center  justify-center border rounded p- text-m bmd:p-3">
            {t("CurrentStatus", { context: info?.expiration_date?.status })}
          </span>
          <div className="col-span-2 flex flex-col gap-2 items-center justify-center border rounded p-3">
            {CheckPackageValidation() ? (
              <span className="text-green-500">{t("valid")}</span>
            ) : (
              <span className="text-red-500">{t("expired")}</span>
            )}
            <span className="w-full flex justify-center items-center bg-primary/90 text-white py-1 md:p-2 rounded">
              {info?.expiration_date?.expiration_date}
            </span>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center justify-center border rounded p-3">
            <InvoicesDetails
              status={info?.expiration_date?.status}
              key={info?.expiration_date?.package_id}
              id={info?.expiration_date?.package_id}
              from={info?.expiration_date?.date_of_package}
              to={info?.expiration_date?.expiration_date}
              i18n={i18n}
              price={info?.actual_payment}
              // isOpen={isModalOpen}
              t={t}
              details={info?.package_details}
              // setIsOpen={setIsModalOpen}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
