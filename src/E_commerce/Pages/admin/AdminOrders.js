// import { AiOutlineCheck } from "react-icons/ai";
// import { TiTimes } from "react-icons/ti";
import { getToken } from "../../../utils/helper";
import OrdersPageComponent from "./components/OrdersPageComponent";
import axios from "axios";



const getOrders = async () => {
  const token = getToken();
const config = {
  headers: {
    authorization: "Bearer " + token,
  },
};
  const { data } = await axios.get("/api/orders/admin/getOrders", config);
  console.log(data);
  return data;
};

const AdminOrders = () => {
  return <OrdersPageComponent getOrders={getOrders} />;
};

export default AdminOrders;
