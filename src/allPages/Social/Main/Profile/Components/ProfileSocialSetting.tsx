import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faUserEdit,
  faEnvelope,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { TUser } from "@/Types/AppTypes";
type Props = {
  user: TUser;
};
function ProfileSocialSetting({ user }: Props) {
  const { t } = useTranslation("Social_Settings");

  return (
    <div className="flex w-full bg-white flex-col gap-5 self-start px-4 py-8 rounded-xl">
      <div className="w-full flex justify-between items-center px-10 py-[10px] rounded bg-[#F8F8F8] text-[var(--primary-color)]">
        <span className="text-[16px]">{t("ProfileTitle")}</span>
        <button>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      <div className="w-full flex gap-2 items-center">
        <FontAwesomeIcon color="#F24E1E" icon={faUserEdit} />
        <span className=" text-[#6C6C6C] text-[16px]">
          {user?.first_name} {user?.last_name}
        </span>
      </div>
      <div className="w-full flex gap-2 items-center">
        <FontAwesomeIcon color="#F24E1E" icon={faEnvelope} />
        <span className=" text-[#6C6C6C] text-[16px]">{user?.email}</span>
      </div>
      <div className="w-full flex gap-2 items-center">
        <FontAwesomeIcon color="#F24E1E" icon={faPhone} />
        <span className=" text-[#6C6C6C] text-[16px]">{user?.phone}</span>
      </div>
      <div className="w-full flex gap-2 items-center">
        <FontAwesomeIcon color="#F24E1E" icon={faLock} />
        <span className=" text-[#6C6C6C] text-[16px]">{t("changePassword")}</span>
      </div>
    </div>
  );
}

export default ProfileSocialSetting;
