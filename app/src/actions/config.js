import RestService from '../services/RestService';
import {CONFIG_SUCCESS} from "../constants/actoinTypes";
import * as errorHandler from './errorHandler';

export function getConfig() {
    return function(dispatch) {
        return RestService.get('./config.json').then(function(data) {
            if (data && !arguments[2]) {
                dispatch({
                    type: CONFIG_SUCCESS,
                    data: data
                });
            } else {
                dispatch({
                    type: CONFIG_SUCCESS,
                    data: null
                });
            }
        }).catch(function(e) {
            errorHandler.handleError(dispatch, e);
        });
    };
}