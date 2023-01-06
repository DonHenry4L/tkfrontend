import { Button,Drawer, Space  } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsChatFill, BsFillSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth,useTheme } from "../../hooks";
import { WechatOutlined } from "@ant-design/icons";
import { FaRocketchat } from "react-icons/fa";
import { SiMessenger } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
// import AppSearchForm from "../form/AppSearchForm";

export default function Header({
  onAddMovieClick,
  onAddActorClick,
  onAddCategoryClick,
  onAddPostClick,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();
   const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const { authInfo, handleLogout } = useAuth();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

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

        <button
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>

        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          options={options}
        />

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

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = "option-container";

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;

      if (parentElement.id === containerID || id === containerID) return;

      container.current.classList.remove("animate-scale");
      // container.current.classList.add("animate-scale-reverse");
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  const handleAnimationEnd = (e) => {
    if (e.target.classList.contains("animate-scale-reverse")) onClose();
    e.target.classList.remove("animate-scale");
  };

  const handleClick = (fn) => {
    fn();
    onClose();
  };

  if (!visible) return null;
  return (
    <div
      id={containerID}
      ref={container}
      className="absolute right-0 top-12 z-50 flex flex-col space-y-3 p-5  dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={handleAnimationEnd}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option key={title} onClick={() => handleClick(onClick)}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};
