"use client";
import { SearchProperty } from "@/allPages/SearchProperty/SearchProperty";
import { Suspense } from "react";
import Loading from "../loading";
import { SearchProvider } from "@/allPages/SearchProperty/context";
// import { SearchPropertyTwo } from "@/allPages/search/SearchProperty/SearchPropertyTwo";

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchProvider>
        <SearchProperty />
        {/* <SearchPropertyTwo /> */}
      </SearchProvider>
    </Suspense>
  );
}
