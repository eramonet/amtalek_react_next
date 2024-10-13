import getData from "@/api/getData";
import { Privacy } from "@/SubPages/Privacy";
import React from "react";

export default async function PrivacyPage({ params: { locale } }: any) {
  const AllData = await getData(`web/${process.env.NEXT_PUBLIC_TERMS}`, locale);
  const data = AllData?.data;
  return <Privacy data={data} />;
}
