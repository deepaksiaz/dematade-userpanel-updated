import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  strategics: [],
  loadingGetStrategics: false,
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_STRATEGICS_DATA_INIT:
      return {
        ...state,
        loadingGetStrategics: true,
      };
    case actionTypes.GET_STRATEGICS_DATA_SUCCESS:
      return {
        ...state,
        loadingGetStrategics: false,
        strategics: action.payload,
      };
    case actionTypes.GET_STRATEGICS_DATA_FAIL:
      return {
        ...state,
        loadingGetStrategics: false,
      };
    default:
      return state;
  }
};

export default store;
