import MyProperties from "@/allPages/UserSettingsLayout/MyProperties/MyProperties";
import SettingsLayout from "@/allPages/UserSettingsLayout/SettingsLayout";
import useUserProfile from "@/api/useUserProfile";
import initTranslations from "@/app/i18n";

export default async function MyPropertiesPage({ params: { locale } }: any) {
  const i18nNamespaces = [
    "Pages_MyProperties",
    "Pages_LandingPage",
    "LayoutComponents",
    "SettingsLayout",
    "Pages_MyProperties",
    "Pages_PropertyDetails",
    "Pages_AllProperties",
  ];

  const { t, i18n } = await initTranslations(locale, i18nNamespaces);
  const { userProfileDataOutlet, userData }: any = await useUserProfile(locale);
  return (
    <>
      <SettingsLayout userProfileDataOutlet={userProfileDataOutlet} />
      <MyProperties locale={locale} t={t} i18n={i18n} />
    </>
  );
}
