import i18next from "i18next";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ locale }: any) {
  return (
    <div>
      <Link href="/">
        <Image
          src={locale === "ar" ? "/images/navArLogo.png" : "/images/navEnLogo.png"}
          alt="Logo"
          width={150}
          height={100}
          className=""
        />
      </Link>
    </div>
  );
}
