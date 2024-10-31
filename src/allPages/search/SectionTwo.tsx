import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";
import LatestProperties from "../PropertyDetails/aside/components/LatestProperties";
import AdsSearchAside from "../SearchProperty/components/AdsSearchAside";
import SearchFormTwo from "./SearchFormTwo";

export default function SectionTwo({ formData, setFormData, setReloadData, fetchCountries }: any) {
  return (
    <section className=" SearchProperty__aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-8 amd:gap-5">
      <div className="w-full clg:hidden">
        <SearchFormTwo
          setReloadData={setReloadData}
          fetchCountries={fetchCountries}
          // handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          //   title={title}
          type={"asideForm"}
          showOptions
        />
      </div>
      <div className="w-full hidden clg:block">
        <SearchFormTwo
          fetchCountries={fetchCountries}
          setReloadData={setReloadData}
          // handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          //   title={title}
          type={"bigForm"}
          showOptions
        />
      </div>

      {/* start ads */}
      <AdsSearchAside />
      {/* end ads */}

      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6367957675332720"
        crossOrigin="anonymous"
      ></script>
      {/* <!-- Search result page amtalek --> */}
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
        data-ad-layout="in-article"
        data-ad-client="ca-pub-6367957675332720"
        data-ad-slot="1457112660"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <LatestProperties />
      <FeaturedPropertiesAside />
    </section>
  );
}
