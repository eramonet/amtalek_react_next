import Profile from "@/allPages/Profile/Profile";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";

export default async function ProfilePage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout userProfileDataOutlet={userProfileDataOutlet} />
      <Profile userProfileDataOutlet={userProfileDataOutlet} user={userData} />
    </>
  );
}
