import Notifications from "@/allPages/UserSettingsLayout/Notifications/Notifications";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";

export default async function NotificationsPage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout userProfileDataOutlet={userProfileDataOutlet} />
      {/*  notifications={notifications} */}
      <Notifications user={userData} />
    </>
  );
}
