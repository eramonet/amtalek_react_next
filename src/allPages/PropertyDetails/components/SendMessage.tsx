import Heading from "@/components/Heading";
import SendMessageForm from "./SendMessageForm";

export default function SendMessage({ data, locale, t }: any) {
  return (
    <div className="Property__LEAVE--COMMENT -mt-14">
      <Heading>
        {" "}
        {t("headings.LEAVE_COMMENT_word", {
          defaultValue: t("headings.LEAVE_COMMENT_word", {
            lng: locale === "en" ? "en" : "",
          }),
        })}
      </Heading>

      <SendMessageForm
        params={{
          property_id: data?.id,
        }}
        api={`https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_SINGLE_PROPERTY_LEAVE_COMMENT}`}
        type="PropertyDetails__Comment"
        // t={t}
        showRating
      />
    </div>
  );
}
