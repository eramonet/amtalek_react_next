"use client"
import CurrentPackage from "@/allPages/UserSettingsLayout/CurrentPackage/CurrentPackage";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default function CurrentPackagePage({ params: { locale } }: any) {
  // const { userProfileDataOutlet, userData } :any= await useUserProfile(locale);
  return (
    <>
      <SettingsLayout  />
      {/* userProfileDataOutlet={userProfileDataOutlet} user={userData} */}
      <CurrentPackage  />;
    </>
  );
}
