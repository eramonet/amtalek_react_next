import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faExclamationCircle,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

function AboutSocialSettings() {
  const { t } = useTranslation("Social_Settings");

  return (
    <div className="w-full flex flex-col gap-6 rounded-xl p-3 bg-white">
      <div className="w-full flex justify-between items-center px-10 py-[10px] rounded bg-[#F8F8F8] text-[var(--primary-color)]">
        <span className="text-[16px]">{t("AboutTitle")}</span>
        <button>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      <p className="w-full text-center text-[#6C6C6C] text-[12px]">
        User experience designer User experience designer User experience
        designer User
      </p>
      <div className="w-full flex gap-2 border-b pb-2 items-center">
        <FontAwesomeIcon color="#F24E1E" icon={faExclamationCircle} />
        <p className="text-[#6C6C6C] text-[16px]">{t("personalInfo")}</p>
      </div>
      <div className="w-full flex gap-2 items-center">
        <FontAwesomeIcon color="#F24E1E" icon={faBriefcase} />
        <p className="text-[#6C6C6C] text-[14px]">UI/UX Designer</p>
      </div>
      <div className="w-full flex gap-2 items-center">
        <FontAwesomeIcon color="#F24E1E" icon={faBriefcase} />
        <p className="text-[#6C6C6C] text-[14px]">UI/UX Designer</p>
      </div>
    </div>
  );
}

export default AboutSocialSettings;
