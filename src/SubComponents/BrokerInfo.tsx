// import { useEffect, useState } from "react";
// import { userData, setShowLoginPopUp } from "@/Store/Features/AuthenticationSlice";
// import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Modal } from "antd";
// import { usePostData } from "../Hooks/useAxios";
// // import { setShowLoginPopUp, userData } from "../../../Store/Features/AuthenticationSlice";
// function BrokerInfo({ data, t }: any) {
//   const user = useSelector(userData);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const dispatchRedux = useDispatch();

//   const {
//     mutate: CallMutate,
//     data: CallData,
//     isSuccess: CallSuccess,
//     error: CallError,
//   } = usePostData(false, () => {});
//   useEffect(() => {
//     if (CallSuccess) {
//       showModal();
//     }
//   }, [CallSuccess]);
//   const {
//     mutate: EmailMutate,
//     data: EmailData,
//     isSuccess: EmailSuccess,
//     error: EmailError,
//   } = usePostData(false, () => {});
//   useEffect(() => {
//     if (EmailSuccess) {
//       window.open(`mailto:${data?.email}`);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [EmailSuccess]);

//   const {
//     mutate: WhatsappMutate,
//     data: WhatsappData,
//     isSuccess: WhatsappSuccess,
//     error: WhatsappError,
//   } = usePostData(false, () => {});
//   useEffect(() => {
//     if (WhatsappSuccess) {
//       window.open(
//         `https://web.whatsapp.com/send?phone=+2${data?.phone}&text=${t("message", {
//           link: window.location.href,
//         })}`
//       );
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [WhatsappSuccess]);

//   useEffect(() => {
//     if (
//       CallError?.response?.status === 401 ||
//       EmailError?.response?.status === 401 ||
//       WhatsappError?.response?.status === 401
//     ) {
//       dispatchRedux(setShowLoginPopUp(true));
//     }
//   }, [CallError?.response?.status, EmailError?.response?.status, WhatsappError?.response?.status]);

//   return (
//     <div className="broker__info flex justify-between items-start gap-16 bg-slate-100 py-10 px-2 ss:gap-8 md:flex-col md:items-center md:justify-start w-full rounded-xl">
//       <div className="w-1/2 md:w-full h-auto  max-h-80 flex justify-center">
//         <img
//           className="broker__img object-cover w-auto h-auto max-h-80 max-w-full rounded-xl"
//           loading="lazy"
//           src={data?.logo}
//           alt={data?.name}
//         />
//       </div>
//       <div className="broker__contacts w-1/2 md:w-full ">
//         <h2 className="text-2xl font-semibold asm:text-center relative w-fit ownerName md:text-lg">
//           {data?.name}
//           <span className="absolute -bottom-2 rtl:right-0  left-0 w-1/4 bg-[#005879] h-1 rounded"></span>
//         </h2>
//         {data?.description && (
//           <p className="broker__contacts--description text-sm opacity-70 mt-5 text-justify">
//             {data?.description}
//           </p>
//         )}

//         {user?.data?.company_id !== data?.id && (
//           <div className="w-full flex ss:justify-center items-center gap-3 xl:gap-2 mt-5">
//             <div
//               // () => dispatchRedux(setShowLoginPopUp(true))
//               // !props?.user?.token ? props?.ShowLoginPopUp : () => {}
//               onClick={() => {
//                 WhatsappMutate({
//                   api: `contact-brokers-in-details`,
//                   data: {
//                     transaction_type: "meeting",
//                     broker_id: data?.id,
//                     broker_type: data?.broker_type,
//                   },
//                   file: undefined,
//                 });
//                 !user?.token && dispatchRedux(setShowLoginPopUp(true));
//               }}
//               className="p-2 bg-[#25d366] rounded flex text-white items-center text-lg gap-2 xl:gap-1 xl:p-1 xl:text-base ss:p-2 hover:text-[#25d366] hover:bg-white border-[#25d366] border duration-300 transition cursor-pointer"
//             >
//               <span>{t("whatsapp")}</span> <FaWhatsapp />
//             </div>

//             <Modal
//               classNames={{
//                 content: "w-[300px] mx-auto callModalBroker",
//               }}
//               title={<span className="mx-auto !w-full !text-center">{t("callUs")}</span>}
//               open={isModalOpen}
//               onOk={handleOk}
//               onCancel={handleCancel}
//               centered
//               footer={null}
//             >
//               <div className="w-full flex flex-col gap-3">
//                 <img alt="dsagfdd" src={data?.logo} className="w-16 h-16 rounded-full mx-auto" />
//                 <div className="w-full flex gap-2 items-center">
//                   <span className="text-gray-500">{t("phoneNumber")}</span>
//                   <Link
//                     className="p-2 xl:gap-1 xl:p-1 xl:text-base  rounded flex items-center text-lg text-secondary gap-2 ss:p-2 "
//                     to={user?.token && `tel:${data?.phone}`}
//                   >
//                     {data?.phone}
//                   </Link>
//                 </div>
//                 <div className="w-full flex  items-center border-y py-2 gap-2">
//                   <span className="text-gray-500">{t("brokerName")}</span>
//                   <span>{data?.name}</span>
//                 </div>
//               </div>
//             </Modal>
//             <div
//               onClick={() => {
//                 CallMutate({
//                   api: `contact-brokers-in-details`,
//                   data: {
//                     transaction_type: "call",
//                     broker_id: data?.id,
//                     broker_type: data?.broker_type,
//                   },
//                   file: undefined,
//                 });
//               }}
//               className="p-2 xl:gap-1 xl:p-1 xl:text-base bg-[#ff6665] rounded flex items-center text-lg text-white gap-2 ss:p-2 hover:text-[#ff6665] hover:bg-white border-[#ff6665] border duration-300 transition cursor-pointer"
//             >
//               <span>{t("call")}</span> <FaPhoneAlt />
//             </div>

//             <div
//               onClick={() => {
//                 EmailMutate({
//                   api: `contact-brokers-in-details`,
//                   data: {
//                     transaction_type: "email",
//                     broker_id: data?.id,
//                     broker_type: data?.broker_type,
//                   },
//                   file: undefined,
//                 });
//               }}
//               className="p-2 bg-[#005879] rounded flex items-center gap-2 text-lg text-white xl:gap-1 xl:p-1 xl:text-base ss:p-2 hover:text-secondary hover:bg-white border-secondary  border duration-300 transition cursor-pointer"
//               // to={
//               //   user?.token && `mailto:${data?.broker_details[0]?.email}`
//               // }
//             >
//               <span>{t("email")}</span> <MdOutlineMailOutline />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BrokerInfo;
// // function dispatchRedux(arg0: { payload: any; type: "Authorized/setShowLoginPopUp" }) {
// //   throw new Error("Function not implemented.");
// // }
