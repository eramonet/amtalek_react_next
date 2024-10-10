import { Select, Space, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import { useSelector } from "react-redux";
function ChangePasswordProfile() {
  const lng = useSelector(lang);

  const { i18n } = useTranslation("Social_Settings");
  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    window.location.replace(window.location.href.replace(lng, value));
  };
  return (
    <div className="w-full bg-white rounded-xl py-3 px-6 flex gap-2 items-center">
      <FontAwesomeIcon color="#F24E1E" icon={faLanguage} />
      <Select
        className="setting-change-language w-full flex flex-1"
        defaultValue={lng}
        onChange={handleChange}
        options={[
          { value: "en", label: "English" },
          { value: "ar", label: "العربيه" },
        ]}
      />
    </div>
  );
}

export default ChangePasswordProfile;
