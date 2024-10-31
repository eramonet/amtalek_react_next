"use client";
import Profile from "@/allPages/Profile/Profile";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
// import { UserProfileClient } from "@/api/UserProfileClient";

export default function ProfilePage({ params: { locale } }: any) {
  // const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  // const { userProfileDataOutlet, user } = UserProfileClient();
  return (
    <>
      {/* userProfileDataOutlet={userProfileDataOutlet}  user={userData} */}
      <SettingsLayout />
      <Profile />
    </>
  );
}
