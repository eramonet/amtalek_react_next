"use client";
import { useTranslation } from "react-i18next";
import { useFetchData } from "@/Hooks/useAxios";
// import { ErrorMessage, Loader } from "@/SubComponents/index";
import { Loader } from "@/SubComponents/index";
import Heading from "@/components/Heading";
import Image from "next/image";
import ErrorMessage from "@/SubComponents/ErrorMessage";
// import HelmetTags from "@/MainComponents/HelmetTags";
// import Heading from "@/MainComponents/Heading";
export async function About({ data }: any) {
  const { t } = useTranslation("Pages_About");

  const { isLoading, isError, isPaused } = (
    await useFetchData("About", process.env.NEXT_PUBLIC_ABOUT)
  )?.data;

  return (
    <section className="pt-20 pb-32 md:pb-36 site_container flex flex-col items-center ">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}
      <Heading style={"text-center"}>{t("tab.title")}</Heading>
      <div className=" mt-10  w-full flex justify-between  flex-col items-center ">
        {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="w-full grid grid-cols-1 ss:grid-cols-1 gap-10">
              <div className="col-span-1  flex flex-col gap-2 ">
                {data?.left_keys?.map((key: any) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className="col-span-1 flex flex-col gap- break-words">
                      <h2 className="font-bold text-2xl">{key?.key}</h2>
                      <div
                        className=" text-justify"
                        dangerouslySetInnerHTML={{ __html: key?.value }}
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className="col-span-1 flex flex-col gap-2">
                {data?.right_keys?.map((key: any) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className="w-full flex flex-col gap- ">
                      <h2 className="font-bold text-2xl">{key?.key}</h2>
                      <div
                        className="!break-w"
                        dangerouslySetInnerHTML={{ __html: key?.value }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-5/6  md:w-full mt-10 border-2 border-secondary p-3 round">
              <Image
                width={1000}
                height={1000}
                className="w-full  h-full object-cover round"
                src={data?.about_image}
                alt="service-process"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
