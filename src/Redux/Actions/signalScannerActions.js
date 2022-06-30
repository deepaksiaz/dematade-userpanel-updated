import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getPositionalSignalscannerData = (queryPayload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_INIT,
    });
    const filter_string = Object.keys(queryPayload).map(f => `${f}=${queryPayload[f]}`).join('&');
    const token = getTokenFromLocalStorage();
    axios.get(`${API_URL}/scanner?${filter_string}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_FAIL,
        });
      });
  };
};
