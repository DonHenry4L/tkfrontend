import axios from "axios"
import { getToken } from "../../../utils/helper"
import * as actionTypes from "../constants/categoryConstants"


export const getCategories = () => async (dispatch) => {
    const {data} = await axios.get("/e_categories")
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
    const {data} = await axios.post("/attr", {key, val, categoryChoosen}, config)
    if(data.categoryUpdated) {
        dispatch({
            type: actionTypes.SAVE_ATTR,
            payload: [...data.categoryUpdated]
        })
    }
}