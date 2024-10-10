"use client";
import { Badge, Dropdown } from "antd";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import LangLink from "@/components/LangLink";
import favIconSrc from "@/assets/images/fav-icon.png";
import ButtonNavbar from "./ButtonNavbar";
import NavDropDownMenu from "./NavDropDownMenu";
import { useTranslation } from "react-i18next";

export default function ServerImg({ userProfile, token, menu, userProfileDataOutlet, count }: any) {
  const { t } = useTranslation();

  // تحقق من وجود بيانات جديدة لتحديث المكون
  const isUserLoggedIn = token && userProfile?.data?.actor_type === "user";

  return (
    <div className="nav__CTAs flex items-center gap-10 ss:ltr:gap-3 ss:rtl:gap-2">
      {isUserLoggedIn && (
        <span>
          <Dropdown trigger={["click"]} overlay={menu} placement="bottom">
            <Badge
              showZero
              classNames={{ indicator: "!text-[14px] rtl:!left-2 !rounded-full !px-1" }}
              className="cursor-pointer !text-[11px]"
              size="default"
              count={count}
            >
              <FontAwesomeIcon icon={faBell} className="text-secondary text-2xl ss:text-[20px]" />
            </Badge>
          </Dropdown>
        </span>
      )}

      <ButtonNavbar />
      {token ? (
        <NavDropDownMenu
          user={userProfileDataOutlet}
          userProfile={userProfileDataOutlet}
          ForRealEstate={true}
        />
      ) : (
        <div className="sigin__wrapper group relative">
          <Dropdown
            overlay={
              <div className={`signin__menu w-72 h-96`}>
                <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md round">
                  <Image
                    width={100}
                    height={100}
                    className="w-14 aspect-square"
                    src={favIconSrc}
                    alt="fav-icon"
                  />
                  <h3 className="text-2xl font-medium text-center">
                    {t("Navbar.Login_drop_down_menu.heading")}
                  </h3>
                  <p className="opacity-70">{t("Navbar.Login_drop_down_menu.sub_heading")}</p>
                  <LangLink
                    to="/login"
                    className="w-full round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3"
                  >
                    {t("Navbar.Login_drop_down_menu.Login_btn_txt")}
                  </LangLink>
                  <LangLink
                    to="/register"
                    className="w-full round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out hover:bg-secondary hover:text-bg text-secondary text-lg"
                  >
                    {t("Navbar.Login_drop_down_menu.Register_btn_txt")}
                  </LangLink>
                </div>
              </div>
            }
            trigger={["click"]}
          >
            <button className="round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary border-2 border-secondary">
              <FontAwesomeIcon className="font-light text-2xl" icon={faCircleUser} />
              <FontAwesomeIcon className="text-[0.9rem]" icon={faChevronDown} />
            </button>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
