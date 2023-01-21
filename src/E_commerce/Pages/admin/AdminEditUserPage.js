import EditUserPageComponent from "./components/EditUserPageComponent";
import axios from "axios";
import { getToken } from "../../../utils/helper";

const fetchUser = async (userId) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.get(`/api/users/${userId}`, config);
  return data;
};

const updateUserApiRequest = async (
  userId,
  first_name,
  last_name,
  email,
  isAdmin,
  role
) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.put(
    `/api/users/${userId}`,
    {
      first_name,
      last_name,
      email,
      isAdmin,
      role,
    },
    config
  );
  return data;
};

const AdminEditUserPage = () => {
  return (
    <EditUserPageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
    />
  );
};

export default AdminEditUserPage;
