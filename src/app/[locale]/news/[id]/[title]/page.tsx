import NewsDetails from "@/allPages/News/NewsDetails";
import getData from "@/api/getData";
import React from "react";

export default async function NewsDetailspage({ params: { locale, id } }: any) {
  const respons = await getData(`web/${process.env.NEXT_PUBLIC_SINGLE_NEW_DETAILS}${id}`, locale);
  const data = await respons?.data[0];
  return (
    <>
      <NewsDetails data={data} />
    </>
  );
}
