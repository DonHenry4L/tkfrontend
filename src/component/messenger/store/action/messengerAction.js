import axios from "axios";
import {
  FRIEND_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  THEME_SET_SUCCESS,
  THEME_GET_SUCCESS,
} from "../types/messengerType";
import { getChatToken } from "../../../../utils/helper";

export const getFriends = () => async (dispatch) => {
  const token = getChatToken();
  try {
    // const config = {

    // };
    const response = await axios.get("/api/messenger/get-friends", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    dispatch({
      type: FRIEND_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  const token = getChatToken();
  try {
    const response = await axios.post("/api/messenger/send-message", data, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = (id) => {
  return async (dispatch) => {
    const token = getChatToken();
    try {
      const response = await axios.get(`/api/messenger/get-message/${id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      dispatch({
        type: MESSAGE_GET_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const ImageMessageSend = (data) => async (dispatch) => {
  const token = getChatToken();
  try {
    const response = await axios.post("/api/messenger/image-message-send", data, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const seenMessage = (msg) => async (dispatch) => {
  const token = getChatToken();
  try {
    const response = await axios.post("/api/messenger/seen-message", msg, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const updateMessage = (msg) => async (dispatch) => {
  const token = getChatToken();
  try {
    const response = await axios.post("/api/messenger/delivered-message", msg, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const themeSet = (theme) => async (dispatch) => {
  localStorage.setItem("chatTheme", theme);
  dispatch({
    type: "THEME_SET_SUCCESS",
    payload: {
      theme: theme,
    },
  });
};

export const getTheme = () => async (dispatch) => {
  const theme = localStorage.getItem("chatTheme");
  dispatch({
    type: "THEME_GET_SUCCESS",
    payload: {
      theme: theme ? theme : "white",
    },
  });
};
