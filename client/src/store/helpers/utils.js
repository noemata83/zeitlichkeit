import jstz from 'jstz';
import actionTypes from '../actions/actionTypes';

export const setHeaders = (getState) => {
  const { token } = getState().auth;

  const headers = {
    'Content-type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  return headers;
};

const getWorkspace = getState => getState().workspace.id;

export const setupRequest = getState => ({
  headers: setHeaders(getState),
  workspace: getWorkspace(getState),
});

export const handleServerError = err => dispatch =>
  dispatch({ type: actionTypes.SERVER_ERROR, data: err });

export const handleResponse = (res, action, data) => dispatch =>
  dispatch({ type: action, data: data || null });

export const setTimeZone = () => {
  if (!localStorage.getItem('timezone')) {
    const tz = jstz.determine() || 'UTC';
    localStorage.setItem('timezone', tz.name());
  }
};
