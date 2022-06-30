import axios from "axios";
import moment from "moment";
import { object } from "prop-types";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage, geUserIdFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";
import { download } from "./strategicActions";

export const getOrderHistory = (payload={}) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_ORDER_HISTORY_INIT });
    const token = getTokenFromLocalStorage();
    const queryParams = (Object.keys(payload) || []).map(key => `${key}=${payload[key]}`).join('&');
    axios.get(`${API_URL}/order/get?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_ORDER_HISTORY_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_ORDER_HISTORY_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_ORDER_HISTORY_FAIL,
        });
      });
  };
};


export const getPapertradOrderHistory = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_PAPERTRADE_ORDER_HISTORY_INIT });
    const token = getTokenFromLocalStorage();
    const queryParams = (Object.keys(payload) || []).map(key => `${key}=${payload[key]}`).join('&');
    axios.get(`${API_URL}/papertrade/orders?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_PAPERTRADE_ORDER_HISTORY_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_PAPERTRADE_ORDER_HISTORY_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_PAPERTRADE_ORDER_HISTORY_FAIL,
        });
      });
  };
};

export const downloadPapertradOrderHistory = (payload) => {
  return async (dispatch) => {
    const token = getTokenFromLocalStorage();
    const queryParams = (Object.keys(payload) || []).map(key => `${key}=${payload[key]}`).join('&');
    axios.get(`${API_URL}/papertrade/pdf/export/orders?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data) {
          download(res.data, `Paprertrade_${geUserIdFromLocalStorage()}_${moment().format('YYYY-MM-DD')}.pdf`, res.headers['content-type'])
        }
      })
      .catch((e) => {
        debugger;
        dispatch({
          type: actionTypes.GET_PAPERTRADE_ORDER_HISTORY_FAIL,
        });
      });
  };
};