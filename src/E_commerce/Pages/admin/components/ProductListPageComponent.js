import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { ListGroup, Col, Row } from "react-bootstrap";
import AttributesFilterComponent from "../../../FilterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../../../FilterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../../../FilterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../../FilterQueryResultOptions/RatingFilterComponent";
import HeaderComponent from "../../../HeaderComponent";
import PaginationComponent from "../../../PaginationComponent";
import ProductForListComponent from "../../../ProductForListComponent";
import SortOptionsComponent from "../../../SortOptionsComponent";

const ProductListPageComponent = ({ getProducts }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((products) => setProducts(products.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto">
      <HeaderComponent />
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              FILTER: <br />
              <PriceFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <CategoryFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <AttributesFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="primary">Filter</Button>{" "}
              <Button type="danger">Reset Filters</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {products.map((product) => (
            <ProductForListComponent
              key={product._id}
              images={product.images}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              reviewsNumber={product.reviewsNumber}
              productId={product._id}
            />
          ))}
          <PaginationComponent />
        </Col>
      </Row>
    </div>
  );
};

export default ProductListPageComponent;
