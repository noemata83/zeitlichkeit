import actionTypes from './actionTypes';
import axios from 'axios';

export const loadWorkspace = () => {
    console.log("loadWorkspace function called.");
    return (dispatch, getState) => {
        console.log("Firing off now.");
        dispatch({type: actionTypes.WORKSPACE_LOADING});

        const token = getState().auth.token;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"]= `Token ${token}`;
        }

        const workspace = getState().auth.user.account.default_workspace.id;

        return axios.get(`/api/workspaces/${workspace}/`, {headers, })
            .then(res => {
                if (res.status < 500) {
                    return {status: res.status, data: res.data};
                } else {
                    console.log("Server error.");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: actionTypes.WORKSPACE_LOADED, workspace: res.data});
                    return res.data;
                } else if (res.status >= 400 && res.status < 500) {
                    dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data})
                    throw res.data;
                }
            }); 
    }
}

export const loadSprints = () => {
    return (dispatch, getState) => {
        console.log("Loading sprints.");
        dispatch({type: actionTypes.SPRINT_LOADING});

        const token = getState().auth.token;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"]= `Token ${token}`;
        }

        const workspace = getState().workspace.id;

        return axios.get(`/api/workspaces/${workspace}/sprints/`, {headers, })
            .then(res => {
                if (res.status < 500) {
                    return {status: res.status, data: res.data};
                } else {
                    console.log("Server error.");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: actionTypes.SPRINT_LOADED, data: res.data});
                    return res.data;
                } else if (res.status >= 400 && res.status < 500) {
                    dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data})
                    throw res.data;
                }
            }); 
    }
}