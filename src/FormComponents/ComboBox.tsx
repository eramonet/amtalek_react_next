"use client";
import { useCombobox } from "downshift";
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
  // width = "w-full",
}: any) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    setFilteredData(
      data.filter((item: any) => item.title.toLowerCase().includes(inputValue.toLowerCase()))
    );
  }, [inputValue, data]);

  const { isOpen, getInputProps, getMenuProps, getItemProps, highlightedIndex } = useCombobox({
    items: filteredData,
    onSelectedItemChange: (changes) => {
      const selectedId = changes.selectedItem?.id;
      setSelectedLocation(changes.selectedItem?.title || "");
      setIsDropdownVisible(false);
      if (setValue) {
        setValue(stateName, selectedId);
      }
      if (setSearchParams) {
        setSearchParams((params: any) => {
          params.set("srt", selectedId);
          return params;
        });
      }
      if (callBcFn) {
        callBcFn(selectedId);
      }
    },
    itemToString: (item: any) => (item ? item.title : ""),
  });

  // تابع لتحويل حالة العرض عند الضغط
  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  // تابع لإخفاء القائمة عند فقدان التركيز
  const handleInputBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 100); // تأخير بسيط لتجنب إخفاء القائمة عند اختيار عنصر
  };

  return (
    <div className="relative">
      <input
        className={`flex outline-none rounded justify-between w-full px-2 items-center gap-1 ${
          light ? "bg-custome-venice" : "bg-custome-white"
        } w-full h-11 cursor-pointer ${selectedLocation ? "text-primary" : "text-custome-blue"}`}
        {...getInputProps({
          placeholder,
          onInput: (e) => setInputValue(e.currentTarget.value),
          onFocus: handleInputFocus, // إظهار القائمة عند التركيز
          onBlur: handleInputBlur, // إخفاء القائمة عند فقدان التركيز
        })}
      />

      {isDropdownVisible && (
        <ul
          {...getMenuProps()}
          style={{ maxHeight: "200px", overflowY: "auto" }}
          className="absolute top-full left-0 w-full z-10"
        >
          {isOpen && filteredData.length > 0 ? (
            filteredData.map((location: any, index: any) => (
              <li
                {...getItemProps({ item: location, index })}
                key={location.id}
                style={{
                  backgroundColor: highlightedIndex === index ? "lightgray" : "white",
                }}
              >
                {location.title}
              </li>
            ))
          ) : (
            <li>{NotFoundMessage}</li>
          )}
        </ul>
      )}
    </div>
  );
}
