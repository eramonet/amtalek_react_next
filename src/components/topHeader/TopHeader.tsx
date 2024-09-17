import initTranslations from "@/app/i18n";
import Navbar from "./components/Navbar";
import Text from "./components/Text";

export default async function TopHeader({ locale, t }: any) {
  return (
    <header className="bg-custome-venice text-custome-blue">
      <div className="site_container  h-12  flex justify-between gap-2 items-center clg:justify-center">
        <Text t={t} />
        {/* *************************************************** */}
        <Navbar t={t} />
      </div>
    </header>
  );
}
