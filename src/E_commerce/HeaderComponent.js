import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  // Badge,
  Form,
  Dropdown,
  DropdownButton,
  InputGroup,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Badge, Menu, Space, Input, Select } from "antd";
import { GiShoppingCart } from "react-icons/gi";
import { useEffect, useState } from "react";
import { getCategories } from "./redux/actions/categoryActions";
import MetaComponent from "../component/MetaComponent";
import { useAuth, useTheme } from "../hooks";
import socketIOClient from "socket.io-client";
import {
  setChatRooms,
  setSocket,
  setMessageReceived,
  removeChatRoom,
} from "./redux/actions/chatActions";

const { Option } = Select;

const category = (
  <Menu
    items={[
      {
        key: "1",
        label: <Link>Electronics</Link>,
      },
      {
        key: "2",
        label: <Link>Cars</Link>,
        // icon: <SmileOutlined />,
      },
      {
        key: "3",
        label: <Link>Books</Link>,
      },
    ]}
  />
);

const { Search } = Input;

const menu = (
  <Menu
    className="login_dropdown"
    items={[
      {
        key: "/user/my-orders",
        label: (
          <Link to="/user/my-orders" className="font-semibold font-serif">
            My Orders
          </Link>
        ),
      },
      {
        key: "/user",
        label: (
          <Link to="/user" className="font-semibold font-serif">
            My profile
          </Link>
        ),
      },
    ]}
  />
);

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const { categories } = useSelector((state) => state.getCategories);
  const { messageReceived } = useSelector((state) => state.adminChat);

  const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list/search/${searchQuery}`);
      } else {
        navigate(
          `/product-list/category/${searchCategoryToggle.replaceAll(
            "/",
            ","
          )}/search/${searchQuery}`
        );
      }
    } else if (searchCategoryToggle !== "All") {
      navigate(
        `/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`
      );
    } else {
      navigate("/product-list");
    }
  };
  useEffect(() => {
    if (authInfo.profile?.isAdmin) {
      var audio = new Audio("/audio/chat-msg.mp3");
      const socket = socketIOClient();
      socket.emit(
        "admin connected with server",
        "Admin" + Math.floor(Math.random() * 1000000000000)
      );
      socket.on(
        "server sends message from client to admin",
        ({ user, message }) => {
          dispatch(setSocket(socket));
          //   let chatRooms = {
          //     fddf54gfgfSocketID: [{ "client": "dsfdf" }, { "client": "dsfdf" }, { "admin": "dsfdf" }],
          //   };
          dispatch(setChatRooms(user, message));
          dispatch(setMessageReceived(true));
          audio.play();
        }
      );
      socket.on("disconnected", ({ reason, socketId }) => {
        //   console.log(socketId, reason)
        dispatch(removeChatRoom(socketId));
      });
      return () => socket.disconnect();
    }
  }, [authInfo.profile?.isAdmin]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        // bg="blue"
        className="drop-shadow-2xl bg-blue-500"
      >
        <Container>
          <Link to="/shop">
            <Navbar.Brand href="/shop">Tksarl</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Input.Group compact className="header_input__group">
                <Select
                  // id="dropdown-basic-button"
                  defaultValue={searchCategoryToggle}
                  style={{
                    width: "50%",
                  }}
                >
                  <Option
                    value="All"
                    onClick={() => setSearchCategoryToggle("All")}
                  >
                    All
                  </Option>
                  {categories.map((category, id) => (
                    <Option
                      key={id}
                      value={category.name}
                      onClick={() => setSearchCategoryToggle(category.name)}
                      className="dropdown_all_categories"
                    >
                      {category.name}
                    </Option>
                  ))}
                </Select>
                <Input
                  blur
                  allowClear
                  className=""
                  type="text"
                  placeholder="Search in shop ..."
                  onKeyUp={submitHandler}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="warning"
                  className="search_e"
                  onClick={submitHandler}
                >
                  <i className="bi bi-search text-dark "></i>
                </Button>
              </Input.Group>
            </Nav>
            <Nav>
              {isLoggedIn && authInfo.profile?.role === "Admin" ? (
                (
                  <Link to="/admin/orders" className=" text-blue-900">
                    Admin
                    {messageReceived && (
                      <span className="absolute bottom-[53px] flex items-start p-2 bg-red-700 border-2 border-slate-200 rounded-full -translate-y-2.5 -translate-x-3"></span>
                    )}
                  </Link>
                ) || (
                  <Link to={handleLogout} className=" text-blue-900">
                    Logout
                  </Link>
                )
              ) : isLoggedIn && authInfo.profile?.role === "Subscriber" ? (
                <NavDropdown
                  title={`${authInfo.profile?.first_name} ${authInfo.profile?.last_name}`}
                  id="collasible-nav-dropdown nav__dropdown"
                >
                  <NavDropdown.Item
                    eventKey="/user/my-orders"
                    as={Link}
                    to="/user/my-orders"
                  >
                    My orders
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="/user/profile"
                    as={Link}
                    to="/user/profile"
                  >
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="text-blue-500 font-semibold text-lg dark:text-blue-400"
                    >
                      LogOut
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <span>You're not Logged in</span>
              )}
              <Link to="/cart">
                <div className="flex">
                  <Badge
                    className="danger absolute p-2 -translate-y-2.5 translate-x-3"
                    count={itemsCount === 0 ? "" : itemsCount}
                    size="small"
                  ></Badge>
                  {/* <i className="bi bi-cart-dash"></i> */}
                  <GiShoppingCart className=" text-2xl right-10 text-black" />
                  {/* <span className="absolute top-0 flex items-start p-2 bg-red-700 border-2 border-slate-200 rounded-full -translate-y-2.5 -translate-x-3"></span> */}
                </div>
                {/* <span className="ms-1">CART</span> */}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
