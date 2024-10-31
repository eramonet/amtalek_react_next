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
import Pagination from "@/MainComponents/Pagination";

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
  const [data, setData] = useState<any>(false);
  // const user= useSelector(userData)
  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/brokers-properties/${id}?limit=4&page=${page}`,
        {
          method: "GET",
          headers: {
            lang: i18n.language,
            ...(user?.token && { Authorization: `Bearer ${user?.token}` }), // أضف التوكن إذا كان موجودًا
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      setData(data?.data?.original);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (actor_type === "broker") {
      if (tab === "rent") {
        setFilteredProperties(data.for_rent);
      }
      if (tab === "sale") {
        setFilteredProperties(data.for_sale);
      }
    } else if (actor_type === "user") {
      if (tab === "rent") {
        setFilteredProperties(data.for_rent);
      }
      if (tab === "sale") {
        setFilteredProperties(data.for_sale);
      }
    }
  }, [data, tab, actor_type]);
  // console.log(filteredProperties, data, tab, type);

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
          ) : Array.isArray(filteredProperties?.content) &&
            filteredProperties?.content.length > 0 ? (
            filteredProperties?.content.map((property: any) => (
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
          ) : (
            <NoItemsMessage message={t("BrokerProperties.NoItemsMessage")} />
          )
        ) : Array.isArray(filteredProperties?.for_rent?.content) &&
          filteredProperties?.for_rent?.content.length > 0 ? (
          filteredProperties?.for_rent?.content.map((property: any) => (
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
        ) : (
          <NoItemsMessage message={t("BrokerProperties.NoItemsMessage")} />
        )}
      </div>

      {filteredProperties?.content?.length > 0 && filteredProperties?.last_page > 1 && (
        <Pagination
          brokerDetails
          page={page}
          t={t}
          setPage={setPage}
          data={filteredProperties}
          isPreviousData={false}
        />
      )}
    </>
  );
});

export default BrokerProperties;
