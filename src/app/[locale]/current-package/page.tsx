import CurrentPackage from "@/allPages/UserSettingsLayout/CurrentPackage/CurrentPackage";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default async function CurrentPackagePage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout userProfileDataOutlet={userProfileDataOutlet} />
      {/* userProfileDataOutlet={userProfileDataOutlet} user={userData} */}
      <CurrentPackage userProfileDataOutlet={userProfileDataOutlet} />;
    </>
  );
}
