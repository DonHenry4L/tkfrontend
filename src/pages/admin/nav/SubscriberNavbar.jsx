import { useWindowWidth } from "@react-hook/window-size";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FaList } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { BsFilePost } from "react-icons/bs";
import { MdPermMedia, MdOutlineDashboardCustomize } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";

import "../css/styles.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
// import "react-pro-sidebar/dist/css/styles.css";

export default function AdminNavbar({ rtl, toggled }) {
  const { collapseSidebar } = useProSidebar();

  const { handleLogout, authInfo } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");

  const handleToggleSidebar = () => {
    collapsed ? setCollapsed(false) : setCollapsed(true);
  };

  // hooks
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [window.location.pathname]);

  const activeName = (name) => `${current === name && "active"}`;

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        image={false}
        rtl={rtl}
        collapsed={collapsed}
        children={React.ReactNode}
        toggled={toggled}
        breakPoint="xm"
        onToggle={() => setCollapsed(!collapsed)}
        className="xm:w-6 md:w-20 sm:w-10"
      >
        <div className="flex">
          <Link to="/" className="flex">
            <img
              src={authInfo.profile.picture}
              alt="profile pic"
              className="h-14 m-4 rounded-full"
            />
          </Link>
          <p className="mt-10 text-xl text-blue-900">
            {authInfo.profile.username}
          </p>
        </div>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        ></div>
        {/* <SidebarContent> */}
        <Menu>
          <MenuItem
            className={activeName("/")}
            icon={<MdOutlineDashboardCustomize />}
            routerLink={<Link to="/" />}
          >
            {" "}
            DashBoard
          </MenuItem>
        </Menu>

        {/* Posts */}
        <Menu>
          <SubMenu
            suffix={
              <div className="bg-red-600 rounded-full w-5 h-5 text-center">
                <span className="badge yellow font-semibold">3</span>
              </div>
            }
            label="Posts"
            icon={<BsFilePost />}
          >
            <MenuItem
              className={activeName("/subscriber/posts")}
              routerLink={<Link to="/subscriber/posts" />}
            >
              {" "}
              All Posts
            </MenuItem>

            <MenuItem
              className={activeName("/subscriber/posts/new")}
              routerLink={<Link to="/subscriber/posts/new" />}
            >
              {" "}
              Create Post
            </MenuItem>
          </SubMenu>
        </Menu>

        <Menu>
          <SubMenu
            suffix={
              <div className="bg-red-600 rounded-full w-5 h-5 text-center">
                <span className="badge yellow font-semibold">4</span>
              </div>
            }
            label="Users"
            icon={<ImUsers />}
          >
            {/* Profile */}
            <MenuItem
              routerLink={<Link to={`user/profile`} />}
              className={activeName(`user/profile`)}
            >
              Profile
            </MenuItem>
            {/* <MenuItem
              routerLink={<Link to={`/subscriber/${authInfo?.user?._id}`} />}
              className={activeName(`/subscriber/${authInfo?.user?._id}`)}
            >
              Profile
            </MenuItem> */}
          </SubMenu>
        </Menu>
        <p className="m-4 text-yellow-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-contain text-center flex justify-center">
          SHOP
        </p>
        <Menu>
          <SubMenu
            suffix={
              <div className="bg-red-600 rounded-full w-5 h-5 text-center">
                <span className="badge yellow font-semibold">4</span>
              </div>
            }
            label="My Products"
            icon={<ImUsers />}
          >
            <MenuItem
              routerLink={<Link to={`/user/my-orders`} />}
              className={activeName(`/user/my-orders`)}
            >
              My Order(s)
            </MenuItem>
            {/* <MenuItem
              routerLink={<Link to={`/user/order-details/:id`} />}
              className={activeName(`/user/order-details/:id`)}
            >
              Order Details
            </MenuItem> */}
            <MenuItem
              routerLink={<Link to={`/user/cart-details`} />}
              className={activeName(`/user/cart-details`)}
            >
              Cart Details
            </MenuItem>
          </SubMenu>
        </Menu>

        {/* Toggler */}
        <main
          className="close__menu absolute right-0 z-10 h-5 rounded-full font-bold text-3xl top-14 cursor-pointer"
          onClick={handleToggleSidebar}
        >
          {collapsed ? <AiOutlineRight /> : <AiOutlineLeft />}
        </main>

        <div
          className="sidebar-btn-wrapper flex-col items-start pb-5 w-[270px]"
          style={{
            padding: "20px 24px",
          }}
        >
          <span className="font-semibold dark:text-white text-black text-xl">
            Subscriber
          </span>
          <Link
            to="/"
            onClick={handleLogout}
            className="flex items-center dark:text-dark-subtle  text-sm hover:dark:text-white hover:blue-500 transition space-x-1 ml-20 mt-4"
          >
            <FiLogOut />
            <span>Log Out</span>
          </Link>
        </div>
        {/* </SidebarFooter> */}
      </Sidebar>
    </div>
  );
}

// const classess = () => {
//   const commonClasses =
//     "flex items-center text-lg space-x-2 p-2 hover:opacity-80";
//   return (
//     <div
//       className={({ isActive }) =>
//         (isActive ? "text-white" : "text-gray-400") + commonClasses
//       }
//     ></div>
//   );
// };
