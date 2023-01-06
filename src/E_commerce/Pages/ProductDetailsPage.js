import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { addToCart } from "../redux/actions/cartActions";
import ProductDetailsPageComponent from "./admin/components/ProductDetailsPageComponent";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  return (
    <ProductDetailsPageComponent
      addToCartReduxAction={addToCart}
      reduxDispatch={dispatch}
    />
  );
};

export default ProductDetailsPage;
