import { BrokerDetails } from "@/allPages/Brokers/BrokerDetails/BrokerDetails";
import React from "react";



export default function BrokerDetailsPage({ params: { locale, actor_type, id } }: any) {
  // title={t("tab.title", { details: data[0]?.name })}
  //       description={t("tab.description")}

  // console.log(locale, actor_type, id);

  // return "<BrokerDetails id={id} locale={locale} actor_type={actor_type} />;";
  return (
    <>
      <BrokerDetails locale={locale} actor_type={actor_type} id={id} />
    </>
  );
}
