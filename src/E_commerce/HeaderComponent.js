import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  // Badge,
  Form,
  DropdownButton,
  // Dropdown,
  Button,
  InputGroup,
} from "react-bootstrap";

import { Link } from "react-router-dom";
// import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, Badge, Space } from "antd";
// import { CaretDownOutlined, SmileOutlined } from "@ant-design/icons";
import { GiShoppingCart } from "react-icons/gi";
import { useEffect } from "react";
import { getCategories } from "./redux/actions/categoryActions";
import MetaComponent from "../component/MetaComponent";



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

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
    <MetaComponent/>
    <Navbar
      collapseOnSelect
      expand="lg"
      // bg="dark"
      variant="dark"
      className="drop-shadow-xl bg-blue-500"
    >
      <Container>
        <Link to="/">
          <Navbar.Brand href="/">TKF</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              {/* <DropdownButton
                id="dropdown-basic-button"
                title="All"
                className="all_dropdown_e"
              >
                <Dropdown.Item>Electronics</Dropdown.Item>
                <Dropdown.Item>Cars</Dropdown.Item>
                <Dropdown.Item>Books</Dropdown.Item>
              </DropdownButton> */}

              <Dropdown overlay={category} trigger={["click"]}>
                <div onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Button type="primary" className="all_dropdown_e">
                      All
                      {/* <CaretDownOutlined /> */}
                    </Button>
                  </Space>
                </div>
              </Dropdown>
              <Form.Control type="text" placeholder="Search in shop ..." />
              <Button variant="warning" className="search_e">
                <i className="bi bi-search text-dark"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            {userInfo?.role === "Admin" ? (
              <Link to="/admin/orders">
                <Nav.Link>
                  Administrator
                  <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                </Nav.Link>
              </Link>
            ) : userInfo?.username && !userInfo?.role === "Admin" ? (
              <NavDropdown
                title={`${userInfo?.first_name} ${userInfo?.last_name}`}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item
                  eventKey="/user/my-orders"
                  as={Link}
                  to="/user/my-orders"
                >
                  My orders
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                  My profile
                </NavDropdown.Item>
                {/* <NavDropdown.Item onClick={() => dispatch(logout())}>
                  Logout
                </NavDropdown.Item> */}
              </NavDropdown>
            ) : (
              <>
                {/* <Link to="/login">
                  <Nav.Link>Login</Nav.Link>
                </Link>
                <Link to="/register">
                  <Nav.Link>Register</Nav.Link>
                </Link> */}
              </>
            )}

            <Link to="/cart">
              <Nav.Link>
                <div className="flex">
                  <Badge
                    bg="danger"
                    count={itemsCount === 0 ? "" : itemsCount}
                    showZero={false}
                    size="small"
                    className="mb-3"
                  ></Badge>
                  <Link to="/cart">
                  <GiShoppingCart className="text-2xl text-white"/>
                  </Link>
                  {/* <span className="ms-1">CART</span> */}
                </div>
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default HeaderComponent;
