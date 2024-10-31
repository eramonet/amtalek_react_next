"use client";
import { useTranslation } from "react-i18next";
import { useFetchData } from "@/Hooks/useAxios";
import { ErrorMessage, Loader } from "@/SubComponents/index";
// import HelmetTags from "@/MainComponents/HelmetTags";
// import { useParams } from "react-router-dom";
export async function TermsConditions({ data }: any) {
  const { t, i18n } = useTranslation("Pages_TermsConditions");

  // const {
  //   data: terms,
  //   isLoading,
  //   isError,
  //   isPaused,
  // } = (await useFetchData("TermsConditions", process.env.NEXT_PUBLIC_TERMS))?.data;
  //   const { page } = useParams();
  //   console.log(data);

  return (
    <section className="pt-20 pb-32 md:pb-36 site_container ">
      {/* <HelmetTags
        title={t(
          "tab.title",
          i18n.language === "ar" ? { details: "الشروط والاحكام" } : { details: page?.toUpperCase() }
        )}
        description={t("tab.description")}
      /> */}

      {/* <Heading style={"text-center"}>{t("heading")}</Heading> */}
      {/* <SubHeading>{t("sub_heading")}</SubHeading> */}
      <div className="flex justify-between items-start md:flex-col md:items-center gap-28 md:gap-20 mt-10">
        {/* {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isLoading ? (
          <Loader />
        ) : ( */}
        <>
          <div className="terms__left  w-full ">
            <h2 className="font-medium text-xl mb-5 underline underline-offset-8 decoration-wavy decoration-primary/50 leading-10 md:text-center">
              {t("terms.title")}
            </h2>
            <p className="text-justify" dangerouslySetInnerHTML={{ __html: data?.terms }}></p>
          </div>
        </>
        {/* )} */}
      </div>
    </section>
  );
}
