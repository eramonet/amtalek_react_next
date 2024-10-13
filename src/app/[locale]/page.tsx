import LandingPage from "@/allPages/landingPage/LandingPage";
import useUserProfile from "@/api/useUserProfile";
import Cookies from "js-cookie";

export default async function Home({ params: { locale } }: any) {
  const { userData } = await useUserProfile(locale);
  const cookiesStore = Cookies.get("userData");

  return (
    // <>
    <main>
      <LandingPage locale={locale} token={cookiesStore} />
    </main>
    // </>
  );
}
