import { Button } from "antd";
import React from "react";
import { TbTrashX } from "react-icons/tb";

const RemoveFromCartComponent = ({
  productID,
  orderCreated,
  quantity,
  price,
  removeFromCartHandler = false,
}) => {
  return (
    <Button
      disabled={orderCreated}
      type="primary"
      onClick={
        removeFromCartHandler
          ? () => removeFromCartHandler(productID, quantity, price)
          : undefined
      }
    >
      <TbTrashX />
    </Button>
  );
};

export default RemoveFromCartComponent;
