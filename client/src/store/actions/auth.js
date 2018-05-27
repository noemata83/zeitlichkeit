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
        return axios.get('/api/user', {headers, })
            .then(res => {
                if (res.status === 200) dispatch({type: actionTypes.USER_LOADED, user: res.data});
            }).catch(err => dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: err}));
    }
}

export const login = (username, password) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = {username, password};

        return axios.post('/api/login', body, {headers}).then(res => {
            dispatch({type: actionTypes.LOGIN, data: res.data});
        })
        .catch(err => {
            if (err.response) {
                const errors = JSON.parse(err.response.request.response).non_field_errors;
                dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: errors});
            } else if (err.request) {
                console.log(err.request);
            }
        });
    }
}

export const register = (username, password) => {
    return (dispatch, getState) => {
        let headers = {"Content-type": "application/json"};
        return axios.post(`/api/register`, {username, password}, {headers,}).then(res => {
            dispatch({type: actionTypes.REGISTRATION_SUCCESSFUL, data: res.data});
        }).catch(err => {
            dispatch({type: actionTypes.REGISTRATION_FAILED, data: JSON.parse(err.response.request.response).non_field_errors});
        });
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        const headers = {"Content-Type": "application/json"};

        let {token} = getState().auth;

        if (token) {
        headers["Authorization"] = `Token ${token}`;
        }
        return axios.post('/api/auth/logout/', "", {headers,}).then(res => {
            if (res.status === 204) dispatch({type: actionTypes.LOGOUT});
        }).catch(err => dispatch({type: actionTypes.AUTHENTICATION_ERROR, data: err})); 
    }
}