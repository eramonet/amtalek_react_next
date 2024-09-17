import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import InputSubscription from "./InputSubscription";

export default function Subscribe({ data, t }: any) {
  return (
    <div>
      <h2 className="text-xl mb-9 ss:mb-3">{t("Footer.fourth_column.title")}</h2>
      {/* ******************************************************************************* */}
      <p className="font-sub-heading opacity-80 text-start w-fit asm:text-center mb-3">
        {data?.about?.subscribe}
      </p>

      {/* ******************************************************************************* */}
      <InputSubscription />
      {/* ******************************************************************************* */}

      <div className="socials w-fit flex items-center gap-4 mt-5">
        <Link rel="noreferrer" target="_blank" href={data?.facebook}>
          <FaFacebook className="text-3xl hover:scale-125 active:scale-90 hover:text-custome-yellow duration-200 transition-all cursor-pointer" />
        </Link>
        {/* ******************************************************************************* */}
        <Link rel="noreferrer" target="_blank" href={data?.twitter}>
          <FaXTwitter className="text-3xl hover:scale-125 active:scale-90 hover:text-custome-yellow duration-200 transition-all cursor-pointer" />
        </Link>
        {/* ******************************************************************************* */}
        <Link rel="noreferrer" target="_blank" href={data?.instagram}>
          <FaInstagram className="text-3xl hover:scale-125 active:scale-90 hover:text-custome-yellow duration-200 transition-all cursor-pointer" />
        </Link>
        {/* ******************************************************************************* */}
        <Link rel="noreferrer" target="_blank" href={data?.youtube}>
          <FaYoutube className="text-3xl hover:scale-125 active:scale-90 hover:text-custome-yellow duration-200 transition-all cursor-pointer" />
        </Link>
        {/* ******************************************************************************* */}
        <Link rel="noreferrer" target="_blank" href={data?.linkedIn}>
          <FaLinkedinIn className="text-3xl hover:scale-125 active:scale-90 hover:text-custome-yellow duration-200 transition-all cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
