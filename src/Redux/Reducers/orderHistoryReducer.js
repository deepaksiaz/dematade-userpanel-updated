import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  orderHistory: [],
  papertradeOrderHistory: [],
  loadingGetOrderHistory: false,
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDER_HISTORY_INIT:
      return {
        ...state,
        loadingGetOrderHistory: true,
      };
    case actionTypes.GET_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        loadingGetOrderHistory: false,
        orderHistory: action.payload,
      };
    case actionTypes.GET_ORDER_HISTORY_FAIL:
      return {
        ...state,
        loadingGetOrderHistory: false,
      };

    case actionTypes.GET_PAPERTRADE_ORDER_HISTORY_INIT:
      return {
        ...state,
        loadingGetOrderHistory: true,
      };
    case actionTypes.GET_PAPERTRADE_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        loadingGetOrderHistory: false,
        papertradeOrderHistory: action.payload,
      };
    case actionTypes.GET_PAPERTRADE_ORDER_HISTORY_FAIL:
      return {
        ...state,
        loadingGetOrderHistory: false,
      };
    default:
      return state;
  }
};

export default store;
