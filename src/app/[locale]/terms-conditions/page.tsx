import getData from "@/api/getData";
import { TermsConditions } from "@/SubPages/TermsConditions";
import { Suspense } from "react";
import Loading from "../loading";

export default async function page({ params: { locale } }: any) {
  const AllData = await getData(`web/${process.env.NEXT_PUBLIC_TERMS}`, locale);
  const data = AllData?.data;
  return (
    <Suspense fallback={<Loading />}>
      <TermsConditions data={data} />
    </Suspense>
  );
}
