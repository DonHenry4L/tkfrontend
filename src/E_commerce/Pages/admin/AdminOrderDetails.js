import OrderDetailsPageComponent from "./components/OrderDetailsPageComponent";


import { getToken } from "../../../utils/helper";
import { Delivered } from "../../../api/order";
import axios from "axios";

const getOrder = async (id) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.get("/userOrder/" + id, config);
  return data;
};

const markAsDelivered = async (id) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.put("/orders/delivered/" + id, config);
  if (data) {
    return data;
  }
};

const AdminOrderDetailsPage = () => {
  return (
    <OrderDetailsPageComponent
      getOrder={getOrder}
      markAsDelivered={markAsDelivered}
    />
  );
};

export default AdminOrderDetailsPage;
