import initTranslations from "@/app/i18n";
import Navbar from "./components/Navbar";
import Text from "./components/Text";
import React from "react";
import HeaderTopMenu from "./HeaderTopMenu";
// import HeaderTopMenu from "../header/HeaderTopMenu";

export default async function TopHeader({ locale, t }: any) {
  return (
    <>
      <header className="bg-grey">
        <div className="site_container  h-12  flex justify-between gap- items-center clg:justify-center  ">
          <p className="font-medium clg:hidden clg:text-[14px]">{t("Layout_header.txt")}</p>
          {/* <HeaderTopMenu /> */}
          <HeaderTopMenu />
        </div>
      </header>
    </>
  );
}
