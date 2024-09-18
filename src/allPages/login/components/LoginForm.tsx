"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import arlogoImg from "@/images/navArLogo.png";
import logoImg from "@/images/navEnLogo.png";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePostData } from "@/Hooks/uesAxios";
import { setShowLoginPopUp, setUserData, userData } from "@/Store/Features/AuthenticationSlice";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm({ loginDispatch }: any) {
  const { t, i18n } = useTranslation("Pages_Login");
  const user = useSelector(userData);

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
      not_ropot: "yes",
      created_from: "web",
      // operation_type: "forget_password",
    },
  });
  // console.log(email);
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
      data && data?.data?.data?.has_package === "no" && location.replace("/packages");

      localStorage.setItem("userData", JSON.stringify(data?.data));
      dispatchRedux(setUserData(data?.data));
      recaptchaRef.current.reset();
      setValue("not_ropot", "yes");
      reset();

      dispatchRedux(setShowLoginPopUp(false));
      setSubmitted(false);
      setLoggedInSuccess(true);
    },
    false,
    (error) => {
      if (error?.response?.data?.message === "Please Verify Code") {
        requestNewCode({
          api: process.env.NEXT_PUBLIC_SEND_CODE_TO_EMAIL,
          data: {
            email: email,
            not_ropot: "yes",
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
  // console.log(handleSubmit(onSubmit));

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
  // console.log(email);

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="register--form ss:my-auto w-full px-8 h-full flex flex-col items-start justify-start gap-6 py-2 overflow-y-auto overflow-x-hidden"
    >
      <Link href="/" className="logo w-36 max-w-[144px] min-w-[144px] mx-auto">
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
      </div>

      <button
        // disabled={not_ropot === "no" || isLoading}
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        تسجيل الدخول
      </button>
    </form>
  );
}
