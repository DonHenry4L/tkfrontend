import axios from "axios";
import { getToken } from "../../../utils/helper";
import CreateProductPageComponent from "./components/CreateProductPageComponent";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./components/utils/utils";
import { useSelector, useDispatch } from "react-redux";
import {
  newCategory,
  deleteCategory,
  saveAttributeToCatDoc,
} from "../../redux/actions/categoryActions";

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
  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();
  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      UploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      categories={categories}
      reduxDispatch={dispatch}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
    />
  );
};

export default AdminCreateProductPage;
