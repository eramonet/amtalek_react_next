import { useTranslation } from "react-i18next";

import sarai from "/assets/images/sarai.png";
import talaat from "/assets/images/talaat.png";
import futaim from "/assets/images/futaim.png";
import mv from "/assets/images/MV.png";
import palm from "/assets/images/palm.png";
import hassan from "/assets/images/hassan.png";
import orascom from "/assets/images/orascom.png";
import Image from "next/image";

function SuggestionsDevelopers() {
  const { t } = useTranslation("Social_Home");

  return (
    <div className="w-full rounded-xl bg-white p-5 flex flex-col gap-4">
      <span className="text-[#01425A] text-[16px] font-[400]">{t("suggestionDevelopers")}</span>
      <div className="w-full flex gap-3 overflow-x-auto">
        <Image
          width={1000}
          height={1000}
          alt="dsadsa"
          src={sarai}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="fdfd"
          src={talaat}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="fdfd"
          src={futaim}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="ewdew"
          src={mv}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="fdewfe"
          src={palm}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="sffds"
          src={hassan}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="dfsfds"
          src={orascom}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="fsfd"
          src={sarai}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="fdsfdsd"
          src={talaat}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="fdsfdsdf"
          src={futaim}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="fdsfds"
          src={mv}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="dsadsasds"
          src={palm}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="dwdew"
          src={hassan}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
        <Image
          width={1000}
          height={1000}
          alt="dsadsa"
          src={orascom}
          className="w-[72px] h-[72px] rounded-full flex-shrink-0"
        />
      </div>
    </div>
  );
}

export default SuggestionsDevelopers;
