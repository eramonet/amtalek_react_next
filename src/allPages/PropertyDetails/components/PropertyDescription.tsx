import HeaderSection from "@/components/headerSection/HeaderSection";

export default function PropertyDescription({ data, locale, t }: any) {
  return (
    <div className="Property__description">
      {/* <HeaderSection className={""}> */}{" "}
      {t("headings.description", {
        defaultValue: t("headings.description", {
          lng: locale === "ar" ? "ar" : "en",
        }),
      })}
      {/* </HeaderSection> */}
      <div dangerouslySetInnerHTML={{ __html: data?.description }} className="break-words"></div>
    </div>
  );
}
