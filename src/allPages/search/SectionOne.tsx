import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "../SearchProperty/components/Pagination";
import ComboBoxTwo from "./ComboBoxTwo";
import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SearchPropertyCard from "../SearchProperty/components/SearchPropertyCard";
import AdsSearch from "../SearchProperty/components/AdsSearch";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import PaginationTwo from "./PaginationTwo";

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

      <AdsSearch />

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

function Filters({ data, formData, setFormData, step, setStep, title }: any) {
  const [slice, setSlice] = useState<any>(9);
  const { t } = useTranslation("Pages_SearchProperty");
  const router = useRouter();
  const pathname = usePathname();

  const handleSliceClick = useCallback(() => {
    setSlice((prev: any) => (prev === 9 ? data?.length : 9));
  }, [data?.length]);

  const handleFilterClick = (prop: any) => {
    setStep((prev: number) => prev + 1); // تحديث قيمة step في المكون الأساسي

    const newParams = { ...formData };

    if (!newParams.purpose) {
      newParams.purpose = prop?.id;
    } else if (!newParams.property_type) {
      newParams.property_type = prop?.id;
      //  && step !== 4 && step !== 5
    } else if (newParams.city === "") {
      newParams.city = prop?.id;
    } else if (newParams.region === "") {
      newParams.region = prop?.id;
    } else if (newParams.sub_region === "") {
      newParams.sub_region = prop?.id;
    }
    // console.log(formData);

    setFormData((prevData: any) => ({
      // ...prevData,
      ...newParams,
    }));

    router.replace(`${title?.replace(/\s/g, "-")}`);

    // useEffect(() => {
    //   if(title){
    //     router.replace(title?.replace(/\s/g, "-"));
    //   }
    // }, [reloadData, step]);
  };

  const NotEqualZero = useMemo(() => {
    return data?.filter((prop: any) => prop?.properties_count !== -1);
  }, [data]);

  if (data?.length === 0 || data?.every((prop: any) => prop?.properties_count === 0)) {
    return;
  } else {
    return (
      <div className="w-full grid grid-cols-4 min-h-[100px] ss:grid-cols-2 mt-10 bg-[#edf3f8] gap-5 p-2 rounded relative">
        {NotEqualZero?.slice(0, slice)?.map(
          (prop: any) =>
            prop?.properties_count !== 0 ? (
              <button
                key={prop?.id}
                onClick={() => handleFilterClick(prop)}
                className="hover:underline col-span-1 text-[14px] text-start"
              >
                {prop?.title} ({prop?.properties_count})
              </button>
            ) : null // إرجاع null إذا كان الشرط غير متحقق
        )}
        {NotEqualZero?.length > 9 && (
          <button
            onClick={handleSliceClick}
            className="absolute ltr:right-2 hover:underline bottom-1 rtl:left-2"
          >
            {slice === 9 ? t("show_more_word") : t("show_less_word")}
          </button>
        )}
      </div>
    );
  }
}

export default function SectionOne({
  formData,
  setFormData,
  step,
  setStep,
  setPage,
  page,
  title,
  t,
  data,
}: // sortingOptions,
any) {
  const sortingOptions = [
    { title: t("sorting_select.Featured"), id: 1 },
    { title: t("sorting_select.Normal"), id: 2 },
    { title: t("sorting_select.price_High"), id: 3 },
    { title: t("sorting_select.price_Low"), id: 4 },
  ];

  const router = useRouter();
  // useEffect(() => {
  //   router.push(title?.replace(/\s/g, "-"));
  // }, []);
  return (
    // <section className="SearchProperty__main--section min-h-screen w-[66%] bg- clg:w-full">
    <section className="w-full">
      <div className="selection_options--props--count flex ss:flex-col justify-between items-center flex-wrap gap-4 asm:justify-center asm:mb-9">
        <h1 className=" text-3xl ss:text-lg md:text-md clg:text-lg font-semibold asm:text-center uppercase">
          {title}
        </h1>
        <div className="min-w-[160px]">
          <ComboBoxTwo
            selectBox
            placeholder={t("sorting_select.placeholder")}
            setFormData={setFormData}
            formData={formData}
            data={sortingOptions}
            light
            shadow
            stateName={"priority_keys"}
            getDefaultValueFromURL="priority_keys"
          />
        </div>
      </div>
      <h2 className="Properties_counts text-base opacity-120 mt-3 asm:text-center flex gap-2 items-center">
        ( {data?.data?.original?.[1]?.total_props} ) {t("properties_word")}
        {data?.data?.original?.[1]?.featured_count > 0 && (
          <span className="bg-red500 text-bg px-3 py-1.5 inline-flex items-center w-fit rounded-full text-sm mx-3 gap-2">
            {data?.data?.original?.[1]?.featured_count} {""}
            {t("featured_word")}
          </span>
        )}
        {data?.data?.original?.[1]?.normal_count > 0 && (
          <span className="bg-secondary text-bg px-3 py-1.5 inline-flex items-center w-fit rounded-full text-sm">
            {data?.data?.original?.[1]?.normal_count} {t("normal_word")}
          </span>
        )}
      </h2>

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
          formData={formData}
          setFormData={setFormData}
          step={step}
          setStep={setStep}
          title={title}
        />
      )}

      <PropertiesMemoized data={data?.data?.original?.[0]?.data} />
      {data?.data?.original?.[0]?.meta?.last_page > 1 && (
        <PaginationTwo
          t={t}
          data={data?.data?.original?.[0]}
          page={page}
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </section>
    // </section>
  );
}

