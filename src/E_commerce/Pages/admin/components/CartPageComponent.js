import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Row, Col, Container, Alert, ListGroup } from "react-bootstrap";
import CartItemComponent from "../../../CartItemComponent";
import HeaderComponent from "../../../HeaderComponent";

const CartPageComponent = ({
  addToCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
  removeFromCart,
}) => {
  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  return (
    <div>
      <HeaderComponent />
      <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Alert variant="info">Your cart is empty</Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent
                  item={item}
                  key={idx}
                  changeCount={changeCount}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Subtotal ({cartItems.length} {cartItems.length === 1 ? "Product" : "Products"})</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/user/cart-details">
                <Button disabled={cartSubtotal === 0} type="button">Proceed To Checkout</Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>

    </div>
  );
};

export default CartPageComponent;
