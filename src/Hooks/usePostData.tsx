"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "@/Store/Features/AuthenticationSlice";

const axiosInstance = axios.create({
  baseURL: "https://amtalek.com/amtalekadmin/public/api/web/",

  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  withCredentials: true,
  withXSRFToken: true,
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
