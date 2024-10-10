import { useTranslation } from "react-i18next";
import { MdKeyboardArrowUp } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";
import { CiStar } from "react-icons/ci";
import { SlUserUnfollow } from "react-icons/sl";
import { MdCancelPresentation } from "react-icons/md";
import Image from "next/image";

function FriendCard({ friend, classname, type }: any) {
  const { t } = useTranslation("Social_Friends");
  const [open, setOpen] = useState(false);
  return (
    <div className={`${classname} border-[1px] bg-[#F4F2F2] flex flex-col gap-2 p-3 rounded-xl`}>
      <div className="w-full flex gap-2">
        <Image
          width={1000}
          height={1000}
          src={friend.img}
          className="w-[40px] h-[40px] rounded-full"
          alt={""}
        />
        <div className="w-full flex flex-col gap-2">
          <span className="text-[#005879] font-[400] text-[16px]">{friend.name}</span>
          <span className="text-[#98A0A3] text-[12px] font-[400]">
            {t("mutual", { count: friend.mutual })}
          </span>
          {type === "requests" ? (
            <div className="w-full grid grid-cols-2 gap-4">
              <button className="col-span-1 bg-[#01425A] py-2 text-white rounded-xl font-[400] text-[14px]">
                {t("confirm")}
              </button>
              <button className="col-span-1 py-2 border-[1px] rounded-xl border-[#FCD2D2] text-[14px] font-[400] text-[#E74335]">
                {t("delete")}
              </button>
            </div>
          ) : type === "friends" ? (
            <div className="w-full grid grid-cols-2 gap-4">
              <button className="col-span-1 bg-[#EBFFF0] py-2 text-[#0B9F30] rounded-xl font-[400] text-[14px]">
                {t("friend")}
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="col-span-1 py-2 rounded-xl  text-[14px] font-[400] bg-white text-[#34A851] flex gap-2 justify-center items-center relative"
              >
                <span>{t("following")}</span>
                <motion.span
                  transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
                  animate={{ rotate: open ? 180 : 0 }}
                >
                  <MdKeyboardArrowUp size={18} />
                </motion.span>
                <motion.div
                  animate={{
                    opacity: open ? 1 : 0,
                    display: open ? "flex" : "none",
                    transform: open ? " translateY(110%)" : " translateY(150%)",
                  }}
                  className="absolute w-[130%] flex flex-col gap-2 bottom-0 left-0 bg-white rounded p-2 z-50"
                >
                  <button className="w-full flex gap-2 items-center hover:bg-slate-200 p-1">
                    <CiStar color="#98A0A3" size={18} />
                    <span className="text-[#98A0A3]">{t("favourite")}</span>
                  </button>
                  <button className="w-full flex p-1 items-center gap-2 hover:bg-slate-200">
                    <MdCancelPresentation color="#98A0A3" size={18} />
                    <span className="text-[#98A0A3]">{t("unfollow")}</span>
                  </button>
                  <button className="w-full flex p-1 items-center gap-2 hover:bg-slate-200">
                    <SlUserUnfollow color="#98A0A3" size={18} />
                    <span className="text-[#98A0A3]">{t("unfriend")}</span>
                  </button>
                </motion.div>
              </button>
            </div>
          ) : type === "mayknow" ? (
            <div className="w-full grid grid-cols-2 gap-4">
              <button className="col-span-1 bg-[#01425A] py-2 text-white rounded-xl font-[400] text-[14px]">
                {t("confirm")}
              </button>
              <button className="col-span-1 py-2 rounded-xl  text-[14px] font-[400] bg-white text-[#6C6C6C]">
                {t("remove")}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
