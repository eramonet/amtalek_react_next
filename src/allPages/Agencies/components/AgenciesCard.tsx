"use client";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "../MainComponents/Link";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function AgenciesCard({ broker }: any) {
  const { t } = useTranslation("Pages_Brokers");

  return (
    <motion.div
      layout
      className="w-full h-[400px] items-center flex max-w-[440px] border overflow-hidden rounded relative group shadow-md"
    >
      <Image
        className="w-full h-full object-fill  cursor-pointer "
        src={broker?.logo}
        alt={broker?.name}
        width={240}
        height={240}
      />

      <Link
        href={`/Agencies/${broker?.name?.replace(/\s/g, "-")}/${broker?.id}/${broker?.broker_type}`}
      >
        <div className="bg-custome-blue h-full absolute inset-0 translate-y-80 w-full text-custome-white p-5 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          <Link
            title={broker?.name}
            href={`/Agencies/${broker?.name?.replace(/\s/g, "-")}/${broker?.id}/${
              broker?.broker_type
            }`}
            //   {`/Agencies/${broker?.name?.replace(/\s/g, "-")}/${broker?.id}/${broker?.broker_type}`}
            className="broker--title text-lg font-medium  w-fit"
          >
            {broker?.name}
          </Link>

          <div className="w-full flex  justify-start items-center gap-2 flex-wrap">
            <p className="broker--author text-sm opacity-80 block w-fit text-custome-white">
              ({broker?.properties_count}) {t("BrokerCard.Properties")}
            </p>
            <p className="broker--author text-sm opacity-80 block w-fit text-custome-white">
              ({broker?.property_for_sale}) {t("BrokerCard.sale")}
            </p>
            <p className="broker--author text-sm opacity-80 block w-fit text-custome-white">
              ({broker?.property_for_rent}) {t("BrokerCard.rent")}
            </p>
          </div>
          <h5 className="broker--description text-base mt-9  h-40 sm:h-28 text-justify">
            {broker?.description}
          </h5>
          <hr className="border-[1px] border-custome-white my-7" />
          <Link
            href={`/Agencies/${broker?.name?.replace(/\s/g, "-")}/${broker?.id}/${
              broker?.broker_type
            }`}
            //   to={`/Agencies/${broker?.name?.replace(/\s/g, "-")}/${broker?.id}/${broker?.broker_type}`}
            className="w-[98px] rtl:w-[160px] overflow-hidden bg- h-fit flex "
          >
            <div className="flex w-full justify-start items-center gap-1 font-medium -translate-x-[15px] rtl:translate-x-[15px] hover:translate-x-0 rtl:hover:translate-x-0 transition-all duration-300 ease-in-out">
              <FontAwesomeIcon
                className="font-light text-[14px]  rtl:rotate-180"
                icon={faAnglesRight}
                fade
              />
              <span className="min-w-fit">{t("BrokerCard.CTA_txt")}</span>
              <FontAwesomeIcon
                className="font-light text-[14px]  rtl:rotate-180"
                icon={faAnglesRight}
                fade
              />
            </div>
          </Link>
        </div>
      </Link>
    </motion.div>
  );
}
