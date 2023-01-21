import React, { createContext, useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsAuth, signInUser } from "../api/auth";
import { useNotification } from "../hooks";
import {
  logout,
  setReduxUserState,
} from "../E_commerce/redux/actions/userActions";
import axios from "axios";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const [currentFriend, setCurrentFriend] = useState("");
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState([]);
  const [messageSendSuccess, setMessageSendSuccess] = useState(false);
  const { updateNotification } = useNotification();

  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const handleLogin = async (email, password, doNotLogout) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password, doNotLogout });
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    navigate("/", { replace: true });
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    if (user) {
      reduxDispatch(setReduxUserState(user));
    }

    // if (user.doNotLogout) JSON.parse(localStorage.setItem("userInfo", user));
    // localStorage.setItem("userInfo", user.token);
    // else sessionStorage.setItem("userInfo", user);

    // localStorage.setItem("access_token", userLoggedIn);
    // localStorage.setItem("userInfo", user.token)

    // sessionStorage.setItem("userInfo", user.token);
  };

  const isAuth = async () => {
    const token = localStorage.getItem("userInfo");
    if (!token) return;

    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token);

    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    // if (authInfo.profile) {
    //   reduxDispatch(setReduxUserState(authInfo.profile));
    // }
  };

  const handleLogout = () => {
    // dispatch(logout())
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("userInfo");

    setAuthInfo({ ...defaultAuthInfo });
  };

  useEffect(() => {
    isAuth();
  }, []);
  // handleLogout
  return (
    <AuthContext.Provider
      value={{
        authInfo,
        handleLogin,
        handleLogout,
        isAuth,
        message,
        setMessage,
        currentFriend,
        setCurrentFriend,
        friends,
        setFriends,
        messageSendSuccess,
        setMessageSendSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAppContext = () => {
  return useContext(AuthContext);
};
export { useAppContext };
