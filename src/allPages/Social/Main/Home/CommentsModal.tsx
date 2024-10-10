import { Modal } from "antd";
import ReplyComponent from "./ReplyComponent";

type Props = {
  showComments: boolean;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
  post: any;
};

export function CommentsModal({ showComments, setShowComments, post }: Props) {
  return (
    <>
      <Modal
        className="!w-[600px] h-[800px] overflow-scroll"
        centered
        open={showComments}
        onCancel={() => setShowComments(false)}
        footer={false}
        closeIcon={null}
        classNames={{ content: "h-[800px] overflow-scroll w-[600px]" }}
      >
        <div className="w-full !h-full flex flex-col gap-2 overflow-scroll">
          {post.replies.map((reply: any) => {
            return <ReplyComponent key={reply.id} reply={reply} />;
          })}
        </div>
      </Modal>
    </>
  );
}
