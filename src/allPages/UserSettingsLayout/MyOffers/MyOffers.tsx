"use client";
// import { Heading, HelmetTags } from "@/MainComponents";
import { useState, useEffect } from "react";
import { ErrorMessage, NoItemsMessage } from "@/SubComponents";
// import { PropertyCard } from "@/CardsComponents";
import { useTranslation } from "react-i18next";
// import { lang } from "@/Store/Features/MiscellaneousSlice";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import Heading from "@/components/Heading";
import PropertyCard from "@/CardsComponents/PropertyCard";
// import PropertyCard from "@/allPages/PropertyDetails/components/PropertyCard";

export default function MyOffers({ userProfileDataOutlet }: any) {
  const user = useSelector(userData);
  const { t, i18n } = useTranslation("Pages_MyProperties");

  // إضافة حالات التحميل والأخطاء
  const [isError, setIsError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    // يمكنك تخصيص حالات الخطأ أو التوقف بناءً على البيانات التي تستدعيها هنا
    if (!userProfileDataOutlet) {
      setIsError(true);
    }
  }, [userProfileDataOutlet]);

  return (
    <section className="pb-44 site_container">
      {/* <HelmetTags
        title={t("tab.title", {
          details:
            userProfileDataOutlet?.first_name +
            " " +
            userProfileDataOutlet?.last_name,
        })}
        description={t("tab.description")}
        index={false}
      /> */}

      <Heading style="text-center">{t("headingOffers")}</Heading>
      <div
        className={`all__favorites--wrapper w-full grid ${
          userProfileDataOutlet?.offers?.length === 0 ? "grid-cols-1" : "grid-cols-3"
        } clg:grid-cols-2 my-10 md:grid-cols-1 gap-5`}
      >
        {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : userProfileDataOutlet?.offers?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          userProfileDataOutlet?.offers?.map((offer: any, i: number) => {
            return (
              <PropertyCard
                data={ userProfileDataOutlet?.offers}
                key={i}
                property={offer?.property_data[0]}
                t={t}
                user={user}
                lng={i18n.language}
                offer={offer?.offer_data}
                i18n={i18n}
                ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
