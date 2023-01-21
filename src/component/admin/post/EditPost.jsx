import axios from "axios";
import React from "react";
import { getToken } from "../../../utils/helper";
import EditPostComponent from "../../posts/EditPostComponent";

const loadPost = async (slug) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.get(`/api/post/${slug}`, config);
  console.log("GOT POST FOR EDIT", data);
  return data;
};
export default function EditPost() {
  return <EditPostComponent loadPost={loadPost} />;
}
