"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  userData as userDataStore,
  setUserProfileData,
  userData,
  Authorized,
  fetchUserProfile,
  userProfileDataOut,
} from "@/Store/Features/AuthenticationSlice";
import { useTranslation } from "react-i18next";
import useHandleLogOut from "@/Utilities/useHandleLogOut";
import { useQueryClient } from "@tanstack/react-query";
import { usePostData } from "@/Hooks/usePostData";
import Heading from "@/components/Heading";
import {
  EmailComponent,
  PasswordComponent,
  PhoneComponent,
  ReCaptcha,
  SubmitBtnComponent,
  TextComponent,
  UploadFileComponent,
} from "@/FormComponents";
import useUserProfile from "@/api/useUserProfile";
// import { useOutletContext } from "react-router-dom";
import { TUser } from "@/Types/AppTypes";
// import { UserProfileClient } from "@/api/UserProfileClient";
// userProfileDataOutlet, user
export default function Profile({}: any) {
  const { t, i18n } = useTranslation("Pages_Profile");
  const queryClient: any = useQueryClient();
  const dispatch = useDispatch();

  // const user = useSelector(userDataStore);

  const recaptchaRef = useRef<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<any>({});
  const [reCAPTCHAServerError, setReCAPTCHAServerError] = useState("");

  // const userProfileDatat = useUserProfile();

  // const [userProfileDataOutlet, refetch, isLoading, isError, isPaused] = useOutletContext() as [
  //   TUser,
  //   () => void,
  //   boolean,
  //   boolean,
  //   boolean
  // ];

  const [userProfileDataOutlet, setUserProfileDataOutlet] = useState<any>([]);
  const user = useSelector(userData);

  // async function getUserProfile(token: string, language: string) {
  //   try {
  //     const response = await fetch(
  //       `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Accept-Language": language,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const dataProfile = await response.json();
  //     // console.log(dataProfile);

  //     setUserProfileDataOutlet(dataProfile?.data);
  //   } catch (error) {
  //     console.error("Failed to fetch user profile:", error);
  //   }
  // }

  // useEffect(() => {
  //   if (user?.token && i18n.language) {
  //     getUserProfile(user?.token, i18n?.language);
  //     // getNotifications(user?.token);
  //   }
  // }, [user?.token, i18n.language]);

  // const { userProfileDataOutlet, user } = UserProfileClient();
  // const dispatch = useDispatch();
  // const user = useSelector(userData);
  // const token = useSelector(Authorized);
  // const userProfileDataOutlet: any = useSelector(userProfileDataOut) || null;
  // useEffect(() => {
  //   // if (user && token) {
  //   // const language = "en"; // يمكنك الحصول على اللغة من السياق أو الحالة الخاصة بك
  //   dispatch(fetchUserProfile({ token, language: i18n.language, userData: user.data }));
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user, token, dispatch]);
  useEffect(() => {
    if (user?.token && i18n.language) {
      setUserProfileDataOutlet(() =>
        JSON.parse(localStorage.getItem("userProfileDataOutlet") || "{}")
      );
      // getUserProfile(user?.token, i18n?.language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, i18n.language]);

  // console.log(userProfileDataOutlet);
  const [logOut] = useHandleLogOut();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
  }: any = useForm({
    mode: "onBlur",
    defaultValues: {
      image: "",
      not_ropot: "no",
      created_from: "web",
    },
    values,
  });
  useEffect(() => {
    if (userProfileDataOutlet) {
      setValues({
        ...userProfileDataOutlet,
        not_ropot: "no",
        created_from: "web",
        image: null,
      });
    }
  }, [userProfileDataOutlet]);

  const {
    mutate: updateImg,
    isLoading: updateImgIsLoading,
    error: updateImgServerErrors,
  }: any = usePostData(
    true,
    (data) => {
      recaptchaRef.current.reset();
      setValue("not_ropot", "no");
      setValue("image", "");
      setSubmitted(false);
      queryClient.invalidateQueries("userData");
      dispatch(setUserProfileData(data?.data));
    },
    true, // authorizedAPI: (يجب أن تحدد ما إذا كانت هذه القيمة true أو false بناءً على حاجتك)
    (error) => {
      // onError: معالجة الخطأ هنا
      console.error("An error occurred:", error);
    }
  );
  const {
    mutate: updateProfile,
    isLoading: updateProfileIsLoading,
    error: updateProfileServerErrors,
  }: any = usePostData(
    true,
    (data) => {
      recaptchaRef.current.reset();
      setValue("not_ropot", "no");
      setSubmitted(false);
      // refetch();
    },
    true, // authorizedAPI: (يجب أن تحدد ما إذا كانت هذه القيمة true أو false بناءً على حاجتك)
    (error) => {
      // onError: معالجة الخطأ هنا
      console.error("An error occurred:", error);
    }
  );
  const {
    mutate: updatePassword,
    isLoading: updatePasswordIsLoading,
    error: updatePasswordServerErrors,
  }: any = usePostData(
    true,
    () => {
      // refetch();
    },
    true, // authorizedAPI: (يجب أن تحدد ما إذا كانت هذه القيمة true أو false بناءً على حاجتك)
    (error) => {
      // onError: معالجة الخطأ هنا
      console.error("An error occurred:", error);
    }
  );

  const not_ropot = watch("not_ropot");
  const image = watch("image");
  const current_password = watch("current_password");
  const new_password = watch("new_password");
  const confirm_new_password = watch("confirm_new_password");
  const first_name = watch("first_name");
  const last_name = watch("last_name");
  const phone = watch("phone");
  const email = watch("email");
  const disabled =
    //!isValid ||
    not_ropot === "no" ||
    updateImgIsLoading ||
    updateProfileIsLoading ||
    updatePasswordIsLoading ||
    ((image === "" || image === null) &&
      current_password === "" &&
      new_password === "" &&
      confirm_new_password === "" &&
      first_name === userProfileDataOutlet?.first_name?.toString() &&
      last_name === userProfileDataOutlet?.last_name &&
      phone === userProfileDataOutlet?.phone &&
      email === userProfileDataOutlet?.email);

  const onChange = useCallback(
    (value: any) => {
      if (value) {
        setValue("not_ropot", "yes");
      } else {
        setValue("not_ropot", "no");
      }
    },
    [setValue]
  );
  const onSubmit = useCallback(
    (data: any) => {
      setSubmitted(true);
      if (user?.token) {
        if (not_ropot !== "no") {
          //!the additional check for  !== null because the setValue sets the image to null, and we set it to null because it wil be undefined when the values overwrite the defaultValues, and if we set it to "" the isValid will be false which disales he submit button (strange behavior )

          if (image !== "" && image !== null) {
            updateImg({
              api: process.env.NEXT_PUBLIC_USER_PROFILE_UPDATE_IMG,
              data: {
                image: data?.image[0],
                image_key: "main",
                not_ropot: data?.not_ropot,
                created_from: "web",
              },
              file: true,
            });
          }
          if (current_password !== "" && new_password !== "" && confirm_new_password !== "") {
            updatePassword({
              api: process.env.NEXT_PUBLIC_USER_PROFILE_UPDATE_PASSWORD,
              data: {
                current_password: data?.current_password,
                new_password: data?.new_password,
                confirm_new_password: data?.confirm_new_password,
                not_ropot: data?.not_ropot,
                created_from: "web",
              },
            });
          }
          if (
            first_name !== userProfileDataOutlet?.first_name ||
            last_name !== userProfileDataOutlet?.last_name ||
            phone !== userProfileDataOutlet?.phone ||
            email !== userProfileDataOutlet?.email
          ) {
            const finalData =
              email !== userProfileDataOutlet?.email
                ? {
                    first_name: data?.first_name,
                    last_name: data?.last_name,
                    phone: data?.phone,
                    email: data?.email,
                  }
                : {
                    first_name: data?.first_name,
                    last_name: data?.last_name,
                    phone: data?.phone,
                  };
            updateProfile({
              api: `${process.env.NEXT_PUBLIC_USER_PROFILE_UPDATE_PROFILE}/${user?.data?.actor_type}`,
              data: {
                ...finalData,
                not_ropot: data?.not_ropot,
                created_from: "web",
              },
            });
          }
        } else toast.error("Please fill in all the required fields!");
      } else {
        // toast.error(t("toast_error"));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      confirm_new_password,
      current_password,
      email,
      first_name,
      image,
      last_name,
      new_password,
      not_ropot,
      phone,
      t,
      updateImg,
      updatePassword,
      updateProfile,
      user?.token,
      userProfileDataOutlet?.email,
      userProfileDataOutlet?.first_name,
      userProfileDataOutlet?.last_name,
      userProfileDataOutlet?.phone,
    ]
  );
  useEffect(() => {
    if (
      updateImgServerErrors?.response?.data?.errors &&
      updateImgServerErrors?.response?.data?.errors?.not_ropot
    ) {
      setReCAPTCHAServerError(updateImgServerErrors?.response?.data?.errors?.not_ropot[0]);
    } else if (
      updateProfileServerErrors?.response?.data?.errors &&
      updateProfileServerErrors?.response?.data?.errors?.not_ropot
    ) {
      setReCAPTCHAServerError(updateProfileServerErrors?.response?.data?.errors?.not_ropot[0]);
    } else if (
      updatePasswordServerErrors?.response?.data?.errors &&
      updatePasswordServerErrors?.response?.data?.errors?.not_ropot
    ) {
      setReCAPTCHAServerError(updatePasswordServerErrors?.response?.data?.errors?.not_ropot[0]);
    } else setReCAPTCHAServerError("");
  }, [updateImgServerErrors, updateProfileServerErrors, updatePasswordServerErrors]);

  return (
    <section className="site_container pb-44 ss:pb-3">
      {/* <HelmetTags
        title={t("tab.title", {
          details:
            userProfileDataOutlet?.first_name +
            " " +
            userProfileDataOutlet?.last_name,
        })}
        description={t("tab.description")}
        index={false}
      /> */}
      <Heading style="text-center">{t("heading")}</Heading>

      <form
        encType="multipart/form-data"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="Profile--form  w-3/4 mx-auto min-w-[900px] lg:min-w-[300px] lg:w-full my-10 p-8 bg-grey flex flex-col gap-6"
      >
        <div className="Profile__form--top w-full flex md:flex-col md:gap-16 justify-between items-start">
          <div className="Profile__form--top--avatar--section w-1/3 md:w-full flex md:justify-center bg- ">
            <UploadFileComponent
              register={register}
              errors={errors}
              ServerErrors={updateImgServerErrors}
              name="image"
              btnText={t("form.UploadFileComponent_btnText")}
              watch={watch}
              t={t}
              serverFileSrc={userProfileDataOutlet?.image}
              fileFor="user"
              required={false}
            />
          </div>
          <div className="Profile__form--top--info--section w-2/3 md:w-full bg- flex flex-col items-start gap-2 md:gap-6">
            <TextComponent
              t={t}
              register={register}
              name="first_name"
              label={t("form.first_name.label")}
              placeholder={t("form.first_name.placeholder")}
              errors={errors}
              ServerErrors={updateProfileServerErrors}
              alignment="horizontal"
              width="w-full"
              Bgcolor="dark"
              required={false}
            />

            <TextComponent
              t={t}
              register={register}
              name="last_name"
              label={t("form.last_name.label")}
              placeholder={t("form.last_name.placeholder")}
              errors={errors}
              ServerErrors={updateProfileServerErrors}
              alignment="horizontal"
              width="w-full"
              Bgcolor="dark"
              required={false}
            />
            <PhoneComponent
              t={t}
              register={register}
              name="phone"
              label={t("form.phone.label")}
              placeholder={t("form.phone.placeholder")}
              errors={errors}
              ServerErrors={updateProfileServerErrors}
              alignment="horizontal"
              width="w-full"
              Bgcolor="dark"
              required={false}
            />
            <EmailComponent
              t={t}
              register={register}
              name="email"
              label={t("form.email.label")}
              placeholder={t("form.email.placeholder")}
              errors={errors}
              ServerErrors={updateProfileServerErrors}
              alignment="horizontal"
              width="w-full"
              Bgcolor="dark"
              required={false}
            />
            <PasswordComponent
              t={t}
              register={register}
              name="current_password"
              label={t("form.current_password.label")}
              placeholder={t("form.current_password.placeholder")}
              errors={errors}
              ServerErrors={updateProfileServerErrors}
              alignment="horizontal"
              width="w-full"
              Bgcolor="dark"
              getValues={getValues}
              required={false}
            />
            <PasswordComponent
              t={t}
              register={register}
              name="new_password"
              label={t("form.new_password.label")}
              placeholder={t("form.new_password.placeholder")}
              errors={errors}
              ServerErrors={updateProfileServerErrors}
              alignment="horizontal"
              width="w-full"
              Bgcolor="dark"
              getValues={getValues}
              validations={{
                validate: (value: any) =>
                  value !== getValues("current_password") || getValues("current_password") == "",
              }}
              confirmFor="old_vs_new"
              required={false}
            />
            <PasswordComponent
              t={t}
              register={register}
              name="confirm_new_password"
              label={t("form.confirm_new_password.label")}
              placeholder={t("form.confirm_new_password.placeholder")}
              errors={errors}
              ServerErrors={updateProfileServerErrors}
              alignment="horizontal"
              width="w-full"
              Bgcolor="dark"
              getValues={getValues}
              validations={{
                validate: (value: any) => value === getValues("new_password"),
              }}
              required={false}
            />
          </div>
        </div>
        <div className="Profile__form--bottom flex justify-between items-center md:flex-col md:gap-6 h-fi ">
          <ReCaptcha
            t={t}
            refs={recaptchaRef}
            onChange={onChange}
            error={submitted && not_ropot === "no"}
            ServerError={reCAPTCHAServerError}
          />
          {/** Submit Button */}
          <SubmitBtnComponent
            disabled={disabled}
            isLoading={updateImgIsLoading || updateProfileIsLoading || updatePasswordIsLoading}
            value={t("form.SubmitBtnComponent.value")}
            width="w-1/3 md:w-full"
            alignment="horizontal"
          />
        </div>
      </form>
    </section>
  );
}
