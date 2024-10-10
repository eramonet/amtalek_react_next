/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { setUserProfileData, userData } from "@/Store/Features/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Navbar";
import cover from "/assets/images/cover.png";
import { FiEdit } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { usePostData, useFetchData } from "@/Hooks/useAxios";
import userImg from "/assets/images/userImgNotLogin.png";
import { MdVerified } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { CiSquarePlus } from "react-icons/ci";
import { LuPencilLine } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import RightAside from "../RightAside";
import { TUser } from "@/Types/AppTypes";
import ProfileLeftAside from "./Components/ProfileLeftAside";
import Image from "next/image";

export function SocilProfile() {
  const { t } = useTranslation("SocialProfile");
  const [toolTip, setToolTip] = useState<boolean>(false);
  const user = useSelector(userData);
  const usertoken = localStorage.getItem("userData");
  const dispatch = useDispatch();
  const ShowTooltip = useCallback(() => {
    setTimeout(() => setToolTip(true), 200);
  }, [setToolTip]);
  const HideTooltip = useCallback(() => {
    setToolTip(false);
  }, [setToolTip]);

  const { data, isLoading, refetch, isFetching, isSuccess } = useFetchData(
    "userDataSocialProfile",
    `${process.env.NEXT_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    usertoken === null ? false : true,
    true
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserProfileData(data));
    }
  }, [data]);
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
  return (
    <section className="w-full flex flex-col gap-6 bg-[#e0e0e0] min-h-screen items-center">
      <Navbar />

      <div className="w-[90%] flex flex-col mt-24 h-[508px] bg-white rounded-xl">
        <Image width={1000} height={1000} src={cover} className="h-[311px] rounded-xl" alt={""} />
        <div className="flex flex-col w-full flex-1 relative">
          <div className="absolute -top-1/2 left-14 h-[150px] w-[150px] rounded-full border border-[#01425A]">
            <Image
              width={1000}
              height={1000}
              src={data?.image !== "" ? data?.image : userImg}
              alt="user"
              className="w-full h-full rounded-full p-1 "
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
              className="!absolute w-fit bottom-1/4 -right-2  bg-[#01425A] text-white  rounded-xl p-1 cursor-pointer"
            >
              <FiEdit size={14} />
            </label>
          </div>
          <div className="w-[80%] self-end flex  p-4 mt-10 justify-between">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="text-[#005879] font-[400] text-2xl">{data?.first_name}</span>
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
              <div className="w-full items-center flex relative gap-10">
                <span className="absolute left-1/2 -translate-y-1/2 top-1/2 translate-x-1/2">
                  |
                </span>
                <div className="flex gap-2">
                  <span>Followers</span>
                  <span>123</span>
                </div>
                <div className="flex gap-2">
                  <span>Friends</span>
                  <span>123</span>
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <button className="bg-[var(--primary-color)] text-white rounded p-3 flex items-center gap-3">
                {t("buttons.story")}
                <CiSquarePlus size={25} />
              </button>
              <button className="bg-[var(--secondary-color)] text-[#6C6C6C] rounded p-3 flex items-center gap-3">
                {t("buttons.edit")}
                <LuPencilLine size={25} />
              </button>
            </div>
          </div>
          <div className="w-full justify-center items-center flex flex-1 border-t gap-3 text-xl">
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "var(--primary-color)" : "#6C6C6C",
              })}
              className={"text-xl"}
              end
              to=""
            >
              {t("header.posts")}
            </NavLink>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "var(--primary-color)" : "#6C6C6C",
              })}
              end
              className={"text-xl"}
              to="about"
            >
              {t("header.about")}
            </NavLink>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "var(--primary-color)" : "#6C6C6C",
              })}
              className={"text-xl"}
              end
              to="groups"
            >
              {t("header.groups")}
            </NavLink>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "var(--primary-color)" : "#6C6C6C",
              })}
              className={"text-xl"}
              to="friends"
            >
              {t("header.friends")}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-[90%] grid grid-cols-4 gap-4">
        <ProfileLeftAside t={t} />
        <div className="col-span-2">
          <Outlet context={[data]} />
        </div>
        <RightAside user={data as TUser} />
      </div>
    </section>
  );
}
