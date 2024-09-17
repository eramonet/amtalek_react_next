import ButtonNavbar from "./components/ButtonNavbar";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";

export default function Header({ t, locale }: any) {
  return (
    <header className="bg-white text-[#005879] sticky top-0 z-50 shadow-md">
      {/* <div className="site_container flex items-center justify-between"> */}
      <div className=" h-[88px]  bg- flex justify-between items-center site_container  bg-bg relative z-50 ">
        <Logo locale={locale} />
        {/* ********************************************************* */}
        <Navbar t={t} />
        {/* ********************************************************* */}
        <ButtonNavbar />
      </div>
    </header>
  );
}
