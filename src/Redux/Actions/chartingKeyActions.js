import * as _ from 'lodash';
import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";


export const clearSymbolList = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_SYMBOL_LIST,
    });
  };
}

export const searchSymbol = (exchange, tradeType, search) => {
  return async (dispatch) => {
    const token = getTokenFromLocalStorage();
    const response = await axios.get(
      `${API_URL}/symbol-search?exchange=${exchange}&search=${search}&tradeType=${tradeType}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    if (response.data?.success) {
      let data = response.data.data;
      if (!_.isArray(data)) data = [];
      // if (data) data = data.filter(item => item.ExchangeName === exchange);
      dispatch({
        type: actionTypes.GET_SYMBOL_LIST_SUCCESS,
        payload: data
      });
    }
  }
}

export const chartingBuyOrSell = (formData) => {
  return async (dispatch) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axios.post(`${API_URL}/charting`, formData, { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.success) {
        dispatch({
          type: actionTypes.ONE_TOUCH_CREATE_SUCCESS,
          payload: "Trade saved successfully",
        });
      } else {
        dispatch({
          type: actionTypes.ONE_TOUCH_CREATE_ERROR,
          payload: "Trade saved error!!!",
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.ONE_TOUCH_CREATE_ERROR,
        payload: "Trade saved error!!!",
      });
    }
  }
}


export const oneTouchCreate = (formData) => {
  return async (dispatch) => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axios.post(
        `${API_URL}/onetouch/create`, 
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data?.success) {
        dispatch({
          type: actionTypes.ONE_TOUCH_CREATE_SUCCESS,
          payload: "Trade saved successfully",
        });
      } else {
        dispatch({
          type: actionTypes.ONE_TOUCH_CREATE_ERROR,
          payload: "Trade saved error!!!",
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.ONE_TOUCH_CREATE_ERROR,
        payload: "Trade saved error!!!",
      });
    }
  }
}

export const getChartingKeyData = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_CHARTING_KEY_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/apikey`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_CHARTING_KEY_DATA_SUCCESS,
            payload: res.data?.apikey,
          });
        } else {
          dispatch({
            type: actionTypes.GET_CHARTING_KEY_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_CHARTING_KEY_DATA_FAIL,
        });
      });
  };
};

export const generateChartingKey = (onSuccess, onFail) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GENERATE_CHARTING_KEY_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(
        `${API_URL}/apikey`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GENERATE_CHARTING_KEY_SUCCESS,
            payload: res.data,
          });
          onSuccess();
        } else {
          dispatch({
            type: actionTypes.GENERATE_CHARTING_KEY_FAIL,
          });
          onFail();
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GENERATE_CHARTING_KEY_FAIL,
        });
        onFail();
      });
  };
};

export const updateChartingKeyStatus = (body, onSuccess, onFail) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_CHARTING_KEY_STATUS_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(`${API_URL}/apikey/status`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.UPDATE_CHARTING_KEY_STATUS_SUCCESS,
            payload: res?.data?.apikey,
          });
          onSuccess();
        } else {
          dispatch({
            type: actionTypes.UPDATE_CHARTING_KEY_STATUS_FAIL,
          });
          onFail();
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.UPDATE_CHARTING_KEY_STATUS_FAIL,
        });
        onFail();
      });
  };
};
