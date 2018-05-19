import actionTypes from '../actions/actionTypes';
import jstz from 'jstz';

const setHeaders = (getState) => {
    const token = getState().auth.token;

    let headers = {
        "Content-type": "application/json",
    }

    if (token) {
        headers["Authorization"]= `Token ${token}`;
    }

    return headers;
}

const getWorkspace = (getState) => { return getState().workspace.id; }

export const setupRequest = (getState) => ({ headers: setHeaders(getState), workspace: getWorkspace(getState) });

export const handleServerError = (res) => {
    if (res.status < 500) {
        return {status: res.status, data: res.data};
    } else {
        throw res;
    }
}

export const handleResponse = (res, action, data) => {
    return (dispatch) => {
        if (res.status >= 200 && res.status <= 204) {
            return dispatch({type: action, data: data || null});
        } else if (res.status >= 400 && res.status < 500) {
            return dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data});
        }
    }
}

export const setTimeZone = () => {
    if (!localStorage.getItem('timezone')) {
        const tz = jstz.determine() || 'UTC';
        localStorage.setItem('timezone', tz.name());
    }
}
