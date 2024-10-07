import { Modal } from "antd";
import { TFunction } from "i18next";
import { FaRegEye } from "react-icons/fa6";
import { AiFillPrinter } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

function InvoicesDetails({
  // isOpen,
  // setIsOpen,
  t,
  details,
  price,
  i18n,
  from,
  to,
  id,
  status,
}: {
  // isOpen: boolean;
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  t: TFunction;
  details: any;
  price: string;
  i18n: any;
  from: string;
  to: string;
  id: number;
  status: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [showPrintIcon, setShowPrintIcon] = useState(true);
  useEffect(() => {
    const handleAfterPrint = () => {
      setShowPrintIcon(true);
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);
  async function handlePrint() {
    setShowPrintIcon(false);
    setTimeout(() => {
      window.print();
    }, 100);
  }
  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div key={id}>
      <button
        // key={id}
        onClick={showModal}
        className="bg-primary text-white p-2 rounded    hover:bg-secondary/70"
      >
        <FaRegEye />
      </button>

      <Modal
        // key={id}
        closeIcon={null}
        title={
          <div className="text-xl w-full flex gap-3">
            {`INVOICE${id}`} <span>{t("from")}</span> <span>{from}</span>
            <span>{t("to")}</span> <span>{to}</span>{" "}
            {showPrintIcon && (
              <>
                <button className={`ms-auto `} onClick={handlePrint}>
                  <AiFillPrinter className="text-3xl" />
                </button>

                <button
                  // key={id}
                  onClick={handleOk}
                  className="bg-white text-black pt-4 pb-5 px-5 -top-12 right-0 rounded-t-full text-xl absolute cursor-pointer"
                >
                  <IoClose size={30} />
                </button>
              </>
            )}
          </div>
        }
        centered
        width={`90%`}
        footer={null}
        // title="Basic Modal"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <section className="w-full flex flex-col gap-3">
          <div className="w-full grid grid-cols-4 bg-black rounded p-2 text-white text-xl ">
            <span className="col-span-1 text-center">{t("feature_name")}</span>
            <span className="col-span-1 text-center">{t("usage")}</span>
            <span className="col-span-1 ps-1 text-center">{t("from")}</span>
            <span className="col-span-1 text-center">{t("remaining")}</span>
          </div>
          <div className="w-full flex flex-col gap-5 text-xl">
            {details?.map((details: any) => (
              <div key={details?.title} className="w-full grid grid-cols-4">
                <span className="text-center">{details?.title}</span>
                <span className="text-center">{details?.used}</span>
                <span className="text-center">{details?.base}</span>
                <span className="text-center">{details?.reminder}</span>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-between items-center text-4xl ss:text-sm clg:text-xl md:text-md font-bold gap-10 bg-black rounded p-2 text-white ">
            <div className="flex items-center gap-5">
              <span>{t("approval")} :</span>
              <span className="text-3xl">{t("CurrentStatus", { context: status })}</span>
            </div>

            <div className="flex items-center gap-5">
              <span>{t("total")} :</span>
              <span className="text-3xl">
                {price} {i18n.language.startsWith("en") ? "EGP" : "ج.م"}{" "}
              </span>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
}

export default InvoicesDetails;
