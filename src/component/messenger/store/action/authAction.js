import axios from "axios";
import { getChatToken } from "../../../../utils/helper";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from "../types/authType";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/josn",
      },
    };
    try {
      const response = await axios.post("/user-register", data, config);
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/user-login", data, config);
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogout = (data) => async (dispatch) => {
  const token = getChatToken();
  try {
    const response = await axios.post("/user-logout", data, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    if (response.data.success) {
      localStorage.removeItem("authToken");
      dispatch({
        type: "LOGOUT_SUCCESS",
      });
    }
  } catch (error) {
    console.log(error.response.error);
  }
};
