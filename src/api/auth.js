import axios from "axios";
import { getToken } from "../utils/helper";

export const createUser = async (userInfo) => {
  try {
    const { data } = await axios.post("/register", userInfo);
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await axios.post("/verify-email", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const signInUser = async (userLoggedIn) => {
  try {
    const { data } = await axios.post("/login", userLoggedIn);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getIsAuth = async () => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.get("/is-auth", config);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const forgetPassword = async (email) => {
  try {
    const { data } = await axios.post("/forget-password", { email });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyPasswordResetToken = async (token, userId) => {
  try {
    const { data } = await axios.post("/verify-password-reset-token", {
      token,
      userId,
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const resetPassword = async (passwordInfo) => {
  try {
    const { data } = await axios.post("/reset-password", passwordInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const resendEmailVerificationToken = async (userId) => {
  try {
    const { data } = await axios.post("/resend-email-verification-token", {
      userId,
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
