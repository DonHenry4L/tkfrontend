import React from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const CategoryCardComponent = ({ category, index }) => {
  return (
    <div className="ml-10 mb-10 mt-5 product_cards">
      <Card
        hoverable
        style={{
          width: 300,
          marginBottom: 80,
        }}
        cover={<img alt="product images" src={category.image ?? null} />}
        actions={[
          <Link to={`/product-list/category/${category.name}`}>
            <Button>Go To Category</Button>
          </Link>,
        ]}
      >
        <Meta
          crossOrigin="anonymous"
          title={category.name}
          description={category.description}
        />
      </Card>
    </div>
  );
};

export default CategoryCardComponent;
