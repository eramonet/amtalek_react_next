import Addons from "@/allPages/UserSettingsLayout/Addons/Addons";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default async function AddonsPage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return <Addons user={userData} />;
}
