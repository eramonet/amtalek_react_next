// "use client"
// import { useCallback, useReducer, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import VerificationCodeForm from "./VerificationCodeForm";
// import UpdatePasswordForm from "./UpdatePasswordForm";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setUserData,
//   setShowLoginPopUp,
//   registrationUserType,
//   userData,
// } from "@/Store/Features/AuthenticationSlice";
// import { useTranslation } from "react-i18next";
// // import HelmetTags from "@/Components/MainComponents/HelmetTags";
// import {
//   EmailComponent,
//   ReCaptcha,
//   SubmitBtnComponent,
//   PasswordComponent,
// } from "@/Components/FormComponents/index";
// import { usePostData } from "@/Components/Hooks/useAxios";
// import LangLink from "@/Components/MainComponents/LangLink";
// import logoImg from "/assets/images/navEnLogo.png";
// import arlogoImg from "/assets/images/navArLogo.png";
// function SendCodeForm({ loginDispatch, t }:any) {
//   const [submitted, setSubmitted] = useState(false);
//   const recaptchaRef = useRef(null);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     reset,
//     setValue,
//     getValues,
//     watch,
//   } = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       email: "",
//       not_ropot: "no",
//       created_from: "web",
//       operation_type: "forget_password",
//     },
//   });
//   const not_ropot = watch("not_ropot");

//   const {
//     mutate: postSendCodeData,
//     isLoading,
//     error: ServerErrors,
//   } = usePostData(true, () => {
//     recaptchaRef.current.reset();

//     setValue("not_ropot", "no");
//     loginDispatch({
//       type: "setCodeSentSuccess",
//       payload: true,
//     });
//     loginDispatch({
//       type: "setEmail",
//       payload: getValues("email"),
//     });
//     reset();
//     setSubmitted(false);
//   });

//   const onSubmit = useCallback(
//     (data) => {
//       setSubmitted(true);
//       postSendCodeData({
//         api: import.meta.env.VITE_SEND_CODE_TO_EMAIL,
//         data: data,
//       });
//     },
//     [postSendCodeData]
//   );

//   const onChange = useCallback(
//     (value) => {
//       if (value) {
//         setValue("not_ropot", "yes");
//       } else {
//         setValue("not_ropot", "no");
//       }
//     },
//     [setValue]
//   );

//   return (
//     <form
//       method="post"
//       onSubmit={handleSubmit(onSubmit)}
//       className="register--form  w-full px-8 full  flex flex-col items-start justify-start gap-6  py-2 overflow-y-auto"
//     >
//       <h1 className=" text-xl font-medium  text-center w-full mb-4">{t("SendCodeForm.heading")}</h1>
//       {/** Email  */}
//       <EmailComponent
//         t={t}
//         width={"w-full"}
//         register={register}
//         name="email"
//         label={t("SendCodeForm.email.label")}
//         placeholder={t("SendCodeForm.email.placeholder")}
//         errors={errors}
//         ServerErrors={ServerErrors}
//       />
//       <ReCaptcha
//         t={t}
//         refs={recaptchaRef}
//         onChange={onChange}
//         error={submitted && not_ropot === "no"}
//         ServerError={
//           ServerErrors?.response?.data?.errors?.not_ropot &&
//           ServerErrors?.response?.data?.errors?.not_ropot[0]
//             ? ServerErrors?.response?.data?.errors?.not_ropot[0]
//             : null
//         }
//       />
//       {/** Submit Button */}
//       <SubmitBtnComponent
//         disabled={!isValid || not_ropot === "no" || isLoading}
//         isLoading={isLoading}
//         value={t("SendCodeForm.SubmitBtnComponent.value")}
//       />
//       <div className="w-full flex justify-center">
//         <p
//           onClick={() =>
//             loginDispatch({
//               type: "setForgotPassword",
//               payload: false,
//             })
//           }
//           className="w-fit flex justify-center items-center cursor-pointer gap-1 text-sm"
//         >
//           {t("SendCodeForm.Return_to_login")}
//         </p>
//       </div>
//     </form>
//   );
// }
// function LoginForm({ loginDispatch, t }) {
//   const { i18n } = useTranslation("");

//   const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
//   const [submitted, setSubmitted] = useState(false);
//   const [loggedInSuccess, setLoggedInSuccess] = useState(false);
//   const UserType = useSelector(registrationUserType);

//   const recaptchaRef = useRef(null);

