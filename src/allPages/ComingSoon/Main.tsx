"use client";
import mob from "@/assets/images/mobileImg.png";
import { motion } from "framer-motion";
// import { TFunction } from "i18next";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useTimer } from "react-timer-hook";

// function Main({ t }: any) {
function Main() {
  const { t } = useTranslation("Pages_Coming");

  function MyTimer({ expiryTimestamp }: any) {
    const { seconds, minutes, hours, days } = useTimer({
      expiryTimestamp,
      onExpire: () => console.warn("onExpire called"),
    });

    return (
      <div style={{ textAlign: "center" }}>
        <div className="w-full flex ss:text-sm text-2xl items-center gap-3 ss:gap-1">
          <span className="bg-secondary rounded text-white  gap-2 p-4 w-fit flex flex-col">
            <span className="text-">{t("days")}</span> {days}
          </span>
          :
          <span className="bg-secondary rounded text-white  gap-2  w-fit flex flex-col p-4">
            <span className="text">{t("hours")}</span> {hours}
          </span>
          :
          <span className="bg-secondary rounded text-white  gap-2  w-fit flex flex-col p-4">
            <span className="text-">{t("minutes")}</span> {minutes}
          </span>
          :
          <span className="bg-secondary rounded text-white  gap-2   w-fit flex flex-col p-4">
            <span className="text-">{t("seconds")}</span> {seconds}
          </span>
        </div>
      </div>
    );
  }
  // const time = new Date("Sep 24, 2024 21:00:00").getTime();
  const time = new Date("Sep 24, 2024 21:00:00").getTime();

  // إضافة 30 يومًا بالميللي ثانية
  const daysToAdd = 30 * 24 * 60 * 60 * 1000; // 30 يوم * 24 ساعة * 60 دقيقة * 60 ثانية * 1000 ميللي ثانية

  // الوقت الجديد بعد إضافة 30 يومًا
  const newTime = time + daysToAdd;

  // تحويل الوقت الجديد إلى كائن Date
  const newDate = new Date(newTime);

  return (
    <section className="min-h-screen cll:pb-40 w-full flex justify-center ss:justify-start cll:items-start ss:items-center  items-center cll:flex-col cll:gap-5 cll:py-10 ss:gap-10 ss:pt-24">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-1/2 ss:w-full flex flex-col ps-24 cll:ps-14 ss:px-12 gap-5"
      >
        <span className="text-7xl ss:text-2xl font-bold rtl:text-white">{t("heading")}</span>
        <p className="rtl:bg-white rtl:p-3 rtl:rounded-xl">{t("sub_heading")}</p>
        <MyTimer expiryTimestamp={newDate} />
      </motion.div>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-1/2 cll:w-full flex justify-center"
      >
        <Image
          width={400}
          height={600}
          alt="gfrgtrgtr"
          src={mob}
          className="h-[600px] ss:h-[300px] cll:h-[400px] xll:w-1/2 flex"
        />
      </motion.div>
    </section>
  );
}

export default Main;
