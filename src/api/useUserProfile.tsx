import initTranslations from "@/app/i18n";
import { cookies } from "next/headers";

export default async function useUserProfile({ locale }: any) {
  const i18nNamespaces = ["SettingsLayout"];
  const { i18n } = await initTranslations(locale, i18nNamespaces);
  const cookieStore = cookies();

  const userDatacookies = cookieStore.get("userData");
  const token = cookieStore.get("token");

  const userDataValue: any = userDatacookies ? userDatacookies.value : null;
  const tokenValue: any = token ? token.value : null;

  const userData: any = JSON.parse(userDataValue);
  const tokenValueJs: any = tokenValue;

  // const userProfileDataOutlet = useUserProfile();
  const userProfileDataOutletActor = userData?.data;

  const response = await fetch(
    `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${userProfileDataOutletActor?.actor_type}/${userProfileDataOutletActor?.id}`,
    {
      method: "GET",

      headers: {
        lang: i18n.language, //
        Authorization: `Bearer ${tokenValueJs}`,
      },
    }
  );

  // if (!response.ok) {
  //   throw new Error("Network response was not ok");
  // }

  const dataProfile = await response.json();
  const userProfileDataOutlet = dataProfile?.data;

  return { userProfileDataOutlet, userData }; // Return the fetched data
}
