"use client"
import Messages from "@/allPages/UserSettingsLayout/Messages/Messages";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default function MessagesPage({ params: { locale } }: any) {
  // const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  // userProfileDataOutlet={userProfileDataOutlet} user={userData}
  return (
    <>
      <SettingsLayout />
      <Messages locale={locale}  />;
    </>
  );
}
