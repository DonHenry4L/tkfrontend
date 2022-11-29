import { getToken } from "../../utils/helper";
import client from "../client";

export const getFriends = async () => {
  try {
    const token = getToken();
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    const response = await client("/get-friends", config);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = async (data) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    const response = await client.post("/send-message", data, config);
    console.log(response.data.message);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = async (id) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    const response = await client(`/get-message/${id}`, config);
    console.log(response.data.message);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const ImageMessageSend = async (data) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    const response = await client.post("/image-message-send", data, config);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};
