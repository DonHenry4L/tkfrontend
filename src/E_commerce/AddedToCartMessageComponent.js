import { Alert } from "react-bootstrap";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddedToCartMessageComponent({
  showCartMessage,
  setShowCartMessage,
}) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Alert
      show={showCartMessage}
      variant="success"
      onClose={() => setShowCartMessage(false)}
      dismissible
    >
      <Alert.Heading>The product was added to your cart!</Alert.Heading>
      <p>
        <Button type="primary" onClick={goBack}>
          Go Back
        </Button>{" "}
        <Link to="/cart">
          <Button type="danger">Go to Cart</Button>
        </Link>
      </p>
    </Alert>
  );
}