//   const dispatchRedux = useDispatch();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     reset,
//     setValue,
//     getValues,
//     watch,
//   } = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       email: "",
//       password: "",
//       not_ropot: "no",
//       lang: "en",
//       created_from: "web",
//     },
//   });
//   const user = useSelector(userData);
//   const not_ropot = watch("not_ropot");
//   const email = watch("email");
//   const { mutate: requestNewCode } = usePostData();

//   const {
//     data: userfrom,
//     mutate: postLoginData,
//     isLoading,
//     error: ServerErrors,
//   } = usePostData(
//     true,
//     (data) => {
//       data && data?.data?.data?.has_package === "no" && navigate("/packages");

//       localStorage.setItem("userData", JSON.stringify(data?.data));
//       //*the navigate doesnt work from on success, whereas we set the local storage and dispatch with the user data, so th component will rerender then detect that there is a user or token so it will redirect to the homepage from the protected route redirectPath and wont take in considration the navigate whereas it will redirect before navigating
//       dispatchRedux(setUserData(data?.data));
//       recaptchaRef.current.reset();
//       setValue("not_ropot", "no");
//       reset();
//       //! if the popup was open before signing in from any way, we need to close it
//       dispatchRedux(setShowLoginPopUp(false));
//       setSubmitted(false);
//       setLoggedInSuccess(true);
//     },
//     false,
//     (error) => {
//       if (error?.response?.data?.message === "Please Verify Code") {
//         requestNewCode({
//           api: import.meta.env.VITE_SEND_CODE_TO_EMAIL,
//           data: {
//             email: email,
//             not_ropot: "yes",
//             created_from: "web",
//             operation_type: "verify_code",
//           },
//           file: undefined,
//         });
//         loginDispatch({
//           type: "setCodeNotVerified",
//           payload: true,
//         });
//         loginDispatch({
//           type: "setEmail",
//           payload: getValues("email"),
//         });
//       }
//     }
//   );

//   const onSubmit = useCallback(
//     (data: any) => {
//       setSubmitted(true);
//       postLoginData({
//         api: import.meta.env.VITE_LOGIN_USER,
//         data: data,
//         file: undefined,
//       });
//     },
//     [postLoginData]
//   );

//   const onChange = useCallback(
//     (value) => {
//       if (value) {
//         setValue("not_ropot", "yes");
//       } else {
//         setValue("not_ropot", "no");
//       }
//     },
//     [setValue]
//   );

//   return (
//     <form
//       method="post"
//       onSubmit={handleSubmit(onSubmit)}
//       className="register--form ss:my-auto  w-full px-8 h-full  flex flex-col items-start justify-start gap-6  py-2 overflow-y-auto overflow-x-hidden"
//     >
//       <LangLink to="/" className="logo  w-36 max-w-[144px] min-w-[144px] mx-auto">
//         <img
//           height={757}
//           width={2928}
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           src={i18n.language?.startsWith("ar") ? arlogoImg : logoImg}
//           alt="Amtalek"
//           className="h-full w-full cursor-pointer"
//         />
//       </LangLink>
//       <h1 className=" text-2xl font-medium  text-center w-full mb-4">{t("LoginForm.heading")}</h1>
//       <div className="flex w-full items-start justify-between gap-16 clg:gap-10  md:flex-col md:gap-6">
//         {/** Email  */}

//         <EmailComponent
//           t={t}
//           register={register}
//           name="email"
//           label={t("LoginForm.email.label")}
//           placeholder={t("LoginForm.email.placeholder")}
//           errors={errors}
//           ServerErrors={ServerErrors}
//         />
//         {/** Password  */}
//         <PasswordComponent
//           t={t}
//           register={register}
//           name="password"
//           label={t("LoginForm.password.label")}
//           placeholder={t("LoginForm.password.placeholder")}
//           errors={errors}
//           ServerErrors={ServerErrors}
//         />
//       </div>
//       {/** Remember me & forget password  */}
//       <div className="flex w-full items-start justify-between gap-16 clg:gap-10 md:flex-col md:gap-6">
//         <div className=" flex w-fit  items-center justify-center gap-5 ">
//           <div className="checkbox-wrapper">
//             <div className="cbx">
//               <input
//                 id="remember_me"
//                 className="signin-inputs w-full"
//                 type="checkbox"
//                 name="remember_me"
//               />
//               <label htmlFor="remember_me"></label>
//               <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
//                 <path d="M2 8.36364L6.23077 12L13 2"></path>
//               </svg>
//             </div>

