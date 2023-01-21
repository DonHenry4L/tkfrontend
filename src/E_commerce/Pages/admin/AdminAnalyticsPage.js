import AnalyticsPageComponent from "./components/AnalyticsPageComponent";
import axios from "axios";
import { getToken } from "../../../utils/helper";
import socketIOClient from "socket.io-client";

const fetchOrdersForFirstDate = async (abctrl, firstDateCompare) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.get(
    "/api/orders/analysis/" + firstDateCompare,
    config,
    {
      signal: abctrl.signal,
    }
  );
  return data;
};
const fetchOrdersForSecondDate = async (abctrl, secondDateCompare) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.get(
    "/api/orders/analysis/" + secondDateCompare,
    config,
    {
      signal: abctrl.signal,
    }
  );
  return data;
};

const AdminAnalyticsPage = () => {
  return (
    <AnalyticsPageComponent
      fetchOrdersForFirstDate={fetchOrdersForFirstDate}
      fetchOrdersForSecondDate={fetchOrdersForSecondDate}
      socketIOClient={socketIOClient}
    />
  );
};

export default AdminAnalyticsPage;
