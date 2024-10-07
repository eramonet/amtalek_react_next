import { Cities } from "@/allPages/Cities/Cities";

export default function CitiesPage({ params: { locale } }: any) {
  return <Cities locale={locale} />;
}
