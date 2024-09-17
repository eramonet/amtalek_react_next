import Link from "next/link";

export default function QuikLinks({ t, locale }: any) {
  return (
    <div className="footer-col2 w-full h-full flex flex-col justify-start asm:items-center px-3  ">
      {/* <h2 className="text-xl  mb-9 ss:mb-3">{"Footer.second_column.title"}</h2> */}
      <h2 className="text-xl  mb-9 ss:mb-3">{t("Footer.second_column.title")}</h2>
      <div className="w-full flex asm:justify-center items-start gap-10">
        <ul className="  h-full flex flex-col items-start  justify-start gap-4 ">
          <li>
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.Home.link")}
            >
              {t("Footer.second_column.menu_items.Home.title")}
              {/* {"الرئيسية"} */}
              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li>
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.News.link")}
            >
              {t("Footer.second_column.menu_items.News.title")}
              {/* {"الأخبار"} */}
              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li>
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.FAQs.link")}
            >
              {t("Footer.second_column.menu_items.FAQs.title")}
              {/* {"الأسئلة الشائعة"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li>
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.Contact.link")}
            >
              {t("Footer.second_column.menu_items.Contact.title")}
              {/* {"اتصل بنا"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li>
            <Link
              className="mobile__nav--item"
              href={t("Footer.second_column.menu_items.Cities.link")}
            >
              {t("Footer.second_column.menu_items.Cities.title")}
              {/* {"المدن"} */}
            </Link>
          </li>
        </ul>

        {/* ************************************************************************************************************************************************ */}

        <ul className="  h-full flex flex-col items-start  justify-start gap-4 ">
          {/* {!user?.token && ( */}
          <li className="w-full flex  items-center">
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.Login.link")}
            >
              {t("Footer.second_column.menu_items.Login.title")}
              {/* {"تسجيل الدخول"} */}
              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          {/* )} */}
          <li className="w-full flex items-center">
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.About.link")}
            >
              {t("Footer.second_column.menu_items.About.title")}
              {/* {"إضافة عقار"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>

          <li className="w-full flex items-center">
            {/* {!user?.token ? ( */}
            <button
              // onClick={() => dispatchRedux(setShowLoginPopUp(true))}
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
            >
              {t("Footer.second_column.menu_items.Submit_Property.title")}
              {/* {"معلومات عنا"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </button>
            {/* ) : (
              <Link
                className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
                //! no_permission_link :=> /packages, if no quota navigate to packages
                href={
                  user?.token && userProfile?.has_package === "no"
                    ? "Footer.second_column.menu_items.Submit_Property.no_permission_link"
                    : //         , {
                    //     type: userProfile?.actor_type,
                    //   })
                    user?.token &&
                      userProfile?.has_package == "yes" &&
                      userProfile?.actor_type === "broker"
                    ? userProfile?.dashboard_link
                    : user?.token &&
                      userProfile?.has_package == "yes" &&
                      userProfile?.actor_type === "user"
                    ? `submit-property`
                    : ""
                }
                // state={"showErrorToast"}
              >
                {user?.data?.actor_type === "broker"
                  ? "Footer.second_column.menu_items.Submit_Property.dashboardTitle"
                  : "Footer.second_column.menu_items.Submit_Property.title"}
                <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
              </Link>
            )} */}
          </li>
          <li className="w-full flex items-center">
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.Terms_Conditions.link")}
            >
              {t("Footer.second_column.menu_items.Terms_Conditions.title")}
              {/* {"الأحكام والشروط"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li className="w-full flex items-center">
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.Privacy.link")}
            >
              {t("Footer.second_column.menu_items.Privacy.title")}
              {/* {"الخصوصية"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>

          <li className="w-full flex items-center">
            <Link
              target="_blank"
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={`/pdf/presentation/${
                locale === "ar"
                  ? // "amtalek-presentation-ar.pdf"
                    "amtalek-presentation-ar.pdf"
                  : "amtalek-presentation-en.pdf"
              }`}
              // to={t("Footer.second_column.menu_items.Amtalek_Presentation.link")}
            >
              {locale === "ar" ? "عرض تقديمي" : "Amtalek Presentation"}
              {/* {"عرض تقديمي"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
