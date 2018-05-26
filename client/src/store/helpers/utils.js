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

export const handleServerError = (err) => dispatch => dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: err});

export const handleResponse = (res, action, data) => dispatch => dispatch({type: action, data: data || null});

export const setTimeZone = () => {
    if (!localStorage.getItem('timezone')) {
        const tz = jstz.determine() || 'UTC';
        localStorage.setItem('timezone', tz.name());
    }
}
