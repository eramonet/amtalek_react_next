"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ErrorMessage, Loader, NoItemsMessage } from "@/SubComponents";
import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import PropertyCard from "@/CardsComponents/PropertyCard";

const BrokerProperties = memo(function BrokerProperties({
  t,
  userProperties_for_sale,
  userProperties_for_rent,
  userpropSuccess,
  tab,
  brokerDetails,
  actor_type,
  id,
}: any) {
  let searchParams = useSearchParams();
  const { i18n } = useTranslation();
  const [filteredProperties, setFilteredProperties] = useState<any>([]);
  const dispatchRedux = useDispatch();
  const user = useSelector(userData);
  const lng = useSelector(lang);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const { type } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/brokers-properties/${id}?limit=4&page=${page}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      setFilteredProperties(data?.data?.original);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    if (type === "broker") {
      setFilteredProperties(
        tab === "rent" ? filteredProperties.for_rent : filteredProperties.for_sale
      );
    } else if (type === "user") {
      setFilteredProperties(tab === "rent" ? userProperties_for_rent : userProperties_for_sale);
    }
  }, [filteredProperties, tab, type]);

  return (
    <>
      <div
        className={`Broker__properties--wrapper w-full grid ${
          brokerDetails ? "grid-cols-1 gap-5" : "grid-cols-1 gap-10"
        } my-10`}
      >
        {actor_type === "broker" ? (
          isError ? (
            <ErrorMessage message={t("BrokerProperties.ErrorMessage")} />
          ) : isLoading ? (
            <Loader />
          ) : filteredProperties?.for_rent?.content?.length === 0 ? (
            <NoItemsMessage message={t("BrokerProperties.NoItemsMessage")} />
          ) : (
            filteredProperties?.for_rent?.content?.map((property: any) => (
              <PropertyCard
                brokerDetails
                key={property?.id}
                property={property}
                t={t}
                user={user}
                lng={lng}
                ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
                i18n={i18n}
              />
            ))
          )
        ) : filteredProperties?.for_sale?.content === "0" ? (
          <NoItemsMessage message={t("BrokerProperties.NoItemsMessage")} />
        ) : (
          filteredProperties?.for_sale?.content?.map((property: any) => (
            <PropertyCard
              brokerDetails
              key={property?.id}
              property={property}
              t={t}
              user={user}
              lng={lng}
              ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
              i18n={i18n}
            />
          ))
        )}
      </div>
    </>
  );
});

export default BrokerProperties;
