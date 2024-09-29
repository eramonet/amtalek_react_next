"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";
import React from "react";

export default function LayoutProvider({ children }: any) {
  const pathname = usePathname();

  return <>{!(pathname.includes("/login") || pathname.includes("/register")) && children}</>;
}
