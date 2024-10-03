"use client";
import Register from "./Register";
// import Login from "./Login";
// import Lottie from "react-lottie-player";
// import Link from "@/Components/MainComponents/Link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import LoginImage from "../login/components/LoginImage";
import LoginForm from "../login/components/LoginForm";
import { useReducer } from "react";

function LogInRegister({ type }: any) {
  const { i18n } = useTranslation();
  function reducer(state: any, action: any) {
    switch (action.type) {
      case "setForgotPassword": {
        return {
          ...state,
          forgotPassword: action.payload,
        };
      }
      case "setCodeSentSuccess": {
        return {
          ...state,
          codeSentSuccess: action.payload,
        };
      }
      case "setCodeVerifiedSuccess": {
        return {
          ...state,
          codeVerifiedSuccess: action.payload,
        };
      }
      case "setCodeNotVerified": {
        return {
          ...state,
          codeNotVerified: action.payload,
        };
      }
      case "setEmail": {
        return {
          ...state,
          email: action.payload,
        };
      }
      case "setCode": {
        return {
          ...state,
          code: action.payload,
        };
      }

      default:
        throw Error("Unknown action: " + action.type);
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    forgotPassword: false,
    codeSentSuccess: false,
    codeVerifiedSuccess: false,
    codeNotVerified: false,
    email: "",
    code: "",
  });
  return (
    <section className="w-full login_background bg-login-patter  h-screen md:min-h-screen md:overflow-y-auto bg- flex justify-center items-center ">
      <div className="illustration__form--wrapper site_container  h-[90%]  md:h-full  shadow-md flex flex-row-reverse  jus round overflow-hidden">
        <LoginImage locale={i18n.language} />
        <div className="forms__wrapper w-1/2 clg:w-full h-full flex flex-col items-center bg-bg gap- pt-5">
          {/* {type === "register" ? <Register /> : <LoginForm />} */}
          <Register />
        </div>
      </div>
    </section>
  );
}

export default LogInRegister;
