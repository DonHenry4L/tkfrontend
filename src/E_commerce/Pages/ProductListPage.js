import { Button } from "antd";
import React from "react";
import { ListGroup, Col, Row } from "react-bootstrap";
import AttributesFilterComponent from "../FilterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../FilterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../FilterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../FilterQueryResultOptions/RatingFilterComponent";
import PaginationComponent from "../PaginationComponent";
import ProductForListComponent from "../ProductForListComponent";
import SortOptionsComponent from "../SortOptionsComponent";
import "../../css/bootstrap/bootstrap.min.css";

const ProductListPage = () => {
  return (
    <div className="container mx-auto">
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
              <Button type="primary">Filter</Button>
              <Button type="danger">Reset Filters</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <ProductForListComponent
              key={idx}
              images={["games", "monitors", "tablets", "games", "monitors"]}
              idx={idx}
            />
          ))}
          <PaginationComponent />
        </Col>
      </Row>
    </div>
  );
};

export default ProductListPage;
