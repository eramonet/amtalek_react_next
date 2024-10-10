import LangLink from "@/components/LangLink";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import LangLink from "../MainComponents/LangLink";
import { motion } from "framer-motion";
import Image from "next/image";

function BrokerCard({ broker, t }: any) {
  return (
    <motion.div
      layout
      className="w-full h-[400px] items-center flex max-w-[440px border  overflow-hidden round relative group shadow-md"
    >
      <Image
        width={1000}
        height={1000}
        className="w-full h-full object-fill  cursor-pointer "
        src={broker?.logo}
        alt={broker?.name}
      />
      <div className="broker__details bg-secondary h-full absolute inset-0 translate-y-80 w-full text-bg p-5 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        <LangLink
          title={broker?.name}
          to={`/Agencies/${broker?.name?.replace(/\s/g, "-")}/${broker?.id}/${broker?.broker_type}`}
          className="broker--title text-lg font-medium  w-fit"
        >
          {broker?.name}
        </LangLink>

        <div className="w-full flex  justify-start items-center gap-2 flex-wrap">
          <p className="broker--author text-sm opacity-80 block w-fit text-bg">
            ({broker?.properties_count}) {t("BrokerCard.Properties")}
          </p>
          <p className="broker--author text-sm opacity-80 block w-fit text-bg">
            ({broker?.property_for_sale}) {t("BrokerCard.sale")}
          </p>
          <p className="broker--author text-sm opacity-80 block w-fit text-bg">
            ({broker?.property_for_rent}) {t("BrokerCard.rent")}
          </p>
        </div>
        <h5 className="broker--description text-base mt-9  h-40 sm:h-28 text-justify">
          {broker?.description}
        </h5>
        <hr className="border-[1px] border-bg my-7" />
        <LangLink
          to={`/Agencies/${broker?.name?.replace(/\s/g, "-")}/${broker?.id}/${broker?.broker_type}`}
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
        </LangLink>
      </div>
    </motion.div>
  );
}

export default BrokerCard;
