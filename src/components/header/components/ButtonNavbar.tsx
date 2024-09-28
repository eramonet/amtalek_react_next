"use client";
import { Badge, Dropdown, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { TbSocial } from "react-icons/tb";
// import ButtonNavbarLogin from "./ButtonNavbarLogin";
import { useTranslation } from "react-i18next";

export default function ButtonNavbar() {
  const { t } = useTranslation("Pages_LandingPage");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // to now what is count notification
  // const [count, setCount] = useState(5);

  // Start dropdown menu items for notification
  // const menuItems = (
  //   <Menu>
  //     {/* هنا يمكنك إضافة العناصر الخاصة بالقائمة */}
  //     <Menu.Item key="1">Notification 1</Menu.Item>
  //     <Menu.Item key="2">Notification 2</Menu.Item>
  //   </Menu>
  // );

  return (
    <div className="flex items-center justify-center gap-10">
      {/* <ButtonNavbarLogin /> */}

      <Link
        href="/coming-soon"
        className="rounded h-10 flex justify-center items-center gap-2 px-2 sm:px-3 py-[6px] bg-red-500 transition-all duration-300 ease-in-out  hover:bg-transparent hover:text-red-500 text-bg text-md border-2 border-red-500"
      >
        <TbSocial />
        <span className="sm:hidden ">{t("Navbar.social.title")}</span>
        {/* <TbSocial /> */}
      </Link>

      {/* Start this dropdown for notification */}
      {/* <span onClick={handleClick}>
        <Dropdown
          rootClassName="navnot"
          overlay={menuItems} // Pass the menu items here
          placement="bottom"
        >
          <Badge
            showZero
            classNames={{
              indicator: "!text-[14px] rtl:!left-2 !rounded-full !px-1",
            }}
            className="cursor-pointer !text-[11px]"
            size="default"
            count={count}
          >
            <FaBell />
          </Badge>
        </Dropdown>
      </span> */}
      {/* End this dropdown for notification */}
    </div>
  );
}
