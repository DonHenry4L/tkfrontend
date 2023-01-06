
import { useDispatch, useSelector } from "react-redux";
import EditProductPageComponent from "./components/EditProductPageComponent";
import axios from "axios";
import { getToken } from "../../../utils/helper";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "./components/utils/utils";


const fetchProducts = async (productId) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const {data} = await axios.get(`/api/products/get-one/${productId}`, config)
  return data
}

const updateProductApiRequest = async (productId, formInputs) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const {data} = await axios.put(`/api/products/admin/${productId}`,{...formInputs},config)
  return data
}




const AdminEditProductPage = () => {

const {categories} = useSelector((state) => state.getCategories)

const reduxDispatch = useDispatch()

const imageDeleteHandler = async (imagePath, productId) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  let encoded = encodeURIComponent(imagePath)
  if (process.env.NODE_ENV !== 'production'){ // to do: change to !==
    await axios.delete(`/api/products/admin/image/${encoded}/${productId}`, config)
  } else {
    await axios.delete(`/api/products/admin/image/${encoded}/${productId}?cloudinary=true`, config)

  }

}


  return <EditProductPageComponent categories={categories} fetchProducts={fetchProducts} updateProductApiRequest={updateProductApiRequest} reduxDispatch={reduxDispatch} saveAttributeToCatDoc={saveAttributeToCatDoc} imageDeleteHandler={imageDeleteHandler} uploadImagesApiRequest={uploadImagesApiRequest} uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}/>

};

export default AdminEditProductPage;
