import * as _ from 'lodash'
import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  paperTradingData: [],
  loadingGetPaperTradingData: false,
  strategicOptions: [],
  profit_and_loss: {}
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PAPER_TRADINGS_DATA_INIT:
      return {
        ...state,
        loadingGetPaperTradingData: true,
      };
    case actionTypes.GET_PAPER_TRADINGS_DATA_SUCCESS:
      return {
        ...state,
        loadingGetPaperTradingData: false,
        paperTradingData: action.payload,
      };
    case actionTypes.GET_PAPER_TRADINGS_DATA_FAIL:
      return {
        ...state,
        loadingGetPaperTradingData: false,
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
    case actionTypes.GET_PAPER_TRADINGS_TOTALS_DATA_SUCCESS: 
      const paperTradingData = [...state.paperTradingData];
      for (let paperTrading of paperTradingData) {
        paperTrading.p_and_l = parseFloat(action.payload[paperTrading.trade_type] || 0);
      }
      return {
        ...state,
        paperTradingData
      }
    default:
      return state;
  }
};

export default store;
