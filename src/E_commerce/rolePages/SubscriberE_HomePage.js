import { Col, Row } from "antd";
import React from "react";
import CategoryCardComponent from "../CategoryCardComponent";
import ProductCarouselComponent from "../ProductCarouselComponent";
import SubscriberE_HeaderComponent from "./SubscriberE_Header";

const SubscriberE_HomePage = () => {
  const categories = [
    "Tablets",
    "Monitors",
    "Games",
    "Printers",
    "Software",
    "Cameras",
    "Books",
    "Videos",
  ];
  return (
    <>
      <SubscriberE_HeaderComponent />;
      <ProductCarouselComponent />
      <Row gutter={16}>
        {categories.map((category, index) => (
          <Col key={index}>
            <CategoryCardComponent category={category} index={index} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SubscriberE_HomePage;
