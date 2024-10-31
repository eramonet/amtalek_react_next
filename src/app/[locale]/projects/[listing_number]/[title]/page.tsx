import LoginPopUp from "@/allPages/login/LoginPopUp";
import ProjectDetails from "@/allPages/project/ProjectDetails/ProjectDetails";
import React from "react";
// import { Metadata } from "next";
import getData from "@/api/getData";

// جلب البيانات لجميع المشاريع لكل لغة لإنشاء الصفحات الثابتة

export default async function ProjectsDetailsPage({ params: { locale, listing_number } }: any) {
  const data = await getData(`web/project-details/${listing_number}`, locale);
  const allData = data?.data[0];

  return (
    <>
      <main className="min-h-[calc(100vh-136px)]">
        <div className="site_container text-custome-blue flex justify-between items-start gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
          <LoginPopUp />
          <ProjectDetails listing_number={listing_number} locale={locale} data={allData} />
        </div>
      </main>
    </>
  );
}
