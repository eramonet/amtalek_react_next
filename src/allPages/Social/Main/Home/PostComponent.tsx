/* eslint-disable react-hooks/exhaustive-deps */
import { MdVerified } from "react-icons/md";
import { FaEarthAfrica } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import { BsEmojiFrown } from "react-icons/bs";
import { BsEmojiExpressionlessFill } from "react-icons/bs";
import { BsEmojiSunglasses } from "react-icons/bs";
import { GrEmoji } from "react-icons/gr";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";
import { CiFaceSmile } from "react-icons/ci";
import { TbPhotoCircle } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import { TUser } from "@/Types/AppTypes";
// import ImagesPostComponent from "@/ImagesPostComponent";
import { CommentsModal } from "./CommentsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faChevronDown, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Popover } from "antd";
import Image from "next/image";
import ImagesPostComponent from "../../Components/ImagesPostComponent";

type Post = {
  post: any;
  user: TUser;
  group?: boolean;
  index?: number;
  developer?: boolean;
};
function PostComponent({ post, user, group, index, developer }: Post) {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const { t } = useTranslation("Social_Home");
  const [clicked, setClicked] = useState(false);

  const content = (
    <div className="w-[150px] flex flex-col items-center gap-3 !mt-0">
      <button className="w-full rounded-lg hover:text-[#34A851] hover:bg-[#EBFFF0] transition duration-300 py-1">
        Leave
      </button>
      <button className="w-full rounded-lg hover:text-[#34A851] hover:bg-[#EBFFF0] transition duration-300 py-1">
        Report
      </button>
    </div>
  );
  const handleClick = useCallback(() => {
    setClicked(!clicked);
  }, [clicked]);
  const openEmoji = useCallback(() => {
    setTimeout(() => {
      setShowEmoji(true);
    }, 500);
  }, []);
  const closeEmoji = useCallback(() => {
    setTimeout(() => {
      setShowEmoji(false);
    }, 500);
  }, [showEmoji]);

  return (
    <div key={post.id} className="w-full bg-white p-5 rounded-xl flex flex-col gap-4">
      <div className="w-full flex flex-col gap-3 border-b-[1px] border-[#7A949D] pb-3 text-[18px] font-[400] text-[#01425A]">
        {index === 0 && group && <span className="text-[#6C6C6C] text-[14px]">{t("recent")} </span>}
        {index === 0 && developer && (
          <span className="text-[#6C6C6C] text-[14px]">{t("recent")} </span>
        )}
        <div className="flex gap-3 items-center">
          <Image
            width={1000}
            height={1000}
            alt="fewfewfew"
            src={post.userImg}
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="flex flex-col w-full">
            <div className="w-full  flex items-center  justify-between">
              <div className="flex items-center gap-2">
                <span>{post.name}</span>
                {developer && <FontAwesomeIcon icon={faBuilding} color="#E74335" />}
                {post.verified && <MdVerified size={15} color="#E74335" />}
              </div>

              <div className="flex items-center gap-3">
                {group &&
                  (post?.joined ? (
                    <ConfigProvider
                      theme={{
                        components: {
                          Popover: {
                            zIndexPopup: 2,
                          },
                        },
                      }}
                    >
                      <Popover
                        rootClassName="joined_trigger"
                        zIndex={2}
                        open={clicked}
                        onOpenChange={handleClick}
                        content={content}
                        trigger={"click"}
                        placement="bottom"
                      >
                        <button className="flex justify-center items-center gap-3 bg-[#EBFFF0] text-[#34A851] text-[14px] w-[90px] h-[30px] rounded ">
                          {t("post.joined")}
                          <FontAwesomeIcon icon={faChevronDown} size={"1x"} />
                        </button>
                      </Popover>
                    </ConfigProvider>
                  ) : (
                    <button className="flex justify-center items-center gap-3 bg-[#EFEFEF] text-[#6C6C6C] text-[14px] w-[90px] h-[30px] rounded">
                      {t("post.join")}
                      <FontAwesomeIcon icon={faPlusSquare} size={"1x"} />
                    </button>
                  ))}
                <button>
                  <HiDotsVertical />
                </button>
              </div>
            </div>
            <div className="flex w-full gap-1 items-center text-[10px] font-[400] ">
              <span className="text-[#5B5B5B]">{post.time}</span>
              <FaEarthAfrica size={9} color="#5B5B5B" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-[#01425A] text-[16px] font-[400] leading-5">{post.title}</p>
      <ImagesPostComponent post={post} keyID={post.id} images={post?.ArrayOfImages} />
      <div className="w-full flex gap-8">
        <span className="text-[#848484] text-[12px] font0[400]">
          {t("likes", { count: post.likes })}
        </span>
        <span className="text-[#848484] text-[12px] font0[400]">
          {t("comments", { count: post.comments })}
        </span>
        <span className="text-[#848484] text-[12px] font0[400]">
          {t("shares", { count: post.share })}
        </span>
      </div>
      {user && (
        <div className="w-full flex border-y-[1px] border-[#7A949D] py-2">
          <motion.button
            onMouseEnter={openEmoji}
            onMouseLeave={closeEmoji}
            className="flex-auto justify-center flex hover:bg-gray-100 p-2 transition-[300] text-[#7A949D] relative gap-2 items-center"
          >
            <AiOutlineLike /> {t("like")}
            <motion.div
              initial={{ opacity: 0, top: "0" }}
              animate={{
                opacity: showEmoji ? 1 : 0,
                top: showEmoji ? "-64px" : "0",
              }}
              transition={{ duration: 0.3 }}
              className="absolute bg-gray-100 -top-16 left-0 flex gap-5 p-3 rounded-xl"
            >
              <BsFillEmojiHeartEyesFill size={20} color="red" />

              <BsEmojiFrown size={20} color="red" />
              <BsEmojiExpressionlessFill size={20} color="red" />
              <BsEmojiSunglasses size={20} color="red" />
              <GrEmoji size={20} color="red" />
            </motion.div>
          </motion.button>
          <motion.button
            onClick={() => setShowComments(true)}
            className="flex-auto justify-center flex hover:bg-gray-100 p-2 transition-[300] text-[#7A949D] gap-2 items-center"
          >
            <TfiCommentAlt /> {t("comment")}
          </motion.button>{" "}
          <motion.button className="flex-auto justify-center  flex hover:bg-gray-100 p-2 transition-[300] text-[#7A949D] items-center gap-2">
            <FaRegShareSquare /> {t("share")}
          </motion.button>
        </div>
      )}
      {user && (
        <div className="w-full flex gap-2 items-center">
          <Image
            width={1000}
            height={1000}
            className="w-[40px] h-[40px] rounded-full"
            src={user?.image}
            alt="dsadsa"
          />

          <div className="bg-[#F2F2F2] flex w-full  h-full rounded-xl items-center px-3 gap-3 py-3">
            <button>
              <AiOutlineSend color="#A0A0A0" size={20} />
            </button>
            <input
              placeholder={t("commentPlaceholder")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-auto bg-transparent outline-none focus:bg-gray-200 p-2 rounded-xl"
            />
            <div className="flex gap-3 items-center">
              <button>
                <CiFaceSmile size={20} color="#6C6C6C" />
              </button>
              <button>
                <TbPhotoCircle size={20} color="#6C6C6C" />
              </button>
            </div>
          </div>
        </div>
      )}

      <CommentsModal showComments={showComments} setShowComments={setShowComments} post={post} />
    </div>
  );
}

export default PostComponent;
