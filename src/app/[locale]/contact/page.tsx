"use client"
import Agencies from "@/allPages/Agencies/Agencies";
import ContactUs from "@/allPages/contactUs/ContactUs";
import SliderAgencies from "@/allPages/landingPage/agencies/components/SliderAgencies";
import getData from "@/api/getData";
// import Login from "@/allPages/login/Login";
// import ContactUs from "@/SubPages/ContactUs";

export default async function ContactPage({ params: { locale } }: any) {
  return (
    <main className="site_container pt-4 pb-12 flex flex-col gap-12 md:gap-20">
      <ContactUs locale={locale} />
    </main>
  );
}
