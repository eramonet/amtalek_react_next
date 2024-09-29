import LandingPage from "@/allPages/landingPage/LandingPage";

export default function Home({ params: { locale } }: any) {
  return (
    // <>
    <main>
      <LandingPage locale={locale} />
    </main>
    // </>
  );
}
