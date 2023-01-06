import ProductPageComponent from "./components/ProductPageComponent";
import { getToken } from "../../../utils/helper";
import axios from "axios";



const fetchProducts = async (abctrl) => {
  const token = getToken();
const config = {
  headers: {
    authorization: "Bearer " + token,
  },
};
  const { data } = await axios.get("/products/admin", config,{
    signal: abctrl.signal,
  });
  return data;
};

const deleteProduct = async (productId) => {
  const token = getToken();
const config = {
  headers: {
    authorization: "Bearer " + token,
  },
};
  const { data } = await axios.delete(`/products/admin/${productId}`,config);
  return data;
};
const AdminProductPage = () => {
  return (
    <ProductPageComponent
      fetchProducts={fetchProducts}
      deleteProduct={deleteProduct}
    />
  );
};

export default AdminProductPage;
