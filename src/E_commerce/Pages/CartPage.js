import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Row, Col, Container, Alert, ListGroup } from "react-bootstrap";

const CartPage = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {Array.from({ length: 3 }).map((item) => (
            <>
              CartItemComponent <br />
            </>
          ))}
          <Alert variant="info">Your Cart Is Empty!</Alert>
        </Col>
        <Col md={4}>
          <ListGroup.Item>
            <h3>Subtotal (2 items)</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            PriceL <span className="fw-bold">$892</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/user/order-details">
              <Button type="primary">Proceed To Checkout</Button>
            </Link>
          </ListGroup.Item>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
