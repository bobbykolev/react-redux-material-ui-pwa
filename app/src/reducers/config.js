import initialState from './initialState';
import {CONFIG_SUCCESS} from "../constants/actoinTypes";

export default function config(state = initialState.config, action) {
  switch (action.type) {
    case CONFIG_SUCCESS:
      window.config = action.data || initialState.config;

      return Object.assign({}, action.data || initialState.config);
    default:
      return state;
  }
}
