import { useDispatch, useSelector } from "react-redux";
import EditProductPageComponent from "./components/EditProductPageComponent";
import axios from "axios";
import { getToken } from "../../../utils/helper";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./components/utils/utils";

const fetchProducts = async (productId) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.get(
    `/api/products/get-one/${productId}`,
    config
  );
  return data;
};

const updateProductApiRequest = async (productId, formInputs) => {
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInputs,
  });
  return data;
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath);
    if (process.env.NODE_ENV !== "production") {
      // to do: change to !==
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProducts={fetchProducts}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={reduxDispatch}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    />
  );
};

export default AdminEditProductPage;
