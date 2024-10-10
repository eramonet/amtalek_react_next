import { Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import { FaEarthAfrica } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { CiLock } from "react-icons/ci";

const handleChange = (value: any) => {};

function PostSelectBox() {
  const { t } = useTranslation("Social_Home");
  return (
    <Space wrap>
      <Select
        className="focus:outline-none !hover:border-none !hover:outline-none"
        defaultValue="public"
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: "public",
            label: (
              <span className="flex w-full gap-2 font-[400] text-[12px] items-center">
                <FaEarthAfrica size={12} color="#D3D3D3" /> {t("writePostPrivacy.public")}
              </span>
            ),
          },
          {
            value: "friends",
            label: (
              <span className="flex w-full gap-2 font-[400] text-[12px] items-center">
                <FaUserFriends size={12} color="#D3D3D3" /> {t("writePostPrivacy.friends")}
              </span>
            ),
          },
          {
            value: "onlyme",
            label: (
              <span className="flex w-full gap-2 font-[400] text-[12px] items-center">
                <CiLock size={12} color="#D3D3D3" /> {t("writePostPrivacy.onlyMe")}
              </span>
            ),
          },
        ]}
      />
    </Space>
  );
}
export default PostSelectBox;
