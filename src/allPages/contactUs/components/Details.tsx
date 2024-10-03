"use client";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Details({ data }: any) {
  const { t, i18n } = useTranslation("Pages_ContactUs");
  const slider = useRef<any>(null);
  const map = useRef<any>(null);
  const contactDetails = useRef<any>(null);

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

    const observer = new IntersectionObserver(handleIntersect, options);

    if (map?.current) observer.observe(map.current);
    if (contactDetails?.current) observer.observe(contactDetails.current);
    if (slider?.current) observer.observe(slider.current);

    // تنظيف الموارد عند إلغاء تثبيت المكون
    return () => {
      observer.disconnect();
    };
  }, []);

  // const map = useRef<any>(null);

  return (
    <div className="ContactUs__bottom w-full flex justify-between items-start gap-10 md:gap-20  amd:flex-col amd:items-center overflow-x-hidden overflow-y-hidden">
      {data?.location && (
        <div
          ref={map}
          className="ContactUs__bottom--map ContactUs__scale-no-over h-full w-full border-2 border-secondary round overflow-hidden "
        >
          <div
            className="iframe__fixed--height"
            dangerouslySetInnerHTML={{ __html: data?.location }}
          ></div>
        </div>
      )}

      <div
        // ref={contactDetails}
        className="ContactUs__bottom--contact--details w-2/6 h-full flex justify-center amd:w-full amd:justify-start bg-"
      >
        <div className=" w-fit h-full  flex flex-col items-start gap-6 text-secondary">
          <h2 className="font-medium text-2xl mb-4 underline-offset-4 rtl:underline-offset-8  underline">
            {t("sub_heading")}
          </h2>
          <Link
            href={`tel:${data?.phone}`}
            className="contact-left flex justify-start items-center gap-4 min-w-fit"
          >
            <div className="bg-secondary text-grey text-xl min-w-9 min-h-9 w-9 h-9 flex justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <span>{data?.phone}</span>
          </Link>
          <Link
            href={`mailto:${data?.mail}`}
            className="contact-left flex justify-start items-center gap-4 min-w-fit"
          >
            <div className="bg-secondary text-grey text-xl min-w-9 min-h-9 w-9 h-9 flex justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <span>{data?.mail}</span>
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
            <span className="flex flex-1">{data?.address}</span>
          </div>
          <div className="socials w-fit flex  items-center gap-9 clg:gap-4 amd:gap-9 mt-4 border-t-2 border-t-secondary pt-4">
            <Link href={data?.facebook}>
              <FontAwesomeIcon
                className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                icon={faFacebook}
              />
            </Link>
            <Link href={data?.twitter}>
              <FontAwesomeIcon
                className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                icon={faXTwitter}
              />
            </Link>
            <Link href={data?.instagram}>
              <FontAwesomeIcon
                className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                icon={faInstagram}
              />
            </Link>
            <Link href={data?.youtube}>
              <FontAwesomeIcon
                className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                icon={faYoutube}
              />
            </Link>
            <Link href={data?.linkedIn}>
              <FontAwesomeIcon
                className="text-3xl hover:scale-125 active:scale-90 hover:text-accent duration-200 transition-all cursor-pointer"
                icon={faLinkedinIn}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
