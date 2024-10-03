// import { userData } from "@/Store/Features/AuthenticationSlice";
// import { useHandleLogOut } from "@/Utilities";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";

// export const useFetchPaginatedData = (
//   identifier: string, // تأكد من أن identifier هو string
//   id = "",
//   api: string, // تأكد من أن api هو string
//   showToasts = false,
//   cacheTime = 500000,
//   staleTime = 0,
//   enabled = true,
//   authorizedAPI = false,
//   addToken: any = null // افتراض وجود قيمة افتراضية
// ) => {
//   const user = useSelector(userData);
//   const router = useRouter();
//   const { i18n } = useTranslation("");
//   const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
//   const [logOut] = useHandleLogOut();

//   return useQuery({
//     queryKey: [identifier, id],
//     queryFn: () => fetcherFunction({ api, authorizedAPI, user, lang, addToken }),
//     onSuccess: (data: any) => {
//       if (showToasts) {
//         toast.success(data.message, { duration: 4000 });
//       }
//     },
//     onError: (error: any) => {
//       if (showToasts) {
//         toast.error(error?.response?.data?.message || "Something Wrong has happened!", {
//           duration: 4000,
//         });
//       }
//       if (authorizedAPI && error?.response?.status === 401) {
//         logOut();
//       }
//     },
//     select: (data: any) => {
//       return data?.original;
//     },
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     enabled: enabled,
//     cacheTime: cacheTime,
//     refetchOnReconnect: true,
//     staleTime: staleTime,
//     retry: 1,
//     keepPreviousData: true,
//   });
// };

// async function fetcherFunction({
//   api,
//   authorizedAPI,
//   user,
//   lang,
//   addToken,
// }: {
//   api: string;
//   authorizedAPI: boolean;
//   user: any;
//   lang: string;
//   addToken: any;
// }): Promise<any> {
//   try {
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//       "Accept-Language": lang,
//     };

//     if (authorizedAPI && user?.token) {
//       headers["Authorization"] = `Bearer ${user.token}`;
//     }

//     if (addToken) {
//       headers["Add-Token"] = addToken;
//     }

//     const response = await fetch(api, {
//       method: "GET",
//       headers,
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
