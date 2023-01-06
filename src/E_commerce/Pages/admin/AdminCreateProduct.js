import axios from "axios";
import { getToken } from "../../../utils/helper";
import CreateProductPageComponent from "./components/CreateProductPageComponent";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "./components/utils/utils";

const createProductApiRequest = async (formInputs) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.post(
    "/api/products/admin",
    { ...formInputs },
    config
  );
  return data;
};


const AdminCreateProductPage = () => {
  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      UploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    />
  );
};

export default AdminCreateProductPage;
