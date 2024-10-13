"use client";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import { ErrorMessage, Loader, NoItemsMessage } from "@/SubComponents";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import Heading from "@/components/Heading";
import SubHeading from "@/MainComponents/SubHeading";
import PropertyCard from "@/CardsComponents/PropertyCard";
import { useEffect, useState } from "react";

export default function Favorites() {
  const { t, i18n } = useTranslation("Pages_Favorites");

  const dispatchRedux = useDispatch();
  const user = useSelector(userData);
  // const lng = useSelector(lang);

  const queryClient = useQueryClient();
  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  async function getUserProfile(token: string, language: string) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            lang: language,
          },
        }
      );

      if (!response.ok) {
        setIsError(true);
        throw new Error("Network response was not ok");
      }

      const dataProfile = await response.json();
      setUserProfileDataOutlet(dataProfile?.data);
      setIsError(false);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user?.token && i18n.language) {
      getUserProfile(user?.token, i18n?.language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, i18n.language]);

  function handleAfterRemoveFromWishlist(id: number) {
    queryClient.resetQueries({ queryKey: ["userProfileData"] });
  }

  return (
    <section className="pb-44 site_container">
      <Heading style="text-center">{t("heading")}</Heading>
      <SubHeading style="text-start">{t("sub_heading")}</SubHeading>

      <div className="all__favorites--wrapper w-full grid grid-cols-3 my-10 ss:grid-cols-1 amd:grid-cols-2 gap-5">
        {isLoading ? (
          <Loader />
        ) : isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : userProfileDataOutlet?.favorite_list?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          userProfileDataOutlet?.favorite_list?.map((property: any, i: number) => (
            <PropertyCard
              data={userProfileDataOutlet?.favorite_list}
              onSuccess={handleAfterRemoveFromWishlist}
              key={i}
              property={property}
              user={user}
              lng={i18n.language}
              ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
              t={t}
              i18n={i18n}
            />
          ))
        )}
      </div>
    </section>
  );
}
