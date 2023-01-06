import { Button } from "antd";
import React, {useEffect, useRef, useState} from "react";
import { Alert, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import CartItemComponent from "../../../CartItemComponent";
import {useParams} from "react-router-dom"



const UserOrderDetailsPageComponent = ({userInfo, getUser, getOrder, loadPayPalScript}) => {
const [userAddress, setUserAddress] = useState({})
const [paymentMethod, setPaymentMethod] = useState("")
const [isPaid, setIsPaid] = useState(false)
const [orderButtonMessage, setOrderButtonMessage] = useState("")
const [cartItems, setCartItems] = useState([])
const [cartSubtotal, setCartSubtotal] = useState(0)
const [isDelivered, setIsDelivered] = useState(false)
const [buttonDisabled, setButtonDisabled] = useState(false)


const paypalContainer = useRef()


const {id} = useParams()


useEffect(() => {
    getUser()
    .then(data => {
        setUserAddress({  town: data.town,
          state: data.state,
          country: data.country,
          lga: data.lga,
          nationality: data.nationality,
          phone: data.phone,})
    }).catch((err) => console.log(err))
}, [getUser])

useEffect(() => {
  getOrder(id)
    .then((data) => {
      setPaymentMethod(data.paymentMethod);
      setCartItems(data.cartItems);
      setCartSubtotal(data.orderTotal.cartSubtotal);
      data.isDelivered
        ? setIsDelivered(data.deliveredAt)
        : setIsDelivered(false);
      data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
      if (data.isPaid) {
        setOrderButtonMessage("Your order is finished");
        setButtonDisabled(true);
      } else {
        if (data.paymentMethod === "pp") {
          setOrderButtonMessage("Pay for your order");
        } else if (data.paymentMethod === "cod") {
          setButtonDisabled(true);
          setOrderButtonMessage("Wait for your order. You pay on delivery");
        }
      }
    })
    .catch((err) => console.log(err));
}, []);

const orderHandler = () => {
  setButtonDisabled(true);
  if (paymentMethod === "pp") {
    setOrderButtonMessage(
      "To pay for your order click one of the buttons below"
    );
    if (!isPaid) {
      loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder)
    }
  } else {
    setOrderButtonMessage("Your order was placed. Thank you");
  }
};

const updateStateAfterOrder = (paidAt) => {
    setOrderButtonMessage("Thank you for your payment!");
    setIsPaid(paidAt);
    setButtonDisabled(true);
    paypalContainer.current.style = "display: none";
}


  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.first_name} {userInfo.last_name} <br/>
              <b>Address</b>: {userAddress.lga} <br /> {userAddress.town}{" "}
              {userAddress.state} <br /> {userAddress.country}{" "}
              {userAddress.nationality} <br />
              <b>Phone</b>: {userAddress.phone}
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery (Delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant={isDelivered ? "success" : "danger"}>
                  {isDelivered ? <>Delivered at {isDelivered}</> : <>Not delivered</>}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Paid on {isPaid}</> : <>Not paid yet</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent item={item} key={idx} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items Price (after tax): <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
            <div className="d-grid gap-2">
                <Button
                  size="lg"
                  onClick={orderHandler}
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                >
                  {orderButtonMessage}
                </Button>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div ref={paypalContainer} id="paypal-container-element"></div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default UserOrderDetailsPageComponent;