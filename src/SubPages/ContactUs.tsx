"use client";
import {
  faArrowRight,
  faEnvelope,
  faGlobe,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
// import { useFetchData, usePostData } from "@/Hooks";
// import { Link } from "react-router-dom";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
// import {
//   BrokersSlider,
//   HelmetTags,
// } from "@/MainComponents";
import {
  EmailComponent,
  PhoneComponent,
  MessageComponent,
  SubmitBtnComponent,
  ReCaptcha,
  TextComponent,
} from "@/FormComponents/index";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ErrorMessage from "@/SubComponents/ErrorMessage";
import { useFetchData } from "@/Hooks/useFetchData";
import { usePostData } from "@/Hooks/usePostData";
import Image from "next/image.js";
import AgenciesAll from "@/allPages/Agencies/components/AgenciesAll";
import Link from "next/link";
import Agencies from "@/allPages/Agencies/Agencies";
import getData from "@/api/getData";

import DOMPurify from "dompurify";
interface ContactData {
  location: string;
  address: string;
  phone: string;
  mail: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  youtube: string;
}
// return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} />;
export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const { t, i18n } = useTranslation("Pages_ContactUs");

  const map = useRef<any>(null);
  const recaptchaRef = useRef<any>(null);
  const contactDetails = useRef<any>(null);
  const slider = useRef<any>(null);
  const [contactUsData, setContactUsData] = useState<any>({});

  async function fetchData() {
    const location = await getData(`web/${process.env.NEXT_PUBLIC_CONTACT_US_GET}`, i18n.language);
    setContactUsData(location?.data[0]);
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const {
  //   data: contactUsData,
  //   isLoading: loading,
  //   isError,
  //   isPaused,
  // } = useFetchData(
  //   "ContactUs",
  //   `https://amtalek.amtalek.com/amtalekadmin/public/api/web${process.env.NEXT_PUBLIC_CONTACT_US_GET}`,
  //   "",
  //   true
  // );

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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-250px 0px ",
      threshold: 0,
    };

    // const observer = new IntersectionObserver(handleIntersect, options);
    // observer.observe(map?.current);
    // observer.observe(contactDetails?.current);
    // observer.observe(slider?.current);
  }, []);

  // if (isError || isPaused) {
  //   return <ErrorMessage message={t("ErrorMessage")} />;
  // }
  /*  if (loading) {
    return <Loader />;
  } */
  return (
    <section className="site_container pt-4 pb-32 flex flex-col gap-32 md:gap-20 ">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}

      <div className="ContactUs__top w-full flex justify-between items-start gap-10 md:gap-20  amd:flex-col-reverse amd:items-center relative ">
        <Image
          width={1000}
          height={1000}
          className="absolute hidden w-96 top-full -translate-y-1/2 left-1/2 "
          src="/assets/arrow-contact.svg"
          alt="arrow-contact"
        />
        <div className="ContactUs__top--form w-2/5 clg:w-[47%]  amd:w-full h-full px-2 overflow-hidden ">
          <h1
            className="text-2xl font-medium flex justify-start  items-center gap-2 mb-5 mt-3  opacity-0 to__right--contact--animation leading-3"
            // style={{ "--delay": "0.1s" }}
          >
            <FontAwesomeIcon className="text-xl rtl:rotate-180" icon={faArrowRight} />
            {t("heading")}
          </h1>
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="contact--form  w-full h-full  flex flex-col items-start justify-start gap-6 opacity-0 to__right--contact--animation"
            // style={{ "--delay": "0.5s" }}
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
        <div className="ContactUs__top--patterns relative w-3/5 clg:w-[53%] amd:w-full h-[550px] rtl:flip  ">
          <div className="patterns--wrapper absolute bottom-1/2  translate-y-1/2 right-1/2 translate-x-1/2 asm:translate-x-[15%] sm:translate-x-[9%]">
            <div className="center__pattern--wrapper relative">
              <div className="hover:scale-95 transition-all duration-300 cursor-pointer">
                <Image
                  width={1000}
                  height={1000}
                  className="contact__pattern  scaling__contact--animation   contact__pattern--1 big---center  w-52 object-cover  aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer opacity-0"
                  src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/frames-for-your-heart-vbSRUrNm3Ik-unsplash.jpg?alt=media&token=a54f38c4-d7c8-4c46-90be-165c56635ad1"
                  alt="contact__pattern--1 "
                />
              </div>
              <div className="top---right absolute bottom-full ml-7 translate-y-1/4 w-40   aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer left-1/2">
                <Image
                  width={1000}
                  height={1000}
                  className="contact__pattern  scaling__contact--animation  contact__pattern--2  object-cover   w-full h-full opacity-0"
                  // style={{ "--delay": "0.2s" }}
                  src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/bernard-hermant-KqOLr8OiQLU-unsplash.jpg?alt=media&token=f7a40699-0b5a-4cb1-85a2-6f7d1d50207e"
                  alt="contact__pattern--2"
                />
              </div>
              <div className="right---center absolute bottom-1/2 translate-y-1/2  left-full ml-4  w-32  aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer">
                <Image
                  width={1000}
                  height={1000}
                  className="contact__pattern  scaling__contact--animation  contact__pattern--3    object-cover w-full h-full opacity-0"
                  // style={{ "--delay": "0.4s" }}
                  src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/r-architecture-2gDwlIim3Uw-unsplash.jpg?alt=media&token=f6b54dbf-e741-45ce-8c9f-8968df78a006"
                  alt="contact__pattern--3"
                />
              </div>

              <div className="right---bottom absolute top-full ml-7 -translate-y-1/4  left-1/2  w-40   aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer">
                <Image
                  width={1000}
                  height={1000}
                  className="contact__pattern  scaling__contact--animation  contact__pattern--4  object-cover w-full h-full   opacity-0"
                  // style={{ "--delay": "0.6s" }}
                  src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/marvin-meyer-bfOQSDwEFg4-unsplash.jpg?alt=media&token=7efcce3c-bdbf-4611-b152-7e9c6a60762f"
                  alt="contact__pattern--4"
                />
              </div>

              <div className="left---top absolute bottom-[20%] translate-y-  right-full mr-4   w-24 object-cover aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer asm:hidden">
                <Image
                  width={1000}
                  height={1000}
                  className="contact__pattern  scaling__contact--animation  contact__pattern--5  object-left   w-full h-full opacity-0"
                  // style={{ "--delay": "0.8s" }}
                  src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/daria-nepriakhina-LZkbXfzJK4M-unsplash.jpg?alt=media&token=99d89d1a-2a06-4f90-ace1-9307e9173e03"
                  alt="contact__pattern--5"
                />
              </div>

              <div className="left---bottom absolute top-[60%] translate-y-1/2  right-full mr-2 translate-x-1/2   w-20  aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer asm:hidden">
                <Image
                  width={1000}
                  height={1000}
                  className="contact__pattern  scaling__contact--animation  contact__pattern--6  object-cover object-left   w-full h-full  opacity-0"
                  // style={{ "--delay": "1s" }}
                  src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/r-architecture-2gDwlIim3Uw-unsplash.jpg?alt=media&token=f6b54dbf-e741-45ce-8c9f-8968df78a006"
                  alt="contact__pattern--6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ContactUs__bottom w-full flex justify-between items-start gap-10 md:gap-20  amd:flex-col amd:items-center overflow-x-hidden overflow-y-hidden">
        <div
          ref={map}
          className="ContactUs__bottom--map ContactUs__scale-no-over h-full w-full border-2 border-secondary round overflow-hidden opacity-0"
        >
          {contactUsData?.location && (
            <div
              className="iframe__fixed--height"
              dangerouslySetInnerHTML={{ __html: contactUsData?.location }}
            ></div>
          )}
        </div>
        {/* <div
          ref={contactDetails}
          className="ContactUs__bottom--contact--details w-2/6 h-full flex justify-center amd:w-full amd:justify-start  opacity-0 bg-"
        >
          <div className=" w-fit h-full  flex flex-col items-start gap-6 ">
            <h2 className="font-medium text-2xl mb-4 underline-offset-4 rtl:underline-offset-8  underline">
              {t("sub_heading")}
            </h2>
            <Link
              href={`tel:${contactUsData?.phone}`}
              className="contact-left flex justify-start items-center gap-4 min-w-fit"
            >
              <div className="bg-secondary text-grey text-xl min-w-9 min-h-9 w-9 h-9 flex justify-center items-center rounded-full">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <span>{contactUsData?.phone}</span>
            </Link>
            <Link
              href={`mailto:${contactUsData?.mail}`}
              className="contact-left flex justify-start items-center gap-4 min-w-fit"
            >
              <div className="bg-secondary text-grey text-xl min-w-9 min-h-9 w-9 h-9 flex justify-center items-center rounded-full">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <span>{contactUsData?.mail}</span>
            </Link>
            <Link
              href={"https://amtalek.com/en"}
              className="contact-left flex justify-start items-center gap-4 min-w-fit"
            >
              <div className="bg-secondary text-grey text-xl min-w-9 min-h-9 w-9 h-9 flex justify-center items-center rounded-full">
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              <span>www.amtalek.com</span>
            </Link>
            <div className="contact-left flex justify-start items-center gap-4 min-w-fit">
              <div className="bg-secondary text-grey text-xl  w-9 h-9 flex justify-center items-center rounded-full">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <span className="flex flex-1">{contactUsData?.address}</span>
            </div>
            <div className="socials w-fit flex  items-center gap-9 clg:gap-4 amd:gap-9 mt-4 border-t-2 border-t-secondary pt-4">
              <Link href={contactUsData?.facebook}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                  icon={faFacebook}
                />
              </Link>
              <Link href={contactUsData?.twitter}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                  icon={faXTwitter}
                />
              </Link>
              <Link href={contactUsData?.instagram}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                  icon={faInstagram}
                />
              </Link>
              <Link href={contactUsData?.youtube}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                  icon={faYoutube}
                />
              </Link>
              <Link href={contactUsData?.linkedIn}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                  icon={faLinkedinIn}
                />
              </Link>
            </div>
          </div>
        </div> */}
      </div>
      <div ref={slider} className="w-full h-auto opacity-0 ContactUs__scale-no-over">
        {/* <BrokersSlider t={t} simple /> */}
      </div>
    </section>
  );
}
