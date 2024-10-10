import React from "react";
import ButtonNavbar from "./components/ButtonNavbar";
import LoginButton from "./components/LoginButton";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import NavbarHeader from "./components/NavbarHeader";
import ServerImg from "./components/ServerImg";
// import HeaderTopMenu from "./HeaderTopMenu";

export default function Header({ t, locale }: any) {
  return (
    <>
      <header className="bg-white text-[#005879] sticky top-0 z-50 shadow-md">
        {/* <div className="site_container flex items-center justify-between"> */}
        <div className="site_container h-[88px] bg- flex justify-between items-center bg-bg relative z-50 ">
          {/* <Logo locale={locale} /> */}
          {/* ********************************************************* */}
          {/* <Navbar t={t} /> */}
          {/* ********************************************************* */}
          {/* <ButtonNavbar /> */}
          <NavbarHeader locale={locale} />
          {/* <ServerImg /> */}
          {/* <LoginButton /> */}
        </div>
        {/* </div> */}
      </header>
    </>
  );
}
