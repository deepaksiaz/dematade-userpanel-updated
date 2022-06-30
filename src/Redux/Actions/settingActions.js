import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getSubscriptionsData = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_SUBSCRIPTIONS_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/customer/subscription`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_SUBSCRIPTIONS_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_SUBSCRIPTIONS_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_SUBSCRIPTIONS_DATA_FAIL,
        });
      });
  };
};

export const getChartingData = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_CHARTING_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/customer/getById`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_CHARTING_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_CHARTING_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_CHARTING_DATA_FAIL,
        });
      });
  };
};

export const getIntradayStockListData = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_INTRADAYSTOCK_LIST_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/intraday-stock`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_INTRADAYSTOCK_LIST_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_INTRADAYSTOCK_LIST_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_INTRADAYSTOCK_LIST_DATA_FAIL,
        });
      });
  };
};
