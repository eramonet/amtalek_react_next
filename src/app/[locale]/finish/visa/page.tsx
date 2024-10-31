"use client"
import Finished from "@/allPages/Packages/Finished";
import useUserProfile from "@/api/useUserProfile";

export default function FinishPage({ params: { locale } }: any) {
  // const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  // userProfileDataOutlet={userProfileDataOutlet}
  return <Finished />;
}
