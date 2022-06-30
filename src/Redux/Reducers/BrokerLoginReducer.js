import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  isLoggedIn: false,
  brokerLoginLoading: false,
  getBrokerLoginStatusLoading: false,
  error: "",
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.BROKER_LOGIN_INIT:
      return {
        ...state,
        brokerLoginLoading: true,
        error: "",
      };
    case actionTypes.BROKER_LOGIN_SUCCESS:
      return {
        ...state,
        brokerLoginLoading: false,
        isLoggedIn: true,
      };
    case actionTypes.BROKER_LOGIN_FAIL:
      return {
        ...state,
        brokerLoginLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case actionTypes.GET_BROKER_LOGIN_STATUS_INIT:
      return {
        ...state,
        getBrokerLoginStatusLoading: true,
      };
    case actionTypes.GET_BROKER_LOGIN_STATUS_SUCCESS:
      return {
        ...state,
        getBrokerLoginStatusLoading: false,
        isLoggedIn: action.payload,
      };
    case actionTypes.GET_BROKER_LOGIN_STATUS_FAIL:
      return {
        ...state,
        getBrokerLoginStatusLoading: false,
      };
    default:
      return state;
  }
};

export default store;
