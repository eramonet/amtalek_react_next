/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import { ErrorMessage, NoItemsMessage } from "@/SubComponents";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import Heading from "@/components/Heading";
import DeletePopUp from "@/MainComponents/DeletePopUp";
import PropertyCard from "@/allPages/PropertyDetails/components/PropertyCard";

export default function MyProperties() {
  const { t, i18n } = useTranslation("Pages_MyProperties");
  const user = useSelector(userData);
  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState<any>([]);

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
      console.log(dataProfile);

      setUserProfileDataOutlet(dataProfile?.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }

  useEffect(() => {
    if (user?.token && i18n.language) {
      getUserProfile(user?.token, i18n?.language);
    }
  }, [user?.token, i18n.language]);

  const getAllViews = useMemo(() => {
    if (!userProfileDataOutlet.my_props) return 0;
    const ViewsArray = userProfileDataOutlet.my_props.map((offer: any) => offer.views);
    return ViewsArray.reduce((a: any, b: any) => a + b, 0);
  }, [userProfileDataOutlet.my_props]);

  const dispatchRedux = useDispatch();
  const queryClient = useQueryClient();

  function handleUnlikeProperty(id: any) {
    queryClient.resetQueries({ queryKey: ["userProfileData"] });
  }

  async function handleDeletePropertySuccess() {
    await queryClient.resetQueries({ queryKey: ["userProfileData"] });
  }

  return (
    <section className="pb-44 site_container">
      <DeletePopUp
        api={process.env.NEXT_PUBLIC_DELETE_PROPERTY}
        Bgcolor="dark"
        t={t}
        onSuccess={handleDeletePropertySuccess}
      />
      <Heading style="text-center">{t("heading")}</Heading>
      <div className="w-full grid grid-cols-3 pt-10 px-3 pb-3 ss:grid-cols-1 amd:grid-cols-2 relative border my-10 ss:gap-3">
        <span className="absolute -top-4 left-3 bg-white text-lg">{t("interactions")}</span>
        <div className="col-span-1 flex flex-col justify-center items-center gap-3 border bg-gray-100 h-[200px]">
          <span className="text-lg">{userProfileDataOutlet?.total_impressions}</span>
          <span className="text-lg">{t("impressions")}</span>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center gap-3 border bg-gray-100 h-[200px]">
          <span className="text-lg">{userProfileDataOutlet?.total_pages_views}</span>
          <span className="text-xl">{t("totalView")}</span>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center gap-3 border bg-gray-100 h-[200px] ">
          <span className="text-lg">{userProfileDataOutlet?.total_leads}</span>
          <span className="text-xl">{t("totalLeads")}</span>
        </div>
      </div>
      <div className="all__favorites--wrapper w-full grid grid-cols-3 gap-5 ss:gap-28 ss:grid-cols-1 amd:grid-cols-2 my-10">
        {userProfileDataOutlet?.my_props?.length > 0 ? (
          userProfileDataOutlet?.my_props?.map((property: any, i: number) => (
            <PropertyCard
              key={i}
              property={property}
              t={t}
              showActions
              user={user}
              lng={i18n?.language}
              ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
              acceptedCheck={true}
              i18n={i18n}
            />
          ))
        ) : userProfileDataOutlet?.my_props?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          <ErrorMessage message={t("ErrorMessage")} />
        )}
      </div>
    </section>
  );
}
