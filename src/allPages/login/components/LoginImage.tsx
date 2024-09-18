"use client";
import Image from "next/image";
import Link from "next/link";
import Lottie from "react-lottie-player";

export default function LoginImage({ locale }: any) {
  return (
    <div className="illustration w-1/2 h-full bg-login-patter2 flex flex-col  justify-center items-center clg:hidden">
      <Link href="/">
        <Image
          className="w-40"
          width={160}
          height={160}
          src={locale === "ar" ? "/images/logo-ar.png" : "/images/logo-en.png"}
          alt="logo"
        />
      </Link>
      {/* <Lottie
        path="https://lottie.host/615d8408-af4a-4400-af6c-28d3851efdc7/YQ2nvw3Z0M.json"
        play
        loop={false}
        style={{ width: 450, height: 450 }}
      /> */}
      {/*           <img src="../../assets/login-illustration.png" alt="" />
       */}{" "}
    </div>
  );
}
