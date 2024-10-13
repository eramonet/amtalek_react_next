import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import { SubmitProperty } from "@/allPages/UserSettingsLayout/SubmitProperty/SubmitProperty";
import useUserProfile from "@/api/useUserProfile";

export default async function SubmitPropertyPage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout userProfileDataOutlet={userProfileDataOutlet} />
  <SubmitProperty />
  </>
    )
}