// "use client";

// import { memo, useCallback, useMemo, useState } from "react";
// import Pagination from "../SearchProperty/components/Pagination";
// import ComboBoxTwo from "./ComboBoxTwo";
// import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import SearchPropertyCard from "../SearchProperty/components/SearchPropertyCard";
// import AdsSearch from "../SearchProperty/components/AdsSearch";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
// import PaginationTwo from "./PaginationTwo";

// const PropertiesMemoized = memo(function PropertiesMemoized({ data }: any) {
//   const user = useSelector(userData);
//   const dispatchRedux = useDispatch();
//   const { t, i18n } = useTranslation("Pages_SearchProperty");

//   const dataBeforADS = data?.slice(0, 4);
//   const dataAfterADS = data?.slice(dataBeforADS.length, data.length);

//   return (
//     <>
//       <div className="all__properties--wrapper w-full grid-auto-fit my-10">
//         {dataBeforADS?.map((property: any, i: number) => (
//           <SearchPropertyCard
//             key={i}
//             property={property}
//             makeBgLight
//             user={user}
//             t={t}
//             ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
//             i18n={i18n}
//           />
//         ))}
//       </div>
//       {/*  */}

//       {/* start ADS */}
//       <AdsSearch />
//       {/* end ADS */}

//       {/*  */}
//       <div className="all__properties--wrapper w-full grid-auto-fit my-10">
//         {dataAfterADS?.map((property: any, i: number) => (
//           <SearchPropertyCard
//             key={i}
//             property={property}
//             makeBgLight
//             user={user}
//             t={t}
//             ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
//             i18n={i18n}
//           />
//         ))}
//       </div>
//     </>
//   );
// });

// export default function SectionOne({
//   formData,
//   setFormData,
//   step,
//   setPage,
//   page,
//   title,
//   t,
//   data,
// }: any) {
//   function Filters({
//     data,
//   }: {
//     data: {
//       properties_count: number;
//       id: number;
//       title: string;
//     }[];
//   }) {
//     const [slice, setSlice] = useState<any>(9);
//     const [step, setStep] = useState<number>(0);
//     const { t } = useTranslation("Pages_SearchProperty");
//     const router = useRouter();
//     const pathname = usePathname();
//     // const searchParams = useSearchParams();
//     // const URLParams = Object.fromEntries(searchParams.entries());

//     const handleSliceClick = useCallback(() => {
//       setSlice((prev: any) => (prev === 9 ? data?.length : 9));
//     }, [data?.length]);

//     // const handleFilterClick = useCallback(
//     const handleFilterClick = (prop: any) => {
//       setStep((prev: number) => prev + 1);

//       const newParams = { ...formData };
//       console.log(newParams.city);

//       if (!newParams.purpose) {
//         newParams.purpose = prop?.id;
//       } else if (!newParams.property_type) {
//         newParams.property_type = prop?.id;
//       } else if (newParams.city === "-1" && step !== 4 && step !== 5) {
//         newParams.city = prop?.id;
//       } else if (newParams.region === "-1") {
//         newParams.region = prop?.id;
//       } else if (newParams.sub_region === "-1") {
//         newParams.sub_region = prop?.id;
//       }

