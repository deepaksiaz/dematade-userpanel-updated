import * as actionTypes from "../Actions/ActionTypes";

const initState = {
    prices: {}
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRICES_INDEX_SUCCESS:
      return {
        ...state,
        prices: {
            ...state.prices,
            ...action.payload
        }
      };
    default:
      return state;
  }
};

export default store;
