"use client"
import Notifications from "@/allPages/UserSettingsLayout/Notifications/Notifications";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
// import useUserProfile from "@/api/useUserProfile";

export default function NotificationsPage({ params: { locale } }: any) {
  // const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      {/*  */}
      <SettingsLayout  />
      {/*  notifications={notifications} */}
      <Notifications  />
    </>
  );
}
