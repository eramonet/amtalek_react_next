"use client";
import Select from "react-select";
import { useState, useEffect } from "react";

export default function ComboBox({
  setValue,
  setSearchParams,
  stateName,
  placeholder,
  data = [],
  light,
  NotFoundMessage = "No data found",
  callBcFn,
  getDefaultValueFromURL,
  searchParams,
  selectBox,
  isSuccess,
  company_name,
  company_logo,
}: any) {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setOptions(
        data.map((item: any) => ({
          value: item.id,
          label: item.title,
        }))
      );
    }
  }, [data]);

  const handleChange = (selectedOption: any) => {
    setSelectedLocation(selectedOption);
    if (setValue) {
      setValue(stateName, selectedOption?.value);
    }
    if (setSearchParams) {
      setSearchParams((params: any) => {
        params.set("srt", selectedOption?.value);
        return params;
      });
    }
    if (callBcFn) {
      callBcFn(selectedOption?.value);
    }
  };

  // وظيفة تصفية الخيارات بناءً على الإدخال
  const filterOption = (option: any, inputValue: string) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <div className="relative w-full">
      <Select
        value={selectedLocation}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isClearable
        noOptionsMessage={() => NotFoundMessage}
        className={`w-full ${light ? "bg-gray-100" : "bg-white"} text-gray-900`}
        filterOption={filterOption} // إضافة خاصية التصفية
        styles={{
          control: (provided: any) => ({
            ...provided,
            backgroundColor: light ? "#F0F4F8" : "#FFFFFF",
          }),
          option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#E5E7EB" : "#FFFFFF",
            color: "#374151",
            "&:hover": {
              backgroundColor: "#E5E7EB",
            },
          }),
        }}
        theme={(theme: any) => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary25: "#E5E7EB", // hover color
            primary: "#3B82F6", // border color
          },
        })}
      />
    </div>
  );
}
