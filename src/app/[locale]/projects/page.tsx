// import Agencies from "@/allPages/Agencies/Agencies";
import Agencies from "@/allPages/landingPage/agencies/Agencies";
import Projects from "@/allPages/project/Projects";
import getData from "@/api/getData";
import initTranslations from "@/app/i18n";
import React from "react";

export default async function ProjectsPage({ params: { locale } }: any) {
  const broker = await getData("web/our-brokers", locale);
  const allBroker = broker.data;
  const countries = await getData("web/countries", locale);
  const AllCountries = countries.data[0] || [];

  // const i18nNamespaces = ["Pages_LandingPage"];
  // const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <main className="min-h-[calc(100vh-136px)]">
      <section className="site_container pt-10  pb-12">
        <Projects />

        <Agencies data={allBroker} locale={locale} countrie={AllCountries} />
      </section>
    </main>
  );
}
