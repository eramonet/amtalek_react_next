"use client"
import MyOffers from "@/allPages/UserSettingsLayout/MyOffers/MyOffers";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default async function MyOffersPage({ params: { locale } }: any) {
  // const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  // console.log(userProfileDataOutlet);
// userProfileDataOutlet={userProfileDataOutlet}
  return (
    <>
      <SettingsLayout  />
      <MyOffers  />
    </>
  );
}
