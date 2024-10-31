"use client";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import BurgerNavbar from "./BurgerNavbar";
import LangNavLink from "@/components/LangNavLink";
import LangLink from "@/components/LangLink";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import useSessionStorageState from "use-session-storage-state";

export default function Navbar({}: any) {
  const defaultFormData = {
    keyword: "",
    country: "1",
    city: "",
    region: "",
    sub_region: "",
    property_type: "",
    min_beds: "",
    min_bathes: "",
    purpose: "",
    min_area: "",
    max_area: "",
    min_price: "",
    max_price: "",
    finishing: "",
    currency: "",
    amenities: [] as any,
    price_arrange_keys: "" as any,
    priority_keys: "" as any,
    page: 1,
    fc: "",
    // srt: "",
  };
  const [formData, setFormData] = useSessionStorageState("formData", {
    defaultValue: defaultFormData,
  });

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  const { t, i18n } = useTranslation();
  // const router = useRouter();
  const pathname = usePathname();
  // const isActive = (path: any) => router.pathname === path;
  const isActive = (path: any) => pathname === path;
  return (
    <>
      <ul className="desktop__nav xll:hidden flex justify-between items-center text-secondary text-lg gap-9 xl:gap-7 ">
        <li>
          <LangNavLink
            className={`desktop__nav--item ${
              isActive(`/${i18n.language.startsWith("ar") ? "" : "en"}`) ? "active" : ""
            }`}
            homepage
            end
            to={`/`}
          >
            {t("Navbar.menu_items.Home")}
          </LangNavLink>
        </li>
        <li className="relative h-[88px] flex justify-center items-center group/grand cursor-pointer">
          <LangNavLink
            onClick={() => {
              window.sessionStorage.setItem("step", "1");
              setFormData(() => ({ ...defaultFormData, purpose: "" }));
            }}
            className={`desktop__nav--item group/parent h-fit flex justify-start items-center gap-2 ${
              isActive("/search") ? "active" : ""
            }`}
            to={`/search/عقارات`}
            // {`/search?k=&cr=${localStorage.getItem(
            //   "country"
            // )}&c=-1&r=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
          >
            {t("Navbar.menu_items.Find_Properties.title")}
            <FontAwesomeIcon
              className={`transition-all text-[0.9rem] duration-200 ease-in-out group-hover/grand:rotate-180`}
              icon={faChevronDown}
            />
          </LangNavLink>
          <div className="find__properties--sub--menu--1 shadow-md absolute left-0 rtl:left-auto rtl:right-0 bg-secondary text-white top-[88px] w-[215px] h-auto  opacity-0 pointer-events-none group-hover/grand:opacity-100 group-hover/grand:pointer-events-auto transition-all duration-300 ease-in-out">
            <div className="sub__menu--for--sale w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-bg hover:text-secondary transition-all duration-300 ease-in-out group/sale cursor-pointer relative">
              {t("Navbar.menu_items.Find_Properties.For_Sale.title")}
              <FontAwesomeIcon
                className={`text-[0.9rem] -rotate-90 rtl:rotate-90`}
                icon={faChevronDown}
              />
              <div className="for__sale--sub--menu shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/sale:opacity-100 group-hover/sale:pointer-events-auto">
                <LangLink
                  onClick={() => {
                    window.sessionStorage.setItem("step", "1");
                    setFormData(() => ({ ...defaultFormData, purpose: "1" }));
                  }}
                  to={`/search/عقارات`}
                  // {`/search?k=&cr=${localStorage.getItem(
                  //   "country"
                  // )}&c=-1&r=-1&sr=-1&t=&f=&pr=1&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
                  className={` w-full bg-secondary h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg`}
                >
                  {t("Navbar.menu_items.Find_Properties.For_Sale.Residential")}
                </LangLink>
                <LangLink
                  onClick={() => {
                    window.sessionStorage.setItem("step", "1");
                    setFormData(() => ({ ...defaultFormData, purpose: "2" }));
                  }}
                  to={`/search/عقارات`}
                  // {`/search?k=&cr=${localStorage.getItem(
                  //   "country"
                  // )}&c=-1&r=-1&sr=-1&t=&f=&pr=2&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
                  className=" w-full bg-secondary h-10 flex justify-between items-center px-2 hover:bg-bg transition-all duration-300 ease-in-out hover:text-secondary text-bg"
                >
                  {t("Navbar.menu_items.Find_Properties.For_Sale.Commercial")}
                </LangLink>
              </div>
            </div>

            <div className="sub__menu--for--rent w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-bg hover:text-secondary transition-all duration-300 ease-in-out group/rent cursor-pointer relative">
              {t("Navbar.menu_items.Find_Properties.For_Rent.title")}
              <FontAwesomeIcon
                className={`text-[0.9rem] -rotate-90 rtl:rotate-90`}
                icon={faChevronDown}
              />
              <div className="for__rent--sub--menu shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/rent:opacity-100 group-hover/rent:pointer-events-auto">
                <LangLink
                  onClick={() => {
                    window.sessionStorage.setItem("step", "1");
                    setFormData(() => ({ ...defaultFormData, purpose: "3" }));
                  }}
                  to={`/search/عقارات`}
                  // {`/search?k=&cr=${localStorage.getItem(
                  //   "country"
                  // )}&c=-1&r=-1&sr=-1&t=&f=&pr=3&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
                  className=" w-full bg-secondary h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg"
                >
                  {t("Navbar.menu_items.Find_Properties.For_Rent.Residential")}
                </LangLink>
                <LangLink
                  onClick={() => {
                    window.sessionStorage.setItem("step", "1");
                    setFormData(() => ({ ...defaultFormData, purpose: "4" }));
                  }}
                  to={`/search/عقارات`}
                  // {`/search?k=&cr=${localStorage.getItem(
                  //   "country"
                  // )}&c=-1&r=-1&sr=-1&t=&f=&pr=4&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
                  className=" w-full bg-secondary h-10 flex justify-between items-center px-2 hover:bg-bg transition-all duration-300 ease-in-out hover:text-secondary text-bg"
                >
                  {t("Navbar.menu_items.Find_Properties.For_Rent.Commercial")}
                </LangLink>
              </div>
            </div>
          </div>
        </li>
        <li>
          <LangNavLink
            className={`desktop__nav--item ${
              isActive(`/${i18n.language.startsWith("ar") ? "" : "en/"}Agencies`) ? "active" : ""
            }`}
            to="/Agencies"
          >
            {t("Navbar.menu_items.Brokers")}
          </LangNavLink>
        </li>
        <li>
          <LangNavLink
            className={`desktop__nav--item ${
              isActive(`/${i18n.language.startsWith("ar") ? "" : "en/"}projects`) ? "active" : ""
            }`}
            to="/projects"
          >
            {t("Navbar.menu_items.Projects")}
          </LangNavLink>
        </li>

        <li>
          <LangNavLink
            className={`desktop__nav--item ${
              isActive(`/${i18n.language.startsWith("ar") ? "" : "en/"}contact`) ? "active" : ""
            }`}
            to="/contact"
          >
            {t("Navbar.menu_items.Contact_Us")}
          </LangNavLink>
        </li>
      </ul>

      {/* ************************************************************************* */}
      <BurgerNavbar />
    </>
  );
}
