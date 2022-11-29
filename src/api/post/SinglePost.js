import { catchError } from "../../utils/helper";
import client from "../client";

export const getSinglePost = async (id) => {
  try {
    const { data } = await client("/post/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