//       // const queryString = new URLSearchParams(newParams).toString();
//       // router.push(${pathname}/?${queryString});
//       setFormData((prevData: any) => ({
//         ...prevData,
//         ...newParams,
//       }));
//       // router.push(${title?.replace(/\s/g, "-")});
//     };
//     console.log(step);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     //   [router, pathname, step, formData]
//     // );

//     const NotEqualZero = useMemo(() => {
//       console.log(data);

//       return data?.filter((prop) => prop?.properties_count !== -1);
//     }, [data]);

//     if (data?.length === 0 || data?.every((prop) => prop?.properties_count === 0)) {
//       return;
//     } else {
//       return (
//         <div className="w-full grid grid-cols-4 min-h-[100px] ss:grid-cols-2 mt-10 bg-[#edf3f8]  gap-5 p-2 rounded relative">
//           {NotEqualZero?.slice(0, slice)?.map((prop) => {
//             return (
//               <button
//                 key={prop?.id}
//                 onClick={() => handleFilterClick(prop)}
//                 className="hover:underline col-span-1 text-[14px] text-start"
//               >
//                 {prop?.title} ({prop?.properties_count})
//               </button>
//             );
//           })}
//           {NotEqualZero?.length > 9 && (
//             <button
//               onClick={handleSliceClick}
//               className="absolute ltr:right-2  hover:underline bottom-1 rtl:left-2 "
//             >
//               {slice === 9 ? t("show_more_word") : t("show_less_word")}
//             </button>
//           )}
//         </div>
//       );
//     }
//   }

//   return (
//     <section className="SearchProperty__main--section min-h-screen w-[66%] bg- clg:w-full">
//       <section className="w-full ">
//         <div className="selection_options--props--count flex ss:flex-col justify-between items-center flex-wrap gap-4 asm:justify-center asm:mb-9">
//           <h1 className=" text-3xl ss:text-lg md:text-md clg:text-lg font-semibold asm:text-center uppercase">
//             {title}
//           </h1>
//           <div className="min-w-[160px]">
//             <ComboBoxTwo
//               selectBox
//               placeholder={t("sorting_select.placeholder")}
//               setDataSearch={setFormData}
//               searchParams={formData}
//               data={formData}
//               light
//               shadow
//               getDefaultValueFromURL="srt"
//             />
//           </div>
//         </div>
//         <h2 className="Properties_counts text-base opacity-120 mt-3 asm:text-center flex gap-2 items-center">
//           ( {data?.data?.original?.[1]?.total_props} ) {t("properties_word")}
//           {data?.data?.original?.[1]?.featured_count > 0 && (
//             <span className="bg-red500 text-bg px-3 py-1.5  inline-flex items-center w-fit rounded-full text-sm mx-3 gap-2">
//               {data?.data?.original?.[1]?.featured_count} {""}
//               {t("featured_word")}
//             </span>
//           )}
//           {data?.data?.original?.[1]?.normal_count > 0 && (
//             <span className="bg-secondary text-bg px-3 py-1.5  inline-flex items-center w-fit rounded-full text-sm ">
//               {data?.data?.original?.[1]?.normal_count} {t("normal_word")}
//             </span>
//           )}
//         </h2>

//         {step <= 5 && (
//           <Filters
//             data={
//               step === 1
//                 ? data?.data?.original?.[2]?.property_purpose
//                 : step === 2
//                 ? data?.data?.original?.[2]?.property_types
//                 : step === 3
//                 ? data?.data?.original?.[2]?.all_cities
//                 : step === 4
//                 ? data?.data?.original?.[2]?.all_regions
//                 : step === 5
//                 ? data?.data?.original?.[2]?.all_sub_regions
//                 : ""
//             }
//           />
//         )}

//         <PropertiesMemoized data={data?.data?.original?.[0]?.data} />
//         {data?.data?.original?.[0]?.meta?.last_page > 1 && (
//           <PaginationTwo
//             t={t}
//             data={data?.data?.original?.[0]}
//             page={page}
//             setPage={setPage}
//             // formData={formData}
//             // setFormData={setFormData}
//             //isPreviousData={isPreviousData}
//           />
//         )}
//       </section>
//     </section>
//   );
// }
