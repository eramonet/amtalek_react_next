import { useCallback, useEffect } from "react";
// import { Heading, HeadingTwo, HelmetTags } from "@/MainComponents/index";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import toast from "react-hot-toast";
// import { userData } from "@/Features/AuthenticationSlice";
import { useSelector } from "react-redux";
import { FaArrowRight, FaArrowLeftLong } from "react-icons/fa6";
import { Tooltip } from "antd";

import {
  ComboBox,
  SubmitBtnComponent,
  CheckBox,
  TextComponent,
  NumberComponent,
  UploadFileComponent,
  ReCaptcha,
} from "@/FormComponents/index";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

// import { DragDropArea, TextEditor } from "@/SubComponents/index";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import { TUser } from "@/Types/AppTypes.js";
import React from "react";
import { userData } from "@/Store/Features/AuthenticationSlice";
import Heading from "@/components/Heading";
import HeadingTwo from "@/MainComponents/HeadingTwo";
import TextEditor from "@/SubComponents/TextEditor copy";
import DragDropArea from "@/SubComponents/DragDropArea";

function DynamicField(props: any) {
  return (
    <div className="property__dynamic--fields--row flex asm:flex-col w-full  h-[100px] asm:h-fit items-start asm:items-center justify-between gap-10 px-16 asm:px-0 md:gap-6">
      <div className=" key flex w-1/2 asm:w-full  max-w-[430px] flex-col items-start justify-center gap-2 ">
        <label className="w-full " htmlFor={`key_${props.index + 1}`}>
          {props.t("form.Quick_Summary.Title.label")}
        </label>
        <input
          className={` light-bg-inputs w-full `}
          type="text"
          name={`key_${props.index + 1}`}
          id={`key_${props.index + 1}`}
          placeholder={props.t("form.Quick_Summary.Title.placeholder")}
          autoComplete="on"
          {...props.register(`summary.${props.index}.key`, {
            required: props.length === 1 ? false : true,
          })}
        />
        {props.errors?.summary?.[props.index]?.key && (
          <p className="text-xs text-red-500 ">
            {props.errors?.summary?.[props.index]?.key.type === "required" &&
              props.t("form.Quick_Summary.Title.required_err_msg")}
          </p>
        )}

        {
          //!--- server errors --------
          props.ServerErrors?.response?.data?.errors?.summary?.[props.index]?.key && (
            <p className="pt-2 text-xs text-red-500">
              {props.ServerErrors?.response?.data?.errors?.summary?.[props.index]?.key[0]}
            </p>
          )
        }
      </div>
      {/**
       * //!-----------value
       */}
      <div className=" value flex w-1/2 asm:w-full  max-w-[430px] flex-col items-start justify-center gap-2 ">
        <label className="w-full " htmlFor={`value_${props.index + 1}`}>
          {props.t("form.Quick_Summary.Value.label")}
        </label>
        <input
          className={` light-bg-inputs w-full `}
          type="text"
          name={`value_${props.index + 1}`}
          id={`value_${props.index + 1}`}
          placeholder={props.t("form.Quick_Summary.Value.placeholder")}
          autoComplete="on"
          {...props.register(`summary.${props.index}.value`, {
            required: props.length === 1 ? false : true,
          })}
        />
        {props.errors?.summary?.[props.index]?.value && (
          <p className="text-xs text-red-500 ">
            {props.errors?.summary?.[props.index]?.value.type === "required" &&
              props.t("form.Quick_Summary.Value.required_err_msg")}{" "}
          </p>
        )}

        {
          //!--- server errors --------
          props.ServerErrors?.response?.data?.errors?.summary?.[props.index]?.value && (
            <p className="pt-2 text-xs text-red-500">
              {props.ServerErrors?.response?.data?.errors?.summary?.[props.index]?.value[0]}
            </p>
          )
        }
      </div>

      {/**
       * //!-----------delete
       */}
      <div className="h-full flex items-center">
        <button
          type="button"
          onClick={() => props.callBkFn?.()}
          className={` group  round pt-2 pb-1 px-[6px] trns bg-delete text-bg  hover:bg-transparent border-delete border-2 hover:text-delete active:scale-90    ${
            props.index === 0 && "hidden"
          }`}
        >
          <FontAwesomeIcon
            className=" text-xl  group-hover:text-light active:scale-90"
            icon={faTrash}
          />
        </button>
      </div>
    </div>
  );
}

