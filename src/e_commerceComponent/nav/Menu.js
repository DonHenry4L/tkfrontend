import React, { useState } from "react";
import {
  AppstoreOutlined,
  CaretDownOutlined,
  MailOutlined,
  SettingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { GiShoppingCart } from "react-icons/gi";
import { Button, Dropdown, Form, Input, Space, Menu, Badge } from "antd";

import { Link } from "react-router-dom";
const { Search } = Input;
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
        icon: <SmileOutlined />,
      },
      {
        key: "3",
        label: <Link>Books</Link>,
      },
    ]}
  />
);
const items = [
  {
    label: <Link to="/shop">HOME</Link>,
    key: "home",
  },
  {
    label: (
      <div className="flex absolute">
        <Dropdown overlay={category} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Button type="primary">
                All
                <CaretDownOutlined />
              </Button>
            </Space>
          </a>
        </Dropdown>
      </div>
    ),
  },
  {
    label: (
      <div>
        <Search placeholder="Search in Shop..." enterButton className="mt-2" />
      </div>
    ),
    key: "all",
  },
  {
    label: (
      <Badge dot>
        <Link to="/admin/orders" className="text-white">
          Admin
        </Link>
      </Badge>
    ),
  },
  {
    label: (
      <div className="mt-2">
        <Badge count={2} showZero={false} size="small">
          <Link className="mt-2">
            <GiShoppingCart className="text-2xl" />
          </Link>
        </Badge>
      </div>
    ),
    key: "cart",
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: "alipay",
  },
];
const HeaderComponent = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className="flex justify-between drop-shadow-xl"
    />
  );
};
export default HeaderComponent;
