import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getPaperTradingsData = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_PAPER_TRADINGS_DATA_INIT });
    const token = getTokenFromLocalStorage();
    axios.get(
      `${API_URL}/papertrade`, 
      { headers: { Authorization: `Bearer ${token}` }}
    ).then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_PAPER_TRADINGS_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_PAPER_TRADINGS_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_PAPER_TRADINGS_DATA_FAIL,
        });
      });
  };
};

export const updatePaperTradingAutoTradeStatus = (payload, onSuccess, onFail) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_DAY_TRADING_AUTO_TRADE_STATUS_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(
        `${API_URL}/papertrade/trading/status`,
        { ...payload },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.UPDATE_DAY_TRADING_AUTO_TRADE_STATUS_SUCCESS,
          });
          onSuccess(res?.data?.message);
        } else {
          dispatch({
            type: actionTypes.UPDATE_DAY_TRADING_AUTO_TRADE_STATUS_FAIL,
          });
          onFail(res?.data?.message);
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.UPDATE_DAY_TRADING_AUTO_TRADE_STATUS_FAIL,
        });
        onFail(e?.message);
      });
  };
};

export const updatePaperTradingCardData = (payload, onSuccess, onFail) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_PAPER_TRADING_CARD_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(
        `${API_URL}/papertrade/trading`,
        { ...payload },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.UPDATE_PAPER_TRADING_CARD_DATA_SUCCESS,
          });
          onSuccess(res?.data?.message);
        } else {
          dispatch({
            type: actionTypes.UPDATE_PAPER_TRADING_CARD_DATA_FAIL,
          });
          onFail(res?.data?.message);
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.UPDATE_PAPER_TRADING_CARD_DATA_FAIL,
        });
        onFail(e?.message);
      });
  };
};

let last_call_for_paper_trading_data = null;
export const getPaperCalculationTotals = (onSuccess) => {
  return async (dispatch) => {
    const now = new Date();
    if (now.getTime() - last_call_for_paper_trading_data?.getTime() < 10000) return;
    last_call_for_paper_trading_data = new Date();
    dispatch({
      type: actionTypes.GET_PAPER_TRADINGS_TOTALS_DATA_FAIL,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(
        `${API_URL}/papertrade/calculation`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_PAPER_TRADINGS_TOTALS_DATA_SUCCESS,
            payload: res.data?.data,
          });
          onSuccess(res?.data?.message);
        } else {
          dispatch({
            type: actionTypes.GET_PAPER_TRADINGS_TOTALS_DATA_FAIL
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_PAPER_TRADINGS_TOTALS_DATA_FAIL
        });
      });
  };
}

export const squareOffPapertradePosition = (data, onSuccess, onFail) => {
  return async (dispatch) => {
    const token = getTokenFromLocalStorage();
    const payload = { position_id: data.id }
    axios.post(`${API_URL}/papertrade/square-off`, payload, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.success) {
          onSuccess();
        } else {
          onFail(res.data?.message);
        }
      })
      .catch((e) => {
        onFail("Failed to square off order..");
      });
  };
};


export const squareOffAllPapertradePosition = (data, onSuccess, onFail) => {
  return async (dispatch) => {
    const token = getTokenFromLocalStorage();
    axios.post(`${API_URL}/papertrade/square-off-all`, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.success) {
          onSuccess();
        } else {
          onFail(res.data?.message);
        }
      })
      .catch((e) => {
        onFail("Failed to square off order..");
      });
  };
};
