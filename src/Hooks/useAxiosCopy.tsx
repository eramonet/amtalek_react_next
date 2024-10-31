// /* eslint-disable react-hooks/exhaustive-deps */
// import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// // import { userData, setUserProfileData } from "../../Store/Features/AuthenticationSlice.tsx";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { setUserProfileData, userData } from "@/Store/Features/AuthenticationSlice";
// import { useHandleLogOut } from "@/Utilities";
// import { useEffect } from "react";
// // import useHandleLogOut from "../../Utilities/useHandleLogOut.tsx";
// // import { setADSData } from "../../Store/Features/ADS.tsx";

// const axiosInstance = axios.create({
//   baseURL: "https://amtalek.com/amtalekadmin/public/api/web/",
// });

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

// export const useFetchData = (
//   identifier: any,
//   api: any,
//   showToasts = false,
//   select = false,
//   id = "",
//   cacheTime = 5000,
//   staleTime = 0,
//   enabled = true,
//   authorizedAPI = false,
//   onSuccess: any,
//   onError: any,
//   addToken = false
// ) => {
//   const dispatchRedux = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(userData);
//   const { i18n } = useTranslation("");
//   const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
//   const [logOut] = useHandleLogOut();

//   const query = useQuery([identifier, id], () =>
//     fetcherFunction({ api, authorizedAPI, user, lang, addToken })
//   );

//   useEffect(() => {
//     if (query.isSuccess) {
//       const data: any = query.data;
//       if (identifier === "userDataProf") {
//         dispatchRedux(setUserProfileData(data));
//       }
//       showToasts && toast.success(data.message);
//       onSuccess && onSuccess();
//     }

//     if (query.isError) {
//       const error: any = query.error;
//       showToasts && toast.error(error?.response?.data?.message || "Something Wrong has happened!");
//       if (error?.response?.status === 404) {
//         navigate(`${i18n.language.startsWith("ar") ? "" : "/en"}/not-found`);
//       }
//       if (authorizedAPI && error?.response?.status === 401) {
//         navigate(`${i18n.language.startsWith("ar") ? "" : "/en"}`, { replace: true });
//         logOut();
//       }
//     }
//   }, [query.isSuccess, query.isError, query.data, query.error]);

//   // return useQuery(
//   //   [identifier, id],
//   //   () => fetcherFunction({ api, authorizedAPI, user, lang, addToken }),
//   //   {
//   //     onSuccess: (data: any) => {
//   //       if (identifier === "userDataProf") {
//   //         dispatchRedux(setUserProfileData(data));
//   //       }
//   //       showToasts && toast.success(data.message);
//   //       onSuccess && onSuccess();
//   //     },
//   //     onError: (error: any) => {
//   //       showToasts &&
//   //         toast.error(error?.response?.data?.message || "Something Wrong has happened!");
//   //       "error from custom hook", identifier, error, api;
//   //       error?.response?.status === 404 &&
//   //         navigate(`${i18n.language.startsWith("ar") ? "" : "/en"}/not-found`);
//   //       if (authorizedAPI && error?.response?.status === 401) {
//   //         navigate(`${i18n.language.startsWith("ar") ? "" : "/en"}`, { replace: true });
//   //         logOut();
//   //       }
//   //     },
//   //     select: (data: any) => {
//   //       return select ? data[0] : data;
//   //     },
//   //     refetchOnMount: false,
//   //     refetchOnWindowFocus: false,
//   //     enabled: enabled,
//   //     cacheTime: cacheTime,
//   //     staleTime: staleTime,
//   //     retry: 2,
//   //   }
//   // );
// };

// export const useFetchPaginatedData = (
//   identifier: string,
//   id = "",
//   api: any,
//   showToasts = false,
//   cacheTime = 500000,
//   staleTime = 0,
//   enabled = true,
//   authorizedAPI = false,
//   addToken: any
// ) => {
//   const user = useSelector(userData);
//   const navigate = useNavigate();
//   const { i18n } = useTranslation();
//   const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
//   const [logOut] = useHandleLogOut();

//   return useQuery({
//     queryKey: [identifier, id],
//     queryFn: () => fetcherFunction({ api, authorizedAPI, user, lang, addToken }),
//     onSuccess: (data: any) => {
//       showToasts && toast.success(data.message);
//     },
//     onError: (error: any) => {
//       showToasts && toast.error(error?.response?.data?.message || "Something Wrong has happened!");
//       if (authorizedAPI && error?.response?.status === 401) {
//         navigate(`${i18n.language.startsWith("ar") ? "" : "/en"}/login`, { replace: true });
//         logOut();
//       }
//     },
//     select: (data: any) => data?.original,
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

// export const usePostData = (
//   showToasts = false,
//   onSuccess: any,
//   authorizedAPI: any,
//   onError: any
// ) => {
//   const user = useSelector(userData);
//   const { i18n } = useTranslation("");
//   const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
//   const posterFunction: any = async ({ api, data, file }: any) => {
//     const ContentType = file ? "multipart/form-data" : "application/json";

//     const headers = user?.token
//       ? {
//           Authorization: `Bearer ${user?.token}`,
//           "Content-Type": ContentType,
//           lang: lang,
//         }
//       : {
//           "Content-Type": ContentType,
//           lang: lang,
//         };
//     const options = {
//       url: api,
//       method: "POST",
//       headers: headers,
//       data: data,
//     };

//     const res = await axiosInstance(options);
//     return res.data;
//   };
//   const navigate = useNavigate();

//   return useMutation(posterFunction, {
//     onSuccess: (data: any) => {
//       showToasts && toast.success(data.message);
//       onSuccess && onSuccess(data);
//     },
//     onError: (error: any) => {
//       onError && onError(error);
//       showToasts && toast.error(error?.response?.data?.message || "Something Wrong has happened!");
//       authorizedAPI &&
//         error?.response?.status === 401 &&
//         navigate(`${i18n.language.startsWith("ar") ? "" : "/en"}/login`, { replace: true });
//     },
//   });
// };

// // ************************************************************************************************

// // ads
