import getData from "@/api/getData";
import { About } from "@/SubPages/About";
import { Privacy } from "@/SubPages/Privacy";
import React from "react";

export default async function AboutPage({ params: { locale } }: any) {
  const AllData = await getData(`web/about`, locale);
  const data = AllData?.data;
  return <About data={data} />;
}
