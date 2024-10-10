import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { useState } from "react";
import PostSelectBox from "./SelectBox";
import { MdPhotoLibrary, MdEmojiEmotions, MdAddLocationAlt } from "react-icons/md";
import { FaUserTag } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";
import { motion } from "framer-motion";

import { userProfileData } from "@/Store/Features/AuthenticationSlice";
import { useSelector } from "react-redux";
import Image from "next/image";

function WritePostModal() {
  const { t } = useTranslation("Social_Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openColorsBox, setColorsBox] = useState(false);
  const [PostType, setPostType] = useState("text");
  const user = useSelector(userProfileData);

  const colors = [
    "E5FFCC",
    "CCE5FF",
    "FFFFCC",
    "99FF99",
    "660000",
    "CCFFE5",
    "003366",
    "CC99FF",
    "E5FFCC",
    "CCE5FF",
    "FFFFCC",
    "99FF99",
    "660000",
    "CCFFE5",
    "003366",
    "CC99FF",
  ];
  const [bgColor, setColor] = useState("F5F4F4");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function handleOpenColorsBox() {
    setColorsBox(!openColorsBox);
  }

  return (
    <>
      <div
        onClick={showModal}
        className="flex-1 bg-slate-100 rounded-xl p-3 cursor-pointer text-[#00587980] text-[12px] font-[400]"
      >
        {t("inputplaceholder")}
      </div>
      <Modal
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        open={isModalOpen}
      >
        <div className="w-full flex flex-col gap-4 items-center">
          <h1 className="w-full text-center text-[32px] font-[200] p-1 border-b-[1px]">
            {t("createPost")}
          </h1>
          <div className="w-full flex gap-2 items-center">
            <Image
              width={1000}
              height={1000}
              alt="dewewq"
              src={user?.image}
              className="w-[40px] h-[40px] rounded-full"
            />
            <div className="flex flex-col gap-">
              <span className="text-[16px] text-[#01425A]">
                {user?.first_name} {user?.last_name}
              </span>
              <PostSelectBox />
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <motion.div
              animate={{
                transform: PostType === "text" ? "translateX(0)" : "translateX(100%)",
                display: PostType === "text" ? "flex" : "none",
              }}
              className="w-full flex flex-col gap-3"
            >
              <textarea
                style={{ backgroundColor: `#${bgColor}` }}
                placeholder={t("writingModalPlaceholder", {
                  name: user?.first_name,
                })}
                className={` top-0 w-full focus:shadow-none  outline-none  rounded-xl p-2   font-[400] resize-none border-none placeholder:text-[20px] text-[20px] ${
                  bgColor === "F5F4F4" ? "h-[150px]" : "leading-[230px] text-center h-[250px]"
                }`}
              />
              <div
                className={`flex  gap-3 w-full self-start ${
                  openColorsBox ? "w-full overflow-x-auto " : "!w-[25px] overflow-hidden "
                } pb-5 `}
              >
                <div
                  style={{ width: "25px", height: "25px" }}
                  onClick={handleOpenColorsBox}
                  className=" w-[25px] openBoxColors cursor-pointer h-[25px] rounded  shrink-0 flex items-center justify-center text-white"
                >
                  Aa
                </div>
                <div
                  style={{ width: "25px", height: "25px" }}
                  onClick={() => setColor("F5F4F4")}
                  className=" w-[25px] cursor-pointer h-[25px] rounded  shrink-0 flex items-center justify-center text-white bg-[#F5F4F4]"
                ></div>
                {colors.map((color) => {
                  return (
                    <div
                      onClick={() => setColor(color)}
                      style={{ backgroundColor: `#${color}` }}
                      className={`bg-[${color}] w-[25px] h-[25px] rounded shrink-0 cursor-pointer`}
                      key={color}
                    ></div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              animate={{
                transform: PostType === "photo" ? "translateX(0)" : "translateX(100%)",
                display: PostType === "photo" ? "flex" : "none",
              }}
              exit={{ opacity: 0, display: "none" }}
              transition={{ duration: 0.3 }}
              className=" top-0w-full flex justify-center items-center h-[150px] bg-[#F5F4F4] rounded relative"
            >
              <input type="file" className="w-full hidden bg-red-500" id="photo" />
              <label className="w-fit cursor-pointer flex gap-2 items-center" htmlFor="photo">
                {t("addphoto")} <MdAddToPhotos size={20} />
              </label>
              <span
                onClick={() => setPostType("text")}
                className="text-[25px] absolute top-1 right-2 text-[#918d8d] w-[30px] h-[30px] bg-white flex items-center justify-center rounded-full transition-[300] hover:text-white cursor-pointer hover:bg-slate-200"
              >
                x
              </span>
            </motion.div>
          </div>

          <div className="w-full flex border-[1px] gap-5 border-[#D9D9D9] rounded py-6 px-2">
            <span className="font-[500] text-[18px]">{t("addToPost")}</span>
            <div className="flex flex-auto gap-4 items-center">
              <span
                onClick={() => setPostType("photo")}
                className="hover:bg-[#e0e0e0] w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
              >
                <MdPhotoLibrary size={25} color="#66cc00" />
              </span>
              <span className="hover:bg-[#e0e0e0] w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
                <MdAddLocationAlt size={30} color="#E74335" />
              </span>
              <span className="hover:bg-[#e0e0e0] w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
                <MdEmojiEmotions size={30} color="#ff8000" />
              </span>

              <span className="hover:bg-[#e0e0e0] w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
                <FaUserTag size={25} color="#0066cc" />
              </span>
            </div>
          </div>
          <button className="bg-[#01425A] w-3/4 rounded p-2 text-white text-[20px]">
            {t("postBtn")}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default WritePostModal;
