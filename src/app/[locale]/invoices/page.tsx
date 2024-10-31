import { Invoices } from "@/allPages/UserSettingsLayout/Invoices/Invoices";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default async function InvoicesPage({ params: { locale } }: any) {
  // const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout  />
      {/* userProfileDataOutlet={userProfileDataOutlet} user={userData} */}
      <Invoices  />;
    </>
  );
}
