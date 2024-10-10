import ReceivedOffers from "@/allPages/UserSettingsLayout/ReceivedOffers/ReceivedOffers";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default async function MyReceivedOffersPage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout userProfileDataOutlet={userProfileDataOutlet} />
      {/* userProfileDataOutlet={userProfileDataOutlet} user={userData} */}
      <ReceivedOffers userProfileDataOutlet={userProfileDataOutlet} />;
    </>
  );
}
