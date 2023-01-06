import React from "react";
import axios from "axios";
import { getToken } from "../../../utils/helper";
import UserOrdersPageComponent from "./components/UserOrdersPageComponent";


const getOrders = async () => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const {data} = await axios.get("/api/orders", config);
  return data
}

const UserOrdersPage = () => {
  return <UserOrdersPageComponent getOrders={getOrders}/>
};

export default UserOrdersPage;
