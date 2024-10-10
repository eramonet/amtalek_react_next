import { LuPenLine } from "react-icons/lu";
import { FaEarthAfrica } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { CiVideoOn } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import PopOverIcons from "../../PopOverIcons";
import WritePostModal from "./WritePostModal";
import { useSelector } from "react-redux";
import { userProfileData } from "../../../../Store/Features/AuthenticationSlice";
import userImg from "/assets/images/userImgNotLogin.png";
import Image from "next/image";

function WritePostComponent() {
  const { t } = useTranslation("Social_Home");
  const user = useSelector(userProfileData);

  return (
    <div className="w-full bg-white rounded-xl p-5 flex flex-col gap-5 WritingPostComponent">
      <div className="w-full flex gap-6 items-center border-[1px] border-[#EAEAEA] rounded-xl p-4">
        <Image
          width={1000}
          height={1000}
          src={user?.image ? user?.image : userImg}
          className="w-[40px] h-[40px] rounded-full"
          alt={""}
        />
        <LuPenLine size={23} color="#01425A" />
        <WritePostModal />

        <PopOverIcons
          forUser={false}
          icon={<FaEarthAfrica color="#D3D3D3" size={18} />}
          contentInvolved={{
            type: "select",
            options: [
              t("writePostPrivacy.public"),
              t("writePostPrivacy.friends"),
              t("writePostPrivacy.onlyMe"),
            ],
          }}
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="gap-10 flex">
          <span className="flex items-center gap-1 text-[14px] font-[400]">
            <CiVideoOn size={24} color="#F24E1E" /> {t("video")}
          </span>
          <span className="flex items-center gap-1 text-[14px] font-[400]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#e74335"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
              <path
                d="M8 16L21 16"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 16L16 3"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 21L8 10"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 10L9 3"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 15L12 6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {t("photo")}
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <PopOverIcons
            forUser={false}
            icon={<CiCirclePlus color="#E74335" size={28} />}
            contentInvolved={{
              type: "addProperty",
              options: [t("addProperty.title"), t("addProperty.property")],
              projectBtn: t("addProperty.project"),
              propertyBtn: t("addProperty.property"),
              title: t("addProperty.title"),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WritePostComponent;
