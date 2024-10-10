import { MdVerified } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import { TfiHome } from "react-icons/tfi";
import { FiUser, FiUserCheck } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { FaRegBuilding, FaRegCommentDots } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import adsimg from "/assets/images/adsimg.png";
import logoads from "/assets/images/logoads.png";
import { useCallback, useEffect, useState } from "react";
import loginImg from "/assets/images/socialLogin.png";
import userlogin from "/assets/images/iconoir_profile-circle.png";
import userImg from "/assets/images/userImgNotLogin.png";
import { usePostData } from "@/Hooks/useAxios";
import { TUser } from "@/Types/AppTypes";
import NewsLeftAside from "../Components/NewsLeftAside";
import FriendRequestLeftAside from "./FriendRequestLeftAside";
import ChatLeftAside from "./ChatLeftAside";
import Image from "next/image";

type Props = {
  user: TUser;
  refetch: () => void;
};
function LeftAside({ user, refetch }: Props) {
  const [toolTip, setToolTip] = useState<boolean>(false);
  const { t, i18n } = useTranslation("Social_LeftAside");

  const ShowTooltip = useCallback(() => {
    setTimeout(() => setToolTip(true), 200);
  }, [setToolTip]);
  const HideTooltip = useCallback(() => {
    setToolTip(false);
  }, [setToolTip]);
  const {
    mutate: updateImg,
    isLoading: updateImgIsLoading,
    error: updateImgServerErrors,
  }: any = usePostData(
    true,
    () => {
      refetch();
    },
    false,
    (error: any) => {}
  );

  let [image, setImage] = useState<File | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (image) {
      updateImg({
        api: process.env.NEXT_PUBLIC_USER_PROFILE_UPDATE_IMG,
        data: {
          image: image,
          image_key: "main",
          created_from: "web",
        },
        file: true,
      });
    }
  }, [image, updateImg]);

  const FriendRequestpathnames = ["Amtalek", "groups", "add-property", "developers", "add-project"];

  return (
    <aside className="col-span-1 flex flex-col gap-6 pb-2 ">
      <div className=" flex flex-col py-3 bg-white rounded-xl gap-6 text-[#005879]">
        {user ? (
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col justify-center items-center gap-3">
              <div className="relative">
                <Image
                  width={1000}
                  height={1000}
                  src={user?.image !== "" ? user?.image : userImg}
                  alt="user"
                  className="w-[72px] h-[72px] rounded-full border p-1 border-[#01425A] "
                />
                <input
                  id="img"
                  type="file"
                  className="w-[72px] h-[72px] absolute top-0 z-30 left-0 opacity-0"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(file);
                    }
                  }}
                  accept="image/jpg, image/jpeg, image/png, image/webp"
                />

                <label
                  htmlFor="img"
                  className="!absolute w-fit bottom-0 right-0 bg-[#01425A] text-white  rounded-xl p-1 cursor-pointer"
                >
                  <FiEdit size={14} />
                </label>
              </div>
              <div className=" text-[18px] font-[400] text-[#005879] flex gap-2 items-center">
                <div className="w-full flex gap-1">
                  <span>{user?.first_name}</span>
                  <span>{user?.last_name}</span>
                </div>
                <div className="relative">
                  <MdVerified
                    onMouseLeave={HideTooltip}
                    onMouseEnter={ShowTooltip}
                    className=" text-[#E74335]"
                  />
                  <p
                    style={{ display: toolTip ? "block" : "none" }}
                    className="absolute -top-24 w-[290px] p-2 rounded-xl bg-white
                 text-black text-[14px] shadow-xl tooltip z-40"
                  >
                    Accounts with a verified badge have been authenticated and can be Amtalek
                    Verified subscribers or notable persons or brands.
                    <span className="triangle left-0 bottom-0 absolute"></span>
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[15px] font-[400]">{t("followers")}</span>
                  <span className="text-[16px] font-[400] text-center text-[#E74335]">132</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[15px] font-[400]">{t("friends")}</span>
                  <span className="text-[16px] font-[400] text-center text-[#E74335]">98</span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-6 ps-10">
              <NavLink
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#01425A" : "white",
                  color: isActive ? "white" : "#01425A",
                })}
                to={``}
                end
                className={`flex gap-5 items-center p-5 text-[#01425A] rounded-l-xl hover:!text-white transition-[300] hover:!bg-[#01425A] `}
              >
                <TfiHome size={24} className="" /> {t("home")}
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#01425A" : "white",
                  color: isActive ? "white" : "#01425A",
                })}
                to="friends"
                className="flex gap-5 items-center p-5  rounded-l-xl hover:!text-white transition-[300] hover:!bg-[#01425A] bg-white "
              >
                <FiUser size={24} className="" /> {t("friends")}
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#01425A" : "white",
                  color: isActive ? "white" : "#01425A",
                })}
                to="followers"
                className="flex gap-5 items-center p-5 text-[#01425A] rounded-l-xl hover:!text-white transition-[300] hover:!bg-[#01425A] bg-white "
              >
                <FiUserCheck size={24} className="" />
                {t("followers")}
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#01425A" : "white",
                  color: isActive ? "white" : "#01425A",
                })}
                to="groups"
                className="flex gap-5 items-center p-5 rounded-l-xl hover:!text-white transition-[300] hover:!bg-[#01425A]  "
              >
                <MdGroups size={24} className="" />
                {t("groups")}
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#01425A" : "white",
                  color: isActive ? "white" : "#01425A",
                })}
                to="developers"
                className="flex gap-5 items-center p-5 text-[#01425A] rounded-l-xl hover:!text-white transition-[300] hover:!bg-[#01425A] bg-white "
              >
                <div className="relative">
                  <FaRegBuilding size={24} className="" />
                  <FaUser size={24} className="absolute top-0 -right-4" />
                </div>
                {t("developer")} {i18n.language === "en" ? "/" : "\\"} {t("brokers")}{" "}
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#01425A" : "white",
                  color: isActive ? "white" : "#01425A",
                })}
                to="messages"
                className="flex gap-5 items-center p-5 rounded-l-xl hover:!text-white transition-[300] hover:!bg-[#01425A]  "
              >
                <div className="relative">
                  <FaRegCommentDots size={22} />
                  <span className="absolute text-[9px] -right-2 -top-1 text-white bg-[#E74335] rounded-full w-[16px] h-[16px] flex justify-center items-center border border-white">
                    12
                  </span>
                </div>
                {t("messages")}{" "}
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#01425A" : "white",
                  color: isActive ? "white" : "#01425A",
                })}
                to="notifications"
                className="flex gap-5 items-center p-5 rounded-l-xl hover:!text-white transition-[300] hover:!bg-[#01425A]  "
              >
                <div className="relative">
                  <CiBellOn size={28} />
                  <span className="absolute text-[9px] right-0 top-0 text-white bg-[#E74335] rounded-full w-[16px] h-[16px] flex justify-center items-center border border-white">
                    12
                  </span>
                </div>
                {t("notifications")}{" "}
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#01425A" : "white",
                  color: isActive ? "white" : "#01425A",
                })}
                to="settings"
                className="flex gap-5 items-center p-5 rounded-l-xl hover:!text-white transition-[300] hover:!bg-[#01425A] "
              >
                <CiSettings size={28} />
                {t("settings")}{" "}
              </NavLink>
              <Link to="" className="flex gap-5 p-5">
                <CiCirclePlus color="#E74335" size={24} /> {t("create")}
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3 items-center">
            <Image width={1000} height={1000} alt="432rew" src={loginImg} />
            <Image width={1000} height={1000} alt="890hji" src={userlogin} />

            <span className="text-[20px] font-[400] text-[#6C6C6C]">{t("welcome")}</span>
            <Link
              className="border w-1/2 flex items-center justify-center p-3 rounded-xl"
              to={`/${i18n.language}/register`}
            >
              {t("signup")}
            </Link>
            <Link
              className="bg-[#01425A] text-white w-1/2 flex items-center justify-center p-3 rounded-xl"
              to={`/${i18n.language}/login`}
            >
              {t("login")}
            </Link>
          </div>
        )}
      </div>
      {user && <ChatLeftAside />}
      <div className="w-full bg-white rounded-xl flex flex-col gap-2 items-center py-4">
        <span className="text-[#A4B2B8] text-[16px] font-[400]">{t("ads")}</span>
        <Image width={1000} height={1000} alt="ferfre" src={adsimg} className="w-[100%]" />
        <div className="flex justify-center items-center gap-6">
          <span className="text-[16px] font-[500]">سراي مدينة نصر</span>
          <Image width={1000} height={1000} alt="freferfre" src={logoads} />
        </div>
      </div>
      {user &&
        FriendRequestpathnames.includes(pathname.split("/")[pathname.split("/").length - 1]) && (
          <FriendRequestLeftAside />
        )}

      <NewsLeftAside />
    </aside>
  );
}

export default LeftAside;
