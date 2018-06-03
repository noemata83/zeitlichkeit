/*  This module contains the action creators associating with authentication and loading user
    information from the backend server. */
import axios from 'axios';
import actionTypes from './actionTypes';
import { setHeaders } from '../helpers/utils';

export const loadUser = () =>
  (dispatch, getState) => {
    dispatch({ type: actionTypes.USER_LOADING });
    const headers = setHeaders(getState);

    return axios
      .get('/api/user', { headers })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: actionTypes.USER_LOADED, user: res.data });
        }
      })
      .catch(err =>
        dispatch({ type: actionTypes.AUTHENTICATION_ERROR, data: err }));
  };

export const login = (username, password) =>
  (dispatch) => {
    const headers = { 'Content-Type': 'application/json' };
    const body = { username, password };

    return axios
      .post('/api/login', body, { headers })
      .then(res => dispatch({ type: actionTypes.LOGIN, data: res.data }))
      .catch((err) => {
        if (err.response) {
          const errors = JSON.parse(err.response.request.response)
            .non_field_errors;
          dispatch({ type: actionTypes.AUTHENTICATION_ERROR, data: errors });
        } else if (err.request) {
          console.log(err.request);
        }
      });
  };

export const register = (username, password) =>
  (dispatch) => {
    const headers = { 'Content-type': 'application/json' };
    return axios
      .post('/api/register', { username, password }, { headers })
      .then(res => dispatch({ type: actionTypes.REGISTRATION_SUCCESSFUL, data: res.data }))
      .catch(err => dispatch({
        type: actionTypes.REGISTRATION_FAILED,
        data: JSON.parse(err.response.request.response).non_field_errors,
      }));
  };

export const logout = () =>
  (dispatch, getState) => {
    const headers = setHeaders(getState);
    return axios
      .post('/api/auth/logout/', '', { headers })
      .then((res) => {
        if (res.status === 204) dispatch({ type: actionTypes.LOGOUT });
      })
      .catch(err => dispatch({ type: actionTypes.AUTHENTICATION_ERROR, data: err }));
  };
