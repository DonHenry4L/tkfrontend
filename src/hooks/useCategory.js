import { useState, useEffect } from "react";
import client from "../api/client";

const useCategory = () => {
  // state
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await client("/categories");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    getCategories();
  }, []);

  return {
    categories,
  };
};

export default useCategory;
