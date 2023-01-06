
import UserProfilePageComponent from "../../E_commerce/Pages/user/components/UserProfilePageComnponent";
import { getToken } from "../../utils/helper";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../E_commerce/redux/actions/userActions";
import axios from "axios";


const updateUserApiRequest = async (
  first_name,
  last_name,
  email,
  password,
  nationality,
  country,
  city,
  lga,
  state,
  phone,
  picture
) => {
  const token = getToken();
const config = {
  headers: {
    authorization: "Bearer " + token,
  },
};
  const { data } = await axios.put(
    "/user/profile",
    {
      first_name,
      last_name,
      email,
      password,
      nationality,
      country,
      city,
      lga,
      state,
      phone,
      picture,
    },
config
  );
  return data;
};

const fetchUser = async (id) => {
  const token = getToken();
  // const config = {
  //   headers: {
  //     authorization: "Bearer " + token,
  //   },
  // };
  const { data } = await axios.get("/user/profile/" + id, {
    headers: {
      authorization: "Bearer " + token,
    },
  } );

  return data;
};

export default function ProfilePage() {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  return (
    <UserProfilePageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      userInfoFromRedux={userInfo}
      setReduxUserState={setReduxUserState}
      reduxDispatch={reduxDispatch}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
}
