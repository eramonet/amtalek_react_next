import { Box, IconButton, Menu, Tooltip } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

export default function ButtonNavbarLogin() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="sigin__wrapper group relative ">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          width: "fit-content",
        }}
      >
        <Tooltip title={null}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <button className="round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary border-2 border-secondary ">
              <FaCircleUser />
              <FaChevronDown />
            </button>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "none",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            "& .MuiList-padding": {
              padding: "0 !important",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={`signin__menu  w-72 h-96 `}>
          <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md round ">
            {/* <img className="w-14  aspect-square" src={favIconSrc} alt="fav-icon" /> */}

            <h3 className="text-2xl font-medium text-center">
              {"Navbar.Login_drop_down_menu.heading"}
            </h3>
            <p className="opacity-70">{"Navbar.Login_drop_down_menu.sub_heading"}</p>
            <Link
              href="/Login"
              className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3"
            >
              {"Navbar.Login_drop_down_menu.Login_btn_txt"}
            </Link>
            <Link
              href="/register"
              className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out  hover:bg-secondary hover:text-bg text-secondary text-lg"
            >
              {"Navbar.Login_drop_down_menu.Register_btn_txt"}
            </Link>
          </div>
        </div>
      </Menu>
    </div>
  );
}
