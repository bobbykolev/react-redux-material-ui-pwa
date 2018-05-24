import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import config from "./config";

const rootReducer = combineReducers({
  routing: routerReducer,
  config: config
});

export default rootReducer;