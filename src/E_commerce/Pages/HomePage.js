import { useSelector } from "react-redux";
import HomePageComponent from "./admin/components/HomePageComponent";
import axios from "axios";
import { getToken } from "../../utils/helper";

const getBestSellers = async () => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const { data } = await axios.get("/api/products/bestsellers", config);
  return data;
};

const HomePage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  return (
    <HomePageComponent
      categories={categories}
      getBestSellers={getBestSellers}
    />
  );
};

export default HomePage;
