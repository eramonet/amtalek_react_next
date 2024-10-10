import { useTranslation } from "react-i18next";
// import { HelmetTags } from "../../../Components/MainComponents";
import { useOutletContext } from "react-router-dom";
import { TUser } from "@/Types/AppTypes";
import ChangePasswordProfile from "./Profile/Components/ChangePasswordProfile";
import AboutSocialSettings from "./Profile/Components/AboutSocialSettings";
import ProfileSocialSetting from "./Profile/Components/ProfileSocialSetting";

export function Component() {
  const { t } = useTranslation("Social_Settings");
  const [user] = useOutletContext() as [TUser];
  return (
    <section className="col-span-2 flex flex-col self-start gap-4 ">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}

      <ProfileSocialSetting user={user} />
      <ChangePasswordProfile />
      <AboutSocialSettings />
    </section>
  );
}
