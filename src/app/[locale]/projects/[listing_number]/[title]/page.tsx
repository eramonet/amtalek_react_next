// import PropertyAside from "@/allPages/PropertyDetails/aside/PropertyAside";
// import PropertyDetails from "@/allPages/PropertyDetails/PropertyDetails";
// import { ProjectDetails } from "@/allPages/project/ProjectDetails/ProjectDetails";
import LoginPopUp from "@/allPages/login/LoginPopUp";
import ProjectDetails from "@/allPages/project/ProjectDetails/ProjectDetails";
import React from "react";
import { Metadata } from "next";
import getData from "@/api/getData";
// import { useRouter } from "next/router";
// const router = useRouter();
export const metadata: Metadata = {
  title: "Acme Dashboard",
  description: "The official Next.js Course Dashboard, built with App Router.",
  // metadataBase: new URL(router.pathname),
};

export default async function ProjectsDetailsPage({ params: { locale, listing_number } }: any) {
  const data = await getData(`web/project-details/${listing_number}`, locale);
  const allData = data?.data[0];
  return (
    <>
      <main className="min-h-[calc(100vh-136px)]">
        <div className="site_container text-custome-blue flex justify-between items-start pt-20 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
          {/* <PropertyDetails locale={locale} listing_number={listing_number} /> */}

          {/* <PropertyAside locale={locale} listing_number={listing_number} /> */}
          <LoginPopUp />

          <ProjectDetails listing_number={listing_number} locale={locale} data={allData} />
        </div>
      </main>
    </>
  );
}
