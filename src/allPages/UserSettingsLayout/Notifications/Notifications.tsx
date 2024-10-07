/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePostData } from "@/Hooks/useAxios";
import { QueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { userData } from "@/Store/Features/AuthenticationSlice";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  sender_data: {
    image: string;
  };
}

interface NotificationsProps {
  notifications: Notification[];
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unseenCounter, setUnseenCounter] = useState(0);

  const { i18n } = useTranslation();

  const user = useSelector(userData);

  async function getNotifications(token: string) {
    try {
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/my-notifications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data?.data);
      setNotifications(data?.data?.notifications);
      setUnseenCounter(data?.data?.unseen_counter);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }

  useEffect(() => {
    if (user?.token && i18n.language) {
      // getUserProfile(user?.token, i18n?.language);
      getNotifications(user?.token);
    }
  }, [user?.token, i18n.language]);
  const clientquery: any = new QueryClient();
  const { mutate }: any = usePostData(
    false, // showToasts
    () => {
      clientquery.invalidateQueries(["notifications"]); // onSuccess
    },
    true, // authorizedAPI
    (error) => {
      console.error("Error:", error); // onError
    }
  );

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [data, setData] = useState<Notification[]>([]); // استخدام مصفوفة فارغة كقيمة أولية
  console.log(clientquery);

  // استخدام useEffect لتحديث البيانات عند تحميل المكون
  useEffect(() => {
    if (Array.isArray(notifications)) {
      setData(notifications.slice(start, end)); // قص البيانات بناءً على الصفحة
    }
  }, [notifications, start, end]);

  const handlePageClick = useCallback((e: any) => {
    setStart(e.selected * 10);
    setEnd((e.selected + 1) * 10);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // const { i18n } = useTranslation();

  return (
    <section className="site_container p-3 rounded-xl flex flex-col gap-5 border">
      <div className="w-full flex flex-col gap-5">
        {data.length === 0 ? (
          <div className="min-h-[300px] flex justify-center items-center">
            <h2 className="text-center text-gray-500">
              {i18n.language.startsWith("ar") ? "لا توجد اشعارات" : "No Notifications"}
            </h2>
          </div>
        ) : (
          data.map((item: any) => (
            <Link
              key={item.id}
              onClick={() => mutate({ api: `see-my-notification/${item.id}` })}
              href={
                item.notification_type === "offer"
                  ? `${i18n.language.startsWith("ar") ? "" : "/en"}/my-received-offers`
                  : `${i18n.language.startsWith("ar") ? "" : "/en"}/messages`
              }
              className="w-full flex gap-5 items-center border-b pb-5 hover:bg-slate-100 p-1 rounded"
            >
              <Image
                src={
                  item.sender_data.image === ""
                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    : item.sender_data.image
                }
                className="w-14 h-14 rounded-full"
                alt="profile picture"
                width={1000}
                height={1000}
              />
              <div className="flex flex-auto">
                <div className="flex flex-col flex-auto gap-1">
                  <h2 className="text-lg text-gray-500">{item.title}</h2>
                  <p className="text-lg text-gray-400">{item.description}</p>
                </div>
                <span className="text-sm flex items-center">{item.time}</span>
              </div>
            </Link>
          ))
        )}
      </div>
      {Array.isArray(notifications) && notifications.length > 10 && (
        <ReactPaginate
          previousLinkClassName="pagination__previous"
          nextLinkClassName="pagination__next"
          containerClassName="pagination__wrapper"
          activeClassName="active__page--pagination"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(notifications.length / 10)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      )}
    </section>
  );
}