//             <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//               <defs>
//                 <filter id="goo-12">
//                   <feGaussianBlur
//                     in="SourceGraphic"
//                     stdDeviation="4"
//                     result="blur"
//                   ></feGaussianBlur>
//                   <feColorMatrix
//                     in="blur"
//                     mode="matrix"
//                     values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
//                     result="goo-12"
//                   ></feColorMatrix>
//                   <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
//                 </filter>
//               </defs>
//             </svg>
//           </div>

//           <label className="w-fit  cursor-pointer" htmlFor="remember_me">
//             {t("LoginForm.remember_me.label")}
//           </label>
//         </div>

//         <div
//           onClick={() =>
//             loginDispatch({
//               type: "setForgotPassword",
//               payload: true,
//             })
//           }
//           className="relative group cursor-pointer  h-7 flex flex-col justify-start "
//         >
//           {t("LoginForm.Forgot_password")}
//           <hr className=" border-[0px] border-secondary w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
//         </div>
//       </div>
//       <ReCaptcha
//         t={t}
//         refs={recaptchaRef}
//         onChange={onChange}
//         error={submitted && not_ropot === "no"}
//         ServerError={
//           ServerErrors?.response?.data?.errors?.not_ropot &&
//           ServerErrors?.response?.data?.errors?.not_ropot[0]
//             ? ServerErrors?.response?.data?.errors?.not_ropot[0]
//             : null
//         }
//       />
//       {/** Submit Button */}
//       <SubmitBtnComponent
//         disabled={not_ropot === "no" || isLoading}
//         isLoading={isLoading}
//         value={t("LoginForm.SubmitBtnComponent.value")}
//       />
//       <p className="w-full flex justify-center items-center gap-1 text-sm -mt-2">
//         {t("LoginForm.login__providers.have_no_account")}
//         <LangLink to="/register" className="font-medium text-base cursor-pointer">
//           {t("LoginForm.login__providers.register")}{" "}
//         </LangLink>
//       </p>
//     </form>
//   );
// }

// function Login() {
//   const { t } = useTranslation("Pages_Login");

//   function reducer(state, action) {
//     switch (action.type) {
//       case "setForgotPassword": {
//         return {
//           ...state,
//           forgotPassword: action.payload,
//         };
//       }
//       case "setCodeSentSuccess": {
//         return {
//           ...state,
//           codeSentSuccess: action.payload,
//         };
//       }
//       case "setCodeVerifiedSuccess": {
//         return {
//           ...state,
//           codeVerifiedSuccess: action.payload,
//         };
//       }
//       case "setCodeNotVerified": {
//         return {
//           ...state,
//           codeNotVerified: action.payload,
//         };
//       }
//       case "setEmail": {
//         return {
//           ...state,
//           email: action.payload,
//         };
//       }
//       case "setCode": {
//         return {
//           ...state,
//           code: action.payload,
//         };
//       }

//       default:
//         throw Error("Unknown action: " + action.type);
//     }
//   }

//   const [state, dispatch] = useReducer(reducer, {
//     forgotPassword: false,
//     codeSentSuccess: false,
//     codeVerifiedSuccess: false,
//     codeNotVerified: false,
//     email: "",
//     code: "",
//   });
//   console.log(state.codeNotVerified);

//   return (
//     <>
//       {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}

//       {state.codeNotVerified ? (
//         //!--if the user tried to login but it hasn't verified it yet
//         <VerificationCodeForm
//           t={t}
//           from="login"
//           loginDispatch={dispatch}
//           email={state.email}
//           heading={t("VerificationCodeForm.heading_for_verify_account")}
//         />
//       ) : state.codeVerifiedSuccess ? (
//         <UpdatePasswordForm t={t} loginDispatch={dispatch} code={state.code} email={state.email} />
//       ) : state.codeSentSuccess ? (
//         <VerificationCodeForm
//           t={t}
//           loginDispatch={dispatch}
//           email={state.email}
//           heading={t("VerificationCodeForm.heading_for_reset_pass")}
//         />
//       ) : state.forgotPassword ? (
//         <SendCodeForm t={t} loginDispatch={dispatch} />
//       ) : (
//         <LoginForm t={t} loginDispatch={dispatch} />
//       )}
//     </>
//   );
// }

// export default Login;
