import { useWindowWidth } from "@react-hook/window-size";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { BsFilePost, BsCart4, BsFillChatSquareTextFill } from "react-icons/bs";
import {
  MdPermMedia,
  MdOutlineDashboardCustomize,
  MdOutlineCategory,
} from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { Link } from "react-router-dom";

import "../css/styles.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import { SiGoogleanalytics } from "react-icons/si";

export default function AdminNavbar({ rtl, toggled }) {
  const { collapseSidebar } = useProSidebar();

  const { handleLogout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");

  const { authInfo } = useAuth();

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
        <div className="flex sm:flex-wrap sm:text-4">
          <Link to="/" className="flex">
            <img
              src={authInfo.profile.picture}
              alt="logo"
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
            className={activeName("/admin")}
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
                <span className="badge yellow font-semibold">2</span>
              </div>
            }
            label="Posts"
            icon={<BsFilePost />}
          >
            <MenuItem
              className={activeName("/admin/posts")}
              routerLink={<Link to="/admin/posts" />}
            >
              {" "}
              All Posts
            </MenuItem>
            <MenuItem
              className={activeName("/admin/new")}
              routerLink={<Link to="/admin/posts/new" />}
            >
              Add New
            </MenuItem>
            <MenuItem
              className={activeName("/admin/posts/categories")}
              routerLink={<Link to="/admin/posts/categories" />}
            >
              Categories
            </MenuItem>
          </SubMenu>
        </Menu>

        {/* Comments */}
        <Menu>
          <MenuItem
            icon={<GoCommentDiscussion />}
            className={activeName("/admin/comments")}
            routerLink={<Link to="/admin/comments" />}
          >
            Comments
          </MenuItem>
        </Menu>
        <Menu>
          {/* Media */}
          <SubMenu
            suffix={
              <div className="bg-red-600 rounded-full w-5 h-5 text-center">
                <span className="badge yellow font-semibold">2</span>
              </div>
            }
            label="Media"
            icon={<MdPermMedia />}
          >
            <MenuItem
              className={activeName("/admin/media/library")}
              routerLink={<Link to="/admin/media/library" />}
            >
              Library
            </MenuItem>
            <MenuItem
              className={activeName("/admin/media/new")}
              routerLink={<Link to="/admin/media/new" />}
            >
              Add New
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
            <MenuItem
              className={activeName("/admin/users")}
              routerLink={<Link to="/admin/users" />}
            >
              All Users
            </MenuItem>
            <MenuItem
              className={activeName("/admin/users/new")}
              routerLink={<Link to="/admin/users/new" />}
            >
              Add New
            </MenuItem>

            {/* Profile */}
            <MenuItem
              routerLink={<Link to={`/admin/${authInfo?.user?._id}`} />}
              className={activeName(`/admin/${authInfo?.user?._id}`)}
            >
              Profile
            </MenuItem>

            {/* customize */}
            <MenuItem
              className={activeName("/admin/customize")}
              routerLink={<Link to="/admin/customize" />}
            >
              Customize
            </MenuItem>
          </SubMenu>
        </Menu>
        <p className="m-4 text-yellow-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-contain text-center flex justify-center">
          E COMMERCE
        </p>
        <Menu>
          {/* E_COMMERCE ADMIN NAVBAR */}
          <SubMenu label="Users" icon={<ImUsers />}>
            <MenuItem
              className={activeName("/admin/users")}
              routerLink={<Link to="/admin/users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              className={activeName("/admin/edit-user")}
              routerLink={<Link to="/admin/edit-user" />}
            >
              Edit Users
            </MenuItem>
          </SubMenu>
        </Menu>
        <Menu>
          {/* Categories */}
          <SubMenu label="Categories" icon={<MdOutlineCategory />}>
            <MenuItem
              className={activeName("/admin/create-category")}
              routerLink={<Link to="/admin/create-category" />}
            >
              Create Category
            </MenuItem>
          </SubMenu>
        </Menu>
        {/* Products */}
        <Menu>
          <SubMenu label="Products" icon={<BsCart4 />}>
            <MenuItem
              className={activeName("/admin/products")}
              routerLink={<Link to="/admin/products" />}
            >
              Products
            </MenuItem>
            <MenuItem
              className={activeName("/admin/create-new-product")}
              routerLink={<Link to="/admin/create-new-product" />}
            >
              Create Product
            </MenuItem>

            <MenuItem
              className={activeName("/admin/edit-product")}
              routerLink={<Link to="/admin/edit-product" />}
            >
              Edit Product
            </MenuItem>
            <MenuItem
              className={activeName("/admin/orders-details")}
              routerLink={<Link to="/admin/orders-details" />}
            >
              Orders
            </MenuItem>
          </SubMenu>
        </Menu>
        <Menu>
          <MenuItem
            className={activeName("/admin/chats")}
            routerLink={<Link to="/admin/chats" />}
            icon={<BsFillChatSquareTextFill />}
          >
            Chats
          </MenuItem>
          <MenuItem
            className={activeName("/admin/analytics")}
            routerLink={<Link to="/admin/analytics" />}
            icon={<SiGoogleanalytics />}
          >
            Analytics
          </MenuItem>
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
            Admin
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
