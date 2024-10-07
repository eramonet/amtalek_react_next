import { useWindowSize } from "@react-hook/window-size";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userProfileData } from "../../Store/Features/AuthenticationSlice";
import { TUser } from "@/Types/AppTypes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { HelmetTags } from "@/Components/MainComponents";
import { motion } from "framer-motion";
import logo from "/assets/images/fav-icon.png";
import Image from "next/image";
function Finished() {
  const [width, height] = useWindowSize();
  const { paymentType } = useParams();
  const userProfile = useSelector(userProfileData) as TUser;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("Pages_Finish");
  const [hide, setHide] = useState(false);
  // useEffect(() => {
  //   const redirect = setTimeout(() => {
  //     navigate("/", { replace: true });
  //   }, 3000);

  //   return () => {
  //     clearTimeout(redirect);
  //   };
  // }, []);
  const [userProfileDataOutlet, refetch, isLoading, isError, isPaused] = useOutletContext() as [
    TUser,
    () => void,
    boolean,
    boolean,
    boolean
  ];

  const congratulation = {
    start: {
      x: 0,
    },
    animating: {
      x: 100,
      transition: {
        duration: 0.5,
        delay: 0.9,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    // <div className="w-full flex flex-col gap-3 items-center">
    //   <Confetti
    //     width={width}
    //     height={height}
    //     numberOfPieces={500}
    //     recycle={false}
    //     gravity={0.1}
    //     colors={["#ff0000", "#00ff00", "#0000ff"]}
    //     className="z-50 relative"
    //     confettiSource={{ x: 0, y: 10, w: width, h: height }}
    //   />
    //   <img className="h-[600px] w-1/2" src={img} />
    //   {paymentType === "cash" ? (
    //     <span>
    //       Hey, {userProfile?.first_name}! Thank you for purchasing [product] at
    //       [company name]! Your payment has been confirmed. For more information:
    //       [URL] (cash)
    //     </span>
    //   ) : (
    //     <span>
    //       {" "}
    //       Hey, {userProfile?.first_name}! Thank you for purchasing [product] at
    //       [company name]! Your payment has been confirmed. For more information:
    //       [URL] (visa)
    //     </span>
    //   )}
    // </div>

    <section className="site_container flex flex-col justify-center items-center gap-10 h-[600px]  relative pt-24">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}
      <div className="w-[155px] absolute h-[155px] bg-red-5 rounded-full top-[10%] flex justify-center items-center bg-red-5">
        <motion.img
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          src="/assets/images/thankyoucheck.png"
          className="w-[80px] h-[80px]"
        />
        <motion.span
          initial={{
            width: "50%",
            height: "50%",
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: "100%",
            height: "100%",
          }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="absolute   border-secondary rounded-full border-2"
        ></motion.span>
      </div>
      {/* <div className="w-screen flex items-center bg-red-500 relative"> */}
      {!hide && (
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 1500 }}
          transition={{ duration: 0.5, delay: 3 }}
          onAnimationComplete={() => {
            setHide(true);
          }}
          className="w-fit flex flex-col gap-2 items-center bg-white mt-28"
        >
          <h1 className="text-4xl font-bold">{t("congratulations_heading")}</h1>
          <span>{t("congratulations")}</span>
        </motion.div>
      )}
      <motion.div
        initial={{ x: -3000 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, delay: 3.5, type: "spring", bounce: 0.5 }}
        className="w-fit flex flex-col  items-center "
      >
        <h1 className="text-4xl font-bold">{t("next")}</h1>
      </motion.div>
      <motion.div
        initial={{ y: 3000 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 3.5, type: "spring", bounce: 0.2 }}
        className="flex flex-col gap-5 border-2 border-accent  rounded-xl p-3 w-[350px] items-center relative pt-5  "
      >
        <Image
          alt="nuhbynuh"
          src="/assets/images/fav-icon.png"
          className="absolute -top-10"
          width={200}
          height={200}
        />

        <h2 className="text-lg font-semibold text-center">{t("start")}</h2>
        <span className="text-center">{t("navigate")}</span>
        <div className="w-full grid grid-cols-2 gap-3 relative">
          <Link className="bg-secondary text-white p-2 rounded text-center" to="/" replace>
            {t("home")}
          </Link>
          {userProfileDataOutlet?.actor_type === "user" && (
            <Link
              className="bg-secondary text-white p-2 rounded text-center"
              to={`${i18n.language?.startsWith("ar") ? "" : "/en"}/profile`}
              replace
            >
              {t("profile")}
            </Link>
            // <Link
            //   className="bg-secondary text-white p-2 rounded text-center"
            //   to={`/${i18n.language.startsWith("en") ? "/en" : "/ar"}/profile`}
            //   replace
            // >
            //   {t("profile")}
            // </Link>
          )}
          {userProfileDataOutlet?.actor_type === "broker" && (
            <Link
              className="bg-secondary text-white p-2 rounded text-center"
              to={userProfileDataOutlet?.dashboard_link}
              replace
            >
              {t("dashboard")}
            </Link>
          )}
        </div>
      </motion.div>
      {/* </div> */}
    </section>
  );
}

export default Finished;
