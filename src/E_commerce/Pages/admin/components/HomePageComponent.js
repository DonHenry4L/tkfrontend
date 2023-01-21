import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import MetaComponent from "../../../../component/MetaComponent";
import HeaderComponent from "../../../../E_commerce/HeaderComponent";
import CategoryCardComponent from "../../../CategoryCardComponent";
import FooterComponent from "../../../FooterComponent";
import ProductCarouselComponent from "../../../ProductCarouselComponent";

const HomePageComponent = ({ categories, getBestSellers }) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    getBestSellers()
      .then((data) => {
        setBestSellers(data);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories, getBestSellers]);

  return (
    <>
      <MetaComponent />
      <HeaderComponent />;
      <ProductCarouselComponent bestSellers={bestSellers} />
      <Row gutter={16}>
        {mainCategories.map((category, index) => (
          <Col key={index}>
            <CategoryCardComponent category={category} index={index} />
          </Col>
        ))}
      </Row>
      <FooterComponent />
    </>
  );
};

export default HomePageComponent;
