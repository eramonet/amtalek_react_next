// import { userData } from "@/Store/Features/AuthenticationSlice";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";

// export function UserProfileClient() {
//   const { i18n } = useTranslation();
//   const [userProfileDataOutlet, setUserProfileDataOutlet] = useState<any>([]);
//   const user = useSelector(userData);

//   async function getUserProfile(token: string, language: string) {
//     try {
//       const response = await fetch(
//         `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Accept-Language": language,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const dataProfile = await response.json();
//       setUserProfileDataOutlet(dataProfile?.data);

//       // تخزين البيانات في localStorage بعد استرجاعها بنجاح
//       localStorage.setItem("userProfileDataOutlet", JSON.stringify(dataProfile?.data));
//     } catch (error) {
//       console.error("Failed to fetch user profile:", error);
//     }
//   }

//   useEffect(() => {
//     if (user?.token && i18n.language) {
//       getUserProfile(user?.token, i18n.language);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user?.token, i18n.language]);

//   return { userProfileDataOutlet, user };
// }
