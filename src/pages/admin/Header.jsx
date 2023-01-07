import { Button, Drawer, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import { SiMessenger } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
// import AppSearchForm from "../form/AppSearchForm";

export default function Header() {
  const { toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [placement] = useState("right");
  const { authInfo, handleLogout } = useAuth();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;

    navigate("/search?title=" + query);
  };

  return (
    <div className="flex items-center justify-between relative p-5">
      {/* <AppSearchForm
        onSubmit={handleSearchSubmit}
        placeholder="Search Movies..."
      /> */}
      <Button className="dark:bg-white text-blue-500 hover:bg-blue-300">
        <Link to="/posts">View Posts</Link>
      </Button>
      <Button className="dark:bg-white text-blue-500 hover:bg-blue-300">
        <Link to="/shop">Shop</Link>
      </Button>
      <div>
        <Link to="/tksarl_signIn">
          <SiMessenger className="text-4xl text-blue-500 dark:text-blue-300" />
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="dark:text-white text-light-subtle"
        >
          <BsFillSunFill size={24} />
        </button>

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
        >
          <span className="text-green-500">Hi👋 {authInfo.profile.username}</span>
        </div>

        <Space>
          <Button type="primary" onClick={showDrawer}>
            Logout
          </Button>
        </Space>
      </div>
      <Drawer
        title="Click here to Logout"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Link
              to="/"
              onClick={handleLogout}
              className="flex items-center dark:text-dark-subtle  text-sm hover:dark:text-white hover:blue-500 transition space-x-1 ml-20 mt-4"
            >
              <FiLogOut />
              <Button>Log Out</Button>
            </Link>
          </Space>
        }
      >
        <p>See you soon...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}


