import { TUser } from "@/Types/AppTypes";
import { useTranslation } from "react-i18next";
import { LiaUserEditSolid } from "react-icons/lia";
import { useOutletContext } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
// import { HelmetTags } from "@/Components/MainComponents";
import { CiMail } from "react-icons/ci";
import { MdLockOutline, MdOutlineLocalPhone } from "react-icons/md";
import { FaPeopleGroup, FaEarthAfrica } from "react-icons/fa6";
import { PiBagSimpleBold } from "react-icons/pi";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";

export function Component() {
  const { t } = useTranslation("SocialProfile");
  const [user, usertoken, isLoading, isFetching, refetch] = useOutletContext() as [
    TUser,
    string | null,
    boolean,
    boolean,
    () => void
  ];
  return (
    <div className="w-full flex flex-col gap-6 p-3 bg-white rounded">
      {/* <HelmetTags
        title={`${user?.first_name} | ${t("about.title")}`}
        description={t("about.title")}
      /> */}
      <h1 className="w-full bg-[#F8F8F8] px-10 text-md rounded">{t("about.title")}</h1>
      <p className="flex justify-center w-full break-words">
        User experience designer User experience designer User experience designer
      </p>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <LiaUserEditSolid color="#E74335" size={20} />{" "}
            <span className="text-[#6C6C6C] text-md">{t("about.name")}</span>{" "}
            <span className="text-[#6C6C6C]">|</span>{" "}
            <span className="text-xl">
              {user?.first_name} {user?.last_name}
            </span>
          </div>
          <div className="flex gap- items-center">
            <FaEarthAfrica size={20} />
            <HiOutlineDotsVertical />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-[14px] items-center">
            <CiMail color="#E74335" size={20} />{" "}
            <span className="text-[#6C6C6C] text-md">{t("about.email")}</span>{" "}
            <span className="text-[#6C6C6C]">|</span> <span className="text-xl">{user?.email}</span>
          </div>
          <div className="flex gap- items-center">
            <MdLockOutline size={20} />
            <HiOutlineDotsVertical />
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <MdOutlineLocalPhone color="#E74335" size={20} />{" "}
            <span className="text-[#6C6C6C] text-md">{t("about.phone")}</span>{" "}
            <span className="text-[#6C6C6C]">|</span> <span className="text-xl">{user?.phone}</span>
          </div>
          <div className="flex gap- items-center">
            <FaPeopleGroup size={20} />
            <HiOutlineDotsVertical />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <PiBagSimpleBold color="#E74335" size={20} />{" "}
            <span className="text-[#6C6C6C] text-md">{t("about.job")}</span>{" "}
            <span className="text-[#6C6C6C]">|</span>
            <span className="text-xl">{user?.email}</span>
          </div>
          <div className="flex gap- items-center">
            <FaPeopleGroup size={20} />
            <HiOutlineDotsVertical />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <CiLocationOn color="#E74335" size={20} />{" "}
            <span className="text-[#6C6C6C] text-md">{t("about.live")}</span>{" "}
            <span className="text-[#6C6C6C]">|</span>
            <span className="text-xl">{user?.country}</span>
          </div>
          <div className="flex gap- items-center">
            <FaPeopleGroup size={20} />
            <HiOutlineDotsVertical />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <CiCalendarDate color="#E74335" size={20} />{" "}
            <span className="text-[#6C6C6C] text-md">{t("about.dob")}</span>{" "}
            <span className="text-[#6C6C6C]">|</span> <span className="text-xl">{user?.email}</span>
          </div>
          <div className="flex gap- items-center">
            <MdLockOutline size={20} />
            <HiOutlineDotsVertical />
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-[#6C6C6C] border-b px-2">{t("about.website")}</h2>
          <div className=" flex gap-2 px-3">
            <TbWorld color="#E74335" size={20} /> <span>wwwww..wwwww</span>
          </div>
        </div>
      </div>
    </div>
  );
}
