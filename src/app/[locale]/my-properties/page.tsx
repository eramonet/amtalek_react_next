import MyProperties from "@/allPages/UserSettingsLayout/MyProperties/MyProperties";
import initTranslations from "@/app/i18n";

export default async function MyPropertiesPage({ params: { locale } }: any) {
  const i18nNamespaces = [
    "Pages_LandingPage",
    "SettingsLayout",
    "Pages_MyProperties",
    "Pages_PropertyDetails",
    "Pages_AllProperties",
  ];

  const { t, i18n } = await initTranslations(locale, i18nNamespaces);
  return <MyProperties locale={locale} t={t} i18n={i18n} />;
}