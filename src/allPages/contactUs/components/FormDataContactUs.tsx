"use client";
import {
  EmailComponent,
  MessageComponent,
  PhoneComponent,
  ReCaptcha,
  SubmitBtnComponent,
  TextComponent,
} from "@/FormComponents";
import { usePostData } from "@/Hooks/usePostData";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function FormDataContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const { t } = useTranslation("Pages_ContactUs");

  //   const map = useRef<any>(null);
  const recaptchaRef = useRef<any>(null);
  //   const contactDetails = useRef<any>(null);
  //   const slider = useRef<any>(null);
  //   const [contactUsData, setContactUsData] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      not_ropot: "no",
      from: "Web",
    },
  });
  const not_ropot = watch("not_ropot");

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
      setSubmitted(false);
    },
    true, // authorizedAPI
    (error) => {
      console.error("An error occurred:", error);
      // يمكنك تنفيذ معالجة الخطأ هنا
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
      setSubmitted(true);
      if (not_ropot !== "no") {
        mutate({
          api: `https://amtalek.amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_CONTACT_US_POST}`,
          data: data,
        });
      }
    },
    [mutate, not_ropot]
  );

  function handleIntersect(entries: any) {
    entries.map((entry: any) => {
      if (entry.target.classList.contains("ContactUs__scale-no-over") && entry.isIntersecting) {
        entry.target.classList.add("scaling__contact--animation--no--over--scale");
      } else if (
        entry.target.classList.contains("ContactUs__bottom--contact--details") &&
        entry.isIntersecting
      ) {
        entry.target.classList.add("to__left--contact--animation");
      }
    });
  }
  return (
    <div className="ContactUs__top--form w-2/5 clg:w-[47%]  amd:w-full h-full px-2 overflow-hidden ">
      <h1
        className="text-2xl font-medium flex justify-start  items-center gap-2 mb-5 mt-3  opacity-0 to__right--contact--animation leading-3"
        style={{ "--delay": "0.1s" } as any}
      >
        <FontAwesomeIcon className="text-xl rtl:rotate-180" icon={faArrowRight} />
        {t("heading")}
      </h1>
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="contact--form  w-full h-full  flex flex-col items-start justify-start gap-6 opacity-0 to__right--contact--animation"
        style={{ "--delay": "0.5s" } as any}
      >
        {/**  Name  && Phone*/}
        <div className="flex w-full items-start justify-between gap-10 md:flex-col lg:gap-6">
          {/**  Name  */}

          <TextComponent
            t={t}
            register={register}
            name="name"
            placeholder={t("Form.name.placeholder")}
            errors={errors}
            ServerErrors={ServerErrors}
            withIcon
            width={"w-1/2 md:w-full"}
          />
          {/** Phone  */}
          <PhoneComponent
            t={t}
            register={register}
            placeholder={t("Form.phone.placeholder")}
            name="phone"
            errors={errors}
            withIcon
          />
        </div>
        {/** Email  */}
        <EmailComponent
          t={t}
          register={register}
          placeholder={t("Form.email.placeholder")}
          name="email"
          errors={errors}
          withIcon
          width={"w-full"}
        />

        {/** Message  */}
        <MessageComponent
          t={t}
          register={register}
          placeholder={t("Form.message.placeholder")}
          errors={errors}
          ServerErrors={ServerErrors}
        />

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
          disabled={!isValid || not_ropot === "no" || isLoading}
          isLoading={isLoading}
          mt="mt-4"
          value={t("Form.SubmitBtnComponent.value")}
        />
      </form>
    </div>
  );
}
