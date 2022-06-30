import axios from "axios";
import { API_URL } from "../../config";
import * as actionTypes from "./ActionTypes";

export const sendOtp = async (data, onSuccess, onFail) => {
  axios
    .post(`${API_URL}/auth/otp`, { ...data })
    .then((res) => {
      if (res.data?.success) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch((e) => {
      onFail();
    });
};

export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_USER_INIT,
    });
    axios
      .post(`${API_URL}/auth`, { ...data })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.LOGIN_USER_SUCCESS,
            payload: res.data,
          });
          if (res.data.token) {
            localStorage.setItem("authToken", res?.data?.token);
            localStorage.setItem("name", res?.data?.name);
            localStorage.setItem("user_id", res?.data?.user_id);
            localStorage.setItem("broker_client_id", res?.data?.broker_client_id);
          }
        } else {
          dispatch({
            type: actionTypes.LOGIN_USER_FAIL,
            payload: res.data?.message || "Failed to login",
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.LOGIN_USER_FAIL,
          payload: typeof e == "string" ? e : "Failed to login",
        });
      });
  };
};

export const sendContactUsMessag = (data, onSuccess, onFail) => {
  return async (dispatch) => {
    axios
      .post(`${API_URL}/sendMessage`, { ...data })
      .then((res) => {
        if (res.data?.success) {
          onSuccess();
        } else {
          onFail(res?.data?.error);
        }
      })
      .catch((e) => {
        onFail(e?.response?.data?.error);
      });
  };
};
