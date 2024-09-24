import { Select, Space } from "antd";
import type { SelectProps } from "antd";

function AmenitiesSelect({ t, amenitiesData, getValues, setValue }: any) {
  const options: SelectProps["options"] = [];

  for (let i = 0; i < amenitiesData?.length; i++) {
    options.push({
      value: amenitiesData[i]?.id,
      label: amenitiesData[i]?.title,
    });
  }

  const handleChange = (value: string | string[]) => {
    setValue("amenities", value);
  };

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Select
          rootClassName="amenities_Home"
          mode="multiple"
          size={"large"}
          placeholder={t("Amentias.placeholder", "اختر الامتيازات")}
          onChange={handleChange}
          style={{ width: "100%", color: "var(--primary-color)" }}
          options={options}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
        />
      </Space>
    </>
  );
}

export default AmenitiesSelect;
