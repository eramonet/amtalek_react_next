import { useTranslation } from "react-i18next";
// import { HelmetTags } from "../../../src/Components/MainComponents";
import Main from "./Main";
import circle from "@/assets/images/cirlce.png";
import Image from "next/image";
export function ComingSoon({ t }: any) {
  // const { t } = useTranslation("Pages_Coming");
  return (
    <div className="w-[90%] mx-auto relative">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}

      <Main />
      <span className="bg-secondary absolute left-0 top-0 w-10 h-96"></span>
      <div className="absolute w-full h-full top-0 left-0 z-[-1]">
        <Image
          width={600}
          height={500}
          className="absolute right-0  top-0 ss:top-[500px]"
          src={circle}
          alt="dsadsadewqewq"
        />
      </div>
    </div>
  );
}
