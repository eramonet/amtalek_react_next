// "use client";
import { userData } from "@/Store/Features/AuthenticationSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default async function useUserProfile() {
  const { i18n } = useTranslation();
  const user = useSelector(userData);
  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState([]);

  // async function getUserProfile() {
  try {
    const response = await fetch(
      `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Accept-Language": i18n.language,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const dataProfile = await response.json();
    // console.log(dataProfile);

    setUserProfileDataOutlet(dataProfile?.data);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
  // }

  // useEffect(() => {
  // if (user?.token && i18n.language) {
  // getUserProfile();
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // }, [user?.token, i18n.language]);

  return userProfileDataOutlet;
}
