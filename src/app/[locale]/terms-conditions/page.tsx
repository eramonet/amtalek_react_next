import getData from '@/api/getData';
import { TermsConditions } from '@/SubPages/TermsConditions';
import React from 'react'

export default async function page({ params: { locale } }: any) {
  const AllData = await getData(`web/${process.env.NEXT_PUBLIC_TERMS}`, locale);
  const data = AllData?.data;
  return <TermsConditions data={data} />;
}
