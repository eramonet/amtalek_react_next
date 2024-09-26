// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Command,
//   CommandInput,
//   CommandList,
//   CommandItem,
//   CommandEmpty,
//   CommandGroup,
// } from "shadcn-ui";

// export default function ComboBox({
//   width = "w-full",
//   setValue,
//   setSearchParams,
//   stateName,
//   placeholder,
//   data = [],
//   light,
//   NotFoundMessage = "No data found",
//   callBcFn,
// }: any) {
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [inputValue, setInputValue] = useState("");
//   const [filteredData, setFilteredData] = useState(data);

//   // تصفية البيانات بناءً على المدخلات
//   useEffect(() => {
//     setFilteredData(
//       data.filter((item: any) => item.title.toLowerCase().includes(inputValue.toLowerCase()))
//     );
//   }, [inputValue, data]);

//   // عند تغيير العنصر المختار
//   const handleSelectedItemChange = (selectedItem: any) => {
//     const selectedId = selectedItem?.id;
//     setSelectedLocation(selectedItem?.title || "");
//     if (setValue) {
//       setValue(stateName, selectedId);
//     }
//     if (setSearchParams) {
//       setSearchParams((params: any) => {
//         params.set("srt", selectedId);
//         return params;
//       });
//     }
//     if (callBcFn) {
//       callBcFn(selectedId);
//     }
//   };

//   return (
//     <div className={`relative ${width}`}>
//       <Command>
//         <CommandInput
//           placeholder={placeholder}
//           value={inputValue}
//           onValueChange={setInputValue}
//           className={`flex outline-none rounded justify-between px-2 items-center gap-1 ${
//             light ? "bg-custome-venice" : "bg-custome-white"
//           } w-full h-11 cursor-pointer ${selectedLocation ? "text-primary" : "text-custome-blue"}`}
//         />
//         <CommandList style={{ maxHeight: "200px", overflowY: "auto" }}>
//           {filteredData.length > 0 ? (
//             <CommandGroup>
//               {filteredData.map((location: any, index: any) => (
//                 <CommandItem key={location.id} onSelect={() => handleSelectedItemChange(location)}>
//                   {location.title}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           ) : (
//             <CommandEmpty>{NotFoundMessage}</CommandEmpty>
//           )}
//         </CommandList>
//       </Command>
//     </div>
//   );
// }
