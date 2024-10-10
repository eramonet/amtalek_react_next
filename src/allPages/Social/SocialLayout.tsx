import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Main from "./Main/Main";
import Navbar from "./Navbar";
import { setUserProfileData, userData } from "@/Store/Features/AuthenticationSlice";

interface ImportMeta {
  readonly env: {
    NEXT_PUBLIC_USER_PROFILE_DATA: string;
  };
}
declare const importMeta: ImportMeta;

export default function SocialLayout() {
  const user = useSelector(userData);
  const usertoken = localStorage.getItem("userData");
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = async () => {
    if (!usertoken) return;

    setIsLoading(true);
    setIsFetching(true);

    try {
      const response = await fetch(
        `https://amtalek.com/amtalekadmin/public/api/web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${user?.data?.actor_type}/${user?.data?.id}`,
        {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setData(result);
        setIsSuccess(true);
        dispatch(setUserProfileData(result));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full text-black flex flex-col gap-6 pb-5 bg-[#e0e0e0]">
      <Navbar isLoading={isLoading} isFetching={isFetching} />
      <Main
        usertoken={usertoken}
        refetch={fetchData}
        user={data}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </section>
  );
}
