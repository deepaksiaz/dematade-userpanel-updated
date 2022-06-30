import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  user: {},
  loading: false,
  token: null,
  error: "",
  userName: "",
  plan_status: 1
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_INIT:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload?.token,
        userName: action.payload?.name,
      };
    case actionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SET_CUSTOMER_PLAN_STATUS:
      return {
        ...state,
        plan_status: action.payload,
      }
    default:
      return state;
  }
};

export default store;
