import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getIndexPrices = (onSuccess) => {
    return async (dispatch) => {
      const token = getTokenFromLocalStorage();
      const response = await axios.get(`${API_URL}/prices/index`, { headers: { Authorization: `Bearer ${token}` }});
      if (response.data?.success) {
        dispatch({
          type: actionTypes.GET_PRICES_INDEX_SUCCESS,
          payload: response.data?.prices
        });
        onSuccess(response.data?.prices);
      }
    };
  }