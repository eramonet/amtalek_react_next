import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import Subscription from "@/allPages/UserSettingsLayout/Subscription/Subscription";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default async function SubscriptionPage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout userProfileDataOutlet={userProfileDataOutlet} />
      {/* userProfileDataOutlet={userProfileDataOutlet} user={userData} */}
      <Subscription userProfileDataOutlet={userProfileDataOutlet} user={userData} />;
    </>
  );
}
