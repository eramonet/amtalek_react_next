import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { userData } from "../../Store/Features/AuthenticationSlice";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { lang, setSubscribed } from "../../Store/Features/MiscellaneousSlice";
import { Hourglass } from "react-loader-spinner";
import { TUser } from "@/Types/AppTypes";
import Heading from "@/components/Heading";
// import { Heading, HelmetTags } from "@/Components/MainComponents";

export function Component() {
  const dispatchRedux = useDispatch();
  const { t, i18n } = useTranslation("Pages_Packages");
  const [PaymentType, setPaymentType] = useState("visa");
  const [left, setLeft] = useState("");
  const lng = useSelector(lang);
  const { packageID, duration } = useParams();
  const user = useSelector(userData);
  const { state } = useLocation();
  const queryClient = useQueryClient();

  const headers = {
    Authorization: `Bearer ${user?.token}`,
    "Content-Type": "application/json",
    lang: i18n.language?.startsWith("ar") ? "ar" : "en",
  };
  const [userProfileDataOutlet, refetch] = useOutletContext() as [TUser, () => void];
  const navigate = useNavigate();

  async function postAddons() {
    return await axios.post(
      `https://amtalek.com/amtalekadmin/public/api/subscribe-addons`,
      {
        addons: state?.items?.map((item: any) => {
          return {
            id: item.id,
            quantity: item.quantity,
          };
        }),
        duration: state?.duration,
      },
      {
        headers: headers,
      }
    );
  }

  const { mutate, isLoading }: any = useMutation({
    mutationKey: ["postAddons"],
    mutationFn: postAddons,

    onSuccess: (data) => {
      navigate(`${i18n.language?.startsWith("ar") ? "" : "/en"}/finish/visa`, { replace: true });
      dispatchRedux(setSubscribed(true));
    },
  });

  useEffect(() => {
    if (PaymentType === "visa") {
      setLeft(lng === "en" ? "left-0" : "left-1/2");
    } else {
      setLeft(lng === "en" ? "left-1/2" : "left-0");
    }
  }, [lng, PaymentType]);

  return (
    <section className="site_container py-5 flex flex-col gap-5 pb-24 lg:pb-32">
      {/* <HelmetTags
        title={`${i18n.language?.startsWith("ar") ? "الاضافات" : "Addons-Payment"}`}
        description={t("tab.description")}
      /> */}
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
            {i18n.language.startsWith("en") ? "Addons" : "الاضافات"}
          </span>
          <div className="w-full flex justify-between items-center">
            {/* <span>{t("name")}</span> */}
            <div className="flex flex-col w-full">
              <div className="flex flex-col gap-3 w-full">
                {state?.items
                  ?.filter((item: any) => item?.quantity !== 0)
                  .map((add: any, ind: number) => (
                    // eslint-disable-next-line react/jsx-key
                    <div key={ind} className="flex items-center justify-between gap-10">
                      <span>
                        {i18n.language?.startsWith("en")
                          ? add?.name === "normal_listings"
                            ? "Normal Listings"
                            : add?.name === "featured_listings"
                            ? "Featured Listings"
                            : add?.name === "projects"
                            ? "Projects"
                            : "Messages"
                          : add?.name === "normal_listings"
                          ? "العقارات العادية"
                          : add?.name === "featured_listings"
                          ? "العقارات المميزة"
                          : add?.name === "projects"
                          ? "المشاريع"
                          : "الرسائل"}
                      </span>
                      <span>
                        {add?.quantity}
                        {" X "}
                        {state.duration === "monthly" ? add?.monthly_price : add?.yearly_price}{" "}
                        {t("PackageCard.price_prefix")}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between border-b pb-3 mt-3">
            <span>{t("duration")}</span>
            <span className="capitalize"> {state?.duration}</span>
          </div>

          <div className="w-full flex justify-between pt-3">
            <span className="text-2xl font-bold ss:text-lg">{t("price")}</span>
            <span className="text-xl font-semibold ss:text-lg">
              {state?.totalPrice} {t("PackageCard.price_prefix")}
            </span>
          </div>
          <div className="w-full flex justify-between items-center  border-t pt-3">
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

              {isLoading && <Hourglass width={20} height={20} colors={["#ffffff", "#ffffff"]} />}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}