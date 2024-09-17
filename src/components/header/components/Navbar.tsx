import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import BurgerNavbar from "./BurgerNavbar";

export default function Navbar({ t }: any) {
  return (
    <>
      {/* ************************************************************************* */}

      <ul className="xll:hidden flex justify-between items-center text-custome-blue text-lg gap-9 xl:gap-7 ">
        <li>
          <Link className="" href={`/`}>
            {t("Navbar.menu_items.Home")}
          </Link>
        </li>
        {/* ************************************************************************* */}

        <li className="relative h-[88px] flex justify-center items-center group/grand cursor-pointer">
          <Link className="group/parent h-fit flex justify-start items-center gap-2 " href={``}>
            {t("Navbar.menu_items.Find_Properties.title")}

            <FaChevronDown />
          </Link>
          <div className="shadow-md absolute left-0 rtl:left-auto rtl:right-0 bg-custome-blue text-custome-white top-[88px] w-[215px] h-auto  opacity-0 pointer-events-none group-hover/grand:opacity-100 group-hover/grand:pointer-events-auto transition-all duration-300 ease-in-out">
            <div className="w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-custome-white hover:text-custome-blue transition-all duration-300 ease-in-out group/sale cursor-pointer relative">
              {t("Navbar.menu_items.Find_Properties.For_Sale.title")}

              <FaChevronDown />

              <div className="shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/sale:opacity-100 group-hover/sale:pointer-events-auto">
                <Link
                  href={``}
                  className=" w-full bg-custome-blue h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-custome-white hover:text-custome-blue text-custome-white"
                >
                  {t("Navbar.menu_items.Find_Properties.For_Sale.Residential")}
                </Link>
                <Link
                  href={``}
                  className="w-full bg-custome-blue h-10 flex justify-between items-center px-2 hover:bg-custome-white transition-all duration-300 ease-in-out hover:text-custome-blue text-custome-white"
                >
                  {t("Navbar.menu_items.Find_Properties.For_Sale.Commercial")}
                </Link>
              </div>
            </div>
            {/* ************************************************************************* */}

            <div className="w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-custome-white hover:text-custome-blue transition-all duration-300 ease-in-out group/rent cursor-pointer relative">
              {t("Navbar.menu_items.Find_Properties.For_Rent.title")}

              <FaChevronDown />

              <div className="shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/rent:opacity-100 group-hover/rent:pointer-events-auto">
                <Link
                  href={``}
                  className="w-full bg-custome-blue h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-custome-white hover:text-custome-blue text-custome-white"
                >
                  {t("Navbar.menu_items.Find_Properties.For_Rent.Residential")}
                </Link>
                <Link
                  href={``}
                  className="w-full bg-custome-blue h-10 flex justify-between items-center px-2 hover:bg-custome-white transition-all duration-300 ease-in-out hover:text-custome-blue text-custome-white"
                >
                  {t("Navbar.menu_items.Find_Properties.For_Rent.Commercial")}
                </Link>
              </div>
            </div>
          </div>
        </li>
        {/* ************************************************************************* */}

        <li>
          <Link className="" href="/Agencies">
            {t("Navbar.menu_items.Brokers")}
          </Link>
        </li>
        {/* ************************************************************************* */}

        <li>
          <Link className="" href="/projects">
            {t("Navbar.menu_items.Projects")}
          </Link>
        </li>
        {/* ************************************************************************* */}

        <li>
          <Link className="" href="/contact">
            {t("Navbar.menu_items.Contact_Us")}
          </Link>
        </li>
        {/* ************************************************************************* */}
      </ul>

      {/* ************************************************************************* */}
      <BurgerNavbar />
    </>
  );
}
