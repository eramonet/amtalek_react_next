"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import AddonsPayment from "@/allPages/Packages/AddonsPayment";
import useUserProfile from "@/api/useUserProfile";
import React from "react";

export default function AddonsPaymentpage({ params: { locale } }: any) {
  // const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  // userProfileDataOutlet={userProfileDataOutlet} user={userData}
  return <AddonsPayment  />;
}
