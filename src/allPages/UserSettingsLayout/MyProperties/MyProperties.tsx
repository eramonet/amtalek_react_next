// "use client"; // Ensure this component is rendered client-side

import DeletePopUp from "@/MainComponents/DeletePopUp";
import PropertyCard from "@/CardsComponents/PropertyCard";
// import useUserProfile from "@/api/useUserProfile";
import { NoItemsMessage, ErrorMessage } from "@/SubComponents";
import Heading from "@/components/Heading";
// import { useTranslation } from "react-i18next";
import { cookies } from "next/headers";

export default async function MyProperties({ locale, t, i18n }: any) {
  // const { t, i18n } = useTranslation("Pages_MyProperties");
  const cookieStore = cookies();

  const userData = cookieStore.get("userData");
  const token = cookieStore.get("token");

  const userDataValue: any = userData ? userData.value : null;
  const tokenValue: any = token ? token.value : null;

  const userDataValueJs: any = JSON.parse(userDataValue);
  const tokenValueJs: any = tokenValue;

  // const userProfileDataOutlet = useUserProfile();
  const userProfileDataOutlet = userDataValueJs?.data;

  let response;
  let dataProfile;
  try {
    response = await fetch(
      `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${userProfileDataOutlet?.actor_type}/${userProfileDataOutlet?.id}`,
      {
        method: "GET",
        headers: {
          lang: locale,
          Authorization: `Bearer ${tokenValueJs}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    dataProfile = await response.json(); // قراءة الاستجابة هنا فقط
  } catch (error: any) {
    console.error("Failed to fetch data:", error.message);
    return <ErrorMessage message="Failed to fetch data. Please try again later." />;
  }

  const data = dataProfile?.data; // استخدام البيانات المستخرجة بعد قراءتها مرة واحدة

  let getAllViews = 0;
  if (data?.my_props?.length > 0) {
    const ViewsArray = data.my_props.map((offer: any) => offer.views);
    getAllViews = ViewsArray.reduce((a: any, b: any) => a + b, 0);
  }

  return (
    <section className="pb-44 site_container">
      <DeletePopUp api={process.env.NEXT_PUBLIC_DELETE_PROPERTY} Bgcolor="dark" />
      <Heading style="text-center">{t("heading")}</Heading>
      <div className="w-full grid grid-cols-3 pt-10 px-3 pb-3 ss:grid-cols-1 amd:grid-cols-2 relative border my-10 ss:gap-3">
        <span className="absolute -top-4 left-3 bg-white text-lg">{t("interactions")}</span>
        <div className="col-span-1 flex flex-col justify-center items-center gap-3 border bg-gray-100 h-[200px]">
          <span className="text-lg">{data?.total_impressions}</span>
          <span className="text-lg">{t("impressions")}</span>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center gap-3 border bg-gray-100 h-[200px]">
          <span className="text-lg">{data?.total_pages_views}</span>
          <span className="text-xl">{t("totalView")}</span>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center gap-3 border bg-gray-100 h-[200px]">
          <span className="text-lg">{data?.total_leads}</span>
          <span className="text-xl">{t("totalLeads")}</span>
        </div>
      </div>
      <div className="all__favorites--wrapper w-full grid grid-cols-3 gap-5 gap-y-32 ss:gap-28 ss:grid-cols-1 amd:grid-cols-2 my-10">
        {data?.my_props?.length > 0 ? (
          data.my_props.map((property: any, i: any) => (
            <PropertyCard data={data.my_props} key={i} property={property} showActions acceptedCheck={true} />
          ))
        ) : data?.my_props?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          <ErrorMessage message={t("ErrorMessage")} />
        )}
      </div>
    </section>
  );
}
