
import axios from "axios";
import { getToken } from "../../../utils/helper";
import UsersPageComponent from "./components/UsersPageComponent";

const fetchUsers = async (abctrl) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.get("/users", config,{
    signal: abctrl.signal,
  });
  return data;
};

const deleteUser = async (userId) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.delete(`/user/${userId}`, config);
  return data;
};

const AdminUsersPage = () => {
  return <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />;
};

export default AdminUsersPage;
