type TProp = {
  post?: any;
};
import { FaEarthAfrica } from "react-icons/fa6";
import laughEmoji from "/assets/images/laugh-SpoJX5k8vY.svg";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import ReplyComponent from "../Main/Home/ReplyComponent";
import Image from "next/image";

function ImageDetailsComponentModal({ post }: TProp) {
  return (
    <div className="w-full flex flex-col gap-5 p-2 overflow-auto">
      <div className="flex gap-2 items-center">
        <Image
          width={300}
          height={300}
          alt="fefrfr3"
          src={post?.userImg}
          className="w-[40px] h-[40px] rounded-full"
        />

        <div className="flex flex-col gap-">
          <span className="font-bold">{post?.name}</span>
          <span className="text-gray-500 flex gap-1 items-center text-[13px]">
            yesterday at {post?.time} AM
            <FaEarthAfrica size={10} />
          </span>
        </div>
      </div>
      <p className="text-[15px] text-[#050505]">{post?.title}</p>
      <div className="w-full flex items-center justify-between">
        <div className="flex  items-center">
          <Image
            width={300}
            height={300}
            alt="moimifnid"
            src={laughEmoji}
            className="w-[25px] h-[25px]"
          />
          <span className="text-[#65676b] text-[15px] font-[100]">2.4k</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            80 <FaComment />
          </span>
          <span className="flex items-center gap-2">
            121 <FaShare />
          </span>
        </div>
      </div>

      <div className="w-full flex justify-between items-center border-y-[1px] border-y-gray-300 text-[#65676b] text-[16px] py-2">
        <span className="flex gap-1 items-center">
          <AiOutlineLike size={20} /> Like
        </span>
        <span className="flex gap-1 items-center">
          <AiOutlineLike size={20} /> Comment
        </span>
        <span className="flex gap-1 items-center">
          <AiOutlineLike size={20} /> Share
        </span>
      </div>
      {post.replies.map((reply: any) => {
        return <ReplyComponent key={reply.id} reply={reply} />;
      })}
    </div>
  );
}

export default ImageDetailsComponentModal;
