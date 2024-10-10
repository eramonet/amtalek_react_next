import { Collapse } from "antd";
import { IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function CollapseForm({ label, status, setStatus }: any) {
  const { t } = useTranslation("Social_AddProperty");
  const items = [
    {
      key: "1",
      label: <span className="border-none">{label}</span>,
      children: (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full adStatus flex justify-between">
            <input
              checked={status === "forSale"}
              id="forSale"
              name="adStatus"
              type="radio"
              onClick={() => {
                setStatus("forSale");
              }}
            />
            <label htmlFor="forSale" className="w-full cursor-pointer">
              {t("forSale")}
            </label>
          </div>
          <div className="w-full adStatus flex justify-between">
            <input
              checked={status === "forRent"}
              onClick={() => setStatus("forRent")}
              id="forRent"
              name="adStatus"
              type="radio"
            />
            <label htmlFor="forRent" className="w-full cursor-pointer">
              {t("forRent")}
            </label>
          </div>
        </div>
      ),
    },
  ];
  const onChange = (key: any) => {};
  return (
    <Collapse
      className="border-none bg-transparent"
      expandIconPosition="right"
      items={items}
      onChange={onChange}
      expandIcon={({ isActive }) => (
        <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <IoIosArrowUp size={25} color="#01425A" />
        </motion.span>
      )}
    />
  );
}
export default CollapseForm;
