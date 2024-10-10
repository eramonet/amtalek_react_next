import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "/assets/images/en logo 1.png";
import { useTranslation } from "react-i18next";
import { BsSearch } from "react-icons/bs";
import { TfiHome } from "react-icons/tfi";
import { MdGroups } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
// import { LangLink, LogOutPopUp } from "../../Components/MainComponents";
import { CiBellOn } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import PopOverIcons from "./PopOverIcons";
import { useEffect } from "react";
import { userData, userProfileData } from "@/Store/Features/AuthenticationSlice";
import { useSelector } from "react-redux";
// import { NavDropDownMenu } from "../../Components/LayoutComponents";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import LogOutPopUp from "@/MainComponents/LogOutPopUp";
import LangLink from "@/components/LangLink";
import NavDropDownMenu from "@/components/header/components/NavDropDownMenu";

type Props = {
  isLoading?: boolean;
  isFetching?: boolean;
};
function Navbar({ isLoading, isFetching }: Props) {
  const location = useLocation();
  // const userProfile = useSelector(userProfileData);
  const usertoken = useSelector(userData);

  const data = {
    name: "Mohamed Ragab",
    img: "data:image/jpeg;base64,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",
  };
  const { t, i18n } = useTranslation("Social_Navbar");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <nav className="w-full grid grid-cols-12 items-center  bg-white px-[90px] py-2 fixed top-0 z-50 gap-5 h-[73px]">
      <Link className=" col-span-2" to={`/${i18n.language}/Amtalek`}>
        <Image
          width={300}
          height={300} src={logo} alt="logo" className=" h-[40px]" />
      </Link>
      {usertoken && (
        <div className="relative col-span-4">
          <input
            placeholder={t("inputPlaceholder")}
            className="w-full bg-[#F5F4F4] outline-none py-3 rounded-3xl ps-10 h-full text-[14px] font-[400]"
          />
          <BsSearch color="#D9D9D9" className="absolute top-1/2 -translate-y-1/2 left-4" />
        </div>
      )}
      <div className="flex gap-5 col-span-2 justify-center">
        <NavLink
          end
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#D7F4FF" : "#f2f2f2",
            color: isActive ? "var(--primary-color)" : "#6C6C6C",
          })}
          to={`/${i18n.language}/Amtalek`}
          className={`rounded-full flex items-center justify-center w-9 h-9`}
        >
          <TfiHome size={20} />
        </NavLink>

        <NavLink
          end
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#D7F4FF" : "#f2f2f2",
            color: isActive ? "var(--primary-color)" : "#6C6C6C",
          })}
          to={`/${i18n.language}/Amtalek/groups`}
          className={`rounded-full flex items-center justify-center w-9 h-9`}
        >
          <MdGroups size={22} />
        </NavLink>
        <NavLink
          end
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#D7F4FF" : "#f2f2f2",
            color: isActive ? "var(--primary-color)" : "#6C6C6C",
          })}
          to={`/${i18n.language}/Amtalek-Profile`}
          className={`rounded-full flex items-center justify-center w-9 h-9`}
        >
          <FaRegCircleUser size={20} />
        </NavLink>
      </div>
      <div className="nav__CTAs flex items-center  justify-center gap-5  me-5 col-span-2">
        <LangLink
          to=""
          className="market__btn   round  h-10  flex justify-center items-center gap-2 px-2 sm:px-3 py-[6px] bg-red500 transition-all duration-300 ease-in-out  hover:bg-transparent hover:text-red500 text-bg text-lg border-2 border-red500"
        >
          <FontAwesomeIcon className=" text-lg" icon={faStore} />
          <span className="sm:hidden ">{t("marketBtn")}</span>
        </LangLink>
      </div>

      {usertoken ? (
        <div className="flex gap-8 items-center col-span-2">
          <PopOverIcons
            data={data}
            forUser={false}
            icon={<CiBellOn color="#01425A" size={23} />}
            number={12}
          />
          <PopOverIcons
            data={data}
            forUser={false}
            icon={<FaRegCommentDots color="#01425A" size={20} />}
            number={12}
          />
          <NavDropDownMenu />

          <LogOutPopUp  />
        </div>
      ) : (isLoading && usertoken) || isFetching ? (
        <div className="flex ms-auto gap-8 items-center">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      ) : (
        <div className="flex flex-auto gap-3 col-span-6 ms-aut justify-end">
          <Link
            className="border w-1/4 col-span-5 flex items-center justify-center p-3 rounded-xl"
            to={`/${i18n.language}/register`}
          >
            {t("signup")}
          </Link>
          <Link
            className="bg-[#01425A] w-1/4 text-white col-span-2 flex items-center justify-center p-1 rounded-xl"
            to={`/${i18n.language}/login`}
          >
            {t("login")}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
