import Finished from "@/allPages/Packages/Finished";
import useUserProfile from "@/api/useUserProfile";

export default async function FinishPage({ params: { locale } }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return <Finished userProfileDataOutlet={userProfileDataOutlet} />;
}
