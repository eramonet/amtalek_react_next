"use client";
import Favorites from "@/allPages/UserSettingsLayout/Favorites/Favorites";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default function FavoritesPage({ params: { locale } }: any) {
  // const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout />
      <Favorites />
    </>
  );
}
