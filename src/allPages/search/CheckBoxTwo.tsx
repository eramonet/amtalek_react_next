import Image from "next/image";

function CheckBoxTwo({
  register,
  name,
  label,
  value,
  errors,
  ServerErrors,
  width = "",
  Bgcolor = "light",
  searchOption,
  formData,
  setFormData,
  handleInputChange,
  image,
}: any) {
  // console.log(image);

  return (
    <div
      className={`flex w-fit  items-center justify-center ${
        searchOption ? "gap-2" : "gap-5"
      }  bg- ${width}`}
    >
      {/* <Image src={image} width={1000} height={1000} alt="image" className="w-5 h-w-5" /> */}
      <div className="checkbox-wrapper">
        <div className="cbx">
          <input
            id={name}
            className="signin-inputs w-full"
            type="checkbox"
            name="amenities" // تحديث الاسم ليكون جزء من مصفوفة amenities
            value={value} // تمرير القيمة الفعلية للعنصر
            defaultChecked={formData?.amenities.includes(value)} // تأكد من أن العنصر محدد إذا كان موجوداً في المصفوفة
            onChange={handleInputChange}
          />

          {/* <input
            id={name}
            className="signin-inputs w-full"
            type="checkbox"
            name={name}
            defaultValue={value}
            value={formData.amenities} 
            onChange={handleInputChange}
            // {...register(`${name}`, { valueAsNumber: true })}
          /> */}
          <label htmlFor={name}></label>
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
          </svg>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo-12">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                result="goo-12"
              ></feColorMatrix>
              <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>

      <label
        className={`w-fit  cursor-pointer ${
          Bgcolor === "dark" ? "text-custome-white" : "text-custome-blue"
        } ${searchOption && " text-xs axs:text-base font-medium w-full"}`}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}

export default CheckBoxTwo;
