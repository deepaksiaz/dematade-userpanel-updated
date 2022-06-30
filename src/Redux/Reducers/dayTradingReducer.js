import * as _ from 'lodash'
import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  dayTradingData: [],
  loadingGetDayTradingData: false,
  strategicOptions: [],
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_DAY_TRADINGS_DATA_INIT:
      return {
        ...state,
        loadingGetDayTradingData: true,
      };
    case actionTypes.GET_DAY_TRADINGS_DATA_SUCCESS:
      return {
        ...state,
        loadingGetDayTradingData: false,
        dayTradingData: action.payload,
      };
    case actionTypes.GET_DAY_TRADINGS_DATA_FAIL:
      return {
        ...state,
        loadingGetDayTradingData: false,
      };
    case actionTypes.GET_STRETAGIC_OPTIONS_DATA_INIT:
      return {
        ...state,
      };
    case actionTypes.GET_STRETAGIC_OPTIONS_DATA_SUCCESS:
      return {
        ...state,
        strategicOptions: action.payload,
      };
    case actionTypes.GET_STRETAGIC_OPTIONS_DATA_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default store;
