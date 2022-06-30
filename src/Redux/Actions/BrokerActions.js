import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const setBrokerSessionExpired = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.BROKER_LOGIN_FAIL,
      payload: data || "Broker Session Expired",
    });
  }
}
export const brokerLogin = (data, onSuccess) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.BROKER_LOGIN_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(
        `${API_URL}/broker/login`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.BROKER_LOGIN_SUCCESS,
            payload: res.data,
          });
          onSuccess();
        } else {
          dispatch({
            type: actionTypes.BROKER_LOGIN_FAIL,
            payload: res.data?.message || "Failed to login",
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.BROKER_LOGIN_FAIL,
          payload: typeof e == "string" ? e : "Failed to login",
        });
      });
  };
};
export const aliceBrokerLogin = (data, onSuccess) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.BROKER_LOGIN_INIT,
    });
    const token = getTokenFromLocalStorage();
    
    axios
      .post(
        `${API_URL}/broker/alice_login`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.BROKER_LOGIN_SUCCESS,
            payload: res.data,
          });
          onSuccess();
        } else {
          dispatch({
            type: actionTypes.BROKER_LOGIN_FAIL,
            payload: res.data?.message || "Failed to login",
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.BROKER_LOGIN_FAIL,
          payload: typeof e == "string" ? e : "Failed to login",
        });
      });
  };
};

export const getBrokerLoginStatus = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_BROKER_LOGIN_STATUS_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/customer/getById`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_BROKER_LOGIN_STATUS_SUCCESS,
            payload: Boolean(res.data?.data?.brokerLogin),
          });

          dispatch({
            type: actionTypes.SET_CUSTOMER_PLAN_STATUS,
            payload: res.data?.data?.plan_status
          });
        } else {
          dispatch({
            type: actionTypes.GET_BROKER_LOGIN_STATUS_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_BROKER_LOGIN_STATUS_FAIL,
        });
      });
  };
};


export const searchBrokers = (search_string, onSuccess, onFail) => {
  return async (dispatch) => {
    const token = getTokenFromLocalStorage();
    axios.get(`${API_URL}/broker/search?search_string=${search_string}`, { headers: { Authorization: `Bearer ${token}` }})
      .then((res) => {
        debugger
        if (res.data?.success) {
          onSuccess(res.data.data);
        } else {
          
        }
      })
      .catch((e) => {
        
      });
  };
};
