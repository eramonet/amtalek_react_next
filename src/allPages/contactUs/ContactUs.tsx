import getData from "@/api/getData";
import Image from "next/image";
import React from "react";
import ImagesContactUs from "./components/ImagesContactUs";
import "./style.css";
import FormDataContactUs from "./components/FormDataContactUs";
import Details from "./components/Details";
import initTranslations from "@/app/i18n";
import Agencies from "../landingPage/agencies/Agencies";
import { useTranslation } from "react-i18next";
export default async function ContactUs({ locale }: any) {
  const contactData = await getData(`web/${process.env.NEXT_PUBLIC_CONTACT_US_GET}`, locale);
  const AllContactData = contactData?.data[0];
  const i18nNamespaces = ["Pages_ContactUs", "Pages_LandingPage"];

  const broker = await getData("web/our-brokers", locale);
  const allBroker = broker.data;

  const countries = await getData("web/countries", locale);
  const AllCountries = countries.data[0] || [];

  // const { t } = await initTranslations(locale, i18nNamespaces);
  // const { t } =  useTranslation("Pages_ContactUs");

  return (
    <section className="site_container pt-4 pb-12 flex flex-col gap-12 md:gap-20">
      <div className="ContactUs__top w-full flex justify-between items-start gap-10 md:gap-20  amd:flex-col-reverse amd:items-center relative ">
        <Image
          width={100}
          height={100}
          className="absolute hidden w-96 top-full -translate-y-1/2 left-1/2 "
          src="@/assets/arrow-contact.svg"
          alt="arrow-contact"
        />

        <FormDataContactUs />

        <ImagesContactUs />
      </div>

      <Details data={AllContactData} />
      {/* <div className="w-full h-auto opacity-0 ContactUs__scale-no-over"> */}
      <Agencies data={allBroker} locale={locale} countrie={AllCountries} />
      {/* </div> */}
    </section>
  );
}
