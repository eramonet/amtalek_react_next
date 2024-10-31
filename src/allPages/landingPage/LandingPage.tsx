// // "use client";
// "use client";
// import React, { Suspense, useEffect, useState } from "react";
// import Hero from "./hero/Hero";
// import ImagesSection from "./imagesSection/ImagesSection";
// import FeaturedProperties from "./featuredProperties/FeaturedProperties";
// import ADSHome from "@/components/ADS/ADSHome";
// import Agencies from "./agencies/Agencies";
// import VideoSection from "./videoSection/VideoSection";
// import MostViews from "./mostViews/MostViews";
// import LatestNews from "./lastNews/components/LatestNews";
// import LatestProperties from "./latestProperties/components/LatestProperties";
// import MarketSection from "./marketSection/components/MarketSection";
// import PopularPlaces from "./popularPlaces/components/PopularPlaces";
// import Loading from "./../../app/[locale]/loading";
// import getData from "@/api/getData";
// import {
//   Authorized,
//   fetchUserProfile,
//   userData,
//   userProfileData,
//   userProfileDataOut,
// } from "@/Store/Features/AuthenticationSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { TUser } from "@/Types/AppTypes";
// // import { UserProfileClient } from "@/api/UserProfileClient";
// // import { cookies } from "next/headers";
// import Cookies from "js-cookie";
// export default function LandingPage({ locale }: { locale: string }) {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   // const cookieStore = cookies();
//   // const userDatacookies = cookieStore.get("userData");
//   // const userDataValue: any = userDatacookies ? userDatacookies.value : null;
//   // const user: any = useSelector(userData) || null;
//   const userProfile: any = useSelector(userProfileDataOut) || null;

//   const dispatch = useDispatch();
//   const user = useSelector(userData);
//   const token = useSelector(Authorized);
//   // const userProfiletwo = useSelector(userProfileData) as TUser;
//   // console.log(userProfiletwo);
//   // const [userProfileDataOutletData, setUserProfileDataOutletData] = useState<any>([]);
//   //   const user = useSelector(userData);

//   //   async function getUserProfile(token: string, language: string) {
//   //     try {
//   //       const response = await fetch(
//   //         `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
//   //         {
//   //           method: "GET",
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //             "Accept-Language": language,
//   //           },
//   //         }
//   //       );

//   //       if (!response.ok) {
//   //         throw new Error("Network response was not ok");
//   //       }

//   //       const dataProfile = await response.json();

//   //       setUserProfileDataOutlet(dataProfile?.data);
//   //     } catch (error) {
//   //       console.error("Failed to fetch user profile:", error);
//   //     }
//   //   }

//   //   useEffect(() => {
//   //     if (user?.token && i18n.language) {
//   //       getUserProfile(user?.token, i18n?.language);
//   //       // getNotifications(user?.token);
//   //     }
//   //     // eslint-disable-next-line react-hooks/exhaustive-deps
//   //   }, [user?.token, i18n.language]);

//   // const d = Cookies.get("userData");
//   // console.log(d);

//   useEffect(() => {
//     // if (user && token) {
//     const language = "en"; // يمكنك الحصول على اللغة من السياق أو الحالة الخاصة بك
//     dispatch(fetchUserProfile({ token, language: locale, userData: user }));
//     // }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user, token, dispatch]);

//   console.log(user, userProfile);

//   useEffect(() => {
//     // UserProfileClient();
//     const fetchData = async () => {
//       try {
//         const homeData = await getData("web/home", locale, user?.token);
//         const infoGraphData = await getData("web/info-graph", locale, user?.token);
//         const adsData = await getData("ads-getter/home-page", locale, user?.token);
//         const brokersData = await getData("web/our-brokers", locale, user?.token);
//         const countriesData = await getData("web/countries", locale, user?.token);
//         const userProfileDataOutlet = await getData(
//           `web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
//           locale,
//           user?.token
//         );
//         // console.log(userProfileDataOutlet?.data);

//         // if (user && userProfileDataOutlet?.data) {
//         //   Cookies.set("userProfileDataOutlet", JSON.stringify(userProfileDataOutlet?.data));
//         // }

//         setData({
//           allData: homeData?.data,
//           allDataImage: infoGraphData?.data,
//           allAds: adsData?.data,
//           allBroker: brokersData?.data,
//           AllCountries: countriesData?.data[0] || [],
//           AlluserProfileDataOutlet: userProfileDataOutlet?.data,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [locale, user?.token]);

//   if (loading) {
//     return <Loading />;
//   }

//   const { allData, allDataImage, allAds, allBroker, AllCountries, AlluserProfileDataOutlet } = data;

//   if (user && AlluserProfileDataOutlet) {
//     localStorage.setItem("userProfileDataOutlet", JSON.stringify(AlluserProfileDataOutlet));
//   }

//   return (
//     <Suspense fallback={<Loading />}>
//       <Hero data={allData?.sliders || []} />
//       <ImagesSection data={allDataImage || []} />
//       <ADSHome data={allAds || []} />
//       <FeaturedProperties data={allData?.featured_properties || []} countrie={AllCountries} />
//       <LatestProperties data={allData?.latest_properties || []} countrie={AllCountries} />
//       <MarketSection data={allData?.market_section[0] || null} />
//       <PopularPlaces data={allData?.cities_most_pops || []} countrie={AllCountries} />
//       <VideoSection data={allData?.descripe_us[0] || null} countrie={AllCountries} />
//       <MostViews data={allData?.most_view_deals || []} countrie={AllCountries} />
//       <LatestNews data={allData?.news || []} />
//       <Agencies data={allBroker || []} countrie={AllCountries} />
//     </Suspense>
//   );
// }

