import { setUserProfileData, userData } from "@/Store/Features/AuthenticationSlice";
import useHandleLogOut from "@/Utilities/useHandleLogOut";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const axiosInstance = axios.create({
  baseURL: "https://amtalek.com/amtalekadmin/public/api/web/",
});

export const useFetchData = (
  identifier: any,
  api: any,
  showToasts = false,
  select = false,
  id = "",
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  authorizedAPI = false,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
  addToken = false
) => {
  const dispatchRedux = useDispatch();
  const user = useSelector(userData);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [logOut] = useHandleLogOut();

  const options: UseQueryOptions<any, any> & { onSuccess: (data: any) => void } & {
    onError: (data: any) => void;
  } = {
    queryKey: [identifier, id],
    queryFn: () => fetcherFunction({ api, authorizedAPI, user, lang, addToken }),
    onSuccess: (data: any) => {
      if (identifier === "userDataProf") {
        dispatchRedux(setUserProfileData(data));
      }
      if (showToasts) {
        toast.success(data.message);
      }
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any) => {
      if (showToasts) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
      console.error("Error from custom hook", identifier, error, api);
      if (error?.response?.status === 404) {
        location.replace(`${i18n.language.startsWith("ar") ? "" : "/en"}/not-found`);
      }
      if (authorizedAPI && error?.response?.status === 401) {
        location.replace(`${i18n.language.startsWith("ar") ? "" : "/en"}`);
        logOut();
      }
      if (onError) {
        onError(error);
      }
    },
    select: (data: any) => {
      return select ? data[0] : data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled,
    // cacheTime: cacheTime, // تأكد من تضمينها هنا
    staleTime: staleTime, // تأكد من تضمينها هنا
    retry: 2,
  };

  return useQuery(options);
};

async function fetcherFunction({
  api,
  authorizedAPI,
  user,
  lang,
  addToken,
}: {
  api: any;
  authorizedAPI: boolean;
  user: any;
  lang: string;
  addToken: boolean;
}) {
  try {
    const headers: any = {
      "Accept-Language": lang,
    };

    if (authorizedAPI && addToken) {
      headers.Authorization = `Bearer ${user.token}`;
    }

    const response = await fetch(api, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetcher function error:", error);
    throw error;
  }
}

// const fetcherFunction = async ({ api, authorizedAPI, user, lang, addToken }: any) => {
//   const headers = user?.token
//     ? {
//         Authorization: `Bearer ${user?.token}`,
//         "Content-Type": "application/json",
//         lang: lang,
//       }
//     : {
//         "Content-Type": "application/json",
//         lang: lang,
//       };
//   const res = await axiosInstance.get(api, {
//     headers: headers,
//   });
//   return res.data?.data;
// };
