import actionTypes from './actionTypes';
import axios from 'axios';

export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.USER_LOADING});

        const token = getState().auth.token;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"]= `Token ${token}`;
        }
        return axios.get('/api/user/', {headers, })
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
                    dispatch({type: actionTypes.USER_LOADED, user: res.data});
                    return res.data;
                } else if (res.status >= 400 && res.status < 500) {
                    dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data})
                    throw res.data;
                }
            })
    }
}

export const login = (username, password) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = {username, password};

        return axios.post('/api/login', body, {headers}).then(res => {
            if (res.status < 500) {
                return {status: res.status, data: res.data};
            } else {
                console.log("Server error!");
                throw res;
            }
        })
        .then(res => {
            if (res.status === 200) {
                dispatch({type: actionTypes.LOGIN, data: res.data});
                return res.data;
            } else if (res.status === 403 || res.status === 401) {
                dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data})
                throw res.data;
            } else {
                dispatch({type: actionTypes.LOGIN_FAILED, data: res.data})
                throw res.data;
            }
        })
    }
}

export const register = (username, password) => {
    return (dispatch, getState) => {
        let headers = {"Content-type": "application/json"};

        return axios.post(`/api/register`, {username, password}, {headers,}).then(res => {
            if (res.status < 500) {
                return {status: res.status, data: res.data};
            } else {
                console.log("Server error.");
                throw res;
            }
        })
        .then(res => {
            if (res.status === 200) {
                dispatch({type: actionTypes.REGISTRATION_SUCCESSFUL, data: res.data});
                return res.data;
            } else if (res.status === 403 || res.status === 401) {
                dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: res.data});
                throw res.data;
            } else {
                dispatch({type: actionTypes.REGISTRATION_FAILED, data: res.data});
                throw res.data;
            }
        })
    }
}