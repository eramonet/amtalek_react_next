import Messages from "@/allPages/UserSettingsLayout/Messages/Messages";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default async function MessagesPage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout userProfileDataOutlet={userProfileDataOutlet} />
      <Messages locale={locale} userProfileDataOutlet={userProfileDataOutlet} user={userData} />;
    </>
  );
}
