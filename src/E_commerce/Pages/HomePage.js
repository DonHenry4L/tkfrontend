import { Col, Row } from "antd";
import React from "react";
import HeaderComponent from "../../E_commerce/HeaderComponent";
import CategoryCardComponent from "../CategoryCardComponent";
import FooterComponent from "../FooterComponent";
import ProductCarouselComponent from "../ProductCarouselComponent";


const HomePage = () => {
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
      <HeaderComponent />;
      <ProductCarouselComponent />
      <Row gutter={16}>
        {categories.map((category, index) => (
          <Col key={index}>
            <CategoryCardComponent category={category} index={index} />
          </Col>
        ))}
      </Row>
      <FooterComponent />
    </>
  );
};

export default HomePage;
