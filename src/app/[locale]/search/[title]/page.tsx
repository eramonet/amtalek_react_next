"use client";
import { SearchProperty } from "@/allPages/SearchProperty/SearchProperty";
import { Suspense } from "react";
import Loading from "../../loading";
import { SearchProvider } from "@/allPages/SearchProperty/context";
import { SearchPropertyTwo } from "@/allPages/search/SearchPropertyTwo";

export default function page() {
  return (
    <SearchProvider>
      <Suspense fallback={<Loading />}>
        {/* <SearchProperty /> */}
        <SearchPropertyTwo />
      </Suspense>
    </SearchProvider>
  );
}
