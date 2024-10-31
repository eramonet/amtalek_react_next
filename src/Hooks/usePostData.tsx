"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "@/Store/Features/AuthenticationSlice";
import Cookies from "js-cookie";
// import express
// import express from "express";
// import cors from "cors";

// const app = express();

// app.use(cors({ origin: "https://localhost:5173", credentials: true }));

// function getCookie(name: any) {
//   function escape(s: any) {
//     return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, "\\$1");
//   }
//   let cookeStore: any = Cookies.get("userData");
//   var match =cookeStore? JSON.parse(cookeStore) : [];
//   return match ? match[1] : null;
// }

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_FULL}`,

  headers: {
    // "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "https://amtalek-react-next-f3rz-final.vercel.app",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Authorization, Accept",
    "Access-Control-Allow-Credentials": true,
    // origin: "https://amtalek-react-next-f3rz-final.vercel.app",

    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",

  // "Access-Control-Allow-Origin": "*",
  // xsrfHeaderName: "X-XSRF-TOKEN",
  // withXSRFToken: true,
});
interface PosterFunctionArgs {
  api: string;
  data: any;
  file?: File | null;
}

export const usePostData = (
  showToasts = false,
  onSuccess: (data: any) => void,
  authorizedAPI: boolean,
  onError: (error: any) => void
) => {
  const user = useSelector(userData);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  //   const router = typeof window !== "undefined" ? useRouter() : null;

  const posterFunction = async ({ api, data, file }: PosterFunctionArgs) => {
    const ContentType = file ? "multipart/form-data" : "application/json";

    const headers = user?.token
      ? {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": ContentType,
          lang: lang,
        }
      : {
          "Content-Type": ContentType,
          lang: lang,
        };

    const options = {
      url: api,
      method: "POST",
      headers: headers,
      data: data,
    };

    const res = await axiosInstance(options);
    return res.data;
  };

  return useMutation<any, Error, PosterFunctionArgs>({
    mutationFn: posterFunction,
    onSuccess: (data) => {
      if (showToasts) toast.success(data.message);
      if (onSuccess) onSuccess(data);
    },
    onError: (error: any) => {
      if (onError) onError(error);
      if (showToasts) {
        toast.error(error?.response?.data?.message || "Something Wrong has happened!");
      }
      if (authorizedAPI && error?.response?.status === 401) {
        // router.replace(`${i18n.language.startsWith("ar") ? "" : "/en"}/login`);
      }
    },
  });
};
