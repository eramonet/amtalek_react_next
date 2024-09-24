"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";

export default function LayoutProvider({ children }: any) {
  const pathname = usePathname();

  return <>{!pathname.includes("/Login") && <>{children}</>}</>;
}
