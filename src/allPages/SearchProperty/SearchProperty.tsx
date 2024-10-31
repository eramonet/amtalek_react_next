/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { memo, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import useSessionStorageState from "use-session-storage-state";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import AdsSearch from "./components/AdsSearch";
import { usePostData } from "@/Hooks/usePostData";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import { useFetchData } from "@/Hooks/useFetchData";
import Loader from "@/components/loader/Loader";
import { ErrorMessage, NoItemsMessage } from "@/SubComponents";
import { ComboBox } from "@/FormComponents";
import AdsSearchAside from "./components/AdsSearchAside";
import SearchForm from "@/MainComponents/SearchForm";
import LatestProperties from "../PropertyDetails/aside/components/LatestProperties";
import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";
import SearchPropertyCard from "./components/SearchPropertyCard";
// import Pagination from "@/MainComponents/Pagination";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import Pagination from "./components/Pagination";
import ComboBoz from "@/FormComponents/ComboBoz";
const PropertiesMemoized = memo(function PropertiesMemoized({ data }: any) {
  const user = useSelector(userData);
  const dispatchRedux = useDispatch();
  const { t, i18n } = useTranslation("Pages_SearchProperty");

  const dataBeforADS = data?.slice(0, 4);
  const dataAfterADS = data?.slice(dataBeforADS.length, data.length);

  return (
    <>
      <div className="all__properties--wrapper w-full grid-auto-fit my-10">
        {dataBeforADS?.map((property: any, i: number) => (
          <SearchPropertyCard
            key={i}
            property={property}
            makeBgLight
            user={user}
            t={t}
            ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
            i18n={i18n}
          />
        ))}
      </div>
      {/*  */}

      {/* start ADS */}
      <AdsSearch />
      {/* end ADS */}

      {/*  */}
      <div className="all__properties--wrapper w-full grid-auto-fit my-10">
        {dataAfterADS?.map((property: any, i: number) => (
          <SearchPropertyCard
            key={i}
            property={property}
            makeBgLight
            user={user}
            t={t}
            ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
            i18n={i18n}
          />
        ))}
      </div>
    </>
  );
});

export function SearchProperty() {
  const { t, i18n } = useTranslation("Pages_SearchProperty");

  let searchParams: any = useSearchParams();
  const URLParams: any = Object.fromEntries(searchParams.entries());

  // const storedQueryParams = JSON.parse(localStorage.getItem("queryParams") || "");
  //   const URLParams: any = new URLSearchParams(storedQueryParams);

  const sortingOptions = [
    { title: t("sorting_select.Featured"), id: 1 },
    { title: t("sorting_select.Normal"), id: 2 },
    { title: t("sorting_select.price_High"), id: 3 },
    { title: t("sorting_select.price_Low"), id: 4 },
  ];
  // const [step, setStep] = useState(1);
  const [step, setStep] = useSessionStorageState("step", {
    defaultValue: 1,
  });
  useEffect(() => {
    if (searchParams.get("pr") === "") {
      setStep(1);
    } else if (searchParams.get("t") === "") {
      setStep(2);
    } else if (searchParams.get("c") === "-1" && searchParams.get("r") === "-1") {
      setStep(3);
    } else if (searchParams.get("r") === "-1") {
      setStep(4);
    } else if (searchParams.get("sr") === "-1") {
      setStep(5);
    }
  }, [searchParams, setStep]);
  const [title, setTitle] = useState("");
  const location = usePathname();
  const lng = useSelector(lang);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [isCitySearch, setIsCitySearch] = useState(searchParams.get("fc") == 1 ? true : false);
  const { mutate, isLoading, isError, isPaused, data }: any = usePostData(
    false,
    () => {},
    true,
    () => {}
  );
  const params = isCitySearch
    ? {
        city: URLParams.c === "-1" ? "" : URLParams.c || "",
        page: page,
      }
    : {
        keyword: URLParams.k || "",
        region: URLParams.r === "-1" ? "" : URLParams.r || "",
        sub_region: URLParams.sr === "-1" ? "" : URLParams.sr || "",
        city: URLParams.c === "-1" ? "" : URLParams.c || "",
        country: URLParams.cr === "-1" ? "" : URLParams.cr || "",
        property_type: URLParams.t || "",
        min_beds: URLParams.b || "",
        min_bathes: URLParams.p || "",
        purpose: URLParams.pr || "",
        min_area: URLParams.af || "",
        max_area: URLParams.at || "",
        min_price: URLParams.pf || "",
        max_price: URLParams.pt || "",
        finishing: URLParams.f || "",
        currency: URLParams.cur || "",
        page: page,
      };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    //!this logic to handle the search, the search depends only on the changes happened in the url, so the search form, sort by selections, regions section, and pagination don't trigger the search request directly, instead they make a change in the url and this useEffect listens for the changes in the url params then trigger the search request

    //!the search depends on the yrl only to handle the case of copy and paste the url or bookmark it then open it in a different tab and displaying the same search results

    //!the backend needs to set a key for the normal /featured and another key for price high / low, but in the front the 4 selections are grouped together in th selectbox and in the data (id, title)

    const priority_keys = URLParams.srt == 1 ? "featured" : URLParams.srt == 2 ? "normal" : null;
    const price_arrange_keys = URLParams.srt == 4 ? "asc" : "desc";
    const finalData =
      isCitySearch && priority_keys
        ? {
            ...params,
            price_arrange_keys: price_arrange_keys,
            priority_keys: priority_keys,
          }
        : isCitySearch
        ? {
            ...params,
            price_arrange_keys: price_arrange_keys,
          }
        : priority_keys && location?.length > 0
        ? {
            ...params,
            priority_keys: priority_keys,
            // amenities: JSON.stringify(location),
            price_arrange_keys: price_arrange_keys,
          }
        : location?.length > 0
        ? {
            ...params,
            // amenities: JSON.stringify(location),
            price_arrange_keys: price_arrange_keys,
          }
        : priority_keys
        ? {
            ...params,
            priority_keys: priority_keys,
            price_arrange_keys: price_arrange_keys,
          }
        : {
            ...params,
            price_arrange_keys: price_arrange_keys,
          };

    mutate({
      api: `https://amtalek.com/amtalekadmin/public/api/web/search-property`,
      data: finalData,
    });
  }, [
    URLParams.k,
    URLParams.r,
    URLParams.c,
    URLParams.cr,
    URLParams.t,
    URLParams.cr,
    URLParams.cur,
    URLParams.f,
    URLParams.pr,
    URLParams.p,
    URLParams.b,
    URLParams.af,
    URLParams.at,
    URLParams.pf,
    URLParams.pt,
    URLParams.srt,
    URLParams.page,
    location,
    i18n.language,
  ]);

  const [countriesData, setCountriesData] = useState<any>(null);
  const [countriesLoading, setCountriesLoading] = useState<any>(true);

  useEffect(() => {
    // فقط قم بعملية الجلب إذا كانت البيانات موجودة (مثل حالة !!data)
    // if (data) {
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

    fetchCountries();
    // }
  }, [data]); // جلب البيانات فقط عند توفر `data`

  // console.log(countriesData, searchParams.get("cr"));

  useEffect(() => {
    if (step === 1 || step === 2) {
      if (
        searchParams.get("c") === "-1" &&
        searchParams.get("r") === "-1" &&
        searchParams.get("sr") === "-1"
      ) {
        setTitle(
          `${
            searchParams.get("pr") !== ""
              ? data?.data?.original[2]?.property_purpose?.find(
                  (item: any) => item?.id === Number(searchParams.get("pr"))
                )?.title
              : searchParams.get("t") !== ""
              ? data?.data?.original[2]?.property_types?.find(
                  (item: any) => item?.id === Number(searchParams.get("t"))
                )?.title
              : ""
          } ${t("properties_word")} ${t("in")} ${
            countriesData?.find((item: any) => item?.id === parseInt(searchParams.get("cr")))?.title
          }`
        );
      } else {
        if (searchParams.get("c") !== "-1") {
          setTitle(
            `${
              searchParams.get("pr") !== ""
                ? data?.data?.original[2]?.property_purpose?.find(
                    (item: any) => item?.id === Number(searchParams.get("pr"))
                  )?.title
                : ""
            } ${t("properties_word")} ${t("in")} ${
              data?.data?.original[2]?.all_cities?.find(
                (item: any) => item?.id === parseInt(searchParams.get("c"))
              )?.title
            }`
          );
        }
        if (searchParams.get("r") !== "-1") {
          setTitle(
            `${
              searchParams.get("pr") !== ""
                ? data?.data?.original[2]?.property_purpose?.find(
                    (item: any) => item?.id === Number(searchParams.get("pr"))
                  )?.title
                : ""
            } ${t("properties_word")} ${t("in")} ${
              data?.data?.original[2]?.all_regions?.find(
                (item: any) => item?.id === parseInt(searchParams.get("r"))
              )?.title
            }`
          );
        }
      }
    }
    if (step === 3) {
      setTitle(
        `${
          data?.data?.original[2]?.property_types.find(
            (item: any) => item?.id === Number(searchParams.get("t"))
          )?.title
        } ${data?.data?.original[2]?.property_purpose
          .find((item: any) => item?.id === Number(searchParams.get("pr")))
          ?.title.split(" ")
          .slice(1)
          .join(" ")} ${t("in")} ${
          countriesData?.find((item: any) => item?.id === parseInt(searchParams.get("cr")))?.title
        } `
      );
    }

    if (step === 4) {
      setTitle(
        `${
          data?.data?.original[2]?.property_types.find(
            (item: any) => item?.id === Number(searchParams.get("t"))
          )?.title
        } ${data?.data?.original[2]?.property_purpose
          .find((item: any) => item?.id === Number(searchParams.get("pr")))
          ?.title.split(" ")
          .slice(1)
          .join(" ")} ${t("in")} ${
          data?.data?.original[2]?.all_cities?.find(
            (item: any) => item?.id === parseInt(searchParams.get("c"))
          )?.title
        } `
      );
    }
    if (step === 5) {
      setTitle(
        `${
          data?.data?.original[2]?.property_types.find(
            (item: any) => item?.id === Number(searchParams.get("t"))
          )?.title
        } ${data?.data?.original[2]?.property_purpose
          .find((item: any) => item?.id === Number(searchParams.get("pr")))
          ?.title.split(" ")
          .slice(1)
          .join(" ")} ${t("in")} ${
          data?.data?.original[2]?.all_regions?.find(
            (item: any) => item?.id === parseInt(searchParams.get("r"))
          )?.title
        } `
      );
    }
    if (step === 6) {
      setTitle(
        `${
          data?.data?.original[2]?.property_types.find(
            (item: any) => item?.id === Number(searchParams.get("t"))
          )?.title
        } ${data?.data?.original[2]?.property_purpose
          .find((item: any) => item?.id === Number(searchParams.get("pr")))
          ?.title.split(" ")
          .slice(1)
          .join(" ")} ${t("in")} ${
          data?.data?.original[2]?.all_sub_regions?.find(
            (item: any) => item?.id === parseInt(searchParams.get("sr"))
          )?.title
        } `
      );
    }
  });

  if (isLoading || countriesLoading) {
    return <Loader />;
  }
  function Filters({
    data,
  }: {
    data: {
      properties_count: number;
      id: number;
      title: string;
    }[];
  }) {
    const [slice, setSlice] = useState<any>(9);
    const [step, setStep] = useState<any>(0);
    const { t } = useTranslation("Pages_SearchProperty");
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const URLParams = Object.fromEntries(searchParams.entries());

    const handleSliceClick = useCallback(() => {
      setSlice((prev: any) => (prev === 9 ? data?.length : 9));
    }, [data?.length]);

    const handleFilterClick = useCallback(
      (prop: any) => {
        setStep((prev: any) => prev + 1);
        const newParams = { ...URLParams };

        if (!searchParams.get("pr")) {
          newParams.pr = prop?.id;
        } else if (!searchParams.get("t")) {
          newParams.t = prop?.id;
        } else if (searchParams.get("c") === "-1" && step !== 4 && step !== 5) {
          newParams.c = prop?.id;
        } else if (searchParams.get("r") === "-1") {
          newParams.r = prop?.id;
        } else if (searchParams.get("sr") === "-1") {
          newParams.sr = prop?.id;
        }

        const queryString = new URLSearchParams(newParams).toString();
        router.push(`${pathname}?${queryString}`);
      },
      [URLParams, searchParams, router, pathname, step]
    );

    const NotEqualZero = useMemo(() => {
      return data?.filter((prop) => prop?.properties_count !== -1);
    }, [data]);

    if (data?.length === 0 || data?.every((prop) => prop?.properties_count === 0)) {
      return;
    } else {
      return (
        <div className="w-full grid grid-cols-4 min-h-[100px] ss:grid-cols-2 mt-10 bg-[#edf3f8]  gap-5 p-2 rounded relative">
          {NotEqualZero?.slice(0, slice)?.map((prop) => {
            return (
              <button
                key={prop?.id}
                onClick={() => handleFilterClick(prop)}
                className="hover:underline col-span-1 text-[14px] text-start"
              >
                {prop?.title} ({prop?.properties_count})
              </button>
            );
          })}
          {NotEqualZero?.length > 9 && (
            <button
              onClick={handleSliceClick}
              className="absolute ltr:right-2  hover:underline bottom-1 rtl:left-2 "
            >
              {slice === 9 ? t("show_more_word") : t("show_less_word")}
            </button>
          )}
        </div>
      );
    }
  }

  return (
    <section className="w-full">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}
      <section className=" site_container  bg- flex justify-between items-start pt-20 amd:pt-10 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
        <section className="SearchProperty__main--section min-h-screen w-[66%] bg- clg:w-full">
          {isError || isPaused ? (
            <ErrorMessage message={t("ErrorMessage")} />
          ) : isLoading ? (
            <Loader />
          ) : data?.data?.original?.[0]?.data?.length === 0 ? (
            <NoItemsMessage setStep={setStep} result message={t("NoItemsMessage")} />
          ) : (
            <Suspense fallback={<Loader />}>
              <section className="w-full ">
                {data && (
                  <>
                    <div className="selection_options--props--count flex ss:flex-col justify-between items-center flex-wrap gap-4 asm:justify-center asm:mb-9">
                      <h1 className=" text-3xl ss:text-lg md:text-md clg:text-lg font-semibold asm:text-center uppercase">
                        {title}
                      </h1>
                      <div className="min-w-[160px]">
                        <ComboBox
                          selectBox
                          placeholder={t("sorting_select.placeholder")}
                          setSearchParams={searchParams}
                          searchParams={searchParams}
                          data={sortingOptions}
                          light
                          shadow
                          getDefaultValueFromURL="srt"
                        />
                      </div>
                    </div>
                    <h2 className="Properties_counts text-base opacity-120 mt-3 asm:text-center flex gap-2 items-center">
                      ( {data?.data?.original?.[1]?.total_props} ) {t("properties_word")}
                      {data?.data?.original?.[1]?.featured_count > 0 && (
                        <span className="bg-red500 text-bg px-3 py-1.5  inline-flex items-center w-fit rounded-full text-sm mx-3 gap-2">
                          {data?.data?.original?.[1]?.featured_count} {""}
                          {t("featured_word")}
                        </span>
                      )}
                      {data?.data?.original?.[1]?.normal_count > 0 && (
                        <span className="bg-secondary text-bg px-3 py-1.5  inline-flex items-center w-fit rounded-full text-sm ">
                          {data?.data?.original?.[1]?.normal_count} {t("normal_word")}
                        </span>
                      )}
                    </h2>
                    {/* start */}
                  </>
                )}
                {step <= 5 && (
                  <Filters
                    data={
                      step === 1
                        ? data?.data?.original?.[2]?.property_purpose
                        : step === 2
                        ? data?.data?.original?.[2]?.property_types
                        : step === 3
                        ? data?.data?.original?.[2]?.all_cities
                        : step === 4
                        ? data?.data?.original?.[2]?.all_regions
                        : step === 5
                        ? data?.data?.original?.[2]?.all_sub_regions
                        : ""
                    }
                  />
                )}

                <PropertiesMemoized data={data?.data?.original?.[0]?.data} />
                {data?.data?.original?.[0]?.meta?.last_page > 1 && (
                  <Pagination
                    page={page}
                    t={t}
                    setPage={setPage}
                    data={data?.data?.original?.[0]}
                    //isPreviousData={isPreviousData}
                  />
                )}
              </section>
            </Suspense>
          )}
        </section>
        <section className=" SearchProperty__aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-8 amd:gap-5">
          <div className="w-full clg:hidden">
            <SearchForm type={"asideForm"} showOptions />
          </div>
          <div className="w-full hidden clg:block">
            <SearchForm type={"bigForm"} showOptions />
          </div>

          {/* start ads */}
          <AdsSearchAside />
          {/* end ads */}

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6367957675332720"
            crossOrigin="anonymous"
          ></script>
          {/* <!-- Search result page amtalek --> */}
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
            data-ad-layout="in-article"
            data-ad-client="ca-pub-6367957675332720"
            data-ad-slot="1457112660"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <LatestProperties />
          <FeaturedPropertiesAside />
        </section>
      </section>
    </section>
  );
}
