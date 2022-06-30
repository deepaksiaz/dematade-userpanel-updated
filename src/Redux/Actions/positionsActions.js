import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getOpenPositions = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_OPEN_POSITIONS_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/broker/position`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_OPEN_POSITIONS_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_OPEN_POSITIONS_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_OPEN_POSITIONS_FAIL,
        });
      });
  };
};

export const squareOffOrder = (data, onSuccess, onFail) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SQUARE_OFF_ORDER_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(`${API_URL}/broker/squareoff`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.SQUARE_OFF_ORDER_SUCCESS,
          });
          onSuccess();
        } else {
          dispatch({
            type: actionTypes.SQUARE_OFF_ORDER_FAIL,
          });
          onFail(res.data?.message);
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.SQUARE_OFF_ORDER_FAIL,
        });
        onFail("Failed to square off order..");
      });
  };
};