export function Component() {
  const { t } = useTranslation("Pages_SubmitProperty");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    getValues,
    control,
  }: any = useForm({
    mode: "onBlur",
    defaultValues: {
      purpose: "",
      category: "",
      priority: "",

      country: "",
      city: "",
      region: "",
      sub_region: "",
      currency: 1,
      finishing: "",
      reception_floor_type: "",

      property_type: "",

      amenities: [],
      sliders: [],
      // summary: [{ key: "", value: "" }],

      property_description_en: "",
      property_description_ar: "",

      primary_image: "",
      for_what: "",
      rent_duration: "",

      not_ropot: "no",
      from: "Web",
      on_site: "yes",
    },
  });
  // const { fields, append, remove } = useFieldArray({
  //   name: "summary",
  //   control,
  // });

  //!--- getValues values ----
  const ArTitle = watch("property_title_ar");
  const EnTitle = watch("property_title_en");
  const ArAddress = watch("address_ar");
  const EnAddress = watch("address_en");
  const purpose = watch("purpose");
  const category = watch("category");
  const priority = watch("priority");
  const location = watch("location");
  const building_number = watch("building_num");
  const floor_number = watch("floor_num");
  const apartment_num = watch("apartment_num");
  const bath_room_no = watch("bath_room_no");
  const total_area = watch("total_area");
  const living_room = watch("living_room");
  const no_floors = watch("no_floors");
  const reception_pieces = watch("reception_pieces");
  const kitchens_no = watch("kitchens_no");
  const bed_rooms_no = watch("bed_rooms_no");
  const sale_price = watch("sale_price");
  const rent_price = watch("rent_price");
  const sub_region = watch("sub_region");
  const country = watch("country");
  const city = watch("city");
  const region = watch("region");

  const finishing = watch("finishing");
  const reception_floor_type = watch("reception_floor_type");

  const property_type = watch("property_type");

  const amenities = watch("amenities");
  const sliders = watch("sliders");
  const primary_image = watch("primary_image");
  const property_description_en = watch("property_description_en");
  const property_description_ar = watch("property_description_ar");

  const not_ropot = watch("not_ropot");
  const for_what = watch("for_what");
  const rent_duration = watch("rent_duration");

  const priorityData = [
    { id: "normal", title: t("form.priority.selections.Normal") },
    {
      id: "featured",
      title: t("form.priority.selections.Featured"),
    },
  ];
  const RentDurationData = [
    { id: "daily", title: t("form.rent_duration.selections.daily") },
    { id: "monthly", title: t("form.rent_duration.selections.monthly") },
    { id: "3_months", title: t("form.rent_duration.selections.3_months") },
    { id: "6_months", title: t("form.rent_duration.selections.6_months") },
    { id: "9_months", title: t("form.rent_duration.selections.9_months") },
    { id: "yearly", title: t("form.rent_duration.selections.yearly") },
  ];
  const ForWhatData = [
    { id: "for_sale", title: t("form.for_what.selections.for_sale") },
    {
      id: "for_rent",
      title: t("form.for_what.selections.for_rent"),
    },
    {
      id: "for_both",
      title: t("form.for_what.selections.for_both"),
    },
  ];
  const { data: categoriesData } = useFetchData(
    "categories",
    process.env.NEXT_PUBLIC_PROPERTIES_CATEGORIES,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  const { data: countriesData } = useFetchData(
    "countries",
    process.env.NEXT_PUBLIC_COUNTRIES_REGISTER,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );
  const { data: citiesData, refetch: refetchCities } = useFetchData(
    "cities",
    `${process.env.NEXT_PUBLIC_CITIES_BASED_ON_COUNTRIES_REGISTER}${country}`,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!country
  );

  const { data: regionsData, refetch: refetchRegions } = useFetchData(
    "regions",
    `${process.env.NEXT_PUBLIC_REGIONS_BASED_ON_CITIES_REGISTER}${city}`,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!city
  );
  console.log(regionsData);

  const { data: subregionsData, refetch: refetchsubRegions } = useFetchData(
    "subregions",
    `sub-regions/${region}`,
    false,
    false,
    region,
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!region
  );

  const { data: PurposeData } = useFetchData(
    "currencies",
    process.env.NEXT_PUBLIC_PROPERTY_PURPOSE,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );
  const { data: PropertyFinishingData } = useFetchData(
    "propertyFinishing",
    process.env.NEXT_PUBLIC_PROPERTY_FINISHING,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );
  const { data: ReceptionFloorTypeData } = useFetchData(
    "receptionFloorType",
    process.env.NEXT_PUBLIC_RECEPTION_FLOOR_TYPE,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );
  const { data: PropertyTypesData } = useFetchData(
    "propertyTypes",
    process.env.NEXT_PUBLIC_PROPERTY_TYPES,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );
  const { data: PropertyAmenitiesData } = useFetchData(
    "propertyAmenities",
    process.env.NEXT_PUBLIC_PROPERTY_AMENITIES,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  const recaptchaRef = useRef<any>(null);
  const [submitted, setSubmitted] = useState<any>(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState<any>(false);
  const user = useSelector(userData);

  useEffect(() => {
    if (
      purpose !== "" &&
      category !== "" &&
      priority !== "" &&
      country !== "" &&
      city !== "" &&
      region !== "" &&
      finishing !== "" &&
      reception_floor_type !== "" &&
      property_type !== "" &&
      amenities.length > 0 &&
      sliders.length > 0 &&
      property_description_en !== "" &&
      property_description_ar !== "" &&
      for_what !== "" &&
      not_ropot !== "no"
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [
    purpose,
    not_ropot,
    category,
    priority,
    country,
    city,
    region,
    finishing,
    reception_floor_type,
    property_type,
    amenities.length,
    sliders.length,
    property_description_en,
    property_description_ar,
    for_what,
  ]);

  //!-- to handle if the user selects a country then choose another country, so refetch the cities of that country

  useEffect(() => {
    if (country !== "") {
      refetchCities();
    }
  }, [country, refetchCities]);
  useEffect(() => {
    if (city !== "") {
      refetchRegions();
    }
  }, [city, refetchRegions]);
  const [userProfileDataOutlet, refetch, isError, isPaused] = useOutletContext() as [
    TUser,
    () => void,
    boolean,
    boolean
  ];
  const {
    mutate,
    isLoading,
    error: ServerErrors,
  }: any = usePostData(
    true,
    () => {
      recaptchaRef.current.reset();
      reset();
      setValue("not_ropot", "no");
      navigate("/");
      setSubmitted(false);
      refetch();
    },
    true, // authorizedAPI: (يجب أن تحدد ما إذا كانت هذه القيمة true أو false بناءً على حاجتك)
    (error) => {
      // onError: معالجة الخطأ هنا
      console.error("An error occurred:", error);
    }
  );

  const onChange = useCallback(
    (value: any) => {
      if (value) {
        setValue("not_ropot", "yes");
      } else {
        setValue("not_ropot", "no");
      }
    },
    [setValue]
  );

  const onSubmit = useCallback(
    (data: any) => {
      //!  validations done in useEffect: at least one amentias, at least one slider img
      setSubmitted(true);
      if (user?.token) {
        if (allFieldsFilled) {
          const amenities = data?.amenities.filter((item: any) => typeof item !== "boolean");

          const finalData = {
            ...data,
            primary_image: data?.primary_image[0],
            amenities: JSON.stringify(amenities),
            // summary: JSON.stringify(data?.summary),
          };
          mutate({
            api: process.env.NEXT_PUBLIC_SUBMIT_PROPERTY,
            data: finalData,
            file: true,
          });
        } else {
          toast.error(t("form.error.fill_required"));
        }
      } else {
        toast.error(t("form.error.sign_in"));
      }
    },
    [allFieldsFilled, mutate, t, user?.token]
  );
  const { i18n } = useTranslation("");
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  return (
    <section className="w-full pb-44">
      {/* <HelmetTags title={` ${t("tab.title")}`} description={t("tab.description")} index={false} /> */}

      <form
        encType="multipart/form-data"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-6 "
      >
        <div className="Property__general--info flex flex-col items-start gap-6 mt-10   w-[950px] clg:w-[720px] md:w-[90%]  mx-auto bg">
          <Heading>{t("heading")}</Heading>
          <div className="w-full flex items-center justify-between h-10 relative">
            <div className="w-full h-3 rounded-full bg-gray-200 absolute top-1/2 -translate-y-1/2 left-0 ">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    step === 1
                      ? "0"
                      : step === 2
                      ? "25%"
                      : step === 3
                      ? "50%"
                      : step === 4
                      ? "75%"
                      : "100%",
                }}
                transition={{ duration: 0.5 }}
                className={`h-full bg-primary rounded-full `}
              ></motion.div>
            </div>
            <span
              className={`relative z-10 h-full w-10 rounded-full flex justify-center items-center ${
                step >= 1
                  ? " bg-primary text-white text-2xl"
                  : "text-primary/50 bg-gray-300 text-xl"
              }`}
            >
              1
            </span>
            <span
              className={`relative z-10 h-full w-10 rounded-full flex justify-center items-center ${
                step >= 2
                  ? " bg-primary text-white text-2xl"
                  : "text-primary/50 bg-gray-300 text-xl"
              }`}
            >
              2
            </span>
            <span
              className={`relative z-10 h-full w-10 rounded-full flex justify-center items-center ${
                step >= 3
                  ? " bg-primary text-white text-2xl"
                  : "text-primary/50 bg-gray-300 text-xl"
              }`}
            >
              3
            </span>
            <span
              className={`relative z-10 h-full w-10 rounded-full flex justify-center items-center ${
                step >= 4
                  ? " bg-primary text-white text-2xl"
                  : "text-primary/50 bg-gray-300 text-xl"
              }`}
            >
              4
            </span>
            <span
              className={`relative z-10 h-full w-10 rounded-full flex justify-center items-center ${
                step === 5
                  ? " bg-primary text-white text-2xl"
                  : "text-primary/50 bg-gray-300 text-xl"
              }`}
            >
              5
            </span>
          </div>
          <HeadingTwo style={"mt-6 mb-1 border-b-2 pb-3 !w-full"}>{t("sub_heading")}</HeadingTwo>
          {/**
           * //!------ Input Type text ----------
           */}
          {/**  Titles  */}
          {step === 1 ? (
            <>
              <div className="flex w-full items-start justify-between gap-16 md:flex-col md:gap-6">
                <TextComponent
                  t={t}
                  register={register}
                  name="property_title_en"
                  label={t("form.property_title_en.label")}
                  placeholder={t("form.property_title_en.placeholder")}
                  validations={{
                    pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?\s]*$/,
                  }}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  dir="ltr"
                />

                <TextComponent
                  t={t}
                  register={register}
                  name="property_title_ar"
                  label={t("form.property_title_ar.label")}
                  placeholder={t("form.property_title_ar.placeholder")}
                  validations={{
                    pattern: /^[\u0621-\u064A0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?؟\s]+$/i,
                  }}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  inputStyle="pr-[0.5rem]"
                  dir="rtl"
                />
              </div>
              {/**  Addresses  */}
              <div className="flex w-full items-start justify-between gap-16 md:flex-col md:gap-6">
                {" "}
                <TextComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="address_en"
                  label={t("form.address_en.label")}
                  placeholder={t("form.address_en.placeholder")}
                  validations={{
                    pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?\s]*$/,
                  }}
                  dir="ltr"
                />
                <TextComponent
                  t={t}
                  register={register}
                  name="address_ar"
                  label={t("form.address_ar.label")}
                  placeholder={t("form.address_ar.placeholder")}
                  validations={{
                    pattern: /^[\u0621-\u064A0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?؟\s]+$/i,
                  }}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  inputStyle="pr-[0.5rem]"
                  dir="rtl"
                />
              </div>
              {/**  Video & Location  */}

              <div className="flex w-full items-start justify-between gap-16 md:flex-col md:gap-6">
                <TextComponent
                  t={t}
                  required={false}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="video"
                  label={t("form.video.label")}
                  placeholder={t("form.video.placeholder")}
                  validations={{
                    pattern:
                      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                  }}
                />
                <TextComponent
                  t={t}
                  required={false}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="location"
                  label={t("form.location.label")}
                  placeholder={t("form.location.placeholder")}
                  loc={true}
                  validations={{
                    pattern:
                      /^<iframe\s*src="https:\/\/www\.google\.com\/maps\/embed\?[^"]+"*\s*[^>]+>*<\/iframe>*$/,
                  }}
                />
              </div>
            </>
          ) : step === 2 ? (
            <>
              {/**
               * //!------ Input Type Number ----------
               */}
              {/**  Building Number & Floor Number & Apartment Number  */}
              <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-6">
                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="building_num"
                  label={t("form.building_num.label")}
                  placeholder={t("form.building_num.placeholder")}
                  width="w-1/3 md:w-full"
                />
                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="floor_num"
                  label={t("form.floor_num.label")}
                  placeholder={t("form.floor_num.placeholder")}
                  width="w-1/3 md:w-full"
                />

                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="apartment_num"
                  label={t("form.apartment_num.label")}
                  placeholder={t("form.apartment_num.placeholder")}
                  width="w-1/3 md:w-full"
                />
              </div>
              {/**  Unit Floor & Garages Number & Living Room   */}
              <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-6">
                {/* <NumberComponent
              t={t}
              register={register}
              errors={errors}
              ServerErrors={ServerErrors}
              name="garage_no"
              label={t("form.garage_no.label")}
              placeholder={t("form.garage_no.placeholder")}
              width="w-1/3 md:w-full"
            /> */}
                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="bath_room_no"
                  label={t("form.bath_room_no.label")}
                  placeholder={t("form.bath_room_no.placeholder")}
                  width="w-1/3 md:w-full"
                />

                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="total_area"
                  label={t("form.total_area.label")}
                  placeholder={t("form.total_area.placeholder")}
                  width="w-1/3 md:w-full"
                  validations={{
                    pattern: /^[0-9]+$/,
                    min: 1,
                  }}
                />
                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="living_room"
                  label={t("form.living_room.label")}
                  placeholder={t("form.living_room.placeholder")}
                  width="w-1/3 md:w-full"
                />
              </div>
              {/**  Total Area & Land Area & Garage Size  */}
              {/* <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-6"></div> */}
              {/**  Floors Number & Room Ensuite & Reception Pieces  */}
              <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-6">
                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="no_floors"
                  label={t("form.no_floors.label")}
                  placeholder={t("form.no_floors.placeholder")}
                  width="w-1/3 md:w-full"
                />

                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="reception_pieces"
                  label={t("form.reception_pieces.label")}
                  placeholder={t("form.reception_pieces.placeholder")}
                  width="w-1/3 md:w-full"
                />
                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="kitchens_no"
                  label={t("form.kitchens_no.label")}
                  placeholder={t("form.kitchens_no.placeholder")}
                  width="w-1/3 md:w-full"
                />
              </div>
              {/**  Bath Rooms Number & Bed Rooms Number & Kitchens Number  */}
              <div className="flex w-full items-start  gap-10 md:flex-col md:gap-6">
                <NumberComponent
                  t={t}
                  register={register}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  name="bed_rooms_no"
                  label={t("form.bed_rooms_no.label")}
                  placeholder={t("form.bed_rooms_no.placeholder")}
                  width="w-1/3 md:w-full"
                />

                <div className="flex w-1/3 md:w-full max-w-[223px] md:max-w-full flex-col items-start text-lg justify-center gap-2">
                  {t("form.for_what.label")}
                  <ComboBox
                    selectBox
                    setValue={setValue}
                    data={ForWhatData}
                    placeholder={t("form.for_what.placeholder")}
                    stateName="for_what"
                    light
                  />
                  {submitted && for_what === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.for_what.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.for_what && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.for_what?.[0]}
                      </p>
                    )
                  }
                </div>
                {(for_what === "for_sale" || for_what === "for_both") && (
                  <NumberComponent
                    t={t}
                    name="sale_price"
                    label={t("form.sale_price.label")}
                    placeholder={t("form.sale_price.placeholder")}
                    width="w-1/3 md:w-full max-w-[223px] md:max-w-full"
                    register={register}
                    errors={errors}
                    ServerErrors={ServerErrors}
                  />
                )}
              </div>
              {/** Rent / Sale / Both Rent Price Per Month & Sale Price  */}
              <div
                className={`flex w-full items-start ${
                  for_what === "for_both" ? "justify-start" : "justify-start"
                }  gap-10 md:flex-col md:gap-6`}
              >
                {(for_what === "for_rent" || for_what === "for_both") && (
                  <NumberComponent
                    t={t}
                    name="rent_price"
                    label={t("form.rent_price.label")}
                    placeholder={t("form.rent_price.placeholder")}
                    width="w-1/3 md:w-full max-w-[223px] md:max-w-full"
                    register={register}
                    errors={errors}
                    ServerErrors={ServerErrors}
                  />
                )}
                {for_what === "for_rent" && (
                  <div className="flex w-1/3 md:w-full max-w-[223px] md:max-w-full flex-col items-start text-lg justify-center gap-2">
                    {t("form.rent_duration.label")}
                    <ComboBox
                      selectBox
                      setValue={setValue}
                      data={RentDurationData}
                      placeholder={t("form.rent_duration.placeholder")}
                      stateName="rent_duration"
                      light
                    />
                    {submitted && rent_duration === "" && (
                      <p className="pt-2 text-xs text-red-500">{t("form.rent_duration.err_msg")}</p>
                    )}

                    {
                      //!--- server errors --------
                      ServerErrors?.response?.data?.errors?.rent_duration && (
                        <p className="pt-2 text-xs text-red-500">
                          {ServerErrors?.response?.data?.errors?.rent_duration?.[0]}
                        </p>
                      )
                    }
                  </div>
                )}
                <div className="flex w-1/3 items-start justify-betwee gap- md:flex-col ">
                  {for_what === "for_both" && (
                    <div className="flex w-full md:w-full max-w-[223px] md:max-w-full flex-col items-start text-lg justify-center gap-2">
                      {t("form.rent_duration.label")}
                      <ComboBox
                        selectBox
                        setValue={setValue}
                        data={RentDurationData}
                        placeholder={t("form.rent_duration.placeholder")}
                        stateName="rent_duration"
                        light
                      />
                      {submitted && rent_duration === "" && (
                        <p className="pt-2 text-xs text-red-500">
                          {t("form.rent_duration.err_msg")}
                        </p>
                      )}
                      {
                        //!--- server errors --------
                        ServerErrors?.response?.data?.errors?.rent_duration && (
                          <p className="pt-2 text-xs text-red-500">
                            {ServerErrors?.response?.data?.errors?.rent_duration?.[0]}
                          </p>
                        )
                      }
                    </div>
                  )}
                  {/* <label
                //!--this element is a placeholder to align the elements properly, because this row has only 2 columns
                className={` flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2  `}
                htmlFor=""
              ></label> */}
                </div>
              </div>
              {/** Rent Duration */}
              {/* <div className="SubmitProperty__separator w-5/6 h-[1px] bg-secondary mx-auto my-5"></div> */}
            </>
          ) : step === 3 ? (
            <>
              {/**
               * //!------  Type Select ----------
               */}
              {/** purpose  & Category  &  priority   */}
              <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-6">
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {t("form.purpose.label")}
                  <ComboBox
                    setValue={setValue}
                    data={PurposeData}
                    placeholder={t("form.purpose.placeholder")}
                    stateName="purpose"
                    light
                  />
                  {submitted && purpose === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.purpose.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.purpose && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.purpose[0]}
                      </p>
                    )
                  }
                </div>
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {t("form.category.label")}
                  <ComboBox
                    setValue={setValue}
                    data={categoriesData}
                    placeholder={t("form.category.placeholder")}
                    stateName="category"
                    light
                  />
                  {submitted && category === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.category.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.category && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.category[0]}
                      </p>
                    )
                  }
                </div>
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {t("form.priority.label")}
                  <ComboBox
                    setValue={setValue}
                    data={priorityData}
                    placeholder={t("form.priority.placeholder")}
                    stateName="priority"
                    light
                  />
                  {submitted && priority === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.priority.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.priority && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.priority[0]}
                      </p>
                    )
                  }
                </div>
              </div>
              {/** country  & city  &  region   */}
              <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-6">
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {t("form.country.label")}
                  <ComboBox
                    setValue={setValue}
                    data={countriesData}
                    placeholder={t("form.country.placeholder")}
                    stateName={"country"}
                    light
                  />
                  {submitted && country === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.country.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.country && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.country[0]}
                      </p>
                    )
                  }
                </div>
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {country && (
                    <>
                      {t("form.city.label")}
                      <ComboBox
                        setValue={setValue}
                        data={citiesData}
                        placeholder={t("form.city.placeholder")}
                        stateName="city"
                        light
                      />
                    </>
                  )}
                  {submitted && city === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.city.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.city && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.city[0]}
                      </p>
                    )
                  }
                </div>
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {city && (
                    <>
                      {t("form.region.label")}
                      <ComboBox
                        setValue={setValue}
                        data={regionsData}
                        placeholder={t("form.region.placeholder")}
                        stateName="region"
                        light
                      />
                    </>
                  )}
                  {submitted && region === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.region.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.region && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.region[0]}
                      </p>
                    )
                  }
                </div>
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {region && (
                    <>
                      {t("form.sub_region.label")}
                      <ComboBox
                        setValue={setValue}
                        data={subregionsData}
                        placeholder={t("form.sub_region.placeholder")}
                        stateName="sub_region"
                        light
                      />
                    </>
                  )}
                  {submitted && sub_region === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.sub_region.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.region && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.region[0]}
                      </p>
                    )
                  }
                </div>
              </div>
              {/**  Property Type & finishing  &  Reception Floor Type   */}
              <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-6">
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {t("form.property_type.label")}
                  <ComboBox
                    setValue={setValue}
                    data={PropertyTypesData}
                    placeholder={t("form.property_type.placeholder")}
                    stateName="property_type"
                    light
                  />
                  {submitted && property_type === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.property_type.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.property_type && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.property_type[0]}
                      </p>
                    )
                  }
                </div>
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {t("form.finishing.label")}
                  <ComboBox
                    setValue={setValue}
                    data={PropertyFinishingData}
                    placeholder={t("form.finishing.placeholder")}
                    stateName="finishing"
                    light
                  />
                  {submitted && finishing === "" && (
                    <p className="pt-2 text-xs text-red-500">{t("form.finishing.err_msg")}</p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.finishing && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.finishing[0]}
                      </p>
                    )
                  }
                </div>
                <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-center gap-2">
                  {t("form.reception_floor_type.label")}
                  <ComboBox
                    setValue={setValue}
                    data={ReceptionFloorTypeData}
                    placeholder={t("form.reception_floor_type.placeholder")}
                    stateName="reception_floor_type"
                    light
                  />
                  {submitted && reception_floor_type === "" && (
                    <p className="pt-2 text-xs text-red-500">
                      {t("form.reception_floor_type.err_msg")}
                    </p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.reception_floor_type && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.reception_floor_type[0]}
                      </p>
                    )
                  }
                </div>
              </div>
            </>
          ) : step === 4 ? (
            <>
              {/*
            //!------  primary image  & slider  ----------
           */}
              <HeadingTwo style={"mt-6 mb-1"}>
                {t("form.Photos_section_title")}

                <Tooltip title={t("form.Photos_section_tooltip_p")} placement="top">
                  <FontAwesomeIcon
                    className="cursor-pointer mx-2 text-[20px]"
                    icon={faCircleInfo}
                  />
                </Tooltip>
              </HeadingTwo>

              <UploadFileComponent
                primarySubmit
                register={register}
                errors={errors}
                ServerErrors={ServerErrors}
                name="primary_image"
                label={t("form.primary_image.label")}
                btnText={t("form.primary_image.btnText")}
                watch={watch}
                t={t}
                fileFor="property"
              />
              {i18n.language.startsWith("ar") ? (
                <span className="text-red-500 text-sm">يفضل 942 بكسل * 450 بكسل</span>
              ) : (
                <span className="text-red-500 text-sm">Prefer 942px * 450px</span>
              )}
              <div className="Property__sliders--drag--drop w-full mx-auto mt-7 ">
                <HeadingTwo style={"mt-6 mb-4"}>
                  {t("form.Photos_section_title_Slider")}

                  <Tooltip title={t("form.Photos_section_tooltip")} placement="top">
                    <FontAwesomeIcon
                      className="cursor-pointer mx-2 text-[20px]"
                      icon={faCircleInfo}
                    />
                  </Tooltip>
                </HeadingTwo>
                <DragDropArea setValue={setValue} t={t} />
              </div>
              <HeadingTwo style={"mt-6 mb-1"}>
                {t("form.property_description_en.Heading")}
              </HeadingTwo>
              <div className="Property__TextEditor w-full mx-auto ">
                <TextEditor
                  setValue={setValue}
                  stateName="property_description_en"
                  watch={watch}
                  required_err_msg={t("TextEditor.property_description_en.required_err_msg")}
                />
              </div>
              <HeadingTwo style={"mt-6 mb-1"}>
                {t("form.property_description_ar.Heading")}
              </HeadingTwo>
              <div className="Property__TextEditor w-full mx-auto ">
                <TextEditor
                  lng="ar"
                  setValue={setValue}
                  stateName="property_description_ar"
                  watch={watch}
                  required_err_msg={t("TextEditor.property_description_ar.required_err_msg")}
                />
              </div>
            </>
          ) : (
            <>
              {/**
               * //!------  amenities ----------
               */}
              <div className="bg-grey w-full Property__amenities mt-5 pb-6 sm:pb-0 min-h-[400px]">
                <div className="flex flex-col items-start gap-6 w-[950px] clg:w-[720px] md:w-[90%]  mx-auto  px-5">
                  <HeadingTwo style={"mt-6 mb-1"}>{t("form.amenities.Heading")}</HeadingTwo>
                  <ul className="property__amenities w-full grid grid-cols-3  md:grid-cols-2 sm:grid-cols-1   gap-8 sm:h-[70vh] sm:overflow-y-auto ">
                    {PropertyAmenitiesData?.map((amenity: any, index: number) => (
                      <CheckBox
                        key={amenity.id}
                        register={register}
                        name={`amenities.${index}`}
                        label={amenity.title}
                        value={amenity.id}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-[750px] clg:w-[720px] md:w-[90%]   mx-auto flex justify-between items-center md:flex-col md:gap-7 md:mt-5 ">
                <ReCaptcha
                  t={t}
                  refs={recaptchaRef}
                  onChange={onChange}
                  error={submitted && not_ropot === "no"}
                  ServerError={
                    ServerErrors?.response?.data?.errors?.not_ropot &&
                    ServerErrors?.response?.data?.errors?.not_ropot[0]
                      ? ServerErrors?.response?.data?.errors?.not_ropot[0]
                      : null
                  }
                />
                {/** Submit Button */}
                <SubmitBtnComponent
                  disabled={!isValid || !allFieldsFilled || isLoading}
                  isLoading={isLoading}
                  value={t("form.SubmitBtnComponent.value")}
                  width="w-1/3 md:w-1/2 sm:w-3/4"
                  mt="mt-0"
                />
              </div>
            </>
          )}
          {/* <div className="SubmitProperty__separator w-5/6 h-[1px] bg-secondary mx-auto my-5"></div> */}
          <div className="w-full flex items-center justify-center gap-10">
            <button
              className={` px-5 rounded-xl flex gap-2 items-center p-2 ${
                step === 1
                  ? "  text-primary/50 bg-gray-300 text-lg !cursor-not-allowed"
                  : "bg-primary text-white text-lg "
              }`}
              onClick={(e) => {
                setStep(step - 1);
                e.preventDefault();
              }}
              disabled={step === 1}
            >
              <FaArrowLeftLong
                className={`${i18n.language.startsWith("ar") ? "rotate-180" : ""}`}
              />
              {i18n.language.startsWith("ar") ? "العودة" : "Previous"}{" "}
            </button>
            <button
              className={`flex gap-2 items-center rounded-xl p-2
                ${
                  step === 1 &&
                  (ArTitle === "" || EnTitle === "" || EnAddress === "" || ArAddress === "") // ||
                    ? // location === ""
                      "text-primary/50 !bg-gray-300 text-lg !cursor-not-allowed"
                    : step === 2 &&
                      (building_number === "" ||
                        floor_number === "" ||
                        apartment_num === "" ||
                        bath_room_no === "" ||
                        total_area === "" ||
                        living_room === "" ||
                        no_floors === "" ||
                        reception_pieces === "" ||
                        kitchens_no === "" ||
                        bed_rooms_no === "" ||
                        for_what === "" ||
                        (for_what === "for_sale" && sale_price === "") ||
                        (for_what === "for_rent"
                          ? rent_price === "" || rent_duration === ""
                          : false) ||
                        (for_what === "for_both"
                          ? rent_price === "" || rent_duration === "" || sale_price === ""
                          : false))
                    ? "  text-primary/50 !bg-gray-300 text-lg !cursor-not-allowed "
                    : step === 3 &&
                      (purpose === "" ||
                        category === "" ||
                        priority === "" ||
                        country === "" ||
                        city === "" ||
                        region === "" ||
                        sub_region === "" ||
                        property_type === "" ||
                        finishing === "" ||
                        reception_floor_type === "")
                    ? "  text-primary/50 !bg-gray-300 text-lg !cursor-not-allowed "
                    : step === 4 &&
                      (primary_image === "" ||
                        sliders.length === 0 ||
                        property_description_ar === "" ||
                        property_description_en === "")
                    ? "  text-primary/50 !bg-gray-300 text-lg !cursor-not-allowed "
                    : "bg-primary text-white text-lg "
                }
                ${
                  step === 5
                    ? "  text-primary/50 !bg-gray-300 text-lg !cursor-not-allowed "
                    : "bg-primary text-white text-lg "
                } px-9`}
              disabled={
                step === 1
                  ? ArTitle === "" || EnTitle === "" || EnAddress === "" || ArAddress === "" //||
                  : // location === ""
                  step === 2
                  ? building_number === "" ||
                    floor_number === "" ||
                    apartment_num === "" ||
                    bath_room_no === "" ||
                    total_area === "" ||
                    living_room === "" ||
                    no_floors === "" ||
                    reception_pieces === "" ||
                    kitchens_no === "" ||
                    bed_rooms_no === "" ||
                    for_what === "" ||
                    (for_what === "for_sale" && sale_price === "") ||
                    (for_what === "for_rent" ? rent_price === "" || rent_duration === "" : false) ||
                    (for_what === "for_both"
                      ? rent_price === "" || rent_duration === "" || sale_price === ""
                      : false)
                  : step === 3
                  ? purpose === "" ||
                    category === "" ||
                    priority === "" ||
                    country === "" ||
                    city === "" ||
                    region === "" ||
                    sub_region === "" ||
                    property_type === "" ||
                    finishing === "" ||
                    reception_floor_type === ""
                  : step === 4
                  ? primary_image === "" ||
                    sliders.length === 0 ||
                    property_description_ar === "" ||
                    property_description_en === ""
                  : false
              }
              onClick={(e) => {
                e.preventDefault();
                setStep(step + 1);
              }}
            >
              {i18n.language.startsWith("ar") ? "التالي" : "Next"}
              <FaArrowRight className={`${i18n.language.startsWith("ar") ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
        {/* 
        <div className="bg-dark-gray w-full Property__Quick--Summary mt-5 pb-8 ">
          <div className="flex flex-col items-start gap-6 w-[750px] clg:w-[720px] md:w-[90%]  mx-auto ">
            <HeadingTwo style={"mt-6 mb-1"}>
              {t("form.Quick_Summary.Heading")}
            </HeadingTwo>
            <div className="property__dynamic--fields w-full flex flex-col gap-4 ">
              {fields.map((field, index) => {
                return (
                  <DynamicField
                    key={field.id}
                    id={field.id}
                    register={register}
                    length={fields.length}
                    callBkFn={() => {
                      remove(index);
                    }}
                    errors={errors}
                    ServerErrors={ServerErrors}
                    index={index}
                    t={t}
                  />
                );
              })}
              <div className="w-full flex justify-center mt-6">
                <button
                  type="button"
                  onClick={() => {
                    append({ key: "", value: "" });
                  }}
                  className="bg-secondary text-bg border-2 w-fit px-3 py-2 round flex items-center justify-center gap-2 trns hover:text-secondary hover:bg-transparent border-secondary active:scale-90"
                >
                  {t("form.Quick_Summary.add_btn_txt")}
                  <FontAwesomeIcon className="" icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </form>
    </section>
  );
}
