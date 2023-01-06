import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../E_commerce/redux/actions/userActions";
import LoginPageComponent from "./component/LoginPageComponent";



const loginUserApiRequest = async (email, password, doNotLogout, userLoggedIn) => {
  // const { data } = await axios.post("/login", { email, password, doNotLogout });
  // return data;
  try {
    const { data } = await axios.post("/login", {email, password, doNotLogout,userLoggedIn});
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export default function Signin() {

  const reduxDispatch = useDispatch()
  return <LoginPageComponent loginUserApiRequest={loginUserApiRequest} reduxDispatch={reduxDispatch} setReduxUserState={setReduxUserState} />;
}
