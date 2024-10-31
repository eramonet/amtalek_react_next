import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiClock2 } from "react-icons/ci";
import logoImg from "@/assets/images/navEnLogo.png";
import arlogoImg from "@/assets/images/navArLogo.png";
import Image from "next/image.js";
import LangLink from "@/components/LangLink";
import Link from "next/link";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import initTranslations from "@/app/i18n";
import ServerImg from "./ServerImg";
import { faChevronDown, faCircleUser, faBell } from "@fortawesome/free-solid-svg-icons";
import favIconSrc from "@/assets/images/fav-icon.png";
import NavDropDownMenu from "./NavDropDownMenu";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import ButtonNavbar from "./ButtonNavbar";
import { Tooltip } from "@/components/ui/tooltip";
import { TbSocial } from "react-icons/tb";
import { Dropdown, Badge, Menu } from "antd";
import { setShowLoginPopUp } from "@/Store/Features/AuthenticationSlice";
// import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
const NavbarHeader = async function NavbarHeader({ locale }: any) {
  const i18nNamespaces = ["LayoutComponents"];
  const { t, i18n } = await initTranslations(locale, i18nNamespaces);

  const cookieStore = cookies();
  const userCookie = cookieStore.get("userData")?.value;

  let userData: any = {};
  if (userCookie) {
    try {
      userData = JSON.parse(userCookie);
    } catch (error) {
      console.error("Error parsing user cookie data: ", error);
    }
  }

  const userProfile = userData?.data;
  const token = userData?.token;

  const fetchUserProfile = async (token: any, language: any) => {
    if (!token || !language) return;
    try {
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${userProfile?.actor_type}/${userProfile?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            lang: language,
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const dataProfile = await response.json();
      return dataProfile?.data;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return [];
    }
  };

  const fetchNotifications = async (token: any) => {
    if (!token) return { notifications: [], unseen_counter: 0 };
    try {
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/my-notifications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data?.data || { notifications: [], unseen_counter: 0 };
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      return { notifications: [], unseen_counter: 0 };
    }
  };

  const userProfileDataOutlet = await fetchUserProfile(token, i18n.language);

  // cookieStore.set("userData", JSON.stringify(userProfileDataOutlet));
  // cookieStore.set("userProfileDataOutlet", JSON.stringify(userProfileDataOutlet), { expires: 1 });
  const { notifications, unseen_counter } = await fetchNotifications(token);

  // const dispatch = useDispatch();
  const count = !token ? 0 : unseen_counter;

  const menuItems = notifications.length
    ? unseen_counter !== 0
      ? [
          {
            key: "0",
            label: (
              <span className="flex cursor-default hover:bg-none items-center  gap-2 bg-slate rounded p-1 absolute -top-8 left-1/2 -translate-x-1/2 font-medium text-lg w-full">
                {i18n.language?.startsWith("ar") ? "اخر الاشعارات" : "Latest Notifications"}
              </span>
            ),
          },
          ...notifications.map((item: any) => ({
            key: item?.id,
            label: (
              <Link
                href={``}
                className={`w-full flex items-center p-1 gap-5 rounded ${
                  item?.seen_status === "no" ? "bg-gray-100" : ""
                }`}
              >
                <Image
                  width={100}
                  height={100}
                  src={
                    item?.sender_data?.image === ""
                      ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      : item?.sender_data?.image
                  }
                  className="w-12 h-12 rounded-full"
                  alt="Profile"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <h2 className="font-semibold text-slate-600">{item?.title}</h2>
                  <span className="text-slate-500">{item?.description}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <CiClock2 /> {item?.time}
                  </span>
                </div>
              </Link>
            ),
          })),
          {
            key: "1543",
            className: "!sticky bg-white bottom-[-4px] hover:!bg-white",
            label: (
              <Link
                href="/notifications"
                className=" flex items-center justify-center !text-white border border-primary hover:bg-white mx-auto hover:!text-primary p-1 gap-5 rounded bg-primary w-[90%]"
              >
                {i18n.language?.startsWith("ar")
                  ? "اظهار جميع الاشعارات"
                  : "Show all Notifications"}
              </Link>
            ),
          },
        ]
      : [
          {
            key: "0",
            label: (
              <div className="!w-full !h-[230px] flex justify-center items-center bg-slate-100 rounded flex-col gap-7 cursor-default">
                <span className="bell fa fa-bell">
                  <FontAwesomeIcon className={`text-6xl`} icon={faBell} />
                </span>
                <p>{i18n.language?.startsWith("ar") ? "لا توجد اشعارات" : "No Notifications"}</p>
                <Link
                  href="/notifications"
                  className=" flex items-center justify-center text-white border border-primary hover:bg-transparent hover:text-primary p-1 gap-5 rounded bg-primary w-[90%] "
                >
                  {i18n.language?.startsWith("ar")
                    ? "اظهار جميع الاشعارات"
                    : "Show all Notifications"}
                </Link>
              </div>
            ),
          },
        ]
    : undefined;

  const menu = <Menu className="h-96 overflow-auto" items={menuItems} />;

  return (
    <header className="w-full h-[88px] bg-bg z-40 relative">
      <nav className="h-[88px] flex justify-between items-center bg-bg relative z-50">
        <LangLink to="/" className="logo w-36 max-w-[144px] min-w-[144px]">
          <Image
            height={757}
            width={2928}
            // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            src={i18n.language?.startsWith("ar") ? arlogoImg : logoImg}
            alt="Amtalek"
            className="h-full w-full cursor-pointer"
          />
        </LangLink>

        <Navbar />
        {/* <ServerImg
          userProfileDataOutlet={userProfileDataOutlet}
          menu={menu}
          token={token}
          userProfile={userProfile}
          count={count}
        /> */}
        <div className="nav__CTAs flex items-center gap-10 ss:ltr:gap-3 ss:rtl:gap-2">
          {userProfile?.actor_type === "user" && (
            <span>
              <Dropdown trigger={token ? ["click"] : []} overlay={menu} placement="bottom">
                <Badge
                  showZero
                  classNames={{ indicator: "!text-[14px] rtl:!left-2 !rounded-full !px-1" }}
                  className="cursor-pointer !text-[11px]"
                  size="default"
                  count={count}
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-secondary text-2xl ss:text-[20px]"
                  />
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
            <div className="sigin__wrapper group relative ">
              <Dropdown
                overlay={
                  <div className={`signin__menu  w-72 h-96 `}>
                    <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md round ">
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
                        className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3"
                      >
                        {t("Navbar.Login_drop_down_menu.Login_btn_txt")}
                      </LangLink>
                      <LangLink
                        to="/register"
                        className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out  hover:bg-secondary hover:text-bg text-secondary text-lg"
                      >
                        {t("Navbar.Login_drop_down_menu.Register_btn_txt")}
                      </LangLink>
                    </div>
                  </div>
                }
                trigger={["click"]}
              >
                <div>
                  {/* <span className="flex items-center cursor-pointer group">
                    <span className="text-secondary text-2xl ss:text-[20px]">
                      <FontAwesomeIcon icon={faCircleUser} />
                    </span>
                  </span> */}
                  <button className="round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary border-2 border-secondary ">
                    <FontAwesomeIcon className="font-light text-2xl " icon={faCircleUser} />
                    <FontAwesomeIcon className=" text-[0.9rem]" icon={faChevronDown} />
                  </button>
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarHeader;
