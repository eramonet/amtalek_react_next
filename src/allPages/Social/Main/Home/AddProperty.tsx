import { useTranslation } from "react-i18next";
import AllStoriesComponent from "./AllStoriesComponent";
import { motion } from "framer-motion";
import CollapseForm from "./Collapse";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaImage } from "react-icons/fa";

export function Component() {
  const { t } = useTranslation("Social_AddProperty");
  const [status, setStatus] = useState("forSale");
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-2 flex flex-col gap-4"
    >
      <AllStoriesComponent />

      <form className="w-full flex flex-col gap-6 bg-white p-6 rounded-xl">
        <legend className="text-[#01425A] text-[16px] font-[400]">
          {t("title")}
        </legend>
        <div className="w-full flex border-[1px] gap-2 border-[#01425A] rounded-xl py-[14px] px-[12px]">
          <label
            className="text-[#01425A] w-fit text-[16px] font-[400]"
            htmlFor="ads"
          >
            {t("adstitle")}
          </label>
          <input
            id="ads"
            className="flex-1 text-[#01425A] text-[16px] font-[400] outline-none "
            type="text"
          />
        </div>
        <div className="w-full flex border-[1px] gap-2 border-[#01425A] rounded-xl py-[14px] px-[12px]">
          <label
            className="text-[#01425A] w-fit text-[16px] font-[400]"
            htmlFor="type"
          >
            {t("type")}
          </label>
          <input
            id="type"
            className="flex-1 text-[#01425A] text-[16px] font-[400] outline-none "
            type="text"
          />
          <span className="text-[#01425A] text-[16px] font-[400]">URL</span>
        </div>
        <div className="w-full flex border-[1px] gap-2 border-[#01425A] rounded-xl py-[14px] px-[12px]">
          <label
            className="text-[#01425A] w-fit text-[16px] font-[400]"
            htmlFor="link"
          >
            {t("videoLink")}
          </label>
          <input
            id="link"
            className="flex-1 text-[#01425A] text-[16px] font-[400] outline-none "
            type="text"
          />
          <span className="text-[#01425A] text-[16px] font-[400]">URL</span>
        </div>
        <div className="w-full flex border-[1px] gap-2 border-[#01425A] rounded-xl py-[14px] px-[12px]">
          <label
            className="text-[#01425A] w-fit text-[16px] font-[400]"
            htmlFor="price"
          >
            {t("price")}
          </label>
          <input
            id="price"
            className="flex-1 text-[#01425A] text-[16px] font-[400] outline-none "
            type="text"
          />
          <span className="text-[#01425A] text-[16px] font-[400]">URL</span>
        </div>

        <CollapseForm
          status={status}
          setStatus={setStatus}
          label={t("adStatus")}
        />
        <div className="w-full flex border-[1px] gap-2 border-[#01425A] rounded-xl py-[14px] px-[12px] items-center">
          <label
            className="text-[#01425A] w-fit text-[16px] font-[400]"
            htmlFor="location"
          >
            {t("location")}
          </label>
          <input
            id="location"
            className="flex-1 text-[#01425A] text-[16px] font-[400] outline-none "
            type="text"
          />

          <CiLocationOn color="red" size={24} />
        </div>
        <div className="w-full h-[190px] flex items-center justify-center border-[1px] border-[#01425A] rounded-xl">
          <input className="hidden" type="file" id="propertyImg" />
          <label
            className="cursor-pointer w-full flex flex-col gap-[19px] items-center justify-center text-[#6C6C6C] text-[16px] font-[400]"
            htmlFor="propertyImg"
          >
            <span>
              <FaImage size={50} color="#01425A" />
            </span>
            <span className="text-[16px] font-[400]">{t("download")}</span>
            <div className="w-full flex justify-center gap-3 text-[16px] font-[400]">
              {t("format")} :
              <div className="flex gap-2">
                <span>jpg</span> <span>png</span>
                <span>pdf</span>
              </div>
            </div>
          </label>
        </div>
        <div className="w-full h-[190px] border border-[#01425A] p-[12px] rounded-xl">
          <label className="text-[16px] font-[400] text-[#01425A]">
            {t("addescription")}
          </label>
          <textarea className="w-full flex-auto resize-none bg-white border-none text-[#01425A] text-[16px] font-[400] focus:ring-0 h-[140px]" />
        </div>
        <div className="w-full flex justify-center items-center gap-6">
          <button className="bg-[#01425A] text-white px-3 py-2 rounded-xl">
            {t("add")}
          </button>
          <button className="border-[1px] w-[120px] text-[16px] font-[400] border-[#D9D9D9] px-3 py-2 rounded-xl">
            {t("cancel")}
          </button>
        </div>
      </form>
    </motion.section>
  );
}
