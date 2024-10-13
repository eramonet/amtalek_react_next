// lib/userData.ts
import initTranslations from "@/app/i18n";
// import { cookies } from "next/headers";

export const getUserDataAndProfile = async (locale:any, cookies:any) => {
  const i18nNamespaces = ["SettingsLayout"];
  const { i18n } = await initTranslations(locale, i18nNamespaces);
  const cookieStore = cookies();

  const userDatacookies = cookieStore.get("userData");
  const token = cookieStore.get("token");

  const userDataValue: any = userDatacookies ? userDatacookies.value : null;
  const tokenValue: any = token ? token.value : null;

  // تحويل بيانات المستخدم من JSON
  const userData: any = JSON.parse(userDataValue || "{}");
  const tokenValueJs: any = tokenValue;

  // دالة لجلب ملف المستخدم
  const fetchUserProfile = async (token: any, language: any) => {
    if (!token || !language) return null;
    try {
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${userData?.actor_type}/${userData?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": language,
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const dataProfile = await response.json();
      return dataProfile?.data;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return null;
    }
  };

  // جلب بيانات ملف المستخدم
  const userProfileDataOutlet = await fetchUserProfile(tokenValueJs, i18n.language);

  // إرجاع userData بالإضافة إلى البيانات الأخرى
  return { userProfileDataOutlet, userData, i18n };
};
