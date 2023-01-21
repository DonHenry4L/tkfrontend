import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

import axios from "axios";
import { getToken } from "../../../utils/helper";
import { useAuth } from "../../../hooks";

const UserCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const { authInfo } = useAuth();

  const reduxDispatch = useDispatch();

  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    console.log(data);
    return data;
  };

  const createOrder = async (orderData) => {
    const { data } = await axios.post(
      "/api/orders/createOrder",
      { ...orderData },
      config
    );
    return data;
  };

  return (
    <UserCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      userInfo={userInfo}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      reduxDispatch={reduxDispatch}
      getUser={getUser}
      createOrder={createOrder}
    />
  );
};

export default UserCartDetailsPage;
