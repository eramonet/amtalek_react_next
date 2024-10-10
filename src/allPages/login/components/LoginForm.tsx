"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import arlogoImg from "@/images/navArLogo.png";
import logoImg from "@/images/navEnLogo.png";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePostData } from "@/Hooks/useAxios";
import { setShowLoginPopUp, setUserData, userData } from "@/Store/Features/AuthenticationSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ReCaptcha from "@/components/ReCaptcha";
import { EmailComponent, PasswordComponent, SubmitBtnComponent } from "@/FormComponents";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";
import Cookies from "js-cookie";

export default function LoginForm({ loginDispatch }: any) {
  const { t, i18n } = useTranslation("Pages_Login");
  const user = useSelector(userData);
  const router = useRouter();
  const [emaile, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loggedInSuccess, setLoggedInSuccess] = useState(false);
  const recaptchaRef: any = useRef(null);
  const dispatchRedux = useDispatch();
  const { mutate: requestNewCode }: any = usePostData(
    false,
    () => {},
    false,
    () => {}
  );

  let validations = {};
  // const router = useRouter();
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
      email: "",
      password: "",
      not_ropot: "no",
      created_from: "web",
      // operation_type: "forget_password",
    },
  });
  const not_ropot = watch("not_ropot");
  const email = watch("email");
  const {
    data,
    mutate: postLoginData,
    isLoading,
    error: ServerErrors,
  }: any = usePostData(
    true,
    (data) => {
      localStorage.setItem("userData", JSON.stringify(data?.data));
      Cookies.set("userData", JSON.stringify(data?.data), { expires: 7 });
      Cookies.set("token", data?.data?.token, { expires: 7 });
      dispatchRedux(setUserData(data?.data));
      recaptchaRef.current.reset();
      setValue("not_ropot", "no");
      reset();

      dispatchRedux(setShowLoginPopUp(false));
      setSubmitted(false);
      setLoggedInSuccess(true);
      // data && data?.data?.data?.has_package === "no" && router.replace("/");
      data && data?.data?.data?.has_package === "no" && window.location.replace("/");
    },
    false,
    (error) => {
      if (error?.response?.data?.message === "Please Verify Code") {
        requestNewCode({
          api: process.env.NEXT_PUBLIC_SEND_CODE_TO_EMAIL,
          data: {
            email: email,
            not_ropot: "no",
            created_from: "web",
            operation_type: "verify_code",
          },
          file: undefined,
        });
        loginDispatch({
          type: "setCodeNotVerified",
          payload: true,
        });
        loginDispatch({
          type: "setEmail",
          payload: getValues("email"),
        });
      }
    }
  );

  const onSubmit = useCallback(
    (data: any) => {
      setSubmitted(true);
      postLoginData({
        api: "login",
        data: data,
        file: undefined,
      });
    },
    [postLoginData]
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
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="register--form ss:my-auto  w-full px-8 h-full  flex flex-col items-start justify-start gap-6  py-2 overflow-y-auto overflow-x-hidden"
    >
      <Link href="/" className="logo  w-36 max-w-[144px] min-w-[144px] mx-auto">
        <Image
          height={757}
          width={2928}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          src={i18n.language?.startsWith("ar") ? arlogoImg : logoImg}
          alt="Amtalek"
          className="h-full w-full cursor-pointer"
        />
      </Link>
      <h1 className=" text-2xl font-medium  text-center w-full mb-4">{t("LoginForm.heading")}</h1>
      <div className="flex w-full items-start justify-between gap-16 clg:gap-10  md:flex-col md:gap-6">
        {/** Email  */}

        <EmailComponent
          t={t}
          register={register}
          name="email"
          label={t("LoginForm.email.label")}
          placeholder={t("LoginForm.email.placeholder")}
          errors={errors}
          ServerErrors={ServerErrors}
        />
        {/** Password  */}
        <PasswordComponent
          t={t}
          register={register}
          name="password"
          label={t("LoginForm.password.label")}
          placeholder={t("LoginForm.password.placeholder")}
          errors={errors}
          ServerErrors={ServerErrors}
        />
      </div>
      {/** Remember me & forget password  */}
      <div className="flex w-full items-start justify-between gap-16 clg:gap-10 md:flex-col md:gap-6">
        <div className=" flex w-fit  items-center justify-center gap-5 ">
          <div className="checkbox-wrapper">
            <div className="cbx">
              <input
                id="remember_me"
                className="signin-inputs w-full"
                type="checkbox"
                name="remember_me"
              />
              <label htmlFor="remember_me"></label>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M2 8.36364L6.23077 12L13 2"></path>
              </svg>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="goo-12">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="4"
                    result="blur"
                  ></feGaussianBlur>
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

          <label className="w-fit  cursor-pointer" htmlFor="remember_me">
            {t("LoginForm.remember_me.label")}
          </label>
        </div>

        <div
          onClick={() =>
            loginDispatch({
              type: "setForgotPassword",
              payload: true,
            })
          }
          className="relative group cursor-pointer  h-7 flex flex-col justify-start "
        >
          {t("LoginForm.Forgot_password")}
          <hr className=" border-[0px] border-secondary w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
        </div>
      </div>
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
        disabled={not_ropot === "no" || isLoading}
        isLoading={isLoading}
        value={t("LoginForm.SubmitBtnComponent.value")}
      />
      <p className="w-full flex justify-center items-center gap-1 text-sm -mt-2">
        {t("LoginForm.login__providers.have_no_account")}
        <Link href="/register" className="font-medium text-base cursor-pointer">
          {t("LoginForm.login__providers.register")}{" "}
        </Link>
      </p>
      {/* <Link href="/" className="logo w-36 max-w-[144px] min-w-[144px] mx-auto">
        <Image
          height={757}
          width={2928}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          src={i18n.language?.startsWith("ar") ? arlogoImg : logoImg}
          alt="Amtalek"
          className="h-full w-full cursor-pointer"
        />
      </Link>
      <h1 className="text-2xl font-medium text-center w-full mb-4">{t("LoginForm.heading")}</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          البريد الإلكتروني
        </label>
        <input
          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="email"
          id="email"
          placeholder="أدخل بريدك الإلكتروني"
          autoComplete="on"
          {...register("email", {
            required: "البريد الإلكتروني مطلوب",
            pattern: {
              value: /^[A-z][A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "البريد الإلكتروني غير صحيح",
            },
          })}
          name="email"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          كلمة المرور
        </label>
        <input
          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="password"
          id="password"
          placeholder="أدخل كلمة المرور"
          autoComplete="on"
          {...register("password", {
            required: "كلمة المرور مطلوبة",
            minLength: {
              value: 6,
              message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف",
            },
            // يمكن إضافة المزيد من قواعد التحقق حسب الحاجة
          })}
          name="password"
        />
      </div> */}

      {/*  */}
      {/* <ReCaptcha
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
      /> */}
      {/*  */}
      {/* <button
        // disabled={not_ropot === "no" || isLoading}
        disabled={!isValid || not_ropot === "no" || isLoading}
        type="submit"
        className="light-bg-submit mt-6  w-full"
      >
        تسجيل الدخول
      </button> */}
    </form>
  );
}
