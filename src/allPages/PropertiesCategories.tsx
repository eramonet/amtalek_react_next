"use client";
import { useEffect, useState } from "react";
import LangLink from "@/components/LangLink";
import { useTranslation } from "react-i18next";
import Loader from "@/components/loader/Loader";

function PropertiesCategories({ t }: any) {
  const { i18n } = useTranslation();
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_PROPERTY_TYPES}`,
          {
            method: "GET",
            headers: {
              lang: i18n.language,
              // ...(token && { Authorization: `Bearer ${token}` }), // أضف التوكن إذا كان موجودًا
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result?.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="w-full">
      <h3 className="font-medium text-xl mb-6">{t("PropertiesCategories.title")}</h3>
      <ul className="flex flex-col items-start gap-3 pl-10">
        {data?.map((category: any) => (
          <li className="list-disc" key={category?.id}>
            <LangLink
              className="relative group cursor-pointer h-7 flex flex-col justify-start"
              to={`/search?k=&cr=-1&c=-1&r=-1&sr=-1&t=${category?.id}&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1`}
            >
              {category?.title} {""} ({category?.properties_count})
              <hr className="border-[0px] border-secondary w-0 duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </LangLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertiesCategories;
