import { motion } from "framer-motion";
import AllStoriesComponent from "./AllStoriesComponent";
import { useTranslation } from "react-i18next";
import ProjectSelectBox from "./ProjectSelectBox";
export function Component() {
  const { t } = useTranslation("Social_AddProject");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-2 flex flex-col gap-4"
    >
      <AllStoriesComponent />
      <form
        className="w-full flex flex-col gap-6 rounded-xl p-6 bg-white
      "
      >
        <legend className="text-[#01425A] text-[16px] font-[500]">{t("title")}</legend>
        <div className="w-full flex border-[1px] gap-2 border-[#01425A] rounded-xl py-[14px] px-[12px]">
          <label className="text-[#01425A] w-fit text-[16px] font-[400]" htmlFor="projectName">
            {t("projectName")}
          </label>
          <input
            id="projectName"
            className="flex-1 text-[#01425A] text-[16px] font-[400] outline-none "
            type="text"
          />
        </div>
        <div className="w-full grid grid-cols-3 gap-3 ">
          <div className="col-span-1 flex flex-col gap-3">
            <span className="text-[#01425A] text-[16px] font-[400]">{t("country")}</span>
            <ProjectSelectBox className={undefined} />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <span className="text-[#01425A] text-[16px] font-[400]">{t("city")}</span>
            <ProjectSelectBox className={undefined} />
          </div>{" "}
          <div className="col-span-1 flex flex-col gap-3">
            <span className="text-[#01425A] text-[16px] font-[400]">{t("region")}</span>
            <ProjectSelectBox className={undefined} />
          </div>
        </div>
        <div className="w-full flex border-[1px] gap-2 border-[#01425A] rounded-xl py-[14px] px-[12px]">
          <label className="text-[#01425A] w-fit text-[16px] font-[400]" htmlFor="location">
            {t("location")}
          </label>
          <input
            id="location"
            className="flex-1 text-[#01425A] text-[16px] font-[400] outline-none "
            type="text"
          />
        </div>
        <div className="w-full flex border-[1px] gap-2 border-[#01425A] rounded-xl py-[14px] px-[12px]">
          <label className="text-[#01425A] w-fit text-[16px] font-[400]" htmlFor="videoLink">
            {t("videoLink")}
          </label>
          <input
            id="videoLink"
            className="flex-1 text-[#01425A] text-[16px] font-[400] outline-none "
            type="text"
          />
          <span className="text-[#01425A] text-[16px] font-[400]">URL</span>
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="col-span-1 flex border-[1px] gap-2 border-[#01425A] rounded-xl items-center px-2 py-[10px]">
            <label className="text-[#01425A] w-fit text-[16px] font-[400]" htmlFor="totalUnits">
              {t("totalUnits")}
            </label>
            <input
              id="totalUnits"
              className="flex-auto  text-[#01425A] text-[16px] font-[400] outline-none "
              type="number"
            />
          </div>
          <div className="col-span-1 flex border-[1px] gap-2 border-[#01425A] rounded-xl items-center px-2 py-[10px] ">
            <label className="text-[#01425A] w-fit text-[16px] font-[400] " htmlFor="bedrooms">
              {t("bedrooms")}
            </label>
            <input
              id="bedrooms"
              className="w-1/4  text-[#01425A] text-[16px] font-[400] outline-none "
              type="number"
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex border-[1px] gap-2 border-[#01425A] rounded-xl py-[14px] px-[12px]">
            <label className="text-[#01425A] w-fit text-[16px] font-[400]" htmlFor="pricefrom">
              {t("pricefrom")}
            </label>
            <input
              id="pricefrom"
              className="flex-auto  text-[#01425A] text-[16px] font-[400] outline-none "
              type="number"
            />
          </div>
          <div className="col-span-1 flex border-[1px] gap-2 border-[#01425A] rounded-xl items-center px-2 py-[10px] ">
            <label className="text-[#01425A] w-fit text-[16px] font-[400] " htmlFor="bedrooms">
              {t("bedrooms")}
            </label>
            <input
              id="bedrooms"
              className="w-1/4  text-[#01425A] text-[16px] font-[400] outline-none "
              type="number"
            />
          </div>
        </div>

        <div className="w-full h-[190px] border border-[#01425A] p-[12px] rounded-xl">
          <label className="text-[16px] font-[400] text-[#01425A]">{t("projectDescription")}</label>
          <textarea className="w-full flex-auto resize-none bg-white border-none text-[#01425A] text-[16px] font-[400] focus:ring-0 h-[140px]" />
        </div>
      </form>
    </motion.div>
  );
}
