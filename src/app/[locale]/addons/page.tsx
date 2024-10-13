import Addons from "@/allPages/UserSettingsLayout/Addons/Addons";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default async function AddonsPage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout userProfileDataOutlet={userProfileDataOutlet} />
      <Addons user={userData} />
    </>
  );
}
