import Hero from "./hero/Hero";
import ImagesSection from "./imagesSection/ImagesSection";
import FeaturedProperties from "./featuredProperties/FeaturedProperties";
import getData from "@/api/getData";
import ADSHome from "@/components/ADS/ADSHome";
import MarketSection from "./marketSection/MarketSection";
import LastNews from "./lastNews/LastNews";
import Agencies from "./agencies/Agencies";
import PopularPlaces from "./popularPlaces/PopularPlaces";
import Loader from "@/components/loader/Loader";
import VideoSection from "./videoSection/VideoSection";
import MostViews from "./mostViews/MostViews";
import LatestProperties from "./latestProperties/LatestProperties";
import initTranslations from "@/app/i18n";

export default async function LandingPage({ locale }: any) {
  const countries = await getData("web/countries", locale);
  const AllCountries = countries.data[0] || [];

  const i18nNamespaces = ["Pages_LandingPage"];
  const { t } = await initTranslations(locale, i18nNamespaces);
  try {
    const data = await getData("web/home", locale);
    const allData = data.data;

    const dataImage = await getData("web/info-graph", locale);
    const allDataImage = dataImage.data;

    const ads = await getData("ads-getter/home-page", locale);
    const allAds = ads.data;

    const broker = await getData("web/our-brokers", locale);
    const allBroker = broker.data;

    if (!allDataImage) return <Loader />;

    return (
      <>
        <Hero data={allData?.sliders} />

        <ImagesSection data={allDataImage} />

        <ADSHome data={allAds} />

        <FeaturedProperties
          data={allData?.featured_properties}
          locale={locale}
          countrie={AllCountries}
        />

        <LatestProperties
          data={allData?.latest_properties}
          locale={locale}
          countrie={AllCountries}
          t={t}
        />

        <MarketSection data={allData?.market_section[0]} t={t} />

        <PopularPlaces
          data={allData?.cities_most_pops}
          t={t}
          locale={locale}
          countrie={AllCountries}
        />

        <VideoSection data={allData?.descripe_us[0]} locale={locale} countrie={AllCountries} />

        <MostViews data={allData?.most_view_deals} t={t} locale={locale} countrie={AllCountries} />

        <LastNews data={allData.news} t={t} locale={locale} countrie={AllCountries} />

        <Agencies data={allBroker} locale={locale} countrie={AllCountries} t={t} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <Loader />;
  }
}
