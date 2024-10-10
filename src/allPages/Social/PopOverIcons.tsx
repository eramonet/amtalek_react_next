import { Popover, Space } from "antd";
import { useTranslation } from "react-i18next";
import { TbLogout, TbLogout2 } from "react-icons/tb";
import { FaEarthAfrica } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { CiLock, CiHome } from "react-icons/ci";
import { useState } from "react";
import AddPropertyImg from "/assets/images/AddPropertyImg.png";
import { BsBuildings } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useHandleLogOut } from "../../Utilities";
import Image from "next/image";

function PopOverIcons({ data, forUser, icon, number, contentInvolved }: any) {
  const { t, i18n } = useTranslation("Social_Navbar");
  const [privacy, setPrivacy] = useState(i18n.language === "en" ? "Public" : "عام");

  const [logOut] = useHandleLogOut();

  const [PrivacySend, setPrivacySend] = useState("Public");
  function handlePrivacyToAPI(option: any, index: number) {
    setPrivacy(option);
    index === 0
      ? setPrivacySend("Public")
      : index === 1
      ? setPrivacySend("Friends")
      : setPrivacySend("Only me");
  }
  const content = (
    <>
      {forUser === true ? (
        <div className="w-[225px] flex flex-col gap-3">
          <div className="w-full flex gap-2 items-center text-[#01425A] text-[14px] font-[400]">
            <Image
              width={300}
              height={300}
              src={data?.data?.user_image}
              alt="fdfdsdfsfds"
              className="w-[32px] h-[32px] rounded-full"
            />
            <div className="w-full flex gap-1">
              <span>{data?.data?.first_name}</span>
              <span>{data?.data?.last_name}</span>
            </div>
          </div>
          <button
            onClick={() => logOut()}
            className="w-full flex gap-2 items-center text-[#E50B0B] text-[14px] font-[400]"
          >
            {i18n.language === "en" ? <TbLogout /> : <TbLogout2 />} {t("logout")}
          </button>
        </div>
      ) : contentInvolved && contentInvolved.type === "select" ? (
        <form className="w-[166px] flex flex-col gap-2 OuterPrivacySelectBox">
          {contentInvolved.options.map((option: any, index: number) => {
            return (
              <div
                key={option}
                className="w-full flex items-center justify-between p-2 outerselectPrivacy"
              >
                {index === 0 ? (
                  <FaEarthAfrica color="#D3D3D3" />
                ) : index === 1 ? (
                  <FaUserFriends color="#D3D3D3" />
                ) : (
                  <span>
                    <CiLock color="#D3D3D3" />
                  </span>
                )}
                <div className="w-3/4  flex justify-between">
                  <input
                    value={privacy}
                    onChange={() => handlePrivacyToAPI(option, index)}
                    name="privacy"
                    id={option}
                    type="radio"
                    checked={privacy === option}
                    className=""
                  />
                  <label
                    htmlFor={option}
                    className="w-full cursor-pointer text-[12px] font-[400] text-[#6C6C6C]"
                  >
                    {option}
                  </label>
                </div>
              </div>
            );
          })}
        </form>
      ) : contentInvolved && contentInvolved.type === "addProperty" ? (
        // w-[342px]
        <div className="w-full flex flex-col gap-3 items-center ">
          <Image
            width={300}
            height={300}
            alt="mirefre"
            src={AddPropertyImg}
            className="w-[255px] h-[162px]"
          />
          <span className="text-[16px] font-[400] tet-[#01425A]">{contentInvolved.title}</span>
          <Link
            to={`/add-project`}
            className="bg-[#01425A] flex gap-2 text-white items-center text-[16px] font-[400] rounded px-4 py-2 hover:text-white"
          >
            <CiHome size={20} />
            <span>{contentInvolved.projectBtn}</span>
          </Link>
          <Link
            to={`/add-property`}
            className="bg-[#E74335] flex gap-2 text-white items-center text-[16px] font-[400] rounded px-3 py-2 hover:text-white"
          >
            <BsBuildings size={20} />
            <span>{contentInvolved.propertyBtn}</span>
          </Link>{" "}
        </div>
      ) : null}
    </>
  );
  return (
    <Space className="w-[32px]" wrap>
      {forUser ? (
        <Popover
          placement="bottom"
          motion={{ motionName: "fade" }}
          arrow={false}
          content={content}
          trigger="click"
        >
          <Image
            width={300}
            height={300}
            className="w-[32px] h-[32px] rounded-full cursor-pointer"
            src={data?.data?.user_image}
            alt="profile"
          />
        </Popover>
      ) : (
        <Popover
          placement="bottom"
          motion={{ motionName: "fade" }}
          arrow={false}
          content={content}
          trigger="click"
        >
          <div className="relative cursor-pointer">
            {icon}
            {number && (
              <span className="absolute text-[9px] -right-0 -top-1 text-white bg-[#E74335] rounded-full w-[16px] h-[16px] flex justify-center items-center border border-white">
                {number}
              </span>
            )}
          </div>
        </Popover>
      )}
    </Space>
  );
}

export default PopOverIcons;
