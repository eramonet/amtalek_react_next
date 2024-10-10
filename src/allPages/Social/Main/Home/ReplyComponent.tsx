import { FaEarthAfrica } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";

import { HiDotsVertical } from "react-icons/hi";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Image from "next/image";
function ReplyComponent({ reply }: any) {
  const [replyComment, setReply] = useState("");
  const { t } = useTranslation("Social_Home");

  const RecReply = ({ theRecsreply }: any) => {
    const [showReply, setShowReply] = useState(false);
    const showReplyComment = useCallback(() => {
      setShowReply(!showReply);
    }, [showReply]);
    return (
      <motion.div key={theRecsreply.id} className="w-full flex flex-col gap-4">
        <Accordion>
          <div className="bg-[#F2F2F2] flex w-full flex-col rounded-[4px] p-3 gap-2 ">
            <div className="w-full flex items-center gap-2 ">
              <Image
                width={1000}
                height={1000}
                alt="ewrewerw"
                src={theRecsreply.img}
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className="flex flex-col gap- w-full">
                <motion.div
                  key={theRecsreply.id}
                  className="w-full flex justify-between items-center"
                >
                  <span className="text-[18px] font-[400] text-[#01425A]">{theRecsreply.name}</span>
                  <HiDotsVertical />
                </motion.div>
                <div className="w-full flex gap-2 items-center">
                  <span className="text-[10px] font-[400] text-[#6C6C6C]">{theRecsreply.time}</span>
                  <FaEarthAfrica size={10} color="#6C6C6C" />
                </div>
              </div>
            </div>
            <p className="text-[16px] font-[400]  w-full ps-14 text-[#01425A]">
              {theRecsreply.comment}
            </p>
            <div className="w-full flex gap-3 text-[#E74335] ps-5">
              <button onClick={() => showReplyComment()}>{t("reply")}</button>
              <span>|</span>
              <button>{t("like")}</button>
            </div>
            <motion.div
              key={theRecsreply.id}
              initial={{ opacity: 0, transform: "scale(0)", height: "0px" }}
              animate={{
                opacity: showReply ? 1 : 0,

                transform: showReply ? "scale(1)" : "scale(0)",
                height: showReply ? "48px" : "0px",
                // padding: showReply ? "20px" : "0px",
              }}
              transition={{ duration: 0.3 }}
              className="w-full flex  justify-center"
            >
              <motion.input
                value={replyComment}
                onChange={(e) => setReply(e.target.value)}
                type="text"
                className="w-3/4  bg-white p-3 rounded-xl outline-none"
                placeholder={t("commentPlaceholder")}
              />
            </motion.div>
            {theRecsreply.commentReplies && <AccordionSummary>View Replies ...</AccordionSummary>}
          </div>

          {theRecsreply.commentReplies &&
            theRecsreply?.commentReplies.map((reply: any, i: any) => {
              return (
                <AccordionDetails key={reply?.id} className={``}>
                  <RecReply theRecsreply={reply} />
                </AccordionDetails>
              );
            })}
        </Accordion>
      </motion.div>
    );
  };
  return (
    <motion.div
      // animate={{ height: showReply ? "202px" : "154px" }}
      key={reply.id}
      className="w-full rounded-xl  flex flex-col items-center gap-4 "
    >
      <RecReply theRecsreply={reply} />
    </motion.div>
  );
}

export default ReplyComponent;
