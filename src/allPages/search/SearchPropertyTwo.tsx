"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSessionStorageState from "use-session-storage-state";
import { usePostData } from "@/Hooks/usePostData";
import Loader from "@/components/loader/Loader";
import { ErrorMessage, NoItemsMessage } from "@/SubComponents";

export function SearchPropertyTwo() {
  const { t, i18n } = useTranslation("Pages_SearchProperty");
  const [title, setTitle] = useState("");
  const [titleStorage, setTitleStorage] = useSessionStorageState("title", {
    defaultValue: title,
  });
  const [page, setPage] = useSessionStorageState("page", {
    defaultValue: 1,
  });
  const router = useRouter();
  const pathname = usePathname();
  const defaultFormData = {
    keyword: "",
    country: "1",
    city: "",
    region: "",
    sub_region: "",
    property_type: "",
    min_beds: "",
    min_bathes: "",
    purpose: "",
    min_area: "",
    max_area: "",
    min_price: "",
    max_price: "",
    finishing: "",
    currency: "",
    amenities: [] as any,
    price_arrange_keys: "" as any,
    priority_keys: "" as any,
    page: 1,
    fc: "",
    // srt: "",
  };

  const [formData, setFormData] = useSessionStorageState("formData", {
    defaultValue: defaultFormData,
  });

  // دالة لإعادة تعيين formData إلى القيم الافتراضية
  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  const [isCitySearch, setIsCitySearch] = useState(Number(formData.fc) == 1 ? true : false);

  const [step, setStep] = useSessionStorageState("step", {
    defaultValue: 1,
  });

  const location = usePathname();
  const [reloadData, setReloadData] = useState(0);
  const [data, setData] = useState<any>([]);

  const params = isCitySearch
    ? {
        city: formData.city === "-1" ? "" : formData.city || "",
        page: formData.page,
      }
    : {
        keyword: formData.keyword || "",
        region: formData.region === "-1" ? "" : formData.region || "",
        sub_region: formData.sub_region === "-1" ? "" : formData.sub_region || "",
        city: formData.city === "-1" ? "" : formData.city || "",
        country: formData.country === "-1" ? "" : formData.country || "",
        property_type: formData.property_type || "",
        min_beds: formData.min_beds || "",
        min_bathes: formData.min_bathes || "",
        purpose: formData.purpose || "",
        min_area: formData.min_area || "",
        max_area: formData.max_area || "",
        min_price: formData.min_price || "",
        max_price: formData.max_price || "",
        finishing: formData.finishing || "",
        currency: formData.currency || "",
        page: formData.page,
      };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    // إعداد المفاتيح المطلوبة بناءً على البيانات المدخلة
    const priority_keys =
      +formData.priority_keys === 1 ? "featured" : +formData.priority_keys === 2 ? "normal" : null;
    const price_arrange_keys = +formData.priority_keys === 4 ? "asc" : "desc";

    const finalData =
      isCitySearch && priority_keys
        ? {
            ...params,
            price_arrange_keys: price_arrange_keys,
            priority_keys: priority_keys,
            amenities: JSON.stringify(formData.amenities),
            page: 1,
          }
        : isCitySearch
        ? {
            ...params,
            price_arrange_keys: price_arrange_keys,
            amenities: JSON.stringify(formData.amenities),
            page: 1,
          }
        : priority_keys && location?.length > 0
        ? {
            ...params,
            priority_keys: priority_keys,
            amenities: JSON.stringify(formData.amenities),
            price_arrange_keys: price_arrange_keys,
            page: 1,
          }
        : location?.length > 0
        ? {
            ...params,
            amenities: JSON.stringify(formData.amenities),
            price_arrange_keys: price_arrange_keys,
            page: 1,
          }
        : priority_keys
        ? {
            ...params,
            priority_keys: priority_keys,
            price_arrange_keys: price_arrange_keys,
            amenities: JSON.stringify(formData.amenities),
            page: 1,
          }
        : {
            ...params,
            price_arrange_keys: price_arrange_keys,
            amenities: JSON.stringify(formData.amenities),
            page: 1,
          };

    // استخدام fetch API لجلب البيانات
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://amtalek.com/amtalekadmin/public/api/web/search-property",
          {
            method: "POST", // استخدم POST إذا كانت البيانات تحتاج إلى إرسالها
            headers: {
              lang: i18n.language,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...finalData, amenities: JSON.stringify(formData.amenities) }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // قم بمعالجة البيانات هنا، مثل تحديث الحالة أو استخدام بيانات البحث
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [reloadData, step, formData.priority_keys, formData.price_arrange_keys, formData.page]);

  // useEffect(() => {
  //   window.scrollTo({ top: 0 });

  //   //!this logic to handle the search, the search depends only on the changes happened in the url, so the search form, sort by selections, regions section, and pagination don't trigger the search request directly, instead they make a change in the url and this useEffect listens for the changes in the url params then trigger the search request

  //   //!the search depends on the yrl only to handle the case of copy and paste the url or bookmark it then open it in a different tab and displaying the same search results

  //   //!the backend needs to set a key for the normal /featured and another key for price high / low, but in the front the 4 selections are grouped together in th selectbox and in the data (id, title)

  //   const priority_keys =
  //     +formData.priority_keys == 1 ? "featured" : +formData.priority_keys == 2 ? "normal" : null;
  //   const price_arrange_keys = +formData.priority_keys == 4 ? "asc" : "desc";
  //   const finalData =
  //     isCitySearch && priority_keys
  //       ? {
  //           ...params,
  //           price_arrange_keys: price_arrange_keys,
  //           priority_keys: priority_keys,
  //           amenities: JSON.stringify(formData.amenities),
  //           page: 1,
  //         }
  //       : isCitySearch
  //       ? {
  //           ...params,
  //           price_arrange_keys: price_arrange_keys,
  //           amenities: JSON.stringify(formData.amenities),
  //           page: 1,
  //         }
  //       : priority_keys && location?.length > 0
  //       ? {
  //           ...params,
  //           priority_keys: priority_keys,
  //           amenities: JSON.stringify(formData.amenities),
  //           price_arrange_keys: price_arrange_keys,
  //           page: 1,
  //         }
  //       : location?.length > 0
  //       ? {
  //           ...params,
  //           amenities: JSON.stringify(formData.amenities),
  //           price_arrange_keys: price_arrange_keys,
  //           page: 1,
  //         }
  //       : priority_keys
  //       ? {
  //           ...params,
  //           priority_keys: priority_keys,
  //           price_arrange_keys: price_arrange_keys,
  //           amenities: JSON.stringify(formData.amenities),
  //           page: 1,
  //         }
  //       : {
  //           ...params,
  //           price_arrange_keys: price_arrange_keys,
  //           amenities: JSON.stringify(formData.amenities),
  //           page: 1,
  //         };

  //   mutate({
  //     api: `https://amtalek.com/amtalekadmin/public/api/web/search-property`,
  //     data: { ...finalData, amenities: JSON.stringify(formData.amenities) },
  //   });
  // }, [reloadData, step, formData.priority_keys, formData.price_arrange_keys, formData.page]);

  useEffect(() => {
    router.push(title?.replace(/\s/g, "-"));
  }, [pathname, step]);
  // console.log();

  // const prepareData = () => {
  //   // نسخ formData
  //   const dataToSend = { ...formData };

  //   // حذف amenities إذا كانت مصفوفة فارغة
  //   if (dataToSend.amenities.length === 0) {
  //     delete dataToSend.amenities;
  //   }

  //   //   // console.log("البيانات المحضرة:", dataToSend); // طباعة البيانات المحضرة للمعاينة
  //   return dataToSend;
  // };

  // const { mutate, isLoading, isError, isPaused, data }: any = usePostData(
  //   false,
  //   () => {},
  //   true,
  //   () => {}
  // );

  // const dataToSend = prepareData();
  // useEffect(() => {
  //   mutate({
  //     api: `https://amtalek.com/amtalekadmin/public/api/web/search-property`,
  //     data: dataToSend,
  //   });
  // }, [
  //   reloadData,
  //   reloadData,
  //   step,
  //   formData.property_type,
  //   formData.price_arrange_keys,
  //   formData.page,
  // ]);

  // ************************************************************

  useEffect(() => {
    if (formData.purpose === "") {
      setStep(1);
    } else if (formData.property_type === "") {
      setStep(2);
    } else if (formData.city === "" && formData.region === "") {
      setStep(3);
    } else if (formData.region === "") {
      setStep(4);
    } else if (formData.sub_region === "") {
      setStep(5);
    }

    //   setTimeout(() => {
    //     router.replace(`${title?.replace(/\s/g, "-")}`);
    //   }, 800);
  }, [formData, setStep]);
  // console.log(formData);

  // ***********************************************************

  const [countriesData, setCountriesData] = useState<any>(null);
  const [countriesLoading, setCountriesLoading] = useState<any>(true);
  const fetchCountries = async () => {
    setCountriesLoading(true);
    try {
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_COUNTRIES_REGISTER}`,
        {
          method: "GET",
          headers: {
            lang: i18n.language,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch countries data");
      }
      const result = await response.json();
      setCountriesData(result?.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setCountriesLoading(false);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, [data]); // جلب البيانات فقط عند توفر `data`

  useEffect(() => {
    if (step === 1 || step === 2) {
      if (formData.city === "" && formData.region === "" && formData.sub_region === "") {
        setTitle(() => {
          return `${
            formData.purpose !== ""
              ? data?.data?.original[2]?.property_purpose?.find(
                  (item: any) => item?.id === Number(formData.purpose)
                )?.title
              : formData.property_type !== ""
              ? data?.data?.original[2]?.property_types?.find(
                  (item: any) => item?.id === Number(formData.property_type)
                )?.title
              : ""
          } ${t("properties_word")} ${t("in")} ${
            countriesData?.find((item: any) => item?.id === parseInt(formData.country))?.title
          }`;
        });
      } else {
        if (formData.city !== "") {
          setTitle(() => {
            return `${
              formData.purpose !== ""
                ? data?.data?.original[2]?.property_purpose?.find(
                    (item: any) => item?.id === Number(formData.purpose)
                  )?.title
                : ""
            } ${t("properties_word")} ${t("in")} ${
              data?.data?.original[2]?.all_cities?.find(
                (item: any) => item?.id === parseInt(formData.city)
              )?.title
            }`;
          });
        }
        if (formData.region !== "") {
          setTitle(() => {
            return `${
              formData.purpose !== ""
                ? data?.data?.original[2]?.property_purpose?.find(
                    (item: any) => item?.id === Number(formData.purpose)
                  )?.title
                : ""
            } ${t("properties_word")} ${t("in")} ${
              data?.data?.original[2]?.all_regions?.find(
                (item: any) => item?.id === parseInt(formData.region)
              )?.title
            }`;
          });
        }
      }
    }
    if (step === 3) {
      setTitle(() => {
        return `${
          data?.data?.original[2]?.property_types.find(
            (item: any) => item?.id === Number(formData.property_type)
          )?.title
        } ${data?.data?.original[2]?.property_purpose
          .find((item: any) => item?.id === Number(formData.purpose))
          ?.title.split(" ")
          .slice(1)
          .join(" ")} ${t("in")} ${
          countriesData?.find((item: any) => item?.id === parseInt(formData.country))?.title
        } `;
      });
    }

    if (step === 4) {
      setTitle(() => {
        return `${
          data?.data?.original[2]?.property_types.find(
            (item: any) => item?.id === Number(formData.property_type)
          )?.title
        } ${data?.data?.original[2]?.property_purpose
          .find((item: any) => item?.id === Number(formData.purpose))
          ?.title.split(" ")
          .slice(1)
          .join(" ")} ${t("in")} ${
          data?.data?.original[2]?.all_cities?.find(
            (item: any) => item?.id === parseInt(formData.city)
          )?.title
        } `;
      });
    }
    if (step === 5) {
      setTitle(() => {
        return `${
          data?.data?.original[2]?.property_types.find(
            (item: any) => item?.id === Number(formData.property_type)
          )?.title
        } ${data?.data?.original[2]?.property_purpose
          .find((item: any) => item?.id === Number(formData.purpose))
          ?.title.split(" ")
          .slice(1)
          .join(" ")} ${t("in")} ${
          data?.data?.original[2]?.all_regions?.find(
            (item: any) => item?.id === parseInt(formData.region)
          )?.title
        } `;
      });
    }
    if (step === 6) {
      setTitle(() => {
        return `${
          data?.data?.original[2]?.property_types.find(
            (item: any) => item?.id === Number(formData.property_type)
          )?.title
        } ${data?.data?.original[2]?.property_purpose
          .find((item: any) => item?.id === Number(formData.purpose))
          ?.title.split(" ")
          .slice(1)
          .join(" ")} ${t("in")} ${
          data?.data?.original[2]?.all_sub_regions?.find(
            (item: any) => item?.id === parseInt(formData.sub_region)
          )?.title
        } `;
      });
    }
  });

  useEffect(() => {
    setTitleStorage(() => {
      return title;
    });
  }, [title]);

  useEffect(() => {
    if (step == 1 && titleStorage == title) {
      router.push(titleStorage?.replace(/\s/g, "-"));
    } else if (step == 2 && titleStorage == title) {
      router.push(titleStorage?.replace(/\s/g, "-"));
    } else if (step == 3 && titleStorage == title) {
      router.push(titleStorage?.replace(/\s/g, "-"));
    } else if (step == 4 && titleStorage == title) {
      router.push(titleStorage?.replace(/\s/g, "-"));
    } else if (step == 5 && titleStorage == title) {
      router.push(titleStorage?.replace(/\s/g, "-"));
    }
    // router.push(title?.replace(/\s/g, "-"));
  }, [step, reloadData]);

  // useEffect(() => {
  //   if (!titleStorage?.includes("undefined") && titleStorage !== "" && titleStorage !== title)
  //     router.push(`/search/${title?.replace(/\s/g, "-")}`);

  // }, [step]);

  // console.log(data?.data?.original[2]?.property_purpose);

  // if (title) {

  // }
  // *********************************************************
  // useEffect(() => {
  //   // if (title !== decodeURIComponent(pathname.split("/").slice(2).join("").replaceAll("-", " "))) {

  //   const URL = `${
  //     formData.purpose !== ""
  //       ? data?.data?.original[2]?.property_purpose?.find(
  //           (item: any) => item?.id === Number(formData.purpose)
  //         )?.title
  //       : ""
  //   } ${t("properties_word")} ${t("in")} ${
  //     data?.data?.original[2]?.all_cities?.find((item: any) => item?.id === parseInt(formData.city))
  //       ?.title
  //   }`;

  //   router.push(URL.replace(/\s/g, "-"));
  // }, [reloadData, step]);

  if (!data) {
    return <Loader />;
  }
  // console.log(isLoading);

  return (
    <>
      {/* {data?.data?.original && data?.data?.original[0]?.data?.length === 0 ? (
        <NoItemsMessage setStep={setStep} result message={t("NoItemsMessage")} />
      ) : ( */}
      <section className="w-full">
        <section className="site_container bg- flex justify-between items-start pt-20 amd:pt-10 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
          <section className="SearchProperty__main--section min-h-screen w-[66%] bg- clg:w-full">
            {/* {isError || isPaused ? ( */}
            {!data ? (
              //   <ErrorMessage message={t("ErrorMessage")} />
              // ) : isLoading ? (
              <Loader />
            ) : data?.data?.original?.[0]?.data?.length === 0 ? (
              <NoItemsMessage
                resetFormData={resetFormData}
                setStep={setStep}
                result
                message={t("NoItemsMessage")}
              />
            ) : (
              <Suspense fallback={<Loader />}>
                <SectionOne
                  title={title}
                  formData={formData}
                  setFormData={setFormData}
                  t={t}
                  data={data}
                  step={step}
                  setStep={setStep}
                  page={page}
                  setPage={setPage}
                />
              </Suspense>
            )}
          </section>
          {/* handleSubmit={handleSubmit} */}
          <SectionTwo
            fetchCountries={fetchCountries}
            setReloadData={setReloadData}
            formData={formData}
            setFormData={setFormData}
          />
        </section>
      </section>
      {/* )} */}
    </>
  );
}
