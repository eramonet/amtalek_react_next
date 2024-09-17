"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../i18nConfig";
import { TbWorld } from "react-icons/tb";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = () => {
    // تحديد اللغة الجديدة
    const newLocale = currentLocale === "ar" ? "en" : "ar";

    // تعيين الـ Cookie لتغيير اللغة في next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // تغيير المسار حسب اللغة الجديدة
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    // تحديث الصفحة بعد التغيير
    router.refresh();
  };

  return (
    <button onClick={handleChange} className="flex items-center justify-center gap-2">
      <TbWorld />
      {currentLocale === "ar" ? "English" : "العربية"}
    </button>
  );
}
