import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./Reducers/AuthReducer";
import BrokerLoginReducer from "./Reducers/BrokerLoginReducer";
import PositionsReducer from "./Reducers/positionsReducer";
import DayTradingReducer from "./Reducers/dayTradingReducer";
import OrderHistoryReducer from "./Reducers/orderHistoryReducer";
import SignalScannerReducer from "./Reducers/signalScannerReducer";
import StrategicReducer from "./Reducers/strategicReducer";
import SettingReducer from "./Reducers/settingReducer";
import chartingKeyReducer from "./Reducers/chartingKeyReducer";
import PricesReducer from "./Reducers/PricesReducer";
import PaperTradingReducer from "./Reducers/PaperTradingReducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  BrokerLogin: BrokerLoginReducer,
  Positions: PositionsReducer,
  DayTrading: DayTradingReducer,
  OrderHistory: OrderHistoryReducer,
  SignalScanner: SignalScannerReducer,
  Strategic: StrategicReducer,
  Setting: SettingReducer,
  ChartingKey: chartingKeyReducer,
  Prices: PricesReducer,
  PaperTrading: PaperTradingReducer
});

const logger = store => next => action => {
  console.group(action.type)
  // console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const monitorReducerEnhancer = createStore => (
  reducer,
  initialState,
  enhancer
) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now()
    const newState = reducer(state, action)
    const end = performance.now()
    const diff = Math.round(end - start)

    console.log('reducer process time:', diff)

    return newState
  }

  return createStore(monitoredReducer, initialState, enhancer)
}

const intialState = {};

const middlewares = [logger, thunk]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer]
const composedEnhancers = compose(...enhancers)

const store = createStore(rootReducer, intialState, composedEnhancers)

export default store;