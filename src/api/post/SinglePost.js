import { catchError, getToken } from "../../utils/helper";
import axios from "axios";

export const getSinglePost = async (id) => {
  try {
    const { data } = await axios.get("/post/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
// export const Delivered = async (id) => {
//   const token = getToken();
//   const config = {
//     headers: {
//       authorization: "Bearer " + token,
//     },
//   };
//   try {
//     const { data } = await axios.put("/orders/delivered/" + id, config);
//     if (data) {
//       return data;
//     }
//   } catch (error) {
//     return catchError(error);
//   }
// };
