"use client"
import Login from "@/allPages/login/Login";

export default function LoginPage({ params: { locale } }: any) {
  return (
    <div>
      <Login locale={locale} />
    </div>
  );
}
