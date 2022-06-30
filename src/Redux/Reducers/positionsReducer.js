import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  positions: [],
  loadingGetPositions: false,
  loadingSquareOffPosition: false,
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_OPEN_POSITIONS_INIT:
      return {
        ...state,
        loadingGetPositions: true,
      };
    case actionTypes.GET_OPEN_POSITIONS_SUCCESS:
      return {
        ...state,
        loadingGetPositions: false,
        positions: action.payload,
      };
    case actionTypes.GET_OPEN_POSITIONS_FAIL:
      return {
        ...state,
        loadingGetPositions: false,
      };
    case actionTypes.SQUARE_OFF_ORDER_INIT:
      return {
        ...state,
        loadingSquareOffPosition: true,
      };
    case actionTypes.SQUARE_OFF_ORDER_SUCCESS:
      return {
        ...state,
        loadingSquareOffPosition: false,
      };
    case actionTypes.SQUARE_OFF_ORDER_FAIL:
      return {
        ...state,
        loadingSquareOffPosition: false,
      };
    default:
      return state;
  }
};

export default store;
