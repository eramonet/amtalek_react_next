import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FaWhatsapp } from "react-icons/fa";

import { TwitterShareButton, WhatsappShareButton } from "react-share";

function Share({ type, style, data, t }: any) {
  // const title = "test";

  return (
    <div
      className={`under__slider--share   w-full flex  ${style} h-12 asm:h-auto justify-center items-center asm:flex-col asm:gap-1`}
    >
      <h5 className="property__size text-center  w-1/4 bg-secondary text-bg h-full flex items-center justify-center text- font-medium asm:w-full asm:h-12 border-r-4 border-r-grey asm:border-r-secondary">
        {t("ShareComponent.txt", { context: type })}
      </h5>{" "}
      <div className="w-3/4 asm:w-full flex justify-between items-center bg-dark-gray h-12">
        {/* <FacebookShareButton url={`${data?.facebook}&quote=${title}`}>
          <FacebookIcon size={32} round />
        </FacebookShareButton> */}
        <a
          href={data?.facebook}
          target="_blank"
          rel="noreferrer"
          className="bedrooms__number flex justify-center items-center text-base  asm:text-sm w-1/3 "
        >
          <FontAwesomeIcon className="pr-3 rtl:pr-0 rtl:pl-3 text-2xl" icon={faFacebook} />
          {t("ShareComponent.Facebook")}{" "}
        </a>{" "}
        <div className="w-1 h-full bg-bg"></div>
        {/* <a
          href={data?.twitter}
          target="_blank"
          rel="noreferrer"
          className="bathrooms__number flex justify-center items-center text-base  asm:text-sm w-1/3 "
        >
          <FontAwesomeIcon className="pr-3 rtl:pr-0 rtl:pl-3 text-2xl" icon={faXTwitter} />{" "}
          {t("ShareComponent.Twitter")}
        </a> */}
        <TwitterShareButton
          url={data?.twitter}
          className="bathrooms__number flex justify-center items-center text-base asm:text-sm w-1/3 "
        >
          <FontAwesomeIcon className="text-lg" icon={faXTwitter} />
          {data?.twitter && t("ShareComponent.Twitter")}
        </TwitterShareButton>
        <div className="w-1 h-full bg-bg"></div>
        <WhatsappShareButton
          className="bathrooms__number flex justify-center items-center text-base asm:text-sm w-1/3 "
          url={window.location.href}
          title={t("whatsappMsg")}
          separator="  "
        >
          <FaWhatsapp className="pr-3 rtl:pr-0 rtl:pl-3 " size={30} />
          {t("Whatsapp")}
        </WhatsappShareButton>
      </div>
    </div>
  );
}

export default Share;
