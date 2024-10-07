import Notifications from "@/allPages/UserSettingsLayout/Notifications/Notifications";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";

export default function NotificationsPage({ params: { notifications } }: any) {
  return (
    <>
      <SettingsLayout />
      {/*  notifications={notifications} */}
      <Notifications />
    </>
  );
}
