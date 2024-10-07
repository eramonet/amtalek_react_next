/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiSearch2Line } from "react-icons/ri";
import { IoChatbubbles } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { useForm } from "react-hook-form";
import { Loader } from "@/SubComponents";
import userImg from "@/assets/images/userImgNotLogin.png";
import Heading from "@/components/Heading";
import Image from "next/image";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import useUserProfile from "@/api/useUserProfile";

export function Messages() {
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [filteredAgentsWords, setFilteredAgentsWords] = useState("");
  const MsgsBox = useRef<HTMLDivElement>(null);
  const userProfileDataOutlet: any = useUserProfile();
  const { t, i18n } = useTranslation("Pages_Messages");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [actorType, setActor_Type] = useState<string>("");

  const {
    data: ContactedAgents,
    isSuccess,
    isLoading: isLoadingAgents,
  }: any = useFetchData(
    "GetContactedAgents",
    "get-contacted-agents",
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  const getReceiverImage = useMemo(() => {
    if (ContactedAgents?.length > 0) {
      return ContactedAgents?.filter((agent: any) => {
        return agent?.id === Number(searchParams.get("agent"));
      })[0]?.image;
    }
  }, [ContactedAgents, searchParams]);

  useEffect(() => {
    if (isSuccess && ContactedAgents) {
      setFilteredAgents(ContactedAgents);
    }
  }, [isSuccess, ContactedAgents]);

  useEffect(() => {
    if (filteredAgentsWords !== "" && ContactedAgents) {
      setFilteredAgents(
        ContactedAgents.filter((agent: any) =>
          agent?.name.toLowerCase().includes(filteredAgentsWords.toLowerCase())
        )
      );
    } else setFilteredAgents(ContactedAgents);
  }, [filteredAgentsWords, ContactedAgents]);

  const {
    mutate: MessageMutate,
    data: AgentsMessages,
    isLoading,
    isSuccess: isMessageSuccess,
  }: any = usePostData(
    false,
    () => {},
    true,
    (error) => {
      console.error("An error occurred:", error);
    }
  );

  const handleSendMessage = useCallback(() => {
    MessageMutate({
      api: "agents-messages",
      data: {
        agent_id: searchParams.get("agent"),
      },
      file: undefined,
    });
  }, [MessageMutate, searchParams]);

  const { register, getValues, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
      name: userProfileDataOutlet?.first_name + " " + userProfileDataOutlet?.last_name,
      email: userProfileDataOutlet?.email,
      phone: userProfileDataOutlet?.phone,
      not_ropot: "yes",
      starts: 0,
    },
  });

  const { mutate: SendMessage }: any = usePostData(
    false,
    () => {
      reset();
      MessageMutate({
        api: "get-contacted-agents-messages",
        data: {
          agent_id: searchParams.get("agent"),
        },
        file: undefined,
      });
    },
    true,
    (error) => {
      console.error("An error occurred:", error);
    }
  );

  const onSendMessage = useCallback(
    (data: any) => {
      return SendMessage({
        api: process.env.NEXT_PUBLIC_SEND_MESSAGE_TO_BROKER,
        data: {
          ...data,
          broker_type: actorType,
          vendor_id: Number(searchParams.get("agent")),
        },
        file: undefined,
      });
    },
    [getValues(), actorType, searchParams]
  );

  useEffect(() => {
    if (searchParams.get("agent")) {
      MessageMutate({
        api: "get-contacted-agents-messages",
        data: {
          agent_id: searchParams.get("agent"),
        },
        file: undefined,
      });
    }
  }, [MessageMutate, searchParams]);

  useEffect(() => {
    if (searchParams.get("agent") && isSuccess) {
      setActor_Type(
        ContactedAgents?.filter((agent: any) => agent?.id === Number(searchParams.get("agent")))[0]
          ?.actor_type
      );
    }
  }, [searchParams, isSuccess]);

  useEffect(() => {
    if (MsgsBox.current) {
      MsgsBox.current.scrollTop = MsgsBox.current.scrollHeight;
    }
  }, [AgentsMessages, isSuccess]);

  return (
    <section className="site_container pb-44 flex flex-col gap-10">
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}

      <div className="w-full grid grid-cols-3 amd:grid-cols-1 ss:gap-x-0 gap-5 ss:grid-cols-1 ss:gap-y-3">
        <div className="col-span-1 flex flex-col gap-5 bg-slate-100 p-3 rounded h-[450px]">
          <Heading className="text-center text-3xl cll:text-xl">{t("contacted")}</Heading>

          <div className="w-full relative">
            <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 rtl:left-3 ltr:right-3  " />

            <input
              type="text"
              value={filteredAgentsWords}
              onChange={(e) => setFilteredAgentsWords(e.target.value)}
              placeholder={t("placeholder")}
              className="w-full outline-none border border-secondary20 p-3 rounded caret-secondary20"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            {isLoadingAgents ? (
              <Loader h="m" />
            ) : filteredAgents?.length === 0 ? (
              <p className="text-xl">{t("no_results")}</p>
            ) : (
              <div className="w-full h-[280px] flex flex-col gap-3 bg-white p-3 rounded  overflow-auto">
                {filteredAgents?.map((agent: any) => (
                  <div
                    key={agent.id}
                    className={`w-full ${
                      agent?.message_type === "blur" ? "blur-sm pointer-events-none " : ""
                    } flex gap-3 rounded bg-slate-100 transition duration-300 hover:bg-slate-50 cursor-pointer p-3 ${
                      agent?.id === Number(searchParams.get("agent")) && "!bg-slate-300"
                    }`}
                    onClick={() => {
                      router.push(`?agent=${agent.id}`);
                      handleSendMessage();
                    }}
                  >
                    <Image
                      alt="dsadsa432"
                      src={
                        agent?.message_type === "blur"
                          ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          : agent?.image
                      }
                      className="w-10 h-10 rounded-full"
                      width={1000}
                      height={1000}
                    />

                    <span className="flex flex-1 items-center">{agent?.name?.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-5 bg-slate-100 p-3 rounded h-[450px]">
          <div className="w-full flex justify-between items-center">
            <Heading className="text-center text-3xl cll:text-xl w-fit">{t("title")}</Heading>
          </div>
          <div className="w-full h-full flex items-center gap-3 overflo justify-center flex-col relative ">
            {isLoading ? (
              <Loader h="auto" />
            ) : !AgentsMessages || AgentsMessages?.data?.agent_data?.length === 0 ? (
              <>
                <p className="text-3xl text-center">{t("no_messages")}</p>
                <IoChatbubbles size={40} />
              </>
            ) : (
              <>
                <div
                  ref={MsgsBox}
                  className="w-full flex flex-col gap-5 bg-white rounded p-2 justify-start h-[300px] overflow-y-scroll"
                >
                  {AgentsMessages?.data?.agent_data?.messages?.map((message: any, i: number) => (
                    <div
                      key={i}
                      className={`w-3/4 ss:w-[90%] flex relative rtl:ps-5 bg-slate-100  rounded-xl gap-2  items-center p-2 ${
                        message?.message_type === "sender"
                          ? " receiver ltr:ms-auto px-5 ltr:!flex-row-reverse"
                          : " sender rtl:ms-auto rtl:flex-row-reverse !px-5 "
                      }  `}
                    >
                      <Image
                        alt="ewqewq4342"
                        src={
                          message?.message_type === "sender"
                            ? userProfileDataOutlet?.image
                              ? userProfileDataOutlet?.image
                              : userImg
                            : getReceiverImage
                        }
                        className="w-10 h-10 rounded-full"
                        width={1000}
                        height={1000}
                      />
                      <p
                        className={`w-[78%] ss:w-[68%]  ${
                          message?.message_type === "receiver" && "text-left"
                        }`}
                      >
                        {message?.message}{" "}
                        {message?.link !== "" && (
                          <>
                            {i18n.language === "ar" ? ":من " : "from: "}{" "}
                            <Link href={`${message?.link}`}>{message?.link}</Link>
                          </>
                        )}
                      </p>
                      <span
                        className={`text-xs w-[15%] absolute bottom-2 rtl:left-0  ltr:right-0  text-center cll:rtl:left-5 cll:ltr:right-5 clg:ltr:right-9 clg:rtl:left-9 ${
                          message?.message_type === "sender"
                            ? "ltr:!left-0 ss:ltr:!left-1 rtl:!left-0"
                            : "ltr:!right-0 ss:ltr:!right-1 rtl:!right-0"
                        }`}
                      >
                        {message?.message_time.slice(11)}
                      </span>
                    </div>
                  ))}
                </div>
                <form
                  noValidate
                  onSubmit={handleSubmit(onSendMessage)}
                  className="w-full flex gap-2  items-center absolut bottom-3 z-50"
                >
                  <input
                    {...register("message", {
                      required: true,
                    })}
                    type="text"
                    placeholder={t("message_placeholder")}
                    className="flex flex-1 h-full ps-3 outline-none"
                  />
                  {AgentsMessages?.data?.agent_data?.messages?.length > 0 && isMessageSuccess && (
                    <button
                      className="bg-white rounded p-2 transition duration-300 hover:bg-slate-50"
                      onClick={() => {
                        MessageMutate({
                          api: "get-contacted-agents-messages", //import.meta.env.VITE_GET_CONTACTED_AGENTS_MESSAGES,
                          data: {
                            agent_id: searchParams.get("agent"),
                          },
                          file: undefined,
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowsRotate} className="text-xl" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="w-10 h-10 flex items-center justify-center rounded bg-white"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
