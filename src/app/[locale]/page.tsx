import LandingPage from "@/allPages/landingPage/LandingPage";
// import { LandingPage } from "@/allPages/landingPage/LandingPage";
import useUserProfile from "@/api/useUserProfile";
import Cookies from "js-cookie";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home({ params: { locale } }: any) {
  const { userData } = await useUserProfile(locale);
  const cookiesStore = Cookies.get("userData");

  return (
    // <>
    <main>
      <Suspense fallback={<Loading />}>
        <LandingPage locale={locale} />
      </Suspense>
    </main>
    // </>
  );
}
