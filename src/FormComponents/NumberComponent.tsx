import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NumberComponent({
  register,
  name,
  label = "",
  placeholder,
  required = true,
  validations = {},
  errors,
  ServerErrors,
  width = "w-1/2 md:w-full",
  inputStyle,
  dir,
  value,
  Bgcolor = "light",
  alignment = "vertical",
  withIcon,
  icon,
  t,
}: any) {
  return (
    <label
      className={` flex ${width}  ${
        alignment === "vertical"
          ? "flex-col gap-2 items-start "
          : "gap-16 items-center md:flex-col md:gap-2 md:items-start"
      } justify-center  relative `}
      htmlFor={name}
    >
      {withIcon && (
        <FontAwesomeIcon
          className=".input__icon w-4  absolute left-3 rtl:left-auto rtl:right-3 top-[13px] opacity-50"
          icon={icon === "offer" ? faCommentDollar : ""}
        />
      )}
      {label && (
        <h3
          className={`text-lg ${
            alignment === "vertical" ? "min-w-fit " : "min-w-[210px] truncate"
          } `}
        >
          {label}
        </h3>
      )}
      <div className="flex-col items-start  justify-center gap-2 w-full ">
        <input
          dir={dir}
          className={`w-full ${
            withIcon && "pl-9 focus:pl-[37.5px] rtl:pl-0 rtl:pr-9 rtl:focus:pr-[37.5px]"
          } ${Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"}  ${inputStyle}`}
          type="text"
          inputMode="numeric"
          id={name}
          placeholder={placeholder}
          name={name}
          autoComplete="on"
          {...register(`${name}`, {
            required: required,
            pattern: /^[0-9]+$/,
            min: 0,
            ...validations,
          })}
        />
        {/**translations will be t(`${name.required}`) */}
        {errors[name] && (
          <p className="pt-2 text-xs text-red-500">
            {errors[name].type === "required" && t(`validations.${name}.required`)}
            {(errors[name].type === "pattern" || errors[name].type === "min") &&
              t([`validations.${name}.pattern`, `validations.${name}.min`])}
          </p>
        )}

        {
          //!--- server errors --------
          ServerErrors?.response?.data?.errors && ServerErrors?.response?.data?.errors[name] && (
            <p className="pt-2 text-xs text-red-500">
              {ServerErrors?.response?.data?.errors &&
                ServerErrors?.response?.data?.errors[name][0]}
            </p>
          )
        }
      </div>
    </label>
  );
}

export default NumberComponent;
