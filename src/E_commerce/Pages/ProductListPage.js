
import axios from "axios";
import ProductListPageComponent from "./admin/components/ProductListPageComponent";

const getProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

const ProductListPage = () => {
  return <ProductListPageComponent getProducts={getProducts} />;
};

export default ProductListPage;
