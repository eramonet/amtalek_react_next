"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { userData } from "@/Store/Features/AuthenticationSlice";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import { Loader } from "@/SubComponents";
// import { Link } from "react-router-dom";
import Loader from "@/components/loader/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { HelmetTags } from "@/Components/MainComponents";

// user
export default function Addons({}: any) {
  const { i18n } = useTranslation("Pages_Packages");
  const [duration, setDuration] = useState("monthly");
  const user = useSelector(userData);
  const headers = {
    Authorization: `Bearer ${user?.token}`,
    "Content-Type": "application/json",
    lang: i18n.language?.startsWith("ar") ? "ar" : "en",
  };

  const router = useRouter();
  async function getAddons() {
    return await axios.get(`https://amtalek.com/amtalekadmin/public/api/addons`, {
      headers: headers,
    });
  }

  function submitMonyToSeesionStorage(data: any, totalPrice: any, duration: any) {
    sessionStorage.setItem("items", JSON.stringify(data));
    sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    sessionStorage.setItem("duration", JSON.stringify(duration));

    router.push("/addons-payment");
  }
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["addons"],
    queryFn: getAddons,
    select: (data) => data?.data?.data,
  });
  const handleClick = useCallback((dir: string) => {
    setDuration(dir);
  }, []);
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    if (isSuccess) {
      setItems(
        data?.map((item: any) => ({
          ...item,
        }))
      );
    }
  }, [isSuccess]);

  const totalPrice = useMemo(() => {
    let total = 0;
    items.forEach((item) => {
      if (duration === "monthly") {
        total += item.quantity * item.monthly_price;
      } else {
        total += item.quantity * item.yearly_price;
      }
    });
    return total;
  }, [items, duration]);
  if (isLoading) return <Loader />;
  return (
    <section className="site_container flex flex-col gap-5 rounded-xl p-3 border items-center">
      {/* <HelmetTags
        title={`${i18n.language?.startsWith("ar") ? "الاضافات" : "Addons"}`}
        description={"Addons Payment"}
      /> */}
      <div className="w-fit relative flex  p-3 gap-5 ">
        <button
          onClick={() => {
            handleClick("monthly");
          }}
          className={`text-md transition-all duration-500   ${
            duration === "monthly" ? "text-white" : "text-primary"
          }`}
        >
          {i18n.language?.startsWith("ar") ? "شهري" : "Monthly"}
        </button>
        <button
          onClick={() => {
            handleClick("yearly");
          }}
          className={`text-md transition-all duration-500  ${
            duration === "yearly" ? "text-white" : "text-primary"
          }`}
        >
          {i18n.language?.startsWith("ar") ? "سنوي" : "Yearly"}
        </button>
        <span
          className={`absolute top-0 ${
            duration === "monthly"
              ? "ltr:translate-x-[calc(50%-45px)] rtl:translate-x-[calc(50%-25px)]"
              : "ltr:translate-x-[calc(50%+28px)] rtl:translate-x-[calc(-50%-20px)] "
          } transition-all duration-500 h-full w-[calc(50%+0px)] bg-primary -z-10 rounded `}
        ></span>
      </div>
      <div className="w-full flex flex-col gap-5 border-t">
        {items?.map((item) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div
              key={item?.id}
              className="w-full flex justify-between items-center p-2 ss:flex-col ss:gap-5 border-b"
            >
              <div className="flex flex-col gap-3 ss:flex-row ss:items-center">
                <h2 className="ss:text-xl">
                  {i18n.language?.startsWith("en")
                    ? item?.name === "normal_listings"
                      ? "Normal Listings"
                      : item?.name === "featured_listings"
                      ? "Featured Listings"
                      : item?.name === "projects"
                      ? "Projects"
                      : "Messages"
                    : item?.name === "normal_listings"
                    ? "العقارات العادية"
                    : item?.name === "featured_listings"
                    ? "العقارات المميزة"
                    : item?.name === "projects"
                    ? "المشاريع"
                    : "الرسائل"}
                </h2>
                <span>
                  {duration === "monthly" ? item?.monthly_price : item?.yearly_price}{" "}
                  {i18n.language?.startsWith("ar") ? "جنيه مصري " : "EGP"}
                </span>
              </div>
              <div className="flex justify-between  items-center w-[230px] ss:w-full ss:justify-around">
                <div className="p-2 rounded-xl flex items-center justify-center gap-5 bg-slate-200 w-[100px]">
                  <button
                    disabled={item?.quantity === 0}
                    onClick={() => {
                      setItems(
                        items.map((i) => {
                          if (i?.id === item?.id) {
                            return {
                              ...i,
                              quantity: i?.quantity - 1,
                              total:
                                duration === "monthly"
                                  ? i?.monthly_price * i?.quantity
                                  : i?.yearly_price * i?.quantity,
                            };
                          }
                          return i;
                        })
                      );
                    }}
                  >
                    -
                  </button>
                  <span>{item?.quantity}</span>
                  <button
                    onClick={() => {
                      setItems(
                        items?.map((i) => {
                          if (i?.id === item?.id) {
                            return {
                              ...i,
                              quantity: i?.quantity + 1,
                              total:
                                duration === "monthly"
                                  ? i?.monthly_price * i?.quantity
                                  : i?.yearly_price * i?.quantity,
                            };
                          } else return i;
                        })
                      );
                    }}
                  >
                    +
                  </button>
                </div>
                <span className="px-3">
                  {duration === "monthly"
                    ? (item?.monthly_price * item?.quantity).toLocaleString("en-US")
                    : (item?.yearly_price * item?.quantity).toLocaleString("en-US")}{" "}
                  {i18n.language?.startsWith("ar") ? "جنيه مصري " : "EGP"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex items-center justify-between  pt-5">
        <span className="text-xl font-bold">
          {i18n.language?.startsWith("ar") ? "الاجمالي" : "Total Price"}
        </span>
        <span className="text-xl">
          {totalPrice.toLocaleString("en-US")}{" "}
          {i18n.language?.startsWith("ar") ? "جنيه مصري " : "EGP"}
        </span>
      </div>
      <div
        onClick={() => submitMonyToSeesionStorage(items, totalPrice, duration)}
        // state={{ items, totalPrice, duration }}
        // href={{
        //   // ${i18n.language?.startsWith("ar") ? "" : "/en"}
        //   pathname: `/addons-payment`,
        //   query: {
        //     items: JSON.stringify(items),
        //     totalPrice,
        //     duration,
        //   },
        // }}
        className={`bg-primary text-white w-fit p-3 rounded border border-primary hover:bg-transparent hover:text-primary transition duration-300 ${
          totalPrice === 0 && "border-none pointer-events-none !bg-gray-200"
        }`}
      >
        {i18n.language?.startsWith("ar") ? "الدفع" : "Proceed to Checkout"}
      </div>
    </section>
  );
}
