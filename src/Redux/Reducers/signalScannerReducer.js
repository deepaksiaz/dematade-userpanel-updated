import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  positionalSignalScannerData: [],
  loadingGetPositionalSignalScanner: false,
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_INIT:
      return {
        ...state,
        loadingGetPositionalSignalScanner: true,
      };
    case actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_SUCCESS:
      return {
        ...state,
        loadingGetPositionalSignalScanner: false,
        positionalSignalScannerData: action.payload,
      };
    case actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_FAIL:
      return {
        ...state,
        loadingGetPositionalSignalScanner: false,
      };
    default:
      return state;
  }
};

export default store;
