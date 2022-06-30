import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  subscriptionData: null,
  loadingGetSubscriptionData: false,
  chartingData: null,
  loadingGetChartingData: false,
  intradayStockListData: [],
  loadingGetIntradayStockListData: false,
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_SUBSCRIPTIONS_DATA_INIT:
      return {
        ...state,
        loadingGetSubscriptionData: true,
      };
    case actionTypes.GET_SUBSCRIPTIONS_DATA_SUCCESS:
      return {
        ...state,
        loadingGetSubscriptionData: false,
        subscriptionData: action.payload,
      };
    case actionTypes.GET_SUBSCRIPTIONS_DATA_FAIL:
      return {
        ...state,
        loadingGetSubscriptionData: false,
      };
    case actionTypes.GET_CHARTING_DATA_INIT:
      return {
        ...state,
        loadingGetChartingData: true,
      };
    case actionTypes.GET_CHARTING_DATA_SUCCESS:
      return {
        ...state,
        loadingGetChartingData: false,
        chartingData: action.payload,
      };
    case actionTypes.GET_CHARTING_DATA_FAIL:
      return {
        ...state,
        loadingGetChartingData: false,
      };
    case actionTypes.GET_INTRADAYSTOCK_LIST_DATA_INIT:
      return {
        ...state,
        loadingGetIntradayStockListData: true,
      };
    case actionTypes.GET_INTRADAYSTOCK_LIST_DATA_SUCCESS:
      return {
        ...state,
        loadingGetIntradayStockListData: false,
        intradayStockListData: action.payload,
      };
    case actionTypes.GET_INTRADAYSTOCK_LIST_DATA_FAIL:
      return {
        ...state,
        loadingGetIntradayStockListData: false,
      };
    default:
      return state;
  }
};

export default store;
