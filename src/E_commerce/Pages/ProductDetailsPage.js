import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart } from "../redux/actions/cartActions";
import ProductDetailsPageComponent from "./admin/components/ProductDetailsPageComponent";
import { getToken } from "../../utils/helper";
import { useAuth } from "../../hooks";

const getProductDetails = async (id) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.get(`/api/products/get-one/${id}`, config);
  return data;
};

const writeReviewApiRequest = async (productId, formInputs) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.post(
    `/api/users/user/review/${productId}`,
    { ...formInputs },
    config
  );
  return data;
};

const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  // const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const { authInfo } = useAuth();

  return (
    <ProductDetailsPageComponent
      addToCartReduxAction={addToCart}
      reduxDispatch={dispatch}
      getProductDetails={getProductDetails}
      // userInfo={userInfo}
      writeReviewApiRequest={writeReviewApiRequest}
      authInfo={authInfo}
    />
  );
};

export default ProductDetailsPage;
