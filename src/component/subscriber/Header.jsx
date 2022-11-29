import { Button } from "antd";
import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { SiMessenger } from "react-icons/si";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks";

export default function Header() {
  const { toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between relative p-5">
      <Button className="dark:bg-white text-blue-500 hover:bg-blue-300">
        <Link to="/posts">View Posts</Link>
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
      </div>
    </div>
  );
}
