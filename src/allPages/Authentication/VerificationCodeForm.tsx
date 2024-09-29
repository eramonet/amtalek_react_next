import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReCaptcha, SubmitBtnComponent, TextComponent } from "@/FormComponents";
import { usePostData } from "@/Hooks/useAxios";
import { useTranslation } from "react-i18next";

function VerificationCodeForm({ loginDispatch, from, email, t, heading }: any) {
  const [submitted, setSubmitted] = useState(false);
  const recaptchaRef = useRef<any>(null);
  const { i18n } = useTranslation("");

  const lang = i18n.language?.startsWith("ar") ? "" : "/en";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      code: "",
      not_ropot: "no",
      created_from: "web",
      operation_type: from ? "verify_code" : "forget_password ",
      email: email,
    },
  });
  const not_ropot = watch("not_ropot");

  const {
    mutate: postCheckCode,
    isLoading,
    error: ServerErrors,
  }: any = usePostData(true, () => {
    recaptchaRef.current.reset();

    setValue("not_ropot", "no");
    if (from === "register") {
      navigate(`${lang}/login`, { replace: true });
    } else if (from === "login") {
      loginDispatch({
        type: "setCodeNotVerified",
        payload: false,
      });
      //navigate(`/${lang}/login`, { replace: true });
    } else {
      //!--this case for showing the update password form if the user enters a valid code
      loginDispatch({
        type: "setCodeVerifiedSuccess",
        payload: true,
      });
      loginDispatch({
        type: "setCode",
        payload: getValues("code"),
      });
    }
    reset();
    setSubmitted(false);
  });

  const onSubmit = useCallback(
    (data: any) => {
      setSubmitted(true);
      postCheckCode({
        api: process.env.VITE_CHECK_CODE,
        data: data,
      });
    },
    [postCheckCode]
  );

  const onChange = useCallback(
    (value: any) => {
      if (value) {
        setValue("not_ropot", "yes");
      } else {
        setValue("not_ropot", "no");
      }
    },
    [setValue]
  );

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="register--form  w-full px-8 h-full  flex flex-col items-start justify-start gap-6  py-2 overflow-y-auto"
    >
      <h1 className=" text-xl font-medium  text-center w-full mb-4">{heading}</h1>

      {/** Verification Code  */}

      <TextComponent
        t={t}
        register={register}
        width={"w-full"}
        name="code"
        label={t("VerificationCodeForm.code.label")}
        placeholder={t("VerificationCodeForm.code.placeholder")}
        errors={errors}
        ServerErrors={ServerErrors}
        validations={{
          pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?\s]*$/,
        }}
      />

      <ReCaptcha
        t={t}
        refs={recaptchaRef}
        onChange={onChange}
        error={submitted && not_ropot === "no"}
        ServerError={
          ServerErrors?.response?.data?.errors?.not_ropot &&
          ServerErrors?.response?.data?.errors?.not_ropot[0]
            ? ServerErrors?.response?.data?.errors?.not_ropot[0]
            : null
        }
      />
      {/** Submit Button */}

      <SubmitBtnComponent
        disabled={!isValid || not_ropot === "no" || isLoading}
        isLoading={isLoading}
        value={t("VerificationCodeForm.SubmitBtnComponent.value")}
      />
      <div className="w-full flex justify-center"></div>
    </form>
  );
}
export default VerificationCodeForm;