import React, { Suspense, useEffect, useState } from "react";
import Hero from "./hero/Hero";
import ImagesSection from "./imagesSection/ImagesSection";
import FeaturedProperties from "./featuredProperties/FeaturedProperties";
import ADSHome from "@/components/ADS/ADSHome";
// import MarketSection from "./marketSection/MarketSection";
// import LastNews from "./lastNews/LastNews";
import Agencies from "./agencies/Agencies";
// import PopularPlaces from "./popularPlaces/PopularPlaces";
// import Loader from "@/components/loader/Loader";
import VideoSection from "./videoSection/VideoSection";
import MostViews from "./mostViews/MostViews";
// import LatestProperties from "./latestProperties/LatestProperties";
import initTranslations from "@/app/i18n";
import { useSelector } from "react-redux";
import { OwnCountry } from "@/Store/Features/MiscellaneousSlice";
import { useFetchData } from "@/Hooks/useFetchData";
import MarketSection from "./marketSection/components/MarketSection";
import PopularPlaces from "./popularPlaces/components/PopularPlaces";
import LatestNews from "./lastNews/components/LatestNews";
import LatestProperties from "./latestProperties/components/LatestProperties";
import getData from "@/api/getData";
// import MemoizedFeaturedProperties from "./featuredProperties/components/FeaturedProperties";
import Loading from "./../../app/[locale]/loading";
import { cookies } from "next/headers";

export default async function LandingPage({ locale, token }: any) {
  // const [initialData, setInitialData] = useState<any>(null);
  // const [initialDataImage, setInitialDataImage] = useState<any>(null);
  // const [initialAds, setInitialAds] = useState<any>(null);
  // const [initialBroker, setInitialBroker] = useState<any>(null);
  // const [countries, setCountries] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  // const [t, setT] = useState((key: any) => key); // استخدام ترجمة افتراضية

  // دالة لجلب البيانات
  // const fetchData = async (endpoint: any) => {
  //   try {
  //     // تأكد من وجود التوكن
  //     // const token = localStorage.getItem("token"); // أو أي طريقة أخرى تستخدمها للحصول على التوكن

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}${endpoint}`, {
  //       method: "GET",
  //       headers: {
  //         lang: locale,
  //         ...(token && { Authorization: `Bearer ${token}` }), // أضف التوكن إذا كان موجودًا
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error(`Error fetching data from ${endpoint}:`, error);
  //     return null;
  //   }
  // };

  // // const theCountry = useSelector(OwnCountry);

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     try {
  //       const data = await fetchData(
  //         // ?country_id=${theCountry?.id}
  //         // ${process.env.NEXT_PUBLIC_LANDING_PAGE}
  //         `web/home`
  //       );
  //       const dataImage = await fetchData("web/info-graph");
  //       const ads = await fetchData("ads-getter/home-page");
  //       const broker = await fetchData("web/our-brokers");
  //       const AllCountries = await fetchData("web/countries");

  //       const i18nNamespaces = ["Pages_LandingPage"];
  //       const { t: translation } = await initTranslations(locale, i18nNamespaces);

  //       setInitialData(data?.data || null);
  //       setInitialDataImage(dataImage?.data || null);
  //       setInitialAds(ads?.data || null);
  //       setInitialBroker(broker?.data || null);
  //       setCountries(AllCountries?.data || null);
  //       setT(translation);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAllData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [locale, token]);
  // const { t } = await initTranslations(locale, i18nNamespaces);
  // try {
  const cookieStore = cookies();

  const userDatacookies = cookieStore.get("userData");

  const userDataValue: any = userDatacookies ? userDatacookies.value : null;

  const userData: any = userDataValue ? JSON.parse(userDataValue) : null;

  const data = await getData("web/home", locale, userData?.token);
  const allData = data?.data;

  const dataImage = await getData("web/info-graph", locale, userData?.token);
  const allDataImage = dataImage?.data;

  const ads = await getData("ads-getter/home-page", locale, userData?.token);
  const allAds = ads?.data;

  const broker = await getData("web/our-brokers", locale, userData?.token);
  const allBroker = broker?.data;
  const countries = await getData("web/countries", locale, userData?.token);
  const AllCountries = countries?.data[0] || [];

  // if (!allDataImage) return <Loader />;
  // عرض Loader إذا كانت البيانات لا تزال تُحمّل
  // if (loading || !initialDataImage) {
  //   return <Loader />;
  // }
  // console.log(countries);

  return (
    // allData?
    <>
      <Suspense fallback={<Loading />}>
        <Hero data={allData?.sliders || []} />
        <ImagesSection data={allDataImage || []} />
        <ADSHome data={allAds || []} />
        <FeaturedProperties data={allData?.featured_properties || []} countrie={AllCountries} />

        <LatestProperties data={allData?.latest_properties || []} countrie={AllCountries} />
        <MarketSection data={allData?.market_section[0] || null} />
        <PopularPlaces data={allData?.cities_most_pops || []} countrie={AllCountries} />
        <VideoSection data={allData?.descripe_us[0] || null} countrie={AllCountries} />
        <MostViews data={allData?.most_view_deals || []} countrie={AllCountries} />
        <LatestNews data={allData?.news || []} />
        <Agencies data={allBroker || []} countrie={AllCountries} />
      </Suspense>
    </>
  );
}
