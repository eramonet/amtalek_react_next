import { Outlet } from "react-router-dom";
import LeftAside from "./LeftAside";
import RightAside from "./RightAside";
import { motion } from "framer-motion";
// import { MainLoader } from "@/Components/LayoutComponents";
import { TUser } from "@/Types/AppTypes";
import MainLoader from "@/components/MainLoader";
type TMain = {
  user: TUser;
  usertoken: string | null;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
};
function Main({ user, usertoken, isLoading, isFetching, refetch }: any) {
  return (
    <>
      {usertoken && isLoading ? (
        <MainLoader />
      ) : (
        <motion.main
          // initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full grid grid-cols-4 px-[90px] gap-4 mt-[90px]"
        >
          <LeftAside refetch={refetch} user={user} />

          <Outlet context={[user, usertoken, isLoading, isFetching, refetch]} />
          <RightAside user={user as TUser} />
        </motion.main>
      )}
    </>
  );
}

export default Main;
