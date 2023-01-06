import axios from "axios";
import { getToken } from "../../../../../utils/helper";

export const uploadImagesApiRequest = async (images, productId) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const formData = new FormData();

  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
 const {data} = await axios.post(
    "/products/admin/upload?productId=" + productId,
    formData,
    config
  );
  return data
};



export const uploadImagesCloudinaryApiRequest = (images, productId) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const url = "https://api.cloudinary.com/v1_1/di0vcnj81/image/upload";
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    formData.append("upload_preset", "h8qzkz00");
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        axios.post("/products/admin/upload?cloudinary=true&productId=" + productId, data, config)
      });
  }
};


















export const changeCategory = (e, categories, setAttributesFromDb, setCategoryChoosen) => {
    const highLevelCategory = e.target.value.split("/")[0];
    const highLevelCategoryAllData = categories.find(
      (cat) => cat.name === highLevelCategory
    );
    if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
      setAttributesFromDb(highLevelCategoryAllData.attrs);
    } else {
      setAttributesFromDb([]);
    }
    setCategoryChoosen(e.target.value);
  };

  export const setValuesForAttrFromDbSelectForm = (e, attrVal, attributesFromDb) => {
    if (e.target.value !== "Choose attribute") {
      var selectedAttr = attributesFromDb.find(
        (item) => item.key === e.target.value
      );
      let valuesForAttrKeys = attrVal.current;
      if (selectedAttr && selectedAttr.value.length > 0) {
        while (valuesForAttrKeys.options.length) {
          valuesForAttrKeys.remove(0);
        }
        valuesForAttrKeys.options.add(new Option("Choose attribute value"));
        selectedAttr.value.map((item) => {
          valuesForAttrKeys.add(new Option(item));
          return "";
        });
      }
    }
  };

  export const setAttributesTableWrapper = (key, val, setAttributesTable) => {
      setAttributesTable((attr) => {
          if (attr.length !== 0) {
              var keyExistsInOldTable = false;
              let modifiedTable = attr.map(item => {
                  if (item.key === key) {
                      keyExistsInOldTable = true;
                      item.value = val;
                      return item;
                  } else {
                      return item;
                  }
              })
              if (keyExistsInOldTable) return [...modifiedTable];
              else return [...modifiedTable, { key: key, value: val }];
          } else {
             return [{ key: key, value: val }]; 
          }
      })
  }