/*  This module collects the action creators associated with reading, updating, and destroying  *
 *  workspace records.                                                                        */
import actionTypes from './actionTypes';
import axios from 'axios';
import { handleServerError, handleResponse } from '../helpers/utils';
import { loadSprints } from './workspace/sprint';

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
            .then(res => { dispatch(handleResponse(res, actionTypes.WORKSPACE_LOADED, res.data)); dispatch(loadSprints()); })
            .catch(err => dispatch(handleServerError(err)));
    }
}

