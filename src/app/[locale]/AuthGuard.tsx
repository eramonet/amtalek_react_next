"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { userData } from "@/Store/Features/AuthenticationSlice";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const user = useSelector(userData);
  useEffect(() => {
    // const token = localStorage.getItem("token");

    // تعريف المسارات المحمية
    const protectedPaths = ["/profile", "/messages", "/notifications"];

    if (protectedPaths.includes(window.location.pathname) && !user?.token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
