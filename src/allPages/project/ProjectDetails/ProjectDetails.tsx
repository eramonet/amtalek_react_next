/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// import { useParams } from "react-router-dom";
import { useFetchData } from "@/Hooks/useAxios";

// import {
//   Heading,
//   HelmetTags,
//   ItemFeaturesList,
//   ItemSlider,
//   LightBox,
// } from "@/Components/MainComponents/index";

import {
  // BrokerInfo,
  ErrorMessage,
  Loader,
  // Share,
} from "@/SubComponents/index";
// import AsideForm from "@/Components/AsideComponents/AsideForm";
import { useTranslation } from "react-i18next";
import ProjectQuickSummary from "./ProjectQuickSummary";
import React, { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import AsideForm from "@/allPages/PropertyDetails/aside/components/AsideForm";
import ShareOptions from "@/allPages/landingPage/latestProperties/components/ShareOptions";
import ItemSlider from "@/MainComponents/ItemSlider";
import ItemFeaturesList from "@/MainComponents/ItemFeaturesList";
import LightBox from "@/MainComponents/LightBox";
import BrokerInfo from "@/MainComponents/BrokerInfo";
import getData from "@/api/getData";
import PropertyOwner from "@/allPages/PropertyDetails/aside/components/PropertyOwner";
import SendMessageForm from "@/allPages/PropertyDetails/components/SendMessageForm";

export default function ProjectDetails({ listing_number, locale }: any) {
  const { t } = useTranslation("Pages_ProjectDetails");

  // const { projectNumber } = useParams();
  // console.log(listing_number);

  // const {
  //   isLoading: loading,
  //   isError,
  //   isPaused,
  //   data,
  // } = useFetchData(
  //   "ProjectDetails",
  //   `${process.env.NEXT_PUBLIC_SINGLE_PROJECT_DETAILS}${listing_number}`,
  //   false,
  //   true,
  //   listing_number
  // );
  const [data, setData] = useState<any>([]);
  async function fetchData() {
    const data = await getData(`web/project-details/${listing_number}`, locale);
    const allData = data?.data[0];
    setData(allData);
  }
  console.log(data, listing_number);

  useEffect(() => {
    fetchData();
  }, []);
  // if (isError || isPaused) {
  //   return (
  //     <div className="h-[calc(100vh-136px)] flex-center w-full">
  //       <ErrorMessage message={t("ErrorMessage")} />
  //     </div>
  //   );
  // }
  console.log(data?.broker_details?.[0]);

  if (!data) {
    return <Loader />;
  }
  console.log(data?.broker_details?.[0]?.id);

  return (
    // ss:gap-8 pt-20 pb-44
    <section className="project__Details site_container flex flex-col gap-16">
      {/* <HelmetTags
        title={t("tab.title", { details: data?.name })}
        description={t("tab.description")}
      /> */}
      <div className="project__general--info w-full">
        <h1 className="project__name text-3xl ss:text-md amd:text-lg font-semibold asm:text-center">
          {data?.name}
        </h1>
        <h2 className="project__name text-base  mt-1 asm:text-center">
          {data?.city}
          {" | "} {data?.region}
          {data?.sub_region && (
            <>
              {" | "} {data?.sub_region}
            </>
          )}
          {/* {","} {data?.country} */}
        </h2>

        <ItemSlider data={data} style={"mt-10 min-h-[60vh]"} fullWidth />
        {/* <ShareOptions data={data} t={t} type="project" style={"mt-12"} /> */}
      </div>
      <div className="project__description">
        <Heading>{t("headings.description")}</Heading>
        <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
      </div>
      {/* {Object?.keys(data?.quick_summary)?.length > 0 && (
        <div className="project__Quick--summary w-full">
          <Heading> {t("headings.QuickSummary")}</Heading>
          <ProjectQuickSummary t={t} data={data?.quick_summary} />
        </div>
      )} */}
      {data?.aminities?.length > 0 && (
        <div className="project__BENEFITS--AMENITIES w-full">
          <Heading> {t("headings.aminities")} </Heading>
          <ItemFeaturesList data={data?.aminities} />
        </div>
      )}
      {data?.autocad?.length > 0 && (
        <div className="project__BENEFITS--AMENITIES w-full">
          <Heading>{t("headings.AUTOCAD")} </Heading>
          <p className="Property__name text-base  mt-1 asm:text-center mb-7">
            {t("headings.AUTOCAD_DESCRIPTION")}
          </p>
          <LightBox data={data?.autocad} />
        </div>
      )}
      <div className="project__location ">
        <Heading>{t("headings.LOCATION")} </Heading>

        <div
          className="w-full h-full amd:w-full border-2 border-secondary round mt-7"
          dangerouslySetInnerHTML={{
            __html: data?.location,
          }}
        ></div>
      </div>
      {data?.video !== "" && (
        <div className="project__VIDEO">
          <Heading>{t("headings.VIDEO")} </Heading>

          <iframe
            loading="lazy"
            className="  w-full !aspect-video overflow-hidden border-2 border-secondary round mt-7"
            src={`https://www.youtube.com/embed/${data?.video?.substring(32)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="project__info--contacts">
        <Heading>{t("headings.CONTACT_BROKER")} </Heading>
        <div className="flex pt-14 amd:flex-col ss:gap-8 gap-16">
          <div className="broker__img--contacts w-2/3 amd:w-full ">
            <BrokerInfo t={t} data={data?.broker_details?.[0]} />
            {/* <PropertyOwner data={data} locale={locale} /> */}
          </div>
          <div className="broker__contact--form w-1/3 amd:w-full">
            <AsideForm
              t={t}
              type="message"
              Bgcolor="light"
              api={process.env.NEXT_PUBLIC_SEND_MESSAGE_TO_BROKER}
              params={{ vendor_id: data?.broker_details?.[0]?.id }}
              propID={data?.broker_details?.[0]?.id}
            />
            {/* <SendMessageForm
              params={{
                property_id: data?.id,
              }}
              api={`${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_SINGLE_PROPERTY_LEAVE_COMMENT}`}
              type="PropertyDetails__Comment"
              // t={t}
              showRating
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
