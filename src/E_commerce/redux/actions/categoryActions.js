import axios from "axios"
import { getToken } from "../../../utils/helper"
import * as actionTypes from "../constants/categoryConstants"


export const getCategories = () => async (dispatch) => {
    const {data} = await axios.get("/api/E_categories")
    dispatch({
            type: actionTypes.GET_CATEGORIES_REQUEST,
            payload: data
        })
}

export const saveAttributeToCatDoc = (key, val, categoryChoosen) => async (dispatch, getState) => {
    const token = getToken();
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    const {data} = await axios.post("/api/E_categories/attr", {key, val, categoryChoosen}, config)
    if(data.categoryUpdated) {
        dispatch({
            type: actionTypes.SAVE_ATTR,
            payload: [...data.categoryUpdated]
        })
    }
}

export const newCategory = (category) => async (dispatch, getState) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const cat = getState().getCategories.categories
  const {data} = await axios.post("/api/E_categories", {category}, config)
  if (data.categoryCreated) {
    dispatch({
        type: actionTypes.INSERT_CATEGORY,
        payload: [...cat, data.categoryCreated],
    })
}
}

export const deleteCategory = (category) => async (dispatch, getState) => {
  const token = getToken();
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const cat = getState().getCategories.categories;
  const categories = cat.filter((item) => item.name !== category);
  const { data } = await axios.delete("/api/E_categories/" + encodeURIComponent(category), config);
  if (data.categoryDeleted) {
      dispatch({
         type: actionTypes.DELETE_CATEGORY, 
         payload: [...categories],
      })
  }
}