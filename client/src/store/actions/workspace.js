import actionTypes from './actionTypes';
import axios from 'axios';
import { handleServerError, handleResponse } from '../helpers/utils';

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

export const loadWorkspace = (workspace) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.WORKSPACE_LOADING});
        const headers = setHeaders(getState); 

        return axios.get(`/api/workspaces/${workspace}/`, {headers, })
            .then(res => dispatch(handleResponse(res, actionTypes.WORKSPACE_LOADED, res.data)))
            .catch(err => dispatch(handleServerError(err)));
    }
}

