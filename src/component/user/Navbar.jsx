import React, { useEffect, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import AdminNavigator from "../../navigator/AdminNavigator";
import AuthorNavigator from "../../navigator/AuthorNavigator";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
// import AppSearchForm from "../form/AppSearchForm";
import "./Navbar.css";
import "../../antdesign/style.css";
import Container from "../../containers/Container";

const menu = (
  <Menu
    className="login_dropdown"
    items={[
      {
        key: "1",
        label: "Don't have an Account?",
        disabled: true,
      },
      {
        key: "2",
        label: (
          <Link to="/auth/signup" className="font-semibold font-serif">
            Sign Up
          </Link>
        ),
      },
      {
        key: "3",
        label: "Already have an Account?",
        disabled: true,
      },
      {
        key: "4",
        label: (
          <Link to="/auth/signin" className="font-semibold font-serif">
            Sign In
          </Link>
        ),
      },
    ]}
  />
);

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  // console.log(authInfo);

  const [show, handleShow] = useState(false);

  // const navigate = useNavigate();

  // const handleSearchSubmit = (query) => {
  //   navigate("/movie/search?title=" + query);
  // };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  const roleBasedLink = () => {
    //   const isAdmin = authInfo.profile?.role === "Admin";
    //   // const isAuthor = authInfo.profile?.role === "author";

    //   if (isAdmin) {
    //     return <AdminNavigator />;
    //   } else return <AuthorNavigator />;
    // };
    if (authInfo.profile?.role === "Admin") {
      return "/admin";
    } else if (authInfo.profile?.role === "Author") {
      return "/author";
    } else if (authInfo.profile?.role === "Subscriber") {
      return "/subscriber";
    } else {
      return "/";
    }
  };

  return (
    // className='bg-secondary shadow-sm shadow-gray-500'
    <div className="mb-12">
      <div className={`navs ${show && "nav__black"}`}>
        <Container className="p-2">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img
                src=""
                alt="TkSarl logo"
                className="sm:h-10 h-8"
                title="Go to Home"
              />
            </Link>

            <ul className="flex items-center sm:space-x-4 space-x-2">
              <Link to="/shop">
                <Button>Shop</Button>
              </Link>
              <li>
                {isLoggedIn ? (
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="text-blue-500 font-semibold text-lg dark:text-blue-400"
                  >
                    LogOut
                  </Link>
                ) : (
                  <Dropdown overlay={menu}>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="flex flex-row items-center w-full mt-2 text-base font-bold text-center uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat text-highlight dark:text-highlight-dark"
                    >
                      <Space className="text-blue-500 dark:text-blue-400 font-semibold text-lg user_dropdown">
                        <span className="flex items-end justify-end  hover:font-semibold">
                          {authInfo?.profile?.name || "Join Us"}
                        </span>
                      </Space>
                    </button>
                  </Dropdown>
                )}
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="dark:bg-blue-500 bg-dark-subtle p-1 rounded sm:text-2xl text-lg theme_changer"
                >
                  <BsFillSunFill className="text-secondary" size={15} />
                </button>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}
