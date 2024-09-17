import getData from "@/api/getData";
import { GetServerSideProps } from "next";
interface Country {
  id: number;
  title: string;
  image: string;
}

interface Props {
  countries: Country[];
  selectedCountry: Country | null;
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const locale = (context.query.locale as string) || "ar"; // استخدام اللغة المحددة أو الافتراضية

  // جلب البيانات من الخادم
  const response = await getData("web/countries", locale);
  const countries = response.data || [];

  // تحديد الدولة الافتراضية من localStorage
  const currentCountry =
    typeof window !== "undefined" ? localStorage.getItem("country") || "1" : "1";
  const selectedCountry =
    countries.find((item: any) => item.id === parseInt(currentCountry)) || null;

  return {
    props: {
      countries,
      selectedCountry,
    },
  };
};

export default async function HeaderSection({
  className,
  title,
  subTitle,
  style,
  locale,
  countrie,
}: any) {
  return (
    <div className={`text-custome-blue mb-4 ${className}`}>
      <h1
        className={`text-3xl textHead mb-4 relative flex !w-fit flex-col uppercase font-semibold ss:text-lg md:text-md clg:text-lg group ${style}`}
      >
        {locale === "ar"
          ? `${title.replace(".", "")} في ${countrie?.title}`
          : `${title.replace(".", "")} in ${countrie?.title}`}
        {/* الشريط المتحرك تحت العنوان */}
        <span className="absolute -bottom-3 rounded w-1/4 h-1 bg-[#005879] md:h-[2px] transition-all duration-500 ease-out group-hover:w-1/2"></span>
      </h1>
      <h2 className="text-base mt-1 opacity-80 asm:text-center">{subTitle}</h2>
    </div>
  );
}
