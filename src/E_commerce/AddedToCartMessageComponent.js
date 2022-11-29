import { Alert } from "react-bootstrap";
import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AddedToCartMessageComponent() {
  const [show, setShow] = useState(true);

  return (
    <Alert
      show={show}
      variant="success"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>The product was added to your cart!</Alert.Heading>
      <p>
        <Button type="primary">Go Back</Button>{" "}
        <Link to="/cart">
          <Button type="danger">Go to Cart</Button>
        </Link>
      </p>
    </Alert>
  );
}
