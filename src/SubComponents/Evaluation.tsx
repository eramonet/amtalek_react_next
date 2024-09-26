import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePostData } from "../Hooks/useAxios";

function Evaluation() {
  const [openEvaluation, setOpenEvaluation] = useState(false);
  const [evaluation, setEvaluation] = useState("");
  const [rate, setRate] = useState(0);
  const rateArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [timer, setTimer] = useState<number>(
    localStorage.getItem("timer")
      ? Number(localStorage.getItem("timer"))
      : 5 * 60
  );
  const { t } = useTranslation("LayoutComponents");

  useEffect(() => {
    if (!localStorage.getItem("timer")) {
      localStorage.setItem("timer", JSON.stringify(5 * 60));
    }
  }, [localStorage.getItem("timer")]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  useEffect(() => {
    if (timer === 1) {
      setOpenEvaluation(true);
    }
  }, [timer]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      if (Number(localStorage.getItem("timer")) > 0) {
        localStorage.setItem("timer", JSON.stringify(timer));
      }
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.setItem("timer", JSON.stringify(timer));
      });
    };
  });

  const { mutate } = usePostData(true, () => {
    setEvaluation("");
    setOpenEvaluation(false);
  });

  return (
    <AnimatePresence>
      {openEvaluation && (
        <motion.div
          initial={{ bottom: "-100vh", opacity: 0 }}
          animate={{ bottom: 0, opacity: 1 }}
          exit={{ opacity: 0, bottom: "-100vh" }}
          transition={{ duration: 1 }}
          className="fixed  w-full z-50 bg-gray-200 items-center justify-center flex flex-col gap-2 border border-gray-400 py-10 "
        >
          <button
            onClick={() => setOpenEvaluation(false)}
            className="absolute h-10 w-10 rounded-full top-3 right-3 bg-primary text-white text-xl"
          >
            x
          </button>
          <h3 className="text-xl">{t("evaluate")}</h3>
          <form className="w-[90%] border border-black flex h-14 rounded overflow-hidden">
            <input
              value={evaluation}
              onChange={(e) => setEvaluation(e.target.value)}
              placeholder={t("evaluatePlaceholder")}
              className="flex-auto outline-none ps-2"
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                mutate({
                  api: "users-evaluation",
                  data: {
                    comment: evaluation,
                    evaluation: rate,
                  },
                });
              }}
              className="text-white bg-primary px-10"
            >
              {t("evaluateButton")}
            </button>
          </form>
          <div className="w-full flex justify-center items-center gap-4">
            {t("impossible")}
            {rateArray.map((item, index) => (
              <div
                key={index}
                onClick={() => setRate(item)}
                className={`w-8 h-8 rounded-full text-white  flex justify-center items-center cursor-pointer ${
                  rate === item
                    ? "bg-primary text-lg"
                    : "text-secondary bg-gray-500"
                }`}
              >
                {item}
              </div>
            ))}
            {t("possible")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Evaluation;
