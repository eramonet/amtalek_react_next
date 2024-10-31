import { Packages } from "@/allPages/Packages/Packages";

// دالة لإنشاء المعلمات الديناميكية اللازمة لإنشاء الصفحات الثابتة
export async function generateStaticParams() {
  // حدد اللغات المتاحة، مثلاً "en" و "ar"
  const locales = ["en", "ar"];
  // حدد أنواع الممثلين المتاحة
  const actorTypes = ["type1", "type2"]; // قم بتعديل الأنواع المتاحة حسب متطلباتك

  // توليد جميع التراكيب الممكنة من اللغات وأنواع الممثلين
  const params = locales.flatMap((locale) =>
    actorTypes.map((actor_type) => ({
      locale,
      actor_type,
    }))
  );

  return params;
}

export default function PackagesActorPage() {
  return <Packages />;
}
