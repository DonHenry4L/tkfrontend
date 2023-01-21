import { catchError, getToken } from "../utils/helper";
import axios from "axios";

export const Delivered = async (id) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.put(`/orders/delivered/${id}`, config);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
