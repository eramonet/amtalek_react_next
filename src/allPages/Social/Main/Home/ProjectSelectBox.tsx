import { Select, Space } from "antd";
const handleChange = (value: any) => {};

function ProjectSelectBox({ className }: any) {
  return (
    <Space className="w-[100%]" wrap>
      <Select
        className="w-[100%]"
        size="large"
        defaultValue="lucy"
        onChange={handleChange}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "Yiminghe",
            label: "yiminghe",
          },
        ]}
      />
    </Space>
  );
}
export default ProjectSelectBox;
