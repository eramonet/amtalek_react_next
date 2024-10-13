import HeaderSection from "@/components/headerSection/HeaderSection";
import Slider from "./components/Slider";
import useUserProfile from "@/api/useUserProfile";

export default async function FeaturedProperties({ data, locale, countrie }: any) {
  const { userProfileDataOutlet, userData } = await useUserProfile(locale);
  return (
    <section className="py-10">
      <div className="site_container relative">
        {/* <div className=""> */}
        <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          locale={locale}
          countrie={countrie}
        />
        <Slider
          data={data}
          locale={locale}
          countrie={countrie}
          user={userData}
          userProfileDataOutlet={userProfileDataOutlet}
        />{" "}
        {/* </div> */}
      </div>
    </section>
  );
}
