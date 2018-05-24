import {AUTHENTICATION_ERROR, REST_ERROR} from "../constants/actoinTypes";

export function handleError(dispatch, e) {
    if (e && e.status == 403) {
      dispatchError(dispatch, AUTHENTICATION_ERROR, e);
    } else {
      dispatchError(dispatch, REST_ERROR, e);
    }
    console.log('[rest error] ', e);

    throw (e);
}

export function dispatchError(dispatch, type, e) {
  dispatch({
      type: type,
      data: e
  });
}