// import {
//   Heading,
//   HelmetTags,
//   SubHeading,
// } from "@/MainComponents";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import { ErrorMessage, Loader, NoItemsMessage } from "@/SubComponents";
// import { PropertyCard } from "@/CardsComponents";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import { TUser } from "@/Types/AppTypes";
import Heading from "@/components/Heading";
import SubHeading from "@/MainComponents/SubHeading";
import PropertyCard from "@/CardsComponents/PropertyCard";

export function Component() {
  const { t, i18n } = useTranslation("Pages_Favorites");

  const dispatchRedux = useDispatch();
  const user = useSelector(userData);
  const lng = useSelector(lang);

  const queryClient = useQueryClient();
  const [userProfileDataOutlet, refetch, isLoading, isError, isPaused] = useOutletContext() as [
    TUser,
    () => void,
    boolean,
    boolean,
    boolean
  ];

  function handleAfterRemoveFromWishlist(id: number) {
    //queryClient.invalidateQueries("userProfileData");

    queryClient.resetQueries({ queryKey: ["userProfileData"] });
  }

  return (
    <section className="pb-44  site_container ">
      {/* <HelmetTags
        title={t("tab.title")}
        description={t("tab.description")}
        index={false}
      /> */}
      <Heading style="text-center">{t("heading")}</Heading>
      <SubHeading style="text-start ">{t("sub_heading")}</SubHeading>

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
              onSuccess={handleAfterRemoveFromWishlist}
              key={i}
              property={property}
              user={user}
              lng={lng}
              ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
              t={t}
              refetch={refetch}
              i18n={i18n}
            />
          ))
        )}
      </div>
    </section>
  );
}
