import React from "react";
import { Avatar, Button, Card } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const CategoryCardComponent = ({ category, index }) => {
  const images = [
    "/pic/banner.jpg",
    "/pic/pic__2.jpg",
    "/pic/pic__7.jpg",
    "/pic/pic__8.jpg",
    "/pic/pic__10.jpg",
    "/pic/pic__11.jpg",
    "/pic/pic__12.jpg",
    "/pic/pic__16.jpg",
  ];
  return (
    <div className="ml-10 mb-10 mt-5">
      <Card
        hoverable
        style={{
          width: 300,
          marginBottom: 80,
        }}
        cover={<img alt="product images" src={images[index]} />}
        actions={[
          <Link to="/product-list">
            <Button>View Product</Button>
          </Link>,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          crossOrigin="anonymous"
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={category}
          description="This is the description"
        />
      </Card>
    </div>
  );
};

export default CategoryCardComponent;
