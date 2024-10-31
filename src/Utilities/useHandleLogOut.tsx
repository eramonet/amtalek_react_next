import { useDispatch, useSelector } from "react-redux";
import { usePostData } from "@/Hooks/useAxios";
import { setUserData, userData } from "../Store/Features/AuthenticationSlice";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setToggleLogOutPopUp } from "../Store/Features/MiscellaneousSlice";
import toast from "react-hot-toast";

export default function useHandleLogOut() {
  const user = useSelector(userData);

  const dispatchRedux = useDispatch();
  const { i18n } = useTranslation("");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const errMsg = lang === "ar" ? "برجاء تسجيل الدخول أولا!" : "Please log in first!";

  const {
    mutate,
    isLoading,
    error: logoutError,
  }: any = usePostData(
    false,
    () => {
      localStorage.removeItem("userData");
      localStorage.removeItem("userProfileDataOutlet");
      dispatchRedux(setUserData(null));
      dispatchRedux(setToggleLogOutPopUp(false));
      window.location.replace(`/${i18n.language?.startsWith("ar") ? "" : "en"}`);
    },
    true,
    // Adding the onError function here
    (error: any) => {
      console.error("Error during logout:", error);
      toast.error(error?.response?.data?.message || "Something went wrong during logout!");
    }
  );

  function logOut() {
    if (user?.token) {
      mutate({
        api: process.env.NEXT_PUBLIC_LOGOUT_USER,
        data: undefined,
        file: undefined,
      });
    } else {
      toast.error(errMsg);
    }
  }

  return [logOut, isLoading, logoutError];
}
